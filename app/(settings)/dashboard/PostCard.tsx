import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, Clock, MoreHorizontal, Edit, Trash2, BarChart2, AlertCircle, Info, Archive, Globe, Lock, Send, Undo2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { BlogPostType } from '@/types/blogs-types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatCount } from '@/lib/common-function';
import { renderStatusBadge } from '@/lib/renderStatusBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import { formatRelativeTime } from '@/utils/date-formatter';
import { handleFromUserDashboard } from '@/action/approval';

interface PostCardProps {
    post: BlogPostType;
    showStats?: boolean;
    refreshData?: () => void;
}

export const PostCard = ({ post, showStats = false, refreshData }: PostCardProps) => {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isPermanentDeleteDialogOpen, setIsPermanentDeleteDialogOpen] = React.useState(false);
    const [isRejectionDetailsOpen, setIsRejectionDetailsOpen] = React.useState(false);
    const [isPublishRequestDialogOpen, setIsPublishRequestDialogOpen] = React.useState(false);
    const [isArchiveDialogOpen, setIsArchiveDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [actionType, setActionType] = React.useState<string>('');


    // Status checks
    const postStatus = post.status?.toLowerCase() || 'draft';
    const isDeleted = postStatus === 'deleted' || postStatus === 'trash';
    const isRejected = postStatus === 'rejected';
    const isDraft = postStatus === 'draft';
    const isPrivate = postStatus === 'private';
    const isPublished = postStatus === 'published';
    const isArchived = postStatus === 'archived';
    const isPendingApproval = postStatus === 'pending';


    // API requests
    const handlePostAction = async (action: string, successMessage: string) => {
        setIsLoading(true);
        setActionType(action);

        try {
            const { message, error } = await handleFromUserDashboard(action, post._id || post.slug);
            if (error) {
                toast.error(error);
                return;
            }
            toast.success(successMessage);
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
            closeAllDialogs();
            refreshData && refreshData();
        }
    };

    const deletePost = async () => {
        await handlePostAction('delete', 'Post moved to trash');
    };

    const permanentlyDeletePost = async () => {
        await handlePostAction('permanent-delete', 'Post permanently deleted');
    };

    const archivePost = async () => {
        await handlePostAction('archive', 'Post archived successfully');
    };

    const restorePost = async () => {
        await handlePostAction('restore', 'Post restored successfully');
    };

    const requestPublication = async () => {
        await handlePostAction('request-publish', 'Publication request submitted');
    };

    const submitForApproval = async () => {
        await handlePostAction('submit-for-approval', 'Post submitted for approval');
    };

    const makePostPublic = async () => {
        await handlePostAction('make-public', 'Post is now public');
    };

    const makePostPrivate = async () => {
        await handlePostAction('make-private', 'Post is now private');
    };

    const unarchivePost = async () => {
        await handlePostAction('unarchive', 'Post unarchived successfully');
    };

    // Helper to close all dialogs
    const closeAllDialogs = () => {
        setIsDeleteDialogOpen(false);
        setIsPermanentDeleteDialogOpen(false);
        setIsRejectionDetailsOpen(false);
        setIsPublishRequestDialogOpen(false);
        setIsArchiveDialogOpen(false);
    };

    // Calculate read time (rough estimate based on word count)
    const calculateReadTime = () => {
        const text = post.content.replace(/<[^>]+>/g, '');
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return `${readTime} min read`;
    };

    const readTime = calculateReadTime();
    const contentPreview = post.content.replace(/<[^>]+>/g, '').slice(0, 120);
    const timeAgo = formatRelativeTime(new Date(post.createdAt));
    const rejectionReason = post.rejectedReason || 'No specific reason provided';

    // Render overlay for rejected, deleted, or archived posts
    const renderStatusOverlay = () => {
        if (!isRejected && !isDeleted && !isArchived) return null;

        return (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-10">
                {isRejected && (
                    <>
                        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
                        <h4 className="text-gray-100 font-semibold text-lg mb-2">Post Rejected</h4>
                        <Button
                            variant="link"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:underline"
                            onClick={() => setIsRejectionDetailsOpen(true)}
                        >
                            View Rejection Details
                        </Button>
                    </>
                )}

                {isDeleted && (
                    <>
                        <Trash2 className="h-10 w-10 text-muted mb-3" />
                        <h4 className="text-white font-semibold text-lg mb-2">Post in Trash</h4>
                        <p className="text-white/80 text-sm text-center mb-3">This post has been moved to trash.</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-white hover:bg-white/20"
                                onClick={restorePost}
                            >
                                Restore
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setIsPermanentDeleteDialogOpen(true)}
                            >
                                Delete Permanently
                            </Button>
                        </div>
                    </>
                )}

                {isArchived && (
                    <>
                        <Archive className="h-10 w-10 text-blue-400 mb-3" />
                        <h4 className="text-white font-semibold text-lg mb-2">Post Archived</h4>
                        <p className="text-white/80 text-sm text-center mb-3">This post has been archived.</p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white/20"
                            onClick={unarchivePost}
                        >
                            Unarchive Post
                        </Button>
                    </>
                )}
            </div>
        );
    };

    return (
        <Card className={`h-full overflow-hidden flex flex-col group transition-all duration-300 ${isDeleted ? 'opacity-80 border-muted' : isArchived ? 'opacity-90 border-blue-200' : 'hover:border-primary/40 hover:shadow-lg'}`}>
            <div className={`flex-1 flex flex-col ${!isDeleted && !isRejected ? 'cursor-pointer' : ''}`}>
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {post.thumbnail ? (
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className={`object-cover w-full h-full transition-transform duration-500 ${!isDeleted && !isRejected && !isArchived ? 'group-hover:scale-105' : 'filter grayscale'}`}
                        />
                    ) : (
                        <div
                            className={`h-full w-full bg-gradient-to-br ${isDeleted ? 'from-gray-500 to-gray-700' :
                                isRejected ? 'from-red-500/50 to-red-700/50' :
                                    isArchived ? 'from-blue-400/50 to-blue-600/50' :
                                        isDraft ? 'from-amber-300 to-amber-500' :
                                            isPrivate ? 'from-purple-400 to-purple-600' :
                                                isPendingApproval ? 'from-yellow-400 to-yellow-600' :
                                                    'from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700'
                                } transition-all duration-300 flex items-center justify-center`}
                            aria-label={post.title}
                        >
                            <span className="text-white font-medium opacity-60">No thumbnail</span>
                        </div>
                    )}

                    {/* Render status overlay for rejected, deleted, or archived posts */}
                    {renderStatusOverlay()}

                    {/* Category and status badges */}
                    <div className="absolute top-0 left-0 p-3 w-full flex items-center justify-between z-20">
                        <Badge
                            variant="secondary"
                            className="capitalize text-xs font-medium px-2.5 py-1 bg-opacity-80 backdrop-blur-sm shadow-sm"
                        >
                            {post.category || 'Uncategorized'}
                        </Badge>

                        <div className="flex items-center space-x-2">
                            {isRejected && (
                                <TooltipProvider delayDuration={300}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 bg-white/90 hover:bg-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsRejectionDetailsOpen(true);
                                                }}
                                            >
                                                <Info className="h-3 w-3" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>View rejection details</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                            {renderStatusBadge(post.status)}
                        </div>
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

                    <h3 className={`text-lg font-semibold mb-2.5 ${!isDeleted && !isRejected && !isArchived ? 'group-hover:text-primary' :
                        isDeleted ? 'text-muted-foreground' :
                            isArchived ? 'text-blue-700' : ''
                        } transition-colors line-clamp-2`}>
                        {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {contentPreview}{contentPreview.length < post.content.length ? '...' : ''}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        {showStats && (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 text-muted-foreground" title="Total views">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{formatCount(post.views || 0)}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground" title="Total likes">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="text-sm">{formatCount(post.likes || 0)}</span>
                                </div>
                            </div>
                        )}

                        {!isDeleted && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 ml-auto" aria-label="Post actions">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="ml-2 text-sm hidden sm:inline">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Manage Post</DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    {/* View actions */}
                                    <DropdownMenuGroup>
                                        {!isRejected && !isDraft && (
                                            <DropdownMenuItem asChild>
                                                <Link href={`/blogs/${post.slug}`} className="flex items-center cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View Post</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        )}

                                        <DropdownMenuItem asChild>
                                            <Link href={`/edit/${post.slug}`} className="flex items-center cursor-pointer">
                                                <Edit className="mr-2 h-4 w-4" />
                                                <span>Edit Post</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        {!isRejected && !isDraft && (
                                            <DropdownMenuItem asChild>
                                                <Link href={`/stats/${post.slug}`} className="flex items-center cursor-pointer">
                                                    <BarChart2 className="mr-2 h-4 w-4" />
                                                    <span>View Statistics</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    {/* Status-specific actions */}
                                    <DropdownMenuGroup>
                                        {isRejected && (
                                            <>
                                                <DropdownMenuItem onClick={() => setIsRejectionDetailsOpen(true)}>
                                                    <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                                                    <span>View Rejection Reason</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={submitForApproval}>
                                                    <Send className="mr-2 h-4 w-4 text-blue-500" />
                                                    <span>Submit for Approval Again</span>
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        {isDraft && (
                                            <DropdownMenuItem onClick={submitForApproval}>
                                                <Send className="mr-2 h-4 w-4 text-blue-500" />
                                                <span>Submit for Approval</span>
                                            </DropdownMenuItem>
                                        )}

                                        {isPrivate && (
                                            <DropdownMenuItem onClick={() => setIsPublishRequestDialogOpen(true)}>
                                                <Globe className="mr-2 h-4 w-4 text-green-500" />
                                                <span>Request Public Publication</span>
                                            </DropdownMenuItem>
                                        )}

                                        {isPublished && (
                                            <DropdownMenuItem onClick={makePostPrivate}>
                                                <Lock className="mr-2 h-4 w-4 text-purple-500" />
                                                <span>Make Private</span>
                                            </DropdownMenuItem>
                                        )}

                                        {!isArchived && !isDeleted && (
                                            <DropdownMenuItem onClick={() => setIsArchiveDialogOpen(true)}>
                                                <Archive className="mr-2 h-4 w-4 text-blue-500" />
                                                <span>Archive Post</span>
                                            </DropdownMenuItem>
                                        )}

                                        {isArchived && (
                                            <DropdownMenuItem onClick={unarchivePost}>
                                                <Undo2 className="mr-2 h-4 w-4 text-blue-500" />
                                                <span>Unarchive Post</span>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    {/* Danger zone */}
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive cursor-pointer"
                                            onClick={() => setIsDeleteDialogOpen(true)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Move to Trash</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </CardContent>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to move this post to trash?</AlertDialogTitle>
                        <AlertDialogDescription>
                            The post "{post.title}" will be moved to trash. You can restore it later or delete it permanently.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={deletePost}
                            className="bg-destructive hover:bg-destructive/90"
                            disabled={isLoading && actionType === 'delete'}
                        >
                            {isLoading && actionType === 'delete' ? 'Moving to trash...' : 'Move to Trash'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Permanent Delete Confirmation Dialog */}
            <AlertDialog open={isPermanentDeleteDialogOpen} onOpenChange={setIsPermanentDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                            Permanently Delete Post
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you absolutely sure you want to permanently delete "{post.title}"? This action CANNOT be undone.
                            All data associated with this post will be permanently removed from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={permanentlyDeletePost}
                            className="bg-destructive hover:bg-destructive/90"
                            disabled={isLoading && actionType === 'permanent-delete'}
                        >
                            {isLoading && actionType === 'permanent-delete' ? 'Deleting...' : 'Delete Permanently'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Archive Confirmation Dialog */}
            <AlertDialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Archive this post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Archiving will preserve the post but remove it from active listings.
                            You can unarchive it later if needed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={archivePost}
                            disabled={isLoading && actionType === 'archive'}
                        >
                            {isLoading && actionType === 'archive' ? 'Archiving...' : 'Archive Post'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Publication Request Dialog */}
            <AlertDialog open={isPublishRequestDialogOpen} onOpenChange={setIsPublishRequestDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Request Public Publication</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your post will be submitted for review. Once approved, it will be visible to the public.
                            Would you like to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={requestPublication}
                            disabled={isLoading && actionType === 'request-publish'}
                        >
                            {isLoading && actionType === 'request-publish' ? 'Submitting...' : 'Submit for Publication'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Rejection Details Dialog */}
            <AlertDialog open={isRejectionDetailsOpen} onOpenChange={setIsRejectionDetailsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                            Post Rejection Details
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-md border">
                                <h4 className="font-medium text-sm mb-1">Title</h4>
                                <p className="text-sm">{post.title}</p>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm mb-1">Rejection Reason</h4>
                                <div className="bg-destructive/10 border-l-4 border-destructive p-3 rounded-sm">
                                    <p className="text-sm">{rejectionReason}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm mb-1">Recommended Action</h4>
                                <p className="text-sm">You can edit your post to address the issues and resubmit it for approval.</p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="sm:order-1">Close</AlertDialogCancel>
                        <Button
                            asChild
                            className="w-full sm:w-auto sm:order-2"
                        >
                            <Link href={`/edit/${post.slug}`}>
                                Edit Post
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto sm:order-3"
                            onClick={submitForApproval}
                            disabled={isLoading && actionType === 'submit-for-approval'}
                        >
                            {isLoading && actionType === 'submit-for-approval' ? 'Submitting...' : 'Submit for Approval Again'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};