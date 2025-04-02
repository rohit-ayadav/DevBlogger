import Markdown from 'markdown-to-jsx';
import Adsense from '../AdSense';
import ReadingProgress from './ReadingProgress';
import CodeBlock from './CodeBlock';
import React from 'react';

// Enhanced markdown styles with better responsiveness
const markdownStyles = {
    h1: 'scroll-mt-20 text-2xl md:text-3xl lg:text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-white leading-tight',
    h2: 'scroll-mt-16 text-xl md:text-2xl lg:text-3xl font-bold mt-7 mb-4 text-gray-800 dark:text-gray-100 leading-tight',
    h3: 'scroll-mt-16 text-lg md:text-xl lg:text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100 leading-tight',
    p: 'my-4 text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed break-words',
    ul: 'my-4 pl-5 md:pl-6 list-disc text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 space-y-2 md:space-y-3',
    ol: 'my-4 pl-5 md:pl-6 list-decimal text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 space-y-2 md:space-y-3',
    li: 'ml-2 md:ml-2 leading-relaxed break-words pb-1',
    blockquote: 'pl-4 md:pl-5 my-4 md:my-5 border-l-4 border-blue-500 dark:border-blue-400 italic text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 py-2 px-3 rounded',
    a: 'text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 break-words inline-block',
    img: 'max-w-full h-auto rounded-lg shadow-md object-cover my-6 mx-auto',
    strong: 'font-semibold text-gray-900 dark:text-white',
    pre: 'my-6 rounded-lg overflow-hidden shadow-lg',
    code: 'font-mono text-sm md:text-base bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-pink-600 dark:text-pink-400',
    table: 'min-w-full my-6 border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden',
    th: 'bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700',
    td: 'px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300',
};


// Inline code component
const InlineCode = ({ children }: React.PropsWithChildren) => (
    <code className={markdownStyles.code}>{children}</code>
);

// Main content component with enhanced rendering
const MarkdownContent = ({ sections }: { sections: string[] }) => (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <ReadingProgress />
        {sections.map((section, index) => (
            <React.Fragment key={index}>
                <Markdown
                    options={{
                        overrides: {
                            h1: {
                                component: 'h1',
                                props: { className: markdownStyles.h1 },
                            },
                            h2: {
                                component: 'h2',
                                props: { className: markdownStyles.h2 },
                            },
                            h3: {
                                component: 'h3',
                                props: { className: markdownStyles.h3 },
                            },
                            p: { component: 'p', props: { className: markdownStyles.p } },
                            ul: { component: 'ul', props: { className: markdownStyles.ul } },
                            ol: { component: 'ol', props: { className: markdownStyles.ol } },
                            li: { component: 'li', props: { className: markdownStyles.li } },
                            strong: { component: 'strong', props: { className: markdownStyles.strong } },
                            a: {
                                component: 'a',
                                props: {
                                    className: markdownStyles.a,
                                    // target: '_blank', // Open in new tab
                                    rel: 'noopener noreferrer'
                                }
                            },
                            img: {
                                component: 'img',
                                props: {
                                    className: markdownStyles.img,
                                    loading: 'lazy'
                                },
                            },
                            blockquote: {
                                component: 'blockquote',
                                props: { className: markdownStyles.blockquote }
                            },
                            pre: {
                                component: 'pre',
                                props: { className: markdownStyles.pre }
                            },
                            code: {
                                component: ({ className, children }: { className?: string; children: React.ReactNode }) =>
                                    className
                                        ? <CodeBlock className={className}>{children}</CodeBlock>
                                        : <InlineCode>{children}</InlineCode>
                            },
                            table: { component: 'table', props: { className: markdownStyles.table } },
                            th: { component: 'th', props: { className: markdownStyles.th } },
                            td: { component: 'td', props: { className: markdownStyles.td } },
                        },
                    }}
                >
                    {section.trim()}
                </Markdown>
                {index !== sections.length - 1 && (
                    <div className="my-8 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                        <Adsense />
                    </div>
                )}
            </React.Fragment>
        ))}
    </article>
);


export default MarkdownContent;