"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ACCENT = "#f97316";

const testimonials = [
  {
    role: "QA Engineer",
    quote:
      "Confidence has increased for sure, now I can trust that what I did is all correct. Speed has increased at least by 70-80%. The Disclaimer comparison tool increased speed 60% — from 1-2 hours to 15-30 minutes. That's a huge difference. 80% reduction of errors in low volume releases.",
  },
  {
    role: "Project Manager",
    quote:
      "Significant increase in productivity during QA phase. The tool has put us in a more favorable position when handing over value to the client. Testing phase is now more agile and reliable, allowing us to deliver earlier. Reduced bug tickets, less human error, less back and forth between teams.",
  },
  {
    role: "Content Author",
    quote:
      "Increased confidence in logging paths — we now verify paths before logging them. The Diff Tool saves us 25 minutes on path verification. Enhanced release success — we can track missing paths in less than 5 minutes versus 30 minutes previously.",
  },
  {
    role: "Tech Lead / Release Manager",
    quote:
      "Operation time saving especially for QAs. Delivered content quality improvement — teams can spot problems easily. Workflow simplification makes conversations easier. Future potential to integrate other disciplines' workflows.",
  },
  {
    role: "Client Stakeholder",
    quote:
      "Increased speed to market and ability to respond to emergent business needs. Reduced liability on legal compliance. Increased throughput for more return on investment — we can work faster and get more done in the same amount of time with the same amount of people.",
  },
];

