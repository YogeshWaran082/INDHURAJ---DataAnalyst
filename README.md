# Indhuraj L — Data Analyst Portfolio

A responsive, single-page React + TypeScript portfolio with an orange-on-black visual system, accessible interactions and content states that avoid presenting unverified information as fact.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

Production build and preview:

```sh
npm run build
npm run preview
```

Run the focused tests with `npm test`.

## Contact delivery

The contact form validates its fields in the browser. It does not report success unless a configured endpoint returns a successful HTTP response. Without a configured endpoint, the form displays an unavailable message and does not send or store the message.

To enable delivery, set `VITE_CONTACT_ENDPOINT` to an HTTPS endpoint that accepts a JSON `POST` with `name`, `email`, optional `service`, and `message`, validates input server-side, rate-limits requests, checks a honeypot, and returns a 2xx status only after successful delivery. Configure provider credentials on the server only; never put secrets in a `VITE_` variable. See `.env.example`.

The About section uses a spacious black-and-orange editorial canvas with a responsive visual mosaic, circular project link, and pointer-draggable lanyard badge. The badge uses measured movement bounds, pointer capture, a damped spring return, keyboard reset, reduced-motion support and offscreen pause. Subtle orange ribbon lighting uses GSAP transforms around About, projects and the footer; it responds gently to pointer and scroll position and pauses offscreen or when the tab is hidden. Skills and analysis workflow use responsive layouts; the movie recommendation and sensor-based stove safety projects show resume-backed process diagrams whose animations pause offscreen. Experience groups internships beside education and a resume download. Contact retains the dark responsive layout, and the footer keeps the restrained glow, wordmark and back-to-top action.

## Resume content

- Portfolio skills, projects, internship history, education, training, certification, achievement, publications and language proficiency are transcribed from the supplied resume.
- The resume is available at `public/resume/Indhuraj-L-Resume.pdf` and linked from the Experience & Education section.
- The Tamil poetry collection PDF is available at `public/publications/Tamil-Poetry-Collection.pdf`. Its publication card provides an in-page viewer and direct download.
- Project cards show the documented problem, contribution and technology stack. The resume does not provide project-specific public URLs, so no demo or repository links are invented.
- The sales-analysis workflow and stove-safety system diagram describe work listed in the resume; the safety illustration is labeled as illustrative and does not show live sensor data.
- The Data Science with Generative AI and Agentic AI program is labeled ongoing; only its Data Analytics portion is described as completed.
- The GitHub and LinkedIn profile links, email address, phone number and location are included as supplied.
- The testimonial section is omitted because no authentic testimonial was supplied. Kaggle is omitted because no profile or notebooks were supplied.

Update the typed skill/project data in `src/App.tsx` and project types/filter logic in `src/projectFilters.ts` when the resume changes. Add only supplied, verified links and files before enabling the relevant actions.

## Asset map

The supplied screenshots are references only; they are not used as flattened website sections. The selected orange portrait for the About section is copied and JPEG-optimized to `public/images/indhuraj-orange-portrait.jpg`. The hero uses the owner-selected red-lit portrait `ChatGPT Image Oct 2, 2026, 09_26_18 PM.png`, locally background-removed to the transparent `public/images/indhuraj-hero-cutout.png`. The source attachments remain unchanged.

| Supplied file | Intended use / observed contents |
|---|---|
| `ChatGPT Image Oct 2, 2026, 09_22_57 PM.png` | Primary approved black-orange hero reference; portrait, logo placement, type and capability chips. |
| `ChatGPT Image Oct 2, 2026, 09_22_27 PM.png` | Earlier red/burgundy hero alternative; not used as the visual authority. |
| `ChatGPT Image Oct 2, 2026, 08_58_53 PM.png` | About section reference. |
| `ChatGPT Image Oct 2, 2026, 09_27_51 PM.png` | Skills card reference as visibly supplied (the master prompt labels this filename as the final hero, but the image itself depicts Technical Skills). |
| `ChatGPT Image Oct 2, 2026, 09_45_56 PM-1.png` | Data Pipelines / ETL-ELT architecture reference. |
| `ChatGPT Image Oct 2, 2026, 09_45_58 PM-2.png` | Machine Learning and Gen AI reference. |
| `ChatGPT Image Oct 2, 2026, 09_45_59 PM-3.png` | Featured Projects card reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_00 PM-4.png` | MLOps / Cloud Deployment reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_01 PM-5.png` | Alternate MLOps / Cloud Deployment reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_03 PM-6.png` | Alternate Featured Projects reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_05 PM-7.png` | Experience and resume empty-state reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_07 PM-8.png` | Testimonials / Reviews empty-state reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_08 PM-9.png` | Open Source and Kaggle reference. |
| `ChatGPT Image Oct 2, 2026, 09_46_09 PM-10.png` | Contact section reference. |
| `ChatGPT Image Oct 2, 2026, 09_26_27 PM.png` | Selected orange-lit pinstripe-suit portrait, used in the hero and About section. |
| `ChatGPT Image Oct 2, 2026, 09_26_18 PM.png` | Red-lit suit portrait selected by the owner for the hero; local foreground cut-out used, with its original kept intact. |
| `ChatGPT Image Oct 2, 2026, 09_27_44 PM-1.png` | Earlier red-lit portrait alternative; not used. |
| `ChatGPT Image Oct 2, 2026, 09_27_45 PM-2.png` | Earlier red-lit portrait alternative; not used. |
| `WhatsApp Image 2026-10-02 at 20.42.05.jpeg` | Green-lit generated portrait / logo-style reference as visually supplied; not used as the website portrait. |
| `ae3d5c47-d47b-4fe5-b2f0-55c422628896.png` | Original casual photograph as visually supplied; used only for identity comparison, not placed on the site. |

The supplied full Data Analyst lockup is used in the site header. The matching standalone IL/sparkle mark is used for the browser favicon and Apple touch icon. Both PNG assets are stored under `public/images/`. The hero background removal runs locally with a pre-trained model; no portrait data is uploaded to a background-removal service.

## Accessibility and implementation notes

- Semantic landmarks, one H1, a skip link, visible keyboard focus, labels and inline form errors are included.
- Mobile navigation is a keyboard-operable disclosure; project details use a native modal dialog.
- Skill chips display the tools and competencies transcribed from the resume.
- Motion is reduced or skipped when `prefers-reduced-motion` is enabled.
- The portrait is loaded eagerly in the hero and lazily in About; source dimensions are declared.
- No canonical URL, analytics, third-party API, profile link, or paid service is configured.
- ScrollTrigger is used for reveal and timeline motion; IntersectionObserver pauses the process illustrations outside the viewport. There are no pinned sections or pin spacers.
- Responsive CSS targets the supplied widths, but viewport screenshots could not be captured in the sandbox because the local Vite server bind is denied.
# INDHURAJ---DataAnalyst
