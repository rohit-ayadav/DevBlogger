import React from 'react'
import SQLFormatter from './Component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dev Blogger SQL Formatter - Format and Beautify SQL Queries Online',
  alternates: {
    canonical: '/tools/sql-formatter',
  },
  keywords: 'sql formatter, sql beautifier, sql query formatter, sql code formatter, sql syntax highlighter, sql online tool',
  description: 'Format and beautify your SQL queries easily.',
  openGraph: {
    title: 'SQL Formatter',
    description: 'Format and beautify your SQL queries easily.',
    url: '/tools/sql-formatter',
    siteName: 'SQL Formatter',
    images: [
      {
        url: '/ss/sql.jpg',
        width: 800,
        height: 600,
        alt: 'SQL Formatter'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Formatter',
    description: 'Format and beautify your SQL queries easily.',
    images: ['/ss/sql.jpg'],
    creator: '@rohit-ayadav'
  }
};

const SQL = () => {
  return (<SQLFormatter />)
}
export default SQL
