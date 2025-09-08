'use client'

import { useEffect, useState, useRef } from 'react'

const sections = [
  { id: 'hero', name: 'Home', color: '#f97316' },
  { id: 'achievements', name: 'Impact', color: '#fb923c' },
  { id: 'experience', name: 'Journey', color: '#f59e0b' },
  { id: 'projects', name: 'Work', color: '#fbbf24' },
  { id: 'tech', name: 'Stack', color: '#fde68a' },
  { id: 'contact', name: 'Connect', color: '#f97316' },
]

export default function ConnectedNavigation() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const currentProgress = Math.min(scrollY / documentHeight, 1)
      setScrollProgress(currentProgress)
      
      // Determine active section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id))
      let currentSection = 0
      
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom > windowHeight / 2) {
            currentSection = i
            break
          }
        }
      }
      
      // If we're near the bottom, activate the last section
      if (currentProgress > 0.95) {
        currentSection = sections.length - 1
      }
      
      setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Calculate the height for the progress fill
  const progressHeight = scrollProgress * 100
  const sectionProgress = (activeSection + scrollProgress / sections.length) / sections.length * 100
  
  return (
    <>
      {/* Main navigation container */}
      <div style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '280px',
      }}>
        {/* Background line */}
        <div style={{
          position: 'absolute',
          width: '2px',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '1px',
        }} />
        
        {/* Progress line */}
        <div 
          ref={progressBarRef}
          style={{
            position: 'absolute',
            width: '2px',
            height: `${progressHeight}%`,
            background: `linear-gradient(180deg, ${sections[activeSection].color}, ${sections[Math.min(activeSection + 1, sections.length - 1)].color})`,
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '1px',
            transition: 'height 0.3s ease, background 0.5s ease',
            boxShadow: `0 0 10px ${sections[activeSection].color}40`,
          }} 
        />
        
        {/* Section dots */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {sections.map((section, index) => {
            const isActive = activeSection === index
            const isPassed = index < activeSection || (index === activeSection && scrollProgress > (index + 0.5) / sections.length)
            
            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Section label - shows on hover or active */}
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  padding: '4px 8px',
                  background: 'rgba(9, 9, 11, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: isActive ? section.color : '#ffffff',
                  opacity: hoveredDot === index || isActive ? 1 : 0,
                  transform: hoveredDot === index || isActive ? 'translateX(0)' : 'translateX(10px)',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  border: `1px solid ${isActive ? section.color : 'rgba(255, 255, 255, 0.1)'}`,
                }}>
                  {section.name}
                </div>
                
                {/* Navigation dot */}
                <button
                  onClick={() => scrollToSection(index)}
                  style={{
                    position: 'relative',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: isPassed ? section.color : 'rgba(39, 39, 42, 0.8)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'scale(1.5)' : 'scale(1)',
                    zIndex: 2,
                    boxShadow: isPassed ? `0 0 10px ${section.color}60` : 'none',
                  }}
                  aria-label={`Navigate to ${section.name}`}
                >
                  {/* Pulse effect for active dot */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${section.color}`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      animation: 'gentlePulse 2s infinite',
                      opacity: 0.5,
                    }} />
                  )}
                  
                  {/* Inner dot for active state */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }} />
                  )}
                </button>
              </div>
            )
          })}
        </div>
        
        {/* Scroll progress percentage */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          fontSize: '10px',
          color: sections[activeSection].color,
          opacity: 0.6,
          fontFamily: 'monospace',
        }}>
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gentlePulse {
          0% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1.3);
          }
          100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @media (max-width: 768px) {
          div[style*="right: '24px'"] {
            right: 12px !important;
          }
        }
      `}</style>
    </>
  )
}