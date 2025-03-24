import React, { useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, RefreshCcw, Loader2, X, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES, PUBLISHEDDATE, READINGTIME, SORTBYFILTER, stateType } from '@/types/blogs-types';
import { BlogPostType } from '@/types/blogs-types';
import { Toaster } from '@/components/ui/toaster';
import DashboardGrid from '@/app/_component/dashboard/dashboardGrid';
import BlogPostGrid from '@/app/_component/Post/BlogPostGrid';
import { Button } from '@/components/ui/button';
import { EmptyState, LoadingState, NoMorePosts, themeClasses } from '../themeClass';
import { useTheme } from '@/context/ThemeContext';
import FilterPanel from './FilterPanel';
import { getAuthorName } from '@/action/my-profile-action';
import LazyAdSense from '@/components/LazyAds';
interface HomePageBlogCollectionProps {
    state: stateType;
    handleRetry: () => void;
    setState: React.Dispatch<React.SetStateAction<stateType>>;
    searchLoading: boolean;
}

const HomePageBlogCollection = ({ state, handleRetry, setState, searchLoading }: HomePageBlogCollectionProps) => {
    const { isDarkMode } = useTheme();
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [authorName, setAuthorName] = React.useState<{ value: string; label: string }[]>([]);

    // Debounce search input to reduce API calls
    const [searchInput, setSearchInput] = React.useState(state.searchTerm);

    useEffect(() => {
        getAuthorName().then(data => setAuthorName(data));
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setState(prev => ({
                ...prev,
                searchTerm: searchInput,
                page: 1
            }));
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timer);
    }, [searchInput, setState]);

    const handleClearAllFilters = () => {
        setSearchInput('');
        setState(prev => ({
            ...prev,
            category: 'all',
            sortBy: 'newest',
            searchTerm: '',
            author: 'all',
            dateRange: '',
            readingTime: '',
            page: 1
        }));
        setIsFilterOpen(false);
    };

    // Theme based styles using isDarkMode
    const themeStyles = {
        layout: isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900',
        input: {
            bg: isDarkMode ? 'bg-gray-800' : 'bg-white',
            border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
            text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
            placeholder: isDarkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'
        },
        button: {
            bg: isDarkMode ? 'bg-gray-800' : 'bg-white',
            bgHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
            text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
            textHover: isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'
        },
        icon: {
            color: isDarkMode ? 'text-gray-400' : 'text-gray-600',
            hover: isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-800'
        },
        filterBadge: {
            bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
            border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
            text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
            buttonBg: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        },
        clearButton: {
            text: isDarkMode ? 'text-gray-400' : 'text-gray-600',
            hover: isDarkMode ? 'hover:bg-gray-800 hover:text-gray-200' : 'hover:bg-gray-100 hover:text-gray-900'
        }
    };

    if (state.error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] px-4">
                <p className="text-xl font-bold text-red-500 mb-4">Failed to load data</p>
                <Button
                    onClick={handleRetry}
                    className="flex items-center gap-2"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className={`${themeClasses(isDarkMode).layout} transition-colors duration-200 px-2 sm:px-4 lg:px-6`}>
                <Toaster />

                <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                    {/* Search and Filter Controls */}
                    <div className="pt-3 sm:pt-4 pb-2 sticky top-0 z-20 bg-inherit backdrop-blur-lg">
                        <div className="flex items-center gap-2 max-w-3xl mx-auto">
                            {/* Search Input - Takes most space */}
                            <div className="relative flex-grow">
                                <Search
                                    className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                        }`}
                                    aria-hidden="true"
                                />
                                <Input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className={`pl-8 sm:pl-10 pr-8 w-full h-10 ${themeStyles.input.bg} ${themeStyles.input.border} ${themeStyles.input.text} ${themeStyles.input.placeholder}`}
                                    aria-label="Search blog posts"
                                />
                                {searchInput && (
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => {
                                            setSearchInput('');
                                            setState(prev => ({ ...prev, searchTerm: '', page: 1 }));
                                        }}
                                        aria-label="Clear search"
                                    >
                                        {searchLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <X className={`h-4 w-4 ${themeStyles.icon.color} ${themeStyles.icon.hover}`} />
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Filter Button - Mobile View (Icon Only) */}
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-10 sm:hidden flex items-center justify-center p-0 w-10 ${themeStyles.button.bg} ${themeStyles.button.border} ${themeStyles.button.bgHover}`}
                                onClick={() => setIsFilterOpen(true)}
                                aria-label="Open filters"
                            >
                                <Filter className={`h-4 w-4 ${themeStyles.icon.color}`} />
                            </Button>

                            {/* Filter Button - Desktop View (With Text) */}
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-10 gap-2 px-4 hidden sm:flex ${themeStyles.button.bg} ${themeStyles.button.border} ${themeStyles.button.bgHover}`}
                                onClick={() => setIsFilterOpen(true)}
                            >
                                <Filter className={`h-4 w-4 ${themeStyles.icon.color}`} />
                                <span className={`text-sm ${themeStyles.button.text}`}>Filters</span>
                                <ChevronDown className={`h-3 w-3 ml-1 ${themeStyles.icon.color}`} />
                            </Button>
                        </div>
                    </div>

                    {/* Active Filters Display with isDarkMode-based theming */}
                    {(state.category !== 'all' || state.sortBy !== 'newest' || state.author !== 'all' || state.searchTerm || state.dateRange || state.readingTime) && (
                        <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
                            {state.category !== 'all' && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Category: {CATEGORIES.find(c => c.value === state.category)?.label}</span>
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, category: 'all', page: 1 }))}
                                        aria-label="Remove category filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {state.author !== 'all' && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Author: {authorName.find(c => c.value === state.author)?.label}</span>
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, author: 'all', page: 1 }))}
                                        aria-label="Remove author filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {state.sortBy !== 'newest' && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Sort by {SORTBYFILTER.find(c => c.value === state.sortBy)?.label}</span>
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, sortBy: 'newest', page: 1 }))}
                                        aria-label="Remove sort filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {state.searchTerm && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Search: {state.searchTerm}</span>
                                    <button
                                        onClick={() => {
                                            setSearchInput('');
                                            setState(prev => ({ ...prev, searchTerm: '', page: 1 }));
                                        }}
                                        aria-label="Remove search filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {(state.dateRange && state.dateRange !== 'all') && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Published Date: {PUBLISHEDDATE.find(c => c.value === state.dateRange)?.label}</span>
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, dateRange: '', page: 1 }))}
                                        aria-label="Remove date filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {(state.readingTime && state.readingTime !== 'all') && (
                                <div className={`inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full border ${themeStyles.filterBadge.bg} ${themeStyles.filterBadge.border} ${themeStyles.filterBadge.text}`}>
                                    <span>Reading Time: {READINGTIME.find(c => c.value === state.readingTime)?.label}</span>
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, readingTime: '', page: 1 }))}
                                        aria-label="Remove reading time filter"
                                        className={`ml-1 rounded-full p-0.5 transition-colors ${themeStyles.filterBadge.buttonBg}`}
                                    >
                                        <X className={`h-3 w-3 ${themeStyles.icon.color}`} />
                                    </button>
                                </div>
                            )}
                            {(state.category !== 'all' || state.sortBy !== 'newest' || state.author !== 'all' || state.searchTerm) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-xs h-6 px-2 ${themeStyles.clearButton.text} ${themeStyles.clearButton.hover}`}
                                    onClick={handleClearAllFilters}
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Stats Section */}
                    {!(state.posts.length === 0 && !state.loading) && !state.loadingMore && (
                        <div className="mb-4 sm:mb-6">
                            <DashboardGrid
                                totalBlogs={state.stats.totalBlogs}
                                totalViews={state.stats.totalViews}
                                totalLikes={state.stats.totalLikes}
                                totalUsers={state.stats.totalUsers}
                                loading={state.statsLoading}
                            />
                        </div>
                    )}

                    {/* Posts Grid */}
                    <div>
                        <BlogPostGrid
                            filteredPosts={
                                Array.from(new Set(state.posts.map(post => post._id)))
                                    .map(id => state.posts.find(post => post._id === id))
                                    .filter((post): post is BlogPostType => post !== undefined)
                            }
                            users={state.users}
                            loading={state.loading}
                        />
                    </div>

                    {/* States */}
                    {!state.loadingMore && !state.loading && !state.metadata.hasMore && state.posts.length > 0 ? (
                        <NoMorePosts />
                    ) : (
                        <LoadingState message="Loading posts..." />
                    )}
                    {state.posts.length === 0 && !state.loading && (
                        <EmptyState
                            title='No posts found'
                            message='Try changing your search query or filters.'
                        />
                    )}
                    {/* Bottom ad */}
                    <div className="mt-8">
                        <LazyAdSense
                            adClient={"ca-pub-8778160378200057"}
                            adSlot="9353510750"
                            adFormat="autorelaxed"
                        />
                    </div>
                </div>

                {/* Filter Panel Component */}
                <FilterPanel
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    state={state}
                    setState={setState}
                    onClearFilters={handleClearAllFilters}
                    authorName={authorName}
                />
            </div>
        </TooltipProvider>
    );
};

export default HomePageBlogCollection;