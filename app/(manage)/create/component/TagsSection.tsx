import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Tag, X, Check } from "lucide-react";

interface TagsSectionProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    content: string;
    isDarkMode?: boolean;
}

export const TagsSection = ({
    tags,
    setTags,
    content,
    isDarkMode
}: TagsSectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [successAnimation, setSuccessAnimation] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const generateTags = async () => {
        if (content.length < 50) {
            toast.error('Content should be at least 50 characters long to generate tags');
            return;
        }

        setIsLoading(true);

        try {
            const newTags = await generateTagsFromContent(content);
            if (newTags && newTags.length > 0) {
                const uniqueTags = [...new Set([...tags, ...newTags])];
                setTags(uniqueTags);
                setSuccessAnimation(true);
                setTimeout(() => setSuccessAnimation(false), 2000);
                toast.success(`${newTags.length} tags generated successfully`);
            } else {
                toast.error('No relevant tags found');
            }
        } catch (error) {
            toast.error('Failed to generate tags');
            console.error('Error generating tags:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateTagsFromContent = async (content: string) => {
        try {
            const response = await fetch('/api/generateTags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate tags');
            }

            const data = await response.json();
            return data.tags;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    };

    const handleTagInput = (value: string) => {
        if (!value.trim()) return;

        const newTags = value
            .split(/[,#\n]/)
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag && !tags.includes(tag));

        if (newTags.length) {
            setTags([...tags, ...newTags]);
            setTagInput('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Card className={`w-full mt-2 sm:mt-3 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                <div className="flex items-center">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-muted-foreground" />
                    <CardTitle className="text-lg sm:text-xl font-bold">Tags</CardTitle>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateTags}
                    disabled={isLoading || content.length < 50}
                    className={`flex items-center gap-1.5 text-xs sm:text-sm h-8 sm:h-9 transition-all ${successAnimation ? 'bg-green-100 text-green-800 border-green-300' : ''
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    ) : successAnimation ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                        <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    <span className="hidden sm:inline">Generate</span> Tags
                </Button>
            </CardHeader>
            <CardContent className="space-y-3 px-3 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                    <Input
                        ref={inputRef}
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tags (separate by comma or press enter)"
                        className={`w-full text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-background'}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                handleTagInput(tagInput);
                            }
                        }}
                        onBlur={() => {
                            if (tagInput) {
                                handleTagInput(tagInput);
                            }
                        }}
                    />
                </div>

                <div className="relative min-h-[40px]">
                    {tags.length > 0 ? (
                        <div className="mt-3 sm:mt-4 animate-fadeIn">
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                                {tags.length} {tags.length === 1 ? 'Tag' : 'Tags'}:
                            </p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tags.map((tag, index) => (
                                    <Badge
                                        key={`${tag}-${index}`}
                                        variant="secondary"
                                        className={`flex items-center gap-1 px-2 py-0.5 sm:py-1 text-xs sm:text-sm 
                                                 transition-colors ${isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-secondary/50 hover:bg-secondary/70'
                                            }`}
                                    >
                                        {tag}
                                        <button
                                            onClick={() => removeTag(index)}
                                            className="ml-0.5 text-muted-foreground hover:text-destructive 
                                                     transition-colors focus:outline-none focus:ring-2 
                                                     focus:ring-ring focus:ring-offset-1 rounded-full"
                                            aria-label={`Remove ${tag} tag`}
                                        >
                                            <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setTags([])}
                                className={`mt-2 text-xs sm:text-sm h-7 px-2 transition-colors ${isDarkMode
                                        ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                                        : 'text-destructive hover:text-destructive/90 hover:bg-destructive/10'
                                    }`}
                            >
                                Clear all tags
                            </Button>
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground mt-2">No tags added yet. Type or generate tags from your content.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TagsSection;