"use client";

export default function AllSections() {
  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const sectionStyle = {
    padding: "6rem 0",
    color: "white",
  };

  const headingStyle = {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "3rem",
    color: "white",
  };

  return (
    <>
      {/* Achievements Section */}
      <section
        style={{ ...sectionStyle, background: "rgba(0, 0, 0, 0.3)" }}
        id="achievements"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Impact-Driven <span style={{ color: "#f97316" }}>Development</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Deployment Revolution",
                metric: "300x Faster",
                desc: "Architected offer creation engine reducing deployment from days to hours",
              },
              {
                title: "QA Automation",
                metric: "60% Time Saved",
                desc: "Built content comparison tool cutting validation from 2 hours to 30 minutes",
              },
              {
                title: "Performance at Scale",
                metric: "12s from 6min",
                desc: "Optimized development refresh times across the team",
              },
              {
                title: "Edge Personalization",
                metric: "Zero Flicker",
                desc: "Pioneered edge strategy eliminating render flicker in A/B tests",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "1rem",
                  padding: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                    color: "#fafafa",
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#f97316",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  {item.metric}
                </div>
                <p style={{ color: "#d4d4d8", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={sectionStyle} id="experience">
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Full-Stack{" "}
            <span style={{ color: "#f97316" }}>Next.js Experience</span>
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {[
              {
                title: "Senior Developer",
                company: "Critical Mass",
                period: "April 2022 - Present",
                points: [
                  "Architected offer creation engine reducing deployment time by 300x for AT&T landing pages",
                  "Led client API integration efforts enabling real-time package availability checks",
                  "Implemented GraphQL codegen saving hours on every backend update",
                  "Initiated and led QA automation tool development, cutting validation time by 60%",
                ],
              },
              {
                title: "Senior Software Engineer",
                company: "Meta (via Capgemini)",
                period: "June 2021 - April 2022",
                points: [
                  "Built React.js dashboards for CPU/GPU resource visualization",
                  "Created logging framework for performance and feature analytics",
                  "Improved internal libraries and documentation",
                ],
              },
            ].map((job, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "1rem",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.5rem", color: "#fafafa" }}>
                      {job.title}
                    </h3>
                    <p style={{ color: "#f97316", fontSize: "1.125rem" }}>
                      {job.company}
                    </p>
                  </div>
                  <p style={{ color: "#a1a1aa" }}>{job.period}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {job.points.map((point, j) => (
                    <li
                      key={j}
                      style={{
                        marginBottom: "0.5rem",
                        color: "#d4d4d8",
                        display: "flex",
                      }}
                    >
                      <span style={{ color: "#f97316", marginRight: "0.5rem" }}>
                        ▸
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        style={{ ...sectionStyle, background: "rgba(0, 0, 0, 0.3)" }}
        id="projects"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Featured <span style={{ color: "#f97316" }}>Projects</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Offer Creation Engine (AT&T)",
                desc: "Architected engine that reduced deployment time by 300x",
                metrics: {
                  deployment: "300x faster",
                  scale: "Millions of visits",
                },
                tech: ["React", "Next.js", "AWS", "TypeScript"],
              },
              {
                title: "QA Automation Tool",
                desc: "Cut QA time from 2 hours to 30 minutes",
                metrics: {
                  timeSaved: "25-30 hrs bi-weekly",
                  errors: "80% reduction",
                },
                tech: ["JavaScript", "Node.js", "Automation"],
              },
              {
                title: "GraphQL Codegen Implementation",
                desc: "Automated TypeScript type generation",
                metrics: {
                  devTime: "Hours saved daily",
                  reviews: "35% fewer loops",
                },
                tech: ["GraphQL", "TypeScript", "Node.js"],
              },
            ].map((project, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "150px",
                    background:
                      "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    opacity: 0.5,
                  }}
                >
                  💼
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                      color: "#fafafa",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ color: "#d4d4d8", marginBottom: "1rem" }}>
                    {project.desc}
                  </p>
                  {project.metrics && (
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} style={{ fontSize: "0.875rem" }}>
                          <strong style={{ color: "#f97316" }}>{value}</strong>
                          <div
                            style={{ color: "#a1a1aa", fontSize: "0.75rem" }}
                          >
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: "rgba(63, 63, 70, 0.5)",
                          border: "1px solid rgba(113, 113, 122, 0.3)",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          color: "#d4d4d8",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={sectionStyle} id="tech">
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Technical <span style={{ color: "#f97316" }}>Expertise</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                category: "Frontend Excellence",
                skills: [
                  "Next.js 14",
                  "React 18",
                  "TypeScript",
                  "Three.js/WebGL",
                  "Tailwind CSS",
                ],
              },
              {
                category: "Backend & Infrastructure",
                skills: [
                  "Node.js",
                  "GraphQL",
                  "PostgreSQL",
                  "AWS Services",
                  "Edge Functions",
                ],
              },
              {
                category: "Performance & Tools",
                skills: [
                  "Core Web Vitals",
                  "Webpack/Turbopack",
                  "CI/CD Pipelines",
                  "Docker",
                  "Git Workflows",
                ],
              },
            ].map((group, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <h3 style={{ color: "#f97316", marginBottom: "1rem" }}>
                  {group.category}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {group.skills.map((skill, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#e4e4e7" }}>{skill}</span>
                      <span
                        style={{
                          padding: "0.125rem 0.5rem",
                          background: "rgba(249, 115, 22, 0.1)",
                          color: "#f97316",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        Expert
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        style={{ ...sectionStyle, background: "rgba(0, 0, 0, 0.3)" }}
        id="contact"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Let's <span style={{ color: "#f97316" }}>Connect</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "#fafafa",
                }}
              >
                Get in Touch
              </h3>
              <p
                style={{
                  color: "#d4d4d8",
                  marginBottom: "2rem",
                  lineHeight: "1.6",
                }}
              >
                I'm actively looking for Next.js opportunities where I can
                leverage my experience in performance optimization and
                enterprise architecture.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <a
                  href="https://www.linkedin.com/in/musaddiqur-rahman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "rgba(39, 39, 42, 0.5)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(63, 63, 70, 0.5)",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>💼</span>
                  <div>
                    <div style={{ fontWeight: "600" }}>LinkedIn</div>
                    <div style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
                      Connect professionally
                    </div>
                  </div>
                </a>
                <a
                  href="https://github.com/Mashrur749"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "rgba(39, 39, 42, 0.5)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(63, 63, 70, 0.5)",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🐙</span>
                  <div>
                    <div style={{ fontWeight: "600" }}>GitHub</div>
                    <div style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
                      View my code
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
