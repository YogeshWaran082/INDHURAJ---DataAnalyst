import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  FileText,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Play,
  Pause,
  AlertTriangle,
  Flame,
  Radio,
  Cpu,
  Power,
  CheckCircle2,
} from "lucide-react";
import { SceneLoader } from "./SceneLoader";
import { WebGlFallback, isWebGLAvailable } from "./WebGlFallback";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Lazy load the 3D Canvas
const StoveSafetyScene = lazy(() => import("./StoveSafetyScene"));

interface SensorDef {
  id: string;
  title: string;
  sensorType: string;
  detail: string;
  icon: React.ElementType;
}

const sensorsList: SensorDef[] = [
  {
    id: "gas",
    title: "Gas leak",
    sensorType: "MQ-2 / MQ-5 Semiconductor",
    detail: "High-sensitivity combustible gas detection threshold monitoring",
    icon: Radio,
  },
  {
    id: "flame",
    title: "Flame & smoke",
    sensorType: "Optical IR & Photoelectric",
    detail: "Fast flame flicker detection with particulate smoke sensing",
    icon: Flame,
  },
  {
    id: "pir",
    title: "Human presence",
    sensorType: "PIR Pyroelectric Sensor",
    detail: "Monitors kitchen presence to detect unattended stove operation",
    icon: AlertTriangle,
  },
  {
    id: "shutoff",
    title: "Automatic shutoff",
    sensorType: "Relay & Solenoid Valve",
    detail: "Immediate electro-mechanical gas isolation when thresholds trip",
    icon: ShieldCheck,
  },
];

const simulationSteps = [
  { step: 1, label: "Hazard Detection", desc: "Sensor threshold tripped by gas/smoke", icon: AlertTriangle },
  { step: 2, label: "Arduino Logic", desc: "Microcontroller processes interrupt vector", icon: Cpu },
  { step: 3, label: "Relay Trigger", desc: "Optocoupler energizes shutoff relay circuit", icon: Power },
  { step: 4, label: "Valve Closure", desc: "Solenoid valve snaps closed within <150ms", icon: ShieldCheck },
  { step: 5, label: "Flame Extinguished", desc: "LPG fuel supply cut; burner flame drops to zero", icon: CheckCircle2 },
];

