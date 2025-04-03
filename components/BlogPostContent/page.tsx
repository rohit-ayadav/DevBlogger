"use client";

import React, { Suspense, useEffect, useMemo } from 'react';
import { Author, BlogPostType } from '@/types/blogs-types';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import BlogPostHeader from '../BlogPostHeader/page';
import BlogPostFooter from '../BlogPostFooter/page';
import { useTheme } from '@/context/ThemeContext';
import { incrementView } from '@/lib/viewIncrement';
import CommentSection from '@/app/_component/CommentComponent/Comment';
import RC from '@/app/blogs/components/RC';
import MarkdownContent from '../ShowMD/MarkDownContent';

const SKELETON_COUNT = 3;

interface BlogPostClientContentProps {
    initialData: BlogPostType;
    id: string;
    author: Author;
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div className="text-center py-8 space-y-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
            {error.message || "We couldn't load this content. Please try again."}
        </p>
        <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-blue-500 text-white rounded-md 
                hover:bg-blue-600 transition-colors duration-200
                dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            aria-label="Try loading the content again"
        >
            Try again
        </button>
    </div>
);

const SectionSkeleton = () => (
    <div className="space-y-4 px-4 animate-pulse dark:bg-gray-800/50 p-6 rounded-lg">
        <Skeleton className="h-6 w-32 dark:bg-gray-700" />
        <div className="space-y-3">
            {Array(SKELETON_COUNT).fill(null).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-32 w-full dark:bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 dark:bg-gray-700" />
                </div>
            ))}
        </div>
    </div>
);

const BlogPostContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-12">
                {children}
            </div>
        </div>
    </div>
);

const BlogPostClientContent: React.FC<BlogPostClientContentProps> = ({
    initialData,
    id,
    author
}) => {
    const { isDarkMode } = useTheme();

    const postStats = useMemo(() => ({
        likes: initialData.likes || 0,
        views: initialData.views || 0
    }), [initialData.likes, initialData.views]);

    useEffect(() => {
        const timer = setTimeout(() => {
            incrementView(id, false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [id]);

    const handleError = (error: Error) => {
        console.error('Blog post error:', error);
        // Would add analytics tracking here
    };

    const themeClasses = isDarkMode
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900';

    const proseClasses = isDarkMode
        ? 'prose-dark dark:prose-invert prose-headings:text-gray-100 prose-p:text-gray-200 prose-a:text-blue-400 prose-strong:text-white'
        : 'prose-light prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-black';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={handleError}
                onReset={() => window.location.reload()}
            >
                <BlogPostHeader post={initialData} author={author} isDarkMode={isDarkMode} />

                <BlogPostContainer>
                    <article className={`prose max-w-none ${proseClasses}`}>
                        {initialData.language === 'markdown' ? (() => {
                            const sections = initialData.content.split(/(?=^##\s)/m);
                            return <MarkdownContent sections={sections} />;
                        })() : (
                            <RC {...initialData} />
                        )}
                        <BlogPostFooter
                            post={initialData}
                            likes={postStats.likes}
                            views={postStats.views}
                            id={id}
                        />
                    </article>

                    <section
                        className={`mt-8 pt-8 border-t rounded-lg ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}
                        aria-label="Comments"
                    >
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onError={handleError}
                            onReset={() => window.location.reload()}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <CommentSection postId={id} />
                            </Suspense>
                        </ErrorBoundary>
                    </section>
                </BlogPostContainer>
            </ErrorBoundary>
        </div>
    );
};

export default BlogPostClientContent;