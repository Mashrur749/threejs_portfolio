import { CaseStudyLayout, CSSection, CSDecision, CSCodeBlock, CSP, CSUL } from "@/components/CaseStudyLayout";

export default function CrmSyncCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Built automation system"
      title="CRM → Marketing Sync Engine"
      cover="/covers/crm-sync.png"
      lede="An idempotent customer-data synchronization framework that keeps CRM and marketing platforms consistent — built with n8n as a platform-agnostic reference system, not “an n8n workflow.”"
      ctaSubject="Reaching out — CRM Sync"
    >
      <CSSection title="Executive summary" accent>
        <CSP>
          CRM and marketing platforms hold overlapping but inconsistent contact
          records. This system incrementally retrieves CRM contacts, resolves
          identity against existing subscribers, and applies a field-ownership
          merge policy with safe, idempotent upserts — handling conflicts,
          partial-failure retries, and rate limits without destroying
          marketing-owned data.
        </CSP>
      </CSSection>

      <CSSection title="My role">
        <CSP>
          Architect and implementer of the synchronization framework — from the
          initial CRM-to-marketing implementation to the redesigned,
          platform-agnostic reference system. Built system, not a prototype.
        </CSP>
      </CSSection>

      <CSSection title="Constraints">
        <CSUL>
          <li>Overlapping but inconsistent records across two systems</li>
          <li>Field ownership split: CRM owns some fields, marketing owns others</li>
          <li>Workflows retried after partial completion must be safe to replay</li>
          <li>API rate limits and transient failures</li>
          <li>Malformed, duplicated, or conflicting inbound records</li>
        </CSUL>
      </CSSection>

      <CSSection title="Architecture">
        <CSCodeBlock>{`Trigger / Scheduler
        ↓
Incremental CRM retrieval (watermark + checkpoint)
        ↓
Normalization
        ↓
Identity resolution
        ↓
Existing subscriber lookup
        ↓
Create / Update / Enrich decision
        ↓
Field + tag merge policy (union, not replacement)
        ↓
Destination upsert (idempotent)
        ↓
Audit log + checkpoint
        ↓
Retry / dead-letter handling`}</CSCodeBlock>
        <CSP>
          A checkpoint and watermark model makes synchronization incremental and
          replayable: if a run fails partway, it resumes from the last checkpoint
          rather than reprocessing everything. Unresolvable records route to a
          dead-letter path for human review instead of silently failing.
        </CSP>
      </CSSection>

      <CSSection title="Key technical decisions">
        <CSDecision
          context="Retried workflows risk duplicating or clobbering records."
          decision="Idempotent upserts keyed on resolved identity, so a record processed twice produces the same end state as once."
          tradeoff="More work in identity resolution, in exchange for safe, unattended retries."
        />
        <CSDecision
          context="CRM tags and marketing-owned tags coexist on the same subscriber."
          decision="Tag union by source — CRM tags are added without removing marketing-owned tags."
          tradeoff="Slightly more complex merge logic, in exchange for never destroying marketing data."
        />
        <CSDecision
          context="Fields conflict between systems (e.g. different email or name)."
          decision="A field-ownership matrix defines which system is source-of-truth per field; conflicts are logged, not silently overwritten."
          tradeoff="Explicit conflict surface, in exchange for auditable, predictable merges."
        />
      </CSSection>

      <CSSection title="Reliability & quality">
        <CSUL>
          <li>Idempotent upserts — safe under retry and partial completion</li>
          <li>Incremental sync with watermarks and checkpoints</li>
          <li>Retry with backoff and rate-limit handling</li>
          <li>Dead-letter workflow for unresolvable records</li>
          <li>Audit log and replayability for every processed record</li>
          <li>Operational alerts on failure paths</li>
        </CSUL>
      </CSSection>

      <CSSection title="Leadership & ownership">
        <CSP>
          Generalized a point-to-point integration into a reusable,
          platform-agnostic reference architecture — deciding system boundaries,
          ownership rules, and failure semantics rather than just connecting two
          SaaS tools.
        </CSP>
      </CSSection>

      <CSSection title="Results">
        <CSP>
          A replayable, auditable synchronization system reliable enough to run
          unattended — demonstrating distributed-workflow thinking, integration
          architecture, data-consistency design, and operational observability.
        </CSP>
      </CSSection>

      <CSSection title="Retrospective">
        <CSUL>
          <li><strong>What I&apos;d change:</strong> surface a richer operational dashboard earlier; checkpoints made debugging easy, but visibility came later than it should have.</li>
          <li><strong>Intentionally deferred:</strong> a self-serve adapter DSL so non-engineers can onboard new destinations.</li>
          <li><strong>Next version:</strong> automated reconciliation reports and drift detection between systems.</li>
        </CSUL>
      </CSSection>

      <CSSection title="Proof">
        <CSUL>
          <li>Working n8n implementation of the synchronization framework</li>
          <li>CRM-agnostic architecture diagram (above)</li>
          <li>Field-ownership matrix and example mapping configuration</li>
          <li>Failure-path and dead-letter demonstration available on request</li>
        </CSUL>
      </CSSection>
    </CaseStudyLayout>
  );
}
