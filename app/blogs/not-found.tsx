// app/blogs/not-found.tsx
"use client";
import { useTheme } from '@/context/ThemeContext';
import { ChevronLeft, BookOpen, Home } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-[60vh] flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className={`p-6 max-w-2xl w-full border-l-4 border-yellow-500 ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'}`}>
                <div className="flex flex-col">
                    <p className={`text-xl font-semibold ${isDarkMode ? 'text-amber-400' : 'text-yellow-700'}`}>
                        Blog Post Not Found
                    </p>
                    <p className={`mt-2 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-yellow-700'}`}>
                        The blog post you're looking for doesn't exist or has been removed.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                        <button
                            onClick={() => window.history.back()}
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                                ${isDarkMode
                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Go Back
                        </button>

                        <Link href="/blogs" className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                            ${isDarkMode
                                ? 'bg-amber-600 hover:bg-amber-700 text-gray-100'
                                : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}>
                            <BookOpen className="h-4 w-4" />
                            See All Blogs
                        </Link>

                        <Link href="/dashboard" className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                            ${isDarkMode
                                ? 'bg-blue-600 hover:bg-blue-700 text-gray-100'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                            <Home className="h-4 w-4" />
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}