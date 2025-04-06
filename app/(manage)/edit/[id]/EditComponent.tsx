"use client";
import React, { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { cn } from "@/lib/utils";
import DOMPurify from 'dompurify';
import LoadingSpinner from '../../create/component/LoadingSpinner';
import PageHeader from '../../create/component/PageHeader';
import EditorCard from '../../create/component/EditorCard';
import { EditBlogState } from '@/types/blogs-types';
import { updateBlog } from '@/action/updateBlog';
import MarkdownIt from 'markdown-it';

const DEFAULT_CONTENT = {
    markdown: '',
    html: ''
} as const;

function EditBlogComponent({ BlogData }: { BlogData: EditBlogState }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isDarkMode } = useTheme();
    const initialState: EditBlogState = useMemo(() => ({
        isInitializing: BlogData.isInitializing || false,
        isLoading: BlogData.isLoading || false,
        error: BlogData.error || null,
        success: BlogData.success || false,
        title: BlogData.title || '',
        thumbnail: BlogData.thumbnail || null,
        thumbnailCredit: BlogData.thumbnailCredit || null,
        htmlContent: BlogData.htmlContent || DEFAULT_CONTENT.html,
        markdownContent: BlogData.markdownContent || DEFAULT_CONTENT.markdown,
        slug: BlogData.slug || '',
        tags: BlogData.tags || [],
        category: BlogData.category || '',
        blogId: BlogData.blogId || '',
        status: 'pending_review',
        createdBy: BlogData.createdBy || '',
        tagAutoGen: false,
        editorMode: 'visual'
    }), [BlogData, searchParams?.get('title') || '']);

    const [state, setState] = React.useState<EditBlogState>(initialState);

    const updateState = React.useCallback((updates: Partial<EditBlogState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    // Handle dismissing errors
    const handleDismissError = useCallback(() => {
        updateState({ error: null });
    }, [updateState]);

    const clearForm = useCallback(() => {
        setState(initialState);
    }, [initialState]);

    const sanitizeContent = {
        title: (title: string) => DOMPurify.sanitize(title.slice(0, 250)),
        tags: (tag: string) => DOMPurify.sanitize(tag),
        content: (value: string) => {
            if (state.editorMode === 'markdown') {
                const md = new MarkdownIt({ html: true });
                return DOMPurify.sanitize(md.render(value));
            }
            return DOMPurify.sanitize(value);
        }
    };

    const validateForm = (state: EditBlogState) => {
        if (!state.title) return 'Title is required';
        if (!state.htmlContent && !state.markdownContent) return 'Content is required';
        if (!state.category) return 'Category is required';
        if (state.tags.length < 1) return 'At least one tag is required';
        return null;
    };

    // Handle publishing blog post
    const handleSave = async () => {
        const validationError = validateForm(state);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        updateState({ isLoading: true });

        const blogPostData = {
            title: sanitizeContent.title(state.title),
            content: sanitizeContent.content(
                state.editorMode === 'markdown' ? state.markdownContent : state.htmlContent
            ),
            thumbnail: state.thumbnail,
            thumbnailCredit: state.thumbnailCredit,
            tags: state.tags.map(sanitizeContent.tags),
            category: state.category,
            status: state.status,
            language: state.editorMode === 'markdown' ? 'markdown' : 'html',
            id: state.blogId,
            slug: state.slug,
        };

        const response = await updateBlog(blogPostData);

        if (response.error) {
            updateState({ isLoading: false });
            toast.error(response.error);
            return;
        }
        updateState({ isLoading: false });
        toast.success(`${response.message}`);
        router.push(`/blogs/${state.slug}`);

    };
    // Loading state component
    if (state.isInitializing) {
        return (
            <div className={cn(
                "flex items-center justify-center min-h-[60vh]",
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            )}>
                <LoadingSpinner isDarkMode={isDarkMode} />
            </div>
        );
    }

    return (
        <div className={cn(
            "w-full px-4 py-6 md:py-8",
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
        )}>
            <div className="max-w-6xl mx-auto space-y-6">
                <PageHeader
                    isDarkMode={isDarkMode}
                    error={state.error}
                    onDismissError={handleDismissError}
                    title={"Edit Blog Post"}
                />

                <EditorCard
                    state={state}
                    updateState={updateState}
                    handleSave={() => { }}
                    handleSubmit={handleSave}
                    isDarkMode={isDarkMode}
                    clearForm={clearForm}
                    isCompact={false}
                    isEdit={true}
                />

                <div className="text-center py-4">
                    <p
                        className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}
                    >
                        Need help writing? Check out our{" "}
                        <a
                            href="/guides/how-to-write"
                            className={cn(
                                "font-medium hover:underline",
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                            )}
                        >
                            writing guide
                        </a>{" "}
                        and{" "}
                        <a
                            href="/content-guidelines"
                            className={cn(
                                "font-medium hover:underline",
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                            )}
                        >
                            content guidelines
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EditBlogComponent;