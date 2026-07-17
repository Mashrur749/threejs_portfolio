/**
 * Portfolio content — single source of truth for the data rendered across sections.
 * Kept separate from presentation so content edits don't touch component logic.
 */

export type Project = {
  title: string;
  subtitle: string;
  kind: string;
  desc: string;
  challenge: string;
  result: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  image?: string;
  cover?: string;
  caseStudy?: boolean;
  external?: { label: string; href: string };
  badge?: string;
  badgeVariant?: "accent" | "live" | "muted";
  span?: "wide"; // featured card spans full width on desktop
};

export const projects: Project[] = [
  {
    title: "BrowseWell",
    cover: "/covers/browsewell.png",
    subtitle: "A browser-native attention-management system",
    kind: "Independent product · shipped",
    desc: "Not a website blocker — a policy and intervention engine that operates across dynamic, SPA-driven sites: site, page, and element-level blocking, intention checks, timed access, and deliberate overrides, with privacy-preserving local processing. Live on the Chrome Web Store with its own product site.",
    challenge:
      "Existing blockers are binary and brittle on modern single-page apps; people need the internet to work, not hypnotize them.",
    result:
      "A shipped MV3 extension with a finalized brand and purchased domain, used to take real control of attention without breaking useful site functionality.",
    metrics: [
      { value: "MV3", label: "Chrome extension" },
      { value: "browsewell.app", label: "Live product site" },
      { value: "Local-only", label: "Privacy-preserving" },
    ],
    tech: ["Chrome Extension (MV3)", "TypeScript", "Rules Engine", "DOM Mutation Observers"],
    caseStudy: true,
    badge: "Live product",
    badgeVariant: "live",
    span: "wide",
    external: { label: "Install on Chrome Web Store →", href: "https://chromewebstore.google.com/detail/browsewell/iemgfcmhponpadhlnnfoolpmolpjohnp" },
  },
  {
    title: "HikmahEdu",
    cover: "/covers/hikmahedu.png",
    subtitle: "Education brand & platform, zero to launch",
    kind: "0-to-1 product · client (brand, design, build)",
    desc: "Led an education business from concept to a launch-ready digital product — brand strategy and identity, product and information architecture, UX and visual design, a reusable design system, and the web platform itself. End-to-end ownership across design and engineering.",
    challenge:
      "Translate an education-business concept into a cohesive, maintainable digital product — brand through code — with no finalized Figma handed over.",
    result:
      "A cohesive, launch-ready brand and platform where brand decisions became design tokens, which became reusable interface primitives and a maintainable CMS-driven site.",
    metrics: [
      { value: "0 → 1", label: "Brand through launch" },
      { value: "Design system", label: "Tokens → components" },
      { value: "hikmahedu.com", label: "Live site" },
    ],
    tech: ["Next.js", "CMS", "Design System", "Design Tokens"],
    caseStudy: true,
    badge: "Case study",
    badgeVariant: "accent",
    external: { label: "Visit hikmahedu.com →", href: "https://hikmahedu.com/" },
  },
  {
    title: "Content Sync Validator",
    cover: "/covers/content-sync-validator.png",
    subtitle: "Automated content validation across environments",
    kind: "Enterprise production · Critical Mass",
    desc: "An automated validation tool that compares staging vs. production content and surfaces discrepancies before release — replacing a manual, error-prone process with confidence.",
    challenge:
      "Recurring production errors after content approval cost the team 25–30 hours per release in detection and resolution.",
    result:
      "Zero production errors on validated releases; adopted into the formal QA workflow across three teams.",
    metrics: [
      { value: "80%", label: "Fewer human errors" },
      { value: "2hr → 30min", label: "Validation time" },
      { value: "25–30 hrs", label: "Saved per release" },
      { value: "3 teams", label: "Adopted the workflow" },
    ],
    tech: ["Next.js", "Node.js", "AEM APIs", "GitHub Copilot"],
    caseStudy: true,
    badge: "Case study",
    badgeVariant: "accent",
  },
  {
    title: "Offer Creation Engine",
    cover: "/covers/offer-engine.png",
    subtitle: "Campaign deployment at 300× the speed",
    kind: "Enterprise production · Critical Mass",
    desc: "An enterprise offer-creation engine with smart templating and reusable content schemas that became the foundation for over two years of landing-page operations.",
    challenge: "Multi-day content deployment was blocking business agility and campaign launches.",
    result: "Teams launch campaigns in hours instead of days, enabling rapid market response.",
    metrics: [
      { value: "300×", label: "Faster deployments" },
      { value: "2–3 days → 2–5 hrs", label: "Cycle time" },
      { value: "2+ years", label: "Foundation usage" },
    ],
    tech: ["Next.js", "AEM", "TypeScript"],
  },
  {
    title: "CRM → Marketing Sync Engine",
    cover: "/covers/crm-sync.png",
    subtitle: "Idempotent customer-data synchronization",
    kind: "Built automation system",
    desc: "A synchronization framework that keeps CRM and marketing platforms consistent: identity resolution, source-of-truth ownership by field, tag union (not replacement), idempotent upserts, watermarks, retry/backoff, and dead-letter handling. Built with n8n as a platform-agnostic reference system — not 'an n8n workflow'.",
    challenge:
      "Overlapping but inconsistent contact records, partial-failure retries, field conflicts, and rate limits across CRM and marketing platforms.",
    result:
      "Replayable, auditable sync with checkpointed progress and safe retries — reliable enough to run unattended.",
    metrics: [
      { value: "Idempotent", label: "Safe retries" },
      { value: "Checkpointed", label: "Incremental sync" },
      { value: "Audit log", label: "Replayable" },
    ],
    tech: ["n8n", "Node.js", "REST APIs", "Data Modeling"],
    caseStudy: true,
    badge: "Case study",
    badgeVariant: "accent",
  },
  {
    title: "Enterprise Web Platform Engineering",
    cover: "/covers/enterprise-platform.png",
    subtitle: "High-traffic experiences across product, design & marketing",
    kind: "Client delivery · Meta engagement + agency",
    desc: "Consolidated senior delivery work building React/Next.js applications for enterprise clients — CMS-driven component systems, accessibility, browser performance, release coordination, and code-review leadership. Source and private metrics are confidential; the evidence below is sanitized.",
    challenge:
      "Balancing campaign deadlines with platform quality across design, content, QA, analytics, and accounts teams under enterprise confidentiality.",
    result:
      "Shipped, maintained, and improved high-traffic enterprise experiences with reusable UI architecture and regression prevention.",
    metrics: [
      { value: "React/Next.js", label: "App architecture" },
      { value: "WCAG", label: "Accessibility" },
      { value: "Cross-functional", label: "Delivery ownership" },
    ],
    tech: ["React", "Next.js", "CMS", "CI/CD", "Performance"],
  },
  {
    title: "Three.js Creative Coding",
    cover: "/covers/threejs-craft.png",
    subtitle: "WebGL experiments & interactive scenes",
    kind: "Craft · powers this site",
    desc: "Real-time 3D scenes built with Three.js — exploring particles, shaders, and procedural geometry with performance and reduced-motion in mind. (This portfolio's background is one of them.)",
    challenge: "Deepen craft in real-time graphics and performant, accessible WebGL.",
    result: "A library of reusable, reduced-motion-aware scenes powering this site.",
    metrics: [
      { value: "WebGL", label: "Real-time rendering" },
      { value: "Vanilla", label: "Three.js, no R3F" },
      { value: "a11y", label: "Reduced-motion aware" },
    ],
    tech: ["Three.js", "GLSL", "Next.js", "Canvas API"],
    image: "/images/galaxy.PNG",
  },
];

