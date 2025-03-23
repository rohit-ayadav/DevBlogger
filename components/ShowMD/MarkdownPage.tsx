import React, { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import MarkdownComponents from './MD';
import TableOfContents from './Toc';
import { extractHeadings } from './utils';

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">{message}</div>
        </div>
      </div>
    </div>
    <a href="/" className="text-blue-500 hover:text-blue-700 underline">
      Return to Home
    </a>
  </div>
);

const LoadingContent = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="h-4 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-4 w-4/6"></div>
  </div>
);

// TOC sidebar with improved accessibility
const TocSidebar = ({ headings }: { headings: Array<{ level: number; text: string; slug: string }> }) => (
  <aside className="hidden lg:block lg:col-span-3 sticky top-8 self-start" aria-label="Table of contents">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Table of Contents</h2>
      <TableOfContents headings={headings} />
    </div>
  </aside>
);

// Mobile TOC dropdown with improved accessibility
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
const MarkdownContent = ({ markdownContent }: { markdownContent: string }) => (
  <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-8">
    <MDXRemote
      source={markdownContent}
      components={MarkdownComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypePrism,
            rehypeSlug
          ],
        }
      }}
    />
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

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <TocSidebar headings={headings} />
            <main className="lg:col-span-9">
              <MobileTocDropdown headings={headings} />
              <Suspense fallback={<LoadingContent />}>
                <MarkdownContent markdownContent={markdownContent} />
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