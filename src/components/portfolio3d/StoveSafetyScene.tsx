import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export interface StoveSceneProps {
  currentStep: number; // 1 to 5
  isSimulating: boolean;
  activeSensorId: string | null;
  flameIntensity: number; // 0 to 1
  valveClosed: boolean;
}

// --------------------------------------------------------------------------
// Realist 3D Stove Burner Assembly
// --------------------------------------------------------------------------
function StoveBurnerModel({ flameIntensity, valveClosed }: { flameIntensity: number; valveClosed: boolean }) {
  const flameGroupRef = useRef<THREE.Group>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);

  // Procedural flame jets (36 radial flame nozzles around burner)
  const flameJets = useMemo(() => {
    const jets: { position: [number, number, number]; angle: number }[] = [];
    const count = 36;
    const radius = 1.32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      jets.push({ position: [x, 0.46, z], angle });
    }
    return jets;
  }, []);

  // Frame loop for organic flame flicker
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flameGroupRef.current) {
      const flicker = flameIntensity > 0.05 ? 1 + Math.sin(t * 18) * 0.04 + Math.cos(t * 26) * 0.03 : 0;
      flameGroupRef.current.scale.set(
        flameIntensity * flicker,
        flameIntensity * (flicker * 1.1),
        flameIntensity * flicker
      );
    }
    if (flameLightRef.current) {
      flameLightRef.current.intensity = flameIntensity * (1.8 + Math.sin(t * 15) * 0.2);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. DARK GUNMETAL TITANIUM COOKTOP TRAY */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.8, 3.1, 0.22, 64]} />
        <meshStandardMaterial
          color="#1C1E22"
          metalness={0.94}
          roughness={0.24}
        />
      </mesh>
      {/* Recessed Spill Ring */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[2.3, 2.45, 0.12, 64]} />
        <meshStandardMaterial
          color="#141619"
          metalness={0.92}
          roughness={0.28}
        />
      </mesh>

      {/* 2. CAST IRON PAN SUPPORT GRATE (4 HEAVY PRONGS) */}
      <group position={[0, 0.12, 0]}>
        {/* Grate Center Ring */}
        <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
          <torusGeometry args={[1.75, 0.07, 16, 48]} />
          <meshStandardMaterial color="#212326" roughness={0.78} metalness={0.85} />
        </mesh>
        {/* 4 Radiating Heavy Grate Prongs */}
        {[0, 90, 180, 270].map((deg) => (
          <group key={deg} rotation={[0, (deg * Math.PI) / 180, 0]}>
            {/* Main finger arm */}
            <mesh castShadow receiveShadow position={[1.4, 0.24, 0]}>
              <boxGeometry args={[1.4, 0.14, 0.16]} />
              <meshStandardMaterial color="#212326" roughness={0.78} metalness={0.85} />
            </mesh>
            {/* Raised outer pan stop */}
            <mesh castShadow receiveShadow position={[2.05, 0.4, 0]}>
              <boxGeometry args={[0.16, 0.22, 0.16]} />
              <meshStandardMaterial color="#1E2023" roughness={0.8} metalness={0.85} />
            </mesh>
          </group>
        ))}
        {/* Outer Grate Support Ring */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <torusGeometry args={[2.55, 0.065, 16, 64]} />
          <meshStandardMaterial color="#212326" roughness={0.8} metalness={0.85} />
        </mesh>
      </group>

      {/* 3. BURNER BASE & FLAME HEAD */}
      {/* Burner Cup / Base */}
      <mesh castShadow receiveShadow position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.2, 1.45, 0.32, 48]} />
        <meshStandardMaterial color="#3A3E44" metalness={0.88} roughness={0.38} />
      </mesh>
      {/* Precision Brass Flame Crown with Port Ring */}
      <mesh castShadow receiveShadow position={[0, 0.34, 0]}>
        <cylinderGeometry args={[1.36, 1.25, 0.18, 48]} />
        <meshStandardMaterial color="#D19C4C" metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Burner Cap (Black Enameled Steel Disc) */}
      <mesh castShadow receiveShadow position={[0, 0.46, 0]}>
        <cylinderGeometry args={[1.28, 1.34, 0.08, 48]} />
        <meshStandardMaterial color="#151719" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Brass Center Cap Detail */}
      <mesh castShadow position={[0, 0.51, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 32]} />
        <meshStandardMaterial color="#C8963E" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* 4. SOLENOID SAFETY VALVE ASSEMBLY & GAS PIPING */}
      <group position={[0, -0.22, 1.85]}>
        {/* Brass Gas Feed Pipe */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, -0.8]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1.6, 24]} />
          <meshStandardMaterial color="#C6934B" metalness={0.92} roughness={0.3} />
        </mesh>
        {/* Solenoid Valve Body (Brass Manifold) */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.55, 0.45, 0.65]} />
          <meshStandardMaterial color="#D4A153" metalness={0.9} roughness={0.28} />
        </mesh>
        {/* Solenoid Electromagnetic Actuator Cylinder */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.45, 32]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Solenoid Status LED Indicator */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={valveClosed ? "#EF4444" : "#10B981"}
            emissive={valveClosed ? "#EF4444" : "#10B981"}
            emissiveIntensity={valveClosed ? 3.0 : 2.0}
            roughness={0.2}
          />
        </mesh>
        {/* Inlet Hex Brass Nut */}
        <mesh position={[0, 0.1, 0.38]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.16, 6]} />
          <meshStandardMaterial color="#BA873B" metalness={0.94} roughness={0.25} />
        </mesh>
      </group>

      {/* 5. REALISTIC MULTI-RING BLUE FLAME */}
      <group ref={flameGroupRef}>
        {/* Radial Blue Flame Jets */}
        {flameJets.map((jet, idx) => (
          <group key={idx} position={jet.position} rotation={[0, -jet.angle + Math.PI / 2, 0]}>
            {/* Outer bright cyan flame cone */}
            <mesh position={[0, 0.12, 0]}>
              <coneGeometry args={[0.07, 0.26, 12]} />
              <meshBasicMaterial
                color="#00D2FF"
                transparent
                opacity={0.78 * flameIntensity}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Inner electric blue core */}
            <mesh position={[0, 0.08, 0]}>
              <coneGeometry args={[0.045, 0.17, 10]} />
              <meshBasicMaterial
                color="#2979FF"
                transparent
                opacity={0.92 * flameIntensity}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}

        {/* Continuous Soft Ambient Flame Ring */}
        <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 1.5, 48]} />
          <meshBasicMaterial
            color="#00B0FF"
            transparent
            opacity={0.45 * flameIntensity}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Blue Flame Glow Illumination */}
      <pointLight
        ref={flameLightRef}
        position={[0, 0.7, 0]}
        color="#00E5FF"
        distance={4.2}
        decay={2}
      />
    </group>
  );
}

