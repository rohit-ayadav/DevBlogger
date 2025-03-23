// app/test/components/CodeBlock.tsx
'use client';

import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

// Props for the code block component
interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

// Client component for code blocks with enhanced styling and copy functionality
const CodeBlock = ({ children, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const language = className ? className.replace('language-', '') : '';

    const codeString = React.Children.toArray(children)
        .filter(child => typeof child === 'string')
        .join('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="relative my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
            {/* Code header with language badge and copy button */}
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-mono px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {language || 'text'}
                </span>
                <button
                    onClick={copyToClipboard}
                    className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-md transition-colors ${copied
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                    aria-label="Copy code to clipboard"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <ClipboardCopy size={16} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code content with improved styling */}
            <div className="overflow-x-auto">
                <pre className={`${className} p-4 text-sm md:text-base font-mono leading-relaxed`} style={{ margin: 0 }}>
                    {children}
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;