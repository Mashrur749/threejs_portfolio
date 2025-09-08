'use client'

import { useEffect, useState } from 'react'

export default function HeroMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <section id="hero" style={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px 20px',
      zIndex: 10,
      color: 'white',
      backgroundColor: 'rgba(9, 9, 11, 0.5)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        width: '100%',
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10 
      }}>
        {/* Main Heading */}
        <h1 style={{ 
          fontSize: isMobile ? '2rem' : 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 'bold',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          color: 'white',
          lineHeight: 1.2
        }}>
          Hi, I'm{' '}
          <span style={{ 
            background: 'linear-gradient(90deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: isMobile ? 'block' : 'inline',
            marginTop: isMobile ? '0.5rem' : 0
          }}>Mashrur Rahman</span>
        </h1>

        {/* Title */}
        <p style={{ 
          fontSize: isMobile ? '1.1rem' : 'clamp(1.25rem, 3vw, 1.875rem)',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          color: '#e4e4e7',
          fontWeight: '500',
          lineHeight: 1.4
        }}>
          Senior Developer • Full-Stack Engineer
        </p>

        {/* Value Proposition */}
        <div style={{ 
          marginBottom: isMobile ? '2rem' : '3rem',
          fontSize: isMobile ? '0.95rem' : '1.125rem',
          color: '#a1a1aa',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
          padding: isMobile ? '0' : '0 20px'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Transforming enterprise applications at{' '}
            <span style={{ color: '#f97316', fontWeight: '600' }}>Critical Mass</span>
          </p>
          <p>
            Specialist in high-performance Next.js applications, edge computing, and scalable architectures.
            5+ years delivering solutions that impact millions of users.
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '16px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="#projects"
            style={{
              padding: isMobile ? '14px 32px' : '16px 32px',
              background: 'linear-gradient(90deg, #f97316, #fb923c)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '15px' : '16px',
              display: 'inline-block',
              transition: 'transform 0.2s, box-shadow 0.2s',
              width: isMobile ? '100%' : 'auto',
              textAlign: 'center',
              minHeight: '48px',
              lineHeight: isMobile ? '20px' : 'normal'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            View My Work
          </a>
          
          <a 
            href="#contact"
            style={{
              padding: isMobile ? '14px 32px' : '16px 32px',
              background: 'rgba(39, 39, 42, 0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(63, 63, 70, 0.5)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '15px' : '16px',
              display: 'inline-block',
              transition: 'all 0.2s',
              width: isMobile ? '100%' : 'auto',
              textAlign: 'center',
              minHeight: '48px',
              lineHeight: isMobile ? '20px' : 'normal'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(39, 39, 42, 0.8)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(39, 39, 42, 0.5)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Tech Stack Preview - Mobile Optimized */}
        <div style={{ 
          marginTop: isMobile ? '3rem' : '4rem',
          padding: isMobile ? '1.5rem' : '2rem',
          background: 'rgba(39, 39, 42, 0.3)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          border: '1px solid rgba(63, 63, 70, 0.3)'
        }}>
          <p style={{ 
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            color: '#71717a',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Core Technologies
          </p>
          <div style={{ 
            display: 'flex',
            gap: isMobile ? '8px' : '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS'].map(tech => (
              <span 
                key={tech}
                style={{
                  padding: isMobile ? '6px 12px' : '8px 16px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '6px',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  color: '#f97316',
                  fontWeight: '500'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}