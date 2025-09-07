'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type Shape = 'sphere' | 'cube' | 'helix' | 'wave' | 'galaxy'

interface MorphingParticlesProps {
  scrollProgress?: number
  mouseIntensity?: number
}

export function MorphingParticles({ 
  scrollProgress = 0,
  mouseIntensity = 1 
}: MorphingParticlesProps) {
  const points = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const particlesCount = 5000
  const [currentShape, setCurrentShape] = useState<Shape>('sphere')
  const [targetPositions, setTargetPositions] = useState<Float32Array>()
  
  // Generate shape positions
  const generateShape = useCallback((shape: Shape): Float32Array => {
    const positions = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      
      switch (shape) {
        case 'sphere': {
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)
          const radius = 4 + Math.random() * 2
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i3 + 2] = radius * Math.cos(phi)
          break
        }
        
        case 'cube': {
          const size = 4
          positions[i3] = (Math.random() - 0.5) * size * 2
          positions[i3 + 1] = (Math.random() - 0.5) * size * 2
          positions[i3 + 2] = (Math.random() - 0.5) * size * 2
          break
        }
        
        case 'helix': {
          const t = (i / particlesCount) * Math.PI * 8
          const radius = 3
          positions[i3] = Math.cos(t) * radius
          positions[i3 + 1] = (i / particlesCount) * 10 - 5
          positions[i3 + 2] = Math.sin(t) * radius
          break
        }
        
        case 'wave': {
          const x = (i % 100) / 10 - 5
          const z = Math.floor(i / 100) / 10 - 5
          const y = Math.sin(x * 2) * Math.cos(z * 2) * 2
          
          positions[i3] = x
          positions[i3 + 1] = y
          positions[i3 + 2] = z
          break
        }
        
        case 'galaxy': {
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * 5
          const curve = Math.random() * 0.5
          
          positions[i3] = Math.cos(angle + curve) * radius
          positions[i3 + 1] = (Math.random() - 0.5) * 0.5
          positions[i3 + 2] = Math.sin(angle + curve) * radius
          
          // Add spiral arms
          if (Math.random() > 0.5) {
            const armAngle = angle + radius * 0.3
            positions[i3] = Math.cos(armAngle) * radius
            positions[i3 + 2] = Math.sin(armAngle) * radius
          }
          break
        }
      }
    }
    
    return positions
  }, [particlesCount])
  
  // Initialize positions
  const [positions, colors] = useMemo(() => {
    const pos = generateShape('sphere')
    const col = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      // Gradient colors
      const t = i / particlesCount
      col[i3] = 0.98 + t * 0.02     // R
      col[i3 + 1] = 0.45 - t * 0.2  // G
      col[i3 + 2] = 0.09 + t * 0.5  // B
    }
    
    return [pos, col]
  }, [particlesCount, generateShape])
  
  // Mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
  }, [])
  
  // Setup mouse listener
  useThree(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })
  
  // Morph based on scroll
  useMemo(() => {
    const shapes: Shape[] = ['sphere', 'cube', 'helix', 'wave', 'galaxy']
    const shapeIndex = Math.floor(scrollProgress * shapes.length)
    const newShape = shapes[Math.min(shapeIndex, shapes.length - 1)]
    
    if (newShape !== currentShape) {
      setCurrentShape(newShape)
      setTargetPositions(generateShape(newShape))
    }
  }, [scrollProgress, currentShape, generateShape])
  
  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.getElapsedTime()
    const geometry = points.current.geometry
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
    
    // Rotate the entire system
    points.current.rotation.x = time * 0.05
    points.current.rotation.y = time * 0.075
    
    // Morph and apply effects
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      
      // Get current position
      let x = positionAttribute.getX(i)
      let y = positionAttribute.getY(i)
      let z = positionAttribute.getZ(i)
      
      // Morph to target shape
      if (targetPositions) {
        const morphSpeed = 0.05
        x = THREE.MathUtils.lerp(x, targetPositions[i3], morphSpeed)
        y = THREE.MathUtils.lerp(y, targetPositions[i3 + 1], morphSpeed)
        z = THREE.MathUtils.lerp(z, targetPositions[i3 + 2], morphSpeed)
      }
      
      // Wave effect
      const waveAmplitude = 0.1 * (1 - scrollProgress)
      const waveX = Math.sin(time + i * 0.01) * waveAmplitude
      const waveY = Math.cos(time + i * 0.01) * waveAmplitude
      
      // Mouse interaction
      const mouseDistance = Math.sqrt(
        Math.pow(mouse.current.x * 5 - x, 2) + 
        Math.pow(mouse.current.y * 5 - y, 2)
      )
      const repulsion = Math.max(0, 2 - mouseDistance) * 0.5 * mouseIntensity
      const angle = Math.atan2(y - mouse.current.y * 5, x - mouse.current.x * 5)
      
      // Apply all effects
      positionAttribute.setXYZ(
        i,
        x + waveX + Math.cos(angle) * repulsion,
        y + waveY + Math.sin(angle) * repulsion,
        z + Math.sin(time * 0.5 + i * 0.01) * 0.2
      )
    }
    
    positionAttribute.needsUpdate = true
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}