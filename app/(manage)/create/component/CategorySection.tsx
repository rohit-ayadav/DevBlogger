import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FolderOpen, Check } from "lucide-react";

interface CategorySectionProps {
    category: string;
    setCategory: (category: string) => void;
    categories: Array<{ value: string; label: string; }>;
    isDarkMode?: boolean;
}

export const CategorySection = ({
    category,
    setCategory,
    categories,
    isDarkMode
}: CategorySectionProps) => {
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [selectionMade, setSelectionMade] = useState<boolean>(false);

    // Update the selected label when category changes
    useEffect(() => {
        if (category) {
            const foundCategory = categories.find(cat => cat.value === category);
            setSelectedLabel(foundCategory?.label || '');

            // Show selection animation briefly
            if (!selectionMade && foundCategory) {
                setSelectionMade(true);
                setTimeout(() => setSelectionMade(false), 2000);
            }
        } else {
            setSelectedLabel('');
        }
    }, [category, categories]);

    return (
        <Card className={`w-full mt-3 transition-all duration-200 hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''
            }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                <div className="flex items-center">
                    <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-muted-foreground" />
                    <CardTitle className="text-lg sm:text-xl font-bold">Category</CardTitle>
                </div>
                {category && selectionMade && (
                    <div className={`flex items-center gap-1 text-xs sm:text-sm py-1 px-2 rounded-full transition-all ${isDarkMode
                            ? 'bg-green-900/30 text-green-300'
                            : 'bg-green-100 text-green-700'
                        }`}>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Selected</span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-3 px-3 sm:px-6">
                <div className="grid w-full items-center gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="category"
                            className="text-xs sm:text-sm text-muted-foreground inline-block"
                        >
                            Select a category for your content
                        </Label>
                        <Select
                            value={category}
                            onValueChange={(value) => {
                                setCategory(value);
                                setSelectionMade(true);
                                setTimeout(() => setSelectionMade(false), 2000);
                            }}
                        >
                            <SelectTrigger
                                id="category"
                                className={`w-full focus:ring-2 focus:ring-ring text-sm sm:text-base ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600'
                                        : 'bg-background border-input'
                                    }`}
                            >
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
                                <div className="max-h-[300px] overflow-y-auto py-1">
                                    {categories.map((cat) => (
                                        <SelectItem
                                            key={cat.value}
                                            value={cat.value}
                                            className={`cursor-pointer transition-colors duration-150 flex items-center ${cat.value === category
                                                    ? (isDarkMode ? 'bg-gray-700' : 'bg-accent/70')
                                                    : ''
                                                } hover:bg-accent`}
                                        >
                                            {cat.value === category && (
                                                <Check className="w-3 h-3 mr-2 inline-block text-primary" />
                                            )}
                                            <span>{cat.label}</span>
                                        </SelectItem>
                                    ))}
                                </div>
                            </SelectContent>
                        </Select>
                    </div>

                    {!category ? (
                        <p className={`text-xs sm:text-sm text-muted-foreground p-2 rounded-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-muted/50'
                            }`}>
                            Please select a category to help organize your content
                        </p>
                    ) : (
                        <div className={`flex items-center gap-2 text-sm p-2 rounded-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-muted/50'
                            }`}>
                            <FolderOpen className="w-4 h-4 text-muted-foreground" />
                            <span>
                                Current category: <span className="font-medium">{selectedLabel}</span>
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default CategorySection;