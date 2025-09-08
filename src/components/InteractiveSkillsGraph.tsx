'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'cloud'
  level: number // 1-5
  connections: string[]
  description: string
  projects: string[]
  color: number
}

const skills: Skill[] = [
  {
    name: 'Next.js',
    category: 'frontend',
    level: 5,
    connections: ['React', 'TypeScript', 'Node.js', 'Vercel'],
    description: 'Production experience with ISR, SSG, SSR patterns',
    projects: ['Enterprise Landing Pages', 'Offer Creation Engine'],
    color: 0xffffff
  },
  {
    name: 'React',
    category: 'frontend',
    level: 5,
    connections: ['TypeScript', 'Redux', 'GraphQL'],
    description: '5+ years building complex UIs',
    projects: ['Meta Dashboards', 'Critical Mass Projects'],
    color: 0x61dafb
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 5,
    connections: ['React', 'Node.js', 'GraphQL'],
    description: 'Type-safe development across full stack',
    projects: ['All recent projects'],
    color: 0x3178c6
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 4,
    connections: ['Express', 'GraphQL', 'PostgreSQL'],
    description: 'APIs, microservices, and build tools',
    projects: ['QA Automation Tool', 'API Integrations'],
    color: 0x339933
  },
  {
    name: 'GraphQL',
    category: 'backend',
    level: 4,
    connections: ['TypeScript', 'Node.js', 'React'],
    description: 'Codegen implementation saving hours daily',
    projects: ['GraphQL Codegen System'],
    color: 0xe10098
  },
  {
    name: 'AWS',
    category: 'cloud',
    level: 4,
    connections: ['Docker', 'CI/CD', 'Node.js'],
    description: 'S3, Lambda, CloudFront, EC2',
    projects: ['Enterprise deployments'],
    color: 0xff9900
  },
  {
    name: 'Docker',
    category: 'tools',
    level: 3,
    connections: ['AWS', 'CI/CD'],
    description: 'Containerization for consistent deployments',
    projects: ['Development environments'],
    color: 0x2496ed
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    level: 4,
    connections: ['Node.js', 'GraphQL'],
    description: 'Database design and optimization',
    projects: ['Storius data migration'],
    color: 0x336791
  },
  {
    name: 'Three.js',
    category: 'frontend',
    level: 3,
    connections: ['React', 'TypeScript'],
    description: 'Creative 3D web experiences',
    projects: ['Portfolio', 'Galaxy Generator'],
    color: 0xf97316
  },
  {
    name: 'CI/CD',
    category: 'tools',
    level: 4,
    connections: ['Docker', 'AWS', 'GitHub Actions'],
    description: 'Automated testing and deployment pipelines',
    projects: ['300x deployment speed improvement'],
    color: 0x00dfd8
  },
  {
    name: 'Vercel',
    category: 'cloud',
    level: 4,
    connections: ['Next.js', 'CI/CD'],
    description: 'Edge functions and deployments',
    projects: ['Portfolio hosting'],
    color: 0x000000
  },
  {
    name: 'Redux',
    category: 'frontend',
    level: 4,
    connections: ['React', 'TypeScript'],
    description: 'State management for complex apps',
    projects: ['Enterprise applications'],
    color: 0x764abc
  },
  {
    name: 'Express',
    category: 'backend',
    level: 4,
    connections: ['Node.js', 'PostgreSQL'],
    description: 'RESTful API development',
    projects: ['Backend services'],
    color: 0x000000
  },
  {
    name: 'GitHub Actions',
    category: 'tools',
    level: 3,
    connections: ['CI/CD', 'Docker'],
    description: 'Automated workflows',
    projects: ['Open source projects'],
    color: 0x2088ff
  }
]

