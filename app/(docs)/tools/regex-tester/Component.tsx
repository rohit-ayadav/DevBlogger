"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Match {
    text: string;
    index: number;
    length: number;
}

interface Group {
    text: string;
    name?: string;
}

interface RegexResult {
    isValid: boolean;
    matches: Match[];
    groups: Group[];
    error?: string;
}

/**
 * RegexTester - A comprehensive tool for testing and debugging regular expressions
 * Features include real-time testing, pattern highlighting, multiple flags support,
 * and capture group detection.
 */
const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState<string>('');
    const [testString, setTestString] = useState<string>('');
    const [flags, setFlags] = useState<string>('g');
    const [result, setResult] = useState<RegexResult>({
        isValid: true,
        matches: [],
        groups: []
    });
    const [highlightedText, setHighlightedText] = useState<React.ReactNode>(null);
    const [copySuccess, setCopySuccess] = useState<string>('');

    // Flag toggles
    const [globalFlag, setGlobalFlag] = useState<boolean>(true);
    const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState<boolean>(false);
    const [multilineFlag, setMultilineFlag] = useState<boolean>(false);
    const [dotAllFlag, setDotAllFlag] = useState<boolean>(false);
    const [unicodeFlag, setUnicodeFlag] = useState<boolean>(false);
    const [stickyFlag, setStickyFlag] = useState<boolean>(false);

    // Flag change handlers
    useEffect(() => {
        let newFlags = '';
        if (globalFlag) newFlags += 'g';
        if (caseInsensitiveFlag) newFlags += 'i';
        if (multilineFlag) newFlags += 'm';
        if (dotAllFlag) newFlags += 's';
        if (unicodeFlag) newFlags += 'u';
        if (stickyFlag) newFlags += 'y';
        setFlags(newFlags);
    }, [globalFlag, caseInsensitiveFlag, multilineFlag, dotAllFlag, unicodeFlag, stickyFlag]);

    const processRegex = () => {
        if (!pattern) {
            setResult({
                isValid: true,
                matches: [],
                groups: []
            });
            setHighlightedText(testString);
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches: Match[] = [];
            const groups: Group[] = [];

            // Reset lastIndex to ensure correct matching regardless of previous state
            regex.lastIndex = 0;

            // Handle non-global regex by getting all matches manually
            if (!regex.global) {
                const allMatches = testString.match(regex);

                if (allMatches) {
                    const matchIndex = testString.indexOf(allMatches[0]);

                    matches.push({
                        text: allMatches[0],
                        index: matchIndex,
                        length: allMatches[0].length
                    });

                    // Process capture groups for non-global regex
                    for (let i = 1; i < allMatches.length; i++) {
                        if (allMatches[i]) {
                            groups.push({
                                text: allMatches[i],
                                name: `Group ${i}`
                            });
                        }
                    }
                }
            } else {
                // For global regex, use exec in a loop
                let match;
                while ((match = regex.exec(testString)) !== null) {
                    // Prevent infinite loops
                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }

                    matches.push({
                        text: match[0],
                        index: match.index,
                        length: match[0].length
                    });

                    // Process named capture groups
                    if (match.groups) {
                        Object.entries(match.groups).forEach(([name, value]) => {
                            if (value) {
                                groups.push({
                                    text: value,
                                    name
                                });
                            }
                        });
                    }

                    // Process numbered groups
                    for (let i = 1; i < match.length; i++) {
                        if (match[i] && !(match.groups && Object.values(match.groups).includes(match[i]))) {
                            groups.push({
                                text: match[i]
                            });
                        }
                    }
                }
            }

            setResult({
                isValid: true,
                matches,
                groups
            });

            highlightMatches(matches);
        } catch (error) {
            setResult({
                isValid: false,
                matches: [],
                groups: [],
                error: (error as Error).message
            });
            setHighlightedText(testString);
        }
    };

    const highlightMatches = (matches: Match[]) => {
        if (matches.length === 0) {
            setHighlightedText(testString);
            return;
        }

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        matches.forEach((match, idx) => {
            // Text before match
            if (match.index > lastIndex) {
                parts.push(
                    <span key={`before-${idx}`}>
                        {testString.substring(lastIndex, match.index)}
                    </span>
                );
            }

            // Highlighted match
            parts.push(
                <span
                    key={`match-${idx}`}
                    className="bg-green-200 dark:bg-green-800 px-0.5 rounded"
                    title={`Match #${idx + 1}`}
                >
                    {testString.substring(match.index, match.index + match.length)}
                </span>
            );

            lastIndex = match.index + match.length;
        });

        // Text after last match
        if (lastIndex < testString.length) {
            parts.push(
                <span key="after-last">
                    {testString.substring(lastIndex)}
                </span>
            );
        }

        setHighlightedText(<>{parts}</>);
    };

    // Effect to process regex when inputs change
    useEffect(() => {
        processRegex();
    }, [pattern, testString, flags]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            },
            () => {
                setCopySuccess('Failed to copy');
            }
        );
    };

    const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPattern(e.target.value);
    };

    const handleTestStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTestString(e.target.value);
    };

    const examples = [
        { pattern: '\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b', flags: 'i', description: 'Email' },
        { pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$', flags: '', description: 'Password (Min 8 chars, 1 letter, 1 number)' },
        { pattern: '\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b', flags: 'g', description: 'US Phone Number' },
        { pattern: '^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', flags: 'g', description: 'Date (YYYY-MM-DD)' },
    ];

    const loadExample = (pattern: string, flags: string) => {
        setPattern(pattern);

        // Set flag states based on the example
        setGlobalFlag(flags.includes('g'));
        setCaseInsensitiveFlag(flags.includes('i'));
        setMultilineFlag(flags.includes('m'));
        setDotAllFlag(flags.includes('s'));
        setUnicodeFlag(flags.includes('u'));
        setStickyFlag(flags.includes('y'));
    };

    const clearAll = () => {
        setPattern('');
        setTestString('');
        setGlobalFlag(true);
        setCaseInsensitiveFlag(false);
        setMultilineFlag(false);
        setDotAllFlag(false);
        setUnicodeFlag(false);
        setStickyFlag(false);
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">DevBlogger Regex Tester</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Test and debug your regular expressions in real-time
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-8 text-sm text-gray-700 dark:text-gray-300">
                    <h2 className="text-lg font-semibold mb-2">About This Regex Tester</h2>
                    <p className="mb-2">
                        Regular expressions are powerful pattern matching tools used across programming languages for text searching, validation, and manipulation.
                        This comprehensive regex tester lets you experiment with patterns in real-time, showing matches, capture groups, and detailed results.
                    </p>
                    <p>
                        Whether you're validating email addresses, parsing data, or creating advanced text processors, our tester helps you build and refine
                        regular expressions with instant visual feedback. Save time debugging with support for all JavaScript regex flags and pattern highlighting.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        {/* Main regex input section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="regex-pattern" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Regular Expression
                                    </label>
                                    <div className="text-sm">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                            onClick={() => copyToClipboard(pattern)}
                                        >
                                            Copy {copySuccess && <span className="ml-1 text-green-500">{copySuccess}</span>}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                                        /
                                    </span>
                                    <input
                                        type="text"
                                        id="regex-pattern"
                                        className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter your regex pattern"
                                        value={pattern}
                                        onChange={handlePatternChange}
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                                        /{flags}
                                    </span>
                                </div>
                                {!result.isValid && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{result.error}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="test-string" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Test String
                                </label>
                                <textarea
                                    id="test-string"
                                    rows={6}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                    placeholder="Enter text to test against your regex"
                                    value={testString}
                                    onChange={handleTestStringChange}
                                ></textarea>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center">
                                    <input
                                        id="global-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={globalFlag}
                                        onChange={(e) => setGlobalFlag(e.target.checked)}
                                    />
                                    <label htmlFor="global-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Global (g)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="case-insensitive-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={caseInsensitiveFlag}
                                        onChange={(e) => setCaseInsensitiveFlag(e.target.checked)}
                                    />
                                    <label htmlFor="case-insensitive-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Case Insensitive (i)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="multiline-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={multilineFlag}
                                        onChange={(e) => setMultilineFlag(e.target.checked)}
                                    />
                                    <label htmlFor="multiline-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Multiline (m)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="dotall-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={dotAllFlag}
                                        onChange={(e) => setDotAllFlag(e.target.checked)}
                                    />
                                    <label htmlFor="dotall-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Dot All (s)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="unicode-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={unicodeFlag}
                                        onChange={(e) => setUnicodeFlag(e.target.checked)}
                                    />
                                    <label htmlFor="unicode-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Unicode (u)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="sticky-flag"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={stickyFlag}
                                        onChange={(e) => setStickyFlag(e.target.checked)}
                                    />
                                    <label htmlFor="sticky-flag" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Sticky (y)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Results section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Results</h2>

                            {/* Match Highlighting */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Highlighted Matches</h3>
                                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 min-h-24 whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                                    {highlightedText || testString}
                                </div>
                            </div>

                            {/* Match List */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Matches ({result.matches.length})
                                </h3>
                                {result.matches.length > 0 ? (
                                    <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                                        <div className="max-h-48 overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Match
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Position
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                    {result.matches.map((match, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                {match.text}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                {match.index}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">No matches found</div>
                                )}
                            </div>

                            {/* Groups */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Groups ({result.groups.length})
                                </h3>
                                {result.groups.length > 0 ? (
                                    <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                                        <div className="max-h-48 overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                            Value
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                    {result.groups.map((group, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                                {group.name || `Group ${index + 1}`}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                {group.text}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">No groups found</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Examples */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Examples</h2>
                            <div className="space-y-3">
                                {examples.map((ex, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                                        onClick={() => loadExample(ex.pattern, ex.flags)}
                                    >
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{ex.description}</div>
                                        <div className="mt-1 text-sm font-mono text-gray-500 dark:text-gray-400 truncate">
                                            /{ex.pattern}/{ex.flags}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cheatsheet */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Regex Cheatsheet</h2>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Character Classes</h3>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">\d</code> - Digit</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">\w</code> - Word character</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">\s</code> - Whitespace</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[abc]</code> - Any of a, b, or c</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[^abc]</code> - Not a, b, or c</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Quantifiers</h3>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">*</code> - 0 or more</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">+</code> - 1 or more</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">?</code> - 0 or 1</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{"{3}"}</code> - Exactly 3</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{"{3,}"}</code> - 3 or more</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{"{3,5}"}</code> - Between 3 and 5</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Anchors</h3>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">^</code> - Start of string</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">$</code> - End of string</li>
                                        <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">\b</code> - Word boundary</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Actions</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={clearAll}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">How to Use the Regex Tester</h2>
                    <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm">
                        <p><strong>1. Enter your pattern:</strong> Type your regular expression in the input field. The pattern will be automatically evaluated.</p>
                        <p><strong>2. Set flags:</strong> Toggle JavaScript regex flags (g, i, m, s, u, y) to modify matching behavior.</p>
                        <p><strong>3. Enter test string:</strong> Add the text you want to test against your regular expression.</p>
                        <p><strong>4. View results:</strong> See highlighted matches, match details, and captured groups in real-time.</p>
                        <p><strong>5. Use examples:</strong> Click on any example to quickly test common regex patterns for emails, passwords, and more.</p>
                    </div>
                    <div className="mt-6 border-t pt-4 text-gray-600 dark:text-gray-400">
                        <h3 className="font-medium mb-2">Common Regex Use Cases:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Form validation (emails, phone numbers, URLs)</li>
                            <li>Data extraction and parsing</li>
                            <li>String manipulation and replacement</li>
                            <li>Input sanitization and formatting</li>
                            <li>Search functionality and filtering</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Made with ❤️ for developers by <a href="https://devblogger.in" className="text-blue-500 hover:underline">DevBlogger</a></p>
                </div>
            </div>
        </>
    );
};

export default RegexTester;