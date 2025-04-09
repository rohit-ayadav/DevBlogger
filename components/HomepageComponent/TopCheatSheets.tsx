import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeSquare, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const TopCheatsheetsSection = () => {
    const { isDarkMode } = useTheme();

    // Top 3 cheatsheets with icons matching your existing style
    const topCheatsheets = [
        {
            icon: <CodeSquare size={48} />,
            title: "Python Cheatsheet",
            description: "Quick reference for Python syntax, built-in functions, and common libraries for faster development.",
            action: "View Cheatsheet",
            link: "/cheatsheets/python"
        },
        {
            icon: <CodeSquare size={48} />,
            title: "JavaScript Cheatsheet",
            description: "Essential JavaScript concepts, ES6+ features, and DOM manipulation techniques in one place.",
            action: "View Cheatsheet",
            link: "/cheatsheets/javascript"
        },
        {
            icon: <BookOpen size={48} />,
            title: "Git Commands",
            description: "Master version control with this comprehensive guide to essential Git commands and workflows.",
            action: "View Cheatsheet",
            link: "/cheatsheets/git"
        }
    ];

    return (
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Popular Cheatsheets</h2>
                    <Link href="/cheatsheets">
                        <Button variant="link" className="p-0">
                            View all cheatsheets <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topCheatsheets.map((sheet, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className={`h-full flex flex-col justify-between transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`}>
                                <CardContent className="pt-6">
                                    <div className="text-blue-600 mb-4 flex justify-center">{sheet.icon}</div>
                                    <CardTitle className="text-2xl font-semibold mb-2 text-center">{sheet.title}</CardTitle>
                                    <p className="mb-4 text-center text-gray-600 dark:text-gray-300">{sheet.description}</p>
                                </CardContent>
                                <CardContent className="pt-0">
                                    <Link href={sheet.link}>
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                            {sheet.action} <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/cheatsheets">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            Explore All Cheatsheets <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopCheatsheetsSection;