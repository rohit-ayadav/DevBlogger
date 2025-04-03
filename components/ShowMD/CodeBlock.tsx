"use client";

import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from "@/context/ThemeContext";

// Define common file extensions to language mappings
const FILE_EXTENSION_MAP = {
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
    // Check if language is specified in the class name first
    if (className) {
        let match = className.match(/language-(\w+)/);

        // If that fails, also try alternate formats like lang-xxx or just the name itself
        if (!match) {
            match = className.match(/lang-(\w+)/);
        }

        // Last resort - check if className itself is a valid language
        if (!match && SUPPORTED_LANGUAGES.has(className.toLowerCase())) {
            match = ["", className.toLowerCase()];
        }
        if (match && match[1]) {
            const lang = match[1].toLowerCase();

            // Check if it's a file extension that needs to be mapped
            if (FILE_EXTENSION_MAP[lang as keyof typeof FILE_EXTENSION_MAP]) {
                return FILE_EXTENSION_MAP[lang as keyof typeof FILE_EXTENSION_MAP];
            }

            // Return if it's a supported language
            if (SUPPORTED_LANGUAGES.has(lang)) {
                return lang;
            } else {
                return "plaintext";
            }
        }
    }

    // Clean the code and check for language specified after backticks
    let cleanCode = code;
    let detectedLang = "";

    if (code.startsWith('```')) {
        const lines = code.split('\n');
        // Check first line for language identifier (both with and without space)
        if (lines[0].startsWith('```')) {
            // Try to extract language from first line
            // Match both ```python and ```python\n patterns
            const langMatch = lines[0].match(/^```(\w+)(?:\s|$)/);
            if (langMatch && langMatch[1]) {
                const lang = langMatch[1].toLowerCase();

                // Check if it's a file extension that needs to be mapped
                if (FILE_EXTENSION_MAP[lang as keyof typeof FILE_EXTENSION_MAP]) {
                    if (lang in FILE_EXTENSION_MAP) {
                        detectedLang = FILE_EXTENSION_MAP[lang as keyof typeof FILE_EXTENSION_MAP];
                    }
                }
                // Check if it's a supported language
                else if (SUPPORTED_LANGUAGES.has(lang)) {
                    detectedLang = lang;
                }
            }

            lines.shift();
            if (lines[lines.length - 1].trim() === '```') {
                lines.pop();
            }
            cleanCode = lines.join('\n');
        }
    }

    // If we've already detected a language from the backticks, return it
    if (detectedLang) {
        return detectedLang;
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

// Get human-readable language name for display
const getDisplayLanguage = (lang: string): string => {
    const displayNameMap = {
        c: "C",
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

    return displayNameMap[lang as keyof typeof displayNameMap] || lang.charAt(0).toUpperCase() + lang.slice(1);
};

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


    const handleCopy = async () => {
        try {
            let textToCopy = codeString;
            if (codeString.startsWith('```')) {
                const lines = codeString.split('\n');
                if (lines[0].startsWith('```')) {
                    lines.shift();
                }
                if (lines[lines.length - 1].trim() === '```') {
                    lines.pop();
                }
                textToCopy = lines.join('\n');
            }

            await navigator.clipboard.writeText(textToCopy);
            setCopyStatus("copied");
            setTimeout(() => setCopyStatus("idle"), 2000);
        } catch (err) {
            setCopyStatus("failed");
            setTimeout(() => setCopyStatus("idle"), 2000);
        }
    };

    return (
        <div className="code-block-wrapper rounded-lg overflow-hidden m-0 p-0 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="code-header bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs py-1.5 px-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">
                    {getDisplayLanguage(language)}
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
                    title="Copy code to clipboard"
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

            <SyntaxHighlighter
                language={language}
                style={theme === "dark" ? atomDark : vs}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    overflow: 'auto',
                    borderRadius: '0 0 0.5rem 0.5rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    minHeight: '2.5rem',
                    scrollbarWidth: 'thin', // For Firefox
                }}
                showLineNumbers={codeString.split('\n').length > 1}
                wrapLines={true}
                wrapLongLines={false}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;