"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, sectionBg, container, sectionPadding } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal } from "@/components/primitives";

export function Section({
  id,
  bg = "base",
  title,
  titleAccent,
  intro,
  children,
}: {
  id: string;
  bg?: "base" | "raised";
  title?: string;
  titleAccent?: string;
  intro?: string;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <section
      id={id}
      style={{
        ...sectionPadding(isMobile),
        background: bg === "raised" ? sectionBg.raised : sectionBg.base,
        color: color.text,
      }}
    >
      <div style={{ ...container, padding: isMobile ? "0 16px" : "0 24px" }}>
        {title && (
          <Reveal style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4.5vw, 2.75rem)",
                fontWeight: 800,
                marginBottom: isMobile ? "0.5rem" : "0.75rem",
                color: color.text,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {title} {titleAccent && <span style={{ color: color.accent }}>{titleAccent}</span>}
            </h2>
            {intro && (
              <p
                style={{
                  fontSize: isMobile ? "0.95rem" : "1.1rem",
                  color: color.textMuted,
                  textAlign: "center",
                  maxWidth: "620px",
                  margin: "0 auto",
                  marginBottom: isMobile ? "2rem" : "3rem",
                  lineHeight: 1.6,
                }}
              >
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function sectionHeadingStyle(isMobile: boolean): CSSProperties {
  return {
    fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4.5vw, 2.75rem)",
  };
}