export default function CaseStudy() {
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
        <Eyebrow>Enterprise production · Critical Mass</Eyebrow>
        <h1 style={h1Style}>Content Sync Validator</h1>
        <p style={ledeStyle}>
          An automated content-validation tool that compares staging vs.
          production content and surfaces discrepancies before release —
          replacing an error-prone manual process and restoring team confidence.
        </p>

        {/* Executive summary */}
        <Section title="Executive summary" accent>
          <p style={pStyle}>
            An enterprise team hit recurring production errors after content
            approval in an AEM multi-environment setup — content authored in
            staging frequently mismatched production, costing 25–30 hours per
            release and eroding launch confidence. I initiated and led an
            automated validation tool that compares staging vs. production
            content, surfaces discrepancies with their content paths, and was
            adopted into the formal QA workflow across three teams — reducing
            human errors by up to 80%.
          </p>
        </Section>

        <Section title="My role">
          <p style={pStyle}>
            Initiated and led the project end to end: problem discovery,
            stakeholder research, solution design, implementation, and iteration
            with users. A shipped production tool integrated into the team&apos;s
            formal QA process — not a prototype.
          </p>
        </Section>

        <Section title="Constraints">
          <ul style={ulStyle}>
            <li>AEM multi-environment setup with no programmatic validation between staging and production</li>
            <li>Manual, multi-step release workflow spanning Content, Release Management, and QA</li>
            <li>High mean-time-to-detection — errors surfaced days after introduction</li>
            <li>QA performed bi-weekly manual regression across 31 pages</li>
            <li>Each error triggered a cascade of tickets, reviews, and re-deployments</li>
          </ul>
        </Section>

        <Section title="The broken workflow">
          <p style={pStyle}>The process I inherited:</p>
          <ol style={ulStyle}>
            <li>Content authors update content while manually documenting fragment paths in Jira</li>
            <li>Release managers collect paths from multiple tickets for production publishing</li>
            <li>QA performs word-by-word comparison to catch discrepancies</li>
            <li>Missing paths trigger a multi-step resolution process with additional QA cycles</li>
          </ol>
        </Section>

        <Section title="Architecture">
          <CodeBlock>
{`Staging content  ┐
                 ├→ Deep comparison engine (page variation data)
Production content┘
        ↓
Visual diff table (staging vs. production discrepancies)
        ↓
Content-path extraction (for release management)
        ↓
Real-time validation + error reporting`}
          </CodeBlock>
          <p style={{ ...pStyle, marginTop: "1rem" }}>
            The core is a deep comparison engine over AEM page-variation data,
            producing a visual diff table and extracting the exact content paths
            release managers need — eliminating manual field extraction from
            fragment paths.
          </p>
        </Section>

        <Section title="Key technical decisions">
          <Decision
            context="The biggest constraint was no automated way to compare staging vs. production."
            decision="An MVP focused on immediate visibility into content differences plus content paths for quick resolution — built in roughly 2 hours using GitHub Copilot."
            tradeoff="Deliberately minimal v1 to validate value fast, in exchange for features that arrived in later iterations."
          />
          <Decision
            context="Authors and release managers still manually extracted fields from fragment paths."
            decision="v2 added a unique content-path extraction button, removing manual field extraction."
            tradeoff="More surface area, in exchange for eliminating a tedious, error-prone step."
          />
          <Decision
            context="A new disclaimer-matrix validation need emerged, risking a from-scratch build."
            decision="v3 reused the existing comparison engine for Excel-upload disclaimer validation, reusing logic for efficiency."
            tradeoff="Slight coupling, in exchange for fast delivery and dramatically increased QA adoption."
          />
        </Section>

        <Section title="Iteration with users">
          <p style={pStyle}>
            Through observation and partnership with users, the tool grew across
            three versions:
          </p>
          <ul style={ulStyle}>
            <li><strong>v1 (MVP):</strong> deep comparison, visual diff, content-path extraction, real-time validation</li>
            <li><strong>v2:</strong> path-extraction button for authors/release managers; in-tool diff highlighting for QA</li>
            <li><strong>v3:</strong> disclaimer-matrix validation via Excel upload, reusing the comparison engine</li>
          </ul>
        </Section>

        <Section title="Reliability & quality">
          <ul style={ulStyle}>
            <li>Real-time validation replacing days-lag detection</li>
            <li>In-tool diff highlighting — no external comparison tools or context-switching</li>
            <li>Error and unsupported-field reporting with content paths for fast resolution</li>
            <li>Reused, proven comparison logic as the stable core across new features</li>
          </ul>
        </Section>

        <Section title="Results">
          <p style={pStyle}>Measured before → after impact:</p>
          <div style={gridStyle(isMobile)}>
            {[
              { title: "Production quality", before: "3–5 errors per release", after: "Zero errors", metric: "Up to 80% fewer errors", color: "#f97316" },
              { title: "QA efficiency", before: "30 hours overhead", after: "< 1 hour", metric: "96% faster", color: "#10b981" },
              { title: "Disclaimer validation", before: "2 hours manual", after: "15 minutes automated", metric: "87% faster", color: "#10b981" },
              { title: "Error detection", before: "2–3 days lag", after: "Real-time", metric: "Instant feedback", color: "#f97316" },
            ].map((item) => (
              <div key={item.title} style={impactCardStyle}>
                <div style={{ fontWeight: 700, color: "#fafafa", marginBottom: "0.6rem" }}>{item.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ color: "#ef4444", textDecoration: "line-through", opacity: 0.8, fontSize: "0.85rem" }}>{item.before}</span>
                  <span style={{ color: "#a1a1aa" }}>→</span>
                  <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 600 }}>{item.after}</span>
                </div>
                <span style={metricBadgeStyle(item.color)}>{item.metric}</span>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: "1rem" }}>Qualitatively: restored team confidence, formal QA-process integration, a cultural shift from reactive firefighting to proactive validation, and cross-team adoption beyond the initial user group.</p>
        </Section>

        <Section title="Leadership & recognition">
          <div style={speakerCardStyle}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎤</div>
            <h3 style={{ fontSize: "1.2rem", color: ACCENT, marginBottom: "0.5rem" }}>Invited speaker</h3>
            <p style={{ ...pStyle, marginBottom: "0.5rem" }}>
              Presented the problem-solving methodology and tool-development process to
            </p>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: ACCENT, marginBottom: "0.25rem" }}>
              ~200 members of the technology discipline
            </div>
            <p style={{ color: "#a1a1aa", fontStyle: "italic", fontSize: "0.9rem" }}>
              Invited to share insights and inspire similar innovation initiatives across the organization.
            </p>
          </div>
        </Section>

        <Section title="Methodologies applied">
          <div style={methodGridStyle(isMobile)}>
            {[
              { name: "Design Thinking", desc: "Empathize, Define, Ideate, Prototype, Test" },
              { name: "The Mom Test", desc: "Unbiased user research techniques" },
              { name: "Systems Thinking", desc: "Understanding causal loops and feedback" },
              { name: "Jobs-to-be-Done", desc: "Functional, emotional, social needs" },
              { name: "RICE Scoring", desc: "Reach, Impact, Confidence, Effort" },
              { name: "Root Cause Analysis", desc: "5 Whys to identify core problems" },
              { name: "SCAMPER", desc: "Creative problem-solving for ideation" },
              { name: "MVP Approach", desc: "Earliest Usable Lovable Product" },
            ].map((m) => (
              <div key={m.name} style={methodCardStyle}>
                <div style={{ fontWeight: 700, color: ACCENT, marginBottom: "0.15rem" }}>{m.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#a1a1aa" }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Retrospective">
          <ol style={ulStyle}>
            <li><strong>Partnership drives adoption:</strong> working alongside users during implementation inspired formal integration.</li>
            <li><strong>Observation reveals hidden needs:</strong> watching actual usage uncovered impactful improvements.</li>
            <li><strong>Reusability accelerates development:</strong> leveraging existing code for new features maximized efficiency.</li>
            <li><strong>Small tools, big impact:</strong> a ~2-hour MVP solved a problem costing 25–30 hours per release.</li>
          </ol>
        </Section>

        <Section title="Proof">
          <div style={{ display: "grid", gap: "1rem" }}>
            {testimonials.map((t) => (
              <blockquote key={t.role} style={quoteStyle}>
                <div style={quoteRoleStyle}>{t.role}</div>
                <p style={{ margin: 0, fontStyle: "italic", lineHeight: 1.7, color: "#d4d4d8" }}>{t.quote}</p>
              </blockquote>
            ))}
          </div>
          <p style={{ ...pStyle, marginTop: "1rem", color: "#a1a1aa", fontSize: "0.9rem" }}>
            Plus: invited presentation to ~200 technology-discipline members, and adoption into the formal QA workflow across three teams.
          </p>
        </Section>

        <CTA />
      </div>
    </div>
  );
}

/* ---------- shared components ---------- */

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
    <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, fontWeight: 600, marginBottom: "0.5rem" }}>
      {children}
    </p>
  );
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem", color: accent ? ACCENT : "#fafafa" }}>{title}</h2>
      {children}
    </section>
  );
}

