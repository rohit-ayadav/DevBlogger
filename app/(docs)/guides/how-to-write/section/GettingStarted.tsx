import React from 'react'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '../comp/useHelp'

const GettingStarted = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div>
            {/* Getting Started */}
            <section id="getting-started" className="mb-16">
                <SectionHeader
                    title="Getting Started"
                    subtitle="Your first steps to becoming a DevBlogger author"
                />

                <div className="mb-8">
                    <img
                        src="/ss/createpageinterface.jpg"
                        alt="DevBlogger Create Page Interface"
                        className="w-full rounded-lg shadow-lg mb-4"
                    />
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                        The DevBlogger create page interface
                    </p>
                </div>

                <p className="text-lg mb-4">
                    Starting your blogging journey on DevBlogger is simple. Navigate to <Link href="/create" className="text-blue-600 dark:text-blue-400 hover:underline">devblogger.in/create</Link> and follow these steps:
                </p>

                <ol className="list-decimal list-inside space-y-4 mb-8">
                    <li className="text-lg">
                        <span className="font-medium">Sign in or create an account</span> if you haven't already
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Click on "Start Writing"</span> to begin crafting your first blog post
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Choose your preferred writing mode</span> (Markdown, Rich Editor, or HTML)
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Fill in the required fields</span> including title, content, and tags
                    </li>
                </ol>
                < div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Lightbulb size={20} className="mr-2" /> Pro Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Before you start writing, browse through popular posts on DevBlogger to get a feel for the type of content that resonates with the community. Pay attention to structure, tone, and level of technical detail.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default GettingStarted