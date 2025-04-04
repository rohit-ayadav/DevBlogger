import React, { useCallback, useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Clock, Archive, Ban, Trash, CheckCircle } from "lucide-react";

interface BlogState {
    status?: 'draft' | 'archived' | 'private' | 'pending_review' | 'rejected' | 'deleted' | 'approved';
}

interface PostVisibilityProps {
    state: BlogState;
    isDarkMode: boolean;
    updateState: (updates: Partial<BlogState>) => void;
}

const PostVisibility = ({ state, isDarkMode, updateState }: PostVisibilityProps) => {
    const [selectionMade, setSelectionMade] = useState<boolean>(false);

    const handleStatusChange = useCallback((status: 'draft' | 'archived' | 'private' | 'pending_review' | 'rejected' | 'deleted' | 'approved') => {
        updateState({ status });
        setSelectionMade(true);
        setTimeout(() => setSelectionMade(false), 2000);
    }, [updateState]);

    // Update selection animation when status changes externally
    useEffect(() => {
        if (state.status && !selectionMade) {
            setSelectionMade(true);
            setTimeout(() => setSelectionMade(false), 2000);
        }
    }, [state.status]);

    // Define which statuses are selectable by the user
    const isEditMode = !['rejected', 'deleted', 'approved'].includes(state.status || '');

    // Get icon based on status
    const getIcon = (status: string) => {
        switch (status) {
            case 'private': return EyeOff;
            case 'pending_review': return Clock;
            case 'archived': return Archive;
            case 'rejected': return Ban;
            case 'deleted': return Trash;
            case 'approved': return CheckCircle;
            default: return Eye; // draft and others
        }
    };

    // Get label text for current status
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending_review': return 'Pending Review';
            case 'private': return 'Private';
            case 'archived': return 'Archived';
            case 'rejected': return 'Rejected';
            case 'deleted': return 'Deleted';
            case 'approved': return 'Approved';
            default: return 'Draft';
        }
    };

    return (
        <Card className={`w-full mt-3 transition-all duration-200 hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
                <div className="flex items-center">
                    {React.createElement(getIcon(state.status || 'draft'), {
                        className: "w-4 h-4 sm:w-5 sm:h-5 mr-2 text-muted-foreground"
                    })}
                    <CardTitle className="text-lg sm:text-xl font-bold">Post Visibility</CardTitle>
                </div>
                {state.status && selectionMade && (
                    <div className={`flex items-center gap-1 text-xs sm:text-sm py-1 px-2 rounded-full transition-all ${isDarkMode
                            ? 'bg-green-900/30 text-green-300'
                            : 'bg-green-100 text-green-700'
                        }`}>
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Selected</span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-3 px-3 sm:px-6">
                <div className="grid w-full items-center gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="post-visibility"
                            className="text-xs sm:text-sm text-muted-foreground inline-block"
                        >
                            Choose visibility settings for your post
                        </Label>

                        {/* Current status indicator for non-editable statuses */}
                        {!isEditMode && (
                            <div className={`flex items-center gap-2 p-3 rounded-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-muted/50'
                                }`}>
                                {React.createElement(getIcon(state.status || ''), {
                                    size: 18,
                                    className: "flex-shrink-0"
                                })}
                                <div>
                                    <span className="font-medium">{getStatusLabel(state.status || '')}</span>
                                    <p className="text-xs mt-1 opacity-80">
                                        {state.status === 'rejected' && "Your post was rejected by admin. Please update and resubmit."}
                                        {state.status === 'approved' && "Your post is approved and publicly visible on DevBlogger."}
                                        {state.status === 'deleted' && "This post has been deleted."}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Selectable radio options */}
                        {isEditMode && (
                            <RadioGroup
                                id="post-visibility"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                                defaultValue="private"
                                value={state.status}
                                onValueChange={(value: string) => handleStatusChange(value as any)}
                            >
                                <div className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors border ${state.status === 'draft'
                                        ? (isDarkMode ? "bg-gray-700 border-gray-600" : "bg-accent/70 border-input")
                                        : (isDarkMode ? "border-gray-600" : "border-input")
                                    } ${isDarkMode ? "hover:bg-gray-700/70" : "hover:bg-accent"}`}>
                                    <RadioGroupItem id="draft" value="draft" className="flex-shrink-0" />
                                    <Label htmlFor="draft" className="cursor-pointer flex items-center gap-2 w-full">
                                        <Eye className="w-4 h-4 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Draft</span>
                                            <p className="text-xs mt-1 text-muted-foreground">Save work in progress</p>
                                        </div>
                                    </Label>
                                </div>

                                <div className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors border ${state.status === 'private'
                                        ? (isDarkMode ? "bg-gray-700 border-gray-600" : "bg-accent/70 border-input")
                                        : (isDarkMode ? "border-gray-600" : "border-input")
                                    } ${isDarkMode ? "hover:bg-gray-700/70" : "hover:bg-accent"}`}>
                                    <RadioGroupItem id="private" value="private" className="flex-shrink-0" />
                                    <Label htmlFor="private" className="cursor-pointer flex items-center gap-2 w-full">
                                        <EyeOff className="w-4 h-4 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Private</span>
                                            <p className="text-xs mt-1 text-muted-foreground">Only accessible via direct link</p>
                                        </div>
                                    </Label>
                                </div>

                                <div className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors border ${state.status === 'pending_review'
                                        ? (isDarkMode ? "bg-gray-700 border-gray-600" : "bg-accent/70 border-input")
                                        : (isDarkMode ? "border-gray-600" : "border-input")
                                    } ${isDarkMode ? "hover:bg-gray-700/70" : "hover:bg-accent"}`}>
                                    <RadioGroupItem id="pending_review" value="pending_review" className="flex-shrink-0" />
                                    <Label htmlFor="pending_review" className="cursor-pointer flex items-center gap-2 w-full">
                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Publish</span>
                                            <p className="text-xs mt-1 text-muted-foreground">Submit for review to appear on DevBlogger</p>
                                        </div>
                                    </Label>
                                </div>

                                <div className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors border ${state.status === 'archived'
                                        ? (isDarkMode ? "bg-gray-700 border-gray-600" : "bg-accent/70 border-input")
                                        : (isDarkMode ? "border-gray-600" : "border-input")
                                    } ${isDarkMode ? "hover:bg-gray-700/70" : "hover:bg-accent"}`}>
                                    <RadioGroupItem id="archived" value="archived" className="flex-shrink-0" />
                                    <Label htmlFor="archived" className="cursor-pointer flex items-center gap-2 w-full">
                                        <Archive className="w-4 h-4 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Archive</span>
                                            <p className="text-xs mt-1 text-muted-foreground">Keep but hide from all listings</p>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}
                    </div>

                    {!state.status ? (
                        <p className={`text-xs sm:text-sm text-muted-foreground p-2 rounded-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-muted/50'
                            }`}>
                            Please select a visibility option for your content
                        </p>
                    ) : (
                        <div className={`flex items-center gap-2 text-sm p-2 rounded-md ${isDarkMode ? 'bg-gray-700/50' : 'bg-muted/50'
                            }`}>
                            {React.createElement(getIcon(state.status), {
                                className: "w-4 h-4 text-muted-foreground"
                            })}
                            <span>
                                Current status: <span className="font-medium">{getStatusLabel(state.status)}</span>
                            </span>
                        </div>
                    )}

                    {/* Status explanation */}
                    <div className="text-xs text-muted-foreground">
                        {state.status === 'private' && "Private posts are only visible when sharing the direct link."}
                        {state.status === 'pending_review' && "Your post will be reviewed by an admin before appearing on DevBlogger."}
                        {state.status === 'draft' && "Drafts are only visible to you in your dashboard."}
                        {state.status === 'archived' && "Archived posts are hidden from all listings, only you can access them."}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostVisibility;