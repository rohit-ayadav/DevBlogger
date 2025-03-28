"use client";

import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from "@/context/ThemeContext";

// Define common file extensions to language mappings
const FILE_EXTENSION_MAP: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    rb: "ruby",
    java: "java",
    php: "php",
    go: "go",
    rs: "rust",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    html: "html",
    css: "css",
    scss: "scss",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    sh: "bash",
    bash: "bash",
    sql: "sql",
};

// Define recognized languages by syntax highlighter
const SUPPORTED_LANGUAGES = new Set([
    "javascript", "jsx", "typescript", "tsx", "python", "ruby", "java",
    "php", "go", "rust", "c", "cpp", "csharp", "html", "css", "scss",
    "json", "yaml", "markdown", "bash", "sql", "xml", "swift", "kotlin",
    "dart", "perl", "r", "shell", "powershell", "diff", "plaintext"
]);

// Python detection patterns
const PYTHON_PATTERNS = [
    /def\s+\w+\s*\([^)]*\)\s*:/,   // Function definition
    /class\s+\w+(\(.*\))?\s*:/,    // Class definition
    /import\s+(\w+\.)*\w+/,        // Import statements
    /from\s+(\w+\.)*\w+\s+import/,  // From import statements
    /if\s+.*:\s*$/m,               // If statements with colon
    /for\s+\w+\s+in\s+.*:/,        // For loops
    /while\s+.*:/,                 // While loops
    /^\s*#.*$/m,                   // Python comments
    /print\s*\(/,                  // Print statements
    /\s{4}/                        // Indentation with 4 spaces
];

