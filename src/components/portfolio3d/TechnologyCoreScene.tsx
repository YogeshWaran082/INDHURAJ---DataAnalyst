import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

export interface TechnologyCoreProps {
  activeCategoryIndex: number; // 0 to 4
  hoveredIndex: number | null;
}

// --------------------------------------------------------------------------
// Precision Engineered 3D Technology Core (RTH-Inspired)
// --------------------------------------------------------------------------
function TechnologyCoreMesh({
  activeCategoryIndex,
  hoveredIndex,
}: {
  activeCategoryIndex: number;
  hoveredIndex: number | null;
}) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const coreGlowLightRef = useRef<THREE.PointLight>(null);

  // Active target orientation based on selected category (5 directions: 72deg each)
  const targetAngle = (activeCategoryIndex / 5) * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slow, sophisticated orbital rotations for gimbal rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.18;
      outerRingRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.28;
      innerRingRef.current.rotation.z = Math.cos(t * 0.15) * 0.09;
    }

    // Core smoothly rotates towards the active category
    if (coreRef.current) {
      coreRef.current.rotation.y = THREE.MathUtils.lerp(
        coreRef.current.rotation.y,
        targetAngle,
        0.05
      );
    }

    // Breathing pulse for orange core light
    if (coreGlowLightRef.current) {
      const isHovered = hoveredIndex !== null;
      const baseIntensity = isHovered ? 2.4 : 1.8;
      coreGlowLightRef.current.intensity = baseIntensity + Math.sin(t * 3) * 0.3;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* 1. LOWER METALLIC PLATFORM */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.22, 64]} />
        <meshStandardMaterial
          color="#16181C"
          metalness={0.94}
          roughness={0.22}
        />
      </mesh>

      {/* Recessed Concentric Etched Tracks */}
      <mesh receiveShadow position={[0, -0.03, 0]}>
        <cylinderGeometry args={[2.2, 2.35, 0.04, 64]} />
        <meshStandardMaterial color="#111317" metalness={0.88} roughness={0.3} />
      </mesh>

      {/* Warm Orange Illuminated Ground Ring */}
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.85, 64]} />
        <meshBasicMaterial
          color="#FF6B0A"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. INNER GIMBAL & PRECISION RINGS */}
      <group ref={outerRingRef} position={[0, 0.6, 0]}>
        {/* Outer Precision Track Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.9, 0.045, 16, 64]} />
          <meshStandardMaterial color="#2E3440" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* 4 Equatorial Sensor Nodes on Outer Ring */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.9, 0, Math.sin(angle) * 1.9]}
          >
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#FF6B0A"
              emissive="#FF6B0A"
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      <group ref={innerRingRef} position={[0, 0.6, 0]}>
        {/* Inner Counter-Rotating Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.45, 0.038, 16, 48]} />
          <meshStandardMaterial color="#3B4252" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* 3. CENTRAL INTELLIGENCE CORE */}
      <group ref={coreRef} position={[0, 0.6, 0]}>
        {/* Translucent Cylindrical Technical Core Housing */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.9, 1.1, 48]} />
          <meshPhysicalMaterial
            color="#14110E"
            transparent
            opacity={0.7}
            roughness={0.15}
            metalness={0.4}
            transmission={0.65}
            ior={1.45}
          />
        </mesh>

        {/* Internal Luminous Energy Core */}
        <mesh>
          <octahedronGeometry args={[0.42, 2]} />
          <meshStandardMaterial
            color="#FF6B0A"
            emissive="#FF6B0A"
            emissiveIntensity={3.6}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Top Metallic Cap */}
        <mesh position={[0, 0.58, 0]} castShadow>
          <cylinderGeometry args={[0.82, 0.9, 0.08, 48]} />
          <meshStandardMaterial color="#14181F" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.63, 0]}>
          <cylinderGeometry args={[0.25, 0.28, 0.04, 32]} />
          <meshStandardMaterial color="#FF6B0A" emissive="#FF6B0A" emissiveIntensity={1.8} />
        </mesh>

        {/* Bottom Metallic Base Fitting */}
        <mesh position={[0, -0.58, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.82, 0.08, 48]} />
          <meshStandardMaterial color="#14181F" metalness={0.92} roughness={0.22} />
        </mesh>

        {/* 3D Core Labels */}
        <Text
          position={[0, 0.12, 0.92]}
          fontSize={0.12}
          color="#F5F1EB"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          CORE ENGINE
        </Text>
        <Text
          position={[0, -0.1, 0.92]}
          fontSize={0.09}
          color="#FF6B0A"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          DATA ECOSYSTEM
        </Text>
      </group>

      {/* 4. 5 RAY CONNECTION BEAMS TO ORBITING CATEGORIES */}
      {[0, 1, 2, 3, 4].map((idx) => {
        const angle = (idx / 5) * Math.PI * 2;
        const isTarget = activeCategoryIndex === idx;
        const length = 2.4;
        const x = Math.cos(angle) * (length / 2 + 0.9);
        const z = Math.sin(angle) * (length / 2 + 0.9);

        return (
          <group
            key={idx}
            position={[x, 0.02, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <mesh>
              <boxGeometry args={[0.035, 0.02, length]} />
              <meshBasicMaterial
                color={isTarget ? "#FF6B0A" : "#2E241D"}
                transparent
                opacity={isTarget ? 0.95 : 0.35}
              />
            </mesh>
          </group>
        );
      })}

      {/* Internal Core Warm Light */}
      <pointLight
        ref={coreGlowLightRef}
        position={[0, 0.6, 0]}
        color="#FF651C"
        distance={4.8}
        decay={2}
      />
    </group>
  );
}

// --------------------------------------------------------------------------
// Root Canvas Component
// --------------------------------------------------------------------------
export default function TechnologyCoreScene({
  activeCategoryIndex,
  hoveredIndex,
}: TechnologyCoreProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4.2, 5.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.88} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 4, -4]} intensity={0.65} color="#E0F2FE" />
      <directionalLight position={[0, -2, 3]} intensity={0.3} color="#FFF7ED" />

      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.12}>
        <TechnologyCoreMesh
          activeCategoryIndex={activeCategoryIndex}
          hoveredIndex={hoveredIndex}
        />
      </Float>

      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.36}
        scale={8.5}
        blur={2.2}
        far={3.8}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        dampingFactor={0.05}
        autoRotate={false}
      />
    </Canvas>
  );
}
