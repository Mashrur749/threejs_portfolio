import { CaseStudyLayout, CSSection, CSDecision, CSCodeBlock, CSP, CSUL } from "@/components/CaseStudyLayout";
import { color } from "@/lib/tokens";

const testimonials = [
  { role: "QA Engineer", quote: "Confidence has increased for sure, now I can trust that what I did is all correct. Speed has increased at least by 70-80%. The Disclaimer comparison tool increased speed 60% — from 1-2 hours to 15-30 minutes. That's a huge difference. 80% reduction of errors in low volume releases." },
  { role: "Project Manager", quote: "Significant increase in productivity during QA phase. The tool has put us in a more favorable position when handing over value to the client. Testing phase is now more agile and reliable, allowing us to deliver earlier. Reduced bug tickets, less human error, less back and forth between teams." },
  { role: "Content Author", quote: "Increased confidence in logging paths — we now verify paths before logging them. The Diff Tool saves us 25 minutes on path verification. Enhanced release success — we can track missing paths in less than 5 minutes versus 30 minutes previously." },
  { role: "Tech Lead / Release Manager", quote: "Operation time saving especially for QAs. Delivered content quality improvement — teams can spot problems easily. Workflow simplification makes conversations easier. Future potential to integrate other disciplines' workflows." },
  { role: "Client Stakeholder", quote: "Increased speed to market and ability to respond to emergent business needs. Reduced liability on legal compliance. Increased throughput for more return on investment — we can work faster and get more done in the same amount of time with the same amount of people." },
];

const impact = [
  { title: "Production quality", before: "3–5 errors per release", after: "Zero errors", metric: "Up to 80% fewer errors", c: color.accent },
  { title: "QA efficiency", before: "30 hours overhead", after: "< 1 hour", metric: "96% faster", c: color.success },
  { title: "Disclaimer validation", before: "2 hours manual", after: "15 minutes automated", metric: "87% faster", c: color.success },
  { title: "Error detection", before: "2–3 days lag", after: "Real-time", metric: "Instant feedback", c: color.accent },
];

const methods = [
  { name: "Design Thinking", desc: "Empathize, Define, Ideate, Prototype, Test" },
  { name: "The Mom Test", desc: "Unbiased user research techniques" },
  { name: "Systems Thinking", desc: "Understanding causal loops and feedback" },
  { name: "Jobs-to-be-Done", desc: "Functional, emotional, social needs" },
  { name: "RICE Scoring", desc: "Reach, Impact, Confidence, Effort" },
  { name: "Root Cause Analysis", desc: "5 Whys to identify core problems" },
  { name: "SCAMPER", desc: "Creative problem-solving for ideation" },
  { name: "MVP Approach", desc: "Earliest Usable Lovable Product" },
];

