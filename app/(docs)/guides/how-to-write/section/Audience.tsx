import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '../comp/useHelp'
import Image from 'next/image'

const Audience = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div>
            <section id="audience" className="mb-16">
                <SectionHeader
                    title="Understanding Your Audience"
                    subtitle="Tailor your content to the right experience level"
                />

                <p className="text-lg mb-6">
                    Before you start writing, it's crucial to understand who you're writing for. DevBlogger hosts content for developers at various experience levels:
                </p>

                <Image
                    src={'/content/know-your-audience.png'}
                    alt="Know your audience"
                    width={800}
                    height={300}
                    className='rounded-lg mb-6'
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-4 text-center">Beginner Developers</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Clear explanations with minimal jargon</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Step-by-step tutorials with examples</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Comparisons to familiar concepts</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Foundation-building content</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-4 text-center">Intermediate Developers</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Practical applications and best practices</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Content that bridges knowledge gaps</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Efficiency tips and comparisons</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Deeper dives into specific features</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-4 text-center">Advanced Developers</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>In-depth technical deep dives</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Architecture and design decisions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Performance optimization techniques</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Cutting-edge approaches</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <p className="text-lg mb-6">
                    Knowing your target audience will help you adjust your writing style, technical depth, and examples accordingly. Be clear about who your post is for, either explicitly (e.g., "This guide is for React beginners") or implicitly through your content's depth and assumptions.
                </p>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                    <h4 className="font-semibold mb-2">Remember:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        No matter who you're writing for, always strive for clarity. Even advanced topics can be explained clearly without "dumbing down" the content.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Audience