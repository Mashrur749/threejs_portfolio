'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Tech {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools' | 'cloud'
  level: number
  description: string
  projects: string[]
  color: string
  position?: { x: number, y: number, z: number }
}

const technologies: Tech[] = [
  {
    name: 'Next.js',
    icon: '⚡',
    category: 'frontend',
    level: 5,
    description: 'Production experience with ISR, SSG, SSR patterns',
    projects: ['AT&T Landing Pages', 'Offer Creation Engine'],
    color: '#ffffff'
  },
  {
    name: 'React',
    icon: '⚛️',
    category: 'frontend',
    level: 5,
    description: '5+ years building complex UIs',
    projects: ['Meta Dashboards', 'Critical Mass Projects'],
    color: '#61dafb'
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    category: 'frontend',
    level: 5,
    description: 'Type-safe development across full stack',
    projects: ['All recent projects'],
    color: '#3178c6'
  },
  {
    name: 'Node.js',
    icon: '🟢',
    category: 'backend',
    level: 4,
    description: 'APIs, microservices, and build tools',
    projects: ['QA Automation Tool', 'API Integrations'],
    color: '#339933'
  },
  {
    name: 'GraphQL',
    icon: '◈',
    category: 'backend',
    level: 4,
    description: 'Codegen implementation saving hours daily',
    projects: ['GraphQL Codegen System'],
    color: '#e10098'
  },
  {
    name: 'AWS',
    icon: '☁️',
    category: 'cloud',
    level: 4,
    description: 'S3, Lambda, CloudFront, EC2',
    projects: ['Enterprise deployments'],
    color: '#ff9900'
  },
  {
    name: 'Docker',
    icon: '🐳',
    category: 'tools',
    level: 3,
    description: 'Containerization for consistent deployments',
    projects: ['Development environments'],
    color: '#2496ed'
  },
  {
    name: 'PostgreSQL',
    icon: '🐘',
    category: 'backend',
    level: 4,
    description: 'Database design and optimization',
    projects: ['Storius data migration'],
    color: '#336791'
  },
  {
    name: 'Three.js',
    icon: '🎮',
    category: 'frontend',
    level: 3,
    description: 'Creative 3D web experiences',
    projects: ['Portfolio', 'Galaxy Generator'],
    color: '#f97316'
  },
  {
    name: 'GitHub',
    icon: '🐙',
    category: 'tools',
    level: 5,
    description: 'Version control and CI/CD workflows',
    projects: ['All projects'],
    color: '#ffffff'
  },
  {
    name: 'Tailwind',
    icon: '🎨',
    category: 'frontend',
    level: 5,
    description: 'Utility-first CSS framework',
    projects: ['Modern UI development'],
    color: '#06b6d4'
  },
  {
    name: 'Vercel',
    icon: '▲',
    category: 'cloud',
    level: 4,
    description: 'Edge functions and deployments',
    projects: ['Portfolio hosting'],
    color: '#ffffff'
  }
]

