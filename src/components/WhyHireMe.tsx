"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const reasons = [
  {
    title: "Full-Stack Developer",
    description:
      "5+ years building complete web applications - frontend, backend, databases, and deployment",
    icon: "🚀",
  },
  {
    title: "Proven Enterprise Scale",
    description:
      "Currently working on AT&T landing pages serving millions of monthly visitors",
    icon: "📈",
  },
  {
    title: "Ships Fast, Scales Smart",
    description:
      "300x faster deployments while maintaining code quality through automated testing",
    icon: "⚡",
  },
  {
    title: "ROI-Focused Development",
    description:
      "Every feature tied to business metrics - 60% QA time saved, 80% error reduction",
    icon: "💰",
  },
  {
    title: "Team Force Multiplier",
    description:
      "Mentor developers, write docs, build tools that make the whole team faster",
    icon: "👥",
  },
  {
    title: "Available Immediately",
    description:
      "Ready to join your team and start contributing to your React/Next.js projects from day one",
    icon: "✅",
  },
];

export default function WhyHireMe() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="relative py-24 px-4 bg-zinc-900/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Hire <span className="gradient-text">Me?</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium max-w-3xl mx-auto">
            You need a senior developer who can own the full stack, ship fast,
            and scale reliably. Here&apos;s what I bring to your team:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect p-6 hover:bg-zinc-800/70 hover:border-brand-primary/50 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                {reason.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Strong CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center bg-gradient-to-r from-brand-primary/20 to-brand-primary-light/20 rounded-2xl p-8 border border-brand-primary/30"
        >
          <h3 className="text-2xl font-bold mb-4 text-zinc-100">
            Ready to Add a Senior Developer to Your Team?
          </h3>
          <p className="text-lg text-zinc-200 mb-6 max-w-2xl mx-auto">
            I&apos;m looking for a team that values clean code, fast shipping,
            and measurable impact. If that&apos;s you, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors text-lg"
            >
              Schedule an Interview
            </a>
            <a
              href="/Mashrur_Rahman_Resume.pdf"
              download
              className="px-8 py-4 glass-effect text-white rounded-lg font-semibold hover:bg-zinc-800/80 transition-colors text-lg"
            >
              Download My Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
