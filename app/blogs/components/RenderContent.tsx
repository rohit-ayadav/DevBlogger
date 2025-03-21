import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
// import "prismjs/themes/prism-tomorrow.css";
import { BlogPostType } from '@/types/blogs-types';
import { useTheme } from '@/context/ThemeContext';

const RenderContent = (post: BlogPostType) => {
    const { isDarkMode } = useTheme();
    const makeZlink = (content: string) => {
        const headingRegex = /<h[1-6].*?>(.*?)<\/h[1-6]>/g;
        const headings = [...content.matchAll(headingRegex)];

        headings.forEach((match) => {
            const heading = match[0];
            const textContent = match[1];
            const id = textContent
                .replace(/ /g, '-') // Replace spaces with hyphens
                .replace(/[^a-zA-Z0-9-]/g, '') // Remove non-alphanumeric characters
                .toLowerCase() // Convert to lowercase
                .trim(); // Remove leading/trailing whitespace
            content = content.replace(
                heading,
                heading.replace(
                    textContent,
                    `<span id="${id}" class="block"></span>${textContent}`
                )
            );
        });

        return content;
    };

    const addCustomStyles = (content: string) => {
        return content
            .replace(/<h1(.*?)>(.*?)<\/h1>/g, '<h1 class="text-4xl font-bold mb-6 mt-8">$2</h1>')
            .replace(/<h2(.*?)>(.*?)<\/h2>/g, '<h2 class="text-3xl font-semibold mb-4 mt-6">$2</h2>')
            .replace(/<p>(.*?)<\/p>/g, '<p class="mb-4">$1</p>')
            // .replace(/<code>(.*?)<\/code>/g, '<code class="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm">$1</code>')
            .replace(/<code(.*?)>(.*?)<\/code>/g, `<code class="${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm">$2</code>`);
    };

    // useEffect(() => {
    //     Prism.highlightAll();
    // }, [isDarkMode]);

    useEffect(() => {
        const themeUrl = isDarkMode
            ? "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
            : "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = themeUrl;
        link.id = "prism-theme"; // Give an ID for easy replacement

        const existingLink = document.getElementById("prism-theme");
        if (existingLink) {
            document.head.removeChild(existingLink);
        }
        document.head.appendChild(link);
        Prism.highlightAll();
    }, [isDarkMode]);

    return (
        <div
            className="prose"
            dangerouslySetInnerHTML={{
                __html: addCustomStyles(makeZlink(post.content)),
            }}
        />
    );
};

export default RenderContent;