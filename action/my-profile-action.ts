"use server";

import { connectDB } from "@/utils/db";
import User from "@/models/users.models";
import { revalidatePath } from "next/cache";
import { ProfileFormData } from "@/app/(settings)/profile/component/types";
import Blog from "@/models/blogs.models";

export async function saveEdit(data: ProfileFormData) {
    try {
        if (!data) throw new Error("Data is required");
        if (!data.email) throw new Error("Email is required");
        if (!data.username) throw new Error("Username is required");
        if (!data.name) throw new Error("Name is required");

        await connectDB();

        if (data.username) {
            // Check if username is not taken by another user (if user not updating username)
            const user = await User.findOne({ username: data.username, email: { $ne: data.email } });
            if (user) {
                throw new Error("Username is already taken");
            }
        }

        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error("User not found");
        }
        if (data.email !== user.email) {
            throw new Error("Email cannot be changed");
        }
        if (!user.isEmailVerified) {
            throw new Error("Please verify your email first to update profile");
        }
        // Update user data
        user.name = data.name;
        user.username = data.username;
        user.bio = data.bio;
        user.image = data.image;
        user.website = data.website;
        user.socialLinks = data.socialLinks;
        await user.save();
        revalidatePath(`/author/${user.username}`);
        revalidatePath(`/author/${user._id}`);
        revalidatePath(`/`);
        revalidatePath(`/author`);
        revalidatePath(`/profile`);

        console.log("Profile updated successfully");
        return { success: true, message: "Profile updated successfully" };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}

export async function getAuthorName() {
    try {
        await connectDB();
        // find those users who have published at least one blog
        const users = await User.find({}).select("name username email").lean().exec();
        const posts = await Blog.find({}).select("createdBy").lean().exec();
        const authorIds = [...new Set(posts.map(post => post.createdBy))];
        const authors = users.filter(user => authorIds.includes(user.email));
        // map in the format value: label
        const authorName = authors.map(user => ({
            value: user.username,
            label: user.name
        }))
        // console.log(`Author Name: ${JSON.stringify(authorName)}`);
        return authorName;
    } catch (error) {
        return [];
    }
}