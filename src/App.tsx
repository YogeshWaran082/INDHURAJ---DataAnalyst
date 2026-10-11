import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Download,
  FileText,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { filterProjects, type Project, type ProjectFilter } from "./projectFilters";
import { contactSchema, type ContactValues } from "./contactValidation";
import { StoveSafetySection } from "./components/portfolio3d/StoveSafetySection";
import { AnalyticsWorkflowSection } from "./components/portfolio3d/AnalyticsWorkflowSection";
import { TechnicalSkillsSection } from "./components/portfolio3d/TechnicalSkillsSection";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    title: "Sales Performance Analysis and Interactive Excel Dashboard",
    category: "Data Analytics",
    description: "Analyzed 9,994 sales records across sales, profit, quantity and profit margin, with category, state and monthly views.",
    problem: "Make sales and profitability patterns easier to inspect across product categories, states and monthly trends.",
    contribution: "Cleaned and organized the records, then built PivotTables, KPI calculations, charts and interactive filters.",
    stack: ["Microsoft Excel", "PivotTables", "KPI calculations", "Charts", "Interactive filters"],
    accent: "pipeline",
  },
  {
    title: "Power BI Sales Analytics Capstone",
    category: "Data Analytics",
    description: "Built an interactive view of revenue, profit, cost, orders, customers, products and regional performance.",
    problem: "Bring key sales and profitability measures together in an interactive dashboard.",
    contribution: "Developed the dashboard and DAX measures for year-to-date revenue, previous-month revenue, month-over-month growth and profitability.",
    stack: ["Power BI", "DAX", "Sales analytics"],
    accent: "analytics",
  },
  {
    title: "Tamil Movie Recommendation System",
    category: "Data Science",
    description: "A deployed interactive application that recommends Tamil movies from movie and rating data.",
    problem: "Use Tamil movie and rating data to provide movie recommendations through an interactive application.",
    contribution: "Processed the data with Pandas, implemented recommendations with Scikit-learn, built the Streamlit interface and deployed the application online.",
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    accent: "document",
  },
];

const skillGroups: {
  title: string;
  icon: LucideIcon;
  tools: string[];
}[] = [
  { title: "Programming & analysis", icon: Code2, tools: ["Python", "Pandas", "NumPy", "Data cleaning", "Exploratory data analysis"] },
  { title: "Databases", icon: Database, tools: ["SQL", "MySQL", "MySQL Workbench"] },
  { title: "Visualization & reporting", icon: BarChart3, tools: ["Power BI", "DAX", "Microsoft Excel", "PivotTables", "Matplotlib", "Seaborn"] },
  { title: "Statistics", icon: Sparkles, tools: ["Descriptive statistics", "Hypothesis testing"] },
  { title: "Project tools", icon: Workflow, tools: ["Jupyter Notebook", "Scikit-learn", "Streamlit"] },
];

const pipelineStages = [
  { name: "Sales records", icon: Database, description: "9,994 sales records", tools: ["Sales", "Profit", "Quantity"] },
  { name: "Preparation", icon: Workflow, description: "Cleaned and organized", tools: ["Microsoft Excel"] },
  { name: "Analysis", icon: BarChart3, description: "Performance and trends", tools: ["KPIs", "PivotTables"] },
  { name: "Visualization", icon: Layers3, description: "Interactive exploration", tools: ["Charts", "Filters"] },
  { name: "Reporting", icon: Network, description: "Business performance views", tools: ["Power BI", "DAX"] },
];

const capabilities: { label: string; icon: LucideIcon }[] = [
  { label: "Python", icon: Code2 },
  { label: "SQL", icon: Database },
  { label: "Power BI", icon: BarChart3 },
  { label: "Excel", icon: Layers3 },
  { label: "Statistics", icon: ShieldCheck },
  { label: "Machine Learning", icon: Sparkles },
];

type ContactState = "idle" | "success" | "unavailable" | "failure";

