'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars() {
  const ref = useRef<THREE.Points>(null!);

  const sphere = useMemo(() => {
    const positions = new Float32Array(6000);
    for (let i = 0; i < 6000; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2.5;
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f59e0b"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15;
    glowRef.current.rotation.y += delta * 0.15;
  });

  return (
    <>
      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#0d0d0d"
          emissive="#1a1a1a"
          specular="#f59e0b"
          shininess={20}
          wireframe={false}
        />
      </mesh>

      {/* Globe wireframe overlay */}
      <mesh ref={meshRef} scale={1.001}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.003, 8, 128]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#d97706" />
    </>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Globe />
      <Stars />
    </Canvas>
  );
}
