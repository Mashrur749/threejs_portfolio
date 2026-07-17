"use client";

import Image from "next/image";
import { color, glassCard } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import { Reveal, Badge, PrimaryLink, SecondaryLink } from "@/components/primitives";
import { Section } from "./Section";
import { projects, type Project } from "@/lib/portfolio-data";

function caseStudyUrl(title: string): string {
  switch (title) {
    case "BrowseWell": return "/browsewell";
    case "HikmahEdu": return "/hikmahedu";
    case "CRM → Marketing Sync Engine": return "/crm-sync";
    default: return "/case-study";
  }
}

function ProjectCard({ project, isMobile }: { project: Project; isMobile: boolean }) {
  const featured = project.span === "wide";
  return (
    <Reveal as="article" style={{
      ...glassCard,
      border: featured ? `1px solid rgba(249, 115, 22, 0.45)` : `1px solid ${color.border}`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gridColumn: featured && !isMobile ? "1 / -1" : "auto",
    }}>
      {project.image && (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          width={1200}
          height={600}
          style={{ width: "100%", height: isMobile ? 180 : 220, objectFit: "cover", display: "block", borderBottom: `1px solid ${color.border}` }}
        />
      )}
      <div style={{ padding: isMobile ? "1.25rem" : "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          <h3 style={{ fontSize: isMobile ? "1.15rem" : "1.35rem", color: color.text, lineHeight: 1.2 }}>{project.title}</h3>
          {project.badge && <Badge variant={project.badgeVariant ?? "accent"}>{project.badge}</Badge>}
        </div>
        <p style={{ color: color.textMuted, fontSize: isMobile ? "0.85rem" : "0.95rem", marginBottom: "0.4rem", lineHeight: 1.5 }}>{project.subtitle}</p>
        <p style={{ fontFamily: "var(--font-mono), monospace", color: color.textFaint, fontSize: isMobile ? "0.7rem" : "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>{project.kind}</p>

        <p style={{ color: color.textSecondary, fontSize: isMobile ? "0.9rem" : "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>{project.desc}</p>

        {/* Challenge → Result */}
        <div style={{ background: "rgba(249, 115, 22, 0.06)", border: "1px solid rgba(249, 115, 22, 0.18)", borderRadius: "0.6rem", padding: isMobile ? "0.85rem" : "1rem", marginBottom: "1rem", fontSize: isMobile ? "0.82rem" : "0.9rem", lineHeight: 1.5 }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ color: color.danger }}>Challenge: </strong>
            <span style={{ color: color.text }}>{project.challenge}</span>
          </div>
          <div>
            <strong style={{ color: color.success }}>Result: </strong>
            <span style={{ color: color.text }}>{project.result}</span>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: isMobile ? "0.5rem" : "0.75rem", marginBottom: "1rem" }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div style={{ fontFamily: "var(--font-mono), monospace", color: color.accent, fontWeight: 700, fontSize: isMobile ? "0.9rem" : "1rem", lineHeight: 1.2 }}>{m.value}</div>
              <div style={{ color: color.textMuted, fontSize: isMobile ? "0.7rem" : "0.75rem" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tech */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto", marginBottom: project.caseStudy || project.external ? "1rem" : 0 }}>
          {project.tech.map((t) => (
            <span key={t} style={{ padding: isMobile ? "0.2rem 0.5rem" : "0.25rem 0.65rem", background: "rgba(63, 63, 70, 0.5)", border: "1px solid rgba(113, 113, 122, 0.3)", borderRadius: "0.3rem", fontSize: isMobile ? "0.68rem" : "0.72rem", color: color.textSecondary }}>{t}</span>
          ))}
        </div>

        {(project.caseStudy || project.external) && (
          <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            {project.caseStudy && <PrimaryLink href={caseStudyUrl(project.title)}>Read full case study →</PrimaryLink>}
            {project.external && <SecondaryLink href={project.external.href} external>{project.external.label}</SecondaryLink>}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Work() {
  const isMobile = useIsMobile();
  return (
    <Section id="projects" bg="raised" title="Selected" titleAccent="work" intro="A few projects that show how I approach impact, automation, and craft.">
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "1rem" : "1.5rem" }}>
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} isMobile={isMobile} />
        ))}
      </div>
    </Section>
  );
}