function FlowingBackdrop({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<SVGGElement>(null);
  const pointerRef = useRef<SVGGElement>(null);
  const scrollRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    const section = root?.parentElement;
    const drift = driftRef.current;
    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    if (!root || !section || !drift || !pointer || !scroll) return;

    let inView = false;
    const motion = gsap.to(drift, { x: 34, y: -18, duration: 24, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
    const movePointerX = gsap.quickTo(pointer, "x", { duration: 1.1, ease: "power2.out" });
    const movePointerY = gsap.quickTo(pointer, "y", { duration: 1.1, ease: "power2.out" });
    const moveScrollX = gsap.quickTo(scroll, "x", { duration: 0.7, ease: "power1.out" });
    const moveScrollY = gsap.quickTo(scroll, "y", { duration: 0.7, ease: "power1.out" });
    const isPageVisible = () => document.visibilityState === "visible";
    const syncMotion = () => {
      if (inView && isPageVisible()) motion.play();
      else {
        motion.pause();
        gsap.killTweensOf([pointer, scroll]);
        gsap.set([pointer, scroll], { x: 0, y: 0 });
      }
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncMotion();
      }, { threshold: 0.01 })
      : null;
    if (observer) observer.observe(section);
    else inView = true;

    const onPointerMove = (event: PointerEvent) => {
      if (!inView || !isPageVisible() || !window.matchMedia("(pointer: fine)").matches) return;
      const bounds = section.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
      const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5;
      movePointerX(Math.max(-1, Math.min(1, x)) * 16);
      movePointerY(Math.max(-1, Math.min(1, y)) * 12);
    };
    const onPointerLeave = () => {
      movePointerX(0);
      movePointerY(0);
    };
    const onScroll = (self: ScrollTrigger) => {
      if (!inView || !isPageVisible()) return;
      moveScrollX((self.progress - 0.5) * 46);
      moveScrollY((0.5 - self.progress) * 24);
    };
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: onScroll,
    });

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", syncMotion);

    return () => {
      observer?.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", syncMotion);
      scrollTrigger.kill();
      motion.kill();
      gsap.killTweensOf([pointer, scroll]);
    };
  }, []);

  return (
    <div className={`flowing-backdrop${className ? ` ${className}` : ""}`} ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="none">
        <g ref={driftRef} className="flowing-backdrop__band flowing-backdrop__band--drift">
          <path d="M-140 526 C105 351 223 265 402 364 C568 456 615 611 814 536 C1020 457 1119 178 1580 286" />
          <path d="M-130 571 C113 396 247 313 422 410 C587 501 632 654 830 581 C1034 504 1141 223 1590 331" />
        </g>
        <g ref={pointerRef} className="flowing-backdrop__band flowing-backdrop__band--pointer">
          <path d="M-180 360 C108 526 259 626 480 501 C686 384 697 190 898 254 C1092 316 1232 570 1580 501" />
          <path d="M-180 393 C104 559 260 661 481 535 C690 416 701 225 900 288 C1096 350 1235 604 1585 534" />
        </g>
        <g ref={scrollRef} className="flowing-backdrop__band flowing-backdrop__band--scroll">
          <path d="M-160 685 C183 589 306 436 499 424 C709 410 825 703 1018 668 C1212 633 1291 418 1600 405" />
          <path d="M-160 716 C186 619 312 468 502 456 C713 442 830 734 1022 700 C1218 665 1295 449 1600 436" />
        </g>
      </svg>
      <span className="flowing-backdrop__shade" />
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? " brand--compact" : ""}`} href="#home" aria-label="Indhuraj L, Data Analyst — home">
      <img className="brand__mark" src="/images/indhuraj-il-mark.png" alt="" aria-hidden="true" width="747" height="747" fetchPriority="high" />
      <span className="brand__words"><strong>INDHURAJ L</strong><span>DATA ANALYST</span></span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
}) {
  return (
    <header className={`section-heading reveal${centered ? " section-heading--center" : ""}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </header>
  );
}

function StatusPill({ children }: { children: ReactNode }) {
  return <span className="status-pill"><span className="status-pill__dot" />{children}</span>;
}

type BadgePosition = { x: number; y: number; rotation: number };

