import type { CSSProperties } from "react";

/**
 * Design tokens — the single source of truth for the visual system.
 * Components import from here instead of hardcoding hex values.
 * Mirrors the CSS variables in globals.css and the brand palette in tailwind.config.ts.
 */

export const color = {
  // Brand
  accent: "#f97316", // orange-500 — primary accent
  accentLight: "#fb923c", // orange-400
  accentDark: "#ea580c", // orange-600 — buttons/active
  accentDarker: "#c2410c", // orange-700 — hover

  // Neutrals (zinc scale, matches tailwind config)
  bg: "#09090b", // zinc-950 — page background
  surface: "#18181b", // zinc-900
  surface2: "#27272a", // zinc-800
  border: "rgba(63, 63, 70, 0.5)", // zinc-700 @ 50%
  borderStrong: "rgba(63, 63, 70, 0.7)",

  // Text
  text: "#fafafa", // zinc-50
  textSecondary: "#d4d4d8", // zinc-300
  textMuted: "#a1a1aa", // zinc-400
  textFaint: "#71717a", // zinc-500

  // Semantic
  success: "#10b981",
  danger: "#ef4444",
} as const;

/** Section background scrims — alternating depth for rhythm + contrast over the canvas. */
export const sectionBg = {
  raised: "rgba(9, 9, 11, 0.7)", // deeper — for content-dense sections
  base: "rgba(9, 9, 11, 0.55)", // lighter — lets the background breathe
} as const;

/** Reusable style fragments. */
export const glassCard: CSSProperties = {
  background: "rgba(39, 39, 42, 0.5)",
  backdropFilter: "blur(12px)",
  border: `1px solid ${color.border}`,
  borderRadius: "1rem",
};

export const container: CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
};

/** Section wrapper padding. Pass a mobile flag. */
export function sectionPadding(isMobile: boolean): CSSProperties {
  return { padding: isMobile ? "3.5rem 0" : "6rem 0" };
}

/** Eyebrow label — mono, tracked, accent. */
export const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: color.accent,
  fontWeight: 600,
};

/** Section heading role. */
export function heading(isMobile: boolean): CSSProperties {
  return {
    fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4.5vw, 2.75rem)",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: isMobile ? "0.5rem" : "0.75rem",
    color: color.text,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  };
}

/** Subheading / intro under a section heading. */
export const subheading: CSSProperties = {
  fontSize: "1.1rem",
  color: color.textMuted,
  textAlign: "center",
  maxWidth: "620px",
  margin: "0 auto",
  marginBottom: "3rem",
  lineHeight: 1.6,
};

export function subheadingMobile(isMobile: boolean): CSSProperties {
  return {
    ...subheading,
    fontSize: isMobile ? "0.95rem" : "1.1rem",
    marginBottom: isMobile ? "2rem" : "3rem",
  };
}

/** Metric value — mono, accent. */
export const metricValue: CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  color: color.accent,
  fontWeight: 700,
  lineHeight: 1.2,
};

/** Kind/spec label — mono, faint, tracked. */
export const kindLabel: CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  color: color.textFaint,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};
