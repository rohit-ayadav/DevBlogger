"use client";
import React, { useState } from 'react';
import { ErrorMessage } from '../../../lib/ErrorMessage';
import { UserType } from '@/types/blogs-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlobeIcon, LinkedinIcon, GithubIcon, TwitterIcon, InstagramIcon, FacebookIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import ShowProfileImage from '@/components/ShowProfileImage';

type SortOption = 'followers' | 'posts' | 'newest' | 'alphabetical';

const AuthorCard = ({ author }: { author: UserType }) => {
    const { isDarkMode } = useTheme();

    const socialIcons = {
        website: <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        linkedin: <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        github: <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        twitter: <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        instagram: <InstagramIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        facebook: <FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5" />
    };

    return (
        <Card className={cn(
            "hover:shadow-lg transition-shadow duration-200 group",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        )}>
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="flex justify-center mb-4 sm:mb-0">
                        <ShowProfileImage src={author.image} className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-offset-2 ring-transparent group-hover:ring-blue-500 transition-all" size={100} />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className={cn(
                            "text-xl sm:text-2xl font-bold group-hover:text-blue-500 transition-colors",
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>
                            {author.name}
                        </h2>
                        <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                            @{author.username}
                        </p>
                        {author.bio && (
                            <p className={cn(
                                "text-sm sm:text-base mb-3 line-clamp-2",
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            )}>
                                {author.bio}
                            </p>
                        )}
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-3">
                            <span className={cn(
                                "text-xs sm:text-sm px-2 py-1 rounded-full",
                                isDarkMode ? "text-gray-300 bg-gray-700" : "text-gray-500 bg-gray-100"
                            )}>
                                {author.noOfBlogs} {author.noOfBlogs === 1 ? 'post' : 'posts'}
                            </span>
                            <span className={cn(
                                "text-xs sm:text-sm px-2 py-1 rounded-full",
                                isDarkMode ? "text-gray-300 bg-gray-700" : "text-gray-500 bg-gray-100"
                            )}>
                                {author.follower} {author.follower === 1 ? 'follower' : 'followers'}
                            </span>
                            <span className={cn(
                                "text-xs sm:text-sm px-2 py-1 rounded-full",
                                isDarkMode ? "text-gray-300 bg-gray-700" : "text-gray-500 bg-gray-100"
                            )}>
                                {author.following} following
                            </span>
                        </div>
                        <div className="flex justify-center sm:justify-start flex-wrap gap-2 mb-4">
                            {author.socialLinks && Object.entries(author.socialLinks).map(([platform, url]) => (
                                url && (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "transition-colors p-2 rounded-full",
                                            isDarkMode
                                                ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                        )}
                                    >
                                        {socialIcons[platform as keyof typeof socialIcons]}
                                    </a>
                                )
                            ))}
                        </div>
                        <Link href={`/author/${author.username}`} className="block">
                            <Button className="w-full text-sm sm:text-base bg-blue-600 hover:bg-blue-700">
                                View All Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const FilterSection = ({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    totalResults,
    isDarkMode
}: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortOption;
    setSortBy: (option: SortOption) => void;
    totalResults: number;
    isDarkMode: boolean;
}) => (
    <div className={cn(
        "p-4 rounded-lg shadow-sm mb-6",
        isDarkMode ? "bg-gray-800" : "bg-white"
    )}>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                        "pl-10 w-full",
                        isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : ""
                    )}
                />
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className={cn(
                    "w-full sm:w-48",
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                )}>
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}>
                    <SelectItem className={isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} value="followers">Most Followers</SelectItem>
                    <SelectItem className={isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} value="posts">Most Posts</SelectItem>
                    <SelectItem className={isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} value="newest">Newest Authors</SelectItem>
                    <SelectItem className={isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className={cn(
            "mt-2 text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
        )}>
            Found {totalResults} author{totalResults === 1 ? '' : 's'}
        </div>
    </div>
);

const AuthorsPage = ({ success, authors, totalAuthors, message }: { success: boolean, authors: UserType[], totalAuthors: number, message: string }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
    const { isDarkMode } = useTheme();

    if (!success) {
        return <ErrorMessage message={message || "An error occurred while fetching data. Please try again later."} />;
    }
    if (totalAuthors === 0) {
        return <ErrorMessage message="No authors found." />;
    }
    // Filter authors based on search query
    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort authors based on selected option
    const sortedAuthors = [...filteredAuthors].sort((a, b) => {
        switch (sortBy) {
            case 'followers':
                return b.follower - a.follower;
            case 'posts':
                return b.noOfBlogs - a.noOfBlogs;
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'alphabetical':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return (
        <div className={cn(
            "min-h-screen",
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
        )}>
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className={cn(
                        "text-2xl sm:text-3xl font-bold",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                    )}>
                        Our Authors
                    </h1>
                    <p className={cn(
                        "text-sm sm:text-base mt-2",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                        Discover {totalAuthors} talented writer{totalAuthors === 1 ? '' : 's'} sharing their knowledge
                    </p>
                </div>

                <FilterSection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    totalResults={filteredAuthors.length}
                    isDarkMode={isDarkMode}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {sortedAuthors.map(author => (
                        <AuthorCard key={author._id} author={author} />
                    ))}
                </div>

                {filteredAuthors.length === 0 && (
                    <div className="text-center py-8">
                        <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                            No authors found matching your search criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorsPage;