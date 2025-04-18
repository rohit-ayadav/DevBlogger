"use server";
import MonthlyStats from "@/models/monthlyStats";
import Blog from "@/models/blogs.models";
import { connectDB } from "@/utils/db";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { isValidSlug } from "@/lib/common-function";
import StaticContent from "@/models/static.models";

export default async function incrementViewInDB(blogId: string, like?: boolean, staticContent?: boolean) {
    await connectDB();
    try {
        if (!staticContent) {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);
            let blog;
            if (isValidObjectId) blog = await Blog.findById(blogId);
            else blog = await Blog.findOne({ slug: blogId });

            if (!blog) {
                throw new Error("Blog not found");
            }
            // Increment views of the blog
            if (!like) {
                await Blog.findOneAndUpdate(
                    { slug: blog.slug },
                    { $inc: { views: 1 } }
                );
            }

            const month = new Date().toISOString().slice(0, 7);
            const monthlyStats = await MonthlyStats.findOne({
                blog: blog._id,
                month,
            });

            if (monthlyStats) {
                if (like) monthlyStats.likes += 1;
                else monthlyStats.views += 1;
                await monthlyStats.save();
            } else {
                if (like) {
                    await MonthlyStats.create({
                        blog: blog._id,
                        month,
                        likes: 1,
                    });
                } else {
                    await MonthlyStats.create({
                        blog: blog._id,
                        month,
                        views: 1,
                    });
                }
            }
            revalidatePath(`/blogs/${blog.slug}`);
            revalidatePath(`/blogs`);
            revalidatePath(`/author/${blog.createdBy}`);
            revalidatePath(`/author`);
            revalidatePath(`/`);

            return {
                error: false,
                message: `${like ? "Like" : "View"} incremented successfully`,
            }
        } else {
            if (!isValidSlug(blogId)) {
                throw new Error("Invalid slug");
            }
            const staticContent = await StaticContent.findOne({ slug: blogId });
            if (!staticContent) {
                // create new static content
                await StaticContent.create({ slug: blogId, view: 0 });
            }
            // Increment views of the static content
            const staticContentData = await StaticContent.findOneAndUpdate(
                { slug: blogId },
                { $inc: { view: 1 } },
                { new: true }
            );
            if (!staticContentData) {
                throw new Error("Static content not found");
            }
            revalidatePath(`/${blogId}`);
            revalidatePath(`/`);
            return {
                error: false,
                message: "View incremented successfully",

            }
        }
    } catch (error: any) {
        console.error(error);
        return {
            message: "Error incrementing view",
            error: true,
        }
    }
}