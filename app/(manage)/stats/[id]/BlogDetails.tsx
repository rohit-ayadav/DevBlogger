import React from 'react';
import { ArrowUpRight, Calendar, Clock, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BlogPostType } from '@/types/blogs-types';

const BlogDetails = ({ data, formatDate }: { data: BlogPostType; formatDate: (date: Date) => string }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="flex items-center text-gray-600 dark:text-gray-300">
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Published: {formatDate(new Date(data.createdAt))}</span>
                        </p>
                        <p className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Last Updated: {formatDate(new Date(data?.updatedAt ?? data.createdAt))}</span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="flex items-center text-gray-600 dark:text-gray-300">
                            <Share2 className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Category: {data.category}</span>
                        </p>
                        <p className="flex items-center text-gray-600 dark:text-gray-300">
                            <ArrowUpRight className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Tags: </span></p>
                        <div className="flex flex-wrap items-center gap-2">
                            {data.tags?.slice(0, 5).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BlogDetails;