export default function CaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Enterprise production · Critical Mass"
      title="Content Sync Validator"
      lede="An automated content-validation tool that compares staging vs. production content and surfaces discrepancies before release — replacing an error-prone manual process and restoring team confidence."
      ctaSubject="Reaching out — Content Sync Validator"
    >
      <CSSection title="Executive summary" accent>
        <CSP>
          An enterprise team hit recurring production errors after content
          approval in an AEM multi-environment setup — content authored in
          staging frequently mismatched production, costing 25–30 hours per
          release and eroding launch confidence. I initiated and led an automated
          validation tool that compares staging vs. production content, surfaces
          discrepancies with their content paths, and was adopted into the formal
          QA workflow across three teams — reducing human errors by up to 80%.
        </CSP>
      </CSSection>

      <CSSection title="My role">
        <CSP>
          Initiated and led the project end to end: problem discovery, stakeholder
          research, solution design, implementation, and iteration with users. A
          shipped production tool integrated into the team&apos;s formal QA process —
          not a prototype.
        </CSP>
      </CSSection>

      <CSSection title="Constraints">
        <CSUL>
          <li>AEM multi-environment setup with no programmatic validation between staging and production</li>
          <li>Manual, multi-step release workflow spanning Content, Release Management, and QA</li>
          <li>High mean-time-to-detection — errors surfaced days after introduction</li>
          <li>QA performed bi-weekly manual regression across 31 pages</li>
          <li>Each error triggered a cascade of tickets, reviews, and re-deployments</li>
        </CSUL>
      </CSSection>

      <CSSection title="The broken workflow">
        <CSP>The process I inherited:</CSP>
        <CSUL>
          <li>Content authors update content while manually documenting fragment paths in Jira</li>
          <li>Release managers collect paths from multiple tickets for production publishing</li>
          <li>QA performs word-by-word comparison to catch discrepancies</li>
          <li>Missing paths trigger a multi-step resolution process with additional QA cycles</li>
        </CSUL>
      </CSSection>

      <CSSection title="Architecture">
        <CSCodeBlock>{`Staging content  ┐
                 ├→ Deep comparison engine (page variation data)
Production content┘
        ↓
Visual diff table (staging vs. production discrepancies)
        ↓
Content-path extraction (for release management)
        ↓
Real-time validation + error reporting`}</CSCodeBlock>
        <CSP>
          The core is a deep comparison engine over AEM page-variation data,
          producing a visual diff table and extracting the exact content paths
          release managers need — eliminating manual field extraction from
          fragment paths.
        </CSP>
      </CSSection>

      <CSSection title="Key technical decisions">
        <CSDecision
          context="The biggest constraint was no automated way to compare staging vs. production."
          decision="An MVP focused on immediate visibility into content differences plus content paths for quick resolution — built in roughly 2 hours using GitHub Copilot."
          tradeoff="Deliberately minimal v1 to validate value fast, in exchange for features that arrived in later iterations."
        />
        <CSDecision
          context="Authors and release managers still manually extracted fields from fragment paths."
          decision="v2 added a unique content-path extraction button, removing manual field extraction."
          tradeoff="More surface area, in exchange for eliminating a tedious, error-prone step."
        />
        <CSDecision
          context="A new disclaimer-matrix validation need emerged, risking a from-scratch build."
          decision="v3 reused the existing comparison engine for Excel-upload disclaimer validation, reusing logic for efficiency."
          tradeoff="Slight coupling, in exchange for fast delivery and dramatically increased QA adoption."
        />
      </CSSection>

      <CSSection title="Iteration with users">
        <CSP>Through observation and partnership with users, the tool grew across three versions:</CSP>
        <CSUL>
          <li><strong>v1 (MVP):</strong> deep comparison, visual diff, content-path extraction, real-time validation</li>
          <li><strong>v2:</strong> path-extraction button for authors/release managers; in-tool diff highlighting for QA</li>
          <li><strong>v3:</strong> disclaimer-matrix validation via Excel upload, reusing the comparison engine</li>
        </CSUL>
      </CSSection>

      <CSSection title="Reliability & quality">
        <CSUL>
          <li>Real-time validation replacing days-lag detection</li>
          <li>In-tool diff highlighting — no external comparison tools or context-switching</li>
          <li>Error and unsupported-field reporting with content paths for fast resolution</li>
          <li>Reused, proven comparison logic as the stable core across new features</li>
        </CSUL>
      </CSSection>

      <CSSection title="Results">
        <CSP>Measured before → after impact:</CSP>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "0.5rem" }}>
          {impact.map((item) => (
            <div key={item.title} style={{ background: "rgba(39,39,42,0.5)", border: `1px solid ${color.border}`, borderRadius: "0.6rem", padding: "1rem" }}>
              <div style={{ fontWeight: 700, color: color.text, marginBottom: "0.6rem" }}>{item.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ color: color.danger, textDecoration: "line-through", opacity: 0.8, fontSize: "0.85rem" }}>{item.before}</span>
                <span style={{ color: color.textMuted }}>→</span>
                <span style={{ color: color.success, fontSize: "0.85rem", fontWeight: 600 }}>{item.after}</span>
              </div>
              <span style={{ display: "inline-block", background: `${item.c}20`, border: `1px solid ${item.c}50`, borderRadius: "1rem", padding: "0.2rem 0.65rem", fontSize: "0.78rem", color: item.c, fontWeight: 700 }}>{item.metric}</span>
            </div>
          ))}
        </div>
        <CSP>Qualitatively: restored team confidence, formal QA-process integration, a cultural shift from reactive firefighting to proactive validation, and cross-team adoption beyond the initial user group.</CSP>
      </CSSection>

      <CSSection title="Leadership & recognition">
        <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.06), rgba(251,146,60,0.04))", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "0.75rem", padding: "1.75rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎤</div>
          <h3 style={{ fontSize: "1.2rem", color: color.accent, marginBottom: "0.5rem" }}>Invited speaker</h3>
          <p style={{ lineHeight: 1.8, marginBottom: "0.5rem", color: color.textSecondary }}>Presented the problem-solving methodology and tool-development process to</p>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: color.accent, marginBottom: "0.25rem" }}>~200 members of the technology discipline</div>
          <p style={{ color: color.textMuted, fontStyle: "italic", fontSize: "0.9rem" }}>Invited to share insights and inspire similar innovation initiatives across the organization.</p>
        </div>
      </CSSection>

      <CSSection title="Methodologies applied">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {methods.map((m) => (
            <div key={m.name} style={{ background: "rgba(39,39,42,0.5)", border: `1px solid ${color.border}`, borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontWeight: 700, color: color.accent, marginBottom: "0.15rem" }}>{m.name}</div>
              <div style={{ fontSize: "0.82rem", color: color.textMuted }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </CSSection>

      <CSSection title="Retrospective">
        <CSUL>
          <li><strong>Partnership drives adoption:</strong> working alongside users during implementation inspired formal integration.</li>
          <li><strong>Observation reveals hidden needs:</strong> watching actual usage uncovered impactful improvements.</li>
          <li><strong>Reusability accelerates development:</strong> leveraging existing code for new features maximized efficiency.</li>
          <li><strong>Small tools, big impact:</strong> a ~2-hour MVP solved a problem costing 25–30 hours per release.</li>
        </CSUL>
      </CSSection>

      <CSSection title="Proof">
        <div style={{ display: "grid", gap: "1rem" }}>
          {testimonials.map((t) => (
            <blockquote key={t.role} style={{ background: "rgba(39,39,42,0.5)", border: `1px solid ${color.border}`, borderRadius: "0.6rem", padding: "1.25rem", margin: 0, position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "16px", background: "#0f0f10", padding: "0 8px", color: color.accent, fontWeight: 700, fontSize: "0.8rem" }}>{t.role}</div>
              <p style={{ margin: 0, fontStyle: "italic", lineHeight: 1.7, color: color.textSecondary }}>{t.quote}</p>
            </blockquote>
          ))}
        </div>
        <CSP>Plus: invited presentation to ~200 technology-discipline members, and adoption into the formal QA workflow across three teams.</CSP>
      </CSSection>
    </CaseStudyLayout>
  );
}
