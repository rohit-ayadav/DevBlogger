type Heading = {
    text: string;
    level: number;
    slug: string;
};

export function extractHeadings(markdown: string): Heading[] {
    const headings: Heading[] = [];
    const lines = markdown.split('\n');

    let inCodeBlock = false;
    let inComment = false;

    // Iterate through each line of the markdown content to find headings
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Handle code blocks
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }

        // Skip if in code block
        if (inCodeBlock) continue;

        // Handle HTML comments
        if (line.startsWith('<!--')) {
            inComment = true;
        }
        if (line.endsWith('-->')) {
            inComment = false;
            continue;
        }
        if (inComment) continue;

        // Skip indented code blocks (4 spaces or tab)
        if (lines[i].startsWith('    ') || lines[i].startsWith('\t')) continue;

        // ATX headings (# Heading)
        const atxMatch = line.match(/^(#{1,6})\s+(.+?)(?:\s+#+\s*)?$/);
        if (atxMatch) {
            const level = atxMatch[1].length;
            const text = atxMatch[2].trim();
            const slug = createSlug(text);

            headings.push({ text, level, slug });
            continue;
        }

        // Setext headings (Heading\n====== or Heading\n------)
        if (i < lines.length - 1) {
            const nextLine = lines[i + 1].trim();

            if (line && nextLine.match(/^=+$/) && !inCodeBlock) {
                headings.push({
                    text: line,
                    level: 1,
                    slug: createSlug(line)
                });
                i++; // Skip the underline
                continue;
            }

            if (line && nextLine.match(/^-+$/) && !inCodeBlock) {
                headings.push({
                    text: line,
                    level: 2,
                    slug: createSlug(line)
                });
                i++; // Skip the underline
                continue;
            }
        }
    }

    return headings;
}

// Helper function to create consistent slugs
function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
        .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
}