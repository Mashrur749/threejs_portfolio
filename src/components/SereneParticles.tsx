'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Minimalist, serene color palette - subtle variations
const sectionColors = [
  { primary: 0xf97316, secondary: 0xfed7aa, name: 'Hero' }, // Orange to light orange
  { primary: 0xfb923c, secondary: 0xfed7aa, name: 'Achievements' }, // Soft orange
  { primary: 0xf97316, secondary: 0xfbbf24, name: 'Experience' }, // Orange to amber
  { primary: 0xfb923c, secondary: 0xfde68a, name: 'Projects' }, // Soft transitions
  { primary: 0xf59e0b, secondary: 0xfed7aa, name: 'Tech Stack' }, // Amber
  { primary: 0xf97316, secondary: 0xfed7aa, name: 'Contact' }, // Back to orange
]

export default function SereneParticles() {
  const mountRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const scrollY = useRef(0)
  const currentScrollY = useRef(0)
  const currentSection = useRef(0)
  const targetColor = useRef(0xf97316)
  const currentColor = useRef(0xf97316)
  
  const [activeSection, setActiveSection] = useState(0)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    
    // Create minimalist particle system
    const particleCount = 100 // Fewer particles for minimalism
    const positions = new Float32Array(particleCount * 3)
    const originalY = new Float32Array(particleCount)
    
    // Initialize particles in a gentle spread
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Gentle distribution
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      originalY[i] = positions[i3 + 1]
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 1,
      transparent: true,
      opacity: 0.3, // Lower opacity for subtlety
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })
    
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particlesRef.current)
    
    // Scroll handler with gentle section detection
    const handleScroll = () => {
      scrollY.current = window.scrollY
      const windowHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight - windowHeight
      const scrollProgress = Math.max(0, Math.min(1, scrollY.current / scrollHeight))
      
      // Detect current section
      const sectionIndex = Math.min(
        Math.floor(scrollProgress * sectionColors.length),
        sectionColors.length - 1
      )
      
      if (sectionIndex !== currentSection.current) {
        currentSection.current = sectionIndex
        targetColor.current = sectionColors[sectionIndex].primary
        setActiveSection(sectionIndex)
      }
      
      // Very gentle particle movement based on scroll
      const positionAttribute = particleGeometry.attributes.position as THREE.BufferAttribute
      const positions = positionAttribute.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3 + 1 // Y position
        
        // Gentle drift based on scroll
        positions[i3] = originalY[i] - scrollProgress * 10
      }
      
      positionAttribute.needsUpdate = true
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    // Animation loop - very slow and serene
    const clock = new THREE.Clock()
    
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      // Very smooth scroll interpolation
      currentScrollY.current += (scrollY.current - currentScrollY.current) * 0.02
      
      // Very smooth color transition (much slower)
      const lerpFactor = 0.01 // Very slow transition
      const targetColorObj = new THREE.Color(targetColor.current)
      const currentColorObj = new THREE.Color(currentColor.current)
      currentColorObj.lerp(targetColorObj, lerpFactor)
      currentColor.current = currentColorObj.getHex()
      
      // Update particle colors
      if (particlesRef.current) {
        particlesRef.current.material.color.setHex(currentColor.current)
        
        // Very slow, gentle rotation
        particlesRef.current.rotation.y = elapsedTime * 0.01
        
        // Gentle breathing effect
        const breathe = Math.sin(elapsedTime * 0.3) * 0.1 + 1
        particlesRef.current.scale.setScalar(breathe)
      }
      
      renderer.render(scene, camera)
    }
    
    animate()
    handleScroll() // Initialize
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])
  
  // Scroll to section function
  const scrollToSection = (index: number) => {
    const sections = ['hero', 'achievements', 'experience', 'projects', 'tech', 'contact']
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  return (
    <>
      <div 
        ref={mountRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          background: 'transparent'
        }}
      />
      
      {/* Minimalist Vertical Navigation */}
      <div style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {sectionColors.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              background: activeSection === index ? '#f97316' : 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.6s ease', // Slower transition
              padding: 0,
              position: 'relative',
              transform: activeSection === index ? 'scale(1.5)' : 'scale(1)'
            }}
            aria-label={`Navigate to ${section.name}`}
          />
        ))}
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="right: '24px'"] {
            right: 12px !important;
          }
        }
      `}</style>
    </>
  )
}