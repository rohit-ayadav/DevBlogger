type Heading = {
    text: string;
    level: number;
    slug: string;
};

export function extractHeadings(markdown: string): Heading[] {
    const headings: Heading[] = [];
    const lines = markdown.split('\n');

    let inCodeBlock = false;
    let codeBlockDelimiter = '';

    // Remove the comments from the markdown content
    const cleanedMarkdown = lines.map(line => {
        if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
            return '';
        }
        return line;
    }).join('\n');
    const cleanedLines = cleanedMarkdown.split('\n');

    // Iterate through each line of the markdown content to find headings
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('```')) {

            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockDelimiter = '```';
            } else if (codeBlockDelimiter === '```') {
                inCodeBlock = false;
            }
            continue;
        }

        if (!inCodeBlock && (line.startsWith('    ') || line.startsWith('\t'))) {
            continue;
        }

        if (inCodeBlock) continue;

        const atxMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (atxMatch) {
            const level = atxMatch[1].length;
            const text = atxMatch[2].trim();
            const slug = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

            headings.push({ text, level, slug });
            continue;
        }
        if (i < lines.length - 1) {
            const nextLine = lines[i + 1];
            if (nextLine.trim().match(/^=+$/)) {
                const text = line.trim();
                const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');

                headings.push({ text, level: 1, slug });
                i++;
                continue;
            }
            if (nextLine.trim().match(/^-+$/)) {
                const text = line.trim();
                const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');

                headings.push({ text, level: 2, slug });
                i++;
                continue;
            }
        }
    }

    return headings;
}