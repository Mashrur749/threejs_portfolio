'use client'

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

function InteractiveParticles() {
  const points = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const particlesCount = 3000
  
  // Store original positions
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const origPos = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      // Create a sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 5 + Math.random() * 5
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      
      origPos[i * 3] = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z
    }
    return [pos, origPos]
  }, [])

  // Mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
  }, [])

  // Add mouse listener
  useThree(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })

  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.getElapsedTime()
    const geometry = points.current.geometry
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
    
    // Rotate the entire system
    points.current.rotation.x = time * 0.05
    points.current.rotation.y = time * 0.075
    
    // Interactive mouse effect
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      
      // Get original position
      const x = originalPositions[i3]
      const y = originalPositions[i3 + 1]
      const z = originalPositions[i3 + 2]
      
      // Add wave effect
      const waveX = Math.sin(time + i * 0.01) * 0.1
      const waveY = Math.cos(time + i * 0.01) * 0.1
      
      // Mouse repulsion effect
      const mouseDistance = Math.sqrt(
        Math.pow(mouse.current.x * 5 - x, 2) + 
        Math.pow(mouse.current.y * 5 - y, 2)
      )
      const repulsion = Math.max(0, 2 - mouseDistance) * 0.5
      const angle = Math.atan2(y - mouse.current.y * 5, x - mouse.current.x * 5)
      
      // Apply effects
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
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f97316"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingCode() {
  const textRef = useRef<THREE.Mesh>(null)
  const codeSnippets = [
    'const deploy = () => 300x',
    'performance.optimize()',
    'await buildFullStack()',
    'ship.fast().scale.smart()',
  ]
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3
      textRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group>
      {codeSnippets.map((snippet, i) => (
        <Text3D
          key={i}
          ref={i === 0 ? textRef : null}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.05}
          position={[
            Math.sin(i * Math.PI / 2) * 4,
            Math.cos(i * Math.PI / 2) * 2,
            -5 + i
          ]}
        >
          {snippet}
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.2}
            opacity={0.3}
            transparent
          />
        </Text3D>
      ))}
    </group>
  )
}

function AnimatedSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshStandardMaterial>(null)
  
  useFrame((state) => {
    if (mesh.current && material.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
      
      // Pulsing emissive effect
      material.current.emissiveIntensity = 
        0.2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={[3, 0, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          ref={material}
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function ThreeSceneEnhanced() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00dfd8" />
      
      <InteractiveParticles />
      <AnimatedSphere />
      {/* <FloatingCode /> */}
      
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 5, 25]} />
    </Canvas>
  )
}