'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const techCategories = [
  {
    title: 'Frontend Excellence',
    skills: [
      { name: 'Next.js 14', level: 'Production Ready' },
      { name: 'React 18', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Three.js/WebGL', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Framer Motion', level: 'Advanced' }
    ]
  },
  {
    title: 'Backend & Infrastructure',
    skills: [
      { name: 'Node.js', level: 'Expert' },
      { name: 'GraphQL', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'AWS Services', level: 'Advanced' },
      { name: 'Edge Functions', level: 'Advanced' },
      { name: 'Serverless', level: 'Advanced' }
    ]
  },
  {
    title: 'Performance & Tools',
    skills: [
      { name: 'Core Web Vitals', level: 'Expert' },
      { name: 'Webpack/Turbopack', level: 'Advanced' },
      { name: 'CI/CD Pipelines', level: 'Expert' },
      { name: 'Docker', level: 'Advanced' },
      { name: 'Git Workflows', level: 'Expert' },
      { name: 'Testing (Jest/Cypress)', level: 'Advanced' }
    ]
  },
  {
    title: 'Architecture & Patterns',
    skills: [
      { name: 'ISR/SSG/SSR', level: 'Expert' },
      { name: 'Micro-frontends', level: 'Advanced' },
      { name: 'Design Systems', level: 'Advanced' },
      { name: 'CMS Integration', level: 'Expert' },
      { name: 'A/B Testing', level: 'Expert' },
      { name: 'Edge Computing', level: 'Advanced' }
    ]
  }
]

export default function TechStack() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="tech" className="relative py-24 px-4">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            Modern stack with enterprise experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-effect p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-brand-primary">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex justify-between items-center">
                    <span className="text-zinc-200 font-medium">{skill.name}</span>
                    <span className="text-xs px-2 py-1 font-medium bg-brand-primary/10 text-brand-primary rounded-full">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block glass-effect p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-2 text-zinc-100">
              🚀 Next.js Ready
            </h3>
            <p className="text-zinc-300 max-w-md leading-relaxed">
              Already implementing Next.js patterns: ISR content strategies, edge personalization,
              and performance optimization at enterprise scale
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}