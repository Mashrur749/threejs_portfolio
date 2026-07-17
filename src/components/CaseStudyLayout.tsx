"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { color } from "@/lib/tokens";
import { Reveal, PrimaryLink, CodeBlock as CodeBlockP, Decision as DecisionP } from "@/components/primitives";

export type ProofLink = { label: string; href: string; primary?: boolean };

export function CaseStudyLayout({
  eyebrow,
  title,
  lede,
  proofLinks = [],
  children,
  ctaSubject,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  proofLinks?: ProofLink[];
  children: ReactNode;
  ctaSubject: string;
}) {
  return (
    <div style={pageStyle}>
      <style jsx>{`
        .cs-wrap { max-width: 800px; margin: 0 auto; padding-top: 2rem; }
        .cs-proof { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2.5rem; }
        @media (max-width: 600px) { .cs-proof { flex-direction: column; } }
        .cs-section { margin-bottom: 2.5rem; }
        .cs-h2 { font-size: 1.4rem; margin-bottom: 0.75rem; line-height: 1.2; }
        .cs-cta { margin-top: 3rem; padding: 1.75rem; background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.3); border-radius: 0.75rem; text-align: center; }
        .cs-cta h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .cs-cta p { color: ${color.textMuted}; margin-bottom: 1.25rem; }
      `}</style>
      <div className="cs-wrap">
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: "1.5rem",
            padding: "0.4rem 0.9rem",
            background: "rgba(249, 115, 22, 0.1)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "0.5rem",
            color: color.accent,
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          ← Back to portfolio
        </Link>

        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: color.accent, fontWeight: 600, marginBottom: "0.5rem" }}>
          {eyebrow}
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p style={{ fontSize: "1.15rem", color: color.textSecondary, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {lede}
        </p>

        {proofLinks.length > 0 && (
          <div className="cs-proof">
            {proofLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  background: l.primary ? color.accentDark : "rgba(39, 39, 42, 0.6)",
                  color: "#fff",
                  border: l.primary ? "none" : `1px solid ${color.border}`,
                  textAlign: "center",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        {children}

        <div className="cs-cta">
          <h3>Want to talk?</h3>
          <p>I&apos;m open to senior product-engineering and technical-lead roles.</p>
          <PrimaryLink href={`mailto:rmashrur.w749@gmail.com?subject=${ctaSubject}`} style={{ display: "inline-block" }}>
            Get in touch
          </PrimaryLink>
        </div>
      </div>
    </div>
  );
}

/* The building blocks case-study pages compose their content with. */
export function CSSection({ title, accent, children }: { title: string; accent?: boolean; children: ReactNode }) {
  return (
    <Reveal>
      <section className="cs-section">
        <h2 className="cs-h2" style={{ color: accent ? color.accent : color.text }}>{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export const CSDecision = DecisionP;
export const CSCodeBlock = CodeBlockP;

export function CSP({ children }: { children: ReactNode }) {
  return <p style={{ lineHeight: 1.8, marginBottom: "0.75rem", color: color.textSecondary }}>{children}</p>;
}

export function CSUL({ children }: { children: ReactNode }) {
  return <ul style={{ lineHeight: 1.8, paddingLeft: "1.25rem", color: color.textSecondary, margin: 0 }}>{children}</ul>;
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #0f0f10, #1a1a1d)",
  color: color.text,
  padding: "2rem",
} as const;
