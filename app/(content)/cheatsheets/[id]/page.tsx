// app/[id]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import MarkdownPage from '@/components/ShowMD/MarkdownPage';
import { incrementView } from '@/lib/viewIncrement';

// Metadata
// export async function generateMetadata({ params }: { params: { id: string } }) {
//     const { id } = params;

//     try {
//         const filePath = path.join(process.cwd(), 'content/cheatsheets', `${id}.md`);
//         await fs.access(filePath);

//         const fileContent = await fs.readFile(filePath, 'utf8');
//         const titleMatch = fileContent.match(/#\s*(.*)/);
//         const title = titleMatch ? titleMatch[1] : 'Document';
//         // thumbnail in public folder
//         const thumbnailPath = path.join(process.cwd(), 'public/content', `${id}.png`);
//         const thumbnailExists = await fs.access(thumbnailPath).then(() => true).catch(() => false);
//         const thumbnailUrl = thumbnailExists ? `https://www.devblogger.in/content/${id}.png` : 'https://www.devblogger.in/default-thumbnail.png';
//         return {
//             title,
//             description: `Read the ${title} document - ${id}`,
//             openGraph: {
//                 title,
//                 description: `Read the ${title} document - ${id}`,
//                 images: [thumbnailUrl],
//             },
//             twitter: {
//                 title,
//                 description: `Read the ${title} document - ${id}`,
//                 images: [thumbnailUrl],
//             },
//             icons: {
//                 icon: '/favicon.ico',
//                 shortcut: '/favicon.ico',
//                 apple: '/favicon.ico',
//             },
//         };
//     } catch (error) {
//         return {
//             title: 'Page Not Found',
//             description: 'The requested page could not be found',
//         };
//     }
// }

export default async function MDPage({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const filePath = path.join(process.cwd(), 'content/cheatsheets', `${id}.md`);
        await fs.access(filePath);
        await incrementView(id, false, true);
        return (
            <MarkdownPage filename={`${id}.md`} directory='content/cheatsheets' />
        );
    } catch (error) {
        return (
            <h1 className='text-2xl font-bold text-center mt-4 mb-8'>
                <span className='text-gray-800 dark:text-gray-200'>Cheat Sheet</span>
                <span className='text-indigo-600 dark:text-indigo-400'> - {id}</span>
                <span className='text-red-600 dark:text-red-400'> - Not Found</span>
            </h1>
        )
        // notFound();
    }
}
