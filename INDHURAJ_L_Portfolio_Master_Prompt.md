# INDHURAJ L — Data Engineer Portfolio: Master Build Prompt

Copy this prompt into your coding assistant. Attach the images described below before starting.

---

## Goal

Build a complete, responsive, production-ready personal portfolio for **INDHURAJ L**, whose primary title is **Data Engineer**. Use the approved black–orange portfolio hero and the separate section designs supplied from this conversation. Implement a real website with semantic HTML, reusable components and working interactions. Match the attached designs closely while making the page coherent, accessible and usable on mobile.

## Attached references — read these first

**I am attaching all the relevant images from this portfolio chat: the approved logo, my original photograph, generated standalone portraits, approved hero design, and all separate section design images. Inspect every attachment before writing code.**

Use the attachments according to this priority:

1. **Final approved black–orange hero:** `ChatGPT Image Oct 2, 2026, 09_27_51 PM.png`. This is the primary reference for colors, typography, spacing, navigation, portrait composition and visual tone. The final portrait has no sunglasses.
2. **Approved IL sparkle logo:** the logo created in this chat with `INDHURAJ L` beside it. Use the orange version displayed in the final approved hero. The original green `GenAI` logo is a geometry reference; the visible role must be **Data Engineer**. Preserve the approved symbol rather than inventing another logo.
3. **My original photo:** `WhatsApp Image 2026-10-02 at 20.42.05.jpeg`. Use this only to verify identity. Use the approved generated suit portrait for the final website.
4. **Standalone portraits:** use the orange-lit black pinstripe suit, white shirt and black tie portrait without sunglasses for the hero and About section. The green and burgundy versions are earlier alternatives, not the final site palette.
5. **Separate section images:** About Me; Technical Skills; Data Pipelines & ETL/ELT Architecture; Machine Learning & Gen AI; MLOps & Cloud Deployment; Featured Projects; Open Source & Kaggle; Experience & Resume; Contact; Testimonials & Reviews.
6. Earlier hero references and alternative layouts are secondary inspiration only. Do not merge their green/red themes into the final orange theme.

Create an asset map identifying each supplied file and its intended use. If a required attachment is absent, identify that exact asset; do not substitute another person's photo or logo. Treat screenshots as visual references, not full-page background images. All text, cards, navigation and controls must be real HTML.

## Technology and language

- React + TypeScript + Vite for the application.
- Tailwind CSS for layout and styling, backed by CSS custom properties for design tokens.
- GSAP with ScrollTrigger for coordinated hero and section animation; CSS for simple hover and focus states.
- Lucide icons for consistent line icons; use official supplied brand icons where available.
- React Hook Form + Zod for contact validation.
- Vitest and React Testing Library for meaningful logic tests; Playwright for browser interactions and responsive checks.
- Frontend language: TypeScript/TSX, HTML and CSS. No Python runtime is needed.
- Use compatible stable package versions, pin dependencies and commit the lockfile. Verify APIs against installed versions.
- Default to a single-page portfolio with anchor navigation. Project details can use accessible dialogs; add routes only when a real case study needs a shareable URL.
- Keep deployment provider configurable. Build the frontend as static assets; use a small server-side endpoint for contact only when a real provider is configured.

## Visual design system

Use these as starting tokens, then sample the supplied final hero to refine them:

| Token | Starting value | Use |
|---|---|---|
| Background | `#090604` | Main canvas |
| Surface | `#15100C` | Cards and pills |
| Raised surface | `#21150E` | Selected cards |
| Accent | `#FF6A16` | Icons, actions, highlights |
| Accent light | `#FF9A40` | Subtle gradient highlights |
| Main text | `#F7F5F2` | Titles and body |
| Muted text | `#B9B2AC` | Secondary copy |
| Fine border | `rgba(255,106,22,.24)` | Card outlines |

Typography: choose a clean sans-serif close to the section references, such as Inter for UI/body, with a condensed display face close to the hero's oversized name. Load only necessary weights. Hero typography must preserve the dramatic name behind the portrait. Use `clamp()` and explicit breakpoints rather than shrinking every element proportionally.

- Desktop content maximum width: approximately 1280–1440px, refined against the reference.
- Section padding: roughly 88–120px on desktop, 48–64px on mobile.
- Card radii: 18–24px; pills: fully rounded.
- Maintain an 8px spacing rhythm.
- Warm orange radial glows should be restrained and placed behind focal elements.
- Use fine borders and subtle shadows; avoid heavy glass blur on every card.
- Keep body copy readable, with comfortable line height and sufficient contrast.

## Page order and section specification

### 1. Navigation and Hero

Match the approved hero: orange IL logo and name/title at left, central navigation pill, outlined Get in Touch button at right. Large muted `INDHURAJ L` text behind the cutout suit portrait. Left title `Data Engineer` and intro: `Turning complex data into reliable pipelines and meaningful insights.` Right CTA: `Book a free call`.

