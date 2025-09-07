'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import HeroSimple from '@/components/HeroSimple'
import AllSections from '@/components/AllSections'
import Navigation from '@/components/Navigation'

// Dynamically import Three.js scene for better performance  
const InteractiveSkillsGraph = dynamic(() => import('@/components/InteractiveSkillsGraph'), {
  ssr: false,
  loading: () => <div style={{ position: 'fixed', inset: 0, background: '#09090b', zIndex: -1 }} />
})

export default function Home() {
  return (
    <>
      <Navigation />
      
      {/* Interactive 3D Skills Visualization */}
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
        <InteractiveSkillsGraph />
      </Suspense>

      <main className="relative" style={{ paddingTop: '64px' }}>
        {/* Content Sections */}
        <HeroSimple />
        <AllSections />
      </main>
    </>
  )
}