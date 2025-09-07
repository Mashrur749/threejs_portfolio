'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

// Dynamic imports for performance
const ThreeSceneEnhanced = dynamic(() => import('./ThreeSceneEnhanced'), { ssr: false })
const PerformanceVisualization = dynamic(() => 
  import('./three-scenes/PerformanceVisualization').then(mod => ({ default: mod.PerformanceVisualization })), 
  { ssr: false }
)
const CodeDNAHelix = dynamic(() => 
  import('./three-scenes/CodeDNAHelix').then(mod => ({ default: mod.CodeDNAHelix })), 
  { ssr: false }
)
const InteractiveDataFlow = dynamic(() => 
  import('./three-scenes/InteractiveDataFlow').then(mod => ({ default: mod.InteractiveDataFlow })), 
  { ssr: false }
)
const BuildingBlocks = dynamic(() => 
  import('./three-scenes/BuildingBlocks').then(mod => ({ default: mod.BuildingBlocks })), 
  { ssr: false }
)
const MorphingParticles = dynamic(() => 
  import('./three-scenes/MorphingParticles').then(mod => ({ default: mod.MorphingParticles })), 
  { ssr: false }
)

type SceneType = 'particles' | 'morphing' | 'performance' | 'dna' | 'dataflow' | 'blocks'

interface SceneOption {
  id: SceneType
  name: string
  description: string
  icon: string
}

const scenes: SceneOption[] = [
  { id: 'particles', name: 'Particles', description: 'Interactive particle system', icon: '✨' },
  { id: 'morphing', name: 'Morphing', description: 'Shape-shifting particles', icon: '🔮' },
  { id: 'performance', name: 'Metrics', description: 'Performance visualization', icon: '📊' },
  { id: 'dna', name: 'DNA', description: 'Code structure helix', icon: '🧬' },
  { id: 'dataflow', name: 'Network', description: 'Data flow architecture', icon: '🌐' },
  { id: 'blocks', name: 'Stack', description: 'Tech stack blocks', icon: '🏗️' },
]

function SceneContent({ scene, scrollProgress }: { scene: SceneType; scrollProgress: number }) {
  switch (scene) {
    case 'morphing':
      return <MorphingParticles scrollProgress={scrollProgress} />
    case 'performance':
      return <PerformanceVisualization scrollProgress={scrollProgress} />
    case 'dna':
      return <CodeDNAHelix />
    case 'dataflow':
      return <InteractiveDataFlow />
    case 'blocks':
      return <BuildingBlocks />
    case 'particles':
    default:
      return <ThreeSceneEnhanced />
  }
}

function AdaptiveLighting({ scene }: { scene: SceneType }) {
  const lightColors = {
    particles: { ambient: 0.3, point1: '#f97316', point2: '#00dfd8' },
    morphing: { ambient: 0.25, point1: '#f97316', point2: '#fb923c' },
    performance: { ambient: 0.4, point1: '#f97316', point2: '#ffffff' },
    dna: { ambient: 0.2, point1: '#f97316', point2: '#00dfd8' },
    dataflow: { ambient: 0.3, point1: '#f97316', point2: '#a855f7' },
    blocks: { ambient: 0.4, point1: '#f97316', point2: '#00dfd8' },
  }
  
  const config = lightColors[scene]
  
  return (
    <>
      <ambientLight intensity={config.ambient} />
      <pointLight position={[10, 10, 10]} intensity={1} color={config.point1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={config.point2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} castShadow />
    </>
  )
}

export default function ThreeBackground() {
  const [currentScene, setCurrentScene] = useState<SceneType>('particles')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Handle scroll-based scene switching
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollY / maxScroll
      setScrollProgress(progress)
      
      // Get current section based on scroll
      const sections = document.querySelectorAll('section')
      let currentSectionId = ''
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionId = section.id
        }
      })
      
      // Map sections to scenes
      const sectionSceneMap: Record<string, SceneType> = {
        'hero': 'particles',
        'achievements': 'performance',
        'experience': 'dna',
        'projects': 'dataflow',
        'tech': 'blocks',
        'contact': 'particles'
      }
      
      // Auto-switch based on section (can be toggled)
      const autoSwitch = false // Set to true to enable auto-switching
      if (autoSwitch && sectionSceneMap[currentSectionId]) {
        setCurrentScene(sectionSceneMap[currentSectionId])
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key) - 1
        setCurrentScene(scenes[index].id)
      } else if (e.key === 'c') {
        setShowControls(prev => !prev)
      } else if (e.key === 'r') {
        setAutoRotate(prev => !prev)
      }
    }
    
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])
  
  return (
    <>
      {/* Canvas Container */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <Suspense fallback={null}>
            <AdaptiveLighting scene={currentScene} />
            <SceneContent scene={currentScene} scrollProgress={scrollProgress} />
            
            {/* Optional orbit controls */}
            {showControls && (
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
              />
            )}
            
            {/* Fog for depth */}
            <fog attach="fog" args={['#000000', 5, 30]} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scene Switcher UI */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-effect rounded-full px-4 py-2 flex items-center gap-2">
          {scenes.map((sceneOption) => (
            <button
              key={sceneOption.id}
              onClick={() => setCurrentScene(sceneOption.id)}
              className={`
                px-3 py-2 rounded-full transition-all duration-300
                ${currentScene === sceneOption.id 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-zinc-800/70 text-zinc-300'
                }
              `}
              title={sceneOption.description}
            >
              <span className="text-lg">{sceneOption.icon}</span>
              <span className="ml-2 text-sm font-medium hidden sm:inline">
                {sceneOption.name}
              </span>
            </button>
          ))}
        </div>
        
        {/* Controls hint */}
        <div className="text-center mt-2 text-xs text-zinc-500">
          Press 1-5 to switch • C for controls • R to toggle rotation
        </div>
      </div>
    </>
  )
}