export function LanyardBadge() {
  const [position, setPosition] = useState<BadgePosition>({ x: 0, y: 0, rotation: 0 });
  const [dragging, setDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  const pointerRef = useRef({ id: -1, x: 0, y: 0, lastX: 0, lastY: 0, originX: 0, originY: 0, lastTime: 0, vx: 0, vy: 0 });
  const velocityRef = useRef({ x: 0, y: 0, rotation: 0 });
  const animationRef = useRef<number | null>(null);
  const tickRef = useRef<(time: number) => void>(() => {});
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  function getDragBounds() {
    const scene = sceneRef.current;
    const badge = badgeRef.current;
    if (!scene || !badge || scene.clientWidth === 0 || badge.offsetWidth === 0) {
      return { left: -38, right: 38, top: -30, bottom: 30, rotation: 11 };
    }
    const sideRoom = Math.max(0, (scene.clientWidth - badge.offsetWidth) / 2 - 3);
    const badgeTop = badge.offsetTop;
    const badgeHeight = badge.offsetHeight;
    let low = 0;
    let high = Math.min(38, sideRoom);
    for (let index = 0; index < 12; index += 1) {
      const offset = (low + high) / 2;
      const angle = Math.min(11, offset * 0.22) * (Math.PI / 180);
      if (offset + badgeHeight * Math.sin(angle) <= sideRoom) low = offset;
      else high = offset;
    }
    const horizontalLimit = sideRoom === 0 ? 0 : low;
    const rotation = Math.min(11, horizontalLimit * 0.22);
    return {
      left: -horizontalLimit,
      right: horizontalLimit,
      top: -Math.min(30, Math.max(0, badgeTop - 2)),
      bottom: Math.min(30, Math.max(0, scene.clientHeight - badgeTop - badgeHeight - 2)),
      rotation,
    };
  }

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = sceneRef.current;
    if (!scene || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting && animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (entry.isIntersecting && pointerRef.current.id === -1
        && (Math.abs(velocityRef.current.x) > .2 || Math.abs(velocityRef.current.y) > .2 || Math.abs(velocityRef.current.rotation) > .2)) {
        animationRef.current = window.requestAnimationFrame((time) => tickRef.current(time));
      }
    }, { threshold: .01 });
    observer.observe(scene);
    return () => {
      observer.disconnect();
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const setBadgePosition = useCallback((next: BadgePosition) => {
    positionRef.current = next;
    setPosition(next);
  }, []);

  const stopSpring = useCallback(() => {
    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const release = useCallback(() => {
    if (pointerRef.current.id === -1) return;
    pointerRef.current.id = -1;
    setDragging(false);
    if (reducedMotionRef.current) return;
    let previousTime = 0;
    const tick = (time: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }
      const dt = Math.min((time - (previousTime || time)) / 1000, 0.032);
      previousTime = time;
      const current = positionRef.current;
      const velocity = velocityRef.current;
      const spring = 48;
      const damping = 11;
      velocity.x += (-spring * current.x - damping * velocity.x) * dt;
      velocity.y += (-spring * current.y - damping * velocity.y) * dt;
      velocity.rotation += (-spring * current.rotation - damping * velocity.rotation) * dt;
      const bounds = getDragBounds();
      const next = {
        x: Math.max(bounds.left, Math.min(bounds.right, current.x + velocity.x * dt)),
        y: Math.max(bounds.top, Math.min(bounds.bottom, current.y + velocity.y * dt)),
        rotation: Math.max(-bounds.rotation, Math.min(bounds.rotation, current.rotation + velocity.rotation * dt)),
      };
      if (Math.abs(next.x) < 0.12 && Math.abs(next.y) < 0.12 && Math.abs(next.rotation) < 0.12
        && Math.abs(velocity.x) < 0.2 && Math.abs(velocity.y) < 0.2 && Math.abs(velocity.rotation) < 0.2) {
        velocityRef.current = { x: 0, y: 0, rotation: 0 };
        setBadgePosition({ x: 0, y: 0, rotation: 0 });
        animationRef.current = null;
        return;
      }
      if ((next.x === bounds.left && velocity.x < 0) || (next.x === bounds.right && velocity.x > 0)) velocity.x = 0;
      if ((next.y === bounds.top && velocity.y < 0) || (next.y === bounds.bottom && velocity.y > 0)) velocity.y = 0;
      if (Math.abs(next.rotation) === bounds.rotation && Math.sign(velocity.rotation) === Math.sign(next.rotation)) velocity.rotation = 0;
      setBadgePosition(next);
      animationRef.current = window.requestAnimationFrame(tick);
    };
    tickRef.current = tick;
    stopSpring();
    if (isVisibleRef.current) animationRef.current = window.requestAnimationFrame(tick);
  }, [setBadgePosition, stopSpring]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    stopSpring();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      originX: positionRef.current.x,
      originY: positionRef.current.y,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
    };
    velocityRef.current = { x: 0, y: 0, rotation: 0 };
    setDragging(true);
    setHintVisible(false);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerRef.current.id !== event.pointerId) return;
    const dx = event.clientX - pointerRef.current.lastX;
    const dy = event.clientY - pointerRef.current.lastY;
    const time = performance.now();
    const dt = Math.max((time - pointerRef.current.lastTime) / 1000, 0.001);
    pointerRef.current.vx = dx / dt;
    pointerRef.current.vy = dy / dt;
    pointerRef.current.lastX = event.clientX;
    pointerRef.current.lastY = event.clientY;
    pointerRef.current.lastTime = time;
    const bounds = getDragBounds();
    const x = Math.max(bounds.left, Math.min(bounds.right, pointerRef.current.originX + event.clientX - pointerRef.current.x));
    const y = Math.max(bounds.top, Math.min(bounds.bottom, pointerRef.current.originY + event.clientY - pointerRef.current.y));
    const rotation = reducedMotionRef.current ? 0 : Math.max(-bounds.rotation, Math.min(bounds.rotation, x * 0.22 + pointerRef.current.vx * 0.012));
    setBadgePosition({ x, y, rotation });
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerRef.current.id !== event.pointerId) return;
    if (!reducedMotionRef.current) {
      const rotationLimit = getDragBounds().rotation;
      velocityRef.current = {
        x: Math.max(-720, Math.min(720, pointerRef.current.vx * 0.28)),
        y: Math.max(-720, Math.min(720, pointerRef.current.vy * 0.28)),
        rotation: Math.max(-rotationLimit * 20, Math.min(rotationLimit * 20, pointerRef.current.vx * 0.045)),
      };
    }
    release();
  }

  return (
    <div className="lanyard-scene" ref={sceneRef}>
      <div
        ref={badgeRef}
        className={`lanyard-badge${dragging ? " is-dragging" : ""}`}
        style={{ "--badge-x": `${position.x}px`, "--badge-y": `${position.y}px`, "--badge-rotation": `${position.rotation}deg` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={release}
        role="group"
        aria-label="Interactive Indhuraj L identity badge. Drag to move."
      >
        <article className="lanyard-badge__card">
          <div className="lanyard-badge__header">
            <div className="lanyard-badge__identity">
              <strong>INDHURAJ L</strong>
              <span>DATA ANALYST</span>
            </div>
            <a className="lanyard-badge__qr" href="https://github.com/Indhuraj-DataEngineering" target="_blank" rel="noreferrer" aria-label="Open Indhuraj's GitHub profile">
              <img src="/images/indhuraj-profile-qr.svg" alt="QR code linking to Indhuraj's GitHub profile" width="60" height="60" />
            </a>
          </div>
          <div className="lanyard-badge__photo">
            <img src="/images/indhuraj-orange-portrait.jpg" alt="Portrait of Indhuraj L" width="1122" height="1402" loading="lazy" draggable="false" />
          </div>
          <div className="lanyard-badge__footer">
            <span className="lanyard-badge__brand"><img src="/images/indhuraj-il-mark.png" alt="" width="747" height="747" /><strong>INSIGHT</strong></span>
            <span className="lanyard-badge__footer-label">DATA<br />ANALYTICS</span>
          </div>
        </article>
      </div>
      <div className={`lanyard-scene__hint${hintVisible ? "" : " has-dismissed"}`} aria-hidden="true">Drag my card</div>
      <button className="lanyard-scene__reset" type="button" onClick={() => { stopSpring(); setBadgePosition({ x: 0, y: 0, rotation: 0 }); setHintVisible(false); }}>Reset card</button>
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Workflow", "#pipeline"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];

  // Scroll Progress & Header Scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 35);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / docHeight)));
      }

      // ScrollSpy: Determine active section
      const sectionIds = ["home", "about", "skills", "pipeline", "machine-learning", "engineering-project", "projects", "experience", "contact"];
      const scrollPosition = scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      {/* Pinned Top Reading Scroll-Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
        <div className="site-header__inner">
          <Logo />
          <nav
            id="mobile-navigation"
            className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map(([label, href]) => {
              const targetId = href.replace("#", "");
              const isActive =
                activeSection === targetId ||
                (targetId === "workflow" && activeSection === "pipeline") ||
                (targetId === "projects" && (activeSection === "projects" || activeSection === "engineering-project"));

              return (
                <a
                  key={href}
                  href={href}
                  className={isActive ? "is-active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
          </nav>
          <a className="button button--outline header-cta" href="#contact">
            Get in touch <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero__ambient" aria-hidden="true" />
      <p className="hero__backdrop" aria-hidden="true">INDHURAJ L</p>
      <div className="hero__portrait-wrap" aria-hidden="true">
        <img
          className="hero__portrait"
          src="/images/indhuraj-hero-cutout.png"
          alt=""
          width="1122"
          height="1402"
          fetchPriority="high"
        />
      </div>
      <div className="hero__copy">
        <p className="hero__overline"><span className="eyebrow__line" />INDHURAJ L <span>/</span> DATA ANALYST</p>
        <h1 id="hero-heading">Data<br /><em>Analyst.</em></h1>
        <p className="hero__intro">Turning data into clear analysis, useful dashboards and informed decisions.</p>
        <a className="button button--light hero__explore" href="#projects">Explore my work <ArrowDownRight size={18} /></a>
      </div>
      <div className="hero__side-note">
        <p className="eyebrow">DATA ANALYST</p>
        <p>Explore the data.<br />Make insights clear.</p>
        <a className="text-link" href="#contact">Let’s connect <ArrowRight size={15} /></a>
      </div>
      <div className="hero__capabilities" aria-label="Areas of focus">
        {capabilities.map(({ label, icon: Icon }) => (
          <span className="capability-chip" key={label}><Icon size={17} aria-hidden="true" />{label}</span>
        ))}
      </div>
      <a className="hero__scroll" href="#about" aria-label="Scroll to About Me"><ArrowDown size={16} /> Scroll to explore</a>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <FlowingBackdrop className="flowing-backdrop--about" />
      <div className="about-editorial">
        <div className="about-editorial__grid">
          <div className="about-editorial__lanyard about-mosaic__item" aria-label="Interactive identity badge">
            <LanyardBadge />
          </div>
          <div className="about-editorial__panel">
            <div className="about-editorial__intro about-editorial__reveal">
              <p className="about-editorial__eyebrow"><span /> A LITTLE ABOUT ME</p>
              <h2>Finding clarity<br />in complex data.</h2>
              <p className="about-editorial__description">I’m Indhuraj L, an Agricultural Engineering graduate turning data into useful insights with Python, SQL, Excel and Power BI.</p>
              <a className="about-editorial__cta" href="#projects">Explore my work <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>

            <div className="about-editorial__expertise about-editorial__reveal">
              <article className="about-editorial__expertise-card">
                <Database size={21} aria-hidden="true" />
                <h3>Data preparation</h3>
                <p>Cleaning, organizing and exploring datasets for meaningful analysis.</p>
              </article>
              <article className="about-editorial__expertise-card">
                <BarChart3 size={21} aria-hidden="true" />
                <h3>Analysis &amp; reporting</h3>
                <p>Building useful Excel and Power BI views to turn data into clear insights.</p>
              </article>
            </div>

            <div className="about-editorial__learning about-editorial__reveal">
              <div className="about-editorial__learning-copy">
                <p className="about-editorial__eyebrow"><span /> CURRENTLY LEARNING</p>
                <strong>Data Science, Generative AI<br className="about-editorial__learning-break" /> &amp; Agentic AI</strong>
              </div>
              <div className="about-editorial__bars" aria-hidden="true">
                <span /><span /><span /><span /><i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return <TechnicalSkillsSection />;
}

function PipelineSection() {
  return <AnalyticsWorkflowSection />;
}

function TrainingProgramCard() {
  return (
    <article className="training-program reveal" aria-labelledby="training-program-title">
      <span className="training-program__icon"><Sparkles size={20} /></span>
      <div className="training-program__main">
        <span className="ml-support-card__type">Ongoing learning · Analytics portion completed</span>
        <h3 id="training-program-title">Data Science with Generative AI and Agentic AI</h3>
        <p>Python, SQL, Excel, Power BI, statistics, Pandas, NumPy, exploratory data analysis and data visualization.</p>
      </div>
      <span className="training-program__status">IN PROGRESS</span>
    </article>
  );
}

function MachineLearningSection() {
  return (
    <section className="section" id="machine-learning">
      <SectionHeading eyebrow="Applied intelligence" title={<>Machine learning<br />& Gen AI.</>} description="A completed recommendation project, alongside clearly labelled ongoing AI training." />
      <div className="ml-layout">
        <article className="ml-feature reveal">
          <div className="ml-feature__copy">
            <span className="ml-category"><Sparkles size={14} /> Applied machine learning</span>
            <h3>Tamil Movie Recommendation System</h3>
            <p>Processed Tamil movie and rating data with Pandas, implemented movie recommendations with Scikit-learn, built an interactive Streamlit interface and deployed the application online.</p>
            <div className="chip-list"><span>Python</span><span>Pandas</span><span>Scikit-learn</span><span>Streamlit</span></div>
          </div>
          <div className="recommendation-flow" aria-label="Illustrative recommendation process: Tamil movie data, Pandas processing, Scikit-learn recommendations">
            <div className="recommendation-flow__stage">
              <span className="recommendation-flow__icon"><Database size={20} /></span>
              <strong>Movie data</strong><small>Tamil movies & ratings</small>
            </div>
            <span className="recommendation-flow__connector" aria-hidden="true" />
            <div className="recommendation-flow__stage">
              <span className="recommendation-flow__icon"><Workflow size={20} /></span>
              <strong>Process</strong><small>Pandas · Scikit-learn</small>
            </div>
            <span className="recommendation-flow__connector" aria-hidden="true" />
            <div className="recommendation-flow__stage">
              <span className="recommendation-flow__icon"><Sparkles size={20} /></span>
              <strong>Recommendations</strong><small>Streamlit application</small>
            </div>
          </div>
        </article>
        <div className="ml-support">
          <article className="ml-support-card reveal">
            <span className="ml-support-card__icon"><Database size={21} /></span>
            <div><span className="ml-support-card__type">Data preparation</span><h3>Movie and rating data</h3><p>Processed with Pandas as the input to the recommendation model.</p></div>
          </article>
          <article className="ml-support-card reveal">
            <span className="ml-support-card__icon"><Workflow size={21} /></span>
            <div><span className="ml-support-card__type">Completed project</span><h3>Interactive app deployed</h3><p>Built and deployed with Streamlit.</p></div>
          </article>
        </div>
      </div>
      <TrainingProgramCard />
    </section>
  );
}

function EngineeringProjectSection() {
  return <StoveSafetySection />;
}

function ProjectArtwork({ kind }: { kind: Project["accent"] }) {
  if (kind === "pipeline") {
    return <div className="project-art project-art--pipeline" aria-hidden="true">
      <div className="art-sidebar"><b /><i /><i /><i /><i /></div>
      <div className="art-pipeline">
        <span><Database size={19} /></span><i /><span><Workflow size={19} /></span><i />
        <div className="art-branches"><b /><b /><b /></div>
      </div>
      <div className="art-chart"><span>Pipeline stages</span><div><i /><i /><i /><i /><i /></div></div>
    </div>;
  }
  if (kind === "document") {
    return <div className="project-art project-art--document" aria-hidden="true">
      <div className="art-files"><i>PDF</i><i>TXT</i><i>CSV</i><i>IMG</i></div>
      <div className="art-paper"><b /><b /><b /><b /><span /><span /></div>
      <div className="art-extract"><strong>Extracted fields</strong><i /><i /><i /><i /></div>
    </div>;
  }
  return <div className="project-art project-art--analytics" aria-hidden="true">
    <div className="art-kpis"><span /><span /><span /></div>
    <div className="art-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="art-donut" /><div className="art-table"><i /><i /><i /></div>
  </div>;
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {project && (
        <div className="project-dialog__body">
          <button
            className="icon-button project-dialog__close"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={20} />
          </button>
          <div style={{ marginBottom: "18px" }}>
            <StatusPill>Verified Resume Case Study</StatusPill>
          </div>
          <p className="eyebrow" style={{ color: "var(--accent-light)" }}>{project.category}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--muted)", margin: "12px 0 20px" }}>
            {project.description}
          </p>

          <div style={{ margin: "20px 0" }}>
            <ProjectArtwork kind={project.accent} />
          </div>

          <div className="project-dialog__details">
            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ color: "var(--accent-light)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                Problem Addressed
              </span>
              <p style={{ margin: 0, color: "var(--text)", fontSize: "14px", lineHeight: "1.5" }}>{project.problem}</p>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ color: "var(--accent-light)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                Engineering Contribution
              </span>
              <p style={{ margin: 0, color: "var(--text)", fontSize: "14px", lineHeight: "1.5" }}>{project.contribution}</p>
            </div>
          </div>

          <div style={{ margin: "22px 0 16px" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-dark)", display: "block", marginBottom: "8px" }}>
              Technologies &amp; Libraries
            </span>
            <div className="chip-list">
              {project.stack.map((item) => (
                <span key={item} style={{ background: "rgba(255, 107, 10, 0.12)", color: "var(--accent-light)", borderColor: "rgba(255, 107, 10, 0.28)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <a
              className="button button--light"
              href="#contact"
              onClick={onClose}
              style={{ flex: 1, textAlign: "center" }}
            >
              Discuss this project <ArrowUpRight size={15} />
            </a>
            <button
              className="button button--outline"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filters: ProjectFilter[] = ["All", "Data Analytics", "Data Science"];
  const visibleProjects = filterProjects(projects, filter);
  return (
    <section className="section projects-section" id="projects">
      <FlowingBackdrop className="flowing-backdrop--projects" />
      <SectionHeading eyebrow="Selected work" title="Featured projects." description="Three projects with their problem, contribution and tools as documented in my resume." />
      <div className="project-controls" role="group" aria-label="Filter projects">
        {filters.map((item) => <button type="button" key={item} className={filter === item ? "filter-button is-active" : "filter-button"} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="projects-grid" aria-live="polite">
        {visibleProjects.map((project) => (
          <article className="project-card reveal" key={project.title}>
            <button className="project-card__preview" type="button" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} details`}>
              <ProjectArtwork kind={project.accent} />
            </button>
            <div className="project-card__body">
              <StatusPill>Resume project</StatusPill>
              <h3>{project.title}</h3>
              <div className="project-summary"><span>Problem</span><p>{project.problem}</p></div>
              <div className="project-summary"><span>Contribution</span><p>{project.contribution}</p></div>
              <div className="chip-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="project-actions">
                <button className="button button--outline" type="button" onClick={() => setSelectedProject(project)}>View details <ArrowRight size={15} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

function PublicWorkSection() {
  const [bookOpen, setBookOpen] = useState(false);
  const bookDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = bookDialogRef.current;
    if (!dialog) return;
    if (bookOpen && !dialog.open) dialog.showModal();
    if (!bookOpen && dialog.open) dialog.close();
  }, [bookOpen]);

  return (
    <section className="section contributions-section" id="contributions">
      <SectionHeading eyebrow="Profiles & publications" title="Open source & writing." description="Find my public profile and published work." centered />
      <div className="contribution-panels">
        <article className="contribution-panel reveal">
          <div className="contribution-panel__head"><span><Github size={27} /></span><div><h3>GitHub</h3><p>Explore my profile and public work.</p></div></div>
          <a className="github-profile-link" href="https://github.com/Indhuraj-DataEngineering" target="_blank" rel="noreferrer"><Github size={19} /><span>Visit GitHub profile</span><ArrowUpRight size={17} /></a>
        </article>
        <article className="contribution-panel reveal">
          <div className="contribution-panel__head"><span><FileText size={27} /></span><div><h3>Book publication</h3><p>Tamil Poetry Collection · First edition, September 2025</p></div></div>
          <div className="publication-book"><p>Author and co-editor of a Tamil poetry collection.</p><span>ISBN</span><strong>978-93-49960-96-1</strong></div>
          <div className="publication-book__actions">
            <button className="button button--outline" type="button" onClick={() => setBookOpen(true)}><BookOpen size={16} /> View book</button>
            <a className="button button--light" href="/publications/Tamil-Poetry-Collection.pdf" download="Tamil-Poetry-Collection.pdf"><Download size={16} /> Download</a>
          </div>
          <p className="contribution-meta"><strong>Achievement:</strong> Best Scalable Business Model · Pitch Fest, Sri Eshwar THIRAN 2025, Sri Eshwar College of Engineering, Coimbatore.</p>
        </article>
      </div>
      <dialog
        className="book-viewer"
        ref={bookDialogRef}
        aria-labelledby="book-viewer-title"
        onClose={() => setBookOpen(false)}
        onClick={(event) => {
          if (event.target === bookDialogRef.current) setBookOpen(false);
        }}
      >
        <div className="book-viewer__header">
          <div><p className="eyebrow">BOOK PUBLICATION</p><h2 id="book-viewer-title">Tamil Poetry Collection</h2></div>
          <div className="book-viewer__actions">
            <a className="button button--outline" href="/publications/Tamil-Poetry-Collection.pdf" target="_blank" rel="noreferrer"><BookOpen size={16} /> Open PDF</a>
            <a className="button button--light" href="/publications/Tamil-Poetry-Collection.pdf" download="Tamil-Poetry-Collection.pdf"><Download size={16} /> Download</a>
            <button className="icon-button" type="button" aria-label="Close book viewer" onClick={() => setBookOpen(false)}><X size={20} /></button>
          </div>
        </div>
        {bookOpen && <iframe className="book-viewer__document" src="/publications/Tamil-Poetry-Collection.pdf#view=FitH" title="Tamil Poetry Collection PDF" />}
      </dialog>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <SectionHeading eyebrow="Career & background" title="Experience & education." description="Internship experience and academic qualifications from my resume." />
      <div className="experience-content">
        <div className="experience-intro">
          <h3 className="experience-content__heading">Internship experience</h3>
          <ol className="experience-timeline">
            <li className="timeline-entry reveal">
              <span className="timeline-entry__date">January 2026 — April 2026</span>
              <h3>Project Intern</h3>
              <p className="timeline-entry__organization">Green Resource Solutions</p>
              <p>Worked on a sensor-based gas leak, flame, smoke and human-presence detection system with automatic shutoff for LPG and biogas stoves.</p>
            </li>
            <li className="timeline-entry reveal">
              <span className="timeline-entry__date">March 2024</span>
              <h3>Inplant Training Intern</h3>
              <p className="timeline-entry__organization">Sai Lakshme Milk Products (AAHHAA)</p>
              <p>Gained practical exposure to dairy processing, quality-control procedures, process documentation, and monitoring operational and quality parameters.</p>
            </li>
          </ol>
        </div>
        <aside className="experience-background">
          <div className="experience-background__education">
            <h3 className="experience-content__heading">Education</h3>
            <ol className="education-timeline">
              <li className="timeline-entry timeline-entry--education reveal">
                <span className="timeline-entry__date">2022 — 2026</span>
                <h3>B.Tech, Agricultural Engineering</h3>
                <p className="timeline-entry__organization">The Kavery Engineering College · 85%</p>
              </li>
              <li className="timeline-entry timeline-entry--education reveal">
                <span className="timeline-entry__date">2021 — 2022</span>
                <h3>Higher Secondary (HSLC)</h3>
                <p className="timeline-entry__organization">AMMH School, Krishnagiri · 74%</p>
              </li>
              <li className="timeline-entry timeline-entry--education reveal">
                <span className="timeline-entry__date">2019 — 2020</span>
                <h3>Secondary School (SSLC)</h3>
                <p className="timeline-entry__organization">AMMH School, Krishnagiri · 98%</p>
              </li>
            </ol>
          </div>
          <aside className="resume-card reveal">
            <div className="resume-card__top"><span className="resume-icon"><FileText size={28} /></span><span className="resume-status"><i /> Resume available</span></div>
            <h3>INDHURAJ L</h3><p className="resume-card__role">Data Analyst · Data Science & Analytics</p>
            <p className="resume-card__summary">Resume with experience, education, skills, projects and publications.</p>
            <a className="button button--light resume-download" href="/resume/Indhuraj-L-Resume.pdf" download="Indhuraj-L-Resume.pdf"><Download size={17} /> Download resume</a>
          </aside>
        </aside>
      </div>
    </section>
  );
}

function LearningSection() {
  return (
    <section className="section learning-section" id="learning">
      <SectionHeading eyebrow="Learning & credentials" title="Training, certification & languages." description="Course progress, certification and language proficiency as stated in my resume." centered />
      <div className="resume-highlights-grid">
        <article className="resume-highlight reveal">
          <span className="resume-highlight__label">ONGOING PROGRAM</span>
          <h3>Data Science with Generative AI and Agentic AI</h3>
          <p>Completed the Data Analytics portion, covering Python, SQL, Excel, Power BI, statistics, Pandas, NumPy, exploratory data analysis and data visualization.</p>
        </article>
        <article className="resume-highlight reveal">
          <span className="resume-highlight__label">CERTIFICATION & ACHIEVEMENT</span>
          <h3>Certified Innovation Ambassador</h3>
          <p>Foundation and Advanced Levels · Ministry of Education Innovation Cell and AICTE.</p>
          <p><strong>Best Scalable Business Model</strong> · Pitch Fest, Sri Eshwar THIRAN 2025.</p>
        </article>
        <article className="resume-highlight reveal">
          <span className="resume-highlight__label">LANGUAGES</span>
          <h3>Tamil & English</h3>
          <p><strong>Tamil:</strong> Native or bilingual proficiency</p>
          <p><strong>English:</strong> Professional working proficiency</p>
        </article>
      </div>
    </section>
  );
}

function ContactSection() {
  const [state, setState] = useState<ContactState>("idle");
  const contactRef = useRef<HTMLElement>(null);
  const networkRef = useRef<SVGSVGElement>(null);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", service: "", message: "", website: "" },
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = networkRef.current;
    if (!svg) return;
    const context = gsap.context(() => {
      gsap.fromTo(svg.querySelectorAll(".contact-network__connection"),
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: svg, start: "top 82%", once: true },
        },
      );
      const pulse = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
      pulse.to(svg.querySelectorAll(".contact-network__signal"), {
        opacity: 1,
        scale: 1.5,
        transformOrigin: "center",
        duration: 0.32,
        stagger: 0.18,
        yoyo: true,
        repeat: 1,
      });
      ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => isActive ? pulse.play() : pulse.pause(),
      });
    }, contactRef);
    return () => context.revert();
  }, []);

  async function submitContact(values: ContactValues) {
    setState("idle");
    if (values.website) {
      setState("unavailable");
      return;
    }
    if (!endpoint) {
      setState("unavailable");
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, service: values.service, message: values.message }),
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}.`);
      setState("success");
      reset();
    } catch (error) {
      console.error("Contact form submission failed.", error);
      setState("failure");
    }
  }

  return (
    <section className="contact-section contact-section--editorial" id="contact" ref={contactRef}>
      <div className="contact-editorial__inner">
        <p className="contact-editorial__eyebrow"><span /> LET’S CONNECT</p>
        <h2 className="contact-editorial__title">Contact</h2>
        <div className="contact-editorial__body">
          <aside className="contact-editorial__aside">
            <div className="contact-editorial__intro">
              <span className="contact-editorial__label">DATA ANALYST OPPORTUNITIES</span>
              <p>I’m seeking an entry-level Data Analyst role and welcome conversations about analytics and reporting projects.</p>
            </div>
            <div className="contact-editorial__focus">
              <span className="contact-editorial__label">AREAS OF FOCUS</span>
              <ul><li>Data analysis & statistics</li><li>Dashboards & reporting</li><li>Applied machine learning</li></ul>
            </div>
            <div className="contact-editorial__details">
              <span className="contact-editorial__label">CONTACT DETAILS</span>
              <ul className="contact-details-list">
                <li><MapPin size={16} /><span>Krishnagiri, Tamil Nadu, India</span></li>
                <li><Phone size={16} /><a href="tel:+919345512924">+91 9345512924</a></li>
                <li><Mail size={16} /><a href="mailto:indhurajlakshmanan@gmail.com">indhurajlakshmanan@gmail.com</a></li>
                <li><Github size={16} /><a href="https://github.com/Indhuraj-DataEngineering" target="_blank" rel="noreferrer">GitHub profile</a></li>
                <li><Linkedin size={16} /><a href="https://www.linkedin.com/in/indhuraj-l-8019922a2/" target="_blank" rel="noreferrer">LinkedIn profile</a></li>
              </ul>
            </div>
            <svg className="contact-network" ref={networkRef} viewBox="0 0 360 200" fill="none" aria-hidden="true">
              <path className="contact-network__connection" pathLength="1" d="M24 151 104 111 164 138 229 72 332 43" />
              <path className="contact-network__connection" pathLength="1" d="m104 111 20-72 105 33" />
              <path className="contact-network__connection" pathLength="1" d="m164 138 39 42 99-45" />
              <path className="contact-network__connection" pathLength="1" d="m229 72 73 63 30-92" />
              <circle className="contact-network__signal" cx="24" cy="151" r="4" />
              <circle className="contact-network__signal" cx="104" cy="111" r="5" />
              <circle className="contact-network__signal" cx="124" cy="39" r="3.5" />
              <circle className="contact-network__signal" cx="164" cy="138" r="4" />
              <circle className="contact-network__signal" cx="229" cy="72" r="5" />
              <circle className="contact-network__signal" cx="203" cy="180" r="3.5" />
              <circle className="contact-network__signal" cx="302" cy="135" r="4" />
              <circle className="contact-network__signal" cx="332" cy="43" r="4" />
            </svg>
          </aside>
          <form className="contact-form contact-form--editorial" id="contact-form" onSubmit={handleSubmit(submitContact)} noValidate>
            <div className="contact-form__identity-grid">
              <div className="form-field">
                <label htmlFor="contact-name">Name <span>(required)</span></label>
                <input id="contact-name" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} {...register("name")} />
                {errors.name && <p className="field-error" id="contact-name-error">{errors.name.message}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email <span>(required)</span></label>
                <input id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} {...register("email")} />
                {errors.email && <p className="field-error" id="contact-email-error">{errors.email.message}</p>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact-service">Service</label>
              <select id="contact-service" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "contact-service-error" : undefined} {...register("service")}>
                <option value="">Choose an area (optional)</option>
                <option value="Data analytics">Data analytics</option>
                <option value="Dashboard reporting">Dashboard reporting</option>
                <option value="Machine learning">Machine learning</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && <p className="field-error" id="contact-service-error">{errors.service.message}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Project description</label>
              <textarea id="contact-message" rows={3} placeholder="A few details about the project…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} {...register("message")} />
              {errors.message && <p className="field-error" id="contact-message-error">{errors.message.message}</p>}
            </div>
            <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
            <button className="button contact-submit contact-submit--editorial" type="submit" disabled={isSubmitting}><span>{isSubmitting ? "Sending…" : "Work with me"}</span>{isSubmitting ? <span className="loading-dot" /> : <ArrowRight size={16} />}</button>
            <p className={`form-status form-status--${state}`} role="status" aria-live="polite">
              {state === "success" && "Message delivered successfully."}
              {state === "unavailable" && "Your message couldn’t be sent right now. Please try again later."}
              {state === "failure" && "We couldn’t send your message. Please try again."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__frame">
        <FlowingBackdrop className="flowing-backdrop--footer" />
        <div className="site-footer__cap" aria-hidden="true" />
        <div className="site-footer__content">
          <div className="site-footer__top">
            <nav className="footer-nav" aria-label="Footer navigation">
                <a href="#projects">Projects</a>
                <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="footer-contact">
              <p>Have a data challenge or project in mind?</p>
              <a href="#contact">Let’s build something meaningful <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <a className="footer-wordmark reveal" href="#home" aria-label="Indhuraj L — back to top">INDHURAJ L</a>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Indhuraj L</span>
            <span>Data Analyst <i /> Data Science & Analytics</span>
            <nav className="footer-meta-links" aria-label="Footer quick links">
              <a href="#skills">Skills</a>
              <a href="#home">Back to top <ArrowUpRight size={13} /></a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        target.classList.toggle("is-in-view", isIntersecting);
      });
    }, { threshold: .05 });
    document.querySelectorAll(".pipeline-flow, .recommendation-flow, .safety-diagram").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const context = gsap.context(() => {
      // Cinematic Hero entrance sequence
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".hero__portrait-wrap", { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 1.0, clearProps: "all" }, 0.05)
        .fromTo([".hero__overline", "#hero-heading", ".hero__intro", ".hero__explore"], { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1, clearProps: "all" }, 0.15)
        .fromTo(".hero__side-note", { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.7, clearProps: "all" }, 0.4)
        .fromTo(".capability-chip", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, clearProps: "all" }, 0.5)
        .fromTo(".hero__scroll", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, clearProps: "all" }, 0.7);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.fromTo(".pipeline-item", { autoAlpha: 0, y: 12 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.11,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: { trigger: ".pipeline-flow", start: "top 78%", once: true },
      });

      gsap.fromTo(".about-mosaic__item, .about-editorial__reveal, .about-editorial__expertise-card",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".about-editorial", start: "top 78%", once: true },
        },
      );

      gsap.fromTo(".experience-timeline",
        { "--timeline-progress": 0 },
        {
          "--timeline-progress": 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".experience-timeline", start: "top 82%", once: true },
        },
      );
    });
    return () => context.revert();
  }, []);

  useEffect(() => {
    let mounted = true;
    const refresh = () => {
      if (mounted) ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.querySelectorAll("img").forEach((image) => image.addEventListener("load", refresh, { once: true }));
    document.fonts?.ready.then(refresh);
    return () => {
      mounted = false;
      window.removeEventListener("load", refresh);
      document.querySelectorAll("img").forEach((image) => image.removeEventListener("load", refresh));
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <PipelineSection />
        <MachineLearningSection />
        <EngineeringProjectSection />
        <ProjectsSection />
        <PublicWorkSection />
        <ExperienceSection />
        <LearningSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
