import React, { useState, Suspense, lazy } from "react";
import {
  Code2,
  Database,
  BarChart3,
  Sparkles,
  Workflow,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SceneLoader } from "./SceneLoader";
import { WebGlFallback, isWebGLAvailable } from "./WebGlFallback";
import { useInView } from "../../hooks/useInView";

const TechnologyCoreScene = lazy(() => import("./TechnologyCoreScene"));

export interface SkillCategoryDef {
  index: string;
  title: string;
  icon: React.ElementType;
  description: string;
  tools: string[];
  telemetry: {
    runtime: string;
    usage: string;
    confidence: number;
  };
}

export const skillCategoriesData: SkillCategoryDef[] = [
  {
    index: "01",
    title: "Programming & Analysis",
    icon: Code2,
    description: "Core algorithmic data processing, tabular data manipulation, and exploratory data analysis.",
    tools: ["Python", "Pandas", "NumPy", "Data cleaning", "Exploratory data analysis"],
    telemetry: {
      runtime: "python_v3.12",
      usage: "vectorized_pipeline",
      confidence: 0.98,
    },
  },
  {
    index: "02",
    title: "Databases",
    icon: Database,
    description: "Relational data modeling, ACID transaction integrity, and performant SQL queries.",
    tools: ["SQL", "MySQL", "MySQL Workbench"],
    telemetry: {
      runtime: "mysql_relational",
      usage: "indexed_queries",
      confidence: 0.96,
    },
  },
  {
    index: "03",
    title: "Visualization & Reporting",
    icon: BarChart3,
    description: "Executive business dashboards, interactive drill-downs, and statistical plotting.",
    tools: ["Power BI", "DAX", "Microsoft Excel", "PivotTables", "Matplotlib", "Seaborn"],
    telemetry: {
      runtime: "power_bi_dax",
      usage: "executive_kpis",
      confidence: 0.99,
    },
  },
  {
    index: "04",
    title: "Statistics",
    icon: Sparkles,
    description: "Mathematical hypothesis validation, distribution estimation, and significance testing.",
    tools: ["Descriptive statistics", "Hypothesis testing"],
    telemetry: {
      runtime: "inferential_stats",
      usage: "variance_testing",
      confidence: 0.94,
    },
  },
  {
    index: "05",
    title: "Project Tools",
    icon: Workflow,
    description: "Iterative notebook workflows, machine learning model building, and rapid web application deployment.",
    tools: ["Jupyter Notebook", "Scikit-learn", "Streamlit"],
    telemetry: {
      runtime: "jupyter_sklearn",
      usage: "app_deployment",
      confidence: 0.97,
    },
  },
];

