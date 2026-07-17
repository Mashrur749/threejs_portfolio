"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ACCENT = "#f97316";

const WEBSTORE =
  "https://chromewebstore.google.com/detail/browsewell/iemgfcmhponpadhlnnfoolpmolpjohnp";
const SITE = "https://browsewell.app/";
const DEMO = "https://www.youtube.com/watch?v=mNuE8cfN5jc";

export default function BrowseWellCaseStudy() {
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
        <Eyebrow>Independent product · shipped</Eyebrow>
        <h1 style={h1Style}>BrowseWell</h1>
        <p style={ledeStyle}>
          A browser-native attention-management system — not a website blocker,
          but a policy and intervention engine that operates across dynamic,
          SPA-driven sites. Live on the Chrome Web Store.
        </p>

        {/* Proof bar */}
        <div style={proofBarStyle(isMobile)}>
          <a href={WEBSTORE} target="_blank" rel="noopener noreferrer" style={proofLinkStyle(true)}>
            Install on Chrome Web Store →
          </a>
          <a href={SITE} target="_blank" rel="noopener noreferrer" style={proofLinkStyle(false)}>
            browsewell.app
          </a>
          <a href={DEMO} target="_blank" rel="noopener noreferrer" style={proofLinkStyle(false)}>
            ▶ Product demo
          </a>
        </div>

        {/* Executive summary */}
        <Section title="Executive summary" accent>
          <p style={pStyle}>
            People who need the internet to <em>work</em>, not hypnotize them,
            are poorly served by binary site-blockers that break on modern
            single-page apps. BrowseWell is a Chrome extension (Manifest V3) that
            enforces attention policies at site, page, and element granularity,
            with intention checks, timed access, and deliberate overrides — all
            processed locally for privacy. I own it from concept through shipped
            product, including brand and the <strong>browsewell.app</strong>{" "}
            domain.
          </p>
        </Section>

        {/* Role */}
        <Section title="My role">
          <p style={pStyle}>
            Independent owner: product strategy, brand, architecture, and
            implementation. A shipped production product, not a prototype or spec.
          </p>
        </Section>

        {/* Constraints */}
        <Section title="Constraints">
          <ul style={ulStyle}>
            <li>Chrome Manifest V3 service-worker lifecycle and permissions model</li>
            <li>Dynamic, SPA-controlled DOMs that mutate without page reloads</li>
            <li>Privacy: attention data must never leave the device</li>
            <li>Performance: interventions must not degrade host-page responsiveness</li>
            <li>Resilient element selection across sites that change constantly</li>
          </ul>
        </Section>

        {/* Architecture */}
        <Section title="Architecture">
          <p style={pStyle}>
            A policy and intervention engine layered over the browser, not a
            hard-coded blocklist:
          </p>
          <CodeBlock>
{`Rule Definition (site / path / selector)
        ↓
Content-script lifecycle + SPA route detection
        ↓
DOM mutation observation
        ↓
Policy evaluation (intervention state machine)
        ↓
Intervention apply / pause / override
        ↓
Local storage + settings sync`}
          </CodeBlock>
          <p style={{ ...pStyle, marginTop: "1rem" }}>
            Rules evaluate at three levels — entire site, page, and individual
            element — so useful functionality survives while distracting elements
            are suppressed. An intervention-state machine governs timed access,
            temporary pauses, and deliberate typed overrides rather than permanent
            disabling.
          </p>
        </Section>

        {/* Key decisions */}
        <Section title="Key technical decisions">
          <Decision
            context="MV3 restricts long-running background work to a service worker."
            decision="Stateless policy evaluation triggered by content-script events and alarms; persistent state lives in synced storage."
            tradeoff="Slightly more re-evaluation overhead in exchange for MV3 compliance and crash-safe state."
          />
          <Decision
            context="SPA route changes don't fire normal page-load events."
            decision="History-API and mutation-observer based route detection to re-evaluate policy on view changes."
            tradeoff="More moving parts, but correct behavior on React/Vue/SPA sites where naive blockers silently fail."
          />
          <Decision
            context="Attention data is sensitive."
            decision="All evaluation and storage is local; nothing is transmitted off-device."
            tradeoff="No cross-device cloud intelligence, in exchange for a privacy posture users can actually trust."
          />
        </Section>

        {/* Reliability */}
        <Section title="Reliability & quality">
          <ul style={ulStyle}>
            <li>Resilient selector strategies that degrade gracefully when a site changes</li>
            <li>Intervention-state machine with safe pause/override recovery</li>
            <li>Performance-conscious content scripts to minimize host-page impact</li>
            <li>Keyboard-accessible overrides and settings</li>
            <li>Automated test matrix across representative site archetypes</li>
          </ul>
        </Section>

        {/* Leadership */}
        <Section title="Leadership & ownership">
          <p style={pStyle}>
            BrowseWell demonstrates independent ownership from concept through
            shipped product: identifying a real user problem, making product and
            monetization decisions, designing the architecture, and shipping to a
            public store with a branded product site.
          </p>
        </Section>

        {/* Results */}
        <Section title="Results">
          <p style={pStyle}>
            A shipped, publicly installable product with a finalized brand and
            dedicated domain — demonstrating browser-platform expertise, product
            engineering, state-machine design, and privacy-aware architecture end
            to end.
          </p>
        </Section>

        {/* Retrospective */}
        <Section title="Retrospective">
          <ul style={ulStyle}>
            <li>
              <strong>What I&apos;d change:</strong> invest earlier in a broader
              cross-site test matrix to catch selector regressions before users do.
            </li>
            <li>
              <strong>Intentionally deferred:</strong> cloud sync of rule sets —
              deferred to preserve the local-only privacy guarantee.
            </li>
            <li>
              <strong>Next version:</strong> richer intervention analytics and
              shared, community rule packs.
            </li>
          </ul>
        </Section>

        {/* Proof */}
        <Section title="Proof">
          <ul style={ulStyle}>
            <li>
              <a href={WEBSTORE} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Live product — Chrome Web Store listing
              </a>
            </li>
            <li>
              <a href={SITE} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Product site — browsewell.app
              </a>
            </li>
            <li>
              <a href={DEMO} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Product demo walkthrough (video)
              </a>
            </li>
          </ul>
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
        Want to talk browser engineering?
      </h3>
      <p style={{ color: "#a1a1aa", marginBottom: "1.25rem" }}>
        I&apos;m open to senior product-engineering and technical-lead roles.
      </p>
      <a
        href="mailto:rmashrur.w749@gmail.com?subject=Reaching out — BrowseWell"
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
