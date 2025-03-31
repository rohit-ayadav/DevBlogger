"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { PenTool, Users, Lightbulb, ThumbsUp } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { TableOfContents, FeatureCard, SectionHeader } from '@/app/(docs)/guides/how-to-write/comp/useHelp';
import GettingStarted from './section/GettingStarted';
import Audience from './section/Audience';
import Topics from './section/Topics';
import CreateWriteAndCode from './section/CreateWriteAndCode';
import ImageSEOandPromotion from './section/ImageSEOandPromotion';

const GuidePage = () => {
    const { isDarkMode } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <ToastContainer />

            {/* Hero Section */}
            <section className={`relative overflow-hidden py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-blue-600/10"
                            style={{
                                width: `${Math.random() * 300 + 100}px`,
                                height: `${Math.random() * 300 + 100}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: Math.random() * 10 + 10,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-600 to-indigo-600">
                            The Complete Guide to Writing Technical Blogs on DevBlogger
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                            Everything you need to know about creating impactful technical blogs that engage readers and showcase your expertise.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {['Technical Writing', 'SEO', 'Developer Blogs', 'Content Creation', 'Markdown'].map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Link href="/create">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    Start Writing Now
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Table of Contents - Desktop */}
                        <div className="hidden lg:block">
                            <TableOfContents />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Why Write on DevBlogger */}
                            <section id="why-write" className="mb-16">
                                <SectionHeader
                                    title="Why Write on DevBlogger?"
                                    subtitle="Discover the benefits of sharing your technical knowledge"
                                />

                                <Image
                                    src="/content/writing-guide.png"
                                    alt='Writing Guide'
                                    width={800}
                                    height={400}
                                    className="rounded-lg mb-8"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <FeatureCard
                                        icon={<PenTool size={40} />}
                                        title="Build Your Brand"
                                        description="Establish yourself as an expert in your technical domain"
                                    />
                                    <FeatureCard
                                        icon={<Users size={40} />}
                                        title="Grow Your Network"
                                        description="Connect with like-minded developers and potential collaborators"
                                    />
                                    <FeatureCard
                                        icon={<Lightbulb size={40} />}
                                        title="Solidify Knowledge"
                                        description="Teaching others reinforces your own understanding"
                                    />
                                </div>

                                <p className="text-lg mb-4">
                                    DevBlogger isn't just another blogging platform—it's a thriving community specifically designed for developers who want to share their knowledge, experiences, and insights.
                                </p>
                                <p className="text-lg mb-4">
                                    By consistently publishing quality content, you'll establish yourself as a thought leader in your field, potentially opening doors to speaking opportunities, job offers, and professional connections.
                                </p>
                                <p className="text-lg">
                                    Additionally, the exercise of explaining complex concepts in writing helps solidify your own understanding, making you a better developer in the process.
                                </p>
                            </section>

                            {/* Getting Started */}
                            <GettingStarted isDarkMode={isDarkMode} />

                            {/* Understanding Your Audience */}
                            <Audience isDarkMode={isDarkMode} />

                            {/* Choosing the Right Topic */}
                            <Topics isDarkMode={isDarkMode} />

                            {/* Creating, Writing, and Coding */}
                            <CreateWriteAndCode isDarkMode={isDarkMode} />

                            {/* Image, SEO, and Promotion */}
                            <ImageSEOandPromotion isDarkMode={isDarkMode} />

                            {/* Conclusion */}
                            <section id="conclusion" className="mb-16">
                                <SectionHeader
                                    title="Conclusion"
                                    subtitle="Your journey to becoming a successful DevBlogger"
                                />

                                <p className="text-lg mb-6">
                                    Writing technical blogs on DevBlogger is a rewarding experience that can help you grow as a developer and connect with the community. By following the tips and best practices outlined in this guide, you'll be well on your way to creating impactful content.
                                </p>

                                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                                        <ThumbsUp size={20} className="mr-2" /> Final Tip
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Keep writing, keep learning, and most importantly, have fun!
                                    </p>
                                </div>
                            </section>

                            {/* Community Interaction */}
                            <section id="community" className="mb-16">
                                <SectionHeader
                                    title="Community Interaction"
                                    subtitle="Engage with your readers and fellow bloggers"
                                />

                                <p className="text-lg mb-6">
                                    Engaging with your audience is crucial for building a loyal readership. Respond to comments, ask for feedback, and participate in discussions to foster a sense of community.
                                </p>

                                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                                        <ThumbsUp size={20} className="mr-2" /> Community Tip
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Consider hosting Q&A sessions or webinars to interact directly with your audience.
                                    </p>
                                </div>
                            </section>
                            {/* Frequently Asked Questions */}
                            <section id="faq" className="mb-16">
                                <SectionHeader
                                    title="Frequently Asked Questions"
                                    subtitle="Common queries about blogging on DevBlogger"
                                />

                                <p className="text-lg mb-6">
                                    Here are some common questions new bloggers have when starting on DevBlogger:
                                </p>

                                <ul className="list-disc list-inside space-y-4 mb-8">
                                    <li className="text-lg">
                                        <span className="font-medium">How do I get started?</span> - Check out our Getting Started section for a step-by-step guide.
                                    </li>
                                    <li className="text-lg">
                                        <span className="font-medium">What topics should I write about?</span> - Choose topics that you are passionate about and that resonate with your audience.
                                    </li>
                                    <li className="text-lg">
                                        <span className="font-medium">How can I promote my blog?</span> - Use social media, engage with the community, and consider SEO strategies.
                                    </li>
                                </ul>

                                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                                        <ThumbsUp size={20} className="mr-2" /> FAQ Tip
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Don't hesitate to reach out to the DevBlogger community for support and advice!
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};
export default GuidePage;