export const experiences = [
  {
    role: "Senior Developer + Career Developer",
    company: "Critical Mass Inc.",
    period: "Apr 2022 – Present",
    location: "Calgary / Remote",
    highlights: [
      "Architected an offer-creation engine that cut landing-page deployment time by 300×, letting teams launch campaigns in hours instead of days.",
      "Initiated and led a QA automation tool that cut content validation from 2 hours to under 30 minutes while reducing human errors by 80%.",
      "Automated type-check and pre-commit testing hooks, reducing code-review loops by 35% and preventing production bugs.",
      "Led client API integrations enabling real-time package checks that increased conversion rates.",
      "Mentored junior developers and produced documentation improving onboarding efficiency.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Capgemini — on Meta engagement",
    period: "Jun 2021 – Apr 2022",
    location: "Remote",
    highlights: [
      "Built a React dashboard visualizing CPU and GPU resource usage, improving decision-making for hardware allocation across teams.",
      "Built a logging framework tracking application performance, reliability, and feature adoption.",
      "Improved internal library code and documentation, streamlining adoption across engineering teams.",
      "Mentored new hires and participated in quarterly planning to align development with company objectives.",
    ],
  },
  {
    role: "Web Application Developer",
    company: "Storius Limited",
    period: "Apr 2020 – Apr 2021",
    location: "Toronto / Remote",
    highlights: [
      "Integrated mapping tools into the platform, supporting investor decisions during early funding rounds.",
      "Migrated legacy datasets from spreadsheets to a database, improving data accuracy and scalability.",
      "Built backend APIs and optimized server configurations, ensuring a smooth production launch.",
    ],
  },
  {
    role: "Full-Stack Web Developer (Co-op)",
    company: "Rich Media",
    period: "Jan – Apr 2020",
    location: "Toronto",
    highlights: [
      "Built financial-tool interfaces for banking and insurance clients with complex business rules.",
      "Optimized backend systems with Docker, reducing server configuration time and improving reliability.",
      "Developed Chrome extensions to automate repetitive tasks and automated client survey reporting.",
    ],
  },
];

export const techGroups = [
  { category: "Front-End", skills: ["Three.js", "D3.js", "React.js", "Next.js", "TypeScript", "CMS"] },
  { category: "Backend", skills: ["Node.js", "AWS", "NGINX", "GraphQL", "REST API"] },
  { category: "Database", skills: ["PostgreSQL", "SQL", "Query Optimization"] },
  { category: "UI & Accessibility", skills: ["Responsive", "WCAG-compliant", "HTML/CSS/SCSS", "Modular CSS"] },
  { category: "Testing & QA", skills: ["Cypress", "Jest", "CI Test Automation"] },
  { category: "Build & Tooling", skills: ["Docker", "Git Workflows", "Webpack", "CI/CD"] },
  { category: "Performance", skills: ["UI Perf Measurement", "Lazy-loading", "Caching Strategies"] },
  { category: "Collaboration", skills: ["UX/QA/Product Partnering", "Mentoring", "Distributed Teams"] },
];

export const traits = [
  "Developer Experience",
  "Performance",
  "Accessibility (WCAG)",
  "Automation & Tooling",
  "Mentoring",
  "CI/CD",
];

export const labProjects = [
  {
    name: "PixelPatrol",
    status: "In design",
    desc: "Automated marketing-tag, conversion, and payload auditing — a Manifest V3 extension plus Playwright crawler, rules engine, and Next.js dashboard. Connects agency experience, browser engineering, and SaaS architecture.",
  },
  {
    name: "ProofDiff",
    status: "In design",
    desc: "Automated visual, content, accessibility, DOM, and performance regression testing for web releases. Playwright capture workers, viewport matrix, baseline management, and CI release gates.",
  },
  {
    name: "Reusable Next.js + AWS SaaS Foundation",
    status: "Reference architecture",
    desc: "A platform to reduce the marginal engineering cost of launching and operating multiple SaaS products — auth, multi-tenancy, billing, background jobs, feature flags, observability, and module generation. Not a boilerplate.",
  },
  {
    name: "Programmatic SEO Publishing Engine",
    status: "In design",
    desc: "Quality-controlled publishing at scale: schema-validated ingestion, template families, thin-content and duplicate suppression, chunked sitemaps, and Playwright QA — engineered to prevent the failures template-driven SEO creates.",
  },
  {
    name: "AI-Assisted Proposal & Discovery",
    status: "Concept",
    desc: "Brand-aware proposal generation: schema-driven intake, retrieval of approved proof assets, deterministic templates around generative output, approval workflow, and protection against untrusted client input.",
  },
  {
    name: "Agency Operations OS",
    status: "Reference architecture",
    desc: "An automation-first operating system for a service business across the full value chain — where the interesting work is deciding what to automate, what stays human, and which system owns each record.",
  },
];
