"use client";

import { color, glassCard } from "@/lib/tokens";
import { Reveal } from "@/components/primitives";
import { Section } from "./Section";

const leaderH3 = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.78rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: color.accent,
  marginBottom: "0.85rem",
} as const;

const leaderLi = { marginBottom: "0.5rem", lineHeight: 1.6, fontSize: "0.95rem" } as const;

export function Leadership() {
  return (
    <Section id="leadership" bg="raised" title="Technical" titleAccent="leadership" intro="Owning consequential systems, and developing the people who build them.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <Reveal>
          <div style={{ ...glassCard, padding: "1.75rem" }}>
            <h3 style={leaderH3}>Technical direction</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: color.textSecondary }}>
              <li style={leaderLi}>Turning ambiguous requirements into architecture</li>
              <li style={leaderLi}>Identifying the actual system constraint, not the symptom</li>
              <li style={leaderLi}>Build-vs-buy decisions and component/API contracts</li>
              <li style={leaderLi}>Scope control and incremental delivery</li>
              <li style={leaderLi}>Communicating technical risk to non-technical stakeholders</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ ...glassCard, padding: "1.75rem" }}>
            <h3 style={leaderH3}>Engineering enablement</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: color.textSecondary }}>
              <li style={leaderLi}>Architecture reviews and pull-request standards</li>
              <li style={leaderLi}>Definition-of-done, testing, and release-readiness practices</li>
              <li style={leaderLi}>Reusable components, templates, and documentation</li>
              <li style={leaderLi}>Production-incident and blocker resolution</li>
              <li style={leaderLi}>Mentoring developers across distributed teams</li>
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div style={{ ...glassCard, padding: "1.75rem", marginTop: "1.5rem" }}>
          <h3 style={leaderH3}>Teaching &amp; mentorship</h3>
          <p style={{ color: color.textMuted, fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            I can explain complex systems clearly and build learning structures that work across levels of technical
            sophistication — evidenced by:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { role: "Computer Science Instructor", org: "Teaching" },
              { role: "Industry Mentor", org: "SAIT" },
              { role: "SMILE Mentor", org: "Seneca College" },
            ].map((m) => (
              <div key={m.role} style={{ padding: "1rem", background: "rgba(249, 115, 22, 0.06)", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "0.6rem" }}>
                <div style={{ color: color.text, fontWeight: 600, fontSize: "0.95rem", marginBottom: "2px" }}>{m.role}</div>
                <div style={{ color: color.textMuted, fontSize: "0.82rem", fontFamily: "var(--font-mono), monospace" }}>{m.org}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
