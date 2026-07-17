"use client";

import { useEffect, useState } from "react";

const accent = "#f97316";

type Project = {
  title: string;
  subtitle: string;
  kind: string;
  desc: string;
  challenge: string;
  result: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  image?: string;
  featured?: boolean;
  caseStudy?: boolean;
  external?: { label: string; href: string };
  badge?: string;
};

const projects: Project[] = [
  {
    title: "BrowseWell",
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
    featured: true,
    badge: "Live product",
    external: { label: "Install on Chrome Web Store →", href: "https://chromewebstore.google.com/detail/browsewell/iemgfcmhponpadhlnnfoolpmolpjohnp" },
  },
  {
    title: "HikmahEdu",
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
    external: { label: "Visit hikmahedu.com →", href: "https://hikmahedu.com/" },
  },
  {
    title: "Content Sync Validator",
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
  },
  {
    title: "Offer Creation Engine",
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
  },
  {
    title: "Enterprise Web Platform Engineering",
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
    subtitle: "WebGL experiments & interactive scenes",
    kind: "Craft · powers this site",
    desc: "Real-time 3D scenes built with Three.js and React Three Fiber — exploring particles, shaders, and procedural geometry with performance and reduced-motion in mind. (This portfolio's background is one of them.)",
    challenge: "Deepen craft in real-time graphics and performant, accessible WebGL.",
    result: "A library of reusable, reduced-motion-aware scenes powering this site.",
    metrics: [
      { value: "WebGL", label: "Real-time rendering" },
      { value: "R3F", label: "React integration" },
      { value: "a11y", label: "Reduced-motion aware" },
    ],
    tech: ["Three.js", "React Three Fiber", "GLSL", "Next.js"],
    image: "/images/galaxy.PNG",
  },
];

