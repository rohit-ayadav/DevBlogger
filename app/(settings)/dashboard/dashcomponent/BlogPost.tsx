import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPostType } from '@/types/blogs-types';
import { PostCard } from '../PostCard';
import { CATEGORIES } from '@/types/blogs-types';
import { Search, Filter, SortDesc, PlusCircle, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchAuthorData } from '@/action/personalDashboardData';

const BLOG_STATUSES = [
    { value: 'all', label: 'All Posts' },
    { value: 'approved', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'archived', label: 'Archived' },
    { value: 'private', label: 'Private' },
    { value: 'deleted', label: 'Trash' }
];

const BlogPost = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBlogs, setSortBlogs] = useState('recent');
    const [activeStatus, setActiveStatus] = useState('all');
    const [filteredBlogs, setFilteredBlogs] = useState<BlogPostType[]>([]);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    // Blogs and user data
    const [blogs, setBlogs] = React.useState<BlogPostType[]>([]);
    const [monthlyStats, setMonthlyStats] = React.useState<{
        blog: string; month: string; views: number; likes: number
    }[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    // Count blogs by status for badge counters
    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = { all: blogs.length };

        blogs.forEach(blog => {
            const status = blog.status || 'draft';
            counts[status] = (counts[status] || 0) + 1;
        });

        return counts;
    }, [blogs]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setRefreshing(true);
        const result = await fetchAuthorData();
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            // setUser(result.user); no use
            setBlogs(result.blogs || []);
            setFilteredBlogs(result.blogs || []);
            setMonthlyStats(result.monthlyStats || []);
            setLoading(false);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sortedBlogs = useMemo(() => {
        return [...blogs].sort((a, b) => {
            switch (sortBlogs) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'liked':
                    return (b.likes || 0) - (a.likes || 0);
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'a-z':
                    return a.title.localeCompare(b.title);
                case 'z-a':
                    return b.title.localeCompare(a.title);
                default: // recent
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [blogs, sortBlogs]);

    useEffect(() => {
        const filtered = sortedBlogs.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                (post.content && post.content.toLowerCase().includes(search.toLowerCase()));
            const matchesCategory = category === 'all' || post.category === category;
            const matchesStatus = activeStatus === 'all' || post.status === activeStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        });

        setFilteredBlogs(filtered);
    }, [search, category, sortBlogs, activeStatus, sortedBlogs]);

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all your blog posts</p>
                </div>
                <Button className="flex items-center gap-2" onClick={() => window.location.href = '/create'}>
                    <PlusCircle size={16} />
                    <span>Create New Post</span>
                </Button>
            </div>

            <Card className="border shadow-sm">
                <CardHeader className="pb-0">
                    <Tabs defaultValue="all" value={activeStatus} onValueChange={setActiveStatus} className="w-full">
                        <div className="overflow-x-auto pb-2">
                            <TabsList className="h-auto p-1">
                                {BLOG_STATUSES.map(status => (
                                    <TabsTrigger key={status.value} value={status.value} className="flex items-center gap-2 py-2">
                                        {status.label}
                                        <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                                            {statusCounts[status.value] || 0}
                                        </Badge>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="mt-4 flex flex-col md:flex-row justify-between gap-3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search posts by title or content..."
                                    className="pl-9 w-full md:w-80"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* // refresh button */}
                                <Button variant="outline" className="flex items-center gap-2" onClick={fetchData} disabled={refreshing}>
                                    <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
                                    <span>Refresh</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                                >
                                    <Filter size={16} />
                                    <span>Filters</span>
                                </Button>

                                <Select value={sortBlogs} onValueChange={setSortBlogs}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <SortDesc size={16} />
                                            <SelectValue placeholder="Sort by" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="liked">Most Liked</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                        <SelectItem value="a-z">A - Z</SelectItem>
                                        <SelectItem value="z-a">Z - A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isFilterExpanded && (
                            <div className="mt-4 p-4 bg-muted/30 rounded-md">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Category</label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Filter by category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map(category => (
                                                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Date Range</label>
                                        <Select defaultValue="all-time">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select time range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all-time">All Time</SelectItem>
                                                <SelectItem value="this-month">This Month</SelectItem>
                                                <SelectItem value="last-month">Last Month</SelectItem>
                                                <SelectItem value="this-year">This Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* {loading && (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                            </div>
                        )} */}
                        {error && (
                            <div className="text-red-500 text-center py-4">
                                {error}
                            </div>
                        )}

                        {BLOG_STATUSES.map(status => (
                            <TabsContent key={status.value} value={status.value} className={`mt-6 ${loading || refreshing ? 'opacity-50 pointer-events-none' : ''}`}>
                                {filteredBlogs.length === 0 ? (
                                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                                        <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
                                        <p className="text-muted-foreground mb-4">
                                            {search ? 'No posts match your search criteria.' : `You don't have any ${status.label.toLowerCase()} yet.`}
                                        </p>
                                        {status.value === 'draft' && (
                                            <Button variant="outline" onClick={() => window.location.href = '/create'} className="flex items-center gap-2">
                                                <PlusCircle size={16} className="mr-2" />
                                                Create a new draft
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                        {filteredBlogs.map((post: BlogPostType) => {
                                            const postStats = monthlyStats.filter(stat => stat.blog === post._id);
                                            const totalViews = postStats.reduce((sum, stat) => sum + stat.views, 0);
                                            const totalLikes = postStats.reduce((sum, stat) => sum + stat.likes, 0);

                                            const enhancedPost = {
                                                ...post,
                                                views: totalViews,
                                                likes: totalLikes
                                            };

                                            return <PostCard key={post._id} post={enhancedPost} showStats={true} refreshData={fetchData} />;
                                        })}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardHeader>
            </Card>
        </div>
    );
};

export default BlogPost;