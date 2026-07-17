"use client";

import { useEffect, useState } from "react";

const metrics = [
  { value: "300×", label: "Faster content deployments" },
  { value: "80%", label: "Fewer human errors in QA" },
  { value: "35%", label: "Shorter code-review loops" },
];

export default function HeroValueProp() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-eyebrow,
        .hero-title,
        .hero-sub,
        .hero-meta,
        .hero-metrics,
        .hero-cta,
        .hero-portrait {
          opacity: 0;
          animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-eyebrow {
          animation-delay: 0.05s;
        }
        .hero-title {
          animation-delay: 0.15s;
        }
        .hero-sub {
          animation-delay: 0.28s;
        }
        .hero-meta {
          animation-delay: 0.4s;
        }
        .hero-metrics {
          animation-delay: 0.52s;
        }
        .hero-cta {
          animation-delay: 0.64s;
        }
        .hero-portrait {
          animation-delay: 0.2s;
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
          padding: isMobile ? "2.5rem 20px" : "5rem 24px",
          zIndex: 10,
          color: "white",
          backgroundColor: "rgba(9, 9, 11, 0.55)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "2rem" : "4rem",
          }}
        >
          {/* Portrait */}
          <div
            className="hero-portrait"
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: isMobile ? "140px" : "200px",
                height: isMobile ? "140px" : "200px",
                borderRadius: "50%",
                padding: "3px",
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.7), rgba(251,146,60,0.4) 60%, rgba(249,115,22,0.08))",
                boxShadow: "0 0 28px rgba(249, 115, 22, 0.12)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot.jpg"
                alt="Portrait of Mashrur Rahman"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Copy */}
          <div
            style={{
              flex: 1,
              textAlign: isMobile ? "center" : "left",
              maxWidth: isMobile ? "100%" : "640px",
            }}
          >
            <p
              className="hero-eyebrow"
              style={{
                fontSize: isMobile ? "0.8rem" : "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f97316",
                fontWeight: 600,
                marginBottom: isMobile ? "0.75rem" : "1rem",
              }}
            >
              Senior Product Engineer & Technical Lead · Calgary, Canada
            </p>

            <h1
              className="hero-title"
              style={{
                fontSize: isMobile ? "2.25rem" : "clamp(2.75rem, 5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: isMobile ? "0.75rem" : "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Mashrur Rahman
            </h1>

            <p
              className="hero-sub"
              style={{
                fontSize: isMobile ? "1.05rem" : "1.3rem",
                color: "#d4d4d8",
                lineHeight: 1.5,
                marginBottom: isMobile ? "1.25rem" : "1.5rem",
                maxWidth: "560px",
                marginLeft: isMobile ? "auto" : 0,
                marginRight: isMobile ? "auto" : 0,
              }}
            >
              I build reliable web platforms, browser-native products, and
              automation systems that remove operational bottlenecks — so
              teams scale without proportional headcount.
            </p>

            {/* Status line */}
            <div
              className="hero-meta"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? "8px" : "12px",
                justifyContent: isMobile ? "center" : "flex-start",
                alignItems: "center",
                marginBottom: isMobile ? "1.5rem" : "2rem",
                fontSize: "0.9rem",
                color: "#a1a1aa",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                Open to new roles
              </span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Remote-friendly</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>6+ years building for the web</span>
            </div>

            {/* Signature metrics — real, from the résumé */}
            <div
              className="hero-metrics"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: isMobile ? "10px" : "20px",
                maxWidth: isMobile ? "100%" : "560px",
                margin: isMobile
                  ? "0 auto 1.5rem"
                  : "0 0 2rem 0",
              }}
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: isMobile ? "10px 6px" : "14px 10px",
                    background: "rgba(249, 115, 22, 0.08)",
                    border: "1px solid rgba(249, 115, 22, 0.22)",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.6rem",
                      fontWeight: 800,
                      color: "#f97316",
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "0.62rem" : "0.72rem",
                      color: "#a1a1aa",
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="hero-cta"
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "16px",
                justifyContent: isMobile ? "center" : "flex-start",
                alignItems: "center",
              }}
            >
              <a
                href="#projects"
                style={{
                  padding: isMobile ? "14px 28px" : "16px 32px",
                  background: "#ea580c",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: isMobile ? "15px" : "16px",
                  display: "inline-block",
                  transition: "background 0.2s, transform 0.2s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = "#c2410c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#ea580c";
                }}
              >
                View selected work
              </a>
              <a
                href="/Mashrur_Rahman_Resume.pdf"
                download
                style={{
                  padding: isMobile ? "14px 28px" : "16px 32px",
                  background: "rgba(39, 39, 42, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(63, 63, 70, 0.6)",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: isMobile ? "15px" : "16px",
                  display: "inline-block",
                  transition: "all 0.2s",
                  textAlign: "center",
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
                Download résumé
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
