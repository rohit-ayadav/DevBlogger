import React from 'react'
import { CodeBlock, SectionHeader } from '../comp/useHelp'
import { Star } from 'lucide-react'


const CreateWriteAndCode = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div>
            {/* Creating Your Blog Post */}
            <section id="creating-post" className="mb-16">
                <SectionHeader
                    title="Creating Your Blog Post"
                    subtitle="A step-by-step guide to the DevBlogger writing process"
                />

                <div className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6">Title Creation</h3>

                    <div className="mb-6">
                        <img
                            src="/ss/titlecreationinterface.jpg"
                            alt="DevBlogger Title Creation Interface"
                            className="w-full rounded-lg shadow-lg mb-4"
                        />
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            DevBlogger's title input with AI suggestion feature
                        </p>
                    </div>

                    <p className="text-lg mb-4">
                        Your title is the first impression readers will have of your content. DevBlogger allows titles up to 250 characters, but concise titles (60-100 characters) typically perform better for readability and SEO.
                    </p>

                    <p className="text-lg mb-6">
                        If you're struggling to create an effective title, use DevBlogger's AI-powered title generator, which can suggest SEO-friendly options based on your content.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                            <h4 className="font-semibold mb-2">Good Title Example</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                "10 Essential JavaScript Tips for Beginners"
                            </p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                            <h4 className="font-semibold mb-2">Bad Title Example</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                "JavaScript Tips"
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6">Content Creation</h3>

                    <p className="text-lg mb-4">
                        DevBlogger supports three writing modes: Markdown, Rich Editor, and HTML. Choose the one that best fits your workflow.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                            <h4 className="font-semibold mb-2">Markdown Mode</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Ideal for developers comfortable with Markdown syntax. Offers live preview and syntax highlighting.
                            </p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow`}>
                            <h4 className="font-semibold mb-2">Rich Editor Mode</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                A WYSIWYG editor for those who prefer a more visual approach. No coding required!
                            </p>
                        </div>
                    </div>

                    <p className="text-lg mb-6">
                        Regardless of the mode you choose, focus on creating clear, engaging content that provides value to your readers.
                    </p>

                    <CodeBlock
                        language="markdown"
                        code={`# My First Blog Post\n\n## Introduction\nThis is a sample blog post written in Markdown.`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of a Markdown code block
                    </p>
                    <CodeBlock
                        language="html"
                        code={`<h1>My First Blog Post</h1>\n<p>This is a sample blog post written in HTML.</p>`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of an HTML code block
                    </p>
                    <CodeBlock
                        language="javascript"
                        code={`console.log('Hello, DevBlogger!');`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of a JavaScript code block
                    </p>
                    <CodeBlock
                        language="python"
                        code={`print('Hello, DevBlogger!')`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of a Python code block
                    </p>
                    <CodeBlock
                        language="java"
                        code={`System.out.println("Hello, DevBlogger!");`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of a Java code block
                    </p>
                    <CodeBlock
                        language="csharp"
                        code={`Console.WriteLine("Hello, DevBlogger!");`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example of a C# code block
                    </p>
                </div>
            </section>
            {/* Writing Best Practices */}
            <section id="best-practices" className="mb-16">
                <SectionHeader
                    title="Writing Best Practices"
                    subtitle="Tips for creating high-quality, engaging content"
                />

                <p className="text-lg mb-6">
                    Here are some best practices to keep in mind while writing your blog post:
                </p>

                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li className="text-lg">
                        <span className="font-medium">Be Clear and Concise</span> - Avoid jargon and complex sentences. Aim for clarity.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Use Headings and Subheadings</span> - Break your content into sections for better readability.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Add Visuals</span> - Use images, diagrams, or videos to illustrate complex concepts.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Proofread and Edit</span> - Always proofread your content before publishing to catch any errors.
                    </li>
                </ul>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Star size={20} className="mr-2" /> Writing Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Use tools like Grammarly or Hemingway Editor to help with grammar and readability.
                    </p>
                </div>
            </section>
            {/* Adding Code Snippets */}
            <section id="code-snippets" className="mb-16">
                <SectionHeader
                    title="Adding Code Snippets"
                    subtitle="Showcase your code effectively"
                />

                <p className="text-lg mb-6">
                    Code snippets are essential for technical blogs. DevBlogger allows you to add code blocks easily in all writing modes.
                </p>

                <CodeBlock
                    language="javascript"
                    code={`function greet() {\n  console.log('Hello, DevBlogger!');\n}`}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Example of a JavaScript function code block
                </p>
                <CodeBlock
                    language="python"
                    code={`def greet():\n  print('Hello, DevBlogger!')`}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Example of a Python function code block
                </p>


            </section>
        </div>
    )
}

export default CreateWriteAndCode
