"use client";

import { color, glassCard } from "@/lib/tokens";
import { Reveal } from "@/components/primitives";
import { Section } from "./Section";
import { techGroups } from "@/lib/portfolio-data";

export function Tech() {
  return (
    <Section id="tech" bg="raised" title="Technical" titleAccent="expertise" intro="The stack I reach for, organized by where it fits in the build.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {techGroups.map((group, i) => (
          <Reveal key={group.category} delay={(i % 4) * 0.05}>
            <div style={{ ...glassCard, padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent, marginBottom: "0.85rem" }}>
                {group.category}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {group.skills.map((skill) => (
                  <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: color.accent, fontSize: "0.9rem" }}>▸</span>
                    <span style={{ color: color.textSecondary, fontSize: "0.95rem" }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
