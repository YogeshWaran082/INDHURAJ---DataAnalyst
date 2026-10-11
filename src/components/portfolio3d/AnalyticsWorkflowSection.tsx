import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Database,
  Workflow,
  BarChart3,
  Layers3,
  Network,
  RotateCcw,
  Play,
  Pause,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";
import { SceneLoader } from "./SceneLoader";
import { WebGlFallback, isWebGLAvailable } from "./WebGlFallback";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const AnalyticsScene = lazy(() => import("./AnalyticsScene"));

export interface PipelineStageDef {
  number: string;
  name: string;
  icon: React.ElementType;
  description: string;
  tools: string[];
  insight: string;
}

export const pipelineStagesData: PipelineStageDef[] = [
  {
    number: "01",
    name: "Sales records",
    icon: Database,
    description: "9,994 sales records",
    tools: ["Sales", "Profit", "Quantity"],
    insight: "Multi-year transactional data with regional customer demographics and shipping metrics.",
  },
  {
    number: "02",
    name: "Preparation",
    icon: Workflow,
    description: "Cleaned and organized",
    tools: ["Microsoft Excel"],
    insight: "Data hygiene, column typing, duplicate elimination, and standardized categorical schemas.",
  },
  {
    number: "03",
    name: "Analysis",
    icon: BarChart3,
    description: "Performance and trends",
    tools: ["KPIs", "PivotTables"],
    insight: "Aggregated profit margin analysis, discount impact studies, and segment correlations.",
  },
  {
    number: "04",
    name: "Visualization",
    icon: Layers3,
    description: "Interactive exploration",
    tools: ["Charts", "Filters"],
    insight: "Interactive drill-down charts, regional map slices, and dynamic category slicers.",
  },
  {
    number: "05",
    name: "Reporting",
    icon: Network,
    description: "Business performance views",
    tools: ["Power BI", "DAX"],
    insight: "Executive decision dashboards with dynamic DAX time-intelligence calculations.",
  },
];

export function AnalyticsWorkflowSection() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const webGLSupported = isWebGLAvailable();

  const [activeStage, setActiveStage] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    timerRef.current = setTimeout(() => {
      setActiveStage((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 3200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStage, isPlaying, prefersReducedMotion]);

  const handleSelectStage = (stageNum: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveStage(stageNum);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveStage(1);
    setIsPlaying(true);
  };

  return (
    <section
      ref={containerRef}
      className="p3d-section"
      id="pipeline"
      aria-label="Sales analytics workflow: From sales data to clear insights"
    >
      <div className="p3d-ambient-glow p3d-ambient-glow--orange" style={{ top: "25%", right: "12%", width: "480px", height: "480px" }} />
      <div className="p3d-ambient-glow p3d-ambient-glow--warm" style={{ bottom: "5%", left: "8%", width: "520px", height: "520px" }} />

      <div className="p3d-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="p3d-badge">
            <span className="pulse-dot" />
            ANALYSIS WORKFLOW · END-TO-END PROCESS
          </span>
          <h2 className="p3d-heading p3d-heading--centered">
            From sales data<br />to clear insights.
          </h2>
          <p className="p3d-description p3d-description--centered">
            A workflow based on the Excel sales analysis and Power BI capstone in my portfolio. Transforming raw multi-dimensional commerce records into actionable executive intelligence.
          </p>
        </div>

        {/* 5-Stage Process Selector */}
        <div className="analytics-stages-nav" role="tablist" aria-label="Workflow stages">
          {pipelineStagesData.map((stage, idx) => {
            const Icon = stage.icon;
            const stageNum = idx + 1;
            const isActive = activeStage === stageNum;

            return (
              <button
                key={stage.name}
                type="button"
                className={`analytics-stage-pill ${isActive ? "analytics-stage-pill--active" : ""}`}
                onClick={() => handleSelectStage(stageNum)}
                role="tab"
                aria-selected={isActive}
              >
                <div className="analytics-stage-top">
                  <span className="analytics-stage-num">{stage.number}</span>
                  <div className="analytics-stage-icon">
                    <Icon size={18} />
                  </div>
                </div>
                <strong className="analytics-stage-title">{stage.name}</strong>
                <span className="analytics-stage-desc">{stage.description}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Analytics Environment Canvas Viewport */}
        <div className="analytics-viewport-wrap">
          <div className="p3d-canvas-container" style={{ height: "100%" }}>
            {/* Top Telemetry Header */}
            <div className="p3d-hud-header">
              <div className="p3d-hud-tag">
                <span className="pulse-dot" />
                STAGE 0{activeStage}:{" "}
                <strong>{pipelineStagesData[activeStage - 1].name.toUpperCase()}</strong>
              </div>
              <div className="p3d-hud-tag">
                <span>FOCUS:</span>{" "}
                <strong>{pipelineStagesData[activeStage - 1].tools.join(" · ")}</strong>
              </div>
            </div>

            {/* 3D Canvas / Fallback */}
            {webGLSupported ? (
              isInView ? (
                <Suspense fallback={<SceneLoader label="Building 3D Analytical Environment..." />}>
                  <AnalyticsScene currentStage={activeStage} />
                </Suspense>
              ) : (
                <SceneLoader label="Scene paused outside viewport" />
              )
            ) : (
              <WebGlFallback
                title="3D Data Storytelling Environment"
                description="Visualizing the transformation of 9,994 transaction rows through Excel cleansing and Power BI DAX modelling into interactive KPI dashboards."
              />
            )}

            {/* Bottom Controls */}
            <div className="p3d-hud-controls">
              <button
                type="button"
                className="p3d-ctrl-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause workflow" : "Play workflow"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                {isPlaying ? "Pause Story" : "Resume Story"}
              </button>
              <button
                type="button"
                className="p3d-ctrl-btn p3d-ctrl-btn--primary"
                onClick={handleRestart}
                aria-label="Restart analysis sequence"
              >
                <RotateCcw size={13} />
                Restart Process
              </button>
            </div>
          </div>
        </div>

        {/* Project Evidence & KPIs Banner */}
        <div className="analytics-kpis-grid" role="region" aria-label="Project evidence">
          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <FileSpreadsheet size={22} />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">9,994</span>
              <span className="analytics-kpi-label">Sales records analyzed & normalized</span>
            </div>
          </article>

          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <Workflow size={22} />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">Microsoft Excel</span>
              <span className="analytics-kpi-label">Interactive dashboard & PivotTable filters</span>
            </div>
          </article>

          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <TrendingUp size={22} />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">Power BI + DAX</span>
              <span className="analytics-kpi-label">Sales analytics capstone reporting</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
export default AnalyticsWorkflowSection;