export function StoveSafetySection() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const webGLSupported = isWebGLAvailable();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeSensor, setActiveSensor] = useState<string>("gas");
  const [flameIntensity, setFlameIntensity] = useState<number>(1.0);
  const [valveClosed, setValveClosed] = useState<boolean>(false);

  const simulationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Simulation choreography
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const runSimulationLoop = () => {
      simulationTimerRef.current = setTimeout(() => {
        setActiveStep((prev) => {
          const next = prev >= 5 ? 1 : prev + 1;
          return next;
        });
      }, 2200);
    };

    runSimulationLoop();

    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, [activeStep, isPlaying, prefersReducedMotion]);

  // Sync flame and valve state with step
  useEffect(() => {
    if (activeStep >= 5) {
      setFlameIntensity(0);
      setValveClosed(true);
    } else if (activeStep === 4) {
      setFlameIntensity(0.25);
      setValveClosed(true);
    } else {
      setFlameIntensity(1.0);
      setValveClosed(false);
    }
  }, [activeStep]);

  const handleReplay = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setActiveStep(1);
    setFlameIntensity(1.0);
    setValveClosed(false);
    setIsPlaying(true);
  };

  const handleStepSelect = (step: number) => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setActiveStep(step);
    setIsPlaying(false);
  };

  const handleTriggerHazard = (sensorId: string) => {
    setActiveSensor(sensorId);
    handleReplay();
  };

  return (
    <section
      ref={containerRef}
      className="p3d-section p3d-section--tinted"
      id="engineering-project"
      aria-label="Smart multi-sensor stove safety system engineering showcase"
    >
      <div className="p3d-ambient-glow p3d-ambient-glow--orange" style={{ top: "15%", left: "10%", width: "450px", height: "450px" }} />
      <div className="p3d-ambient-glow p3d-ambient-glow--warm" style={{ bottom: "10%", right: "8%", width: "500px", height: "500px" }} />

      <div className="p3d-container">
        {/* Top 2-Column Showcase */}
        <div className="stove-section-grid">
          {/* LEFT: Project Narrative & Feature Cards */}
          <div className="stove-info-column">
            <span className="p3d-badge">
              <span className="pulse-dot" />
              ENGINEERING PROJECT · HARDWARE PROTOTYPE
            </span>
            <h2 className="p3d-heading">
              Smart multi-sensor<br />stove safety system.
            </h2>
            <p className="p3d-description">
              Developed and tested an integrated detection prototype with automatic electro-mechanical shutoff for LPG and biogas stoves. Engineered with fail-safe microcontrollers and multi-spectral sensors.
            </p>

            {/* 4 Feature Sensors Cards */}
            <div className="stove-sensors-grid" role="region" aria-label="Detection capabilities">
              {sensorsList.map((sensor) => {
                const Icon = sensor.icon;
                const isActive = activeSensor === sensor.id;
                const isTripped = isActive && activeStep >= 1 && activeStep < 4;

                return (
                  <article
                    key={sensor.id}
                    className={`stove-sensor-card ${isActive ? "stove-sensor-card--active" : ""} ${isTripped ? "stove-sensor-card--tripped" : ""}`}
                    onClick={() => handleTriggerHazard(sensor.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Test ${sensor.title} capability`}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTriggerHazard(sensor.id)}
                  >
                    <div className="stove-sensor-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <strong>{sensor.title}</strong>
                      <span>{sensor.sensorType}</span>
                    </div>
                    <div className="stove-sensor-status">
                      <span className="pulse-dot" style={{ width: "5px", height: "5px" }} />
                      {isActive && activeStep >= 4 ? "SYSTEM SECURED" : isTripped ? "ALERT SIGNAL" : "MONITORING"}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Simulation Timeline Scrubbing Panel */}
            <div className="stove-simulation-panel">
              <div className="stove-sim-header">
                <div className="stove-sim-title">
                  <Cpu size={16} className="text-orange" />
                  <span>Automatic Shutoff Sequence</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="p3d-ctrl-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    className="p3d-ctrl-btn p3d-ctrl-btn--primary"
                    onClick={handleReplay}
                    aria-label="Replay shutoff sequence"
                  >
                    <RotateCcw size={13} />
                    Replay Simulation
                  </button>
                </div>
              </div>

              {/* Step Progression Buttons */}
              <div className="stove-steps-progress" role="tablist" aria-label="Simulation steps">
                {simulationSteps.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    className={`stove-step-node ${activeStep === s.step ? "stove-step-node--active" : activeStep > s.step ? "stove-step-node--completed" : ""}`}
                    onClick={() => handleStepSelect(s.step)}
                    role="tab"
                    aria-selected={activeStep === s.step}
                  >
                    <span className="stove-step-num">STEP 0{s.step}</span>
                    <span className="stove-step-label">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Large Interactive 3D Scene Viewport */}
          <div className="stove-viewport-wrap">
            <div className="p3d-canvas-container" style={{ height: "100%" }}>
              {/* Telemetry HUD Top Bar */}
              <div className="p3d-hud-header">
                <div className="p3d-hud-tag">
                  <span className="pulse-dot" />
                  STATUS:{" "}
                  <strong>
                    {activeStep >= 4 ? "VALVE CLOSED · SECURED" : "ARMED · FLAME ACTIVE"}
                  </strong>
                </div>
                <div className="p3d-hud-tag">
                  LPG BURNER · <strong>3D REAL-TIME</strong>
                </div>
              </div>

              {/* 3D Scene / Fallback */}
              {webGLSupported ? (
                isInView ? (
                  <Suspense fallback={<SceneLoader label="Rendering 3D Stove Assembly..." />}>
                    <StoveSafetyScene
                      currentStep={activeStep}
                      isSimulating={isPlaying}
                      activeSensorId={activeSensor}
                      flameIntensity={flameIntensity}
                      valveClosed={valveClosed}
                    />
                  </Suspense>
                ) : (
                  <SceneLoader label="Scene paused outside viewport" />
                )
              ) : (
                <WebGlFallback
                  title="3D Engineering Burner View"
                  description="Hardware model demonstrating multi-sensor automatic shutoff logic with solenoid isolation valve and flame modulation."
                />
              )}

              {/* Bottom HUD Hint */}
              <div className="p3d-hud-controls">
                <span style={{ fontSize: "11px", color: "var(--p3d-text-secondary)", fontWeight: 600 }}>
                  Drag to rotate burner · Illustrative simulation · No live sensor readings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Full-width Published Research Panel */}
        <article className="stove-publication-panel" aria-label="Published research details">
          <div className="stove-pub-icon">
            <FileText size={26} />
          </div>
          <div className="stove-pub-content">
            <span className="stove-pub-tag">PUBLISHED RESEARCH</span>
            <h3 className="stove-pub-title">
              Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence Detection System with Automatic Shutoff for Biogas and LPG Stoves
            </h3>
            <p className="stove-pub-meta">
              International Research Journal on Advanced Engineering Hub (IRJAEH) · Volume 04, Issue 04 · April 2026
            </p>
          </div>
          <a
            href="https://doi.org/10.47392/IRJAEH.2026.0301"
            target="_blank"
            rel="noreferrer"
            className="stove-pub-link"
          >
            <span>View publication</span>
            <ArrowUpRight size={16} />
          </a>
        </article>
      </div>
    </section>
  );
}
export default StoveSafetySection;
