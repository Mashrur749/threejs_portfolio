import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mashrur.dev'),
  title: {
    default: 'Mashrur Rahman | Senior Next.js Developer',
    template: '%s | Mashrur Rahman'
  },
  description: 'Senior Full-Stack Developer specializing in Next.js, React, and high-performance web applications. Ex-Meta, currently architecting enterprise solutions at Critical Mass.',
  keywords: [
    'Next.js Developer',
    'React Developer',
    'Full Stack Developer',
    'TypeScript',
    'Three.js',
    'Web Performance',
    'Toronto Developer'
  ],
  authors: [{ name: 'Mashrur Rahman' }],
  creator: 'Mashrur Rahman',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mashrur.dev',
    title: 'Mashrur Rahman | Senior Next.js Developer',
    description: 'Senior Full-Stack Developer with 5+ years building scalable web applications',
    siteName: 'Mashrur Rahman Portfolio',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}