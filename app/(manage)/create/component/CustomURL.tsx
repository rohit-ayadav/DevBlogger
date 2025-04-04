import React, { useEffect, useState, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSeoSlug } from '@/lib/common-function';
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useTheme } from '@/context/ThemeContext';

interface UrlSectionProps {
    customUrl: string;
    setCustomUrl: (url: string) => void;
    title: string;
    isDarkMode?: boolean;
    className?: string;
    baseUrl?: string;
    autoGenerateDelay?: number;
}

export const UrlSection: React.FC<UrlSectionProps> = ({
    customUrl,
    setCustomUrl,
    title,
    isDarkMode = false,
    className,
    baseUrl = 'https://www.devblogger.in/blogs',
    autoGenerateDelay = 5000
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!customUrl && title) {
            setIsGenerating(true);
            const timeout = setTimeout(() => {
                setCustomUrl(generateSeoSlug(title));
                setIsGenerating(false);
            }, autoGenerateDelay);

            return () => {
                clearTimeout(timeout);
                setIsGenerating(false);
            };
        }
    }, [title, customUrl, setCustomUrl, autoGenerateDelay]);

    useEffect(() => {
        if (customUrl && !inputValue) {
            setInputValue(customUrl);
        }
    }, [customUrl, inputValue]);

    const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // Only allow alphanumeric characters, hyphens, and spaces in input
        if (!/^[a-zA-Z0-9\s-]*$/.test(input)) {
            return;
        }

        setInputValue(input);
        const formatted = generateSeoSlug(input);
        setCustomUrl(formatted);
    }, [setCustomUrl]);

    const handleGenerateFromTitle = useCallback(() => {
        if (title) {
            const newSlug = generateSeoSlug(title);
            setInputValue(newSlug);
            setCustomUrl(newSlug);
            toast.success("URL generated from title");
        } else {
            toast.error("Please add a title first");
        }
    }, [title, setCustomUrl]);

    const displayUrl = customUrl || generateSeoSlug(title) || '';
    const copyToClipboard = useCallback(() => {
        const fullUrl = `${baseUrl}/${displayUrl}`;
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                setIsCopied(true);
                toast.success("URL copied to clipboard");
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(() => {
                toast.error("Failed to copy URL");
            });
    }, [baseUrl, displayUrl]);

    return (
        <Card className={cn(
            "w-full",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                <div className="flex items-center">
                    <Link className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-muted-foreground" />
                    <CardTitle className="text-lg sm:text-xl font-bold">Custom URL</CardTitle>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateFromTitle}
                    disabled={!title || isGenerating}
                    className="text-xs sm:text-sm h-8"
                >
                    Generate from title
                </Button>
            </CardHeader>

            <CardContent className="space-y-3 px-3 sm:px-6">
                <div className="grid w-full items-center gap-2">
                    <Label
                        htmlFor="customUrl"
                        className="text-sm text-muted-foreground"
                    >
                        Enter a custom URL for your blog post (optional)
                    </Label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex-shrink-0 text-xs sm:text-sm text-muted-foreground font-mono break-all py-2 sm:py-0">
                            {baseUrl}/
                        </div>

                        <div className="w-full relative">
                            <Input
                                id="customUrl"
                                value={inputValue || displayUrl}
                                onChange={handleUrlChange}
                                placeholder="my-awesome-blog-post"
                                className={cn(
                                    "w-full text-sm sm:text-base font-mono pr-10",
                                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-background"
                                )}
                                maxLength={100}
                                aria-label="Custom URL slug"
                            />

                            {displayUrl && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-7 w-7 p-0"
                                    onClick={copyToClipboard}
                                    aria-label="Copy URL to clipboard"
                                >
                                    <Copy className={cn(
                                        "h-4 w-4",
                                        isCopied ? "text-green-500" : "text-gray-500"
                                    )} />
                                </Button>
                            )}
                        </div>
                    </div>

                    {isGenerating && (
                        <p className="text-xs sm:text-sm text-amber-500 animate-pulse">
                            Generating URL from title...
                        </p>
                    )}

                    {!displayUrl && !isGenerating && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Add a custom URL to make your blog post easy to find and share
                        </p>
                    )}

                    {displayUrl && !isGenerating && (
                        <p className="text-xs sm:text-sm text-muted-foreground break-all">
                            Your blog post will be available at:{" "}
                            <span className={cn(
                                "font-medium",
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                            )}>
                                {baseUrl}/{displayUrl}
                            </span>
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UrlSection;