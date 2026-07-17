"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { color, glassCard, eyebrow as eyebrowStyle } from "@/lib/tokens";

/* ------------------------------------------------------------------ */
/* Reveal — reduced-motion-aware scroll reveal.                        */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  as = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    // Respect the user's preference: no animation, just render.
    return (
      <MotionTag style={style} initial={false} animate={undefined}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* Structural primitives                                               */
/* ------------------------------------------------------------------ */

export function GlassCard({
  children,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  style?: CSSProperties;
  as?: "div" | "article";
}) {
  return <Tag style={{ ...glassCard, ...style }}>{children}</Tag>;
}

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ ...eyebrowStyle, marginBottom: "0.5rem", ...style }}>{children}</p>;
}

export function Badge({
  children,
  variant = "accent",
}: {
  children: ReactNode;
  variant?: "accent" | "muted" | "success" | "live";
}) {
  const map = {
    accent: { c: color.accent, bg: "rgba(249,115,22,0.15)", bd: "rgba(249,115,22,0.4)" },
    muted: { c: color.textMuted, bg: "rgba(113,113,122,0.2)", bd: "rgba(113,113,122,0.4)" },
    success: { c: color.success, bg: "rgba(16,185,129,0.12)", bd: "rgba(16,185,129,0.4)" },
    live: { c: color.accent, bg: "rgba(249,115,22,0.15)", bd: "rgba(249,115,22,0.4)" },
  }[variant];
  return (
    <span
      style={{
        padding: "3px 10px",
        background: map.bg,
        border: `1px solid ${map.bd}`,
        borderRadius: "999px",
        fontSize: "0.7rem",
        color: map.c,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {variant === "live" ? "● " : ""}
      {children}
    </span>
  );
}

/** A flat primary button-styled anchor (no popup blockers). */
export function PrimaryLink({
  href,
  children,
  style,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      style={{
        padding: "0.7rem 1.25rem",
        background: color.accentDark,
        border: "none",
        borderRadius: "0.5rem",
        color: "#fff",
        fontSize: "0.9rem",
        fontWeight: 600,
        textDecoration: "none",
        transition: "background 0.2s, transform 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.background = color.accentDarker;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = color.accentDark;
      }}
    >
      {children}
    </a>
  );
}

/** Secondary, quieter anchor. */
export function SecondaryLink({
  href,
  children,
  style,
  external,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        padding: "0.7rem 1.25rem",
        background: "rgba(39, 39, 42, 0.6)",
        border: `1px solid ${color.border}`,
        borderRadius: "0.5rem",
        color: color.textSecondary,
        fontSize: "0.9rem",
        fontWeight: 600,
        textDecoration: "none",
        transition: "all 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(39, 39, 42, 0.9)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(39, 39, 42, 0.6)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Case-study evidence primitives (shared by all case-study pages)    */
/* ------------------------------------------------------------------ */

export function Decision({
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
        border: `1px solid ${color.border}`,
        borderRadius: "0.6rem",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <p style={{ ...pBase, margin: 0, marginBottom: "0.4rem" }}>
        <strong style={{ color: color.textMuted }}>Context: </strong>
        {context}
      </p>
      <p style={{ ...pBase, margin: 0, marginBottom: "0.4rem" }}>
        <strong style={{ color: color.accent }}>Decision: </strong>
        {decision}
      </p>
      <p style={{ ...pBase, margin: 0 }}>
        <strong style={{ color: color.textMuted }}>Tradeoff: </strong>
        {tradeoff}
      </p>
    </div>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        border: `1px solid ${color.border}`,
        borderRadius: "0.5rem",
        padding: "1rem",
        color: color.textSecondary,
        fontFamily: "var(--font-mono), monospace",
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

const pBase: CSSProperties = {
  lineHeight: 1.8,
  marginBottom: "0.75rem",
  color: color.textSecondary,
};
