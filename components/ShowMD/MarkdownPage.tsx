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
import LoadingEffect from '@/lib/LoadingEffect';
import { ErrorMessage } from '@/lib/ErrorMessage';

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
              <Suspense fallback={<LoadingEffect />}>
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