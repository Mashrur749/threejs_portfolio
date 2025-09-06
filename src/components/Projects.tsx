'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  {
    title: 'Next.js Enterprise Landing System (AT&T)',
    description: 'Full-stack Next.js application with ISR, API routes, and edge middleware handling millions of monthly visits',
    image: '/projects/landing-system.jpg',
    tech: ['Next.js 14', 'API Routes', 'ISR', 'Edge Middleware', 'PostgreSQL'],
    metrics: {
      performance: '99.9% uptime',
      speed: '300x faster deploys',
      scale: 'Millions of visits'
    },
    link: '#',
    featured: true
  },
  {
    title: 'Full-Stack QA Automation Platform',
    description: 'Next.js dashboard with Node.js backend APIs for automated content validation, reducing QA time by 60%',
    image: '/projects/qa-tool.jpg',
    tech: ['Next.js', 'Node.js APIs', 'PostgreSQL', 'TypeScript', 'CI/CD'],
    metrics: {
      timeSaved: '30 hrs/week',
      accuracy: '100%',
      adoption: '5 teams'
    },
    link: '#'
  },
  {
    title: 'GraphQL + Next.js Integration',
    description: 'Full-stack GraphQL implementation with Next.js, automatic type generation, and optimized data fetching',
    image: '/projects/graphql.jpg',
    tech: ['Next.js', 'GraphQL', 'Apollo', 'TypeScript', 'Codegen'],
    metrics: {
      devTime: 'Hours saved daily',
      errors: '80% reduction',
      dx: 'Loved by team'
    },
    link: '#'
  },
  {
    title: 'Animated Galaxy Generator',
    description: 'Creative Three.js experiment showcasing shader programming and real-time animations',
    image: '/projects/galaxy.jpg',
    tech: ['Three.js', 'GLSL', 'WebGL', 'React'],
    link: 'https://animated-galaxy-rho.vercel.app/',
    demo: true
  },
  {
    title: 'Previous Portfolio (Gatsby)',
    description: 'Static site built with Gatsby and Strapi, demonstrating SSG expertise',
    image: '/projects/portfolio.jpg',
    tech: ['Gatsby', 'React', 'Strapi', 'GraphQL'],
    link: 'https://pedantic-sinoussi-460749.netlify.app/',
    demo: true
  }
]

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            Enterprise solutions and creative experiments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-effect overflow-hidden hover-lift transition-all duration-300 ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-brand-primary/20 to-brand-primary-light/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20">
                    {project.demo ? '🚀' : '💼'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-2">{project.title}</h3>
                  <p className="text-zinc-300 leading-relaxed">{project.description}</p>
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-4 p-3 bg-zinc-900/50 rounded-lg">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold text-brand-primary">{value}</div>
                        <div className="text-xs text-zinc-400 capitalize font-medium">{key}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-zinc-800/50 text-zinc-300 rounded border border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-semibold transition-colors group"
                  >
                    {project.demo ? 'View Demo' : 'Learn More'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}