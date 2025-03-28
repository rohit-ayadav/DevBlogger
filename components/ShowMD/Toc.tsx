'use client';
import React, { useEffect, useState, useRef } from 'react';
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
    highlightColor?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
    headings,
    maxHeight = "calc(100vh - 200px)",
    className = "",
    showNumbers = true,
    useCustomBullets = false,
    highlightColor = "blue"
}) => {
    const [activeId, setActiveId] = useState<string>('');
    const tocRef = useRef<HTMLDivElement>(null);

    // Color mapping for different themes
    const colorMap: Record<string, { text: string, hover: string, bg: string }> = {
        blue: {
            text: 'text-blue-600 dark:text-blue-400',
            hover: 'hover:text-blue-600 dark:hover:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/20'
        },
        green: {
            text: 'text-green-600 dark:text-green-400',
            hover: 'hover:text-green-600 dark:hover:text-green-400',
            bg: 'bg-green-50 dark:bg-green-900/20'
        },
        purple: {
            text: 'text-purple-600 dark:text-purple-400',
            hover: 'hover:text-purple-600 dark:hover:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-900/20'
        }
    };

    const selectedColor = colorMap[highlightColor] || colorMap.blue;

    // Set up the Intersection Observer to track visible headings
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
        );

        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            if (heading.id) {
                observer.observe(heading);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Auto-scroll active item into view within TOC
    useEffect(() => {
        if (activeId && tocRef.current) {
            const activeElement = tocRef.current.querySelector(`a[href="#${activeId}"]`);
            if (activeElement) {
                // Scroll the active item into view smoothly
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }, [activeId]);

    // Generate section numbers (1.1, 1.2, etc.)
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

    // Get custom bullet styles based on heading level
    const getBulletStyle = (level: number) => {
        if (!useCustomBullets) return "";

        switch (level) {
            case 1: return "before:content-['•_'] before:font-bold";
            case 2: return "before:content-['◦_']";
            case 3: return "before:content-['▪_'] before:text-xs";
            default: return "before:content-['›_'] before:text-xs";
        }
    };

    const formattedHeadings = getHeadingItems();

    return (
        <nav
            className={`toc-nav ${className}`}
            aria-label="Table of contents"
        >
            <div
                ref={tocRef}
                className="overflow-y-auto hide-scrollbar"
                style={{
                    maxHeight,
                    scrollbarWidth: 'none',  // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                }}
            >
                <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          /* For custom minimal scrollbar, uncomment below */
          /*
          .minimal-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
          .minimal-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .minimal-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 20px;
          }
          */
        `}</style>

                <ul className="space-y-1 text-sm pr-1">
                    {formattedHeadings.map((heading: any) => (
                        <li
                            key={heading.slug}
                            className="transition-transform duration-200 ease-in-out hover:translate-x-1"
                            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem`, width: '100%' }}
                        >
                            <Link
                                href={`#${heading.slug}`}
                                className={`
                  block py-1.5 px-2 rounded-md 
                  ${getBulletStyle(heading.level)} 
                  ${selectedColor.hover} 
                  transition-all duration-200
                  ${activeId === heading.slug
                                        ? `${selectedColor.text} font-medium ${selectedColor.bg}`
                                        : 'text-gray-600 dark:text-gray-300'
                                    }
                `}
                                style={{ width: '100%' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.slug)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                <div className="flex items-baseline">
                                    {showNumbers && (
                                        <span className="inline-block w-10 flex-shrink-0 font-mono text-xs opacity-70">
                                            {heading.sectionNumber}.
                                        </span>
                                    )}
                                    <span className="line-clamp-2">{heading.text}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default TableOfContents;