// --------------------------------------------------------------------------
// 3D Orbital Signal Nodes and Data Pulses
// --------------------------------------------------------------------------
function OrbitalSystemDiagram({
  currentStep,
  activeSensorId,
}: {
  currentStep: number;
  activeSensorId: string | null;
}) {
  const pulsePacketRef = useRef<THREE.Mesh>(null);

  // 6 System Nodes placed in orbit around the stove
  const nodes = useMemo(
    () => [
      { id: "gas", label: "MQ Gas Sensor", angle: 0, iconColor: "#F26222", step: 1 },
      { id: "flame", label: "Optical Flame", angle: (Math.PI * 1) / 3, iconColor: "#F26222", step: 1 },
      { id: "pir", label: "PIR Presence", angle: (Math.PI * 2) / 3, iconColor: "#F26222", step: 1 },
      { id: "arduino", label: "Arduino Logic", angle: Math.PI, iconColor: "#0284C7", step: 2 },
      { id: "relay", label: "5V Relay Switch", angle: (Math.PI * 4) / 3, iconColor: "#F59E0B", step: 3 },
      { id: "solenoid", label: "Solenoid Valve", angle: (Math.PI * 5) / 3, iconColor: "#EF4444", step: 4 },
    ],
    []
  );

  const orbitRadius = 3.8;

  // Signal packet travel along orbit during simulation
  useFrame(({ clock }) => {
    if (!pulsePacketRef.current) return;
    const t = clock.getElapsedTime() * 1.5;
    const currentAngle = (t % (Math.PI * 2));
    pulsePacketRef.current.position.set(
      Math.cos(currentAngle) * orbitRadius,
      0.15 + Math.sin(t * 3) * 0.08,
      Math.sin(currentAngle) * orbitRadius
    );
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Orbital Circular Track */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 96]} />
        <meshBasicMaterial color="#FF6B0A" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      {/* Dashed outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <ringGeometry args={[orbitRadius + 0.38, orbitRadius + 0.4, 64]} />
        <meshBasicMaterial color="#FF6B0A" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      {/* Moving Signal Pulse Photon */}
      <mesh ref={pulsePacketRef}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial
          color="#FF6B0A"
          emissive="#FF6B0A"
          emissiveIntensity={4.0}
          roughness={0.1}
        />
        <pointLight color="#FF6B0A" intensity={1.8} distance={2.4} />
      </mesh>

      {/* Floating 3D Nodes */}
      {nodes.map((node) => {
        const x = Math.cos(node.angle) * orbitRadius;
        const z = Math.sin(node.angle) * orbitRadius;
        const isHighlighted =
          currentStep >= node.step ||
          (activeSensorId && activeSensorId.includes(node.id));

        return (
          <group key={node.id} position={[x, 0.1, z]}>
            {/* Base anchor pin */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2, 12]} />
              <meshBasicMaterial color="#2B231B" />
            </mesh>
            {/* Glowing node sphere */}
            <mesh position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <meshStandardMaterial
                color={isHighlighted ? "#FF6B0A" : "#1E1A16"}
                emissive={isHighlighted ? "#FF6B0A" : "#0D0A08"}
                emissiveIntensity={isHighlighted ? 2.4 : 0.05}
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
            {/* Node Halo Ring */}
            {isHighlighted && (
              <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.26, 0.32, 32]} />
                <meshBasicMaterial color="#FF651C" transparent opacity={0.7} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// --------------------------------------------------------------------------
// Root Canvas Component
// --------------------------------------------------------------------------
export default function StoveSafetyScene({
  currentStep,
  isSimulating,
  activeSensorId,
  flameIntensity,
  valveClosed,
}: StoveSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4.4, 5.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 4, -4]} intensity={0.65} color="#E0F2FE" />
      <directionalLight position={[0, 5, -6]} intensity={0.45} color="#FFF7ED" />

      {/* Gentle Floating Interaction */}
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <StoveBurnerModel
          flameIntensity={flameIntensity}
          valveClosed={valveClosed}
        />
        <OrbitalSystemDiagram
          currentStep={currentStep}
          activeSensorId={activeSensorId}
        />
      </Float>

      {/* Soft Contact Ground Shadow */}
      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.42}
        scale={10}
        blur={2.2}
        far={4}
      />

      {/* Controlled Smooth Orbit Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        dampingFactor={0.05}
        autoRotate={!isSimulating && currentStep === 1}
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
