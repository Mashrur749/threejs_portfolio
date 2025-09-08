"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Section color themes
const sectionColors = [
  { primary: 0xf97316, secondary: 0xfb923c, name: "Hero" }, // Orange
  { primary: 0x00dfd8, secondary: 0x67e8f1, name: "Achievements" }, // Cyan
  { primary: 0x8b5cf6, secondary: 0xa78bfa, name: "Experience" }, // Purple
  { primary: 0x10b981, secondary: 0x34d399, name: "Projects" }, // Green
  { primary: 0xf59e0b, secondary: 0xfbbf24, name: "Tech Stack" }, // Amber
  { primary: 0xef4444, secondary: 0xf87171, name: "Contact" }, // Red
];

export default function DynamicParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const accentParticlesRef = useRef<THREE.Points | null>(null);
  const scrollY = useRef(0);
  const currentScrollY = useRef(0);
  const currentSection = useRef(0);
  const targetColors = useRef({ primary: 0xf97316, secondary: 0xfb923c });
  const currentColors = useRef({ primary: 0xf97316, secondary: 0xfb923c });

  const [activeSection, setActiveSection] = useState(0);

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

    // Create main particle system with more particles for flow effect
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Initialize particles in a flowing pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create a spiral/flow pattern
      const angle = (i / particleCount) * Math.PI * 8;
      const radius = 20 + (i / particleCount) * 30;
      const height = (Math.random() - 0.5) * 100;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Store original positions
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      // Flow velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = -0.5 - Math.random() * 0.5; // Downward flow
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 2,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesRef.current);

    // Add accent particles
    const accentGeometry = new THREE.BufferGeometry();
    const accentCount = 50;
    const accentPositions = new Float32Array(accentCount * 3);

    for (let i = 0; i < accentCount; i++) {
      const i3 = i * 3;
      accentPositions[i3] = (Math.random() - 0.5) * 80;
      accentPositions[i3 + 1] = (Math.random() - 0.5) * 80;
      accentPositions[i3 + 2] = (Math.random() - 0.5) * 30;
    }

    accentGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(accentPositions, 3)
    );

    const accentMaterial = new THREE.PointsMaterial({
      color: 0xfb923c,
      size: 3,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    accentParticlesRef.current = new THREE.Points(
      accentGeometry,
      accentMaterial
    );
    scene.add(accentParticlesRef.current);

    // Scroll handler with section detection
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = scrollY.current / scrollHeight;

      // Detect current section (assuming roughly equal sections)
      const sectionIndex = Math.min(
        Math.floor(scrollProgress * sectionColors.length),
        sectionColors.length - 1
      );

      if (sectionIndex !== currentSection.current) {
        currentSection.current = sectionIndex;
        targetColors.current = {
          primary: sectionColors[sectionIndex].primary,
          secondary: sectionColors[sectionIndex].secondary,
        };
        setActiveSection(sectionIndex);
      }

      // Update particle flow based on scroll
      const positionAttribute = particleGeometry.attributes
        .position as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Add flow motion based on scroll
        positions[i3 + 1] = originalPositions[i3 + 1] - scrollProgress * 50;

        // Reset particles that flow off screen
        if (positions[i3 + 1] < -50) {
          positions[i3 + 1] = 50;
        }
      }

      positionAttribute.needsUpdate = true;
    };

    window.addEventListener("scroll", handleScroll);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScrollY.current +=
        (scrollY.current - currentScrollY.current) * 0.05;

      // Smooth color transitions
      const lerpFactor = 0.05;
      currentColors.current.primary = THREE.MathUtils.lerp(
        currentColors.current.primary,
        targetColors.current.primary,
        lerpFactor
      );
      currentColors.current.secondary = THREE.MathUtils.lerp(
        currentColors.current.secondary,
        targetColors.current.secondary,
        lerpFactor
      );

      // Update particle colors
      if (particlesRef.current) {
        particlesRef.current.material.color.setHex(
          currentColors.current.primary
        );
        particlesRef.current.rotation.y = elapsedTime * 0.05;

        // Add wave motion
        particlesRef.current.position.x = Math.sin(elapsedTime * 0.3) * 5;
        particlesRef.current.position.z = Math.cos(elapsedTime * 0.3) * 5;
      }

      if (accentParticlesRef.current) {
        accentParticlesRef.current.material.color.setHex(
          currentColors.current.secondary
        );
        accentParticlesRef.current.rotation.y = -elapsedTime * 0.03;
        accentParticlesRef.current.rotation.x =
          Math.cos(elapsedTime * 0.2) * 0.1;
      }

      // Mouse influence on camera
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Update particle positions for flow effect
      const positionAttribute = particleGeometry.attributes
        .position as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Add some wave motion
        positions[i3] += velocities[i3];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check and reset
        if (Math.abs(positions[i3]) > 60) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 2]) > 60) velocities[i3 + 2] *= -1;
      }

      positionAttribute.needsUpdate = true;

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

  // Scroll to section function
  const scrollToSection = (index: number) => {
    const sections = [
      "hero",
      "achievements",
      "experience",
      "projects",
      "tech",
      "contact",
    ];
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
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

      {/* Vertical Navigation Dots */}
      <div
        style={{
          position: "fixed",
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {sectionColors.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor:
                activeSection === index
                  ? `#${section.primary.toString(16).padStart(6, "0")}`
                  : "rgba(255, 255, 255, 0.3)",
              background:
                activeSection === index
                  ? `#${section.primary.toString(16).padStart(6, "0")}`
                  : "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
              position: "relative",
            }}
            aria-label={`Navigate to ${section.name}`}
          >
            {/* Shuffling Orb Indicator */}
            {activeSection === index && (
              <span
                style={{
                  position: "absolute",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: `2px solid #${section.primary
                    .toString(16)
                    .padStart(6, "0")}`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "pulse 2s infinite",
                  pointerEvents: "none",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Section indicator */}
      <div
        style={{
          position: "fixed",
          right: "70px",
          top: "50%",
          transform: `translateY(${-75 + activeSection * 32}px)`,
          transition: "transform 0.3s ease",
          zIndex: 99,
          padding: "4px 12px",
          background: "rgba(9, 9, 11, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          fontSize: "12px",
          color: "#ffffff",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      >
        {sectionColors[activeSection].name}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @media (max-width: 768px) {
          div[style*="right: '30px'"] {
            right: 15px !important;
          }
          div[style*="right: '70px'"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
