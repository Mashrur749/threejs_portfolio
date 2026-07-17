"use client";

import { color, glassCard } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal } from "@/components/primitives";
import { Section } from "./Section";
import { experiences } from "@/lib/portfolio-data";

export function Experience() {
  const isMobile = useIsMobile();
  return (
    <Section id="experience" bg="base" title="Professional" titleAccent="journey" intro="Six years across enterprise, agency, and startup environments.">
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1rem" : "1.5rem", maxWidth: "860px", margin: "0 auto" }}>
        {experiences.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.05}>
            <div style={{ ...glassCard, padding: isMobile ? "1.25rem" : "1.75rem" }}>
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "baseline", gap: isMobile ? "0.25rem" : "1rem", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: isMobile ? "1.05rem" : "1.25rem", color: color.text, lineHeight: 1.3 }}>{job.role}</h3>
                  <p style={{ color: color.accent, fontSize: isMobile ? "0.9rem" : "1rem", marginTop: "2px" }}>{job.company}</p>
                </div>
                <div style={{ color: color.textMuted, fontSize: isMobile ? "0.78rem" : "0.85rem", textAlign: isMobile ? "left" : "right", whiteSpace: "nowrap", fontFamily: "var(--font-mono), monospace" }}>
                  {job.period}<span style={{ opacity: 0.6 }}> · {job.location}</span>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {job.highlights.map((h, j) => (
                  <li key={j} style={{ color: color.textSecondary, marginBottom: "0.5rem", fontSize: isMobile ? "0.88rem" : "0.95rem", lineHeight: 1.55, paddingLeft: "1.25rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: color.accent }}>→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
