import React, { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, TriangleAlertIcon, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface TitleSectionProps {
    title: string;
    setTitle: (title: string) => void;
    content: string;
    isDarkMode?: boolean;
    maxLength?: number;
    className?: string;
    disabled?: boolean;
}

export const TitleSection: React.FC<TitleSectionProps> = ({
    title,
    setTitle,
    content,
    isDarkMode = false,
    maxLength = 250,
    className,
    disabled = false
}) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasError, setHasError] = useState<string | null>(null);

    const characterProgress = (title.length / maxLength) * 100;
    const isNearingLimit = title.length > maxLength * 0.8;
    const minContentLength = 50;

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setHasError(null);
    }, [setTitle]);

    const generateTitle = useCallback(async () => {
        if (content.length < minContentLength) {
            setHasError(`Content should be at least ${minContentLength} characters long to generate title`);
            toast.error(`Content should be at least ${minContentLength} characters long to generate title`);
            return;
        }

        if (isGenerating) return;
        setIsGenerating(true);
        setHasError(null);

        try {
            await toast.promise(
                getTitle(content),
                {
                    loading: 'Generating title...',
                    success: 'Title generated successfully',
                    error: 'Failed to generate title'
                }
            ).then(newTitle => {
                if (newTitle) {
                    setTitle(newTitle);
                }
            });
        } catch (error) {
            console.error('Error generating title:', error);
            setHasError('Failed to generate title. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [content, isGenerating, setTitle]);

    const getTitle = async (content: string): Promise<string> => {
        const response = await fetch("/api/generateTitle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to generate title');
        return data.title;
    };

    return (
        <Card className={cn(
            "w-full",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                <div className="flex items-center">
                    <Type className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-muted-foreground" />
                    <CardTitle className="text-lg sm:text-xl font-bold">Blog Title</CardTitle>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                    {title.length} / {maxLength}
                </span>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="blog-title" className="text-sm">
                        Enter your blog title
                    </Label>

                    <Input
                        id="blog-title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter the blog title"
                        maxLength={maxLength}
                        className={cn(
                            "w-full text-base sm:text-lg",
                            isDarkMode ? "bg-gray-700 border-gray-600" : "",
                            isNearingLimit ? "border-amber-500" : "",
                            disabled ? "opacity-60 cursor-not-allowed" : ""
                        )}
                        aria-invalid={isNearingLimit ? "true" : "false"}
                        aria-describedby={isNearingLimit ? "title-warning" : undefined}
                        disabled={disabled || isGenerating}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <Button
                            variant="link"
                            size="sm"
                            onClick={generateTitle}
                            disabled={disabled || isGenerating || content.length < minContentLength}
                            className={cn(
                                "p-0 h-auto font-normal text-sm justify-start",
                                isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                            )}
                            aria-label="Generate title from content"
                        >
                            {isGenerating ? (
                                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 animate-spin" />
                            ) : null}
                            Generate title from content
                        </Button>
                    </div>

                    {title.length > 0 && (
                        <Progress
                            value={characterProgress}
                            className={cn(
                                "h-1",
                                isDarkMode ? "bg-gray-700" : "",
                                isNearingLimit ? "text-amber-500" : ""
                            )}
                        />
                    )}

                    {isNearingLimit && (
                        <p id="title-warning" className="text-amber-500 dark:text-amber-400 text-sm flex items-center">
                            <TriangleAlertIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                            <span>Approaching maximum length ({maxLength} characters)</span>
                        </p>
                    )}

                    {hasError && (
                        <p className="text-red-500 dark:text-red-400 text-sm flex items-center">
                            <TriangleAlertIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                            <span>{hasError}</span>
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TitleSection;