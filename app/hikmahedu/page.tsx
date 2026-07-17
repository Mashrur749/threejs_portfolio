"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ACCENT = "#f97316";
const SITE = "https://hikmahedu.com/";

export default function HikmahEduCaseStudy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={pageStyle(isMobile)}>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "2rem" }}>
        <BackLink />
        <Eyebrow>0-to-1 product · client engagement</Eyebrow>
        <h1 style={h1Style}>HikmahEdu</h1>
        <p style={ledeStyle}>
          An education brand and digital platform I led from initial brand
          direction through product structure, user experience, visual design,
          and a reusable design system — translating an education-business
          concept into a cohesive, launch-ready product. Built for a client.
        </p>

        <div style={proofBarStyle(isMobile)}>
          <a href={SITE} target="_blank" rel="noopener noreferrer" style={proofLinkStyle(true)}>
            Visit hikmahedu.com →
          </a>
        </div>

        <Section title="Executive summary" accent>
          <p style={pStyle}>
            HikmahEdu needed to exist as a credible, coherent institution online
            — not just a website. I led the 0-to-1 build: brand positioning and
            identity, product and information architecture, UX and visual design,
            a design system that bridged brand and code, and the platform itself.
            The distinctive work is the design-to-engineering system that turned
            brand decisions into maintainable interface primitives.
          </p>
        </Section>

        <Section title="My role">
          <p style={pStyle}>
            Led the full 0-to-1 as designer and engineer for the client:
            product ideation, brand development, UX architecture, visual
            direction, design-system design, technical decisions, application
            development, and launch. I was not handed finalized Figma — I
            produced the direction and carried it through to a shipped platform.
          </p>
        </Section>

        <Section title="Constraints">
          <ul style={ulStyle}>
            <li>An ambiguous concept with no prior brand or product</li>
            <li>Multiple content types and audiences (learners, educators, parents, community)</li>
            <li>Editorial flexibility vs. visual consistency in tension</li>
            <li>Designed for both visitors and content administrators</li>
            <li>SEO without compromising design</li>
            <li>An achievable initial release with a deferrable roadmap (e.g. membership, monetization)</li>
          </ul>
        </Section>

        <Section title="Architecture">
          <CodeBlock>
{`Content & Administrative Layer (CMS)
        ↓
Content Models & APIs
        ↓
Application & Rendering Layer
        ↓
Reusable Design System (tokens → components)
        ↓
Public Website, Profiles & Member Experiences
        ↓
Analytics, SEO & External Integrations`}
          </CodeBlock>
          <p style={{ ...pStyle, marginTop: "1rem" }}>
            A CMS-driven content layer feeds typed content models through a
            rendering layer built on a reusable design system. The system
            separates content configuration from presentation, so non-technical
            authors can publish without engineering involvement.
          </p>
        </Section>

        <Section title="Design-to-engineering system (the distinctive part)">
          <p style={pStyle}>
            The most valuable work was bridging brand and code. Brand decisions
            were encoded as a token layer that downstream components consumed
            directly:
          </p>
          <ul style={ulStyle}>
            <li><strong>Design tokens</strong> — colour variables, type scales, spacing rules</li>
            <li><strong>Layout primitives</strong> — responsive, composable building blocks</li>
            <li><strong>Reusable components &amp; content patterns</strong> — consistent across every page type</li>
            <li><strong>Responsive behaviour &amp; accessibility constraints</strong> — baked into primitives, not re-derived per page</li>
            <li><strong>Authoring rules</strong> — so content editors work within the system rather than against it</li>
          </ul>
          <p style={{ ...pStyle, marginTop: "0.5rem" }}>
            This is what keeps a brand-driven site from becoming unmaintainable —
            a flexible visual system expressed as deterministic engineering
            primitives.
          </p>
        </Section>

        <Section title="Key decisions">
          <Decision
            context="Editorial flexibility and visual consistency pull in opposite directions."
            decision="A token-and-primitive design system: authors compose within constrained, on-brand components rather than free-form layouts."
            tradeoff="Less per-page creative freedom, in exchange for a site that stays coherent and maintainable as it grows."
          />
          <Decision
            context="The site must serve both visitors and content administrators."
            decision="A CMS-driven content-model layer that separates content configuration from application code."
            tradeoff="Up-front modeling investment, in exchange for authors publishing without engineering."
          />
          <Decision
            context="Everything can't ship at launch."
            decision="A defined launch scope with membership and monetization deferred to a roadmap, keeping the first release achievable."
            tradeoff="Deferred revenue features, in exchange for a credible, shoppable launch sooner."
          />
        </Section>

        <Section title="Reliability & quality">
          <ul style={ulStyle}>
            <li>Reusable design system enforcing accessibility constraints at the primitive level</li>
            <li>Responsive-image handling and performance-conscious rendering</li>
            <li>SEO and metadata architecture without compromising design</li>
            <li>Content-model design that prevents the site from becoming hard to maintain</li>
            <li>Deployment and ongoing content-update workflow for the client</li>
          </ul>
        </Section>

        <Section title="Leadership & ownership">
          <p style={pStyle}>
            Carried an ambiguous idea through implementation: product ideation,
            business requirements, brand development, UX architecture, visual
            direction, technical decisions, application development,
            content-system design, deployment, and stakeholder communication —
            communicating fluently across technical and non-technical concerns.
          </p>
        </Section>

        <Section title="Results">
          <p style={pStyle}>
            A cohesive, launch-ready brand and platform where brand strategy
            became design tokens, design tokens became reusable components, and
            those components became a maintainable, CMS-driven site —
            demonstrating 0-to-1 product ownership, design engineering, and
            product strategy end to end.
          </p>
        </Section>

        <Section title="Retrospective">
          <ul style={ulStyle}>
            <li>
              <strong>What I&apos;d change:</strong> formalize the design-system
              documentation earlier — the tokens were right, but authoring rules
              matured after launch.
            </li>
            <li>
              <strong>Intentionally deferred:</strong> membership and
              monetization flows, deliberately scoped out of v1.
            </li>
            <li>
              <strong>Next version:</strong> personalized profile experiences and
              richer community capabilities on top of the existing content model.
            </li>
          </ul>
        </Section>

        <Section title="Proof">
          <ul style={ulStyle}>
            <li>
              <a href={SITE} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Live site — hikmahedu.com
              </a>
            </li>
            <li>Brand identity, design system, and architecture documented above</li>
            <li>Final desktop and mobile screens available on request</li>
          </ul>
        </Section>

        <CTA />
      </div>
    </div>
  );
}

