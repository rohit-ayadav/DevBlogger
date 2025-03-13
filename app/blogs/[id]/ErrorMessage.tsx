'use client';
import React from 'react';
import { AlertCircle, ChevronLeft, Home } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface ErrorMessageProps {
    message: string;
    title?: string;
    variant?: 'default' | 'destructive';
    className?: string;
    showNavigation?: boolean;
    customBackPath?: string;
    customHomePath?: string;
}

const ErrorMessage = ({
    message,
    title = 'Error',
    variant = 'destructive',
    className = '',
    showNavigation = true,
    customBackPath,
    customHomePath = '/'
}: ErrorMessageProps) => {
    const router = useRouter();
    const { isDarkMode } = useTheme();

    return (
        <div className="min-h-[200px] flex flex-col items-center justify-center max-w-lg mx-auto p-4 space-y-6">
            {/* Is Dark Mode: {isDarkMode ? 'Enabled' : 'Disabled'} */}
            <Card className={`w-full max-w-md ${isDarkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
                <CardHeader>
                    <CardTitle className={`flex items-center gap-2 text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-destructive'}`}>
                        <AlertCircle className="h-6 w-6" />
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert
                        variant={variant}
                        className={`w-full border-2 ${isDarkMode ? 'border-gray-700 bg-gray-900' : ''} ${className}`}
                        role="alert"
                    >
                        <AlertCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : ''}`} />
                        <AlertTitle className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : ''}`}>
                            {title}
                        </AlertTitle>
                        <AlertDescription className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                            {message}
                        </AlertDescription>
                    </Alert>
                </CardContent>
                {showNavigation && (
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => customBackPath ? router.push(customBackPath) : router.back()}
                            className={isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                        <Button
                            asChild
                            className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
                        >
                            <Link href={customHomePath || "/blogs"}>
                                <Home className="mr-2 h-4 w-4" />
                                Return to Home
                            </Link>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export { ErrorMessage };