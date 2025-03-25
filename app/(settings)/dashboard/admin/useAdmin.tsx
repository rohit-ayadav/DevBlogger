import React from 'react'
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
interface CategoryStats {
    category: string;
    count: number;
    totalViews: number;
    totalLikes: number;
}
interface Stats {
    totalPosts: number;
    totalViews: number;
    totalLikes: number;
    uncategorizedPosts: number;
    categoryStats: CategoryStats[];
}
interface Post {
    _id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    views?: number;
    likes?: number;
    category?: string;
}

interface CategoryMapValue {
    category: string;
    count: number;
    totalViews: number;
    totalLikes: number;
}
const useAdmin = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [savingPost, setSavingPost] = useState<string | null>(null);
    const [stats, setStats] = useState<Stats>({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        uncategorizedPosts: 0,
        categoryStats: []
    });
    const [userStats, setUserStats] = useState({ total: 0, newThisMonth: 0 });
    const [newsletterStats, setNewsletterStats] = useState({ total: 0, openRate: 0 });
    const [contactFormStats, setContactFormStats] = useState({ total: 0, unresolved: 0 });
    const [isSuperAdmin] = useState(true);
    const [contactUsDataPage, setcontactUsDataPage] = useState([]);
    const [newsLetterDataPage, setNewsLetterDataPage] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            await Promise.all([
                fetchPosts(),
                fetchAllData()
            ]);
            toast.success('Data fetched successfully');
        } catch (error) {
            toast.error('Failed to fetch data');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog');
            const data = await response.json();
            setPosts(data.posts);
            setFilteredPosts(data.posts);
            calculateStats(data.posts);
        } catch (error) {
            throw new Error('Failed to fetch posts');
        }
    };

    const fetchAllData = async () => {
        try {
            const [usersResponse, subscribersResponse, contactResponse] = await Promise.all([
                fetch('/api/user'),
                fetch('/api/subscribe'),
                fetch('/api/contact')
            ]);

            const [usersData, subscriberData, contactUsData] = await Promise.all([
                usersResponse.json(),
                subscribersResponse.json(),
                contactResponse.json()
            ]);
            setNewsletterStats({
                total: subscriberData.subscribers.length,
                openRate: parseFloat(calculateOpenRate(subscriberData.subscribers))
            });

            setContactFormStats({
                total: contactUsData.data.length,
                unresolved: contactUsData.data.filter((c: { resolved: boolean }) => !c.resolved).length
            });
            setcontactUsDataPage(contactUsData.data);
            setNewsLetterDataPage(subscriberData.subscribers);

        } catch (error) {
            console.error('Error fetching additional data:', error);
            throw new Error('Failed to fetch data');
        }
    };

    const calculateOpenRate = useCallback((subscribers: { openedEmails: number }[]) => {
        const openedEmails = subscribers.filter(s => s.openedEmails > 0).length;
        return ((openedEmails / subscribers.length) * 100).toFixed(2);
    }, []);



    const calculateStats = useCallback((postsData: Post[]) => {
        const categoryMap = new Map<string, CategoryMapValue>();
        let totalViews = 0;
        let totalLikes = 0;
        let uncategorizedPosts = 0;

        postsData.forEach(post => {
            totalViews += post.views || 0;
            totalLikes += post.likes || 0;

            if (!post.category) {
                uncategorizedPosts++;
                return;
            }

            const currentStats = categoryMap.get(post.category) || {
                category: post.category,
                count: 0,
                totalViews: 0,
                totalLikes: 0
            };

            categoryMap.set(post.category, {
                ...currentStats,
                count: currentStats.count + 1,
                totalViews: currentStats.totalViews + (post.views || 0),
                totalLikes: currentStats.totalLikes + (post.likes || 0)
            });
        });

        setStats({
            totalPosts: postsData.length,
            totalViews,
            totalLikes,
            uncategorizedPosts,
            categoryStats: Array.from(categoryMap.values())
        });
    }, []);

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(value.toLowerCase()) ||
            post.createdBy.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [posts]);
    return {
        posts,
        filteredPosts,
        loading,
        searchTerm,
        handleSearch,
        stats,
        isSuperAdmin,
        contactUsDataPage,
        newsLetterDataPage,
        fetchData,
    }
}

export default useAdmin
export type { Post, Stats, CategoryStats };