export function TechnicalSkillsSection() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const webGLSupported = isWebGLAvailable();

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeCategory = skillCategoriesData[activeIdx];

  return (
    <section
      ref={containerRef}
      className="p3d-section p3d-section--tinted"
      id="skills"
      aria-label="Technical skills and tools ecosystem"
    >
      <div className="p3d-ambient-glow p3d-ambient-glow--orange" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: "620px", height: "620px" }} />

      <div className="p3d-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="p3d-badge">
            <span className="pulse-dot" />
            TOOLS & TECHNOLOGIES · CENTRAL HUB
          </span>
          <h2 className="p3d-heading p3d-heading--centered">Technical skills.</h2>
          <p className="p3d-description p3d-description--centered">
            Skills and tools listed in my resume, grouped by engineering discipline. Powered by an interactive 3D technology core inspired by precision orbital systems.
          </p>
        </div>

        {/* 3-Column Central Orbit Ecosystem */}
        <div className="skills-interactive-layout">
          {/* LEFT COLUMN: Categories 01 & 02 */}
          <div className="skills-column">
            {skillCategoriesData.slice(0, 2).map((cat, i) => {
              const Icon = cat.icon;
              const actualIdx = i; // 0, 1
              const isActive = activeIdx === actualIdx;

              return (
                <article
                  key={cat.title}
                  className={`skills-category-card ${isActive ? "skills-category-card--active" : ""}`}
                  onClick={() => setActiveIdx(actualIdx)}
                  onMouseEnter={() => setHoveredIdx(actualIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIdx(actualIdx)}
                >
                  <div className="skills-category-header">
                    <div className="skills-category-icon">
                      <Icon size={20} />
                    </div>
                    <div className="skills-category-meta">
                      <span className="skills-category-num">{cat.index}</span>
                      <strong className="skills-category-title">{cat.title}</strong>
                    </div>
                  </div>
                  <div className="skills-tools-pills">
                    {cat.tools.map((tool) => (
                      <span key={tool} className="skills-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* CENTER: 3D Technology Core & Live Telemetry Card */}
          <div className="skills-center-core">
            <div className="skills-core-viewport">
              {/* Top HUD Tag */}
              <div className="p3d-hud-header">
                <div className="p3d-hud-tag">
                  <span className="pulse-dot" />
                  TECH CORE: <strong>ACTIVE</strong>
                </div>
                <div className="p3d-hud-tag">
                  GIMBAL ORBIT: <strong>SYNCHRONIZED</strong>
                </div>
              </div>

              {/* RTH-style Floating Live Data Telemetry Card */}
              <div className="skills-live-telemetry" aria-hidden="true">
                <div className="skills-telemetry-header">
                  <Terminal size={10} />
                  JSON · TELEMETRY
                </div>
                <div>{`{`}</div>
                <div style={{ paddingLeft: "10px" }}>{`"category": "${activeCategory.title.toLowerCase().replace(/ & /g, "_")}",`}</div>
                <div style={{ paddingLeft: "10px" }}>{`"runtime": "${activeCategory.telemetry.runtime}",`}</div>
                <div style={{ paddingLeft: "10px" }}>{`"confidence": ${activeCategory.telemetry.confidence},`}</div>
                <div style={{ paddingLeft: "10px" }}>{`"skills_count": ${activeCategory.tools.length}`}</div>
                <div>{`}`}</div>
              </div>

              {/* 3D Core Canvas / Fallback */}
              {webGLSupported ? (
                isInView ? (
                  <Suspense fallback={<SceneLoader label="Engaging 3D Technology Core..." />}>
                    <TechnologyCoreScene
                      activeCategoryIndex={activeIdx}
                      hoveredIndex={hoveredIdx}
                    />
                  </Suspense>
                ) : (
                  <SceneLoader label="Scene paused outside viewport" />
                )
              ) : (
                <WebGlFallback
                  title="3D Technology Ecosystem"
                  description="Interactive technology core illustrating five skill categories: Programming, Databases, Visualization, Statistics, and Project Tools."
                />
              )}

              {/* Bottom Hint */}
              <div className="p3d-hud-controls">
                <span style={{ fontSize: "11px", color: "var(--p3d-text-secondary)", fontWeight: 600 }}>
                  Click category to rotate core · Drag to inspect platform
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Categories 03, 04 & 05 */}
          <div className="skills-column">
            {skillCategoriesData.slice(2, 5).map((cat, i) => {
              const Icon = cat.icon;
              const actualIdx = i + 2; // 2, 3, 4
              const isActive = activeIdx === actualIdx;

              return (
                <article
                  key={cat.title}
                  className={`skills-category-card ${isActive ? "skills-category-card--active" : ""}`}
                  onClick={() => setActiveIdx(actualIdx)}
                  onMouseEnter={() => setHoveredIdx(actualIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIdx(actualIdx)}
                >
                  <div className="skills-category-header">
                    <div className="skills-category-icon">
                      <Icon size={20} />
                    </div>
                    <div className="skills-category-meta">
                      <span className="skills-category-num">{cat.index}</span>
                      <strong className="skills-category-title">{cat.title}</strong>
                    </div>
                  </div>
                  <div className="skills-tools-pills">
                    {cat.tools.map((tool) => (
                      <span key={tool} className="skills-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Selected Category Expanded Information Drawer */}
        <div className="skills-active-details" role="region" aria-label="Selected skill discipline details">
          <div className="skills-detail-main">
            <div className="skills-detail-badge">
              <CheckCircle2 size={24} />
            </div>
            <div className="skills-detail-info">
              <h4>
                {activeCategory.index} · {activeCategory.title}
              </h4>
              <p>{activeCategory.description}</p>
            </div>
          </div>
          <div className="skills-tools-pills" style={{ justifyContent: "flex-end" }}>
            {activeCategory.tools.map((tool) => (
              <span
                key={tool}
                className="skills-tool-chip"
                style={{
                  background: "var(--p3d-orange-tint)",
                  color: "var(--p3d-orange-primary)",
                  fontWeight: 700,
                  borderColor: "rgba(242, 98, 34, 0.3)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default TechnicalSkillsSection;
