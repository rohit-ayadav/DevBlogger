import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import LazyChartCard from './LazyChartCard';
import { Post } from './useAdmin';
import { LineChart } from 'recharts';
import ShowProfileImage from '@/components/ShowProfileImage';

const Overview = ({ posts }: { posts: Post[] }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LazyChartCard
                    title="Views Over Time"
                    Chart={LineChart}
                    data={[
                        { date: "Jan", views: 100 },
                        { date: "Feb", views: 300 },
                        { date: "Mar", views: 200 },
                        { date: "Apr", views: 500 },
                        { date: "May", views: 400 },
                        { date: "Jun", views: 700 },
                    ]}
                    config={{
                        views: {
                            color: "hsl(215, 70%, 50%)"
                        }
                    }}
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {posts.length !== 0 && posts.slice(0, 10).map((post) => (
                                <div key={post._id} className="flex items-center mb-4 last:mb-0">
                                    <ShowProfileImage src="" className="w-10 h-10 rounded-full" size={40} />
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{post.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Posted by {post.createdBy} on {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="ml-auto">
                                        {post.category || 'Uncategorized'}
                                    </Badge>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            {/* Check if there are new posts for admin approval */}
            {posts.length === 0 && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">No recent posts to display.</p>
                    <p className="text-sm text-muted-foreground">All posts are up to date.</p>
                </div>
            )}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Post Management</h2>
                <p className="text-sm text-muted-foreground">Manage your posts and categories.</p>
                <LazyChartCard
                    title="Posts by Category"
                    Chart={LineChart}
                    data={[
                        { category: "Technology", posts: 50 },
                        { category: "Health", posts: 30 },
                        { category: "Travel", posts: 20 },
                        { category: "Lifestyle", posts: 40 },
                    ]}
                    config={{
                        posts: {
                            color: "hsl(120, 70%, 50%)"
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Overview
