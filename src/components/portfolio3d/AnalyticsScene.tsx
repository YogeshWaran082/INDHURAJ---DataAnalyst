import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

export interface AnalyticsSceneProps {
  currentStage: number; // 1 to 5
}

// --------------------------------------------------------------------------
// 3D Spreadsheet Grid Matrix (Stage 1 & 2)
// --------------------------------------------------------------------------
function SpreadsheetGrid3D({ stage }: { stage: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 6x5 grid of data cells
  const cells = useMemo(() => {
    const list: { x: number; z: number; height: number; val: string; isHeader: boolean }[] = [];
    const cols = ["ID", "Region", "Category", "Sales", "Profit", "Qty"];
    for (let c = 0; c < 6; c++) {
      for (let r = 0; r < 5; r++) {
        const isHeader = r === 0;
        list.push({
          x: (c - 2.5) * 0.92,
          z: (r - 2) * 0.65,
          height: isHeader ? 0.08 : 0.04,
          val: isHeader ? cols[c] : `${Math.floor(Math.random() * 800 + 100)}`,
          isHeader,
        });
      }
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle hovering wave across grid
    if (stage <= 2) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    }
  });

  const isVisible = stage <= 3;
  if (!isVisible) return null;

  const opacity = stage === 3 ? 0.28 : 1.0;

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Table Backing Board */}
      <mesh receiveShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[5.8, 0.06, 3.6]} />
        <meshStandardMaterial
          color="#14110E"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Grid Border Accent */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[5.86, 0.02, 3.66]} />
        <meshStandardMaterial
          color="#FF6B0A"
          emissive="#FF6B0A"
          emissiveIntensity={0.6}
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>

      {/* Individual 3D Cells */}
      {cells.map((cell, idx) => (
        <group key={idx} position={[cell.x, 0.02, cell.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.85, cell.height, 0.58]} />
            <meshStandardMaterial
              color={cell.isHeader ? "#FF6B0A" : (idx % 2 === 0 ? "#1C1814" : "#241F1A")}
              metalness={0.5}
              roughness={0.35}
              transparent
              opacity={opacity}
            />
          </mesh>
          {/* Header Typography */}
          {cell.isHeader && (
            <Text
              position={[0, 0.06, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.16}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              {cell.val}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}

// --------------------------------------------------------------------------
// 3D Bar & Column Charts (Stage 3, 4, 5)
// --------------------------------------------------------------------------
function BarChart3D({ stage }: { stage: number }) {
  const barsRef = useRef<THREE.Group>(null);

  // Regional Sales & Profit Columns
  const bars = useMemo(() => [
    { label: "West", salesH: 2.1, profitH: 1.4, x: -1.8 },
    { label: "East", salesH: 1.85, profitH: 1.1, x: -0.6 },
    { label: "Central", salesH: 1.4, profitH: 0.85, x: 0.6 },
    { label: "South", salesH: 1.15, profitH: 0.7, x: 1.8 },
  ], []);

  useFrame(({ clock }) => {
    if (!barsRef.current) return;
    const t = clock.getElapsedTime();
    if (stage >= 3) {
      barsRef.current.rotation.y = Math.sin(t * 0.4) * 0.04;
    }
  });

  if (stage < 3) return null;

  return (
    <group ref={barsRef} position={[0, -0.3, 0]}>
      {/* Plinth Base */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.8, 3.0, 0.1, 48]} />
        <meshStandardMaterial color="#16120F" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Concentric Neon Rings */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.7, 48]} />
        <meshBasicMaterial color="#FF6B0A" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Columns */}
      {bars.map((bar, i) => {
        const growth = Math.min(1, (stage - 2) * 0.6 + 0.4);
        const actualSalesH = bar.salesH * growth;
        const actualProfitH = bar.profitH * growth;

        return (
          <group key={i} position={[bar.x, 0, 0]}>
            {/* Sales Bar (Primary Warm Orange with Emissive Glow) */}
            <mesh castShadow receiveShadow position={[-0.18, actualSalesH / 2, 0]}>
              <boxGeometry args={[0.32, actualSalesH, 0.32]} />
              <meshStandardMaterial
                color="#FF6B0A"
                emissive="#FF6B0A"
                emissiveIntensity={0.6}
                metalness={0.5}
                roughness={0.25}
              />
            </mesh>

            {/* Profit Bar (Bright Accent Peach/Gold) */}
            <mesh castShadow receiveShadow position={[0.18, actualProfitH / 2, 0]}>
              <boxGeometry args={[0.32, actualProfitH, 0.32]} />
              <meshStandardMaterial
                color="#FFA347"
                emissive="#FFA347"
                emissiveIntensity={0.4}
                metalness={0.55}
                roughness={0.3}
              />
            </mesh>

            {/* Region Label */}
            <Text
              position={[0, 0.12, 0.6]}
              rotation={[-Math.PI / 3, 0, 0]}
              fontSize={0.18}
              color="#F5F1EB"
              anchorX="center"
              anchorY="middle"
            >
              {bar.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// --------------------------------------------------------------------------
// 3D Line Chart & Power BI Dashboard Panels (Stage 4 & 5)
// --------------------------------------------------------------------------
function DashboardPanels3D({ stage }: { stage: number }) {
  const linePoints = useMemo(() => {
    const pts = [];
    const count = 24;
    for (let i = 0; i <= count; i++) {
      const x = (i / count - 0.5) * 4.4;
      const y = 0.8 + Math.sin(i * 0.4) * 0.4 + (i / count) * 0.5;
      const z = -1.2;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const curveGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(linePoints);
    return new THREE.TubeGeometry(curve, 48, 0.045, 12, false);
  }, [linePoints]);

  if (stage < 4) return null;

  return (
    <group position={[0, 0.2, 0]}>
      {/* 3D Dynamic Spline Revenue Line */}
      <mesh geometry={curveGeo} castShadow>
        <meshStandardMaterial
          color="#FF6B0A"
          emissive="#FF6B0A"
          emissiveIntensity={2.2}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Floating Smoked Glass Dashboard Frame */}
      <mesh position={[0, 1.2, -1.5]} receiveShadow>
        <boxGeometry args={[5.2, 2.6, 0.08]} />
        <meshStandardMaterial
          color="#14110E"
          transparent
          opacity={0.88}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Frame Border Accent */}
      <mesh position={[0, 1.2, -1.45]}>
        <boxGeometry args={[5.26, 2.66, 0.02]} />
        <meshStandardMaterial
          color="#FF6B0A"
          emissive="#FF6B0A"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating DAX / Power BI Badge */}
      <group position={[-1.7, 2.1, -1.35]}>
        <mesh>
          <boxGeometry args={[1.3, 0.38, 0.06]} />
          <meshStandardMaterial color="#F26222" roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          POWER BI + DAX
        </Text>
      </group>

      {/* Floating KPI Stat Block */}
      <group position={[1.5, 2.1, -1.35]}>
        <mesh>
          <boxGeometry args={[1.6, 0.38, 0.06]} />
          <meshStandardMaterial color="#111111" roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          9,994 RECORDS
        </Text>
      </group>
    </group>
  );
}

// --------------------------------------------------------------------------
// Root Analytics Scene Canvas
// --------------------------------------------------------------------------
export default function AnalyticsScene({ currentStage }: AnalyticsSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3.6, 5.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 5, -3]} intensity={0.6} color="#E0F2FE" />
      <directionalLight position={[0, -3, 2]} intensity={0.2} color="#FFF0E6" />

      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.12}>
        <SpreadsheetGrid3D stage={currentStage} />
        <BarChart3D stage={currentStage} />
        <DashboardPanels3D stage={currentStage} />
      </Float>

      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.38}
        scale={9}
        blur={2.4}
        far={3.5}
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
