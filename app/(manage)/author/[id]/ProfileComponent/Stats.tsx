import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link';
import { formatDate } from '@/utils/date-formatter';
import { BlogPostType } from '@/types/blogs-types';
import { Author } from './ProfileNew';


const StatsAuthorPage = ({authorPosts, totalStats, categories}: {authorPosts: BlogPostType[], author: Author, totalStats: {views: number, likes: number}, categories: string[]}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Content Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{authorPosts.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Posts</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totalStats.views.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-red-600 dark:text-red-400">{totalStats.likes.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Likes</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Top Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categories.filter(cat => cat !== 'all').slice(0, 5).map((category, index) => {
                                const postsCount = authorPosts.filter(post => post.category === category).length;
                                const percentage = (postsCount / authorPosts.length) * 100;
                                return (
                                    <div key={category} className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                {category}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {postsCount} posts ({percentage.toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                            <div
                                                className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700 md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Top Performing Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Post Title</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Views</th>
                                        <th scope="col" className="px-6 py-3">Likes</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authorPosts
                                        .sort((a, b) => (b.views || 0) - (a.views || 0))
                                        .slice(0, 5)
                                        .map((post) => (
                                            <tr key={post._id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    <Link
                                                        href={`/blogs/${post._id}`}
                                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 capitalize">{post.category}</td>
                                                <td className="px-6 py-4">{post.views?.toLocaleString() || 0}</td>
                                                <td className="px-6 py-4">{post.likes?.toLocaleString() || 0}</td>
                                                <td className="px-6 py-4">{formatDate(post.createdAt)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default StatsAuthorPage
