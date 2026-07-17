"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A quiet, restrained ambient field. Deliberately cheap on the CPU:
//  - no O(n^2) connection lines (the old performance hole)
//  - particles drift via a slow group rotation, not per-frame JS loops over pairs
//  - honors prefers-reduced-motion (renders a single static frame)
//  - pauses when the tab is hidden
//  - opacity stays low so foreground text always wins on contrast

const COUNT = 90; // sparse on purpose
const ACCENT = 0xf97316; // matches brand; kept low-opacity

export default function InterconnectedParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Soft round point sprite (square particles read as cheap).
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,0.5)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      return tex;
    })();

    const positions = new Float32Array(COUNT * 3);
    // Jittered grid — structured and branded rather than a random scatter.
    // Echoes the dot-grid motif from the OG image so the background reads as "ours".
    const cols = 16;
    const rows = Math.ceil(COUNT / cols);
    let n = 0;
    for (let r = 0; r < rows && n < COUNT; r++) {
      for (let c = 0; c < cols && n < COUNT; c++) {
        const i3 = n * 3;
        positions[i3] = (c / (cols - 1) - 0.5) * 140 + (Math.random() - 0.5) * 4;
        positions[i3 + 1] = (r / (rows - 1) - 0.5) * 90 + (Math.random() - 0.5) * 4;
        positions[i3 + 2] = (Math.random() - 0.5) * 60;
        n++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.9,
      map: sprite,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Very slow parallax drift tied to scroll (no per-pair math).
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let visible = true;
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !prefersReducedMotion) raf = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      if (!visible || prefersReducedMotion) return;
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow, calm rotation; subtle scroll parallax.
      points.rotation.y = t * 0.02 + scrollY * 0.00015;
      points.rotation.x = Math.sin(t * 0.05) * 0.05 + scrollY * 0.0001;
      camera.position.x = Math.sin(t * 0.05) * 2;
      camera.position.y = Math.cos(t * 0.04) * 1.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      // Static composition only — no animation loop.
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        // Signature ambient glow — branded, matches the OG/cover motif. Cheap (CSS).
        background:
          "radial-gradient(60% 50% at 85% 18%, rgba(249,115,22,0.10), rgba(249,115,22,0) 70%), radial-gradient(50% 40% at 10% 90%, rgba(249,115,22,0.05), rgba(249,115,22,0) 70%)",
      }}
    />
  );
}
