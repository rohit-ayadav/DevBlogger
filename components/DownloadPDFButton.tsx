'use client';

import React, { useState } from 'react';

interface DownloadPDFButtonProps {
    filename: string;
    directory?: string;
    buttonText?: string;
    className?: string;
}

/**
 * A button component that triggers Markdown to PDF conversion and download
 */
const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
    filename,
    directory = 'content/cheatsheets',
    buttonText = 'Download PDF',
    className = '',
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Construct the API URL with query parameters
            const apiUrl = `/api/markdown-to-pdf?filename=${encodeURIComponent(filename)}${directory ? `&directory=${encodeURIComponent(directory)}` : ''
                }`;

            // Fetch the PDF from our API route
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, directory }),
            });

            if (!response.ok) {
                // If the response is not OK, try to get error details
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.error || `Failed to generate PDF: ${response.status} ${response.statusText}`
                );
            }

            // Get the blob from the response
            const blob = await response.blob();

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleDownload}
                disabled={isLoading}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors 
          disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
            >
                {isLoading ? 'Generating PDF...' : buttonText}
            </button>

            {error && (
                <p className="mt-2 text-red-600 text-sm">
                    Error: {error}
                </p>
            )}
        </div>
    );
};

export default DownloadPDFButton;