import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const BASE_URL = "https://www.devblogger.in";

export async function GET() {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);
    const paths = files.map((file) => ({
        id: file.replace(/\.md$/, ''),
    }));


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${paths.map(post => `
            <url>
                <loc>${BASE_URL}/${JSON.stringify(post.id).replace(/"/g, '')}</loc> 
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.9</priority>
            </url>
        `).join('')}
    </urlset>`;

    return new NextResponse(sitemap, {
        status: 200,
        headers: { "Content-Type": "application/xml" },
    });
}