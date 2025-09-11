"use client";

import { useEffect, useState } from "react";

export default function HeroValueProp() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<"business" | "technical">(
    "business"
  );
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "Confidence has increased, now I can trust that what I did is all correct. Speed increased at least 70-80%.",
      author: "QA Team",
      company: "Critical Mass",
    },
    {
      quote:
        "The tool has put us in a more favorable position, testing phase is now agile and reliable allowing us to deliver earlier.",
      author: "Project Manager",
      company: "Critical Mass",
    },
    {
      quote:
        "Workflow simplification and delivered content quality improvement. Operation time saving especially for QAs.",
      author: "Tech Lead",
      company: "Critical Mass",
    },
    {
      quote:
        "Disclaimer comparison increased speed 100%, from 1-2 hour frame to 15-30 mins. That's a huge difference!",
      author: "QA Specialist",
      company: "Critical Mass",
    },
    {
      quote:
        "Increased speed to market and ability to respond to emergent business needs. More return on investment.",
      author: "Client",
      company: "Enterprise",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "20px" : "40px 20px",
          zIndex: 10,
          color: "white",
          backgroundColor: "rgba(9, 9, 11, 0.5)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
            animation: "fadeInScale 0.8s ease-out 0.3s both",
          }}
        >
          {/* Main Heading with Clear Value */}
          <h1
            style={{
              fontSize: isMobile ? "1.75rem" : "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              marginBottom: isMobile ? "0.5rem" : "1rem",
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Senior Full-Stack Developer
            <span
              style={{
                background: "linear-gradient(90deg, #f97316, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                fontSize: isMobile ? "1.25rem" : "1.8rem",
                marginTop: "0.5rem",
              }}
            >
              Building Scalable Systems Since 2019
            </span>
          </h1>

          {/* Clear Value Statement */}
          <p
            style={{
              fontSize: isMobile ? "1rem" : "clamp(1.2rem, 2.5vw, 1.5rem)",
              marginBottom: isMobile ? "1rem" : "1.5rem",
              color: "#e4e4e7",
              fontWeight: "500",
              lineHeight: 1.4,
            }}
          >
            Senior Developer • Critical Mass & Meta • 5+ Years • President's
            Honor List
          </p>

          {/* Location and Availability */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "12px" : "16px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: isMobile ? "1rem" : "1.5rem",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              color: "#a1a1aa",
            }}
          >
            <span>Calgary, AB</span>
            <span>•</span>
            <span>Remote Available</span>
            <span>•</span>
            <span>January 2025</span>
          </div>

          {/* Key Business Metrics - Always Visible */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "12px" : "20px",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: isMobile ? "1.5rem" : "2rem",
            }}
          >
            <div
              style={{
                padding: isMobile ? "12px" : "16px",
                background: "rgba(249, 115, 22, 0.1)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: "bold",
                  color: "#f97316",
                  marginBottom: "4px",
                }}
              >
                300x
              </div>
              <div
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Faster Deployment
              </div>
            </div>

            <div
              style={{
                padding: isMobile ? "12px" : "16px",
                background: "rgba(0, 223, 216, 0.1)",
                border: "1px solid rgba(0, 223, 216, 0.3)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: "bold",
                  color: "#00dfd8",
                  marginBottom: "4px",
                }}
              >
                Up to 80%
              </div>
              <div
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Error Reduction
              </div>
            </div>

            <div
              style={{
                padding: isMobile ? "12px" : "16px",
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: "bold",
                  color: "#fbbf24",
                  marginBottom: "4px",
                }}
              >
                10s
              </div>
              <div
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Error Detection
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div
            style={{
              marginBottom: isMobile ? "1.5rem" : "2rem",
              padding: isMobile ? "16px" : "20px",
              background: "rgba(249, 115, 22, 0.05)",
              border: "1px solid rgba(249, 115, 22, 0.2)",
              borderRadius: "12px",
              minHeight: isMobile ? "100px" : "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "0.75rem" : "0.85rem",
                color: "#f97316",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: "600",
              }}
            >
              Team Feedback
            </div>
            <div
              style={{
                fontSize: isMobile ? "0.95rem" : "1.1rem",
                color: "#fafafa",
                fontStyle: "italic",
                marginBottom: "8px",
                lineHeight: 1.5,
                transition: "opacity 0.5s ease",
                opacity: 1,
              }}
            >
              "{testimonials[currentTestimonial].quote}"
            </div>
            <div
              style={{
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                color: "#a1a1aa",
              }}
            >
              — {testimonials[currentTestimonial].author},{" "}
              {testimonials[currentTestimonial].company}
            </div>
            <div
              style={{
                display: "flex",
                gap: "4px",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background:
                      index === currentTestimonial
                        ? "#f97316"
                        : "rgba(161, 161, 170, 0.3)",
                    transition: "background 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>

          {/* Audience Toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: isMobile ? "1.5rem" : "2rem",
            }}
          >
            <button
              onClick={() => setActiveTab("business")}
              style={{
                padding: isMobile ? "8px 16px" : "10px 20px",
                background:
                  activeTab === "business"
                    ? "#f97316"
                    : "rgba(39, 39, 42, 0.5)",
                border:
                  activeTab === "business"
                    ? "none"
                    : "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "6px",
                color: "white",
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Impact
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              style={{
                padding: isMobile ? "8px 16px" : "10px 20px",
                background:
                  activeTab === "technical"
                    ? "#f97316"
                    : "rgba(39, 39, 42, 0.5)",
                border:
                  activeTab === "technical"
                    ? "none"
                    : "1px solid rgba(63, 63, 70, 0.5)",
                borderRadius: "6px",
                color: "white",
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Technical
            </button>
          </div>

          {/* Value Proposition Content */}
          <div
            style={{
              marginBottom: isMobile ? "2rem" : "3rem",
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              color: "#d4d4d8",
              lineHeight: 1.7,
              maxWidth: "900px",
              margin: "0 auto",
              padding: isMobile ? "20px" : "30px",
              background: "rgba(39, 39, 42, 0.3)",
              borderRadius: "12px",
              border: "1px solid rgba(63, 63, 70, 0.3)",
              minHeight: isMobile ? "180px" : "150px",
            }}
          >
            {activeTab === "business" ? (
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.3rem",
                    marginBottom: "1rem",
                    color: "#f97316",
                  }}
                >
                  What I've Built
                </h3>
                <ul
                  style={{
                    textAlign: "left",
                    margin: "0 auto",
                    maxWidth: "700px",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#f97316", marginRight: "8px" }}>
                      ✓
                    </span>
                    <span>
                      <strong>Deployment automation:</strong> Reduced content
                      deployment from 2-3 days to 2-5 hours through automated
                      offer creation system
                    </span>
                  </li>
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#f97316", marginRight: "8px" }}>
                      ✓
                    </span>
                    <span>
                      <strong>QA automation:</strong> Built validation tools that
                      cut testing time from 2 hours to 30 minutes
                    </span>
                  </li>
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#f97316", marginRight: "8px" }}>
                      ✓
                    </span>
                    <span>
                      <strong>Code quality:</strong> Implemented pre-commit hooks
                      that catch errors in 10 seconds
                    </span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#f97316", marginRight: "8px" }}>
                      ✓
                    </span>
                    <span>
                      <strong>API integrations:</strong> Connected client systems
                      for real-time package verification
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.3rem",
                    marginBottom: "1rem",
                    color: "#00dfd8",
                  }}
                >
                  Technical Stack
                </h3>
                <ul
                  style={{
                    textAlign: "left",
                    margin: "0 auto",
                    maxWidth: "700px",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#00dfd8", marginRight: "8px" }}>
                      →
                    </span>
                    <span>
                      <strong>Frontend:</strong> React, Next.js, Three.js, D3.js
                      for data visualization and interactive UIs
                    </span>
                  </li>
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#00dfd8", marginRight: "8px" }}>
                      →
                    </span>
                    <span>
                      <strong>Backend:</strong> Node.js, PostgreSQL, GraphQL,
                      AWS services, REST APIs
                    </span>
                  </li>
                  <li
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#00dfd8", marginRight: "8px" }}>
                      →
                    </span>
                    <span>
                      <strong>Performance:</strong> Optimized development build
                      times from 6 minutes to 12 seconds
                    </span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start" }}>
                    <span style={{ color: "#00dfd8", marginRight: "8px" }}>
                      →
                    </span>
                    <span>
                      <strong>DevOps:</strong> Docker, CI/CD pipelines, Cypress
                      and Jest for automated testing
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Why Hire Me Section */}
          <div
            style={{
              marginBottom: isMobile ? "2rem" : "3rem",
              padding: isMobile ? "20px" : "30px",
              background: "rgba(16, 185, 129, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              marginTop: "16px",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                marginBottom: "1rem",
                color: "#10b981",
              }}
            >
              How I Work
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? "12px" : "16px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#10b981" }}>✅</span>
                <span
                  style={{
                    color: "#d4d4d8",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <strong>Fix existing issues</strong> before adding new features
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#10b981" }}>✅</span>
                <span
                  style={{
                    color: "#d4d4d8",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <strong>Document thoroughly</strong> for team continuity
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#10b981" }}>✅</span>
                <span
                  style={{
                    color: "#d4d4d8",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <strong>Share knowledge</strong> with team members
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#10b981" }}>✅</span>
                <span
                  style={{
                    color: "#d4d4d8",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <strong>Track metrics</strong> to validate improvements
                </span>
              </div>
            </div>
          </div>

          {/* Red Flags I Solve */}
          <div
            style={{
              marginBottom: isMobile ? "2rem" : "3rem",
              padding: isMobile ? "20px" : "30px",
              background: "rgba(239, 68, 68, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                marginBottom: "1rem",
                color: "#ef4444",
              }}
            >
              Common Problems I've Fixed
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "16px" : "20px",
                textAlign: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: "#ef4444",
                    marginBottom: "4px",
                  }}
                >
                  Slow deployments
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.85rem",
                    color: "#10b981",
                  }}
                >
                  → Automated to hours
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: "#ef4444",
                    marginBottom: "4px",
                  }}
                >
                  Frequent production errors
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.85rem",
                    color: "#10b981",
                  }}
                >
                  → Reduced by up to 80%
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: "#ef4444",
                    marginBottom: "4px",
                  }}
                >
                  Slow development cycles
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.85rem",
                    color: "#10b981",
                  }}
                >
                  → 30x faster builds
                </div>
              </div>
            </div>
          </div>

          {/* Clear Call to Action */}
          <div>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                marginBottom: "1.5rem",
                color: "#fafafa",
                fontWeight: "600",
              }}
            >
              Interested in working together?
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="#projects"
                style={{
                  padding: isMobile ? "14px 32px" : "16px 40px",
                  background: "linear-gradient(90deg, #f97316, #fb923c)",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isMobile ? "15px" : "16px",
                  display: "inline-block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                  minHeight: "48px",
                  lineHeight: isMobile ? "20px" : "normal",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(249, 115, 22, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Projects
              </a>

              <a
                href="#contact"
                style={{
                  padding: isMobile ? "14px 32px" : "16px 40px",
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.5)",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isMobile ? "15px" : "16px",
                  display: "inline-block",
                  transition: "all 0.2s",
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                  minHeight: "48px",
                  lineHeight: isMobile ? "20px" : "normal",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(39, 39, 42, 0.8)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(39, 39, 42, 0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Company Logos */}
          <div
            style={{
              marginTop: isMobile ? "2rem" : "3rem",
              marginBottom: isMobile ? "1rem" : "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "2rem" : "3rem",
              opacity: 0.7,
              filter: "grayscale(100%)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7";
              e.currentTarget.style.filter = "grayscale(100%)";
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                fontWeight: "bold",
                color: "#e4e4e7",
              }}
            >
              Meta
            </div>
            <div
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                fontWeight: "bold",
                color: "#e4e4e7",
              }}
            >
              Critical Mass
            </div>
            <div
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                fontWeight: "bold",
                color: "#e4e4e7",
              }}
            >
              Capgemini
            </div>
            <div
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                fontWeight: "bold",
                color: "#e4e4e7",
              }}
            >
              Storius
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            style={{
              marginTop: isMobile ? "3rem" : "4rem",
              padding: isMobile ? "1rem" : "1.5rem",
              background: "rgba(39, 39, 42, 0.2)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "1rem" : "2rem",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "#a1a1aa",
              }}
            >
              <strong style={{ color: "#e4e4e7" }}>Critical Mass</strong> +
              Meta Experience
            </div>
            <div
              style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "#a1a1aa",
              }}
            >
              <strong style={{ color: "#e4e4e7" }}>200+ Tech Leaders</strong>{" "}
              Presentation Experience
            </div>
            <div
              style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "#a1a1aa",
              }}
            >
              <strong style={{ color: "#e4e4e7" }}>
                2+ Years
              </strong>{" "}
              Production Systems
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