function Decision({ context, decision, tradeoff }: { context: string; decision: string; tradeoff: string }) {
  return (
    <div style={{ background: "rgba(39, 39, 42, 0.5)", border: "1px solid rgba(63, 63, 70, 0.5)", borderRadius: "0.6rem", padding: "1rem", marginBottom: "0.75rem" }}>
      <p style={{ ...pStyle, margin: 0, marginBottom: "0.4rem" }}><strong style={{ color: "#a1a1aa" }}>Context: </strong>{context}</p>
      <p style={{ ...pStyle, margin: 0, marginBottom: "0.4rem" }}><strong style={{ color: ACCENT }}>Decision: </strong>{decision}</p>
      <p style={{ ...pStyle, margin: 0 }}><strong style={{ color: "#a1a1aa" }}>Tradeoff: </strong>{tradeoff}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(63, 63, 70, 0.5)", borderRadius: "0.5rem", padding: "1rem", color: "#d4d4d8", fontSize: "0.8rem", lineHeight: 1.6, overflowX: "auto", margin: 0 }}>
      {children}
    </pre>
  );
}

function CTA() {
  return (
    <div style={{ marginTop: "3rem", padding: "1.75rem", background: "rgba(249, 115, 22, 0.08)", border: "1px solid rgba(249, 115, 22, 0.3)", borderRadius: "0.75rem", textAlign: "center" }}>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Want to talk automation &amp; quality engineering?</h3>
      <p style={{ color: "#a1a1aa", marginBottom: "1.25rem" }}>I&apos;m open to senior product-engineering and technical-lead roles.</p>
      <a href="mailto:rmashrur.w749@gmail.com?subject=Reaching out — Content Sync Validator" style={{ display: "inline-block", padding: "0.7rem 1.75rem", background: "#ea580c", border: "none", borderRadius: "0.5rem", color: "white", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
        Get in touch
      </a>
    </div>
  );
}

/* ---------- styles ---------- */

const pStyle: React.CSSProperties = { lineHeight: 1.8, marginBottom: "0.75rem", color: "#d4d4d8" };
const ulStyle: React.CSSProperties = { lineHeight: 1.8, paddingLeft: "1.25rem", color: "#d4d4d8", margin: 0 };
const h1Style: React.CSSProperties = { fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.1, letterSpacing: "-0.02em" };
const ledeStyle: React.CSSProperties = { fontSize: "1.15rem", color: "#d4d4d8", lineHeight: 1.7, marginBottom: "1.5rem" };
const impactCardStyle: React.CSSProperties = { background: "rgba(39, 39, 42, 0.5)", border: "1px solid rgba(63, 63, 70, 0.5)", borderRadius: "0.6rem", padding: "1rem" };
const speakerCardStyle: React.CSSProperties = { background: "linear-gradient(135deg, rgba(249, 115, 22, 0.06), rgba(251, 146, 60, 0.04))", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "0.75rem", padding: "1.75rem", textAlign: "center" };
const quoteStyle: React.CSSProperties = { background: "rgba(39, 39, 42, 0.5)", border: "1px solid rgba(63, 63, 70, 0.5)", borderRadius: "0.6rem", padding: "1.25rem", margin: 0, position: "relative" };
const quoteRoleStyle: React.CSSProperties = { position: "absolute", top: "-10px", left: "16px", background: "#0f0f10", padding: "0 8px", color: ACCENT, fontWeight: 700, fontSize: "0.8rem" };
const methodCardStyle: React.CSSProperties = { background: "rgba(39, 39, 42, 0.5)", border: "1px solid rgba(63, 63, 70, 0.5)", borderRadius: "0.5rem", padding: "0.85rem" };

function pageStyle(isMobile: boolean): React.CSSProperties {
  return { minHeight: "100vh", background: "linear-gradient(to bottom, #0f0f10, #1a1a1d)", color: "#fafafa", padding: isMobile ? "1.5rem" : "2rem" };
}
function gridStyle(isMobile: boolean): React.CSSProperties {
  return { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem", marginBottom: "0.5rem" };
}
function methodGridStyle(isMobile: boolean): React.CSSProperties {
  return { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" };
}
function metricBadgeStyle(color: string): React.CSSProperties {
  return { display: "inline-block", background: `${color}20`, border: `1px solid ${color}50`, borderRadius: "1rem", padding: "0.2rem 0.65rem", fontSize: "0.78rem", color, fontWeight: 700 };
}
