import React from "react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PageHeaderProps {
    title?: string;
    isDarkMode?: boolean;
    error?: string | null;
    className?: string;
    onDismissError?: () => void;
}

const PageHeader = ({
    title = "Create Blog Post",
    isDarkMode = false,
    error = null,
    className = "",
    onDismissError
}: PageHeaderProps) => (
    <div className={cn("space-y-4", className)}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className={cn(
                "text-2xl sm:text-3xl font-bold tracking-tight",
                isDarkMode ? "text-white" : "text-gray-900"
            )}>
                {title}
            </h1>
        </div>

        {error && (
            <Alert
                variant="destructive"
                className={cn(
                    "animate-in fade-in",
                    isDarkMode && "bg-red-900 border-red-800"
                )}
            >
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                </div>

                {onDismissError && (
                    <button
                        onClick={onDismissError}
                        className="ml-auto text-sm opacity-70 hover:opacity-100"
                        aria-label="Dismiss error"
                    >
                        Dismiss
                    </button>
                )}
            </Alert>
        )}
    </div>
);

export default PageHeader;