/* ---------- shared components (same pattern as the other case studies) ---------- */

function BackLink() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-block",
        marginBottom: "1.5rem",
        padding: "0.4rem 0.9rem",
        background: "rgba(249, 115, 22, 0.1)",
        border: "1px solid rgba(249, 115, 22, 0.3)",
        borderRadius: "0.5rem",
        color: ACCENT,
        fontSize: "0.85rem",
        textDecoration: "none",
      }}
    >
      ← Back to portfolio
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.8rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: ACCENT,
        fontWeight: 600,
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </p>
  );
}

function Section({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "1.4rem",
          marginBottom: "0.75rem",
          color: accent ? ACCENT : "#fafafa",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Decision({
  context,
  decision,
  tradeoff,
}: {
  context: string;
  decision: string;
  tradeoff: string;
}) {
  return (
    <div
      style={{
        background: "rgba(39, 39, 42, 0.5)",
        border: "1px solid rgba(63, 63, 70, 0.5)",
        borderRadius: "0.6rem",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <p style={{ ...pStyle, margin: 0, marginBottom: "0.4rem" }}>
        <strong style={{ color: "#a1a1aa" }}>Context: </strong>
        {context}
      </p>
      <p style={{ ...pStyle, margin: 0, marginBottom: "0.4rem" }}>
        <strong style={{ color: ACCENT }}>Decision: </strong>
        {decision}
      </p>
      <p style={{ ...pStyle, margin: 0 }}>
        <strong style={{ color: "#a1a1aa" }}>Tradeoff: </strong>
        {tradeoff}
      </p>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(63, 63, 70, 0.5)",
        borderRadius: "0.5rem",
        padding: "1rem",
        color: "#d4d4d8",
        fontSize: "0.8rem",
        lineHeight: 1.6,
        overflowX: "auto",
        margin: 0,
      }}
    >
      {children}
    </pre>
  );
}

function CTA() {
  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "1.75rem",
        background: "rgba(249, 115, 22, 0.08)",
        border: "1px solid rgba(249, 115, 22, 0.3)",
        borderRadius: "0.75rem",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        Want to talk design engineering?
      </h3>
      <p style={{ color: "#a1a1aa", marginBottom: "1.25rem" }}>
        I&apos;m open to senior product-engineering and technical-lead roles.
      </p>
      <a
        href="mailto:rmashrur.w749@gmail.com?subject=Reaching out — HikmahEdu"
        style={{
          display: "inline-block",
          padding: "0.7rem 1.75rem",
          background: "#ea580c",
          border: "none",
          borderRadius: "0.5rem",
          color: "white",
          fontSize: "0.95rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Get in touch
      </a>
    </div>
  );
}

/* ---------- styles ---------- */

const pStyle: React.CSSProperties = {
  lineHeight: 1.8,
  marginBottom: "0.75rem",
  color: "#d4d4d8",
};

const ulStyle: React.CSSProperties = {
  lineHeight: 1.8,
  paddingLeft: "1.25rem",
  color: "#d4d4d8",
  margin: 0,
};

const linkStyle: React.CSSProperties = {
  color: ACCENT,
};

const h1Style: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: 800,
  marginBottom: "0.5rem",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
};

const ledeStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  color: "#d4d4d8",
  lineHeight: 1.7,
  marginBottom: "1.5rem",
};

function pageStyle(isMobile: boolean): React.CSSProperties {
  return {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #0f0f10, #1a1a1d)",
    color: "#fafafa",
    padding: isMobile ? "1.5rem" : "2rem",
  };
}

function proofBarStyle(isMobile: boolean): React.CSSProperties {
  return {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginBottom: "2.5rem",
    flexDirection: isMobile ? "column" : "row",
  };
}

function proofLinkStyle(primary: boolean): React.CSSProperties {
  return {
    padding: "0.6rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.88rem",
    fontWeight: 600,
    textDecoration: "none",
    background: primary ? "#ea580c" : "rgba(39, 39, 42, 0.6)",
    color: "white",
    border: primary ? "none" : "1px solid rgba(63, 63, 70, 0.6)",
    textAlign: "center",
  };
}
