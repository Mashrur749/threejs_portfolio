'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [formState, setFormState] = useState({
    email: '',
    message: '',
    sending: false,
    success: false,
    error: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState(prev => ({ ...prev, sending: true, error: false }))

    try {
      const response = await fetch('https://formspree.io/f/xgeppjgp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formState.email,
          message: formState.message,
          _subject: 'New Portfolio Contact - Next.js Opportunity'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setFormState({
          email: '',
          message: '',
          sending: false,
          success: true,
          error: false
        })
        setTimeout(() => setFormState(prev => ({ ...prev, success: false })), 5000)
      } else {
        throw new Error(data.error || 'Failed to send')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState(prev => ({ ...prev, sending: false, error: true }))
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="section-container max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            Ready to build something amazing with Next.js
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-100">Get in Touch</h3>
              <p className="text-zinc-300 mb-8 leading-relaxed">
                I&apos;m actively looking for Next.js opportunities where I can leverage
                my experience in performance optimization and enterprise architecture.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/musaddiqur-rahman/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">💼</span>
                <div>
                  <div className="font-semibold text-zinc-100">LinkedIn</div>
                  <div className="text-sm text-zinc-400">Connect professionally</div>
                </div>
              </a>

              <a
                href="https://github.com/Mashrur749"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">🐙</span>
                <div>
                  <div className="font-semibold text-zinc-100">GitHub</div>
                  <div className="text-sm text-zinc-400">View my code</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass-effect rounded-lg">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="font-semibold text-zinc-100">Location</div>
                  <div className="text-sm text-zinc-400">Calgary, Canada (Remote OK)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-200 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-brand-primary focus:bg-zinc-900/80 transition-all text-zinc-100"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-zinc-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your Next.js project..."
                />
              </div>

              <button
                type="submit"
                disabled={formState.sending}
                className="w-full py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.sending ? 'Sending...' : 'Send Message'}
              </button>

              {formState.success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-center"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.p>
              )}

              {formState.error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center"
                >
                  Something went wrong. Please try again or reach out on LinkedIn.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}