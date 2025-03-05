import React, { useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BlogPostType } from '@/types/blogs-types';
import { PostCard } from '../PostCard';
import { CATEGORIES } from '@/types/blogs-types';

interface BlogPostProps {
    blogs: BlogPostType[];
    monthlyStats: { blog: string; month: string; views: number; likes: number }[];
}

const BlogPost = ({ blogs, monthlyStats }: BlogPostProps) => {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('all');
    const [sortBlogs, setSortBlogs] = React.useState('recent');
    const [filteredBlogs, setFilteredBlogs] = React.useState<BlogPostType[]>(blogs);

    const sortedBlogs = useMemo(() => {
        return [...blogs].sort((a, b) => {
            switch (sortBlogs) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'liked':
                    return (b.likes || 0) - (a.likes || 0);
                default: // recent
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [blogs, sortBlogs]);

    useEffect(() => {
        const filtered = sortedBlogs.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'all' || post.category === category;
            return matchesSearch && matchesCategory;
        });

        setFilteredBlogs(filtered);
    }, [search, category, sortBlogs]);

    return (
        <div className="w-full">
            <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                        <CardTitle>My Blog Posts</CardTitle>
                        <CardDescription>
                            All your published blog posts
                        </CardDescription>
                    </div>
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search posts"
                        className="w-full sm:w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    {/* Filter by category */}
                    <Select value="all" onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(category => (
                                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Sort by */}
                    <Select value={sortBlogs} onValueChange={setSortBlogs}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="liked">Most Liked</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">You haven't published any blog posts yet.</p>
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No blogs match your current filter. Try changing your sort option.</p>
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

                                return <PostCard key={post._id} post={enhancedPost} showStats={true} />;
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogPost