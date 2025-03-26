// app/manage/preview/[id]/page.tsx
// This page will show the preview of the blog post how actually the blog page will look like
// User will come here after creating the blog post and if they think all is good then they can publish the blog post
// and we will update the blog as published from draft

import React from 'react';
import BlogPostLayout from '@/components/BlogPostLayout/page';
import { notFound } from 'next/navigation';
import Blog from '@/models/blogs.models';
import User from '@/models/users.models';
import { connectDB } from '@/utils/db';
import { isValidObjectId } from 'mongoose';
import { Author, BlogPostType } from '@/types/blogs-types';
import BlogPostClientContent from '@/components/BlogPostContent/page';
import { isValidSlug } from '@/lib/common-function';
import serializeDocument from '@/utils/date-formatter';
import { revalidateBlog } from '@/action/revalidate-post';
import { ErrorMessage } from '@/lib/ErrorMessage';
import PreviewConfirmation from './PreviewConfirmation';

interface ApiResponse {
    success: boolean;
    statusCode: number;
    error?: string;
    data?: BlogPostType;
    author?: Author;
}

async function getPostData(id: string): Promise<ApiResponse> {
    try {
        await connectDB();
        let post;

        if (isValidObjectId(id)) {
            post = await Blog.findById(id).lean().exec();
        } else if (isValidSlug(id)) {
            post = await Blog.findOne({ slug: id }).lean().exec();
        }

        if (!post) {
            return {
                success: false,
                statusCode: 404,
                error: 'Blog post not found'
            };
        }

        // Get author information
        const createdBy = Array.isArray(post) ? post[0]?.createdBy : post?.createdBy;
        const authorDoc = await User.findOne({ email: createdBy }).lean().exec();

        // Create default author if none found
        const author: Author = authorDoc ? serializeDocument(authorDoc) : {
            name: 'Anonymous',
            image: '/default-profile.jpg',
            _id: '0',
            likes: 0,
            views: 0,
        };

        // Serialize the post data
        const serializedPost = serializeDocument(post);
        const serializedAuthor = serializeDocument(author);

        // revalidate the page
        await revalidateBlog(serializedPost.slug);
        return {
            success: true,
            data: serializedPost as BlogPostType,
            author: serializedAuthor as Author,
            statusCode: 200,
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            statusCode: 500,
        };
    }
}

export default async function IndividualBlogPost({ params }: { params: { id: string } }) {
    const response = await getPostData(params.id);

    if (!response || !response.success) {
        switch (response.statusCode) {
            case 404:
                notFound();
            case 403:
                return <ErrorMessage message="You don't have permission to view this blog post" />;
            case 401:
                return <ErrorMessage message="Please login to view this blog post" />;
            default:
                return <ErrorMessage message={response.error || 'Failed to load blog post'} />;
        }
    }

    if (!response.author) {
        return <ErrorMessage message="Author not found" />;
    }
    if (!response.data) {
        return <ErrorMessage message="Blog post not found" />;
    }

    return (
        <>
            <PreviewConfirmation id={params.id} />
            {/* <BlogPostLayout
                post={response.data}
                id={params.id}
                isLoading={false}
                author={response.author}
            >
                <BlogPostClientContent
                    initialData={response.data}
                    id={params.id}
                    author={response.author}
                />
            </BlogPostLayout> */}
        </>
    );
}