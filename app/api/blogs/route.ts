/**
 * This file is used to define the routes for the blogs module
 * This will handle all the requests that are made to the /api/blogs path
 * including the params like search, category, and sortBy that are passed
 * It will also handle the infinite scroll feature
 * 
 * Written by: Rohit Kumar Yadav on 15th Febraury 2025 
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import mongoose from "mongoose";
import User from "@/models/users.models";

type SortOption = {
    [key: string]: 1 | -1;
};

type QueryParams = {
    page: number;
    limit: number;
    category: string;
    sortBy: string;
    search?: string;
    author?: string;
    readingTime?: string;
    dateRange?: string;
};

const READINGTIME = [
    { value: "all", label: "Any Length" },
    { value: "under5", label: "Under 5 minutes" },
    { value: "5to10", label: "5-10 minutes" },
    { value: "10to20", label: "10-20 minutes" },
    { value: "over20", label: "Over 20 minutes" }
];

const dateRange = [
    { value: "all", label: "All Time" },
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
    { value: "last3Months", label: "Last 3 Months" },
    { value: "lastYear", label: "Last Year" }
];

await connectDB();

const validateQueryParams = (searchParams: URLSearchParams): QueryParams => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = clamp(parseInt(searchParams.get("limit") || "9", 10), 1, 50);
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const search = searchParams.get("search") || "";
    const author = searchParams.get("author") || "";
    const readingTime = searchParams.get("readingTime") || "";
    const dateRange = searchParams.get("dateRange") || "";
    return { page, limit, category, sortBy, search, author, readingTime, dateRange };
}
function clamp(num: number, min: number, max: number): number {
    // it will ensure that the number is within the range of min and max
    return Math.min(Math.max(num, min), max);
}

const buildQuery = (params: QueryParams): mongoose.FilterQuery<typeof Blog> => {
    const query: mongoose.FilterQuery<typeof Blog> = {};

    // If category is provided, add it to the query
    if (params.category && params.category !== "all") {
        query.category = params.category;
    }
    // If search is provided, add it to the query
    if (params.search) {
        query.$or = [
            { title: { $regex: params.search, $options: "i" } },
            { content: { $regex: params.search, $options: "i" } },
            { category: { $regex: params.search, $options: "i" } },
            { tags: { $in: [new RegExp(params.search, "i")] } },
            { author: { $regex: params.search, $options: "i" } },
        ];
    }

    // If dateRange is provided, add it to the query
    if (params.dateRange && params.dateRange !== "all") {
        const date = new Date();
        switch (params.dateRange) {
            case "lastWeek":
                date.setDate(date.getDate() - 7);
                break;
            case "lastMonth":
                date.setMonth(date.getMonth() - 1);
                break;
            case "last3Months":
                date.setMonth(date.getMonth() - 3);
                break;
            case "lastYear":
                date.setFullYear(date.getFullYear() - 1);
                break;
        }
        query.createdAt = { $gte: date };
    }

    // If readingTime is provided, add it to the query, use 200 words per minute as average reading speed without html tags
    if (params.readingTime && params.readingTime !== "all") {
        const wordsPerMinute = 200;
        const time = parseInt(params.readingTime.split("to")[1], 10);
        const words = time * wordsPerMinute;
        query.readingTime = { $lte: words };
    }

    // Remove that blog which is not approved
    query.status = "approved";

    return query;
}

const getSortOptions = (sortBy: string): SortOption => {
    switch (sortBy) {
        case "newest":
            return { createdAt: -1 };
        case "oldest":
            return { createdAt: 1 };
        case "mostViews":
            return { views: -1, createdAt: -1 };
        case "leastViews":
            return { views: 1, createdAt: -1 };
        case "mostLikes":
            return { likes: -1, createdAt: -1 };
        case "leastLikes":
            return { likes: 1, createdAt: -1 };
        case "mostComments":
            return { comments: -1, createdAt: -1 };
        case "leastComments":
            return { comments: 1, createdAt: -1 };
        case "trending":
            return { views: -1, likes: -1, comments: -1, createdAt: -1 };
        default:
            return { createdAt: -1 };
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const params = validateQueryParams(searchParams);
    const query = buildQuery(params);
    const sortOption = getSortOptions(params.sortBy);

    try {
        if (params.author && params.author !== "all") {
            const user = await User.findOne({ username: params.author }).lean().exec();
            if (!user) {
                return NextResponse.json({ message: "Author not found" }, { status: 404 });
            }
            if (user && !Array.isArray(user)) {
                query.createdBy = user.email;
            }
        }
        const [totalBlogs, blogs, totalBlogsData] = await Promise.all([
            Blog.countDocuments(query),
            Blog.find(query)
                .sort(sortOption)
                .limit(params.limit)
                .skip((params.page - 1) * params.limit)
                .select("-__v")
                .lean()
                .exec(),
            Blog.find(query).select("likes views").lean().exec()
        ]);

        const totalPages = Math.ceil(totalBlogs / params.limit);
        const skip = (params.page - 1) * params.limit;

        const [totalUsers, users] = await Promise.all([
            User.countDocuments(),
            User.find({ email: { $in: blogs.map(blog => blog.createdBy) } }).lean().exec()
        ]);

        let totalLikes = 0;
        let totalViews = 0;
        totalBlogsData.forEach(blog => {
            totalLikes += blog.likes;
            totalViews += blog.views;
        });

        const usersMap = users.reduce((acc, user) => {
            acc[user.email] = user;
            return acc;
        }, {} as Record<string, any>);

        const data = blogs.map((blog) => {
            blog.createdAt = blog.createdAt.toString();
            return blog;
        });

        const stats = {
            totalBlogs,
            totalUsers,
            totalLikes,
            totalViews
        };

        const metadata = {
            currentPage: params.page,
            totalPages,
            totalPosts: totalBlogs,
            hasMore: skip + blogs.length < totalBlogs,
            resultsPerPage: params.limit,
        };

        return NextResponse.json({
            message: "Blog posts retrieved successfully",
            success: true,
            data,
            users: usersMap,
            metadata,
            stats
        }, {
            status: 200,
            headers: {
                "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
            }
        });
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}