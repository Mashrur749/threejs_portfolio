'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MinimalParticles() {
  const mountRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const scrollY = useRef(0)
  const currentScrollY = useRef(0)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    // No background color - let CSS handle it
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50
    
    // Renderer setup - with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    
    // Create simple particle system
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    
    // Initialize particles in a spread pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 50
      
      // Random velocities for floating effect
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    // Simple particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })
    
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particlesRef.current)
    
    // Add some larger accent particles
    const accentGeometry = new THREE.BufferGeometry()
    const accentCount = 30
    const accentPositions = new Float32Array(accentCount * 3)
    
    for (let i = 0; i < accentCount; i++) {
      const i3 = i * 3
      accentPositions[i3] = (Math.random() - 0.5) * 80
      accentPositions[i3 + 1] = (Math.random() - 0.5) * 80
      accentPositions[i3 + 2] = (Math.random() - 0.5) * 30
    }
    
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3))
    
    const accentMaterial = new THREE.PointsMaterial({
      color: 0x00dfd8,
      size: 2.5,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })
    
    const accentParticles = new THREE.Points(accentGeometry, accentMaterial)
    scene.add(accentParticles)
    
    // Scroll handler
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    // Simple mouse interaction
    let mouseX = 0
    let mouseY = 0
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      // Smooth scroll interpolation
      currentScrollY.current += (scrollY.current - currentScrollY.current) * 0.05
      
      // Animate main particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1
        
        // Scroll-based movement
        particlesRef.current.position.y = -currentScrollY.current * 0.01
      }
      
      // Animate accent particles
      accentParticles.rotation.y = -elapsedTime * 0.03
      accentParticles.rotation.x = Math.cos(elapsedTime * 0.2) * 0.1
      
      // Mouse influence on camera
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose of geometries and materials
      particleGeometry.dispose()
      particleMaterial.dispose()
      accentGeometry.dispose()
      accentMaterial.dispose()
      renderer.dispose()
    }
  }, [])
  
  return (
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
  )
}