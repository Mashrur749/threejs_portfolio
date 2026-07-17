"use client";

import { color, glassCard } from "@/lib/tokens";
import { Reveal } from "@/components/primitives";
import { Section } from "./Section";
import { labProjects } from "@/lib/portfolio-data";

export function Lab() {
  return (
    <Section id="lab" bg="base" title="Lab &" titleAccent="architecture" intro="Systems in design or active build — shown as architecture, not as shipped products. Included to demonstrate range and systems thinking.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {labProjects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.05}>
            <div style={{ ...glassCard, padding: "1.5rem", borderStyle: "dashed", opacity: 0.92 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.15rem", color: color.text }}>{p.name}</h3>
                <span style={{ padding: "2px 8px", background: "rgba(113, 113, 122, 0.2)", border: "1px solid rgba(113, 113, 122, 0.4)", borderRadius: "999px", fontSize: "0.62rem", color: color.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap", fontFamily: "var(--font-mono), monospace" }}>
                  {p.status}
                </span>
              </div>
              <p style={{ color: color.textMuted, fontSize: "0.88rem", lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
