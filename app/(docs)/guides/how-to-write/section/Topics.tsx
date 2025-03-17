import React from 'react'
import { Code, Book, Terminal, Coffee, Zap, Lightbulb, PenTool } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '../comp/useHelp'

const Topics = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div>
            <section id="topics" className="mb-16">
                <SectionHeader
                    title="Choosing the Right Topic"
                    subtitle="Find engaging subjects that showcase your expertise"
                />

                <p className="text-lg mb-6">
                    Struggling with topic ideas? Here are some proven approaches to finding subjects that resonate with the developer community:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                                <Code size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Share Personal Experiences</h3>
                        </div>
                        <ul className="space-y-2 pl-10 list-disc">
                            <li>Problems you've encountered and how you solved them</li>
                            <li>Lessons learned from real-world projects</li>
                            <li>Performance optimization strategies you've implemented</li>
                            <li>Tech stack decisions and their outcomes</li>
                        </ul>
                    </div>

                    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                                <Book size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Create Step-by-Step Tutorials</h3>
                        </div>
                        <ul className="space-y-2 pl-10 list-disc">
                            <li>Setting up development environments</li>
                            <li>Building specific components or features</li>
                            <li>Implementing best practices in real projects</li>
                            <li>Using new tools or frameworks</li>
                        </ul>
                    </div>

                    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                                <Terminal size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Technology Deep Dives</h3>
                        </div>
                        <ul className="space-y-2 pl-10 list-disc">
                            <li>Detailed explanations of how specific technologies work</li>
                            <li>Understanding core concepts of frameworks or libraries</li>
                            <li>Advanced usage patterns and techniques</li>
                            <li>Source code analyses of popular libraries</li>
                        </ul>
                    </div>

                    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                                <Coffee size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Comparison Articles</h3>
                        </div>
                        <ul className="space-y-2 pl-10 list-disc">
                            <li>Framework comparisons (e.g., "React vs. Vue")</li>
                            <li>Different approaches to solving the same problem</li>
                            <li>Tool evaluations for specific use cases</li>
                            <li>Performance benchmarks with analysis</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-xl font-semibold mb-4">Be Specific</h4>
                        <p className="mb-4">
                            Specific topics tend to perform better than general ones. Instead of broad subjects, focus on targeted, actionable content.
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center">
                                <span className="text-red-500 mr-2">❌</span>
                                <span className="text-gray-600 dark:text-gray-300">"JavaScript Tips"</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-600 dark:text-gray-300">"5 JavaScript Performance Optimization Techniques for Single Page Applications"</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-red-500 mr-2">❌</span>
                                <span className="text-gray-600 dark:text-gray-300">"React Tutorial"</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-600 dark:text-gray-300">"Building a Responsive Image Gallery with React Hooks and CSS Grid"</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                    <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-4">Trending Topics on DevBlogger</h4>
                        <p className="mb-4">
                            Consider writing about these currently popular topics in the developer community:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { name: 'React', icon: <Code size={14} /> },
                                { name: 'TypeScript', icon: <Terminal size={14} /> },
                                { name: 'Next.js', icon: <Code size={14} /> },
                                { name: 'Web Performance', icon: <Zap size={14} /> },
                                { name: 'GraphQL', icon: <Code size={14} /> },
                                { name: 'AI Tools', icon: <Lightbulb size={14} /> },
                                { name: 'DevOps', icon: <Terminal size={14} /> },
                                { name: 'Software Architecture', icon: <PenTool size={14} /> },
                                { name: 'WebAssembly', icon: <Terminal size={14} /> },
                                { name: 'Serverless', icon: <Terminal size={14} /> }
                            ].map((topic, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 flex items-center gap-1"
                                >
                                    {topic.icon}
                                    {topic.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Topics