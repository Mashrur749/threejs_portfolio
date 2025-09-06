'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    company: 'Critical Mass',
    role: 'Senior Developer (Next.js & Full-Stack)',
    period: 'April 2022 - Present',
    highlights: [
      'Lead Next.js development for AT&T enterprise landing pages serving millions monthly',
      'Architected full-stack offer creation engine reducing deployment by 300x using Next.js ISR',
      'Built 20+ Next.js API routes for real-time package availability and personalization',
      'Implemented GraphQL codegen with Next.js, automating TypeScript types across stack',
      'Reduced QA time by 60% through Next.js-based automation tools'
    ],
    tech: ['Next.js 14', 'TypeScript', 'GraphQL', 'Node.js', 'AWS', 'PostgreSQL'],
    type: 'Enterprise • Full-Stack'
  },
  {
    company: 'Meta (via Capgemini)',
    role: 'Senior Software Engineer',
    period: 'June 2021 - April 2022',
    highlights: [
      'Built React.js dashboards for CPU/GPU resource visualization',
      'Created logging framework for performance and feature analytics',
      'Improved internal libraries and documentation',
      'Participated in quarterly planning aligning tech with business'
    ],
    tech: ['React', 'D3.js', 'Performance', 'Internal Tools'],
    type: 'Big Tech'
  },
  {
    company: 'Storius Limited',
    role: 'Web Application Developer',
    period: 'April 2020 - April 2021',
    highlights: [
      'Integrated mapping tools supporting investor decisions',
      'Migrated legacy data from spreadsheets to PostgreSQL',
      'Built backend APIs and optimized server configurations',
      'Collaborated with design teams on UI/UX requirements'
    ],
    tech: ['Node.js', 'PostgreSQL', 'API Design', 'React'],
    type: 'Startup'
  }
]

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Full-Stack <span className="gradient-text">Next.js Experience</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            3+ years building production Next.js applications
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-zinc-100">{exp.role}</h3>
                  <p className="text-xl text-brand-primary font-medium">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-zinc-400 font-medium">{exp.period}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full mt-2">
                    {exp.type}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-primary mr-2 mt-1 font-bold">▸</span>
                    <span className="text-zinc-200 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-zinc-800/50 text-zinc-300 rounded-full border border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}