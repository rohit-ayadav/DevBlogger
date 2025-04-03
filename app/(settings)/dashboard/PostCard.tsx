import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import { BlogPostType, UserType } from '@/types/blogs-types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatCount } from '@/lib/common-function';
interface PostCardProps {
    post: BlogPostType;
    showStats?: boolean;
    author?: UserType;
}

export const PostCard = ({ post, showStats = false, author }: PostCardProps) => {
    const router = useRouter();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const deletePost = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (window.confirm('Are you sure you want to delete this post?')) {
                const response = await fetch(`/api/blog?id=${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'An error occurred.');
                } else {
                    toast.success('Post deleted successfully');
                    router.refresh();
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/blogs/${post.slug}`} className="flex-1 flex flex-col">
                <div
                    className="h-40 sm:h-48 w-full bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300"
                    style={{
                        backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    aria-label={post.title}
                    title='Click to view post'
                />
                <CardContent className="flex-1 flex flex-col p-3 sm:p-5">
                    <div
                        className="flex items-center justify-between mb-2"
                    >
                        <Badge
                            variant="outline"
                            className="capitalize text-xs"
                            title={`Your blog belongs to ${post.category} category`}
                        >
                            {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
                            title={`Created on ${formatDate(post.createdAt)}`}>
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.createdAt)}
                        </span>
                    </div>
                    <h3
                        className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
                        title="Click to read the full post"
                    >
                        {post.title}
                    </h3>
                    <p
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-2 sm:mb-4 flex-1"
                        title="This is a preview of the post content"
                    >
                        {post.content.replace(/<[^>]+>/g, '').slice(0, 120) + (post.content.length > 120 ? '...' : '')}
                    </p>

                    {showStats && (
                        <div
                            className="grid grid-cols-2 gap-2 mt-auto"
                            title="Hover over the icons to see the stats"
                        >
                            <div
                                className="flex items-center gap-1 text-gray-600 dark:text-gray-400"
                                title="Total views for this post"
                            >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm font-medium">{formatCount(post.views || 0)}{' view' + (post.views !== 1 ? 's' : '')}</span>
                            </div>
                            <div
                                className="flex items-center gap-1 text-gray-600 dark:text-gray-400"
                                title="Total likes for this post"
                            >
                                <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm font-medium">{formatCount(post.likes || 0)}{' like' + (post.likes !== 1 ? 's' : '')}</span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Link>

            <div className="px-3 sm:px-5 py-3 border-t flex items-center justify-between">
                {post.isPublic ? (
                    <Badge
                        variant="outline"
                        className="text-xs sm:text-sm text-green-600 dark:text-green-400"
                        title="This post is public and visible on the platform."
                    >
                        Public
                    </Badge>
                ) : (
                    <Badge
                        variant="outline"
                        className="text-xs sm:text-sm text-red-600 dark:text-red-400"
                        title="This post is private and not visible on the platform. Anyone with the link can view it."
                    >
                        Private
                    </Badge>
                )}
                {post.status === 'draft' && (
                    <Badge
                        variant="outline"
                        className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400"
                        title="This post is a draft and will be automatically deleted in 7 days if not published."
                    >
                        Draft
                    </Badge>
                )}

                <div className="flex items-center gap-2">
                    <Link
                        href={`/edit/${post.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        title="Click to edit this post"
                    >
                        Edit
                    </Link>
                    <button
                        className="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:underline"
                        onClick={(e) => deletePost(e, post._id)}
                        title="Click to delete this post"
                    >
                        Delete
                    </button>
                    <Link
                        href={`/stats/${post.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs sm:text-sm text-green-600 dark:text-green-400 hover:underline"
                        title="Click to view stats for this post"
                    >
                        Stats
                    </Link>
                </div>
            </div>
        </Card >
    );
};