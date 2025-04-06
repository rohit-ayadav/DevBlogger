import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import { BlogPostType } from '@/types/blogs-types';
import { useTheme } from '@/context/ThemeContext';
import ReadingProgress from '@/components/ShowMD/ReadingProgress';
import HtmlWithAdsense from './HTMLwithAdsense';

const RC = ({ content }: BlogPostType) => {
    const { isDarkMode } = useTheme();

    // Function to create anchor links for headings
    const makeZlink = (content: string) => {
        const headingRegex = /<h[1-6].*?>(.*?)<\/h[1-6]>/g;
        const headings = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            headings.push(match);
        }

        headings.forEach((match) => {
            const heading = match[0];
            const textContent = match[1];
            const id = textContent
                .replace(/ /g, '-')
                .replace(/[^a-zA-Z0-9-]/g, '')
                .toLowerCase()
                .trim();

            content = content.replace(
                heading,
                heading.replace(
                    textContent,
                    `<span id="${id}" class="block relative -top-16"></span>${textContent}`
                )
            );
        });

        return content;
    };

    // Helper function to handle multiline regex replacement
    interface ReplaceMultiline {
        (content: string, pattern: RegExp, replacement: string): string;
    }

    const replaceMultiline: ReplaceMultiline = (content, pattern, replacement) => {
        const parts = content.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/);
        return parts.map(part => {
            if (part.startsWith('<pre') || part.startsWith('<code')) {
                // For pre and code blocks, we need special handling
                if (part.startsWith('<pre')) {
                    // Extract language and content
                    const langMatch = part.match(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/);
                    if (langMatch) {
                        const [_, lang, codeContent] = langMatch;
                        return `<pre class="language-${lang} rounded-lg p-4 mb-6 overflow-x-auto line-numbers ${isDarkMode ? 'dark-code' : 'light-code'}"><code class="language-${lang} whitespace-pre-wrap break-words">${codeContent}</code></pre>`;
                    }
                }
                return part;
            } else {
                // For regular content, use the pattern and replacement
                return part.replace(pattern, replacement);
            }
        }).join('');
    };

    // Function to add custom styles to HTML elements
    const addCustomStyles = (content: string) => {
        // Handle basic replacements
        content = content
            .replace(/<h1(.*?)>(.*?)<\/h1>/g, '<h1 class="text-4xl sm:text-3xl font-bold mb-6 mt-8 break-words">$2</h1>')
            .replace(/<h2(.*?)>(.*?)<\/h2>/g, '<h2 class="text-3xl sm:text-2xl font-semibold mb-4 mt-6 break-words">$2</h2>')
            .replace(/<h3(.*?)>(.*?)<\/h3>/g, '<h3 class="text-2xl sm:text-xl font-semibold mb-3 mt-5 break-words">$2</h3>')
            .replace(/<h4(.*?)>(.*?)<\/h4>/g, '<h4 class="text-xl sm:text-lg font-semibold mb-3 mt-4 break-words">$2</h4>')
            .replace(/<a(.*?)>(.*?)<\/a>/g, '<a$1 class="text-blue-600 dark:text-blue-400 hover:underline break-words">$2</a>');

        // Handle multiline replacements
        content = replaceMultiline(content, /<p>(.*?)<\/p>/g, '<p class="mb-4 leading-relaxed break-words">$1</p>');
        content = replaceMultiline(content, /<ul>(.*?)<\/ul>/g, '<ul class="list-disc pl-6 mb-4 space-y-2">$1</ul>');
        content = replaceMultiline(content, /<ol>(.*?)<\/ol>/g, '<ol class="list-decimal pl-6 mb-4 space-y-2">$1</ol>');
        content = replaceMultiline(content, /<li>(.*?)<\/li>/g, '<li class="mb-1 break-words">$1</li>');
        content = replaceMultiline(content, /<blockquote>(.*?)<\/blockquote>/g, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic py-2 mb-4 break-words">$1</blockquote>');

        // Handle tables
        content = replaceMultiline(content, /<table>(.*?)<\/table>/g, '<div class="overflow-x-auto mb-6"><table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700">$1</table></div>');
        content = replaceMultiline(content, /<thead>(.*?)<\/thead>/g, '<thead class="bg-gray-100 dark:bg-gray-800">$1</thead>');
        content = replaceMultiline(content, /<th>(.*?)<\/th>/g, '<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left break-words">$1</th>');
        content = replaceMultiline(content, /<td>(.*?)<\/td>/g, '<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 break-words">$1</td>');
        content = replaceMultiline(content, /<tr>(.*?)<\/tr>/g, '<tr class="hover:bg-gray-50 dark:hover:bg-gray-900">$1</tr>');

        // Handle code blocks explicitly
        content = content.replace(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g,
            `<pre class="language-$1 rounded-lg p-4 mb-6 overflow-x-auto line-numbers ${isDarkMode ? 'dark-code' : 'light-code'}"><code class="language-$1 whitespace-pre-wrap break-words">$2</code></pre>`);

        // Handle inline code
        content = content.replace(/<code(?!\s*class="language)(.*?)>([\s\S]*?)<\/code>/g,
            `<code class="${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} rounded px-2 py-1 font-mono text-sm whitespace-pre-wrap break-words">$2</code>`);

        return content;
    };

    useEffect(() => {
        // Dynamically load theme CSS based on current theme
        const themeUrl = isDarkMode
            ? "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
            : "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = themeUrl;
        link.id = "prism-theme";

        const existingLink = document.getElementById("prism-theme");
        if (existingLink) {
            document.head.removeChild(existingLink);
        }

        document.head.appendChild(link);

        // Apply syntax highlighting after theme is loaded
        setTimeout(() => {
            Prism.highlightAll();
        }, 100);

    }, [isDarkMode, content]); // Also re-highlight when content changes

    // Custom CSS for code blocks and theme-specific styling
    const customStyles = `
        /* Better code block styling */
        .dark-code {
            background-color: #1e1e1e !important;
            color: #d4d4d4 !important;
            border: 1px solid #2d2d2d;
        }
        
        .light-code {
            background-color: #f5f5f5 !important;
            color: #333333 !important;
            border: 1px solid #e0e0e0;
        }
        
        /* Improve line numbers visibility */
        .line-numbers .line-numbers-rows {
            border-right: 2px solid ${isDarkMode ? '#444' : '#ddd'};
            padding-right: 5px;
        }
        
        .line-numbers-rows > span:before {
            color: ${isDarkMode ? '#666' : '#999'};
        }
        
        /* Fix code scrolling */
        pre[class*="language-"] {
            max-height: 500px;
            word-break: normal;
            word-wrap: normal;
        }
        
        /* Improved token colors for dark mode */
        .dark-code .token.comment,
        .dark-code .token.prolog,
        .dark-code .token.doctype,
        .dark-code .token.cdata {
            color: #6a9955;
        }
        
        .dark-code .token.punctuation {
            color: #d4d4d4;
        }
        
        .dark-code .token.property,
        .dark-code .token.tag,
        .dark-code .token.boolean,
        .dark-code .token.number,
        .dark-code .token.constant,
        .dark-code .token.symbol {
            color: #b5cea8;
        }
        
        .dark-code .token.selector,
        .dark-code .token.string,
        .dark-code .token.char,
        .dark-code .token.builtin {
            color: #ce9178;
        }
        
        .dark-code .token.operator,
        .dark-code .token.entity,
        .dark-code .token.url,
        .dark-code .language-css .token.string,
        .dark-code .style .token.string {
            color: #d4d4d4;
        }
        
        .dark-code .token.atrule,
        .dark-code .token.attr-value,
        .dark-code .token.keyword {
            color: #569cd6;
        }
        
        .dark-code .token.function {
            color: #dcdcaa;
        }
        
        .dark-code .token.regex,
        .dark-code .token.important,
        .dark-code .token.variable {
            color: #d16969;
        }
        
        /* Responsive typography */
        @media (max-width: 640px) {
            pre[class*="language-"] {
                padding: 1rem !important;
                font-size: 0.875rem !important;
            }
            
            code[class*="language-"] {
                font-size: 0.875rem !important;
            }
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <ReadingProgress />
           <HtmlWithAdsense rawHtml={addCustomStyles(makeZlink(content))} />
        </>
    );
};

export default RC;