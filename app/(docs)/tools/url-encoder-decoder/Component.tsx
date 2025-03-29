"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

/**
 * URLEncoderDecoder - A comprehensive tool for encoding and decoding URLs
 * Features include encoding/decoding options, param parsing, and batch processing.
 */
const URLEncoderDecoder: React.FC = () => {
    // Input/output state
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    // Additional options
    const [encodeType, setEncodeType] = useState<'uri' | 'component' | 'all'>('component');
    const [parseParams, setParseParams] = useState<boolean>(false);
    const [parsedParams, setParsedParams] = useState<{ [key: string]: string }>({});

    // UI state
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Process URL when input or settings change
    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError('');
            setParsedParams({});
            return;
        }

        try {
            if (mode === 'encode') {
                encodeURL();
            } else {
                decodeURL();
            }

            // Parse parameters if enabled and in decode mode
            if (parseParams && mode === 'decode') {
                parseURLParams();
            } else {
                setParsedParams({});
            }

            setError('');
        } catch (err) {
            setError((err as Error).message || 'An error occurred while processing the URL.');
        }
    }, [input, mode, encodeType, parseParams]);

    // URL encoding function
    const encodeURL = () => {
        let result = '';

        try {
            if (encodeType === 'uri') {
                result = encodeURI(input);
            } else if (encodeType === 'component') {
                result = encodeURIComponent(input);
            } else if (encodeType === 'all') {
                // Encode all characters, including those not normally encoded by encodeURIComponent
                result = Array.from(input)
                    .map((char) => {
                        return `%${char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()}`;
                    })
                    .join('');
            }

            setOutput(result);
        } catch (err) {
            throw new Error(`Failed to encode: ${(err as Error).message}`);
        }
    };

    // URL decoding function
    const decodeURL = () => {
        let result = '';

        try {
            if (encodeType === 'uri') {
                result = decodeURI(input);
            } else if (encodeType === 'component') {
                result = decodeURIComponent(input);
            } else if (encodeType === 'all') {
                // Manual decoding for ALL encoding
                result = input.replace(/%([0-9A-Fa-f]{2})/g, (_, hex) => {
                    return String.fromCharCode(parseInt(hex, 16));
                });
            }

            setOutput(result);
        } catch (err) {
            throw new Error(`Failed to decode: ${(err as Error).message}`);
        }
    };

    // Parse URL parameters
    const parseURLParams = () => {
        try {
            const urlObj = new URL(input.includes('://') ? input : `http://example.com/${input}`);
            const params: { [key: string]: string } = {};

            for (const [key, value] of urlObj.searchParams.entries()) {
                params[key] = value;
            }

            setParsedParams(params);
        } catch (err) {
            // If URL parsing fails, try to manually extract query parameters
            try {
                const queryString = input.includes('?') ? input.split('?')[1] : input;
                const params: { [key: string]: string } = {};

                queryString.split('&').forEach(pair => {
                    if (pair.includes('=')) {
                        const [key, value] = pair.split('=');
                        params[key] = decodeURIComponent(value);
                    }
                });

                setParsedParams(params);
            } catch (err) {
                setParsedParams({});
            }
        }
    };

    // Copy to clipboard function
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

    // Toggle encoding/decoding mode
    const toggleMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        // Swap input and output when toggling
        setInput(output);
    };

    // Reset all fields
    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
        setParsedParams({});
    };

    // Example URLs and components
    const examples = [
        {
            name: "Simple URL",
            value: "https://www.example.com/path/to/page.html?param=value&query=search term"
        },
        {
            name: "URL with Special Characters",
            value: "https://example.com/products?category=Laptops & Computers&price=500-1000€&inStock=true"
        },
        {
            name: "API Endpoint",
            value: "https://api.example.com/v1/users?filter[status]=active&include=profile,orders&sort=-created_at"
        },
        {
            name: "International Characters",
            value: "https://example.com/search?q=こんにちは世界&lang=ja"
        },
        {
            name: "Complex Query Parameters",
            value: "https://example.com/search?coordinates=40.7128,-74.0060&radius=10km&tags[]=food&tags[]=coffee&open_now=true"
        }
    ];

    // Load example
    const loadExample = (example: string) => {
        setInput(example);
        setMode('encode');
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">DevBlogger URL Encoder/Decoder</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Safely encode and decode URLs for web applications
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-8 text-sm text-gray-700 dark:text-gray-300">
                    <h2 className="text-lg font-semibold mb-2">About This URL Tool</h2>
                    <p className="mb-2">
                        URL encoding (also known as percent-encoding) is used to convert characters into a format that can be safely transmitted over the internet.
                        Special characters, spaces, and non-ASCII characters need to be encoded to ensure proper data transfer in web applications.
                    </p>
                    <p>
                        This tool provides both encoding and decoding functionality, with options for standard URI encoding, component encoding, and advanced parameter parsing.
                        Perfect for web developers, testers, and anyone working with URLs that contain special characters or complex query parameters.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        {/* Main input/output section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {mode === 'encode' ? 'URL Encoder' : 'URL Decoder'}
                                </h2>
                                <button
                                    onClick={toggleMode}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                                >
                                    Switch to {mode === 'encode' ? 'Decoder' : 'Encoder'}
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {mode === 'encode' ? 'Text to Encode' : 'Text to Decode'}
                                    </label>
                                    <div className="text-sm">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                            onClick={() => copyToClipboard(input)}
                                        >
                                            Copy Input
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    id="url-input"
                                    rows={6}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                                    placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter text to decode..."}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label htmlFor="encode-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Encoding Type
                                    </label>
                                    <select
                                        id="encode-type"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={encodeType}
                                        onChange={(e) => setEncodeType(e.target.value as 'uri' | 'component' | 'all')}
                                    >
                                        <option value="component">encodeURIComponent (most common)</option>
                                        <option value="uri">encodeURI (preserves URL structure)</option>
                                        <option value="all">Encode All Characters (maximum encoding)</option>
                                    </select>
                                </div>

                                {mode === 'decode' && (
                                    <div className="flex items-center">
                                        <input
                                            id="parse-params"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={parseParams}
                                            onChange={(e) => setParseParams(e.target.checked)}
                                        />
                                        <label htmlFor="parse-params" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Parse URL Parameters
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="url-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                                    </label>
                                    <div className="text-sm">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                            onClick={() => copyToClipboard(output)}
                                            disabled={!output}
                                        >
                                            Copy Result {copySuccess && <span className="ml-1 text-green-500">{copySuccess}</span>}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm">
                                        <p className="font-medium">Error:</p>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <textarea
                                    id="url-output"
                                    rows={6}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                                    placeholder={mode === 'encode' ? "Encoded URL will appear here..." : "Decoded URL will appear here..."}
                                    value={output}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* URL Parameters section (only shown when parseParams is true) */}
                        {parseParams && mode === 'decode' && Object.keys(parsedParams).length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">URL Parameters</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Parameter
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {Object.entries(parsedParams).map(([key, value], index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                        {key}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono break-all">
                                                        {value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        {/* Examples */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Example URLs</h2>
                            <div className="space-y-3">
                                {examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                                        onClick={() => loadExample(example.value)}
                                    >
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{example.name}</div>
                                        <div className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
                                            {example.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Encoding Reference */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">URL Encoding Reference</h2>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Common Encoded Characters</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Character</th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Encoded</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">Space</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%20</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">!</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%21</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">#</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%23</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">$</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%24</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">&</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%26</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">'</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%27</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">(</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%28</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">)</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%29</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">+</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%2B</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">,</td>
                                                    <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">%2C</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">encodeURI vs encodeURIComponent</h3>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        <p className="mb-2"><strong>encodeURI:</strong> Encodes a complete URI but preserves characters that have special meaning in URLs (/, :, &, etc.)</p>
                                        <p><strong>encodeURIComponent:</strong> Encodes all special characters, including those with special meaning in URLs. Best for encoding parameter values.</p>
                                    </div>
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">When to Use URL Encoding</h2>
                    <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm">
                        <p><strong>1. Query Parameters:</strong> Always encode parameter values in URLs to ensure special characters are transmitted correctly.</p>
                        <p><strong>2. Form Submissions:</strong> When sending form data via GET method, values get appended to the URL and need encoding.</p>
                        <p><strong>3. API Requests:</strong> When building API endpoints with complex query parameters or path segments containing special characters.</p>
                        <p><strong>4. Internationalization:</strong> For URLs containing non-ASCII characters or content in multiple languages.</p>
                        <p><strong>5. OAuth & Authentication:</strong> When dealing with tokens and credentials in URL parameters.</p>
                    </div>
                    <div className="mt-6 border-t pt-4 text-gray-600 dark:text-gray-400">
                        <h3 className="font-medium mb-2">Common URL Encoding Pitfalls:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Double-encoding URLs (encoding an already encoded URL)</li>
                            <li>Not encoding special characters in query parameter values</li>
                            <li>Using the wrong encoding function (encodeURI vs encodeURIComponent)</li>
                            <li>Forgetting to decode values when processing URL parameters server-side</li>
                            <li>Not handling plus signs (+) which can represent spaces in query parameters</li>
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

export default URLEncoderDecoder;