// JavaScript/TypeScript detection patterns
const JS_PATTERNS = [
    /const\s+\w+\s*=/,             // Const declarations
    /let\s+\w+\s*=/,               // Let declarations
    /var\s+\w+\s*=/,               // Var declarations
    /function\s+\w+\s*\(/,         // Function declarations
    /=>\s*{/,                      // Arrow functions
    /export\s+(default\s+)?/,      // Export statements
    /import\s+.*\s+from\s+/,       // Import statements
    /\/\/.*$/m,                    // JS comments
    /console\.(log|warn|error)\(/  // Console methods
];

// HTML detection patterns
const HTML_PATTERNS = [
    /<\w+>/,                       // HTML tags
    /<\/\w+>/,                     // Closing HTML tags
    /<\w+\s+.*?>/,                 // HTML tags with attributes
    /<!DOCTYPE\s+html>/i,          // DOCTYPE declaration
    /<html[^>]*>/                  // HTML tag
];

// CSS detection patterns
const CSS_PATTERNS = [
    /\w+\s*{\s*\w+-?\w*:\s*[^;{}]+(;|\s*})/,  // CSS rule
    /\.[a-zA-Z][\w-]*\s*{/,        // Class selector
    /#[a-zA-Z][\w-]*\s*{/,         // ID selector
    /@media\s+/,                   // Media queries
    /@keyframes\s+/,               // Keyframes
    /@import\s+/                   // Import statements
];

// Improved language detection function
const detectLanguage = (className: string | undefined, code: string): string => {
    // Check if language is written after ``` in the code block
    const codeBlockMatch = code.match(/```(\w+)\s/);
    if (codeBlockMatch && codeBlockMatch[1]) {
        const lang = codeBlockMatch[1].toLowerCase();

        // Check if it's a file extension that needs to be mapped
        if (FILE_EXTENSION_MAP[lang]) {
            return FILE_EXTENSION_MAP[lang];
        }

        // Return if it's a supported language
        if (SUPPORTED_LANGUAGES.has(lang)) {
            return lang;
        }
    }
    
    // First, try to get language from className
    if (className) {
        const match = className.match(/language-(\w+)/);
        if (match && match[1]) {
            const lang = match[1].toLowerCase();

            // Check if it's a file extension that needs to be mapped
            if (FILE_EXTENSION_MAP[lang]) {
                return FILE_EXTENSION_MAP[lang];
            }

            // Return if it's a supported language
            if (SUPPORTED_LANGUAGES.has(lang)) {
                return lang;
            }
        }
    }

    // Clean the code - remove backticks if present
    let cleanCode = code;
    if (code.startsWith('```') && code.endsWith('```')) {
        const lines = code.split('\n');
        // Remove first and last line if they contain backticks
        if (lines[0].trim().startsWith('```')) lines.shift();
        if (lines[lines.length - 1].trim() === '```') lines.pop();
        cleanCode = lines.join('\n');
    }

    // Check for shebang
    if (cleanCode.startsWith("#!/bin/bash") || cleanCode.startsWith("#!/usr/bin/env bash")) {
        return "bash";
    }
    if (cleanCode.startsWith("#!/usr/bin/env python") || cleanCode.startsWith("#!/usr/bin/python")) {
        return "python";
    }

    // Count matches for each language pattern
    let pythonScore = 0;
    let jsScore = 0;
    let htmlScore = 0;
    let cssScore = 0;

    // Check Python patterns - Python should have priority for code that looks like it
    for (const pattern of PYTHON_PATTERNS) {
        if (pattern.test(cleanCode)) {
            pythonScore += 1;
        }
    }

    // If code has strong Python indicators, return Python immediately
    if (pythonScore >= 3) {
        return "python";
    }

    // Check other language patterns
    for (const pattern of JS_PATTERNS) {
        if (pattern.test(cleanCode)) {
            jsScore += 1;
        }
    }

    for (const pattern of HTML_PATTERNS) {
        if (pattern.test(cleanCode)) {
            htmlScore += 1;
        }
    }

    for (const pattern of CSS_PATTERNS) {
        if (pattern.test(cleanCode)) {
            cssScore += 1;
        }
    }

    // Determine the language based on the highest score
    if (pythonScore > jsScore && pythonScore > htmlScore && pythonScore > cssScore) {
        return "python";
    } else if (jsScore > htmlScore && jsScore > cssScore) {
        return "javascript";
    } else if (htmlScore > cssScore) {
        return "html";
    } else if (cssScore > 0) {
        return "css";
    }

    // Check for JSON
    if (cleanCode.trim().startsWith("{") && cleanCode.trim().endsWith("}")) {
        try {
            JSON.parse(cleanCode);
            return "json";
        } catch { }
    }

    // Default to plaintext if we can't detect
    return "plaintext";
};

// Code block component with syntax highlighting and copy functionality
const CodeBlock = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const codeString = String(children || "").trim();
    const { isDarkMode } = useTheme();
    const language = detectLanguage(className, codeString);

    useEffect(() => {
        setTheme(isDarkMode ? "dark" : "light");

        // Optionally listen for changes to theme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [isDarkMode]);

    // Handle copy functionality
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopyStatus("copied");
            setTimeout(() => setCopyStatus("idle"), 2000);
        } catch (err) {
            setCopyStatus("failed");
            setTimeout(() => setCopyStatus("idle"), 2000);
        }
    };

    // Get human-readable language name for display
    const getDisplayLanguage = (lang: string): string => {
        const displayNameMap: Record<string, string> = {
            javascript: "JavaScript",
            typescript: "TypeScript",
            jsx: "React JSX",
            tsx: "React TSX",
            python: "Python",
            plaintext: "Plain Text",
            bash: "Bash",
            shell: "Shell",
            html: "HTML",
            css: "CSS",
            json: "JSON",
            cpp: "C++",
            csharp: "C#",
            java: "Java",
            rust: "Rust",
            go: "Go",
            ruby: "Ruby",
            swift: "Swift",
            kotlin: "Kotlin",
            dart: "Dart",
            php: "PHP",
        };

        return displayNameMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
    };

    return (
        <div className="code-block-wrapper rounded-lg overflow-hidden my-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="code-header bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs py-1.5 px-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">
                    {language !== "plaintext" ? getDisplayLanguage(language) : ""}
                </span>
                <button
                    className={`copy-button px-2 py-0.5 rounded transition-all duration-200 ${copyStatus === "idle"
                        ? "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        : copyStatus === "copied"
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                        }`}
                    onClick={handleCopy}
                    aria-label="Copy code to clipboard"
                >
                    {copyStatus === "idle" && (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                    {copyStatus === "copied" && (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    )}
                    {copyStatus === "failed" && (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Failed
                        </>
                    )}
                </button>
            </div>

            <div className={language === "plaintext" ? "p-3 bg-gray-50 dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap" : ""}>
                {language !== "plaintext" ? (
                    <SyntaxHighlighter
                        language={language}
                        style={theme === "dark" ? atomDark : vs}
                        customStyle={{
                            margin: 0,
                            padding: '0.75rem',
                            borderRadius: '0 0 0.5rem 0.5rem',
                            fontSize: '0.9rem',
                            lineHeight: '1.4',
                            minHeight: '2.5rem'
                        }}
                        showLineNumbers={codeString.split('\n').length > 1}
                        wrapLines={true}
                        wrapLongLines={false}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                ) : (
                    <pre className="text-gray-800 dark:text-gray-200 p-0 m-0 overflow-x-auto">
                        {codeString}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default CodeBlock;