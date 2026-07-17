"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ACCENT = "#f97316";

export default function CrmSyncCaseStudy() {
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
        <Eyebrow>Built automation system</Eyebrow>
        <h1 style={h1Style}>CRM → Marketing Sync Engine</h1>
        <p style={ledeStyle}>
          An idempotent customer-data synchronization framework that keeps CRM
          and marketing platforms consistent — built with n8n as a
          platform-agnostic reference system, not &ldquo;an n8n workflow.&rdquo;
        </p>

        {/* Executive summary */}
        <Section title="Executive summary" accent>
          <p style={pStyle}>
            CRM and marketing platforms hold overlapping but inconsistent contact
            records. This system incrementally retrieves CRM contacts, resolves
            identity against existing subscribers, and applies a field-ownership
            merge policy with safe, idempotent upserts — handling conflicts,
            partial-failure retries, and rate limits without destroying
            marketing-owned data.
          </p>
        </Section>

        {/* Role */}
        <Section title="My role">
          <p style={pStyle}>
            Architect and implementer of the synchronization framework — from the
            initial CRM-to-marketing implementation to the redesigned,
            platform-agnostic reference system. Built system, not a prototype.
          </p>
        </Section>

        {/* Constraints */}
        <Section title="Constraints">
          <ul style={ulStyle}>
            <li>Overlapping but inconsistent records across two systems</li>
            <li>Field ownership split: CRM owns some fields, marketing owns others</li>
            <li>Workflows retried after partial completion must be safe to replay</li>
            <li>API rate limits and transient failures</li>
            <li>Malformed, duplicated, or conflicting inbound records</li>
          </ul>
        </Section>

        {/* Architecture */}
        <Section title="Architecture">
          <CodeBlock>
{`Trigger / Scheduler
        ↓
Incremental CRM retrieval (watermark + checkpoint)
        ↓
Normalization
        ↓
Identity resolution
        ↓
Existing subscriber lookup
        ↓
Create / Update / Enrich decision
        ↓
Field + tag merge policy (union, not replacement)
        ↓
Destination upsert (idempotent)
        ↓
Audit log + checkpoint
        ↓
Retry / dead-letter handling`}
          </CodeBlock>
          <p style={{ ...pStyle, marginTop: "1rem" }}>
            A checkpoint and watermark model makes synchronization incremental and
            replayable: if a run fails partway, it resumes from the last
            checkpoint rather than reprocessing everything. Unresolvable records
            route to a dead-letter path for human review instead of silently
            failing.
          </p>
        </Section>

        {/* Key decisions */}
        <Section title="Key technical decisions">
          <Decision
            context="Retried workflows risk duplicating or clobbering records."
            decision="Idempotent upserts keyed on resolved identity, so a record processed twice produces the same end state as once."
            tradeoff="More work in identity resolution, in exchange for safe, unattended retries."
          />
          <Decision
            context="CRM tags and marketing-owned tags coexist on the same subscriber."
            decision="Tag union by source — CRM tags are added without removing marketing-owned tags."
            tradeoff="Slightly more complex merge logic, in exchange for never destroying marketing data."
          />
          <Decision
            context="Fields conflict between systems (e.g. different email or name)."
            decision="A field-ownership matrix defines which system is source-of-truth per field; conflicts are logged, not silently overwritten."
            tradeoff="Explicit conflict surface, in exchange for auditable, predictable merges."
          />
        </Section>

        {/* Reliability */}
        <Section title="Reliability & quality">
          <ul style={ulStyle}>
            <li>Idempotent upserts — safe under retry and partial completion</li>
            <li>Incremental sync with watermarks and checkpoints</li>
            <li>Retry with backoff and rate-limit handling</li>
            <li>Dead-letter workflow for unresolvable records</li>
            <li>Audit log and replayability for every processed record</li>
            <li>Operational alerts on failure paths</li>
          </ul>
        </Section>

        {/* Leadership */}
        <Section title="Leadership & ownership">
          <p style={pStyle}>
            Generalized a point-to-point integration into a reusable,
            platform-agnostic reference architecture — deciding system
            boundaries, ownership rules, and failure semantics rather than just
            connecting two SaaS tools.
          </p>
        </Section>

        {/* Results */}
        <Section title="Results">
          <p style={pStyle}>
            A replayable, auditable synchronization system reliable enough to run
            unattended — demonstrating distributed-workflow thinking, integration
            architecture, data-consistency design, and operational observability.
          </p>
        </Section>

        {/* Retrospective */}
        <Section title="Retrospective">
          <ul style={ulStyle}>
            <li>
              <strong>What I&apos;d change:</strong> surface a richer operational
              dashboard earlier; checkpoints made debugging easy, but visibility
              came later than it should have.
            </li>
            <li>
              <strong>Intentionally deferred:</strong> a self-serve adapter DSL so
              non-engineers can onboard new destinations.
            </li>
            <li>
              <strong>Next version:</strong> automated reconciliation reports and
              drift detection between systems.
            </li>
          </ul>
        </Section>

        {/* Proof */}
        <Section title="Proof">
          <ul style={ulStyle}>
            <li>Working n8n implementation of the synchronization framework</li>
            <li>CRM-agnostic architecture diagram (above)</li>
            <li>Field-ownership matrix and example mapping configuration</li>
            <li>Failure-path and dead-letter demonstration available on request</li>
          </ul>
        </Section>

        <CTA />
      </div>
    </div>
  );
}

/* ---------- shared components (same pattern as /browsewell) ---------- */

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
        Want to talk integration architecture?
      </h3>
      <p style={{ color: "#a1a1aa", marginBottom: "1.25rem" }}>
        I&apos;m open to senior product-engineering and technical-lead roles.
      </p>
      <a
        href="mailto:rmashrur.w749@gmail.com?subject=Reaching out — CRM Sync"
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
