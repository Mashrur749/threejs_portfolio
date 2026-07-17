import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";
import { PostHogProvider } from "@/components/posthogProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://findmashur.dev"),
  title: {
    default:
      "Mashrur Rahman | Senior Product Engineer & Technical Lead",
    template: "%s | Mashrur Rahman",
  },
  description:
    "Mashrur Rahman is a senior product engineer and technical lead in Calgary, Alberta building reliable web platforms, browser-native products, and automation systems that remove operational bottlenecks. Next.js, React, TypeScript, Three.js. Open to new roles, remote-friendly.",
  keywords: [
    "Next.js Developer Calgary",
    "React Developer Calgary",
    "Full Stack Developer Calgary",
    "Calgary Software Engineer",
    "Alberta Web Developer",
    "Remote Next.js Developer",
    "Toronto Remote Developer",
    "Senior Developer Calgary",
    "TypeScript Developer Calgary",
    "Three.js Developer",
    "Remote Full Stack Developer Canada",
    "Critical Mass Developer",
  ],
  authors: [{ name: "Mashrur Rahman" }],
  creator: "Mashrur Rahman",
  alternates: {
    canonical: "https://findmashur.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://findmashur.dev",
    title: "Mashrur Rahman | Senior Product Engineer, Calgary",
    description:
      "Senior product engineer & technical lead building web platforms, browser-native products, and automation systems. Open to new roles, remote-friendly.",
    siteName: "Mashrur Rahman — Portfolio",
    images: [
      {
        url: "/images/headshot.jpg",
        width: 1200,
        height: 630,
        alt: "Mashrur Rahman — Senior Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mashrur Rahman | Senior Product Engineer & Technical Lead",
    description:
      "Senior product engineer building web platforms, browser-native products, and automation systems. Open to new roles.",
    images: ["/images/headshot.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <StructuredData />
      </head>
      <body className="bg-background text-foreground antialiased">
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
