"use client";

import { color, glassCard } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal } from "@/components/primitives";
import { Section } from "./Section";
import { traits } from "@/lib/portfolio-data";

export function About() {
  const isMobile = useIsMobile();
  return (
    <Section id="about" bg="base" title="About" titleAccent="me" intro="A little context on how I work and what I care about.">
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr", gap: isMobile ? "1rem" : "2rem", alignItems: "start" }}>
        <Reveal>
          <div style={{ ...glassCard, padding: isMobile ? "1.5rem" : "2rem" }}>
            <p style={{ color: color.textSecondary, fontSize: isMobile ? "1rem" : "1.1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
              I&apos;m a senior product engineer and technical lead. My advantage isn&apos;t one framework — it&apos;s the
              combination of senior React/Next.js and browser engineering, full-stack and cloud architecture, workflow
              and systems thinking, internal tooling, and cross-functional leadership tied to measurable outcomes.
            </p>
            <p style={{ color: color.textMuted, fontSize: isMobile ? "0.95rem" : "1.05rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Most of my impact comes from noticing the manual workflows teams accept as &ldquo;just how it is&rdquo; — and
              replacing them with systems that compound: an offer-creation engine that made deployments{" "}
              <strong style={{ color: color.accent }}>300× faster</strong>, a QA validation tool that{" "}
              <strong style={{ color: color.accent }}>cut human errors by 80%</strong>, and shipped browser-native products
              like BrowseWell. I build to last — documented, accessible, tested — and bring people along, mentoring
              developers and partnering across UX, QA, and product.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {traits.map((t) => (
                <span key={t} style={{ padding: "6px 12px", background: "rgba(249, 115, 22, 0.08)", border: "1px solid rgba(249, 115, 22, 0.22)", borderRadius: "999px", fontSize: "0.8rem", color: color.accentLight }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ ...glassCard, padding: isMobile ? "1.5rem" : "1.75rem" }}>
            <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: color.accent, marginBottom: "0.75rem" }}>
              Education
            </h3>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: color.text }}>Seneca College</div>
            <div style={{ color: color.textSecondary, fontSize: "0.95rem", marginTop: "4px" }}>Computer Programming &amp; Analysis</div>
            <div style={{ color: color.textMuted, fontSize: "0.85rem", marginTop: "2px" }}>Advanced Diploma · May 2018 – Apr 2021</div>
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: color.textSecondary }}>
                <span style={{ color: "#fbbf24" }}>★</span> President&apos;s Honor List
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: color.textSecondary }}>
                <span style={{ color: color.success }}>◆</span> CGPA 3.6
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: color.textSecondary }}>
                <span style={{ color: color.accent }}>▲</span> Seneca Digital Health Hackathon
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