export default function TechIconsScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null)
  const [hoveredTech, setHoveredTech] = useState<Tech | null>(null)
  const techRefs = useRef<Map<string, THREE.Mesh>>(new Map())
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x09090b)
    scene.fog = new THREE.Fog(0x09090b, 10, 50)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 15)
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)
    
    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    
    // Create canvas for text rendering
    const createTextSprite = (text: string, color: string) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 256
      canvas.height = 256
      
      // Draw background circle
      context.fillStyle = 'rgba(9, 9, 11, 0.8)'
      context.beginPath()
      context.arc(128, 128, 100, 0, Math.PI * 2)
      context.fill()
      
      // Draw border
      context.strokeStyle = color
      context.lineWidth = 4
      context.beginPath()
      context.arc(128, 128, 100, 0, Math.PI * 2)
      context.stroke()
      
      // Draw emoji/icon
      context.font = '100px Arial'
      context.fillStyle = '#ffffff'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(text, 128, 128)
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      
      return texture
    }
    
    // Group for all tech icons
    const techGroup = new THREE.Group()
    scene.add(techGroup)
    
    // Position technologies in a spiral pattern
    const spiralPositions: { x: number, y: number, z: number }[] = []
    const numTechs = technologies.length
    const radius = 6
    
    for (let i = 0; i < numTechs; i++) {
      const angle = (i / numTechs) * Math.PI * 2
      const heightOffset = (i - numTechs / 2) * 0.5
      const radiusVariation = radius + Math.sin(i * 0.5) * 2
      
      spiralPositions.push({
        x: Math.cos(angle) * radiusVariation,
        y: heightOffset,
        z: Math.sin(angle) * radiusVariation
      })
    }
    
    // Create tech icon meshes
    const techMeshes: THREE.Mesh[] = []
    
    technologies.forEach((tech, index) => {
      const texture = createTextSprite(tech.icon, tech.color)
      
      // Create sprite material
      const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.9
      })
      
      // Create sprite
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(2, 2, 1)
      
      // Position
      const pos = spiralPositions[index]
      sprite.position.set(pos.x, pos.y, pos.z)
      
      // Store tech data
      sprite.userData = { tech }
      
      techGroup.add(sprite)
      techMeshes.push(sprite as any)
      techRefs.current.set(tech.name, sprite as any)
    })
    
    // Create floating particles for ambiance
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xf97316,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xf97316, 0.5, 50)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0x00dfd8, 0.5, 50)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)
    
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Camera follow mouse slightly
      camera.position.x = mouse.x * 2
      camera.position.y = mouse.y * 2
      camera.lookAt(0, 0, 0)
      
      // Check for hover
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(techMeshes)
      
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object
        const tech = hoveredMesh.userData.tech as Tech
        setHoveredTech(tech)
        document.body.style.cursor = 'pointer'
      } else {
        setHoveredTech(null)
        document.body.style.cursor = 'default'
      }
    }
    
    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(techMeshes)
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object
        const tech = clickedMesh.userData.tech as Tech
        setSelectedTech(tech)
      } else {
        setSelectedTech(null)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
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
      
      // Rotate tech group
      techGroup.rotation.y = elapsedTime * 0.1
      
      // Float tech icons
      techMeshes.forEach((mesh, index) => {
        const baseY = spiralPositions[index].y
        mesh.position.y = baseY + Math.sin(elapsedTime + index * 0.5) * 0.2
        
        // Scale on hover
        const tech = mesh.userData.tech as Tech
        if (hoveredTech === tech || selectedTech === tech) {
          mesh.scale.lerp(new THREE.Vector3(2.5, 2.5, 1), 0.1)
        } else {
          mesh.scale.lerp(new THREE.Vector3(2, 2, 1), 0.1)
        }
      })
      
      // Animate particles
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = elapsedTime * 0.03
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])
  
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
          zIndex: 1
        }}
      />
      
      {/* Tech Info Panel */}
      {selectedTech && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '320px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(9, 9, 11, 0.95), rgba(24, 24, 27, 0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '16px',
          color: 'white',
          zIndex: 100,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '2rem' }}>{selectedTech.icon}</span>
            <h3 style={{ 
              color: '#f97316', 
              fontSize: '1.5rem',
              margin: 0
            }}>
              {selectedTech.name}
            </h3>
          </div>
          
          <p style={{ 
            marginBottom: '16px',
            color: '#d4d4d8',
            lineHeight: '1.6'
          }}>
            {selectedTech.description}
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#fafafa', fontSize: '0.875rem' }}>EXPERTISE LEVEL</strong>
            <div style={{ 
              display: 'flex', 
              gap: '4px',
              marginTop: '8px'
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: '40px',
                  height: '6px',
                  background: i < selectedTech.level 
                    ? `linear-gradient(90deg, #f97316, #fb923c)` 
                    : 'rgba(63, 63, 70, 0.5)',
                  borderRadius: '3px',
                  boxShadow: i < selectedTech.level 
                    ? '0 0 10px rgba(249, 115, 22, 0.5)' 
                    : 'none'
                }} />
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#fafafa', fontSize: '0.875rem' }}>USED IN PROJECTS</strong>
            <div style={{ marginTop: '8px' }}>
              {selectedTech.projects.map((project, i) => (
                <div key={i} style={{
                  padding: '8px 12px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  fontSize: '0.875rem',
                  color: '#fafafa'
                }}>
                  {project}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setSelectedTech(null)}
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(90deg, #f97316, #fb923c)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'transform 0.2s',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Close
          </button>
        </div>
      )}
      
      {/* Floating tooltip */}
      {hoveredTech && !selectedTech && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 20px',
          background: 'rgba(9, 9, 11, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '12px',
          color: 'white',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{hoveredTech.icon}</span>
          <div>
            <strong style={{ color: '#f97316' }}>{hoveredTech.name}</strong>
            <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
              Click to explore
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        background: 'rgba(9, 9, 11, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(63, 63, 70, 0.5)',
        borderRadius: '24px',
        color: '#a1a1aa',
        fontSize: '0.875rem',
        zIndex: 100
      }}>
        🎯 Click on tech icons to explore my expertise • Move mouse to navigate
      </div>
    </>
  )
}