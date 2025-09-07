'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeSceneBasic() {
  const mountRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x09090b)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10
      
      // Colors (orange and cyan)
      if (Math.random() > 0.5) {
        colors[i] = 0.98     // R
        colors[i + 1] = 0.45 // G
        colors[i + 2] = 0.09 // B
      } else {
        colors[i] = 0        // R
        colors[i + 1] = 0.87 // G
        colors[i + 2] = 0.85 // B
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    })
    
    // Create particle mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Create animated cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xf97316,
      wireframe: true 
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    
    // Add lights
    const light = new THREE.PointLight(0xf97316, 1, 100)
    light.position.set(5, 5, 5)
    scene.add(light)
    
    const light2 = new THREE.PointLight(0x00dfd8, 1, 100)
    light2.position.set(-5, -5, -5)
    scene.add(light2)
    
    // Mouse tracking
    const mouse = { x: 0, y: 0 }
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
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate particles
      particlesMesh.rotation.x += 0.001
      particlesMesh.rotation.y += 0.002
      
      // Rotate cube
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      
      // Move camera based on mouse
      camera.position.x = mouse.x * 0.5
      camera.position.y = mouse.y * 0.5
      
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
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      geometry.dispose()
      material.dispose()
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
        zIndex: -1
      }}
    />
  )
}