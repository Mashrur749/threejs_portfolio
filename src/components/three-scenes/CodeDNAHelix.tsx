'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

interface CodeStrand {
  position: THREE.Vector3
  text: string
  color: string
}

function DNAStrand({ count = 40 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const strand1Ref = useRef<THREE.InstancedMesh>(null)
  const strand2Ref = useRef<THREE.InstancedMesh>(null)
  const connectorsRef = useRef<THREE.InstancedMesh>(null)
  
  // Code snippets to display
  const codeSnippets = [
    'const deploy = async () =>',
    'interface UserData {',
    'useState<Performance>()',
    'fetch("/api/metrics")',
    'export default function',
    'type Props = {',
    'useEffect(() => {',
    'return <Component />',
    'async function build()',
    'class DataService {',
    'map((item) => item)',
    'filter(Boolean)',
    'reduce((acc, val) =>',
    'Promise.all([',
    'await database.query(',
    'router.push("/home")',
    'import { motion }',
    'const [state, setState]',
    'onClick={() => {',
    'try { await api.call()'
  ]
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Initialize instance matrices
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4 // Two full rotations
      const y = (i / count) * 8 - 4 // Height from -4 to 4
      
      // First strand
      dummy.position.set(
        Math.cos(t) * 2,
        y,
        Math.sin(t) * 2
      )
      dummy.scale.setScalar(0.1)
      dummy.updateMatrix()
      strand1Ref.current?.setMatrixAt(i, dummy.matrix)
      
      // Second strand (180 degrees offset)
      dummy.position.set(
        Math.cos(t + Math.PI) * 2,
        y,
        Math.sin(t + Math.PI) * 2
      )
      dummy.updateMatrix()
      strand2Ref.current?.setMatrixAt(i, dummy.matrix)
      
      // Connectors
      if (i % 3 === 0) {
        dummy.position.set(0, y, 0)
        dummy.scale.set(4, 0.05, 0.05)
        dummy.lookAt(Math.cos(t) * 2, y, Math.sin(t) * 2)
        dummy.updateMatrix()
        connectorsRef.current?.setMatrixAt(Math.floor(i / 3), dummy.matrix)
      }
    }
    
    if (strand1Ref.current) strand1Ref.current.instanceMatrix.needsUpdate = true
    if (strand2Ref.current) strand2Ref.current.instanceMatrix.needsUpdate = true
    if (connectorsRef.current) connectorsRef.current.instanceMatrix.needsUpdate = true
  }, [count, dummy])
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })
  
  return (
    <group ref={groupRef}>
      {/* First DNA strand */}
      <instancedMesh ref={strand1Ref} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} />
      </instancedMesh>
      
      {/* Second DNA strand */}
      <instancedMesh ref={strand2Ref} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#00dfd8" emissive="#00dfd8" emissiveIntensity={0.5} />
      </instancedMesh>
      
      {/* Connectors */}
      <instancedMesh ref={connectorsRef} args={[undefined, undefined, Math.floor(count / 3)]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={0.2} 
          opacity={0.3}
          transparent
        />
      </instancedMesh>
      
      {/* Floating code snippets */}
      {codeSnippets.slice(0, 8).map((snippet, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 3.5
        return (
          <Float
            key={i}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.2, 0.2]}
          >
            <Text
              position={[
                Math.cos(angle) * radius,
                (i - 4) * 0.8,
                Math.sin(angle) * radius
              ]}
              fontSize={0.2}
              color={i % 2 === 0 ? "#f97316" : "#00dfd8"}
              anchorX="center"
              anchorY="middle"
            >
              {snippet}
            </Text>
          </Float>
        )
      })}
    </group>
  )
}

function FloatingSymbols() {
  const symbolsRef = useRef<THREE.Group>(null)
  const symbols = ['<', '/>', '{', '}', '()', '[]', '=>', '...', '&&', '||']
  
  useFrame((state) => {
    if (symbolsRef.current) {
      symbolsRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01
        child.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2
      })
    }
  })
  
  return (
    <group ref={symbolsRef}>
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2
        const radius = 5
        const height = (Math.random() - 0.5) * 6
        
        return (
          <Text
            key={i}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            fontSize={0.5}
            color="#52525b"
            anchorX="center"
            anchorY="middle"
          >
            {symbol}
          </Text>
        )
      })}
    </group>
  )
}

export function CodeDNAHelix() {
  return (
    <group>
      <DNAStrand count={50} />
      <FloatingSymbols />
      
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={2}
          opacity={0.2}
          transparent
        />
      </mesh>
      
      {/* Particle field */}
      <Points count={200} />
    </group>
  )
}

function Points({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f97316"
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}