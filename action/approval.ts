"use server";
import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import { isValidObjectId } from "mongoose";
import serializeDocument from "@/utils/date-formatter";
import sendEmail from "./email/SendEmail";
import User from "@/models/users.models";
import { BlogApproved, BlogRejected } from "@/utils/EmailTemplate/blog";

await connectDB();

interface Query {
    _id?: string;
    slug?: string;
}

interface Response {
    message: string;
    error: string | null;
}

const ApproveBlog = async (blogId: string, sendNotification: boolean): Promise<Response> => {
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

        blog.isPublic = true;
        await blog.save();
        const AuthorName = await User.findOne({ email: blog.createdBy }).select("name").exec();
        await sendEmail({
            to: blog.createdBy,
            subject: "Congratulations! Your Blog is Approved | DevBlogger",
            message: BlogApproved(AuthorName, blog.title, `https://devblogger.com/blog/${blog.slug}`),
        });

        return {
            message: "Blog approved successfully",
            error: null,
        };
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
        const blogs = await Blog.find({ isPublic: false, status: "published" });
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
export default ApproveBlog;

const rejectBlog = async (blogId: string, reason: string): Promise<Response> => {
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

        await sendEmail({
            to: blog.createdBy,
            subject: "Blog Rejected | DevBlogger",
            message: BlogRejected("Author", blog.title, reason, `https://devblogger.com/dashboard`),
        });

        return {
            message: "Blog rejected successfully",
            error: null,
        };
    } catch (error) {
        return {
            message: "",
            error: "An error occurred while rejecting the blog",
        };
    }
}

export { rejectBlog };