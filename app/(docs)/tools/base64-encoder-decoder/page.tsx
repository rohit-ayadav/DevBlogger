import React from 'react'
import Base64EncoderDecoder from './Component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dev Blogger Base64 Encoder Decoder - Encode and Decode Base64 Strings Online',
  alternates: {
    canonical: '/tools/base64-encoder-decoder',
  },
  keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, online tool, web development tool',
  description: 'Encode and decode Base64 strings easily.',
  openGraph: {
    title: 'Base64 Encoder Decoder',
    description: 'Encode and decode Base64 strings easily.',
    url: '/tools/base64-encoder-decoder',
    siteName: 'Base64 Encoder Decoder',
    images: [
      {
        url: '/ss/base64.jpg',
        width: 800,
        height: 600,
        alt: 'Base64 Encoder Decoder'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder Decoder',
    description: 'Encode and decode Base64 strings easily.',
    images: ['/ss/base64.jpg'],
    creator: '@rohit-ayadav'
  }
};

const page = () => {
  return (<Base64EncoderDecoder />)
}

export default page
