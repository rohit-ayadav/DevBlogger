"use client";
import { fetchAuthorData } from "@/action/personalDashboardData";
import AuthorDashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { BlogPostType, UserType } from "@/types/blogs-types";
import LoadingEffect from "@/lib/LoadingEffect";
import { ErrorMessage } from "@/lib/ErrorMessage";

const PersonalDashboard = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [blogs, setBlogs] = useState<BlogPostType[]>([]);
    const [monthlyStats, setMonthlyStats] = useState<{
        blog: string; month: string; views: number; likes: number
    }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAuthorData();
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setUser(result.user);
                setBlogs(result.blogs || []);
                setMonthlyStats(result.monthlyStats || []);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingEffect />;
    if (error) return <div><ErrorMessage message={error} /></div>;
    if (!user) return <ErrorMessage message="User not found" />;
    return <AuthorDashboard user={user} blogs={blogs} monthlyStats={monthlyStats} />;
}

export default PersonalDashboard;