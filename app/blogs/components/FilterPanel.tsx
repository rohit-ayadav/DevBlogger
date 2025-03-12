import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES, PUBLISHEDDATE, READINGTIME, SORTBYFILTER, stateType, UserType } from '@/types/blogs-types';
import { X, Check, Calendar, Clock, SortAsc, Tag, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    state: stateType;
    setState: React.Dispatch<React.SetStateAction<stateType>>;
    onClearFilters: () => void;
    authorName: { value: string; label: string; }[];
}

const FilterPanel = ({ isOpen, onClose, state, setState, onClearFilters, authorName }: FilterPanelProps) => {
    const { isDarkMode } = useTheme();
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    // Keep track of active filters
    useEffect(() => {
        let count = 0;
        if (state.category !== 'all') count++;
        if (state.author && state.author !== 'all') count++;
        if (state.sortBy !== 'newest') count++;
        if (state.dateRange && state.dateRange !== 'all') count++;
        if (state.readingTime !== 'all') count++;

        setActiveFiltersCount(count);
    }, [state.category, state.author, state.sortBy]);

    const handleApplyFilters = () => {
        onClose();
    };

    // Filter section component to keep consistent styling
    const FilterSection = ({
        title,
        icon,
        children
    }: {
        title: string;
        icon: React.ReactNode;
        children: React.ReactNode
    }) => (
        <div className="space-y-3 py-3">
            <div className="flex items-center gap-2">
                <span className={cn(
                    "text-muted-foreground",
                    isDarkMode && "text-gray-400" // Ensure icon is visible in dark mode
                )}>{icon}</span>
                <h3 className={cn(
                    "text-sm font-medium",
                    isDarkMode && "text-gray-200" // Improve title visibility in dark mode
                )}>{title}</h3>
            </div>
            {children}
        </div>
    );

    // Enhanced contrast for dark mode
    const darkModeStyles = {
        bg: "bg-gray-900",
        bgAlt: "bg-gray-800",
        border: "border-gray-700",
        text: "text-gray-200",
        hover: "hover:bg-gray-700",
        active: "active:bg-gray-600",
        muted: "text-gray-400",
        button: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonOutline: "border-gray-600 hover:bg-gray-700 text-gray-200",
        select: {
            trigger: "bg-gray-800 border-gray-700 text-gray-200",
            content: "bg-gray-800 border-gray-700",
            item: "text-gray-200 hover:bg-gray-700"
        }
    };

    // Light mode styles
    const lightModeStyles = {
        bg: "bg-white",
        bgAlt: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        hover: "hover:bg-gray-100",
        active: "active:bg-gray-200",
        muted: "text-gray-500",
        button: "bg-blue-500 hover:bg-blue-600 text-white",
        buttonOutline: "border-gray-200 hover:bg-gray-100 text-gray-800",
        select: {
            trigger: "bg-white border-gray-200 text-gray-800",
            content: "bg-white border-gray-200",
            item: "text-gray-800 hover:bg-gray-100"
        }
    };

    // Apply theme based on mode
    const theme = isDarkMode ? darkModeStyles : lightModeStyles;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className={cn(
                    "w-full sm:max-w-md p-0 border-l",
                    isDarkMode ? `${theme.border} ${theme.bg}` : `${lightModeStyles.border} ${lightModeStyles.bg}`
                )}
            >
                <div className="h-full flex flex-col">
                    <SheetHeader className={cn(
                        "sticky top-0 z-10 px-6 py-4 border-b",
                        isDarkMode ? `${theme.bg} ${theme.border}` : `${lightModeStyles.bg} ${lightModeStyles.border}`
                    )}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <SheetTitle className={cn(
                                    "text-lg font-semibold",
                                    isDarkMode && theme.text
                                )}>Filters</SheetTitle>
                                {activeFiltersCount > 0 && (
                                    <Badge variant={isDarkMode ? "outline" : "secondary"} className={cn(
                                        "ml-2",
                                        isDarkMode && "border-gray-600 text-gray-300" // Better visibility in dark mode
                                    )}>
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className={cn(
                                    "h-8 w-8 rounded-full",
                                    isDarkMode ? theme.hover : lightModeStyles.hover,
                                    isDarkMode && theme.text // Ensure X is visible in dark mode
                                )}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </SheetHeader>

                    <ScrollArea className="flex-1 overflow-y-auto">
                        <div className="px-6 py-4 space-y-1">
                            <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                            {/* Category Filter */}
                            <FilterSection title="Category" icon={<Tag className="h-4 w-4" />}>
                                <Select
                                    value={state.category}
                                    onValueChange={(value) => {
                                        setState(prev => ({
                                            ...prev,
                                            category: value,
                                            page: 1
                                        }));
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        isDarkMode ? theme.select.trigger : lightModeStyles.select.trigger
                                    )}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className={cn(
                                        "max-h-60 overflow-y-auto", // Ensures scrollability
                                        isDarkMode ? theme.select.content : lightModeStyles.select.content
                                    )}>
                                        <SelectGroup>
                                            <SelectLabel className={isDarkMode ? theme.muted : undefined}>Categories</SelectLabel>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem
                                                    key={cat.label}
                                                    value={cat.value}
                                                    className={cn(
                                                        "flex items-center gap-1",
                                                        state.category === cat.value && "font-medium",
                                                        isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                    )}
                                                >
                                                    {state.category === cat.value && (
                                                        <Check className="h-3 w-3 mr-1 inline-block" />
                                                    )}
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FilterSection>

                            <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                            {/* Author Filter */}
                            <FilterSection title="Author" icon={<User className="h-4 w-4" />}>
                                <Select
                                    value={state.author}
                                    onValueChange={(value) => {
                                        setState(prev => ({
                                            ...prev,
                                            author: value,
                                            page: 1
                                        }));
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        isDarkMode ? theme.select.trigger : lightModeStyles.select.trigger
                                    )}>
                                        <SelectValue placeholder="Select Author" />
                                    </SelectTrigger>
                                    <SelectContent className={cn(
                                        "max-h-60 overflow-y-auto", // Ensures scrollability
                                        isDarkMode ? theme.select.content : lightModeStyles.select.content
                                    )}>
                                        <SelectGroup>
                                            <SelectLabel className={isDarkMode ? theme.muted : undefined}>Authors</SelectLabel>

                                            {/* "All Authors" Option */}
                                            <SelectItem
                                                key="all"
                                                value="all"
                                                className={cn(
                                                    "flex items-center gap-1",
                                                    state.author === "all" && "font-medium",
                                                    isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                )}
                                            >
                                                {state.author === "all" && (
                                                    <Check className="h-3 w-3 mr-1 inline-block" />
                                                )}
                                                All Authors
                                            </SelectItem>

                                            {/* Dynamic Author List */}
                                            {authorName?.length > 0 ? (
                                                authorName.map((author) => (
                                                    <SelectItem
                                                        key={author.label}
                                                        value={author.value}
                                                        className={cn(
                                                            "flex items-center gap-1",
                                                            state.author === author.value && "font-medium",
                                                            isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                        )}
                                                    >
                                                        {state.author === author.value && (
                                                            <Check className="h-3 w-3 mr-1 inline-block" />
                                                        )}
                                                        {author.label}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                // No authors available
                                                <SelectItem value='all' disabled>No authors available</SelectItem>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FilterSection>

                            <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                            {/* Sort By Filter */}
                            <FilterSection title="Sort By" icon={<SortAsc className="h-4 w-4" />}>
                                <Select
                                    value={state.sortBy}
                                    onValueChange={(value) => {
                                        setState(prev => ({
                                            ...prev,
                                            sortBy: value,
                                            page: 1
                                        }));
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        isDarkMode ? theme.select.trigger : lightModeStyles.select.trigger
                                    )}>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className={cn(
                                        isDarkMode ? theme.select.content : lightModeStyles.select.content
                                    )}>
                                        <SelectGroup>
                                            <SelectLabel className={isDarkMode ? theme.muted : undefined}>Sort Options</SelectLabel>
                                            {SORTBYFILTER.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className={cn(
                                                        isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                    )}
                                                >
                                                    {state.sortBy === option.value && (
                                                        <Check className="h-3 w-3 mr-1 inline-block" />
                                                    )}
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FilterSection>

                            <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                            {/* Date Range Filter */}
                            <FilterSection title="Published Date" icon={<Calendar className="h-4 w-4" />}>
                                <Select
                                    value={state.dateRange}
                                    onValueChange={(value) => {
                                        setState(prev => ({
                                            ...prev,
                                            dateRange: value,
                                            page: 1
                                        }));
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        isDarkMode ? theme.select.trigger : lightModeStyles.select.trigger
                                    )}>
                                        <SelectValue placeholder="Select date range" />
                                    </SelectTrigger>
                                    <SelectContent className={cn(
                                        isDarkMode ? theme.select.content : lightModeStyles.select.content
                                    )}>
                                        {PUBLISHEDDATE.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className={cn(
                                                    isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                )}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FilterSection>

                            <Separator className={isDarkMode ? "bg-gray-700" : "bg-gray-200"} />

                            {/* Reading Time Filter */}
                            <FilterSection title="Reading Time" icon={<Clock className="h-4 w-4" />}>
                                <Select
                                    value={state.readingTime}
                                    onValueChange={(value) => {
                                        setState(prev => ({
                                            ...prev,
                                            readingTime: value,
                                            page: 1
                                        }));
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        isDarkMode ? theme.select.trigger : lightModeStyles.select.trigger
                                    )}>
                                        <SelectValue placeholder="Select reading time" />
                                    </SelectTrigger>
                                    <SelectContent className={cn(
                                        isDarkMode ? theme.select.content : lightModeStyles.select.content
                                    )}>
                                        {READINGTIME.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className={cn(
                                                    isDarkMode ? theme.select.item : lightModeStyles.select.item
                                                )}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FilterSection>
                        </div>
                    </ScrollArea>

                    <SheetFooter className={cn(
                        "border-t p-6",
                        isDarkMode ? `${theme.border} ${theme.bg}` : `${lightModeStyles.border} ${lightModeStyles.bg}`
                    )}>
                        <div className="flex flex-col w-full gap-3">
                            <Button
                                variant={isDarkMode ? "ghost" : "secondary"}
                                onClick={onClearFilters}
                                className={cn(
                                    "w-full",
                                    isDarkMode ? theme.buttonOutline : lightModeStyles.buttonOutline
                                )}
                                disabled={activeFiltersCount === 0}
                            >
                                Clear All Filters
                            </Button>
                            <Button
                                onClick={handleApplyFilters}
                                className={cn(
                                    "w-full",
                                    isDarkMode ? theme.button : lightModeStyles.button
                                )}
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FilterPanel;