import { CaseStudyLayout, CSSection, CSDecision, CSCodeBlock, CSP, CSUL } from "@/components/CaseStudyLayout";

const WEBSTORE = "https://chromewebstore.google.com/detail/browsewell/iemgfcmhponpadhlnnfoolpmolpjohnp";
const SITE = "https://browsewell.app/";
const DEMO = "https://www.youtube.com/watch?v=mNuE8cfN5jc";

export default function BrowseWellCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Independent product · shipped"
      title="BrowseWell"
      cover="/covers/browsewell.png"
      lede="A browser-native attention-management system — not a website blocker, but a policy and intervention engine that operates across dynamic, SPA-driven sites. Live on the Chrome Web Store."
      ctaSubject="Reaching out — BrowseWell"
      proofLinks={[
        { label: "Install on Chrome Web Store →", href: WEBSTORE, primary: true },
        { label: "browsewell.app", href: SITE },
        { label: "▶ Product demo", href: DEMO },
      ]}
    >
      <CSSection title="Executive summary" accent>
        <CSP>
          People who need the internet to <em>work</em>, not hypnotize them, are
          poorly served by binary site-blockers that break on modern single-page
          apps. BrowseWell is a Chrome extension (Manifest V3) that enforces
          attention policies at site, page, and element granularity, with
          intention checks, timed access, and deliberate overrides — all processed
          locally for privacy. I own it from concept through shipped product,
          including brand and the browsewell.app domain.
        </CSP>
      </CSSection>

      <CSSection title="My role">
        <CSP>
          Independent owner: product strategy, brand, architecture, and
          implementation. A shipped production product, not a prototype or spec.
        </CSP>
      </CSSection>

      <CSSection title="Constraints">
        <CSUL>
          <li>Chrome Manifest V3 service-worker lifecycle and permissions model</li>
          <li>Dynamic, SPA-controlled DOMs that mutate without page reloads</li>
          <li>Privacy: attention data must never leave the device</li>
          <li>Performance: interventions must not degrade host-page responsiveness</li>
          <li>Resilient element selection across sites that change constantly</li>
        </CSUL>
      </CSSection>

      <CSSection title="Architecture">
        <CSP>A policy and intervention engine layered over the browser, not a hard-coded blocklist:</CSP>
        <CSCodeBlock>{`Rule Definition (site / path / selector)
        ↓
Content-script lifecycle + SPA route detection
        ↓
DOM mutation observation
        ↓
Policy evaluation (intervention state machine)
        ↓
Intervention apply / pause / override
        ↓
Local storage + settings sync`}</CSCodeBlock>
        <CSP>
          Rules evaluate at three levels — entire site, page, and individual
          element — so useful functionality survives while distracting elements
          are suppressed. An intervention-state machine governs timed access,
          temporary pauses, and deliberate typed overrides rather than permanent
          disabling.
        </CSP>
      </CSSection>

      <CSSection title="Key technical decisions">
        <CSDecision
          context="MV3 restricts long-running background work to a service worker."
          decision="Stateless policy evaluation triggered by content-script events and alarms; persistent state lives in synced storage."
          tradeoff="Slightly more re-evaluation overhead in exchange for MV3 compliance and crash-safe state."
        />
        <CSDecision
          context="SPA route changes don't fire normal page-load events."
          decision="History-API and mutation-observer based route detection to re-evaluate policy on view changes."
          tradeoff="More moving parts, but correct behavior on React/Vue/SPA sites where naive blockers silently fail."
        />
        <CSDecision
          context="Attention data is sensitive."
          decision="All evaluation and storage is local; nothing is transmitted off-device."
          tradeoff="No cross-device cloud intelligence, in exchange for a privacy posture users can actually trust."
        />
      </CSSection>

      <CSSection title="Reliability & quality">
        <CSUL>
          <li>Resilient selector strategies that degrade gracefully when a site changes</li>
          <li>Intervention-state machine with safe pause/override recovery</li>
          <li>Performance-conscious content scripts to minimize host-page impact</li>
          <li>Keyboard-accessible overrides and settings</li>
          <li>Automated test matrix across representative site archetypes</li>
        </CSUL>
      </CSSection>

      <CSSection title="Leadership & ownership">
        <CSP>
          BrowseWell demonstrates independent ownership from concept through
          shipped product: identifying a real user problem, making product and
          monetization decisions, designing the architecture, and shipping to a
          public store with a branded product site.
        </CSP>
      </CSSection>

      <CSSection title="Results">
        <CSP>
          A shipped, publicly installable product with a finalized brand and
          dedicated domain — demonstrating browser-platform expertise, product
          engineering, state-machine design, and privacy-aware architecture end
          to end.
        </CSP>
      </CSSection>

      <CSSection title="Retrospective">
        <CSUL>
          <li><strong>What I&apos;d change:</strong> invest earlier in a broader cross-site test matrix to catch selector regressions before users do.</li>
          <li><strong>Intentionally deferred:</strong> cloud sync of rule sets — deferred to preserve the local-only privacy guarantee.</li>
          <li><strong>Next version:</strong> richer intervention analytics and shared, community rule packs.</li>
        </CSUL>
      </CSSection>

      <CSSection title="Proof">
        <CSUL>
          <li><a href={WEBSTORE} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Live product — Chrome Web Store listing</a></li>
          <li><a href={SITE} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Product site — browsewell.app</a></li>
          <li><a href={DEMO} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Product demo walkthrough (video)</a></li>
        </CSUL>
      </CSSection>
    </CaseStudyLayout>
  );
}
