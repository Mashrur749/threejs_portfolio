"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Minimalist color palette
const sectionColors = [
  { primary: 0xf97316, name: "Hero" },
  { primary: 0xfb923c, name: "Achievements" },
  { primary: 0xf59e0b, name: "Experience" },
  { primary: 0xfbbf24, name: "Projects" },
  { primary: 0xfde68a, name: "Tech Stack" },
  { primary: 0xf97316, name: "Contact" },
];

export default function InterconnectedParticles() {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const scrollY = useRef(0);
  const currentSection = useRef(0);
  const targetColor = useRef(0xf97316);
  const currentColor = useRef(0xf97316);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spread particles in 3D space
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Random velocities for gentle movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Smaller particles
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.4, // Much smaller
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesRef.current);

    // Create lines geometry for connections
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    linesRef.current = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesRef.current);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll handler
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollY.current / scrollHeight)
      );

      // Detect current section
      const sectionIndex = Math.min(
        Math.floor(scrollProgress * sectionColors.length),
        sectionColors.length - 1
      );

      if (sectionIndex !== currentSection.current) {
        currentSection.current = sectionIndex;
        targetColor.current = sectionColors[sectionIndex].primary;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth color transition
      const targetColorObj = new THREE.Color(targetColor.current);
      const currentColorObj = new THREE.Color(currentColor.current);
      currentColorObj.lerp(targetColorObj, 0.02);
      currentColor.current = currentColorObj.getHex();

      // Update particle colors
      if (particlesRef.current) {
        (particlesRef.current.material as THREE.PointsMaterial).color.setHex(currentColor.current);
      }

      if (linesRef.current) {
        (linesRef.current.material as THREE.LineBasicMaterial).color.setHex(
          currentColor.current
        );
      }

      // Update particle positions
      const positionAttribute = particleGeometry.attributes
        .position as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Apply velocities for floating effect
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Add wave motion
        positions[i3] += Math.sin(elapsedTime + i * 0.1) * 0.01;
        positions[i3 + 1] += Math.cos(elapsedTime + i * 0.1) * 0.01;

        // Boundary check
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i3 + j]) > 30) {
            velocities[i3 + j] *= -1;
          }
        }

        // Mouse influence
        const mouseInfluence = 5;
        const distX = mousePosition.current.x * 30 - positions[i3];
        const distY = mousePosition.current.y * 30 - positions[i3 + 1];
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < mouseInfluence) {
          const force = (1 - distance / mouseInfluence) * 0.02;
          positions[i3] -= distX * force;
          positions[i3 + 1] -= distY * force;
        }
      }

      positionAttribute.needsUpdate = true;

      // Update connections between nearby particles
      const linePositionAttribute = lineGeometry.attributes
        .position as THREE.BufferAttribute;
      const linePositions = linePositionAttribute.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect particles within a certain distance
          if (distance < 10 && lineIndex < linePositions.length - 6) {
            // First point of line
            linePositions[lineIndex++] = positions[i3];
            linePositions[lineIndex++] = positions[i3 + 1];
            linePositions[lineIndex++] = positions[i3 + 2];

            // Second point of line
            linePositions[lineIndex++] = positions[j3];
            linePositions[lineIndex++] = positions[j3 + 1];
            linePositions[lineIndex++] = positions[j3 + 2];

            // Update line opacity based on distance
            const opacity = Math.max(0, ((10 - distance) / 10) * 0.2);
            if (linesRef.current) {
              (linesRef.current.material as THREE.LineBasicMaterial).opacity =
                opacity;
            }
          }
        }
      }

      // Clear unused line positions
      for (let i = lineIndex; i < linePositions.length; i++) {
        linePositions[i] = 0;
      }

      linePositionAttribute.needsUpdate = true;

      // Gentle camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 5;
      camera.position.y = Math.cos(elapsedTime * 0.1) * 5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    handleScroll(); // Initialize

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