export default function InteractiveSkillsGraph() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x09090b)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 20)
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    
    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    
    // Create skill nodes
    const skillNodes: { skill: Skill, mesh: THREE.Mesh, targetScale: number }[] = []
    const skillMeshMap = new Map<string, THREE.Mesh>()
    
    // Position skills in a 3D space based on category
    const categoryPositions = {
      frontend: { x: -5, y: 3, z: 0 },
      backend: { x: 5, y: 3, z: 0 },
      tools: { x: -5, y: -3, z: 0 },
      cloud: { x: 5, y: -3, z: 0 }
    }
    
    skills.forEach((skill, index) => {
      const basePos = categoryPositions[skill.category]
      const categorySkills = skills.filter(s => s.category === skill.category)
      const categoryIndex = categorySkills.indexOf(skill)
      
      // Create sphere for skill node
      const geometry = new THREE.SphereGeometry(0.3 + skill.level * 0.1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: skill.color || 0xf97316,
        emissive: skill.color || 0xf97316,
        emissiveIntensity: 0.2,
        shininess: 100
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      
      // Position with some randomness within category area
      mesh.position.set(
        basePos.x + (categoryIndex % 3 - 1) * 2,
        basePos.y + Math.floor(categoryIndex / 3) * 1.5,
        basePos.z + (Math.random() - 0.5) * 2
      )
      
      mesh.userData = { skill }
      scene.add(mesh)
      
      skillNodes.push({ skill, mesh, targetScale: 1 })
      skillMeshMap.set(skill.name, mesh)
    })
    
    // Create connections
    const connections: THREE.Line[] = []
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0xf97316,
      opacity: 0.2,
      transparent: true
    })
    
    skills.forEach(skill => {
      skill.connections.forEach(connectionName => {
        const targetMesh = skillMeshMap.get(connectionName)
        if (targetMesh) {
          const sourceMesh = skillMeshMap.get(skill.name)
          if (sourceMesh) {
            const points = [sourceMesh.position, targetMesh.position]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            const line = new THREE.Line(geometry, connectionMaterial)
            line.userData = { source: skill.name, target: connectionName }
            scene.add(line)
            connections.push(line)
          }
        }
      })
    })
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xf97316, 0.5, 100)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0x00dfd8, 0.5, 100)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)
    
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Check for hover
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(skillNodes.map(n => n.mesh))
      
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh
        const skill = hoveredMesh.userData.skill as Skill
        setHoveredSkill(skill)
        document.body.style.cursor = 'pointer'
      } else {
        setHoveredSkill(null)
        document.body.style.cursor = 'default'
      }
    }
    
    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(skillNodes.map(n => n.mesh))
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh
        const skill = clickedMesh.userData.skill as Skill
        setSelectedSkill(skill)
      } else {
        setSelectedSkill(null)
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
      
      // Rotate scene slowly
      scene.rotation.y = elapsedTime * 0.05
      
      // Animate skill nodes
      skillNodes.forEach(({ skill, mesh, targetScale }) => {
        // Hover effect
        if (hoveredSkill === skill) {
          mesh.scale.setScalar(1.3)
          ;(mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5
        } else if (selectedSkill === skill) {
          mesh.scale.setScalar(1.2)
          ;(mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.4
        } else if (selectedSkill && selectedSkill.connections.includes(skill.name)) {
          mesh.scale.setScalar(1.1)
          ;(mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.3
        } else {
          mesh.scale.setScalar(1)
          ;(mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2
        }
        
        // Gentle floating
        mesh.position.y += Math.sin(elapsedTime + mesh.position.x) * 0.001
        
        // Rotate individual nodes
        mesh.rotation.x += 0.005
        mesh.rotation.y += 0.005
      })
      
      // Highlight connections
      connections.forEach(line => {
        const lineData = line.userData
        const lineMaterial = line.material as THREE.LineBasicMaterial
        if (selectedSkill && 
            (lineData.source === selectedSkill.name || 
             lineData.target === selectedSkill.name)) {
          lineMaterial.opacity = 0.6
          lineMaterial.color.setHex(0xf97316)
        } else {
          lineMaterial.opacity = 0.1
          lineMaterial.color.setHex(0x525252)
        }
      })
      
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
      
      {/* Skill Info Panel */}
      {selectedSkill && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '300px',
          padding: '20px',
          background: 'rgba(9, 9, 11, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '12px',
          color: 'white',
          zIndex: 100
        }}>
          <h3 style={{ 
            color: '#f97316', 
            marginBottom: '10px',
            fontSize: '1.5rem'
          }}>
            {selectedSkill.name}
          </h3>
          <p style={{ 
            marginBottom: '15px',
            color: '#d4d4d8'
          }}>
            {selectedSkill.description}
          </p>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#fafafa' }}>Expertise Level:</strong>
            <div style={{ 
              display: 'flex', 
              gap: '4px',
              marginTop: '5px'
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: '30px',
                  height: '6px',
                  background: i < selectedSkill.level ? '#f97316' : '#27272a',
                  borderRadius: '3px'
                }} />
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#fafafa' }}>Used in:</strong>
            <ul style={{ 
              margin: '5px 0 0 20px',
              color: '#a1a1aa'
            }}>
              {selectedSkill.projects.map((project, i) => (
                <li key={i}>{project}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <strong style={{ color: '#fafafa' }}>Related Skills:</strong>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '8px'
            }}>
              {selectedSkill.connections.map((conn, i) => (
                <span key={i} style={{
                  padding: '4px 12px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '16px',
                  fontSize: '0.875rem',
                  color: '#fb923c'
                }}>
                  {conn}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setSelectedSkill(null)}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              background: 'rgba(249, 115, 22, 0.2)',
              border: '1px solid rgba(249, 115, 22, 0.5)',
              borderRadius: '8px',
              color: '#f97316',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Close
          </button>
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
        🎯 Click on skill nodes to explore my expertise
      </div>
      
      {/* Hover tooltip */}
      {hoveredSkill && !selectedSkill && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          padding: '12px 16px',
          background: 'rgba(9, 9, 11, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          borderRadius: '8px',
          color: 'white',
          zIndex: 100
        }}>
          <strong style={{ color: '#f97316' }}>{hoveredSkill.name}</strong>
          <div style={{ fontSize: '0.875rem', color: '#a1a1aa', marginTop: '4px' }}>
            Click to see details
          </div>
        </div>
      )}
    </>
  )
}