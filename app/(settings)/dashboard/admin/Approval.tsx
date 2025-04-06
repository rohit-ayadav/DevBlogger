import React, { useEffect, useState } from 'react';
import { ApproveBlog, getPendingBlogs } from '@/action/approval';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/app/_component/Post/Skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, RefreshCcw, XCircle } from 'lucide-react';
import { BlogPostType } from '@/types/blogs-types';
import { Toaster } from "@/components/ui/toaster"

const Approval = () => {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sendNotification, setSendNotification] = useState(true); // Default to true
    const [users, setUsers] = useState<Record<string, any>>({});
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error,
            });
        }
        setTimeout(() => setError(null), 5000);
    }, [error]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getPendingBlogs();
            if (response.error) {
                setError(response.error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error,
                });
            } else {
                setPosts(response.blogs || []);
                if (response.message) {
                    toast({
                        title: "Success",
                        description: response.message,
                    });
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred while fetching posts";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (postId: string) => {
        setLoading(true);
        try {
            const response = await ApproveBlog(postId, sendNotification, 'approved', '');
            if (response.error) {
                setError(response.error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error,
                });
            } else {
                toast({
                    title: "Success",
                    description: response.message || "Blog approved successfully",
                });
                fetchPosts();
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred while approving the post";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    const openRejectDialog = (postId: string) => {
        setSelectedPostId(postId);
        setRejectReason('');
        setRejectDialogOpen(true);
    };

    const handleReject = async () => {
        if (!selectedPostId) return;

        setLoading(true);
        try {
            const response = await ApproveBlog(selectedPostId, sendNotification, 'rejected', rejectReason);
            if (response.error) {
                setError(response.error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error,
                });
            } else {
                toast({
                    title: "Success",
                    description: response.message || "Blog rejected successfully",
                });
                setRejectDialogOpen(false);
                fetchPosts();
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred while rejecting the post";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        // You may want to fetch users data here as well
        // if not included in the getPendingBlogs response
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-6">
            <Toaster />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold">New Posts for Approval</h1>
                <div className="flex items-center space-x-2">
                    {/* // Refresh button */}
                    <Button
                        className='bg-blue-600 hover:bg-blue-700'
                        onClick={fetchPosts}
                        disabled={loading}
                    >
                        <RefreshCcw size={16} className="mr-2" />
                        Refresh Posts
                    </Button>
                    <Checkbox
                        id="sendNotification"
                        checked={sendNotification}
                        onCheckedChange={(checked) => setSendNotification(checked as boolean)}
                    />
                    <label htmlFor="sendNotification" className="text-sm font-medium">
                        Send push notification to all users
                    </label>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 p-4 mb-6 rounded-md text-red-700 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {posts.length === 0 && !loading ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    No pending posts to approve
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading && posts.length === 0
                        ? Array(6)
                            .fill(null)
                            .map((_, index) => <SkeletonCard key={index} />)
                        : posts.map((post) => (
                            <Card key={post._id} className="overflow-hidden flex flex-col h-full">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-bold line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                        <Badge variant="outline">{post.category}</Badge>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-2">
                                        <span>Submitted: {formatDate(post.createdAt)}</span>
                                        <span>Language: {post.language}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {post.thumbnail && (
                                        <div className="mb-3 rounded-md overflow-hidden">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="max-h-32 overflow-hidden text-sm text-gray-700">
                                        {/* Display truncated content or summary */}
                                        {post.content.substring(0, 200)}...
                                    </div>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {post.tags.splice(0, 3).map((tag, index) => (
                                                // Limit to 3 tags for display
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="bg-gray-50 flex justify-between gap-3 flex-wrap">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => openRejectDialog(post._id)}
                                        disabled={loading}
                                    >
                                        <XCircle size={16} className="mr-1" />
                                        Reject
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApprove(post._id)}
                                        disabled={loading}
                                    >
                                        <CheckCircle size={16} className="mr-1" />
                                        Approve
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                </div>
            )}

            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Reject Blog Post</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="reason" className="text-sm font-medium">
                                    Reason for Rejection
                                </label>
                                <Textarea
                                    id="reason"
                                    placeholder="Please provide a reason for rejection that will be sent to the author..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="mt-1"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setRejectDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleReject}
                            disabled={!rejectReason.trim()}
                        >
                            Reject Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Approval;