"use client";
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

/**
 * Base64EncoderDecoder - A tool for encoding and decoding text using Base64
 * Features include text and file encoding/decoding, URL-safe Base64,
 * and character counting.
 */
const Base64EncoderDecoder: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [urlSafe, setUrlSafe] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [inputStats, setInputStats] = useState({ chars: 0, bytes: 0 });
    const [outputStats, setOutputStats] = useState({ chars: 0, bytes: 0 });
    const [copied, setCopied] = useState<boolean>(false);
    const [fileHandling, setFileHandling] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Process input when it changes
    useEffect(() => {
        if (input.trim() === '') {
            setOutput('');
            setError(null);
            setInputStats({ chars: 0, bytes: 0 });
            setOutputStats({ chars: 0, bytes: 0 });
            return;
        }

        try {
            setError(null);
            processInput();
        } catch (err) {
            setError((err as Error).message);
            setOutput('');
        }
    }, [input, mode, urlSafe]);

    const processInput = () => {
        if (mode === 'encode') {
            encodeText();
        } else {
            decodeText();
        }
        updateStats();
    };

    const encodeText = () => {
        try {
            // UTF-8 encode the string to handle non-ASCII characters
            const encoder = new TextEncoder();
            const data = encoder.encode(input);

            // Convert to base64
            let base64 = btoa(String.fromCharCode(...data));

            // Make URL-safe if option is selected
            if (urlSafe) {
                base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            }

            setOutput(base64);
        } catch (err) {
            throw new Error(`Encoding failed: ${(err as Error).message}`);
        }
    };

    const decodeText = () => {
        try {
            let base64 = input;

            // Convert URL-safe characters back if needed
            if (urlSafe) {
                // Add padding if necessary
                const padding = base64.length % 4;
                if (padding) {
                    base64 += '='.repeat(4 - padding);
                }
                base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
            }

            // Convert from base64
            const binaryStr = atob(base64);

            // Handle UTF-8 encoded characters
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
                bytes[i] = binaryStr.charCodeAt(i);
            }

            const decoder = new TextDecoder();
            setOutput(decoder.decode(bytes));
        } catch (err) {
            throw new Error(`Decoding failed: Invalid Base64 input`);
        }
    };

    const updateStats = () => {
        // Count input stats
        const inputEncoder = new TextEncoder();
        const inputBytes = inputEncoder.encode(input);
        setInputStats({
            chars: input.length,
            bytes: inputBytes.length
        });

        // Count output stats
        const outputEncoder = new TextEncoder();
        const outputBytes = outputEncoder.encode(output);
        setOutputStats({
            chars: output.length,
            bytes: outputBytes.length
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSwap = () => {
        setInput(output);
        setMode(mode === 'encode' ? 'decode' : 'encode');
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        if (mode === 'encode') {
            reader.onload = (e) => {
                if (e.target?.result) {
                    // Convert ArrayBuffer to Base64
                    const arrayBuffer = e.target.result as ArrayBuffer;
                    const bytes = new Uint8Array(arrayBuffer);
                    let binary = '';
                    for (let i = 0; i < bytes.byteLength; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    let base64 = btoa(binary);

                    // Make URL-safe if option is selected
                    if (urlSafe) {
                        base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
                    }

                    setInput(`File: ${file.name}`);
                    setOutput(base64);
                    updateStats();
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            reader.onload = (e) => {
                if (e.target?.result) {
                    const base64 = e.target.result as string;
                    setInput(base64);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleDownload = () => {
        if (!output) return;

        let content: Blob;
        let filename: string;

        if (mode === 'encode') {
            content = new Blob([output], { type: 'text/plain' });
            filename = 'encoded.txt';
        } else {
            try {
                // Try to decode the output and save as binary
                const binary = atob(urlSafe ? output.replace(/-/g, '+').replace(/_/g, '/') : output);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    bytes[i] = binary.charCodeAt(i);
                }
                content = new Blob([bytes], { type: 'application/octet-stream' });
                filename = 'decoded.bin';
            } catch (e) {
                // If decoding fails, save as text
                content = new Blob([output], { type: 'text/plain' });
                filename = 'decoded.txt';
            }
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const sampleData = [
        { input: "Hello, World!", description: "Basic Text" },
        { input: "https://devblogger.in/tools/base64", description: "URL" },
        { input: "1234567890", description: "Numbers" },
        { input: "🚀 👨‍💻 🌍", description: "Emoji" },
    ];

    const loadSample = (text: string) => {
        setMode('encode');
        setInput(text);
    };

    return (
        <>
            <Head>
                <title>Base64 Encoder/Decoder - Convert Text to Base64 and Back | DevBlogger</title>
                <meta name="description" content="Free online tool to encode text to Base64 and decode Base64 to text. Supports UTF-8, file encoding/decoding, and URL-safe Base64 format." />
                <meta name="keywords" content="base64, encoder, decoder, base64 converter, online encoder, base64 decode, base64 encode, URL-safe base64" />
                <meta property="og:title" content="Base64 Encoder/Decoder Tool" />
                <meta property="og:description" content="Free online tool to encode and decode Base64 strings with support for UTF-8 and file handling." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://devblogger.in/tools/base64" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Base64 Encoder/Decoder Tool" />
                <meta name="twitter:description" content="Free online tool to encode and decode Base64 strings with support for UTF-8 and file handling." />
                <link rel="canonical" href="https://devblogger.in/tools/base64" />
            </Head>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Base64 Encoder/Decoder</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Convert text to Base64 encoding and decode Base64 back to text
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-8 text-sm text-gray-700 dark:text-gray-300">
                    <h2 className="text-lg font-semibold mb-2">About Base64 Encoding</h2>
                    <p className="mb-2">
                        Base64 is an encoding scheme that represents binary data in an ASCII string format by translating it
                        into a radix-64 representation. It's commonly used for sending data over media designed for text,
                        like email and HTTP.
                    </p>
                    <p>
                        This tool allows you to encode text to Base64 and decode Base64 back to text, with support for
                        UTF-8 characters, file processing, and URL-safe variants of Base64 encoding.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mode Selection */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio text-blue-600"
                                            name="mode"
                                            checked={mode === 'encode'}
                                            onChange={() => setMode('encode')}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">Encode to Base64</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio text-blue-600"
                                            name="mode"
                                            checked={mode === 'decode'}
                                            onChange={() => setMode('decode')}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">Decode from Base64</span>
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600"
                                            checked={urlSafe}
                                            onChange={(e) => setUrlSafe(e.target.checked)}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">URL-safe Base64</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="input"
                                        rows={6}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                        placeholder={mode === 'encode' ? 'Enter text to encode to Base64...' : 'Enter Base64 to decode...'}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    ></textarea>
                                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                                        {inputStats.chars} chars | {inputStats.bytes} bytes
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleSwap}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                        Swap
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Clear
                                    </button>
                                    <button
                                        onClick={() => setFileHandling(!fileHandling)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {fileHandling ? 'Hide File Options' : 'Show File Options'}
                                    </button>
                                </div>
                            </div>

                            {fileHandling && (
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">File Processing</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={handleFileSelect}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            {mode === 'encode' ? 'Encode File' : 'Load Base64 File'}
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        {output && (
                                            <button
                                                onClick={handleDownload}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download {mode === 'encode' ? 'Encoded' : 'Decoded'} File
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        {mode === 'encode'
                                            ? 'Upload any file to convert it to Base64 format. Max recommended size: 1MB.'
                                            : 'Upload a text file containing Base64 data to decode it.'}
                                    </p>
                                </div>
                            )}

                            <div className="mb-1">
                                <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {mode === 'encode' ? 'Base64 Result' : 'Decoded Result'}
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="output"
                                        rows={6}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                                        placeholder={mode === 'encode' ? 'Base64 encoded output will appear here...' : 'Decoded text will appear here...'}
                                        value={output}
                                        readOnly
                                    ></textarea>
                                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                                        {outputStats.chars} chars | {outputStats.bytes} bytes
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="mt-2 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {output && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleCopy}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Examples */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Example Data</h2>
                            <div className="space-y-3">
                                {sampleData.map((sample, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                                        onClick={() => loadSample(sample.input)}
                                    >
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{sample.description}</div>
                                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {sample.input}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">What is Base64?</h2>
                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <p>
                                    Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.
                                </p>
                                <p>
                                    It's commonly used for:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Encoding binary data for email attachments (MIME)</li>
                                    <li>Data URLs in web applications</li>
                                    <li>Storing complex data in XML or JSON</li>
                                    <li>Transferring data in HTTP requests</li>
                                    <li>Embedding binary assets in source code</li>
                                </ul>
                                <p>
                                    Base64 uses a set of 64 characters (A-Z, a-z, 0-9, + and /) with = used for padding.
                                </p>
                                <p>
                                    <strong>URL-safe Base64</strong> replaces + with - and / with _ to make it safe for use in URLs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Using the Base64 Tool</h2>
                    <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm">
                        <p><strong>To encode text to Base64:</strong></p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Select "Encode to Base64" mode</li>
                            <li>Enter or paste your text in the input area</li>
                            <li>View the Base64 encoded result in the output area</li>
                            <li>Optionally click "Copy to Clipboard" to copy the result</li>
                        </ol>

                        <p><strong>To decode Base64 to text:</strong></p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Select "Decode from Base64" mode</li>
                            <li>Enter or paste Base64 data in the input area</li>
                            <li>View the decoded text in the output area</li>
                            <li>Optionally click "Copy to Clipboard" to copy the result</li>
                        </ol>

                        <p><strong>Working with files:</strong></p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Click "Show File Options" to reveal file handling controls</li>
                            <li>Use "Encode File" to convert a file to Base64</li>
                            <li>Use "Download" to save the encoded or decoded output as a file</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Made with ❤️ for developers by <a href="https://devblogger.in" className="text-blue-600 hover:underline">DevBlogger</a></p>
                </div>
            </div>
        </>
    );
};

export default Base64EncoderDecoder;