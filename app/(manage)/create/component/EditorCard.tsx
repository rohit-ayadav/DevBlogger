import React, { useCallback } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TitleSection } from './TitleSection';
import ThumbnailSection from './ThumbnailSection';
import { EditorSection } from './EditorSection';
import { TagsSection } from './TagsSection';
import { CategorySection } from './CategorySection';
import { ActionButtons } from './ActionButtons';
import { CATEGORIES, BlogState } from '@/types/blogs-types';
import { UrlSection } from './CustomURL';
import PostVisibility from './PostVisibility';

interface EditorCardProps {
    state: BlogState;
    updateState: (updates: Partial<BlogState>) => void;
    handleSave: () => void;
    handleSubmit: () => void;
    isDarkMode: boolean;
    clearForm: () => void;
    className?: string;
    isCompact?: boolean;
    isEdit?: boolean;
}
interface EditorMode {
    editorMode: 'markdown' | 'visual' | 'html';
}

const EditorCard: React.FC<EditorCardProps> = ({
    state,
    updateState,
    handleSave,
    handleSubmit,
    isDarkMode,
    clearForm,
    className,
    isCompact = false,
    isEdit = false
}) => {
    const getContent = useCallback(() =>
        state.editorMode === 'markdown' ? state.markdownContent : state.htmlContent,
        [state.editorMode, state.markdownContent, state.htmlContent]
    );

    const handleContentUpdate = useCallback((content: string) => {
        const key = state.editorMode === 'markdown' ? 'markdownContent' : 'htmlContent';
        updateState({ [key]: content });
    }, [state.editorMode, updateState]);

    const handleEditorModeToggle = useCallback((editorMode: 'markdown' | 'visual' | 'html') => {
        updateState({ editorMode });
    }, [updateState]);

    const sectionSpacing = isCompact ? "space-y-3 sm:space-y-4" : "space-y-4 sm:space-y-6 md:space-y-8";
    const padding = isCompact
        ? "p-3 sm:p-4"
        : "p-4 sm:p-5 md:p-6 lg:p-8";

    return (
        <Card className={cn(
            "transition-colors duration-200",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white",
            "w-full mx-auto",
            isCompact ? "max-w-full sm:max-w-4xl" : "max-w-full sm:max-w-5xl",
            className
        )}>
            <CardContent className={cn(
                sectionSpacing,
                padding,
                isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
                {/* Better responsive grid for title and thumbnail sections */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                        <TitleSection
                            title={state.title}
                            setTitle={(title) => updateState({ title })}
                            content={getContent()}
                            isDarkMode={isDarkMode}
                        />
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <ThumbnailSection
                            thumbnail={state.thumbnail}
                            setThumbnail={(thumbnail) => updateState({ thumbnail })}
                            thumbnailCredit={state.thumbnailCredit}
                            setThumbnailCredit={(thumbnailCredit) => updateState({ thumbnailCredit })}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                </div>

                <EditorSection
                    content={getContent()}
                    editorMode={state.editorMode}
                    setEditorMode={handleEditorModeToggle}
                    handleContentChange={handleContentUpdate}
                    isDarkMode={isDarkMode}
                />

                <div aria-hidden="true" className={cn(
                    "border-t my-3 sm:my-4 md:my-6",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                )} />

                <div className="space-y-4 sm:space-y-6">
                    <UrlSection
                        customUrl={state.slug}
                        setCustomUrl={(slug: string) => updateState({ slug })}
                        title={state.title}
                        isDarkMode={isDarkMode}
                    />

                    {/* Improved grid breakpoints for better mobile experience */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                        <TagsSection
                            tags={state.tags}
                            setTags={(tags) => updateState({ tags })}
                            content={getContent()}
                            isDarkMode={isDarkMode}
                        />

                        <CategorySection
                            category={state.category}
                            setCategory={(category) => updateState({ category })}
                            categories={CATEGORIES}
                            isDarkMode={isDarkMode}
                        />
                    </div>

                    {/* Post visibility options */}
                    <PostVisibility state={state} isDarkMode={isDarkMode} updateState={updateState} />
                </div>

                <div className="mt-4 sm:mt-6">
                    <ActionButtons
                        loading={state.isLoading}
                        handleSave={handleSave}
                        handleSubmit={handleSubmit}
                        isDarkMode={isDarkMode}
                        clearDraft={clearForm}
                        mode={isEdit ? "edit" : "create"}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default EditorCard;