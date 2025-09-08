'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ScrollParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const scrollY = useRef(0)
  const currentScrollY = useRef(0)
  const particles = useRef<THREE.Points | null>(null)
  const flowLines = useRef<THREE.Line[]>([])
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  
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
    camera.position.set(0, 0, 30)
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x09090b, 0.95)
    mountRef.current.appendChild(renderer.domElement)
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
    scene.add(ambientLight)
    
    // Create main particle system
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const speeds = new Float32Array(particleCount)
    
    // Create particles in a flowing pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create particles in a vertical flow pattern
      const angle = (i / particleCount) * Math.PI * 4
      const radius = 15 + Math.random() * 10
      const height = (i / particleCount) * 100 - 50
      
      positions[i3] = Math.cos(angle) * radius * (1 + Math.random() * 0.5)
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius * (1 + Math.random() * 0.5)
      
      // Color gradient from orange to cyan
      const t = i / particleCount
      if (t < 0.5) {
        colors[i3] = 0.976 // Orange R
        colors[i3 + 1] = 0.451 // Orange G
        colors[i3 + 2] = 0.086 // Orange B
      } else {
        colors[i3] = 0 // Cyan R
        colors[i3 + 1] = 0.875 // Cyan G
        colors[i3 + 2] = 0.847 // Cyan B
      }
      
      sizes[i] = Math.random() * 2 + 0.5
      speeds[i] = 0.5 + Math.random() * 0.5
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollProgress: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float scrollProgress;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Scroll-based animation
          pos.y -= scrollProgress * 20.0;
          
          // Gentle wave motion
          pos.x += sin(pos.y * 0.1 + time) * 2.0;
          pos.z += cos(pos.y * 0.1 + time * 0.7) * 2.0;
          
          // Spiral motion based on scroll
          float angle = scrollProgress * 3.14159 * 2.0;
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          float x = pos.x;
          float z = pos.z;
          pos.x = x * cosAngle - z * sinAngle;
          pos.z = x * sinAngle + z * cosAngle;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          // Create circular particles
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft edges
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.6;
          
          // Pulsing effect
          alpha *= 0.8 + sin(time * 2.0) * 0.2;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    })
    
    particles.current = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles.current)
    
    // Create flowing guide lines
    const createFlowLine = (offsetY: number, offsetX: number, color: number) => {
      const points = []
      const lineSegments = 50
      
      for (let i = 0; i <= lineSegments; i++) {
        const t = i / lineSegments
        const y = (t * 100) - 50 + offsetY
        const x = Math.sin(t * Math.PI * 2) * 5 + offsetX
        const z = Math.cos(t * Math.PI * 2) * 5
        points.push(new THREE.Vector3(x, y, z))
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: color,
        opacity: 0.1,
        transparent: true,
        blending: THREE.AdditiveBlending
      })
      
      const line = new THREE.Line(geometry, material)
      return line
    }
    
    // Add multiple flow lines
    const lineColors = [0xf97316, 0x00dfd8, 0xfb923c]
    for (let i = 0; i < 3; i++) {
      const line = createFlowLine(i * 10, (i - 1) * 10, lineColors[i])
      scene.add(line)
      flowLines.current.push(line)
    }
    
    // Add accent particles
    const accentCount = 50
    const accentGeometry = new THREE.BufferGeometry()
    const accentPositions = new Float32Array(accentCount * 3)
    
    for (let i = 0; i < accentCount; i++) {
      const i3 = i * 3
      accentPositions[i3] = (Math.random() - 0.5) * 40
      accentPositions[i3 + 1] = (Math.random() - 0.5) * 80
      accentPositions[i3 + 2] = (Math.random() - 0.5) * 20
    }
    
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3))
    
    const accentMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    
    const accentParticles = new THREE.Points(accentGeometry, accentMaterial)
    scene.add(accentParticles)
    
    // Scroll handler
    const handleScroll = () => {
      scrollY.current = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollY.current / scrollHeight
      
      if (particles.current) {
        (particles.current.material as THREE.ShaderMaterial).uniforms.scrollProgress.value = scrollProgress
      }
      
      // Update camera position based on scroll
      camera.position.y = -scrollProgress * 10
      camera.lookAt(0, -scrollProgress * 10, 0)
      
      // Rotate flow lines based on scroll
      flowLines.current.forEach((line, index) => {
        line.rotation.y = scrollProgress * Math.PI * 2 * (index + 1) * 0.5
        if (line.material && !Array.isArray(line.material)) {
          (line.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(scrollProgress * Math.PI) * 0.05
        }
      })
    }
    
    // Mouse handler for subtle interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1
      mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      // Smooth scroll interpolation
      currentScrollY.current += (scrollY.current - currentScrollY.current) * 0.1
      
      // Update shader uniforms
      if (particles.current) {
        (particles.current.material as THREE.ShaderMaterial).uniforms.time.value = elapsedTime
        
        // Gentle rotation
        particles.current.rotation.y = elapsedTime * 0.02
      }
      
      // Animate accent particles
      accentParticles.rotation.y = -elapsedTime * 0.03
      accentParticles.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1
      
      // Mouse influence on camera
      camera.position.x += (mouseX.current * 2 - camera.position.x) * 0.02
      camera.position.z = 30 + mouseY.current * 2
      
      // Animate flow lines
      flowLines.current.forEach((line, index) => {
        const offset = index * 0.3
        line.position.y = Math.sin(elapsedTime * 0.5 + offset) * 2
      })
      
      renderer.render(scene, camera)
    }
    
    animate()
    handleScroll() // Initialize scroll position
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
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