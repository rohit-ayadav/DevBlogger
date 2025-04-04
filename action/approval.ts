"use server";
import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import { isValidObjectId } from "mongoose";
import serializeDocument from "@/utils/date-formatter";
import sendEmail from "./email/SendEmail";
import User from "@/models/users.models";
import { BlogApproved, BlogRejected } from "@/utils/EmailTemplate/blog";
import Notification from "@/models/notification.models";
import webpush from "web-push";

await connectDB();

interface Query {
    _id?: string;
    slug?: string;
}

interface Response {
    message: string;
    error: string | null;
}

webpush.setVapidDetails(
  "mailto:rohitkuyada@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

const ApproveBlog = async (blogId: string, sendNotification: boolean, status: string, reason: string): Promise<Response> => {
    if (!blogId) {
        return {
            message: "",
            error: "Blog ID is required",
        };
    }
    const query: Query = isValidObjectId(blogId)
        ? { _id: blogId }
        : { slug: blogId };

    try {
        const blog = await Blog.findOne(query);
        if (!blog) {
            return {
                message: "",
                error: "Blog not found",
            };
        }

        const Author = await User.findOne({ email: blog.createdBy }).select("name").exec();
        const AuthorName = Author ? Author.name : "Author";
        if (status === "published") {
            blog.status = 'approved';
            await blog.save();
            await sendEmail({
                to: blog.createdBy,
                subject: "Congratulations! Your Blog is Approved | DevBlogger",
                message: BlogApproved(AuthorName, blog.title, `https://devblogger.com/blog/${blog.slug}`),
            });

            if (sendNotification) {
                const subscriptions = await Notification.find({});
                if (subscriptions.length) {
                    const payload = {
                        title: `New Blog Post: ${blog.title}`,
                        body: `A new blog post "${blog.title}" has been published`,
                        image: blog.thumbnail,
                        icon: "/favicon.ico",
                        tag: "new-blog-post",
                        data: {
                            url: `/blogs/${blog.slug}`
                        },
                        actions: [
                            { action: "open", title: "Open" },
                            { action: "close", title: "Dismiss" }
                        ]
                    };

                    // Send notifications to all subscriptions
                    const notificationPromises = subscriptions.map(({ subscription }) =>
                        webpush
                            .sendNotification(subscription, JSON.stringify(payload))
                            .catch((error) => {
                                console.error("Error sending notification:", error);
                            })
                    );
                    await Promise.all(notificationPromises);
                    await Notification.deleteMany({ active: false });
                }
            }

            return {
                message: `Blog approved successfully`,
                error: null,
            };
        }
        else {
            blog.status = 'rejected';
            await blog.save();
            await sendEmail({
                to: blog.createdBy,
                subject: "Blog Rejected | DevBlogger",
                message: BlogRejected("Author", blog.title, reason, `https://devblogger.com/dashboard`),
            });

            return {
                message: "Blog rejected successfully",
                error: null,
            };
        }

    } catch (error) {
        console.log("Error approving blog:", error);
        return {
            message: "",
            error: "An error occurred while approving the blog",
        };
    }
};

const getPendingBlogs = async () => {
    try {
        const blogs = await Blog.find({ status: "pending_review" })
        if (!blogs || blogs.length === 0) {
            return {
                message: "No pending blogs found",
                error: null,
            };
        }
        const sanitizedBlogs = blogs.map((blog) => serializeDocument(blog));
        return {
            message: "Pending blogs retrieved successfully",
            blogs: sanitizedBlogs,
            error: null,
        };
    } catch (error) {
        console.error("Error retrieving pending blogs:", error);
        return {
            message: "",
            error: "An error occurred while retrieving pending blogs",
        };
    }
}

export { ApproveBlog, getPendingBlogs };