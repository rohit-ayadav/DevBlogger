import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, Clock, MoreHorizontal, Edit, Trash2, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { BlogPostType } from '@/types/blogs-types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatCount } from '@/lib/common-function';
import { renderStatusBadge } from '@/lib/renderStatusBadge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatRelativeTime } from '@/utils/date-formatter';

interface PostCardProps {
    post: BlogPostType;
    showStats?: boolean;
}

export const PostCard = ({ post, showStats = false }: PostCardProps) => {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const deletePost = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/blog?id=${post._id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred.');
            } else {
                toast.success('Post deleted successfully');
                router.refresh();
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsDeleteDialogOpen(false);
        }
    };

    // Calculate read time (rough estimate based on word count)
    const calculateReadTime = () => {
        const text = post.content.replace(/<[^>]+>/g, '');
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assume 200 words per minute
        return `${readTime} min read`;
    };

    const readTime = calculateReadTime();
    const contentPreview = post.content.replace(/<[^>]+>/g, '').slice(0, 120);
    const timeAgo = formatRelativeTime(new Date(post.createdAt));
    const postStatus = post.status?.toLowerCase() || 'draft';

    return (
        <Card className="h-full overflow-hidden flex flex-col group transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
            <Link href={`/blogs/${post.slug}`} className="flex-1 flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {post.thumbnail ? (
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
                            aria-label={post.title}
                        >
                            <span className="text-white font-medium opacity-60">No thumbnail</span>
                        </div>
                    )}

                    {/* Category and status badges */}
                    <div className="absolute top-0 left-0 p-3 w-full flex items-center justify-between">
                        <Badge
                            variant="secondary"
                            className="capitalize text-xs font-medium px-2.5 py-1 bg-opacity-80 backdrop-blur-sm shadow-sm"
                        >
                            {post.category || 'Uncategorized'}
                        </Badge>

                        {renderStatusBadge(post.status)}
                    </div>
                </div>

                <CardContent className="flex-1 flex flex-col p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{timeAgo}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div title="Estimated reading time">
                            <span>{readTime}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2.5 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {contentPreview}{contentPreview.length < post.content.length ? '...' : ''}
                    </p>

                    {showStats && (
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-6 mt-auto">
                                <div className="flex items-center gap-1.5 text-muted-foreground" title="Total views">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{formatCount(post.views || 0)}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground" title="Total likes">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="text-sm">{formatCount(post.likes || 0)}</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 px-2" aria-label="Post actions">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="ml-2 text-sm">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/edit/${post.slug}`} className="flex items-center cursor-pointer">
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Edit Post</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/stats/${post.slug}`} className="flex items-center cursor-pointer">
                                            <BarChart2 className="mr-2 h-4 w-4" />
                                            <span>View Statistics</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive cursor-pointer"
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete Post</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </CardContent>
            </Link>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post
                            "{post.title}" and remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={deletePost}
                            className="bg-destructive hover:bg-destructive/90"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};