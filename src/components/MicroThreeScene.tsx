'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MicroThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x09090b)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
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
    renderer.setClearColor(0x09090b, 0.95)
    mountRef.current.appendChild(renderer.domElement)
    
    // Create floating orbs group
    const orbsGroup = new THREE.Group()
    scene.add(orbsGroup)
    
    // Create glowing orbs with gentle movement
    const orbs: { 
      mesh: THREE.Mesh, 
      floatSpeed: number, 
      floatOffset: number,
      rotationSpeed: number,
      targetX: number,
      targetY: number 
    }[] = []
    
    // Create 5-7 delightful orbs
    const orbCount = 6
    const colors = [0xf97316, 0xfb923c, 0xfed7aa, 0x00dfd8, 0x67e8e4]
    
    for (let i = 0; i < orbCount; i++) {
      // Create orb geometry
      const geometry = new THREE.IcosahedronGeometry(
        0.3 + Math.random() * 0.4,
        1
      )
      
      // Create glowing material
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.4,
        shininess: 100,
        opacity: 0.7,
        transparent: true
      })
      
      const orb = new THREE.Mesh(geometry, material)
      
      // Random initial position in a nice pattern
      const angle = (i / orbCount) * Math.PI * 2
      const radius = 8 + Math.random() * 4
      orb.position.x = Math.cos(angle) * radius
      orb.position.y = (Math.random() - 0.5) * 6
      orb.position.z = -5 + Math.random() * 10
      
      orbsGroup.add(orb)
      
      orbs.push({
        mesh: orb,
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        targetX: orb.position.x,
        targetY: orb.position.y
      })
    }
    
    // Create subtle connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xf97316,
      opacity: 0.1,
      transparent: true
    })
    
    const lines: THREE.Line[] = []
    
    // Add soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    
    // Add gentle point light
    const pointLight = new THREE.PointLight(0xf97316, 0.5, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)
    
    // Mouse tracking for subtle interaction
    const mouse = { x: 0, y: 0 }
    const smoothMouse = { x: 0, y: 0 }
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    // Create clock for consistent animation
    const clock = new THREE.Clock()
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      // Smooth mouse movement
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05
      
      // Animate orbs with gentle floating motion
      orbs.forEach((orbData, index) => {
        const { mesh, floatSpeed, floatOffset, rotationSpeed, targetX, targetY } = orbData
        
        // Gentle floating animation
        mesh.position.y = targetY + Math.sin(elapsedTime * floatSpeed + floatOffset) * 0.5
        mesh.position.x = targetX + Math.cos(elapsedTime * floatSpeed * 0.7 + floatOffset) * 0.3
        
        // Subtle rotation
        mesh.rotation.x += rotationSpeed
        mesh.rotation.y += rotationSpeed * 0.7
        
        // Very subtle mouse influence
        mesh.position.x += smoothMouse.x * 0.2
        mesh.position.y += smoothMouse.y * 0.2
        
        // Gentle pulsing
        const scale = 1 + Math.sin(elapsedTime * 2 + index) * 0.05
        mesh.scale.setScalar(scale)
      })
      
      // Rotate entire group very slowly
      orbsGroup.rotation.y = elapsedTime * 0.05
      
      // Update connecting lines dynamically
      scene.remove(...lines)
      lines.length = 0
      
      // Draw subtle connections between nearby orbs
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const distance = orbs[i].mesh.position.distanceTo(orbs[j].mesh.position)
          
          if (distance < 6) {
            const points = [orbs[i].mesh.position, orbs[j].mesh.position]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            
            // Fade line based on distance
            const opacity = Math.max(0, (6 - distance) / 6 * 0.1)
            const fadedMaterial = new THREE.LineBasicMaterial({ 
              color: 0xf97316,
              opacity: opacity,
              transparent: true
            })
            
            const line = new THREE.Line(geometry, fadedMaterial)
            scene.add(line)
            lines.push(line)
          }
        }
      }
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose of all geometries and materials
      orbs.forEach(({ mesh }) => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      })
      
      lines.forEach(line => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
      
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
        pointerEvents: 'none'
      }}
    />
  )
}