// app/[id]/page.tsx
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import MarkdownPage from '@/components/ShowMD/MarkdownPage';
import { incrementView } from '@/lib/viewIncrement';

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const filePath = path.join(process.cwd(), 'content', `${id}.md`);
        await fs.access(filePath);

        const fileContent = await fs.readFile(filePath, 'utf8');
        const titleMatch = fileContent.match(/#\s*(.*)/);
        const title = titleMatch ? titleMatch[1] : 'Document';
        // thumbnail in public folder
        const thumbnailPath = path.join(process.cwd(), 'public/content', `${id}.png`);
        const thumbnailExists = await fs.access(thumbnailPath).then(() => true).catch(() => false);
        const thumbnailUrl = thumbnailExists ? `https://www.devblogger.in/content/${id}.png` : 'https://www.devblogger.in/default-thumbnail.png';
        return {
            title,
            description: `Read the ${title} document - ${id}`,
            openGraph: {
                title,
                description: `Read the ${title} document - ${id}`,
                images: [thumbnailUrl],
            },
            twitter: {
                title,
                description: `Read the ${title} document - ${id}`,
                images: [thumbnailUrl],
            },
            icons: {
                icon: '/favicon.ico',
                shortcut: '/favicon.ico',
                apple: '/favicon.ico',
            },
        };
    } catch (error) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found',
        };
    }
}

// getStaticPaths
// export async function generateStaticParams() {
//     const contentDir = path.join(process.cwd(), 'content');
//     const files = await fs.readdir(contentDir);
//     const paths = files.map((file) => ({
//         id: file.replace(/\.md$/, ''),
//     }));

//     return paths;
// }

export default async function MDPage({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const filePath = path.join(process.cwd(), 'content', `${id}.md`);
        await fs.access(filePath);
        await incrementView(id, false, true); // Increment view count in local storage
        return <MarkdownPage filename={`${id}.md`} />;
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
