import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { PenTool, Book, Code, CircleHelp, Users, Lightbulb, FileText, Zap, Image, Tag, Link as LinkIcon, Send, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const TableOfContents = () => {
    const { isDarkMode } = useTheme();
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id') || '';
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const tocItems = [
        { id: 'why-write', title: 'Why Write on DevBlogger?', icon: <Lightbulb size={16} /> },
        { id: 'getting-started', title: 'Getting Started', icon: <FileText size={16} /> },
        { id: 'audience', title: 'Understanding Your Audience', icon: <Users size={16} /> },
        { id: 'topics', title: 'Choosing the Right Topic', icon: <Zap size={16} /> },
        { id: 'creating-post', title: 'Creating Your Blog Post', icon: <PenTool size={16} /> },
        { id: 'best-practices', title: 'Writing Best Practices', icon: <Book size={16} /> },
        { id: 'code-snippets', title: 'Adding Code Snippets', icon: <Code size={16} /> },
        { id: 'images', title: 'Including Images', icon: <Image size={16} /> },
        { id: 'seo', title: 'SEO Optimization', icon: <Tag size={16} /> },
        { id: 'publishing', title: 'Publishing vs. Draft Mode', icon: <Send size={16} /> },
        { id: 'promotion', title: 'Promoting Your Content', icon: <LinkIcon size={16} /> },
        { id: 'community', title: 'Community Interaction', icon: <MessageSquare size={16} /> },
        { id: 'faq', title: 'Frequently Asked Questions', icon: <CircleHelp size={16} /> }
    ];

    return (
        <Card className={`sticky top-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
            <CardTitle className="p-4 border-b border-gray-200 dark:border-gray-700">
                Table of Contents
            </CardTitle>
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tocItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className={`flex items-center w-full p-3 text-left transition-colors ${activeSection === item.id
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-3 text-blue-500">{item.icon}</span>
                                <span className="text-sm">{item.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

// Feature card component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Card className={`h-full transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'
                }`}>
                <CardContent className="pt-6">
                    <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
                    <CardTitle className="text-xl font-semibold mb-2 text-center">{title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// SectionHeader component
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
    );
};

// CodeBlock component
const CodeBlock = ({ language, code }: { language: string, code: string }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className="my-6">
            <div className="flex items-center bg-gray-800 text-white p-2 rounded-t-lg">
                <code className="text-sm">{language}</code>
            </div>
            <pre className={`p-4 rounded-b-lg overflow-x-auto ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-800 text-gray-200'
                }`}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export { TableOfContents, FeatureCard, SectionHeader, CodeBlock };