Bottom capability chips: Data Pipelines, ETL / ELT, SQL, Python, Data Warehousing, Analytics. Match the orange line icons and dark outlined pills. Keep the portrait recognizable and preserve dress texture and lighting. Create a clean transparent cutout from the supplied portrait where needed; keep source assets intact.

Hero CTA should scroll to Contact unless an actual scheduling link is supplied. Navigation: Home, About, Skills, Projects, Contact; use a compact menu if these cannot fit the reference pill. Header can become subtly opaque on scroll. On mobile, use a clear menu button with an accessible drawer.

### 2. About Me

Two-column editorial layout: approved orange portrait left; right heading `About Me`, statement `Engineering clarity from complex data.`, brief intro and three focus rows: Reliable pipelines, Clean data, Practical insights. CTA `Explore my work` scrolls to Projects. Stack cleanly on mobile.

### 3. Technical Skills

Use the attached grouped card design: Languages, Data Engineering, Databases, Cloud, ML & AI, Workflow. Candidate tools from the concept image include Python, SQL, Spark, Airflow, dbt, PostgreSQL, MongoDB, AWS, Azure, scikit-learn, PyTorch, Git and Docker.

These are **sample skills, not verified personal claims**. Store them as draft content until the owner confirms them. Do not add arbitrary proficiency percentages. Use labeled icons and allow tool descriptions on keyboard focus as well as hover.

### 4. Data Pipelines & ETL/ELT Architecture

Implement the attached pipeline illustration with real DOM/SVG: Sources → Ingestion → Transformation → Warehouse → Analytics. This is a conceptual workflow; do not imply it is a verified production architecture. Add cards for Batch processing, Data quality and Orchestration. Each stage can expand a small details panel. Explain that ETL and ELT differ in transformation placement; if showing both, use separate clearly labeled flows.

On mobile render stages vertically. Keep connectors behind nodes and labels legible. Include a plain-text equivalent for screen readers.

### 5. Machine Learning & Gen AI Models

Use three cards: Predictive modeling, Retrieval-augmented generation, LLM evaluation. Add the attached small chat playground design. A local demo must be explicitly labeled `Sample demo`; responses may be deterministic sample data. A real LLM integration requires a server endpoint and server-side secret. Never put API keys in frontend code.

Keep the person's primary title **Data Engineer**; Gen AI is a capability section, not a replacement role.

### 6. MLOps & Cloud Deployment

Create the attached dark infrastructure illustration and Build → Test → Deploy → Monitor lifecycle. Supporting cards: Model versioning, CI/CD automation, Containerized services, Observability, Cloud infrastructure. Diagrams should use crisp SVG or HTML rather than flattened text images. Status animations illustrate a sample workflow, not a live deployment.

### 7. Featured Projects & Interactive Demos

Use three-column project cards and filters: All, Data Engineering, ML & Gen AI. Concept cards in the designs: Pipeline Explorer, Document Intelligence, Analytics Workspace. Each card includes preview, summary, stack chips, Live Demo and GitHub actions.

All supplied concepts must stay visibly marked `Concept project` until real project details are provided. Do not claim client work, success rates or data volume from illustrative screenshots. Valid supplied links open securely; missing links show `Coming soon` without pretending to work.

Project detail dialog: overview, problem, architecture, contribution, stack, challenges, lessons and screenshots. Render sections only when content exists. Do not fabricate outcomes. Keyboard focus must stay inside the dialog, Escape closes it and focus returns to the triggering card.

### 8. Open Source & Kaggle Contributions

Two large GitHub/Kaggle panels matching the attached image. Use verified repositories and notebooks when supplied. Example repository names and notebook previews are placeholders; no invented usernames, rankings, stars or contribution counts. Add lower cards for Reusable utilities, Reproducible notebooks, Community learning.

### 9. Experience & Resume

Left chronological timeline; right resume preview and Download Resume action. Experience, company names, dates and education must come from the owner. Keep draft placeholders out of a production release. A resume download works only if a real PDF is attached; otherwise display `Resume coming soon`.

### 10. Testimonials & Reviews

Match the attached review card style. Only show verified supplied reviews with reviewer permission. No invented quotes, ratings, names or job titles. When there are no reviews, render the designed empty state or omit the section using content configuration.

### 11. Contact and Footer

Use the attached Contact design: left `Let’s build something meaningful.`, right Name, Email, Message form and Send Message button. Contact cards: Email, LinkedIn, GitHub. Use actual supplied destinations; do not infer contact details from another person's LinkedIn profile earlier in this chat.

Contact form states: idle, validation error, submitting, success and server failure. Never display success without successful delivery. If backend is unconfigured, provide an honest fallback using a verified email address, or display an unavailable state.

Footer: approved logo, name/title, anchor links, verified social links and dynamically generated current year. Avoid unnecessary repeated navigation or visual clutter.

## Animation choreography

