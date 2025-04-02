import React, { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import TableOfContents from './Toc';
import { extractHeadings } from './utils';
import LoadingEffect from '@/lib/LoadingEffect';
import { ErrorMessage } from '@/lib/ErrorMessage';
import MarkdownContent from './MarkDownContent';

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