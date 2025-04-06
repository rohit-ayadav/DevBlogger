"use client";
import React, { Suspense, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { cn } from "@/lib/utils";
import DOMPurify from 'dompurify';
import { BlogState } from '@/types/blogs-types';
import EditorCard from './component/EditorCard';
import PageHeader from './component/PageHeader';
import LoadingSpinner from './component/LoadingSpinner';
import useBlogDraft from '@/hooks/useBlogDraft';
import LoadingEffect from '@/lib/LoadingEffect';

const DEFAULT_CONTENT = {
    markdown: '',
    html: ''
} as const;

const DRAFT_EXPIRY = 86400000; // 24 hours in milliseconds
const DRAFT_STORAGE_KEY = 'blogDraft';
const DRAFT_SAVE_DELAY = 1000; // 1 second
const DRAFT_SUCCESS_DURATION = 1000;
const DRAFT_INFO_DELAY = 3000;
const DRAFT_INFO_DURATION = 1500;

const sanitizer = {
    title: (title: string) => DOMPurify.sanitize(title.slice(0, 250)),
    tags: (tag: string) => DOMPurify.sanitize(tag),
    slug: (slug: string) => DOMPurify.sanitize(slug),
    content: (value: string, editorMode: BlogState['editorMode']) => {
        if (editorMode === 'markdown') {
            return DOMPurify.sanitize(value);
        }
        return DOMPurify.sanitize(value);
    }
};


const validateBlogPost = (state: BlogState): string | null => {
    if (!state.title?.trim()) return 'Title is required';
    if (!state.htmlContent?.trim() && !state.markdownContent?.trim()) return 'Content is required';
    if (!state.category) return 'Category is required';
    if (!state.tags?.length) return 'At least one tag is required';
    return null;
};

function CreateBlogComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isDarkMode } = useTheme();

    const [loading, setLoading] = React.useState(false);

    const titleFromParams = useMemo(() =>
        searchParams?.get('title') || '',
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const initialState: BlogState = useMemo(() => ({
        isInitializing: true,
        isLoading: false,
        error: null,
        title: titleFromParams,
        thumbnail: null,
        thumbnailCredit: null,
        htmlContent: DEFAULT_CONTENT.html,
        markdownContent: DEFAULT_CONTENT.markdown,
        slug: '',
        tags: [],
        category: '',
        blogId: '',
        status: 'pending_review',
        tagAutoGen: false,
        editorMode: 'visual'
    }), [titleFromParams]);

    const { state, updateState, loadDraft, saveDraft } = useBlogDraft(initialState);

    const clearForm = useCallback(() => {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        updateState({
            title: '',
            thumbnail: null,
            thumbnailCredit: null,
            htmlContent: '',
            markdownContent: '',
            slug: '',
            tags: [],
            category: '',
            blogId: '',
            tagAutoGen: false,
            editorMode: 'visual'
        });
    }, [updateState]);

    // Load draft on mount
    React.useEffect(() => {
        const timeoutId = setTimeout(loadDraft, 100);
        return () => clearTimeout(timeoutId);
    }, [loadDraft]);

    // Auto-save draft with debounce
    React.useEffect(() => {
        if (state.isInitializing) return;

        // Don't save if content is empty default
        if (state.markdownContent === DEFAULT_CONTENT.markdown &&
            state.htmlContent === DEFAULT_CONTENT.html &&
            !state.title) return;

        const timeoutId = setTimeout(saveDraft, DRAFT_SAVE_DELAY);
        return () => clearTimeout(timeoutId);
    }, [state, saveDraft]);

    // Handle dismissing errors
    const handleDismissError = useCallback(() => {
        updateState({ error: null });
    }, [updateState]);

    // Handle saving draft with user notification
    const handleSaveDraft = useCallback(() => {
        saveDraft();
        toast.success('Draft saved successfully', {
            icon: '📝',
            duration: DRAFT_SUCCESS_DURATION,
        });

        setTimeout(() => {
            toast.success('Drafts are saved locally and will be available for 24 hours', {
                icon: '🕒',
                duration: DRAFT_INFO_DURATION,
            });
        }, DRAFT_INFO_DELAY);
    }, [saveDraft]);

    // Handle publishing blog post
    const handleSave = useCallback(async () => {
        const validationError = validateBlogPost(state);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        if (window.confirm('Your blog will be published as private. You can share the link with others, and it will become public after admin approval. Are you sure you want to proceed with publishing?')) {
            updateState({ isLoading: true });
            try {
                const blogPostData = {
                    title: sanitizer.title(state.title),
                    content: sanitizer.content(
                        state.editorMode === 'markdown' ? state.markdownContent : state.htmlContent,
                        state.editorMode
                    ),
                    thumbnail: state.thumbnail,
                    thumbnailCredit: state.thumbnailCredit,
                    slug: sanitizer.slug(state.slug),
                    tags: state.tags.map(sanitizer.tags),
                    category: state.category,
                    status: state.status,
                    language: state.editorMode === 'markdown' ? 'markdown' : 'html',
                };

                const response = await fetch('/api/blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blogPostData),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Failed to create blog post');

                updateState({ blogId: data.data.id });
                localStorage.removeItem(DRAFT_STORAGE_KEY);
                toast.success('Blog post created successfully');
                clearForm();
                if (state.status === 'draft')
                    router.push(`/dashboard?tab=posts`);
                else
                    router.push(`/blogs/${data.data.id}`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                updateState({ error: errorMessage });
                toast.error(errorMessage);
            } finally {
                updateState({ isLoading: false });
                setLoading(false);
            }
        }
    }, [state, updateState, clearForm, router]);

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
                    title={state.blogId ? "Edit Blog Post" : "Create Blog Post"}
                />

                <EditorCard
                    state={state}
                    updateState={updateState}
                    handleSave={handleSaveDraft}
                    handleSubmit={handleSave}
                    isDarkMode={isDarkMode}
                    clearForm={clearForm}
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

const CreateBlog = () => (
    <Suspense fallback={<LoadingEffect />}>
        <CreateBlogComponent />
    </Suspense>
);

export default CreateBlog;