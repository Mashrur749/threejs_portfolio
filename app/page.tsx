'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroSimple from '@/components/HeroSimple'
import AllSections from '@/components/AllSections'
import Navigation from '@/components/Navigation'

// Dynamically import Three.js scene for better performance  
const TechIconsScene = dynamic(() => import('@/components/TechIconsScene'), {
  ssr: false,
  loading: () => <div style={{ position: 'fixed', inset: 0, background: '#09090b', zIndex: -1 }} />
})

export default function Home() {
  return (
    <>
      <Navigation />
      
      {/* Interactive 3D Tech Icons Visualization */}
      <Suspense fallback={
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: '#09090b',
          zIndex: -1 
        }} />
      }>
        <TechIconsScene />
      </Suspense>

      <main className="relative" style={{ paddingTop: '64px' }}>
        {/* Content Sections */}
        <HeroSimple />
        <AllSections />
      </main>
    </>
  )
}