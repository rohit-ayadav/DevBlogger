// app/[id]/page.tsx
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import MarkdownPage from '@/components/ShowMD/MarkdownPage';

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const filePath = path.join(process.cwd(), 'content', `${id}.md`);
        await fs.access(filePath);

        const fileContent = await fs.readFile(filePath, 'utf8');
        const titleMatch = fileContent.match(/#\s*(.*)/);
        const title = titleMatch ? titleMatch[1] : 'Document';

        return {
            title,
            description: `Read the ${title} document - ${id}`,
        };
    } catch (error) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found',
        };
    }
}

// getStaticPaths
export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);
    const paths = files.map((file) => ({
        id: file.replace(/\.md$/, ''),
    }));

    return paths;
}

export default async function MDPage({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const filePath = path.join(process.cwd(), 'content', `${id}.md`);
        await fs.access(filePath);

        return <MarkdownPage filename={id} />;
    } catch (error) {
        notFound();
    }
}

/* 
1. open-source-guide
2. react-guide
3. react-interview-questions
4. sql-interview-questions
5. python-interview-questions
*/
