import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import Image from 'next/image';
import CodeBlock from './CodeBlock';

const MarkdownComponents = {
    pre: (props: any) => (
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-50 dark:bg-gray-800 p-2 md:p-4">
            <pre className="text-xs md:text-sm whitespace-pre-wrap" {...props} />
        </div>
    ),

    code: (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
        <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs md:text-s font-mono break-words" {...props} />
    ),

    img: (props: any) => (
        <div className="my-4 flex justify-center">
            <img
                {...props}
                className="max-w-full h-auto rounded-lg shadow-md object-cover"
                alt={props.alt || "Image"}
                loading="lazy"
                style={{ maxHeight: '600px' }}
            />
        </div>
    ),

    // Mobile-first responsive table components
    table: (props: any) => (
        <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
            </div>
            <div className="md:hidden">
                {/* Custom responsive table container for mobile */}
                <div className="responsive-table">{props.children}</div>
            </div>
        </div>
    ),

    thead: (props: any) => (
        <>
            {/* Regular thead for desktop */}
            <thead className="bg-gray-50 dark:bg-gray-800 hidden md:table-header-group" {...props} />
            {/* For mobile, we just render the children but they'll be styled differently */}
            <div className="md:hidden bg-gray-50 dark:bg-gray-800 font-medium">{props.children}</div>
        </>
    ),

    th: (props: any) => (
        <>
            {/* Regular th for desktop */}
            <th
                className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                {...props}
            />
            {/* For mobile, we hide these as they'll be displayed as data-labels */}
            <div className="md:hidden sr-only">{props.children}</div>
        </>
    ),

    tr: (props: any) => (
        <>
            {/* Regular tr for desktop */}
            <tr
                className="hidden md:table-row bg-white dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                {...props}
            />
            {/* For mobile, we transform rows into card-like structures */}
            <div className="md:hidden border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                {props.children}
            </div>
        </>
    ),

    td: (props: any) => {
        // Extract the column header from the corresponding th element
        const headerText = props['data-label'] || '';

        return (
            <>
                {/* Regular td for desktop */}
                <td
                    className="hidden md:table-cell px-3 py-2 text-xs md:text-sm text-gray-700 dark:text-gray-300"
                    {...props}
                />
                {/* For mobile, we format as label: value pairs */}
                <div className="md:hidden py-2 flex flex-wrap">
                    {headerText && (
                        <span className="w-full font-medium text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                            {headerText}:
                        </span>
                    )}
                    <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-words w-full">
                        {props.children}
                    </span>
                </div>
            </>
        );
    },

    // Enhanced typography for headings with better spacing
    h1: (props: any) => (
        <h1
            className="scroll-mt-16 text-xl md:text-3xl lg:text-4xl font-bold mt-6 mb-4 text-gray-900 dark:text-white"
            {...props}
        />
    ),

    h2: (props: any) => (
        <h2
            className="scroll-mt-16 text-lg md:text-2xl lg:text-3xl font-bold mt-5 mb-3 text-gray-800 dark:text-gray-100"
            {...props}
        />
    ),

    h3: (props: any) => (
        <h3
            className="scroll-mt-16 text-base md:text-xl lg:text-2xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100"
            {...props}
        />
    ),

    h4: (props: any) => (
        <h4
            className="scroll-mt-16 text-sm md:text-lg font-semibold mt-3 mb-2 text-gray-700 dark:text-gray-200"
            {...props}
        />
    ),

    h5: (props: any) => (
        <h5
            className="scroll-mt-16 text-xs md:text-base font-semibold mt-3 mb-2 text-gray-700 dark:text-gray-200"
            {...props}
        />
    ),

    h6: (props: any) => (
        <h6
            className="scroll-mt-16 text-xs md:text-sm font-semibold mt-3 mb-2 text-gray-700 dark:text-gray-200"
            {...props}
        />
    ),

    // Enhanced paragraph with better word wrapping
    p: (props: any) => (
        <p
            className="my-3 text-s md:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words"
            {...props}
        />
    ),

    // Lists with better wrapping and spacing
    ul: (props: any) => (
        <ul
            className="my-3 pl-4 md:pl-6 list-disc text-xs md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2"
            {...props}
        />
    ),

    ol: (props: any) => (
        <ol
            className="my-3 pl-4 md:pl-6 list-decimal text-xs md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2"
            {...props}
        />
    ),

    li: (props: any) => (
        <li
            className="ml-1 md:ml-2 leading-relaxed break-words"
            {...props}
        />
    ),

    // Enhanced blockquote
    blockquote: (props: any) => (
        <blockquote
            className="pl-3 md:pl-4 my-3 md:my-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-xs md:text-base text-gray-600 dark:text-gray-400"
            {...props}
        />
    ),

    // Links with proper wrapping
    a: (props: any) => (
        <a
            className="text-blue-600 dark:text-blue-400 hover:underline break-words inline-block"
            target={props.href?.startsWith('http') ? "_blank" : undefined}
            rel={props.href?.startsWith('http') ? "noopener noreferrer" : undefined}
            {...props}
        />
    ),

    // Enhanced horizontal rule
    hr: (props: any) => (
        <hr
            className="my-4 md:my-6 border-gray-200 dark:border-gray-700"
            {...props}
        />
    ),
};

export default MarkdownComponents;