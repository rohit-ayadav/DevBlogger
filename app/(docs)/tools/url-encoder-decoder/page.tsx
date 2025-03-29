import React from 'react'
import URLEncoderDecoder from './Component'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dev Blogger URL Encoder Decoder - Encode and Decode URLs Online',
  alternates: {
    canonical: '/tools/url-encoder-decoder',
  },
  keywords: 'url encoder, url decoder, encode url, decode url, online tool, web development tool',
  description: 'Encode and decode URLs easily.',
  openGraph: {
    title: 'URL Encoder Decoder',
    description: 'Encode and decode URLs easily.',
    url: '/tools/url-encoder-decoder',
    siteName: 'URL Encoder Decoder',
    images: [
      {
        url: '/ss/url.jpg',
        width: 800,
        height: 600,
        alt: 'URL Encoder Decoder'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder Decoder',
    description: 'Encode and decode URLs easily.',
    images: ['/ss/url.jpg'],
    creator: '@rohit-ayadav'
  }
};
const page = () => {
  return (<URLEncoderDecoder />)
}

export default page
