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
        }
        if (status === 'authenticated') {
            if (session?.user?.email) {
                checkIsAdmin(session.user.email).then(isAdmin => {
                    if (isAdmin) {
                        setIsAdmin(true);
                    }
                    setIsAdminLoading(false);
                });
            }
        }
    }, [status, session]);

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="mt-2">You do not have permission to access this page.</p>
            </div>
        );
    }
    if(!isAdminLoading && !isAdmin) {
        return <UnauthorizedPage />;
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={fetchData}>Refresh All Data</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <TabsList className="flex flex-wrap gap-2 mb-4">
                        <TabsTrigger value='approval'>Approval</TabsTrigger>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                        <TabsTrigger value="contact">Contact Form</TabsTrigger>
                        <TabsTrigger value="notification">Notification</TabsTrigger>
                    </TabsList>

                    <TabsContent value="approval">
                        <Suspense fallback={<LoadingEffect />}>
                            <Approval />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="overview" className="space-y-4">
                        <Overview posts={posts} />
                    </TabsContent>

                    <TabsContent value="posts">
                        <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                            <PostManagement
                                posts={filteredPosts}
                                loading={loading}
                                searchTerm={searchTerm}
                                handleSearch={handleSearch}
                            />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="categories">
                        <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                            <CategoryOverview stats={stats} />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="users">
                        <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
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