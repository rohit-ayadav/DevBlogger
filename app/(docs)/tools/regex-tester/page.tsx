import React from 'react'
import RegexTester from './Component'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dev Blogger Regex Tester - Test, Debug and Validate Regular Expressions Online',
    alternates: {
        canonical: '/tools/regex-tester',
    },
    keywords: 'regex, regular expression, regex tester, javascript regex, regex debugger, regex validator, regex pattern, regex matching, web development tool',
    description: 'Test your regex patterns easily.',
    openGraph: {
        title: 'Regex Tester',
        description: 'Test your regex patterns easily.',
        url: '/tools/regex-tester',
        siteName: 'Regex Tester',
        images: [
            {
                url: '/ss/regex.jpg',
                width: 800,
                height: 600,
                alt: 'Regex Tester'
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Regex Tester',
        description: 'Test your regex patterns easily.',
        images: ['/ss/regex.jpg'],
        creator: '@rohit-ayadav'
    }
};

const REGEX = () => {
    return (<RegexTester />)
};

export default REGEX;