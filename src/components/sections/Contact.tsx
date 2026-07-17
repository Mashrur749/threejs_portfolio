"use client";

import { color, glassCard } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal, PrimaryLink } from "@/components/primitives";
import { Section } from "./Section";

const EMAIL = "rmashrur.w749@gmail.com";
const PHONE = "+1 403-703-7831";

function contactLink(glyph: string, text: string): React.CSSProperties {
  return {
    padding: "12px 14px",
    background: "rgba(39, 39, 42, 0.5)",
    border: `1px solid ${color.border}`,
    borderRadius: "0.6rem",
    color: color.textSecondary,
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: "all 0.2s",
    display: "block",
  };
}

export function Contact() {
  const isMobile = useIsMobile();
  return (
    <Section id="contact" bg="raised" title="Let's" titleAccent="connect" intro="I'm open to new full-stack and senior engineering roles — local to Calgary or remote. Tell me what you're building.">
      <div style={{ maxWidth: "640px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1.5rem" : "2rem", alignItems: "start" }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a href={`mailto:${EMAIL}`} style={contactLink("✉️", EMAIL)}>✉️ {EMAIL}</a>
            <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} style={contactLink("📞", PHONE)}>📞 {PHONE}</a>
            <a href="https://www.linkedin.com/in/mashrurio" target="_blank" rel="noopener noreferrer" style={contactLink("in", "LinkedIn")}>in /mashrurio</a>
            <a href="https://github.com/Mashrur749" target="_blank" rel="noopener noreferrer" style={contactLink("⌥", "GitHub")}>⌥ github.com/Mashrur749</a>
            <a href="/Mashrur_Rahman_Resume.pdf" download style={{ ...contactLink("↓", "Résumé"), color: color.accent, borderColor: "rgba(249, 115, 22, 0.4)" }}>↓ Download résumé (PDF)</a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form action="https://formspree.io/f/xgeppjgp" method="POST" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input type="text" name="name" placeholder="Your name" required style={inputStyle(isMobile)} />
            <input type="email" name="email" placeholder="Your email" required style={inputStyle(isMobile)} />
            <textarea name="message" placeholder="What are you building?" rows={4} required style={{ ...inputStyle(isMobile), resize: "vertical", minHeight: "110px" }} />
            <button type="submit" style={{ padding: isMobile ? "14px 24px" : "16px 32px", background: color.accentDark, color: "white", border: "none", borderRadius: "0.5rem", fontSize: "16px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = color.accentDarker; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = color.accentDark; }}
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function inputStyle(isMobile: boolean): React.CSSProperties {
  return {
    padding: isMobile ? "12px" : "14px",
    background: "rgba(39, 39, 42, 0.5)",
    border: `1px solid ${color.border}`,
    borderRadius: "0.5rem",
    color: "white",
    fontSize: isMobile ? "14px" : "15px",
    outline: "none",
    fontFamily: "inherit",
  };
}
