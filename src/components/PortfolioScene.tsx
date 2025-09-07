'use client'

import { Canvas } from '@react-three/fiber'
import { Float, Text, OrbitControls } from '@react-three/drei'
import { useRef, useMemo, useCallback, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Animated particle field that responds to mouse
function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const particlesCount = 4000
  
  // Create particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const col = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      // Create a sphere distribution with some variation
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 4 + Math.random() * 8
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) 
      pos[i * 3 + 2] = radius * Math.cos(phi)
      
      // Color gradient from orange to cyan
      const t = i / particlesCount
      if (Math.random() > 0.5) {
        // Orange particles
        col[i * 3] = 0.98
        col[i * 3 + 1] = 0.45 + t * 0.2
        col[i * 3 + 2] = 0.09
      } else {
        // Cyan particles
        col[i * 3] = 0
        col[i * 3 + 1] = 0.87
        col[i * 3 + 2] = 0.85
      }
    }
    return [pos, col]
  }, [])
  
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
  
  // Animate particles
  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Rotate entire particle system
    points.current.rotation.x = time * 0.05
    points.current.rotation.y = time * 0.075
    
    // Make particles pulse
    const scale = 1 + Math.sin(time * 2) * 0.1
    points.current.scale.setScalar(scale)
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

// Floating code snippets
function FloatingCode() {
  const codeSnippets = [
    { text: 'const build = () => fast', color: '#f97316' },
    { text: 'deploy({ speed: 300x })', color: '#00dfd8' },
    { text: 'scale.enterprise()', color: '#f97316' },
    { text: 'optimize.performance()', color: '#00dfd8' },
    { text: 'ship.reliably()', color: '#f97316' },
    { text: 'return <Success />', color: '#00dfd8' }
  ]
  
  return (
    <>
      {codeSnippets.map((snippet, i) => {
        const angle = (i / codeSnippets.length) * Math.PI * 2
        const radius = 5
        const y = (i - codeSnippets.length / 2) * 0.8
        
        return (
          <Float
            key={i}
            speed={2 + i * 0.5}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.5, 0.5]}
          >
            <Text
              position={[
                Math.cos(angle) * radius,
                y,
                Math.sin(angle) * radius
              ]}
              fontSize={0.3}
              color={snippet.color}
              anchorX="center"
              anchorY="middle"
            >
              {snippet.text}
            </Text>
          </Float>
        )
      })}
    </>
  )
}

// Animated geometric shapes
function GeometricShapes() {
  const meshRef1 = useRef<THREE.Mesh>(null)
  const meshRef2 = useRef<THREE.Mesh>(null)
  const meshRef3 = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef1.current) {
      meshRef1.current.rotation.x = time * 0.5
      meshRef1.current.rotation.y = time * 0.3
      meshRef1.current.position.x = Math.sin(time) * 2
    }
    
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -time * 0.3
      meshRef2.current.rotation.z = time * 0.4
      meshRef2.current.position.y = Math.cos(time) * 2
    }
    
    if (meshRef3.current) {
      meshRef3.current.rotation.y = time * 0.6
      meshRef3.current.rotation.z = -time * 0.2
      meshRef3.current.position.z = Math.sin(time * 0.5) * 2
    }
  })
  
  return (
    <>
      <mesh ref={meshRef1} position={[3, 0, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      
      <mesh ref={meshRef2} position={[-3, 0, 0]}>
        <tetrahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#00dfd8"
          emissive="#00dfd8"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      
      <mesh ref={meshRef3} position={[0, 2, -2]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#fb923c"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </>
  )
}

// DNA-like helix structure
function CodeHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const helixPoints = 30
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })
  
  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {Array.from({ length: helixPoints }).map((_, i) => {
        const t = (i / helixPoints) * Math.PI * 4
        const y = (i / helixPoints) * 6 - 3
        
        return (
          <group key={i}>
            {/* First strand */}
            <mesh position={[Math.cos(t) * 1.5, y, Math.sin(t) * 1.5]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#f97316"
                emissive="#f97316"
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Second strand */}
            <mesh position={[Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#00dfd8"
                emissive="#00dfd8"
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Connector */}
            {i % 3 === 0 && (
              <mesh position={[0, y, 0]} rotation={[0, t, 0]}>
                <boxGeometry args={[3, 0.02, 0.02]} />
                <meshStandardMaterial
                  color="#ffffff"
                  opacity={0.3}
                  transparent
                />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function PortfolioScene() {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'radial-gradient(ellipse at center, #18181b 0%, #09090b 100%)',
      cursor: hovered ? 'grab' : 'auto'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: 'high-performance'
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#f97316" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00dfd8" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />
        
        {/* 3D Elements */}
        <ParticleField />
        <FloatingCode />
        <GeometricShapes />
        <CodeHelix />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#09090b', 8, 30]} />
      </Canvas>
    </div>
  )
}