'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Box, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useInView } from 'react-intersection-observer'

function Speedometer({ value, maxValue = 300 }: { value: number; maxValue?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const needleRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (needleRef.current) {
      const targetAngle = (value / maxValue) * Math.PI - Math.PI / 2
      needleRef.current.rotation.z = THREE.MathUtils.lerp(
        needleRef.current.rotation.z,
        targetAngle,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Speedometer arc */}
      <mesh>
        <torusGeometry args={[2, 0.1, 8, 100, Math.PI]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Needle */}
      <mesh ref={needleRef} position={[0, 0, 0.1]}>
        <boxGeometry args={[1.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Center dot */}
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      
      {/* Speed text */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.5}
        color="#f97316"
        anchorX="center"
        anchorY="middle"
      >
        {value.toFixed(0)}x Faster
      </Text>
    </group>
  )
}

function ProgressBar({ 
  label, 
  progress, 
  position 
}: { 
  label: string
  progress: number
  position: [number, number, number] 
}) {
  const barRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (barRef.current) {
      barRef.current.scale.x = THREE.MathUtils.lerp(
        barRef.current.scale.x,
        progress,
        0.05
      )
    }
  })

  return (
    <group position={position}>
      {/* Background bar */}
      <RoundedBox args={[3, 0.3, 0.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#27272a" />
      </RoundedBox>
      
      {/* Progress bar */}
      <mesh ref={barRef} position={[-1.5 + (progress * 1.5), 0, 0.05]} scale={[progress, 1, 1]}>
        <boxGeometry args={[3, 0.3, 0.1]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
      >
        {label}
      </Text>
      
      {/* Percentage */}
      <Text
        position={[2, 0, 0]}
        fontSize={0.25}
        color="#f97316"
        anchorX="center"
      >
        {(progress * 100).toFixed(0)}%
      </Text>
    </group>
  )
}

function FloatingMetric({ 
  value, 
  label, 
  position,
  delay = 0 
}: { 
  value: string
  label: string
  position: [number, number, number]
  delay?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={0.6}
        color="#f97316"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.2}
        color="#a1a1aa"
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  )
}

function AnimatedClock() {
  const hourHandRef = useRef<THREE.Mesh>(null)
  const minuteHandRef = useRef<THREE.Mesh>(null)
  const [speed, setSpeed] = useState(1)
  
  useFrame((state) => {
    if (hourHandRef.current && minuteHandRef.current) {
      // Fast spinning to show time saved
      minuteHandRef.current.rotation.z = -state.clock.elapsedTime * speed * 2
      hourHandRef.current.rotation.z = -state.clock.elapsedTime * speed * 0.5
    }
  })
  
  useEffect(() => {
    // Accelerate over time
    const interval = setInterval(() => {
      setSpeed(s => Math.min(s + 0.5, 10))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <group position={[-3, -1, 0]}>
      {/* Clock face */}
      <mesh>
        <ringGeometry args={[1.2, 1, 32]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>
      
      {/* Hour marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0.01]}>
            <boxGeometry args={[0.05, 0.15, 0.01]} />
            <meshStandardMaterial color="#52525b" />
          </mesh>
        )
      })}
      
      {/* Hour hand */}
      <mesh ref={hourHandRef} position={[0, 0, 0.02]}>
        <boxGeometry args={[0.04, 0.5, 0.01]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Minute hand */}
      <mesh ref={minuteHandRef} position={[0, 0, 0.03]}>
        <boxGeometry args={[0.02, 0.7, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Center */}
      <mesh position={[0, 0, 0.04]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      
      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#a1a1aa">
        Time Saved
      </Text>
    </group>
  )
}

export function PerformanceVisualization({ scrollProgress = 0 }) {
  const [deploySpeed, setDeploySpeed] = useState(1)
  const [qaProgress, setQaProgress] = useState(0)
  
  useEffect(() => {
    // Animate values based on scroll
    setDeploySpeed(Math.min(scrollProgress * 300, 300))
    setQaProgress(Math.min(scrollProgress * 0.6, 0.6))
  }, [scrollProgress])

  return (
    <group>
      <Speedometer value={deploySpeed} />
      
      <ProgressBar 
        label="QA Time Reduced"
        progress={qaProgress}
        position={[0, 0, 0]}
      />
      
      <ProgressBar 
        label="Error Reduction"
        progress={scrollProgress * 0.8}
        position={[0, -1, 0]}
      />
      
      <FloatingMetric
        value="300x"
        label="Deployment Speed"
        position={[3, 1, 0]}
        delay={0.5}
      />
      
      <FloatingMetric
        value="60%"
        label="QA Time Saved"
        position={[3, -1, 0]}
        delay={1}
      />
      
      <FloatingMetric
        value="25-30hrs"
        label="Saved Bi-Weekly"
        position={[-3, 1, 0]}
        delay={1.5}
      />
      
      <AnimatedClock />
    </group>
  )
}