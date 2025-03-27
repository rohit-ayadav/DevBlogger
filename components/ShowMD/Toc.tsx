'use client';
import React from 'react';
import Link from 'next/link';

type Heading = {
    text: string;
    level: number;
    slug: string;
};

interface TableOfContentsProps {
    headings: Heading[];
    maxHeight?: string;
    className?: string;
    showNumbers?: boolean;
    useCustomBullets?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
    headings,
    maxHeight = "400px",
    className = "",
    showNumbers = true,
    useCustomBullets = false
}) => {
    const [activeId, setActiveId] = React.useState<string>('');

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const generateSectionNumbers = () => {
        const counters = [0, 0, 0, 0, 0, 0];
        const numberedHeadings = headings.map(heading => {
            // Reset lower level counters when a higher level heading is encountered
            for (let i = heading.level; i < counters.length; i++) {
                counters[i] = 0;
            }

            // Increment the counter for the current level
            counters[heading.level - 1]++;

            // Generate the section number (e.g., "1.2.3")
            const sectionNumber = counters
                .slice(0, heading.level)
                .filter(count => count > 0)
                .join('.');

            return {
                ...heading,
                sectionNumber
            };
        });

        return numberedHeadings;
    };

    const getHeadingItems = () => {
        if (showNumbers) {
            return generateSectionNumbers();
        }
        return headings;
    };

    const getBulletStyle = (level: number) => {
        if (!useCustomBullets) return "";

        switch (level) {
            case 1: return "before:content-['•_'] before:text-blue-600 before:font-bold";
            case 2: return "before:content-['◦_'] before:text-blue-500";
            case 3: return "before:content-['▪_'] before:text-blue-400 before:text-xs";
            case 4: return "before:content-['▫_'] before:text-blue-400 before:text-xs";
            default: return "before:content-['›_'] before:text-gray-400";
        }
    };

    const formattedHeadings = getHeadingItems();

    // If the heading of content user seeing, but not visible in the toc, then scroll to it
    // means the colored toc always visible.

    return (
        <nav
            className={`toc-nav ${className}`}
            aria-label="Table of contents"
        >
            <div
                className="overflow-y-auto"
                style={{
                    maxHeight,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                <ul className="space-y-1 text-sm pr-2">
                    {formattedHeadings.map((heading: any) => (
                        <li
                            key={heading.slug}
                            className={`transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded`}
                            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                        >
                            <Link
                                href={`#${heading.slug}`}
                                className={`block py-1 px-2 ${getBulletStyle(heading.level)} hover:text-blue-500 transition-colors ${activeId === heading.slug
                                    ? 'text-blue-600 font-medium'
                                    : 'text-gray-600 dark:text-gray-300'
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.slug)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                {showNumbers && (
                                    <span className="inline-block min-w-6 font-mono text-xs text-gray-500 dark:text-gray-400">
                                        {heading.sectionNumber}.
                                    </span>
                                )}
                                <span>{heading.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default TableOfContents;