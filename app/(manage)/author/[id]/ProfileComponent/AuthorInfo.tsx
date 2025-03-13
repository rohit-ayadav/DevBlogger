import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Eye, Globe, Heart, Mail } from "lucide-react";
import React from "react";
import { Twitter } from "react-feather";
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { Author } from "./ProfileNew";
import { formatDate } from "@/utils/date-formatter";
import { BlogPostType } from "@/types/blogs-types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AuthorInfo = ({ author, authorPostsLength, totalStats }: { author: Author; authorPostsLength: number; totalStats: { views: number; likes: number } }) => {

    return (
        <div>
            {/* Author Info Card */}
            <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-6">
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                                {author.bio || 'No bio available'}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group bg-transparent border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Mail className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                        <span className="truncate max-w-[200px] text-gray-700 dark:text-gray-300">{author.email}</span>
                                    </Button>
                                    {author.website && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(author.website, '_blank', 'noopener noreferrer')}
                                            className="group bg-transparent border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Globe className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                            <span className="text-gray-700 dark:text-gray-300">Website</span>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 sm:ml-auto">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Connect</h3>
                                <div className="flex gap-2">
                                    {author.socialLinks && Object.entries(author.socialLinks).map(([platform, url]) => {
                                        if (!url) return null;
                                        const Icon = {
                                            facebook: SiFacebook,
                                            twitter: Twitter,
                                            linkedin: SiLinkedin,
                                            github: SiGithub,
                                            instagram: SiInstagram
                                        }[platform];
                                        const colors = {
                                            facebook: "hover:text-[#1877F2]",
                                            twitter: "hover:text-[#1DA1F2]",
                                            linkedin: "hover:text-[#0A66C2]",
                                            github: "hover:text-gray-900 dark:hover:text-white",
                                            instagram: "hover:text-[#E4405F]"
                                        }[platform];
                                        return Icon && (
                                            <TooltipProvider key={platform}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            onClick={() => window.open(url, '_blank', 'noopener noreferrer')}
                                                            variant="outline"
                                                            size="icon"
                                                            className={`bg-transparent border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 ${colors}`}
                                                        >
                                                            <Icon className="h-5 w-5" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="capitalize">{platform}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {author.createdAt && (
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Member since {formatDate(author.createdAt)}
                                </div>
                                <div className="md:hidden flex items-center space-x-4">
                                    <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                                        <Eye className="w-4 h-4" />
                                        <span>{totalStats.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                                        <Heart className="w-4 h-4" />
                                        <span>{totalStats.likes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{authorPostsLength}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}