'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const achievements = [
  {
    title: 'Deployment Revolution',
    metric: '300x Faster',
    description: 'Architected offer creation engine reducing deployment from days to hours',
    impact: 'Enabled rapid campaign launches for AT&T landing pages',
    tech: ['Next.js patterns', 'CMS Federation', 'Edge Computing']
  },
  {
    title: 'QA Automation',
    metric: '60% Time Saved',
    description: 'Built content comparison tool cutting validation from 2 hours to 30 minutes',
    impact: '25-30 hours saved bi-weekly, 100% launch confidence',
    tech: ['TypeScript', 'Automation', 'CI/CD']
  },
  {
    title: 'Performance at Scale',
    metric: '12s from 6min',
    description: 'Optimized development refresh times across the team',
    impact: 'Saved 10+ hours daily for 5 developers',
    tech: ['Webpack', 'Build Optimization', 'DX']
  },
  {
    title: 'Edge Personalization',
    metric: 'Zero Flicker',
    description: 'Pioneered edge strategy eliminating render flicker in A/B tests',
    impact: 'Improved conversion rates through seamless UX',
    tech: ['Edge Runtime', 'CDN', 'Performance']
  }
]

export default function Achievements() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="achievements" className="relative py-24 px-4 z-10">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Impact-Driven <span className="gradient-text">Development</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            Measurable results that transform businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect p-8 hover-lift hover:bg-zinc-800/60 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-zinc-100">{achievement.title}</h3>
                <span className="text-3xl font-bold gradient-text">{achievement.metric}</span>
              </div>
              
              <p className="text-zinc-200 mb-4 text-base leading-relaxed">{achievement.description}</p>
              
              <div className="mb-4">
                <span className="text-sm text-brand-primary font-bold">Business Impact:</span>
                <p className="text-zinc-300 text-sm mt-1 leading-relaxed">{achievement.impact}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {achievement.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-brand-primary/10 text-brand-primary rounded-full border border-brand-primary/20"
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