const experiences = [
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

const techGroups = [
  {
    category: "Front-End",
    skills: ["Three.js", "D3.js", "React.js", "Next.js", "TypeScript", "CMS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "AWS", "NGINX", "GraphQL", "REST API"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "SQL", "Query Optimization"],
  },
  {
    category: "UI & Accessibility",
    skills: ["Responsive", "WCAG-compliant", "HTML/CSS/SCSS", "Modular CSS"],
  },
  {
    category: "Testing & QA",
    skills: ["Cypress", "Jest", "CI Test Automation"],
  },
  {
    category: "Build & Tooling",
    skills: ["Docker", "Git Workflows", "Webpack", "CI/CD"],
  },
  {
    category: "Performance",
    skills: ["UI Perf Measurement", "Lazy-loading", "Caching Strategies"],
  },
  {
    category: "Collaboration",
    skills: ["UX/QA/Product Partnering", "Mentoring", "Distributed Teams"],
  },
];

const traits = [
  "Developer Experience",
  "Performance",
  "Accessibility (WCAG)",
  "Automation & Tooling",
  "Mentoring",
  "CI/CD",
];

// Spec / in-progress systems. Deliberately NOT presented as shipped products.
const labProjects = [
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

const leaderH3: React.CSSProperties = {
  fontSize: "0.78rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#f97316",
  marginBottom: "0.85rem",
};

const leaderUl: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  color: "#d4d4d8",
  fontSize: "0.95rem",
  lineHeight: 1.7,
};

export default function AllSectionsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerStyle = {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: isMobile ? "0 16px" : "0 24px",
  };

  const sectionStyle = {
    padding: isMobile ? "3.5rem 0" : "6rem 0",
    color: "white",
  } as const;

  const headingStyle = {
    fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4.5vw, 2.75rem)",
    fontWeight: 800,
    textAlign: "center" as const,
    marginBottom: isMobile ? "0.5rem" : "0.75rem",
    color: "white",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  };

  const subheadingStyle = {
    fontSize: isMobile ? "0.95rem" : "1.1rem",
    color: "#a1a1aa",
    textAlign: "center" as const,
    maxWidth: "620px",
    margin: "0 auto",
    marginBottom: isMobile ? "2rem" : "3rem",
    lineHeight: 1.6,
  };

  const cardStyle = {
    background: "rgba(39, 39, 42, 0.5)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(63, 63, 70, 0.5)",
    borderRadius: "1rem",
  } as const;

  return (
    <>
      {/* About */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.55)" }}
        id="about"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            About <span style={{ color: accent }}>me</span>
          </h2>
          <p style={subheadingStyle}>
            A little context on how I work and what I care about.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
              gap: isMobile ? "1rem" : "2rem",
              alignItems: "start",
            }}
          >
            <div
              style={{
                ...cardStyle,
                padding: isMobile ? "1.5rem" : "2rem",
              }}
            >
              <p
                style={{
                  color: "#d4d4d8",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                I&apos;m a senior product engineer and technical lead. My
                advantage isn&apos;t one framework — it&apos;s the combination of
                senior React/Next.js and browser engineering, full-stack and
                cloud architecture, workflow and systems thinking, internal
                tooling, and cross-functional leadership tied to measurable
                outcomes.
              </p>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: isMobile ? "0.95rem" : "1.05rem",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                Most of my impact comes from noticing the manual workflows teams
                accept as &ldquo;just how it is&rdquo; — and replacing them with
                systems that compound: an offer-creation engine that made
                deployments <strong style={{ color: accent }}>300× faster</strong>,
                a QA validation tool that{" "}
                <strong style={{ color: accent }}>
                  cut human errors by 80%
                </strong>
                , and shipped browser-native products like BrowseWell. I build to
                last — documented, accessible, tested — and bring people along,
                mentoring developers and partnering across UX, QA, and product.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {traits.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "6px 12px",
                      background: "rgba(249, 115, 22, 0.08)",
                      border: "1px solid rgba(249, 115, 22, 0.22)",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      color: "#f97316",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              style={{
                ...cardStyle,
                padding: isMobile ? "1.5rem" : "1.75rem",
              }}
            >
              <h3
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#f97316",
                  marginBottom: "0.75rem",
                }}
              >
                Education
              </h3>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fafafa" }}>
                Seneca College
              </div>
              <div style={{ color: "#d4d4d8", fontSize: "0.95rem", marginTop: "4px" }}>
                Computer Programming &amp; Analysis
              </div>
              <div style={{ color: "#a1a1aa", fontSize: "0.85rem", marginTop: "2px" }}>
                Advanced Diploma · May 2018 – Apr 2021
              </div>

              <div
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <span style={badgeStyle("#fbbf24")}>
                  <span style={{ color: "#fbbf24" }}>★</span> President&apos;s
                  Honor List
                </span>
                <span style={badgeStyle("#10b981")}>
                  <span style={{ color: "#10b981" }}>◆</span> CGPA 3.6
                </span>
                <span style={badgeStyle("#f97316")}>
                  <span style={{ color: "#f97316" }}>▲</span> Seneca Digital
                  Health Hackathon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Leadership */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.7)" }}
        id="leadership"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Technical <span style={{ color: accent }}>leadership</span>
          </h2>
          <p style={subheadingStyle}>
            Owning consequential systems, and developing the people who build them.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "1rem" : "1.5rem",
            }}
          >
            <div style={{ ...cardStyle, padding: isMobile ? "1.5rem" : "1.75rem" }}>
              <h3 style={leaderH3}>
                Technical direction
              </h3>
              <ul style={leaderUl}>
                <li>Turning ambiguous requirements into architecture</li>
                <li>Identifying the actual system constraint, not the symptom</li>
                <li>Build-vs-buy decisions and component/API contracts</li>
                <li>Scope control and incremental delivery</li>
                <li>Communicating technical risk to non-technical stakeholders</li>
              </ul>
            </div>

            <div style={{ ...cardStyle, padding: isMobile ? "1.5rem" : "1.75rem" }}>
              <h3 style={leaderH3}>
                Engineering enablement
              </h3>
              <ul style={leaderUl}>
                <li>Architecture reviews and pull-request standards</li>
                <li>Definition-of-done, testing, and release-readiness practices</li>
                <li>Reusable components, templates, and documentation</li>
                <li>Production-incident and blocker resolution</li>
                <li>Mentoring developers across distributed teams</li>
              </ul>
            </div>
          </div>

          {/* Teaching & mentorship */}
          <div
            style={{
              ...cardStyle,
              padding: isMobile ? "1.5rem" : "1.75rem",
              marginTop: isMobile ? "1rem" : "1.5rem",
            }}
          >
            <h3 style={leaderH3}>Teaching &amp; mentorship</h3>
            <p
              style={{
                color: "#a1a1aa",
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              I can explain complex systems clearly and build learning structures
              that work across levels of technical sophistication — evidenced by:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "0.75rem" : "1rem",
              }}
            >
              {[
                { role: "Computer Science Instructor", org: "Teaching" },
                { role: "Industry Mentor", org: "SAIT" },
                { role: "SMILE Mentor", org: "Seneca College" },
              ].map((m) => (
                <div
                  key={m.role}
                  style={{
                    padding: "1rem",
                    background: "rgba(249, 115, 22, 0.06)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    borderRadius: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      color: "#fafafa",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "2px",
                    }}
                  >
                    {m.role}
                  </div>
                  <div style={{ color: "#a1a1aa", fontSize: "0.82rem" }}>
                    {m.org}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.7)" }}
        id="projects"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Selected <span style={{ color: accent }}>work</span>
          </h2>
          <p style={subheadingStyle}>
            A few projects that show how I approach impact, automation, and craft.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "1rem" : "1.5rem",
            }}
          >
            {projects.map((project) => (
              <article
                key={project.title}
                style={{
                  ...cardStyle,
                  border: project.featured
                    ? "1px solid rgba(249, 115, 22, 0.45)"
                    : "1px solid rgba(63, 63, 70, 0.5)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gridColumn:
                    project.featured && !isMobile ? "1 / -1" : "auto",
                }}
              >
                {project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    style={{
                      width: "100%",
                      height: isMobile ? "180px" : "220px",
                      objectFit: "cover",
                      display: "block",
                      borderBottom: "1px solid rgba(63, 63, 70, 0.5)",
                    }}
                  />
                )}
                <div
                  style={{
                    padding: isMobile ? "1.25rem" : "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isMobile ? "1.15rem" : "1.35rem",
                        color: "#fafafa",
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.badge && (
                      <span
                        style={{
                          padding: "3px 10px",
                          background: "rgba(249, 115, 22, 0.15)",
                          border: "1px solid rgba(249, 115, 22, 0.4)",
                          borderRadius: "999px",
                          fontSize: "0.7rem",
                          color: "#f97316",
                          fontWeight: 600,
                        }}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      color: "#a1a1aa",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      marginBottom: "0.4rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    style={{
                      color: "#71717a",
                      fontSize: isMobile ? "0.7rem" : "0.75rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.kind}
                  </p>

                  <p
                    style={{
                      color: "#d4d4d8",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    {project.desc}
                  </p>

                  {/* Challenge → Result */}
                  <div
                    style={{
                      background: "rgba(249, 115, 22, 0.06)",
                      border: "1px solid rgba(249, 115, 22, 0.18)",
                      borderRadius: "0.6rem",
                      padding: isMobile ? "0.85rem" : "1rem",
                      marginBottom: "1rem",
                      fontSize: isMobile ? "0.82rem" : "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <div style={{ marginBottom: "0.5rem" }}>
                      <strong style={{ color: "#ef4444" }}>Challenge: </strong>
                      <span style={{ color: "#fafafa" }}>{project.challenge}</span>
                    </div>
                    <div>
                      <strong style={{ color: "#10b981" }}>Result: </strong>
                      <span style={{ color: "#fafafa" }}>{project.result}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: isMobile ? "0.5rem" : "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          style={{
                            color: "#f97316",
                            fontWeight: 700,
                            fontSize: isMobile ? "0.9rem" : "1rem",
                            lineHeight: 1.2,
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            color: "#a1a1aa",
                            fontSize: isMobile ? "0.7rem" : "0.75rem",
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginTop: "auto",
                      marginBottom: project.caseStudy ? "1rem" : 0,
                    }}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: isMobile
                            ? "0.2rem 0.5rem"
                            : "0.25rem 0.65rem",
                          background: "rgba(63, 63, 70, 0.5)",
                          border: "1px solid rgba(113, 113, 122, 0.3)",
                          borderRadius: "0.3rem",
                          fontSize: isMobile ? "0.68rem" : "0.72rem",
                          color: "#d4d4d8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {project.caseStudy && (
                      <a
                        href={caseStudyUrl(project.title)}
                        style={{
                          padding: isMobile ? "0.6rem 1rem" : "0.7rem 1.25rem",
                          background: "#ea580c",
                          border: "none",
                          borderRadius: "0.5rem",
                          color: "white",
                          fontSize: isMobile ? "0.82rem" : "0.9rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          textDecoration: "none",
                          transition: "background 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.background = "#c2410c";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.background = "#ea580c";
                        }}
                      >
                        Read full case study →
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: isMobile ? "0.6rem 1rem" : "0.7rem 1.25rem",
                          background: "rgba(39, 39, 42, 0.6)",
                          border: "1px solid rgba(63, 63, 70, 0.6)",
                          borderRadius: "0.5rem",
                          color: "#d4d4d8",
                          fontSize: isMobile ? "0.82rem" : "0.9rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(39, 39, 42, 0.9)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(39, 39, 42, 0.6)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {project.external.label}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.55)" }}
        id="experience"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Professional <span style={{ color: accent }}>journey</span>
          </h2>
          <p style={subheadingStyle}>
            Six years across enterprise, agency, and startup environments.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "1rem" : "1.5rem",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            {experiences.map((job) => (
              <div key={job.role} style={{ ...cardStyle, padding: isMobile ? "1.25rem" : "1.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "baseline",
                    gap: isMobile ? "0.25rem" : "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? "1.05rem" : "1.25rem",
                        color: "#fafafa",
                        lineHeight: 1.3,
                      }}
                    >
                      {job.role}
                    </h3>
                    <p
                      style={{
                        color: accent,
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        marginTop: "2px",
                      }}
                    >
                      {job.company}
                    </p>
                  </div>
                  <div
                    style={{
                      color: "#a1a1aa",
                      fontSize: isMobile ? "0.78rem" : "0.85rem",
                      textAlign: isMobile ? "left" : "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {job.period}
                    <span style={{ opacity: 0.6 }}> · {job.location}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {job.highlights.map((h, j) => (
                    <li
                      key={j}
                      style={{
                        color: "#d4d4d8",
                        marginBottom: "0.5rem",
                        fontSize: isMobile ? "0.88rem" : "0.95rem",
                        lineHeight: 1.55,
                        paddingLeft: "1.25rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: accent,
                        }}
                      >
                        →
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.7)" }} id="tech">
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Technical <span style={{ color: accent }}>expertise</span>
          </h2>
          <p style={subheadingStyle}>
            The stack I reach for, organized by where it fits in the build.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(240px, 1fr))",
              gap: isMobile ? "1rem" : "1.5rem",
            }}
          >
            {techGroups.map((group) => (
              <div
                key={group.category}
                style={{ ...cardStyle, padding: isMobile ? "1.25rem" : "1.5rem" }}
              >
                <h3
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#f97316",
                    marginBottom: "0.85rem",
                  }}
                >
                  {group.category}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: accent, fontSize: "0.9rem" }}>▸</span>
                      <span
                        style={{ color: "#d4d4d8", fontSize: "0.95rem" }}
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab & Architecture (in progress) */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.55)" }}
        id="lab"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Lab &amp; <span style={{ color: accent }}>architecture</span>
          </h2>
          <p style={subheadingStyle}>
            Systems in design or active build — shown as architecture, not as
            shipped products. Included to demonstrate range and systems thinking.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: isMobile ? "1rem" : "1.5rem",
            }}
          >
            {labProjects.map((p) => (
              <div
                key={p.name}
                style={{
                  ...cardStyle,
                  padding: isMobile ? "1.25rem" : "1.5rem",
                  borderStyle: "dashed",
                  opacity: 0.92,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.05rem" : "1.15rem",
                      color: "#fafafa",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{
                      padding: "2px 8px",
                      background: "rgba(113, 113, 122, 0.2)",
                      border: "1px solid rgba(113, 113, 122, 0.4)",
                      borderRadius: "999px",
                      fontSize: "0.62rem",
                      color: "#a1a1aa",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: isMobile ? "0.82rem" : "0.88rem",
                    lineHeight: 1.55,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        style={{ ...sectionStyle, background: "rgba(9, 9, 11, 0.7)" }}
        id="contact"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Let&apos;s <span style={{ color: accent }}>connect</span>
          </h2>
          <p style={subheadingStyle}>
            I&apos;m open to new full-stack and senior engineering roles — local to
            Calgary or remote. Tell me what you&apos;re building.
          </p>

          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "1.5rem" : "2rem",
              alignItems: "start",
            }}
          >
            {/* Direct links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="mailto:rmashrur.w749@gmail.com"
                style={contactLinkStyle(isMobile)}
              >
                ✉️ rmashrur.w749@gmail.com
              </a>
              <a
                href="tel:+14037037831"
                style={contactLinkStyle(isMobile)}
              >
                📞 +1 403-703-7831
              </a>
              <a
                href="https://www.linkedin.com/in/mashrurio"
                target="_blank"
                rel="noopener noreferrer"
                style={contactLinkStyle(isMobile)}
              >
                in /mashrurio
              </a>
              <a
                href="https://github.com/Mashrur749"
                target="_blank"
                rel="noopener noreferrer"
                style={contactLinkStyle(isMobile)}
              >
                ⌥ github.com/Mashrur749
              </a>
              <a
                href="/Mashrur_Rahman_Resume.pdf"
                download
                style={{
                  ...contactLinkStyle(isMobile),
                  color: "#f97316",
                  borderColor: "rgba(249, 115, 22, 0.4)",
                }}
              >
                ↓ Download résumé (PDF)
              </a>
            </div>

            {/* Form */}
            <form
              action="https://formspree.io/f/xgeppjgp"
              method="POST"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                style={inputStyle(isMobile)}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                style={inputStyle(isMobile)}
              />
              <textarea
                name="message"
                placeholder="What are you building?"
                rows={4}
                required
                style={{ ...inputStyle(isMobile), resize: "vertical", minHeight: "110px" }}
              />
              <button
                type="submit"
                style={{
                  padding: isMobile ? "14px 24px" : "16px 32px",
                  background: "#ea580c",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = "#c2410c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#ea580c";
                }}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function contactLinkStyle(isMobile: boolean): React.CSSProperties {
  return {
    padding: "12px 14px",
    background: "rgba(39, 39, 42, 0.5)",
    border: "1px solid rgba(63, 63, 70, 0.5)",
    borderRadius: "0.6rem",
    color: "#d4d4d8",
    fontSize: isMobile ? "0.9rem" : "0.95rem",
    textDecoration: "none",
    transition: "all 0.2s",
    display: "block",
  };
}

function inputStyle(isMobile: boolean): React.CSSProperties {
  return {
    padding: isMobile ? "12px" : "14px",
    background: "rgba(39, 39, 42, 0.5)",
    border: "1px solid rgba(63, 63, 70, 0.5)",
    borderRadius: "0.5rem",
    color: "white",
    fontSize: isMobile ? "14px" : "15px",
    outline: "none",
  };
}

function badgeStyle(_color: string): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85rem",
    color: "#d4d4d8",
  };
}

function caseStudyUrl(title: string): string {
  switch (title) {
    case "BrowseWell":
      return "/browsewell";
    case "HikmahEdu":
      return "/hikmahedu";
    case "CRM → Marketing Sync Engine":
      return "/crm-sync";
    default:
      return "/case-study";
  }
}
