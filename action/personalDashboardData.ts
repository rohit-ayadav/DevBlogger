"use server";
import { connectDB } from "@/utils/db";
import User from "@/models/users.models";
import Blog from "@/models/blogs.models";
import MonthlyStats from "@/models/monthlyStats";
import { getSessionAtHome } from "@/auth";
import serializeDocument from "@/utils/date-formatter";
import { BlogPostType, UserType } from "@/types/blogs-types";

export async function fetchAuthorData() {
    try {
        await connectDB();
        const session = await getSessionAtHome();
        if (!session?.user?.email) return { error: "Unauthorized: Please log in." };

        const [user, blogs] = await Promise.all([
            User.findOne({ email: session.user.email }).lean() as unknown as UserType,
            Blog.find({ createdBy: session.user.email }).lean() as unknown as BlogPostType[]
        ]);
        if (!user) return { error: "Kindly Login again to access the dashboard." };
        let monthlyStats: any[] = [];
        if (blogs.length !== 0)
            monthlyStats = await MonthlyStats.find({ blog: { $in: blogs.map(blog => blog._id) } }).lean();

        return {
            user: serializeDocument(user),
            blogs: blogs.map(blog => serializeDocument(blog)),
            monthlyStats: monthlyStats.map(stat => ({
                blog: stat.blog.toString(),
                month: stat.month,
                views: stat.views || 0,
                likes: stat.likes || 0,
            }))
        };
    } catch (error: any) {
        return { error: (error as Error).message };
    }
}

export async function getNavbarData() {
    try {
        await connectDB();
        const session = await getSessionAtHome();
        if (!session?.user?.email) return { error: "Unauthorized: Please log in." };

        const user = await User.findOne({ email: session.user.email }).lean() as unknown as UserType;
        if (!user) return { error: "Kindly Login again to access the dashboard." };

        return {
            user: serializeDocument(user)
        };
    } catch (error: any) {
        return { error: (error as Error).message };
    }
}