"use client";
import React from 'react';
import { Globe, Search, Eye, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import Newsletter from '@/app/_component/newsletter';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/app/(settings)/profile/id-omponent/ErrorFallback';
import { BlogPostType } from '@/types/blogs-types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from './Header';
import useProfile from './useProfile';
import { AuthorInfo } from './AuthorInfo';
import Posts from './Posts';
import StatsAuthorPage from './Stats';
import ShareCTA from './ShareCTA';
import ShowProfileImage from '@/components/ShowProfileImage';
interface Author {
    _id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    bio?: string;
    website?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        github?: string;
        instagram?: string;
    };
    createdAt?: string;
    updatedAt?: string;
    totalViews?: number;
    totalLikes?: number;
    totalPosts?: number;
}

const ProfileNEW = ({ authorPosts, author }: { authorPosts: BlogPostType[], author: Author }) => {
    const { isDarkMode, toggleDarkMode, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy, activeTab, setActiveTab, isShareSheetOpen, setIsShareSheetOpen, filteredAndSortedPosts, categories, totalStats, copyProfileLink, } = useProfile({ authorPosts, author });
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Header author={author} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isShareSheetOpen={isShareSheetOpen} setIsShareSheetOpen={setIsShareSheetOpen} copyProfileLink={copyProfileLink} />
                    <main className="space-y-8">
                        <div className="relative">
                            <div className="h-40 sm:h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
                                <img
                                    src='/coverprofile.avif'
                                    alt="Profile Cover"
                                    className="w-full h-full object-cover opacity-30"
                                />
                            </div>
                            <div className="container relative px-4 mx-auto">
                                <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-24">
                                    <ShowProfileImage
                                        src={author.image}
                                        className="w-32 h-32 sm:w-40 sm:h-40 ring-4 ring-white dark:ring-gray-900 bg-white dark:bg-gray-800 shadow-lg"
                                        style={{ borderRadius: '50%' }}
                                    />

                                    <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{author.name}</h1>
                                        <p className="text-gray-600 dark:text-gray-300">@{author.username}</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center space-x-2">
                                        <div className="hidden md:flex flex-row gap-2">
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
                                                <span>{authorPosts.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AuthorInfo author={author} authorPostsLength={authorPosts.length} totalStats={totalStats} />

                        {/* Profile Tabs */}
                        <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <TabsList className="grid grid-cols-2 gap-4">
                                        <TabsTrigger value="posts" className="flex items-center justify-center">
                                            <BookOpen className="w-4 h-4 mr-2" /> Posts
                                        </TabsTrigger>
                                        <TabsTrigger value="stats" className="flex items-center justify-center">
                                            <Globe className='w-4 h-4 mr-2' /> Stats
                                        </TabsTrigger>
                                    </TabsList>

                                    {activeTab === "posts" && (
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="md:hidden bg-transparent"
                                                >
                                                    <span>Filters</span>
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="dark:bg-gray-900 dark:border-gray-800">
                                                <SheetHeader>
                                                    <SheetTitle className="text-gray-900 dark:text-gray-100">Filter Posts</SheetTitle>
                                                </SheetHeader>
                                                <div className="space-y-4 pt-4">
                                                    <div className="space-y-2">
                                                        <h3 className="text-sm font-medium">Search</h3>
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
                                                    <div className="space-y-2">
                                                        <h3 className="text-sm font-medium">Category</h3>
                                                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                            <SelectTrigger className="w-full">
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
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h3 className="text-sm font-medium">Sort By</h3>
                                                        <Select value={sortBy} onValueChange={setSortBy}>
                                                            <SelectTrigger className="w-full">
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
                                            </SheetContent>
                                        </Sheet>
                                    )}
                                </div>
                            </div>

                            <TabsContent value="posts" className="mt-6">
                                <Posts
                                    posts={filteredAndSortedPosts}
                                    author={author}
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    filteredAndSortedPosts={filteredAndSortedPosts}
                                    categories={categories}
                                />
                            </TabsContent>

                            <TabsContent value="stats" className="mt-6">
                                <StatsAuthorPage
                                    author={author}
                                    authorPosts={authorPosts}
                                    totalStats={totalStats}
                                    categories={categories}
                                />
                            </TabsContent>
                        </Tabs>

                        <Newsletter />
                        <ShareCTA author={author} copyProfileLink={copyProfileLink} />
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default ProfileNEW;
export type { Author };