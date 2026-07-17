import { CaseStudyLayout, CSSection, CSDecision, CSCodeBlock, CSP, CSUL } from "@/components/CaseStudyLayout";

const SITE = "https://hikmahedu.com/";

export default function HikmahEduCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="0-to-1 product · client engagement"
      title="HikmahEdu"
      cover="/covers/hikmahedu.png"
      lede="An education brand and digital platform I led from initial brand direction through product structure, user experience, visual design, and a reusable design system — translating an education-business concept into a cohesive, launch-ready product. Built for a client."
      ctaSubject="Reaching out — HikmahEdu"
      proofLinks={[{ label: "Visit hikmahedu.com →", href: SITE, primary: true }]}
    >
      <CSSection title="Executive summary" accent>
        <CSP>
          HikmahEdu needed to exist as a credible, coherent institution online —
          not just a website. I led the 0-to-1 build: brand positioning and
          identity, product and information architecture, UX and visual design, a
          design system that bridged brand and code, and the platform itself. The
          distinctive work is the design-to-engineering system that turned brand
          decisions into maintainable interface primitives.
        </CSP>
      </CSSection>

      <CSSection title="My role">
        <CSP>
          Led the full 0-to-1 as designer and engineer for the client: product
          ideation, brand development, UX architecture, visual direction,
          design-system design, technical decisions, application development, and
          launch. I was not handed finalized Figma — I produced the direction and
          carried it through to a shipped platform.
        </CSP>
      </CSSection>

      <CSSection title="Constraints">
        <CSUL>
          <li>An ambiguous concept with no prior brand or product</li>
          <li>Multiple content types and audiences (learners, educators, parents, community)</li>
          <li>Editorial flexibility vs. visual consistency in tension</li>
          <li>Designed for both visitors and content administrators</li>
          <li>SEO without compromising design</li>
          <li>An achievable initial release with a deferrable roadmap (e.g. membership, monetization)</li>
        </CSUL>
      </CSSection>

      <CSSection title="Architecture">
        <CSCodeBlock>{`Content & Administrative Layer (CMS)
        ↓
Content Models & APIs
        ↓
Application & Rendering Layer
        ↓
Reusable Design System (tokens → components)
        ↓
Public Website, Profiles & Member Experiences
        ↓
Analytics, SEO & External Integrations`}</CSCodeBlock>
        <CSP>
          A CMS-driven content layer feeds typed content models through a
          rendering layer built on a reusable design system. The system separates
          content configuration from presentation, so non-technical authors can
          publish without engineering involvement.
        </CSP>
      </CSSection>

      <CSSection title="Design-to-engineering system (the distinctive part)">
        <CSP>The most valuable work was bridging brand and code. Brand decisions were encoded as a token layer that downstream components consumed directly:</CSP>
        <CSUL>
          <li><strong>Design tokens</strong> — colour variables, type scales, spacing rules</li>
          <li><strong>Layout primitives</strong> — responsive, composable building blocks</li>
          <li><strong>Reusable components &amp; content patterns</strong> — consistent across every page type</li>
          <li><strong>Responsive behaviour &amp; accessibility constraints</strong> — baked into primitives, not re-derived per page</li>
          <li><strong>Authoring rules</strong> — so content editors work within the system rather than against it</li>
        </CSUL>
        <CSP>This is what keeps a brand-driven site from becoming unmaintainable — a flexible visual system expressed as deterministic engineering primitives.</CSP>
      </CSSection>

      <CSSection title="Key decisions">
        <CSDecision
          context="Editorial flexibility and visual consistency pull in opposite directions."
          decision="A token-and-primitive design system: authors compose within constrained, on-brand components rather than free-form layouts."
          tradeoff="Less per-page creative freedom, in exchange for a site that stays coherent and maintainable as it grows."
        />
        <CSDecision
          context="The site must serve both visitors and content administrators."
          decision="A CMS-driven content-model layer that separates content configuration from application code."
          tradeoff="Up-front modeling investment, in exchange for authors publishing without engineering."
        />
        <CSDecision
          context="Everything can't ship at launch."
          decision="A defined launch scope with membership and monetization deferred to a roadmap, keeping the first release achievable."
          tradeoff="Deferred revenue features, in exchange for a credible, shoppable launch sooner."
        />
      </CSSection>

      <CSSection title="Reliability & quality">
        <CSUL>
          <li>Reusable design system enforcing accessibility constraints at the primitive level</li>
          <li>Responsive-image handling and performance-conscious rendering</li>
          <li>SEO and metadata architecture without compromising design</li>
          <li>Content-model design that prevents the site from becoming hard to maintain</li>
          <li>Deployment and ongoing content-update workflow for the client</li>
        </CSUL>
      </CSSection>

      <CSSection title="Leadership & ownership">
        <CSP>
          Carried an ambiguous idea through implementation: product ideation,
          business requirements, brand development, UX architecture, visual
          direction, technical decisions, application development, content-system
          design, deployment, and stakeholder communication — communicating
          fluently across technical and non-technical concerns.
        </CSP>
      </CSSection>

      <CSSection title="Results">
        <CSP>
          A cohesive, launch-ready brand and platform where brand strategy became
          design tokens, design tokens became reusable components, and those
          components became a maintainable, CMS-driven site — demonstrating 0-to-1
          product ownership, design engineering, and product strategy end to end.
        </CSP>
      </CSSection>

      <CSSection title="Retrospective">
        <CSUL>
          <li><strong>What I&apos;d change:</strong> formalize the design-system documentation earlier — the tokens were right, but authoring rules matured after launch.</li>
          <li><strong>Intentionally deferred:</strong> membership and monetization flows, deliberately scoped out of v1.</li>
          <li><strong>Next version:</strong> personalized profile experiences and richer community capabilities on top of the existing content model.</li>
        </CSUL>
      </CSSection>

      <CSSection title="Proof">
        <CSUL>
          <li><a href={SITE} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Live site — hikmahedu.com</a></li>
          <li>Brand identity, design system, and architecture documented above</li>
          <li>Final desktop and mobile screens available on request</li>
        </CSUL>
      </CSSection>
    </CaseStudyLayout>
  );
}
