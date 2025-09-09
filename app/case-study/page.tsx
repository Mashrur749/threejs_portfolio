"use client";

import Link from "next/link";

export default function CaseStudy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f0f10, #1a1a1d)",
        color: "#fafafa",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          paddingTop: "2rem",
        }}
      >
        <Link
          href={"/"}
          onClick={() => window.history.back()}
          style={{
            marginBottom: "2rem",
            padding: "0.5rem 1rem",
            background: "rgba(249, 115, 22, 0.1)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "0.5rem",
            color: "#f97316",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(249, 115, 22, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(249, 115, 22, 0.1)";
          }}
        >
          ← Back to Portfolio
        </Link>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
          }}
        >
          Content Sync Validator
        </h1>

        <h2
          style={{
            fontSize: "1.25rem",
            color: "#f97316",
            marginBottom: "2rem",
          }}
        >
          Eliminating Production Errors Through Automated Content Validation
        </h2>

        <div
          style={{
            background: "rgba(249, 115, 22, 0.1)",
            border: "1px solid rgba(249, 115, 22, 0.2)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Developed an automated content validation tool that{" "}
            <strong style={{ color: "#f97316" }}>
              eliminated 60% of production errors
            </strong>
            , saved{" "}
            <strong style={{ color: "#f97316" }}>
              25-30 hours per release
            </strong>
            , and restored team confidence by replacing error-prone manual
            processes with intelligent automation.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { metric: "60%", label: "Error Elimination" },
            { metric: "80%", label: "Speed Increase" },
            { metric: "30hrs", label: "Saved per Release" },
            { metric: "200+", label: "Leaders Inspired" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#f97316",
                }}
              >
                {item.metric}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#a1a1aa",
                  marginTop: "0.25rem",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            The Challenge
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Our team was experiencing recurring production errors after content
            approval in our AEM (Adobe Experience Manager) multi-environment
            setup. Content authored in staging would frequently have
            discrepancies when pulled to production.
          </p>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              <strong>Team Impact:</strong> Constant panic, nervousness, and
              lack of confidence during launches
            </li>
            <li>
              <strong>Time Cost:</strong> 25-30 hours lost per release in
              detection and resolution
            </li>
            <li>
              <strong>Process Inefficiency:</strong> Multiple manual checkpoints
              prone to human error
            </li>
            <li>
              <strong>High MTTD:</strong> Significant delays between error
              introduction and detection
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            The Broken Workflow
          </h2>
          <ol style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              Content authors update content while manually documenting fragment
              paths in Jira
            </li>
            <li>
              Release managers collect paths from multiple tickets for
              production publishing
            </li>
            <li>QA performs word-by-word comparison to catch discrepancies</li>
            <li>
              Missing paths trigger multi-step resolution process with
              additional QA cycles
            </li>
          </ol>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Discovery & Research
          </h2>
          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Research Methodology
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            I conducted comprehensive stakeholder interviews following these
            principles:
          </p>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              Focus on understanding their current workflows, frustrations, and
              goals
            </li>
            <li>Ask about specific past incidents and current workarounds</li>
            <li>Let stakeholders talk extensively without introducing bias</li>
            <li>Map functional, emotional, and social jobs-to-be-done</li>
          </ul>

          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Key Findings
          </h3>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              <strong>No programmatic validation</strong> existed between
              environments
            </li>
            <li>
              <strong>QA performed bi-weekly regression</strong> on 31 pages
              manually
            </li>
            <li>
              <strong>Each error triggered a cascade</strong> of tickets,
              reviews, and re-deployments
            </li>
            <li>
              <strong>The biggest constraint:</strong> No automated way to
              compare staging vs production content
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Solution Design
          </h2>
          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            MVP Strategy
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Using RICE scoring and cost of delay analysis, I prioritized an MVP
            that would:
          </p>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>Provide immediate visibility into content differences</li>
            <li>Include content paths for quick resolution</li>
            <li>Minimize implementation time (2 hours using GitHub Copilot)</li>
            <li>Focus on reducing Mean Time to Resolution (MTTR)</li>
          </ul>

          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Technical Implementation
          </h3>
          <div
            style={{
              background: "rgba(39, 39, 42, 0.5)",
              border: "1px solid rgba(63, 63, 70, 0.5)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Core Features:</strong>
            </p>
            <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
              <li>Deep comparison engine for page variation data</li>
              <li>
                Visual diff table with clear staging/production discrepancies
              </li>
              <li>Content path extraction for release management</li>
              <li>Real-time validation capability</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Iterative Improvements
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              Version 2: Enhanced Usability
            </h3>
            <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
              Through observation and partnership with users, I added:
            </p>
            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                For Content Authors & Release Managers:
              </p>
              <ul style={{ lineHeight: 1.6, paddingLeft: "1.5rem", margin: 0 }}>
                <li>Unique content path extraction button</li>
                <li>Eliminated manual field extraction from fragment paths</li>
                <li>Streamlined content fragment list preparation</li>
              </ul>
            </div>
            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                For QA Team:
              </p>
              <ul style={{ lineHeight: 1.6, paddingLeft: "1.5rem", margin: 0 }}>
                <li>In-tool diff highlighting</li>
                <li>Eliminated need for external comparison tools</li>
                <li>Reduced context switching</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              Version 3: Expanded Capabilities
            </h3>
            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                Disclaimer Matrix Validation:
              </p>
              <ul style={{ lineHeight: 1.6, paddingLeft: "1.5rem", margin: 0 }}>
                <li>Excel upload functionality</li>
                <li>Automated comparison against staging content</li>
                <li>Reused existing comparison logic for efficiency</li>
                <li>Dramatically increased QA team adoption</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Impact & Results
          </h2>

          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Measurable Business Impact
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Production Errors
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ef4444",
                  }}
                >
                  3-5
                </span>
                <span style={{ color: "#a1a1aa" }}>→</span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  0
                </span>
                <span style={{ color: "#a1a1aa", fontSize: "0.875rem" }}>
                  per release
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Cross-Discipline Productivity Gains
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ef4444",
                  }}
                >
                  30 hrs
                </span>
                <span style={{ color: "#a1a1aa" }}>→</span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  &lt;1 hr
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Disclaimer Validation
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ef4444",
                  }}
                >
                  2 hrs
                </span>
                <span style={{ color: "#a1a1aa" }}>→</span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  15 min
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#a1a1aa",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Error Detection Time
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ef4444",
                  }}
                >
                  2-3 days
                </span>
                <span style={{ color: "#a1a1aa" }}>→</span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  Instant
                </span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            Qualitative Outcomes
          </h3>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              <strong>Restored Team Confidence:</strong> Teams now launch
              without anxiety
            </li>
            <li>
              <strong>Process Integration:</strong> Tool adopted in formal QA
              workflows
            </li>
            <li>
              <strong>Cultural Shift:</strong> From reactive firefighting to
              proactive validation
            </li>
            <li>
              <strong>Cross-team Adoption:</strong> Expanded beyond initial user
              group
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Methodologies & Frameworks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            This project successfully applied multiple methodologies:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              {
                name: "Design Thinking",
                desc: "Empathize, Define, Ideate, Prototype, Test",
              },
              {
                name: "The Mom Test",
                desc: "Unbiased user research techniques",
              },
              {
                name: "Systems Thinking",
                desc: "Understanding causal loops and feedback",
              },
              {
                name: "Jobs-to-be-Done",
                desc: "Mapping functional, emotional, social needs",
              },
              {
                name: "RICE Scoring",
                desc: "Prioritizing by Reach, Impact, Confidence, Effort",
              },
              {
                name: "Root Cause Analysis",
                desc: "5 Whys to identify core problems",
              },
              {
                name: "SCAMPER",
                desc: "Creative problem-solving for feature ideation",
              },
              {
                name: "MVP Approach",
                desc: "Earliest Usable Lovable Product (EULP)",
              },
            ].map((method, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#f97316",
                    marginBottom: "0.25rem",
                  }}
                >
                  {method.name}
                </div>
                <div style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
                  {method.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Key Learnings
          </h2>
          <ol style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
            <li>
              <strong>Partnership Drives Adoption:</strong> Working alongside
              users during implementation inspired them to formally integrate
              the tool
            </li>
            <li>
              <strong>Observation Reveals Hidden Needs:</strong> Watching actual
              usage uncovered opportunities for impactful improvements
            </li>
            <li>
              <strong>Reusability Accelerates Development:</strong> Leveraging
              existing code for new features (Excel comparison) maximized
              efficiency
            </li>
            <li>
              <strong>Small Tools, Big Impact:</strong> A 2-hour MVP solved a
              problem costing 25-30 hours per release
            </li>
          </ol>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Stakeholder Testimonials
          </h2>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  background: "#0f0f10",
                  padding: "0 10px",
                  color: "#f97316",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                QA Engineer
              </div>
              <blockquote
                style={{ margin: 0, fontStyle: "italic", lineHeight: 1.8 }}
              >
                "Confidence has increased for sure, now I can trust that what I
                did is all correct. Speed has increased at least by{" "}
                <strong style={{ color: "#f97316" }}>70-80%</strong>. The
                Disclaimer comparison tool has increased speed{" "}
                <strong style={{ color: "#f97316" }}>60%</strong> - from 1-2
                hours to 15-30 minutes. That's a huge difference.
                <strong style={{ color: "#f97316" }}>
                  80% reduction of errors
                </strong>{" "}
                in low volume releases."
              </blockquote>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  background: "#0f0f10",
                  padding: "0 10px",
                  color: "#f97316",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                Project Manager
              </div>
              <blockquote
                style={{ margin: 0, fontStyle: "italic", lineHeight: 1.8 }}
              >
                "Significant increase in productivity during QA phase. The tool
                has put us in a more favorable position when handing over value
                to the client. Testing phase is now more agile and reliable,
                allowing us to deliver earlier.{" "}
                <strong style={{ color: "#f97316" }}>
                  Reduced bug tickets, less human error, less back and forth
                  between teams.
                </strong>
                "
              </blockquote>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  background: "#0f0f10",
                  padding: "0 10px",
                  color: "#f97316",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                Content Author
              </div>
              <blockquote
                style={{ margin: 0, fontStyle: "italic", lineHeight: 1.8 }}
              >
                "Increased confidence in logging paths - we now verify paths
                before logging them. The Diff Tool saves us{" "}
                <strong style={{ color: "#f97316" }}>25 minutes</strong> on path
                verification. Enhanced release success - we can track missing
                paths in
                <strong style={{ color: "#f97316" }}>
                  {" "}
                  less than 5 minutes
                </strong>{" "}
                versus 30 minutes previously."
              </blockquote>
            </div>

            <div
              style={{
                background: "rgba(39, 39, 42, 0.5)",
                border: "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  background: "#0f0f10",
                  padding: "0 10px",
                  color: "#f97316",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                Tech Lead / Release Manager
              </div>
              <blockquote
                style={{ margin: 0, fontStyle: "italic", lineHeight: 1.8 }}
              >
                "Operation time saving especially for QAs. Delivered content
                quality improvement - teams can spot problems easily.{" "}
                <strong style={{ color: "#f97316" }}>
                  Workflow simplification
                </strong>
                makes conversations easier. Future potential to integrate other
                disciplines' workflows."
              </blockquote>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.1))",
                border: "2px solid rgba(249, 115, 22, 0.3)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  background: "#0f0f10",
                  padding: "0 10px",
                  color: "#f97316",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                Client Stakeholder
              </div>
              <blockquote
                style={{ margin: 0, fontStyle: "italic", lineHeight: 1.8 }}
              >
                "
                <strong style={{ color: "#f97316" }}>
                  Increased speed to market
                </strong>{" "}
                and ability to respond to emergent business needs.
                <strong style={{ color: "#f97316" }}>
                  Reduced liability on legal compliance.
                </strong>
                Increased throughput for more return on investment - we can work
                faster and get more done in the same amount of time with the
                same amount of people."
              </blockquote>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Leadership & Recognition
          </h2>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(251, 146, 60, 0.05))",
              border: "2px solid rgba(249, 115, 22, 0.2)",
              borderRadius: "0.75rem",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              🎤
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
                color: "#f97316",
              }}
            >
              Invited Speaker
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              Presented the problem-solving methodology and tool development
              process to
            </p>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#f97316",
                marginBottom: "0.5rem",
              }}
            >
              ~200 Members of Technology Discipline
            </div>
            <p
              style={{
                color: "#a1a1aa",
                fontStyle: "italic",
              }}
            >
              Invited to share insights at the technology discipline meeting to
              inspire similar innovation initiatives across the organization
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#f97316",
            }}
          >
            Technologies Used
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {[
              "AEM (Adobe Experience Manager)",
              "GitHub Copilot",
              "Next.js",
              "Node.js",
              "REST APIs",
            ].map((tech, i) => (
              <span
                key={i}
                style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(249, 115, 22, 0.1)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                  borderRadius: "2rem",
                  fontSize: "0.875rem",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div
          style={{
            marginTop: "4rem",
            padding: "2rem",
            background:
              "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.1))",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "0.75rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Let's Discuss This Project
          </h3>
          <p
            style={{
              color: "#a1a1aa",
              marginBottom: "1.5rem",
            }}
          >
            Interested in learning more about my approach to solving complex
            problems?
          </p>
          <a
            href="mailto:rmashrur749@gmail.com?subject=Reaching out to Sync on an Opportunity"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #f97316, #fb923c)",
              border: "none",
              borderRadius: "0.5rem",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(249, 115, 22, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
