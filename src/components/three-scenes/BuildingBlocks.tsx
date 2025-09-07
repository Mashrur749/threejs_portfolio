"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

interface Block {
  id: string;
  position: [number, number, number];
  label: string;
  category: "frontend" | "backend" | "database" | "devops";
  size: [number, number, number];
  color: string;
  falling: boolean;
  targetY: number;
}

const blockCategories = {
  frontend: "#00dfd8",
  backend: "#f97316",
  database: "#fb923c",
  devops: "#a855f7",
};

function TechBlock({ block, onClick }: { block: Block; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Falling animation
      if (block.falling) {
        const currentY = meshRef.current.position.y;
        meshRef.current.position.y = THREE.MathUtils.lerp(
          currentY,
          block.targetY,
          delta * 3
        );

        // Slight rotation while falling
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.z += delta * 0.3;
      }

      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={block.position}>
      <RoundedBox
        ref={meshRef}
        args={block.size}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={block.color}
          emissive={block.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>
      <Text
        position={[0, 0, block.size[2] / 2 + 0.01]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {block.label}
      </Text>
    </group>
  );
}

function StackVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [building, setBuilding] = useState(false);

  const techStack: Omit<Block, "id" | "falling" | "targetY">[] = [
    // Frontend Layer
    {
      position: [-2, 3, 0],
      label: "React",
      category: "frontend",
      size: [1, 0.5, 0.5],
      color: blockCategories.frontend,
    },
    {
      position: [0, 3, 0],
      label: "Next.js",
      category: "frontend",
      size: [1, 0.5, 0.5],
      color: blockCategories.frontend,
    },
    {
      position: [2, 3, 0],
      label: "TypeScript",
      category: "frontend",
      size: [1, 0.5, 0.5],
      color: blockCategories.frontend,
    },

    // Backend Layer
    {
      position: [-2, 2, 0],
      label: "Node.js",
      category: "backend",
      size: [1, 0.5, 0.5],
      color: blockCategories.backend,
    },
    {
      position: [0, 2, 0],
      label: "GraphQL",
      category: "backend",
      size: [1, 0.5, 0.5],
      color: blockCategories.backend,
    },
    {
      position: [2, 2, 0],
      label: "REST API",
      category: "backend",
      size: [1, 0.5, 0.5],
      color: blockCategories.backend,
    },

    // Database Layer
    {
      position: [-1, 1, 0],
      label: "PostgreSQL",
      category: "database",
      size: [1, 0.5, 0.5],
      color: blockCategories.database,
    },
    {
      position: [1, 1, 0],
      label: "Redis",
      category: "database",
      size: [1, 0.5, 0.5],
      color: blockCategories.database,
    },

    // DevOps Layer
    {
      position: [-2, 0, 0],
      label: "Docker",
      category: "devops",
      size: [1, 0.5, 0.5],
      color: blockCategories.devops,
    },
    {
      position: [0, 0, 0],
      label: "AWS",
      category: "devops",
      size: [1, 0.5, 0.5],
      color: blockCategories.devops,
    },
    {
      position: [2, 0, 0],
      label: "CI/CD",
      category: "devops",
      size: [1, 0.5, 0.5],
      color: blockCategories.devops,
    },
  ];

  useEffect(() => {
    // Initialize blocks with falling animation
    const initialBlocks = techStack.map((tech, i) => ({
      ...tech,
      id: `block-${i}`,
      falling: true,
      targetY: tech.position[1],
      position: [tech.position[0], tech.position[1] + 10, tech.position[2]] as [
        number,
        number,
        number
      ],
    }));

    setBlocks(initialBlocks);
    setBuilding(true);

    // Stagger the falling animation
    initialBlocks.forEach((block, i) => {
      setTimeout(() => {
        setBlocks((prev) =>
          prev.map((b) => (b.id === block.id ? { ...b, falling: true } : b))
        );
      }, i * 200);
    });
  }, []);

  const handleBlockClick = (blockId: string) => {
    // Explode and reassemble animation
    setBlocks((prev) =>
      prev.map((block) => ({
        ...block,
        position:
          block.id === blockId
            ? ([
                block.position[0] + (Math.random() - 0.5) * 2,
                block.position[1] + (Math.random() - 0.5) * 2,
                block.position[2] + (Math.random() - 0.5) * 2,
              ] as [number, number, number])
            : block.position,
        falling: true,
      }))
    );

    // Reset after animation
    setTimeout(() => {
      setBlocks((prev) =>
        prev.map((block, i) => ({
          ...block,
          position: techStack[i].position,
          falling: true,
        }))
      );
    }, 1000);
  };

  return (
    <>
      {blocks.map((block) => (
        <TechBlock
          key={block.id}
          block={block}
          onClick={() => handleBlockClick(block.id)}
        />
      ))}
    </>
  );
}

function FloatingLabels() {
  const labels = [
    { text: "Scalable", position: [-4, 2, -2] as [number, number, number] },
    { text: "Performant", position: [4, 1, -2] as [number, number, number] },
    {
      text: "Maintainable",
      position: [-4, -1, -2] as [number, number, number],
    },
    { text: "Tested", position: [4, -2, -2] as [number, number, number] },
  ];

  return (
    <>
      {labels.map((label, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={label.position}
            fontSize={0.3}
            color="#71717a"
            anchorX="center"
            anchorY="middle"
            // opacity={0.5}
          >
            {label.text}
          </Text>
        </Float>
      ))}
    </>
  );
}

function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, "#27272a", "#27272a"]}
      position={[0, -3, 0]}
    />
  );
}

export function BuildingBlocks() {
  return (
    <group>
      <StackVisualization />
      <FloatingLabels />
      <Grid />

      {/* Platform base */}
      <mesh position={[0, -3.5, 0]}>
        <boxGeometry args={[15, 0.5, 15]} />
        <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="#f97316"
        anchorX="center"
      >
        Full-Stack Architecture
      </Text>

      {/* Ambient particles */}
      <Particles />
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 10 - 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;

      const positionAttribute = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const y = positionAttribute.getY(i);
        positionAttribute.setY(i, y + 0.01);
        if (y > 7) {
          positionAttribute.setY(i, -3);
        }
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f97316"
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
