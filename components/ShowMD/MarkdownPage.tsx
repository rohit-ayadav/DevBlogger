import React, { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import TableOfContents from './Toc';
import { extractHeadings } from './utils';
import LoadingEffect from '@/lib/LoadingEffect';
import { ErrorMessage } from '@/lib/ErrorMessage';
import Markdown from 'markdown-to-jsx';
import Adsense from '../AdSense';
import ReadingProgress from './ReadingProgress';
import CodeBlock from './CodeBlock';

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

const TocSidebar = ({ headings }: { headings: any[] }) => (
  <aside className="hidden lg:block lg:col-span-3 sticky top-8 self-start transition-all duration-300" aria-label="Table of contents">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Table of Contents</h2>
      <TableOfContents headings={headings} />
    </div>
  </aside>
);

const MobileTocDropdown = ({ headings }: { headings: any[] }) => (
  <div className="lg:hidden mb-6">
    <details className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-100 dark:border-gray-700">
      <summary className="text-lg font-bold cursor-pointer text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center justify-between">
        <span>Table of Contents</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pt-4 border-t mt-4 border-gray-200 dark:border-gray-700">
        <nav aria-label="Table of contents">
          <TableOfContents headings={headings} />
        </nav>
      </div>
    </details>
  </div>
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

export default async function MarkdownPage({ filename }: { filename: string }) {
  if (!filename || typeof filename !== 'string') {
    return <ErrorMessage message="Invalid filename provided" />;
  }

  try {
    const markdownFilePath = path.join(process.cwd(), 'content', `${filename}.md`);
    const fileExists = await fs.stat(markdownFilePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return <ErrorMessage message={`The requested file "${filename}" could not be found`} />;
    }

    const markdownContent = await fs.readFile(markdownFilePath, 'utf8');
    const headings = extractHeadings(markdownContent).map(({ level, text }) => ({
      level,
      text,
      id: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      slug: text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    }));

    const placeholder = '<!-- ADSENSE -->';
    const sections = markdownContent.split(placeholder);

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <TocSidebar headings={headings} />
            <main className="lg:col-span-9">
              <MobileTocDropdown headings={headings} />
              <Suspense fallback={<LoadingEffect />}>
                <MarkdownContent sections={sections} />
              </Suspense>
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Last updated: {(() => { const date = new Date(); date.setDate(date.getDate() - 2); return date.toLocaleDateString(); })()}</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering markdown page:', error);
    return <ErrorMessage message="An error occurred while loading the content" />;
  }
}