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
        if (status === "approved") {
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
            blog.rejectedReason = reason;
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

export const handleFromUserDashboard = async (action: string, blogId: string) => {

    // the action can be 'delete', 'permanent-delete', 'archive', 'restore', 'request-publish', 'submit-for-approval', 'make-public', 'make-private', or 'unarchive'
    // and the blogId is the id or slug of the blog post to be acted upon
    // the  status: 'draft' | 'archived' | 'private' | 'pending_review' | 'rejected' | 'deleted' | 'approved';

    if (!action || !blogId) {
        return {
            message: "",
            error: "Action and blog ID are required",
        };
    }
    try {
        const blog = await Blog.findOne(isValidObjectId(blogId) ? { _id: blogId } : { slug: blogId });
        if (!blog) {
            return {
                message: "",
                error: "Blog not found",
            };
        }

        switch (action) {
            case 'delete':
                blog.status = 'deleted';
                await blog.save();
                return {
                    message: "Blog deleted successfully",
                    error: null,
                };
            case 'permanent-delete':
                await Blog.deleteOne({ _id: blog._id });
                return {
                    message: "Blog permanently deleted successfully",
                    error: null,
                };
            case 'archive':
                blog.status = 'archived';
                await blog.save();
                return {
                    message: "Blog archived successfully",
                    error: null,
                };
            case 'restore':
                blog.status = 'pending_review';
                await blog.save();
                return {
                    message: "Blog restored successfully",
                    error: null,
                };
            case 'request-publish':
                blog.status = 'pending_review';
                await blog.save();
                return {
                    message: "Blog requested for publish successfully",
                    error: null,
                };
                break;
            case 'submit-for-approval':
                blog.status = 'pending_review';
                await blog.save();
                return {
                    message: "Blog submitted for approval successfully",
                    error: null,
                };
                break;
            case 'make-public':
                blog.status = 'pending_review';
                await blog.save();
                return {
                    message: "Blog requested for public successfully",
                    error: null,
                };
                break;
            case 'make-private':
                blog.status = 'private';
                await blog.save();
                return {
                    message: "Blog made private successfully",
                    error: null,
                };
                break;
            case 'unarchive':
                blog.status = 'private';
                await blog.save();
                return {
                    message: "Blog unarchived successfully",
                    error: null,
                };
                break;
            default:
                return {
                    message: "",
                    error: "Invalid action",
                };
        }
    }
    catch (error) {
        console.error("Error handling user dashboard action:", error);
        return {
            message: "",
            error: "An error occurred while handling the action",
        };
    }
}