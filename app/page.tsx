'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import Achievements from '@/components/Achievements'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

// Dynamically import Three.js scene for better performance
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-dark" />
})

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        {/* Three.js Background */}
        <div className="fixed inset-0 -z-10">
          <Suspense fallback={<div className="w-full h-full bg-dark" />}>
            <ThreeScene />
          </Suspense>
        </div>

        {/* Content Sections */}
        <Hero />
        <Achievements />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  )
}