| Element | Motion | Timing |
|---|---|---|
| Hero intro | Name fades/rises, portrait reveals, copy follows | 600–900ms total with 70–100ms stagger |
| Section heading | Opacity + 16–24px rise on entry | 450–600ms, once |
| Card group | Light staggered reveal | 60–90ms stagger |
| Card hover | 2–4px lift, restrained border glow | 180–250ms |
| Pipeline | Subtle pulse travels along connector | Slow loop only while visible |
| MLOps lifecycle | Sequential sample stage highlight | 3–5s cycle while visible |
| Project filters | Brief opacity/position transition | 180–250ms |
| Buttons | Soft accent glow and arrow movement | 150–200ms |

Use transforms and opacity for performance. Scope GSAP timelines to components and clean up on unmount. Pause offscreen loops. Respect `prefers-reduced-motion`: no parallax, loops or positional reveals; all content remains visible. Do not trap scrolling, use custom cursor by default, animate text letter-by-letter unnecessarily, or add full-screen loaders.

Optional desktop pointer-responsive portrait glow must remain subtle, disabled on touch/reduced motion. Do not distort the face, clothing or logo.

## Graphics and asset rules

- Use the attached approved logo as an asset, preserve shape and proportions.
- Do not use a screenshot of the entire section as its implementation.
- Keep the person's face and clothing consistent across the site.
- Use SVG for architectural illustrations, connectors and line graphics. Avoid excessive particle effects or generic stock robots.
- Use portrait images in AVIF/WebP with a fallback, responsive sizes and explicit dimensions. Preserve a high-quality original.
- Load the hero portrait eagerly; lazy-load below-fold previews.
- All meaningful images need descriptive alt text; decorative glows and icons are hidden from assistive technology.
- Avoid inserting sample dashboards with misleading real-world metrics.

## Application architecture

```text
src/
  app/                 # App shell and providers
  components/
    ui/                # Button, Card, Chip, SectionHeading, Dialog
    layout/            # Header, MobileNav, Footer
  sections/            # One component per portfolio section
  features/
    projects/          # Filters and project detail dialog
    contact/           # Form and submit states
    playground/        # Explicit sample demo or real API adapter
  content/             # Typed owner/profile/project/skills content
  hooks/               # Reduced motion and animation helpers
  lib/                 # Validation and URL utilities
  styles/              # Design tokens and global styles
  assets/              # Approved logo, portrait, preview assets
public/
  resume/              # Real PDF only when supplied
server/                # Optional contact/API endpoint
tests/
```

Use typed content models for profile, skill groups, pipeline stages, projects, experience, contributions, testimonials and social links. Include `status: draft | verified` for personal claims. Keep presentation separate from content. A production mode should omit unverified content or show honest empty states. Do not invent facts to fill gaps.

## Security and contact backend

Validate on both client and server. Add rate limiting and a honeypot to the contact endpoint, sanitize input and protect against email header injection. Keep provider secrets server-side in environment variables. Supply `.env.example` with names only. Do not log message bodies or secrets unnecessarily. No database is needed unless the owner requests message storage or a CMS.

## Responsive behavior

Check 360px, 390px, 768px, 1024px and 1440px widths. No horizontal overflow. Hero name, portrait, intro and CTA must remain readable without clipping important features. On mobile, reduce the name size, place the portrait below the title, and wrap capability chips. Skill/project grids become one column, then two where space allows. Architecture flows become vertical. Contact form inputs fill available width. Touch targets at least 44px. Do not hide necessary content on mobile.

## Accessibility, SEO and performance

Use a single H1, ordered headings, semantic landmarks, skip link and visible focus rings. Keyboard-operable menus, filters, dialogs and demo controls. Check contrast and reduced motion. Provide a meaningful page title `INDHURAJ L | Data Engineer`, truthful description and canonical URL only when a real domain is supplied. Add social preview metadata using approved assets. Structured person data must contain only verified fields.

Optimize assets and bundle splitting; avoid importing a heavy 3D engine for simple architecture graphics. Aim for good Core Web Vitals, but report measured results rather than claiming scores without testing.

## Build sequence and validation

1. Inspect attachments and create asset map; document missing real content.
2. Establish tokens, shared UI and responsive shell.
3. Implement the approved hero and compare visually at desktop/mobile.
4. Build every section in the order above, using its corresponding attached design.
5. Wire real interactions and honest unavailable states.
6. Add animations after static layouts are correct.
7. Validate keyboard use, reduced motion, form behavior, filters, dialogs and resume/link availability.
8. Run typecheck, production build and appropriate tests. Inspect screenshots at the listed widths; fix overflow, overlap and unreadable text.
9. Provide README with setup, environment variables, content replacement, asset map, build/deployment instructions and known limitations.

## Deliverables

Provide complete source code and assets, reusable components, typed content configuration, working responsive interactions, animation implementation, `.env.example`, README and validation results. Identify sample content clearly. Do not publish or connect paid services unless explicitly requested. Do not claim the static design images are already functional demos.

**Start by inspecting all the attached portfolio chat images, logo and my photograph. Then implement the full portfolio—not just the hero—with the approved black–orange design as the visual authority.**
