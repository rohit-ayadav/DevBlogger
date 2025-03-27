import React, { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import TableOfContents from './Toc';
import { extractHeadings } from './utils';
import LoadingEffect from '@/lib/LoadingEffect';
import { ErrorMessage } from '@/lib/ErrorMessage';
import Markdown from 'markdown-to-jsx';
import Adsense from '../AdSense';

const markdownStyles = {
  h1: 'scroll-mt-16 text-xl md:text-3xl lg:text-4xl font-bold mt-6 mb-4 text-gray-900 dark:text-white',
  h2: 'scroll-mt-16 text-lg md:text-2xl lg:text-3xl font-bold mt-5 mb-3 text-gray-800 dark:text-gray-100',
  h3: 'scroll-mt-16 text-base md:text-xl lg:text-2xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100',
  p: 'my-3 text-s md:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words',
  ul: 'my-3 pl-4 md:pl-6 list-disc text-xs md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2',
  ol: 'my-3 pl-4 md:pl-6 list-decimal text-xs md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2',
  li: 'ml-1 md:ml-2 leading-relaxed break-words',
  blockquote: 'pl-3 md:pl-4 my-3 md:my-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-xs md:text-base text-gray-600 dark:text-gray-400',
  a: 'text-blue-600 dark:text-blue-400 hover:underline break-words inline-block',
  img: 'max-w-full h-auto rounded-lg shadow-md object-cover',
  strong: 'font-semibold text-gray-900 dark:text-white',
};

const TocSidebar = ({ headings }: { headings: Array<{ level: number; text: string; slug: string }> }) => (
  <aside className="hidden lg:block lg:col-span-3 sticky top-8 self-start" aria-label="Table of contents">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Table of Contents</h2>
      <TableOfContents headings={headings} />
    </div>
  </aside>
);

const MobileTocDropdown = ({ headings }: { headings: Array<{ level: number; text: string; slug: string }> }) => (
  <div className="lg:hidden mb-6">
    <details className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <summary className="text-lg font-bold cursor-pointer text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" aria-label="Toggle table of contents">
        Table of Contents
      </summary>
      <div className="pt-4">
        <nav aria-label="Table of contents">
          <TableOfContents headings={headings} />
        </nav>
      </div>
    </details>
  </div>
);

// Main content component
const MarkdownContent = ({ sections }: { sections: string[] }) => (
  <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
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
              strong: {
                component: 'strong',
                props: { className: markdownStyles.strong },
              },
              li: {
                component: 'li',
                props: { className: markdownStyles.li },
              },
              a: { component: 'a', props: { className: markdownStyles.a } },
              img: {
                component: 'img',
                props: { className: markdownStyles.img },
              },
            },
          }}
        >
          {section.trim()}
        </Markdown>
        {index !== sections.length - 1 && <Adsense />}
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
    const headings = extractHeadings(markdownContent).map(({ level, text }) => ({ level, text, id: text.toLowerCase().replace(/\s+/g, '-'), slug: text.toLowerCase().replace(/\s+/g, '-') }));

    const placeholder = '<!-- ADSENSE -->';
    const sections = markdownContent.split(placeholder);
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <TocSidebar headings={headings} />
            <main className="lg:col-span-9">
              <MobileTocDropdown headings={headings} />
              <Suspense fallback={<LoadingEffect />}>
                <MarkdownContent sections={sections} />
              </Suspense>
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