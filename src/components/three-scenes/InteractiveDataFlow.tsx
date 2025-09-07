"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Box, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { Line2, LineSegments2 } from "three/examples/jsm/Addons.js";

interface DataPacket {
  id: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
  color: string;
  speed: number;
  active: boolean;
}

function DataNode({
  position,
  label,
  color = "#f97316",
  onClick,
}: {
  position: [number, number, number];
  label: string;
  color?: string;
  onClick?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 + (hovered ? 0.2 : 0)
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  );
}

function DataPacketMesh({ packet }: { packet: DataPacket }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && packet.active) {
      // Move packet towards target
      const current = meshRef.current.position;
      const target = packet.target;

      current.lerp(target, packet.speed);

      // Check if reached target
      if (current.distanceTo(target) < 0.1) {
        // Reset to start position
        current.copy(packet.position);
      }
    }
  });

  if (!packet.active) return null;

  return (
    <mesh ref={meshRef} position={packet.position.toArray()}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={packet.color}
        emissive={packet.color}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function NetworkConnection({
  start,
  end,
  active = false,
}: {
  start: [number, number, number];
  end: [number, number, number];
  active?: boolean;
}) {
  const lineRef = React.createRef<Line2 | LineSegments2>();

  useFrame((state) => {
    if (lineRef.current && active) {
      const material = lineRef.current
        .material as unknown as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={active ? "#f97316" : "#52525b"}
      lineWidth={active ? 2 : 1}
      opacity={active ? 0.5 : 0.2}
      transparent
    />
  );
}

export function InteractiveDataFlow() {
  const [activeConnections, setActiveConnections] = useState<Set<string>>(
    new Set()
  );
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const nextPacketId = useRef(0);

  // Node positions
  const nodes = [
    {
      pos: [0, 3, 0] as [number, number, number],
      label: "Client",
      color: "#00dfd8",
    },
    {
      pos: [-3, 1, 0] as [number, number, number],
      label: "CDN",
      color: "#f97316",
    },
    {
      pos: [3, 1, 0] as [number, number, number],
      label: "API",
      color: "#f97316",
    },
    {
      pos: [-2, -1, 0] as [number, number, number],
      label: "Cache",
      color: "#fb923c",
    },
    {
      pos: [2, -1, 0] as [number, number, number],
      label: "Database",
      color: "#fb923c",
    },
    {
      pos: [0, -3, 0] as [number, number, number],
      label: "Server",
      color: "#00dfd8",
    },
  ];

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos, id: "0-1" },
    { start: nodes[0].pos, end: nodes[2].pos, id: "0-2" },
    { start: nodes[1].pos, end: nodes[3].pos, id: "1-3" },
    { start: nodes[2].pos, end: nodes[4].pos, id: "2-4" },
    { start: nodes[3].pos, end: nodes[5].pos, id: "3-5" },
    { start: nodes[4].pos, end: nodes[5].pos, id: "4-5" },
    { start: nodes[1].pos, end: nodes[5].pos, id: "1-5" },
    { start: nodes[2].pos, end: nodes[5].pos, id: "2-5" },
  ];

  const handleNodeClick = (nodeIndex: number) => {
    // Create data packets from this node
    const node = nodes[nodeIndex];
    const targetNodes = connections
      .filter((c) => c.start === node.pos || c.end === node.pos)
      .map((c) => (c.start === node.pos ? c.end : c.start));

    const newPackets: DataPacket[] = targetNodes.map((target) => ({
      id: nextPacketId.current++,
      position: new THREE.Vector3(...node.pos),
      target: new THREE.Vector3(...target),
      color: node.color,
      speed: 0.02 + Math.random() * 0.02,
      active: true,
    }));

    setPackets((prev) => [...prev.slice(-20), ...newPackets]); // Keep only last 20 packets

    // Activate connections
    const newActive = new Set(activeConnections);
    connections
      .filter((c) => c.start === node.pos || c.end === node.pos)
      .forEach((c) => newActive.add(c.id));

    setActiveConnections(newActive);

    // Deactivate after animation
    setTimeout(() => {
      setActiveConnections(new Set());
    }, 2000);
  };

  // Auto-trigger random flows
  useFrame((state) => {
    if (Math.random() < 0.005) {
      // 0.5% chance per frame
      const randomNode = Math.floor(Math.random() * nodes.length);
      handleNodeClick(randomNode);
    }
  });

  return (
    <group>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <DataNode
          key={i}
          position={node.pos}
          label={node.label}
          color={node.color}
          onClick={() => handleNodeClick(i)}
        />
      ))}

      {/* Connections */}
      {connections.map((conn) => (
        <NetworkConnection
          key={conn.id}
          start={conn.start}
          end={conn.end}
          active={activeConnections.has(conn.id)}
        />
      ))}

      {/* Data Packets */}
      {packets.map((packet) => (
        <DataPacketMesh key={packet.id} packet={packet} />
      ))}

      {/* Central monitoring sphere */}
      <group>
        <mesh position={[0, 0, -1]}>
          <sphereGeometry args={[6, 32, 32]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#f97316"
            emissiveIntensity={0.02}
            opacity={0.1}
            transparent
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Floating metrics */}
      <FloatingMetrics />
    </group>
  );
}

function FloatingMetrics() {
  const metrics = [
    { label: "Requests/sec", value: "10K" },
    { label: "Latency", value: "12ms" },
    { label: "Cache Hit", value: "95%" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <group position={[0, -4, 0]}>
      {metrics.map((metric, i) => (
        <group key={i} position={[(i - 1.5) * 2, 0, 0]}>
          <Text fontSize={0.15} color="#f97316" anchorX="center">
            {metric.value}
          </Text>
          <Text
            position={[0, -0.25, 0]}
            fontSize={0.1}
            color="#71717a"
            anchorX="center"
          >
            {metric.label}
          </Text>
        </group>
      ))}
    </group>
  );
}
