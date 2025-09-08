import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mashrur.dev'),
  title: {
    default: 'Mashrur Rahman | Senior Next.js Developer Calgary | Full-Stack Engineer',
    template: '%s | Mashrur Rahman - Calgary Developer'
  },
  description: 'Senior Full-Stack Developer in Calgary, Alberta specializing in Next.js, React, TypeScript. Available for remote positions. Ex-Meta engineer, currently at Critical Mass. Serving Calgary, Toronto & remote teams.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  keywords: [
    'Next.js Developer Calgary',
    'React Developer Calgary',
    'Full Stack Developer Calgary',
    'Calgary Software Engineer',
    'Alberta Web Developer',
    'Remote Next.js Developer',
    'Toronto Remote Developer',
    'Senior Developer Calgary',
    'TypeScript Developer Calgary',
    'React Calgary',
    'JavaScript Developer Alberta',
    'Web Developer Calgary',
    'Software Engineer Alberta',
    'Remote Full Stack Developer Canada',
    'Critical Mass Developer'
  ],
  authors: [{ name: 'Mashrur Rahman' }],
  creator: 'Mashrur Rahman',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://mashrur.dev',
    title: 'Mashrur Rahman | Senior Next.js Developer Calgary, Alberta',
    description: 'Senior Full-Stack Developer in Calgary specializing in Next.js, React, TypeScript. Available for remote work. 5+ years experience, ex-Meta, Critical Mass.',
    siteName: 'Mashrur Rahman - Calgary Developer Portfolio',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Mashrur Rahman - Senior Next.js Developer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mashrur Rahman | Senior Next.js Developer',
    description: 'Senior Full-Stack Developer specializing in Next.js and React',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
    },
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA" className={`${inter.variable} dark`}>
      <head>
        <StructuredData />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}