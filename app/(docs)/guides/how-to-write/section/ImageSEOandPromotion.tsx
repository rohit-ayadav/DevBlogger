import React from 'react'
import { SectionHeader } from '../comp/useHelp'
import { Edit, Image, Megaphone, Search } from 'lucide-react'

const ImageSEOandPromotion = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div>
            {/* Including Images */}
            <section id="images" className="mb-16">
                <SectionHeader
                    title="Including Images"
                    subtitle="Enhance your content with visuals"
                />

                <p className="text-lg mb-6">
                    Images can significantly enhance your blog post. Use them to illustrate concepts, provide examples, or break up text.
                </p>

                <div className="mb-8">
                    <img
                        src="/api/placeholder/800/400"
                        alt="Example Image"
                        className="w-full rounded-lg shadow-lg mb-4"
                    />
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                        Example of an image in a blog post
                    </p>
                </div>

                <p className="text-lg mb-6">
                    Ensure that images are relevant and add value to your content. Use alt text for accessibility and SEO.
                </p>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Image size={20} className="mr-2" /> Image Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Use tools like Unsplash or Pexels for high-quality, royalty-free images.
                    </p>
                </div>
            </section>
            {/* SEO Optimization */}
            <section id="seo" className="mb-16">
                <SectionHeader
                    title="SEO Optimization"
                    subtitle="Make your content discoverable"
                />

                <p className="text-lg mb-6">
                    Search Engine Optimization (SEO) is crucial for increasing the visibility of your blog post. Here are some tips:
                </p>

                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li className="text-lg">
                        <span className="font-medium">Use Relevant Keywords</span> - Research and include keywords that your target audience is searching for.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Optimize Meta Tags</span> - Write compelling meta titles and descriptions to improve click-through rates.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Use Internal and External Links</span> - Link to relevant internal posts and authoritative external sources.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Optimize Images</span> - Use descriptive file names and alt text for images.
                    </li>
                </ul>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Search size={20} className="mr-2" /> SEO Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Use tools like Yoast SEO or Moz to analyze and improve your SEO strategy.
                    </p>
                </div>
            </section>
            {/* Publishing vs. Draft Mode */}
            <section id="publishing" className="mb-16">
                <SectionHeader
                    title="Publishing vs. Draft Mode"
                    subtitle="Manage your content effectively"
                />

                <p className="text-lg mb-6">
                    DevBlogger allows you to save your posts as drafts or publish them immediately. Use draft mode to refine your content before going live.
                </p>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Edit size={20} className="mr-2" /> Publishing Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Consider scheduling your posts for optimal engagement times.
                    </p>
                </div>
            </section>
            {/* Promoting Your Content */}
            <section id="promotion" className="mb-16">
                <SectionHeader
                    title="Promoting Your Content"
                    subtitle="Get your blog post in front of the right audience"
                />

                <p className="text-lg mb-6">
                    Once you've published your blog post, it's time to promote it. Here are some effective strategies:
                </p>

                <ul className="list-disc list-inside space-y-4 mb-8">
                    <li className="text-lg">
                        <span className="font-medium">Share on Social Media</span> - Use platforms like Twitter, LinkedIn, and Facebook to reach a wider audience.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Engage with the Community</span> - Participate in relevant forums and communities to share your content.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Email Newsletters</span> - Send your blog post to your email subscribers.
                    </li>
                    <li className="text-lg">
                        <span className="font-medium">Collaborate with Other Bloggers</span> - Guest post or cross-promote with other authors.
                    </li>
                </ul>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-2">
                        <Megaphone size={20} className="mr-2" /> Promotion Tip
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Use tools like Buffer or Hootsuite to schedule and manage your social media promotions.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default ImageSEOandPromotion
