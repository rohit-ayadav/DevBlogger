"use client";
import React, { Suspense, lazy, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ThumbsUp, Tag, Loader2, BarChart as BarChartIcon } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import ContactFormPage from './ContactFormPage';
import NewsLetterPage from './NewsLetterPage';
import NotificationTest from '@/components/NotificationTest/page';
import StatCard, { ErrorFallback } from '@/app/(settings)/dashboard/admin/Statscard';
import useAdmin from './useAdmin';
import Overview from './Overview';
import { useSession } from 'next-auth/react';
import LoadingEffect from '@/lib/LoadingEffect';
import { isAdmin as checkIsAdmin } from '@/action/my-profile-action';
import Approval from './Approval';
import UnauthorizedPage from '@/app/(auth-pages)/unauthorized/page';

// Lazy loaded components for better initial load performance
const PostManagement = lazy(() => import('./PostManagement'));
const CategoryOverview = lazy(() => import('./CategoryOverview'));
const UserManagement = lazy(() => import('./UserManagement'));

const OptimizedAdminDashboard = () => {
    const {
        posts,
        filteredPosts,
        loading,
        searchTerm,
        handleSearch,
        stats,
        contactUsDataPage,
        newsLetterDataPage,
        fetchData,
    } = useAdmin();

    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isAdminLoading, setIsAdminLoading] = React.useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') {
            return;
        }
        if (status === 'unauthenticated') {
            setIsAdmin(false);
            setIsAdminLoading(false);
        }
        if (status === 'authenticated' && session?.user?.email) {
            checkIsAdmin(session.user.email).then(isAdmin => {
                setIsAdmin(isAdmin);
                setIsAdminLoading(false);
            });
        }
    }, [status, session]);

    if (isAdminLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <h1 className="text-xl font-semibold text-center">Checking permissions...</h1>
            </div>
        );
    }

    if (!isAdmin) {
        return <UnauthorizedPage />;
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6 lg:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={fetchData} size="sm" className="w-full sm:w-auto">
                    Refresh All Data
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Posts"
                    value={stats.totalPosts}
                    icon={Tag}
                    subValue={`${stats.uncategorizedPosts} uncategorized`}
                />
                <StatCard
                    title="Total Views"
                    value={stats.totalViews.toLocaleString()}
                    icon={Eye}
                />
                <StatCard
                    title="Total Likes"
                    value={stats.totalLikes.toLocaleString()}
                    icon={ThumbsUp}
                />
                <StatCard
                    title="Categories"
                    value={stats.categoryStats.length}
                    icon={BarChartIcon}
                />
            </div>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Tabs defaultValue="overview" className="space-y-4">
                    <div className="w-full overflow-x-auto pb-2">
                        <TabsList className="flex min-w-max">
                            <TabsTrigger value="approval">Approval</TabsTrigger>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="posts">Posts</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                            <TabsTrigger value="contact">Contact Form</TabsTrigger>
                            <TabsTrigger value="notification">Notification</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="approval">
                        <Suspense fallback={<LoadingEffect />}>
                            <Approval />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="overview" className="space-y-4">
                        <Overview posts={posts} />
                    </TabsContent>

                    <TabsContent value="posts">
                        <Suspense fallback={
                            <div className="flex justify-center p-12">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        }>
                            <PostManagement
                                posts={filteredPosts}
                                loading={loading}
                                searchTerm={searchTerm}
                                handleSearch={handleSearch}
                            />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="categories">
                        <Suspense fallback={
                            <div className="flex justify-center p-12">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        }>
                            <CategoryOverview stats={stats} />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="users">
                        <Suspense fallback={
                            <div className="flex justify-center p-12">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        }>
                            <UserManagement />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="newsletter">
                        <NewsLetterPage subscribers={newsLetterDataPage} />
                    </TabsContent>

                    <TabsContent value="contact">
                        <ContactFormPage data={contactUsDataPage} />
                    </TabsContent>

                    <TabsContent value="notification">
                        <NotificationTest />
                    </TabsContent>
                </Tabs>
            </ErrorBoundary>
        </div>
    );
};

export default OptimizedAdminDashboard;