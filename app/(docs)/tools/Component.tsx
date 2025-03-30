"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Tool {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
    category: string;
    isNew?: boolean;
    isPopular?: boolean;
}

/**
 * DevBlogger Tools Collection
 * A showcase of web development and content creation tools
 */
const ToolsCollection: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Tool definitions with details and icons
    const tools: Tool[] = [
        {
            id: "regex-tester",
            title: "Regex Tester",
            description: "Test and debug regular expressions with real-time visualization and explanations",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            category: "Development",
            isPopular: true
        },
        {
            id: "base64-encoder-decoder",
            title: "Base64 Encoder/Decoder",
            description: "Convert text to Base64 and decode Base64 to text with support for file encoding",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            category: "Development"
        },
        {
            id: "url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description: "Encode and decode URLs to ensure they work properly in web applications",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" />
                </svg>
            ),
            category: "Development"
        },
        {
            id: "javascript-obfuscator",
            title: "JavaScript Obfuscator",
            description: "Protect your JavaScript code by making it difficult to read and reverse-engineer",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            category: "Development",
            isNew: true
        },
        {
            id: "sql-formatter",
            title: "SQL Formatter",
            description: "Format SQL queries to make them more readable and maintainable",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
            ),
            category: "Development"
        },
        {
            id: "markdown-to-html",
            title: "Markdown to HTML",
            description: "Convert Markdown syntax to HTML for web publishing and content creation",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
            ),
            category: "Content Creation",
            isPopular: false
        },
        {
            id: "blog-ideas",
            title: "Blog Ideas Generator",
            description: "Generate creative blog post ideas and titles for your content strategy",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            category: "Content Creation",
            isPopular: true
        },
        {
            id: "content-calendar",
            title: "Content Calendar",
            description: "Plan and organize your content publishing schedule for blogs and social media",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            category: "Content Creation"
        },
        {
            id: "reading-time",
            title: "Reading Time Calculator",
            description: "Calculate the estimated reading time for your blog content",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            category: "Content Creation",
            isNew: true
        },
        {
            id: "color-picker",
            title: "Color Picker",
            description: "Choose and convert colors between different formats (HEX, RGB, HSL)",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            category: "Design",
            isPopular: true
        },
    ];

    // Derive categories from tools
    const categories = Array.from(new Set(tools.map(tool => tool.category)));

    // Filter tools based on search and category
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !activeCategory || tool.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Get featured (popular) tools
    const popularTools = tools.filter(tool => tool.isPopular);

    const handleToolClick = (toolId: string) => {
        router.push(`/tools/${toolId}`);
    };

    return (
        <>
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">DevBlogger Tools</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Free online tools for developers and content creators to simplify your workflow
                    </p>
                </div>

                {/* Search and filter section */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md ${!activeCategory
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                onClick={() => setActiveCategory(null)}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${activeCategory === category
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured tools section (only show if no search/filter) */}
                {!searchQuery && !activeCategory && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Featured Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularTools.map(tool => (
                                <div
                                    key={tool.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
                                    onClick={() => handleToolClick(tool.id)}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center mb-3">
                                            <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                                                {tool.icon}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                    {tool.title}
                                                    {tool.isNew && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                            New
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All tools section */}
                <div>
                    {activeCategory && (
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{activeCategory} Tools</h2>
                    )}
                    {!activeCategory && searchQuery && (
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Search Results</h2>
                    )}
                    {!activeCategory && !searchQuery && (
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">All Tools</h2>
                    )}

                    {filteredTools.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No tools found</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                            <button
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory(null);
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map(tool => (
                                <div
                                    key={tool.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
                                    onClick={() => handleToolClick(tool.id)}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start mb-3">
                                            <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                                                {tool.icon}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                                                    {tool.title}
                                                    {tool.isNew && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                            New
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Call to action */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-6 py-12 md:px-12 text-center md:text-left md:flex md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Missing a tool you need?</h2>
                            <p className="mt-2 text-blue-100 text-sm md:text-base max-w-md">
                                Let us know what tool would help your development or content creation workflow!
                            </p>
                        </div>
                        <div className="mt-8 md:mt-0 flex justify-center md:justify-end">
                            <Link
                                href="/contacts"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                            >
                                Request a Tool
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional information */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Fast & Free</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                            All tools are completely free to use and designed for performance. No registration required.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Privacy First</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                            All processing happens in your browser. Your data is never sent to our servers.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Open Source</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                            Most of our tools are open source. Feel free to contribute or suggest improvements.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToolsCollection;