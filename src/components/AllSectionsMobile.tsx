"use client";

import { useEffect, useState } from 'react';

export default function AllSectionsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: isMobile ? "0 16px" : "0 24px",
  };

  const sectionStyle = {
    padding: isMobile ? "3rem 0" : "6rem 0",
    color: "white",
  };

  const headingStyle = {
    fontSize: isMobile ? "1.75rem" : "clamp(2rem, 5vw, 3rem)",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: isMobile ? "2rem" : "3rem",
    color: "white",
    lineHeight: 1.2,
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
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "1rem" : "2rem",
            }}
          >
            {[
              {
                title: "Campaign Launches",
                metric: "300x Faster",
                desc: "Offer creation engine reduces content deployment from 2-3 days to 2-5 hours",
              },
              {
                title: "QA Automation",
                metric: "60% Time Saved",
                desc: "Content comparison tool saves 25-30 hours bi-weekly with 100% precision",
              },
              {
                title: "Dev Experience",
                metric: "30x Faster",
                desc: "Refresh times from 6 minutes to 12 seconds for entire dev team",
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
                  padding: isMobile ? "1.25rem" : "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                    marginBottom: "0.5rem",
                    color: "#fafafa",
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    fontSize: isMobile ? "1.5rem" : "2rem",
                    color: "#f97316",
                    fontWeight: "bold",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.metric}
                </div>
                <p style={{ 
                  color: "#d4d4d8", 
                  lineHeight: "1.6",
                  fontSize: isMobile ? "0.9rem" : "1rem"
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        style={{ ...sectionStyle, background: "rgba(0, 0, 0, 0.2)" }}
        id="experience"
      >
        <div style={containerStyle}>
          <h2 style={headingStyle}>
            Professional <span style={{ color: "#f97316" }}>Journey</span>
          </h2>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: isMobile ? "1.5rem" : "2rem" 
          }}>
            {[
              {
                role: "Senior Developer",
                company: "Critical Mass",
                period: "2022 - Present",
                highlights: [
                  "Lead segmentation-based content refactoring foundation for 2+ years",
                  "Reduced campaign launch time by 300x with offer creation engine",
                  "Established mentorship program and coaching developers",
                ],
              },
              {
                role: "Full Stack Developer",
                company: "Previous Roles",
                period: "2019 - 2021",
                highlights: [
                  "Built React.js/D3.js resource visualization tools at Meta",
                  "Implemented GraphQL codegen saving hours per backend update",
                  "Pre-commit hooks reduced review loops by 35%",
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
                  padding: isMobile ? "1.25rem" : "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    marginBottom: "1rem",
                    gap: isMobile ? "0.5rem" : 0,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? "1.1rem" : "1.5rem",
                        color: "#fafafa",
                      }}
                    >
                      {job.role}
                    </h3>
                    <p style={{ color: "#f97316", fontSize: isMobile ? "0.9rem" : "1rem" }}>
                      {job.company}
                    </p>
                  </div>
                  <span style={{ 
                    color: "#a1a1aa", 
                    fontSize: isMobile ? "0.85rem" : "0.875rem" 
                  }}>
                    {job.period}
                  </span>
                </div>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0,
                  margin: 0 
                }}>
                  {job.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      style={{
                        color: "#d4d4d8",
                        marginBottom: "0.5rem",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        paddingLeft: "1.5rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#f97316",
                        }}
                      >
                        →
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - FIXED FOR MOBILE */}
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
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: isMobile ? "1rem" : "2rem",
            }}
          >
            {[
              {
                title: "Offer Creation Engine",
                subtitle: "Enterprise",
                desc: "Architected engine reducing content deployment from 2-3 days to 2-5 hours",
                metrics: {
                  deployment: "300x faster",
                  scale: "Foundation for 2+ years",
                },
                tech: ["React", "Next.js", "AWS", "TypeScript"],
              },
              {
                title: "Content Comparison Tool",
                subtitle: "QA Automation",
                desc: "Programmatic content validation with 100% launch confidence",
                metrics: {
                  timeSaved: "25-30 hrs bi-weekly",
                  accuracy: "100% precision",
                },
                tech: ["JavaScript", "Node.js", "Automation"],
              },
              {
                title: "GraphQL Codegen",
                subtitle: "Implementation",
                desc: "Automated type generation from database schema",
                metrics: {
                  devTime: "Hours saved per update",
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: isMobile ? "100px" : "150px",
                    background:
                      "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "2rem" : "3rem",
                    opacity: 0.5,
                  }}
                >
                  💼
                </div>
                <div style={{ 
                  padding: isMobile ? "1rem" : "1.5rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <h3
                    style={{
                      fontSize: isMobile ? "1.1rem" : "1.5rem",
                      marginBottom: "0.25rem",
                      color: "#fafafa",
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                    {project.subtitle && (
                      <span style={{ 
                        color: "#f97316", 
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        marginLeft: "0.5rem"
                      }}>
                        {project.subtitle}
                      </span>
                    )}
                  </h3>
                  <p style={{ 
                    color: "#d4d4d8", 
                    marginBottom: "1rem",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    lineHeight: 1.5
                  }}>
                    {project.desc}
                  </p>
                  {project.metrics && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: isMobile ? "0.5rem" : "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                          <strong style={{ 
                            color: "#f97316",
                            display: "block",
                            fontSize: isMobile ? "0.9rem" : "1rem"
                          }}>
                            {value}
                          </strong>
                          <div
                            style={{ 
                              color: "#a1a1aa", 
                              fontSize: isMobile ? "0.7rem" : "0.75rem",
                              marginTop: "2px"
                            }}
                          >
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    style={{ 
                      display: "flex", 
                      gap: "0.5rem", 
                      flexWrap: "wrap",
                      marginTop: "auto"
                    }}
                  >
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        style={{
                          padding: isMobile ? "0.2rem 0.5rem" : "0.25rem 0.75rem",
                          background: "rgba(63, 63, 70, 0.5)",
                          border: "1px solid rgba(113, 113, 122, 0.3)",
                          borderRadius: "0.25rem",
                          fontSize: isMobile ? "0.7rem" : "0.75rem",
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
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "1rem" : "2rem",
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
                  "Webpack/Vite",
                  "CI/CD Pipelines",
                  "Docker",
                  "Git Workflows",
                  "Testing (Jest/Cypress)",
                ],
              },
            ].map((category, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "1rem",
                  padding: isMobile ? "1.25rem" : "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? "1rem" : "1.25rem",
                    marginBottom: "1rem",
                    color: "#f97316",
                  }}
                >
                  {category.category}
                </h3>
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: isMobile ? "0.5rem" : "0.75rem" 
                }}>
                  {category.skills.map((skill, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#f97316", fontSize: isMobile ? "0.8rem" : "1rem" }}>▸</span>
                      <span style={{ 
                        color: "#d4d4d8",
                        fontSize: isMobile ? "0.9rem" : "1rem"
                      }}>
                        {skill}
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
              maxWidth: "600px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.125rem",
                color: "#d4d4d8",
                marginBottom: "2rem",
                lineHeight: 1.6
              }}
            >
              Ready to bring your next project to life? Let's discuss how I can
              help transform your ideas into reality.
            </p>
            <form
              action="https://formspree.io/f/xgeppjgp"
              method="POST"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                style={{
                  padding: isMobile ? "12px" : "16px",
                  background: "rgba(39, 39, 42, 0.5)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "0.5rem",
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  outline: "none",
                  minHeight: "48px"
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                style={{
                  padding: isMobile ? "12px" : "16px",
                  background: "rgba(39, 39, 42, 0.5)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "0.5rem",
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  outline: "none",
                  minHeight: "48px"
                }}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                style={{
                  padding: isMobile ? "12px" : "16px",
                  background: "rgba(39, 39, 42, 0.5)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  borderRadius: "0.5rem",
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "120px"
                }}
              />
              <button
                type="submit"
                style={{
                  padding: isMobile ? "14px 24px" : "16px 32px",
                  background: "linear-gradient(90deg, #f97316, #fb923c)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  minHeight: "48px"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Send Message
              </button>
            </form>

            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap"
              }}
            >
              <a
                href="https://github.com/mashrurrahman"
                style={{ color: "#d4d4d8", fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mashrurrahman"
                style={{ color: "#d4d4d8", fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                LinkedIn
              </a>
              <a
                href="mailto:hello@mashrur.dev"
                style={{ color: "#d4d4d8", fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}