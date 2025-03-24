import React from 'react';
import { SkeletonCard } from './Skeleton';
import { BlogPostType, UserType } from '@/types/blogs-types';
import PostCard from './PostCard';
import LazyAdSense from '@/components/LazyAds';
interface BlogPostGridProps {
    loading: boolean;
    filteredPosts: BlogPostType[];
    users: { [key: string]: UserType };
}

const BlogPostGrid = ({ loading, filteredPosts, users }: BlogPostGridProps) => {
    const adClient = 'ca-pub-8778160378200057';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading && filteredPosts.length === 0
                    ? Array(6)
                        .fill(null)
                        .map((_, index) => <SkeletonCard key={index} />)
                    : filteredPosts.map((post, index) => (
                        <React.Fragment key={post._id}>
                            <PostCard post={post} user={users[post.createdBy]} />

                            {/* Insert ad after every 6 posts and ensure it spans full width */}
                            {(index + 1) % 6 === 0 && (
                                <div className="col-span-1 sm:col-span-2 xl:col-span-3 my-6">
                                    <LazyAdSense
                                        adClient={adClient}
                                        adSlot="9353510750"
                                        adFormat="fluid"
                                        className="rounded overflow-hidden"
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
};

export default BlogPostGrid;