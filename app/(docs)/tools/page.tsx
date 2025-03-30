import React from 'react'
import ToolsCollection from './Component'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Developer Tools | Free Online Web Development Tools | DevBlogger',
    description: 'Collection of free online tools for web developers and content creators. Includes regex tester, base64 encoder/decoder, markdown converter, and more.',
    keywords: 'developer tools, web tools, online tools, regex tester, base64 encoder, markdown converter, content tools',
    openGraph: {
        title: 'Developer Tools | DevBlogger',
        description: 'Collection of free online tools for web developers and content creators.',
        type: 'website',
        url: 'https://devblogger.in/tools',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Developer Tools | DevBlogger',
        description: 'Collection of free online tools for web developers and content creators.',
    },
    alternates: {
        canonical: 'https://devblogger.in/tools',
    },
}

const Tools = () => {
    return (
        <div>
            <ToolsCollection />
        </div>
    )
}

export default Tools;