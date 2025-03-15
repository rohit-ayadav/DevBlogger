import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { SiInstagram, SiGithub } from 'react-icons/si';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, Eye, Heart } from 'lucide-react';
import { BlogPostType, UserType } from '@/types/blogs-types';
import { Author } from './ProfileNew';
import PostCard from '@/app/_component/Post/PostCard';

const Posts = ({
    posts,
    author,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredAndSortedPosts,
    categories,
}: {
    posts: BlogPostType[];
    author: Author;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    filteredAndSortedPosts: BlogPostType[];
    categories: string[];
}) => {
    return (
        <div>
            <div>
                <div className="hidden md:flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Most Recent</SelectItem>
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="liked">Most Liked</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory !== 'all' || sortBy !== 'recent' || searchTerm) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selectedCategory !== 'all' && (
                            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800">
                                <span>Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</span>
                                <Button
                                    onClick={() => setSelectedCategory('all')}
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}

                        {sortBy !== 'recent' && (
                            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800">
                                <span>Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                                <Button
                                    onClick={() => setSortBy('recent')}
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}

                        {searchTerm && (
                            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800">
                                <span>Search: {searchTerm}</span>
                                <Button
                                    onClick={() => setSearchTerm('')}
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-6 px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('recent');
                                setSearchTerm('');
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}

                {/* Posts Grid */}
                {filteredAndSortedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedPosts.map((post) => (
                            <PostCard key={post._id} post={post} author={author as UserType} />
                        ))}
                        {/* <PostCard key={post._id} post={post} />
                        ))} */}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No posts found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">No posts match your current filters.</p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('recent');
                                setSearchTerm('');
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Posts