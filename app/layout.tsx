import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mashrur Rahman — Senior Product Engineer & Technical Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mashrur Rahman | Senior Product Engineer & Technical Lead",
    description:
      "Senior product engineer building web platforms, browser-native products, and automation systems. Open to new roles.",
    images: ["/og-image.png"],
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
    <html lang="en-CA" className={`${inter.variable} ${mono.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <StructuredData />
      </head>
      <body
        className="bg-background text-foreground antialiased"
        style={{
          // Inline so the dark + branded backdrop is present in the raw HTML
          // before the linked CSS, fonts, or WebGL load — eliminates the
          // white-flash and background "pop" on first paint.
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(60% 50% at 85% 18%, rgba(249,115,22,0.10), rgba(249,115,22,0) 70%), radial-gradient(50% 40% at 10% 90%, rgba(249,115,22,0.05), rgba(249,115,22,0) 70%)",
          backgroundAttachment: "fixed",
          color: "#fafafa",
        }}
      >
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
