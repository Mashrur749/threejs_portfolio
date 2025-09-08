'use client'

import { useEffect, useState } from 'react'

export default function HeroValueProp() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'business' | 'technical'>('business')
  
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
        {/* Main Heading with Clear Value */}
        <h1 style={{ 
          fontSize: isMobile ? '1.75rem' : 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: isMobile ? '0.5rem' : '1rem',
          color: 'white',
          lineHeight: 1.2
        }}>
          I Turn Code Into{' '}
          <span style={{ 
            background: 'linear-gradient(90deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: isMobile ? 'block' : 'inline'
          }}>Business Results</span>
        </h1>

        {/* Clear Value Statement */}
        <p style={{ 
          fontSize: isMobile ? '1rem' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          color: '#e4e4e7',
          fontWeight: '500',
          lineHeight: 1.4
        }}>
          Senior Full-Stack Developer • Calgary, AB • 5+ Years • Critical Mass
        </p>

        {/* Key Business Metrics - Always Visible */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '12px' : '20px',
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          <div style={{
            padding: isMobile ? '12px' : '16px',
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '8px'
          }}>
            <div style={{ 
              fontSize: isMobile ? '1.5rem' : '2rem', 
              fontWeight: 'bold', 
              color: '#f97316',
              marginBottom: '4px'
            }}>
              300x
            </div>
            <div style={{ 
              fontSize: isMobile ? '0.75rem' : '0.85rem', 
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Faster Launches
            </div>
          </div>
          
          <div style={{
            padding: isMobile ? '12px' : '16px',
            background: 'rgba(0, 223, 216, 0.1)',
            border: '1px solid rgba(0, 223, 216, 0.3)',
            borderRadius: '8px'
          }}>
            <div style={{ 
              fontSize: isMobile ? '1.5rem' : '2rem', 
              fontWeight: 'bold', 
              color: '#00dfd8',
              marginBottom: '4px'
            }}>
              60%
            </div>
            <div style={{ 
              fontSize: isMobile ? '0.75rem' : '0.85rem', 
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              QA Time Saved
            </div>
          </div>
          
          <div style={{
            padding: isMobile ? '12px' : '16px',
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px'
          }}>
            <div style={{ 
              fontSize: isMobile ? '1.5rem' : '2rem', 
              fontWeight: 'bold', 
              color: '#fbbf24',
              marginBottom: '4px'
            }}>
              30x
            </div>
            <div style={{ 
              fontSize: isMobile ? '0.75rem' : '0.85rem', 
              color: '#a1a1aa',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Dev Speed Boost
            </div>
          </div>
        </div>

        {/* Audience Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: isMobile ? '1.5rem' : '2rem'
        }}>
          <button
            onClick={() => setActiveTab('business')}
            style={{
              padding: isMobile ? '8px 16px' : '10px 20px',
              background: activeTab === 'business' ? '#f97316' : 'rgba(39, 39, 42, 0.5)',
              border: activeTab === 'business' ? 'none' : '1px solid rgba(63, 63, 70, 0.5)',
              borderRadius: '6px',
              color: 'white',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            📊 Business View
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            style={{
              padding: isMobile ? '8px 16px' : '10px 20px',
              background: activeTab === 'technical' ? '#f97316' : 'rgba(39, 39, 42, 0.5)',
              border: activeTab === 'technical' ? 'none' : '1px solid rgba(63, 63, 70, 0.5)',
              borderRadius: '6px',
              color: 'white',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ⚙️ Technical View
          </button>
        </div>

        {/* Value Proposition Content */}
        <div style={{ 
          marginBottom: isMobile ? '2rem' : '3rem',
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          color: '#d4d4d8',
          lineHeight: 1.7,
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '20px' : '30px',
          background: 'rgba(39, 39, 42, 0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(63, 63, 70, 0.3)',
          minHeight: isMobile ? '180px' : '150px'
        }}>
          {activeTab === 'business' ? (
            <div>
              <h3 style={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem', 
                marginBottom: '1rem',
                color: '#f97316'
              }}>
                🎯 What I Deliver for Your Business
              </h3>
              <ul style={{ 
                textAlign: 'left', 
                margin: '0 auto',
                maxWidth: '700px',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>✓</span>
                  <span><strong>Reduced Costs:</strong> Cut content deployment from 2-3 days to 2-5 hours, saving 25-30 hours bi-weekly</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>✓</span>
                  <span><strong>Faster Time-to-Market:</strong> Launch campaigns 300x faster with offer creation engine</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>✓</span>
                  <span><strong>100% Launch Confidence:</strong> Content comparison tool ensures programmatic precision</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f97316', marginRight: '8px' }}>✓</span>
                  <span><strong>Zero UI Flicker:</strong> Edge personalization strategy for seamless user experience</span>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <h3 style={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem', 
                marginBottom: '1rem',
                color: '#00dfd8'
              }}>
                ⚡ Technical Excellence You Can Trust
              </h3>
              <ul style={{ 
                textAlign: 'left', 
                margin: '0 auto',
                maxWidth: '700px',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#00dfd8', marginRight: '8px' }}>→</span>
                  <span><strong>Next.js Expert:</strong> Edge personalization, ISR, SSG - serving enterprise clients at scale</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#00dfd8', marginRight: '8px' }}>→</span>
                  <span><strong>Full-Stack Proficiency:</strong> React, TypeScript, GraphQL codegen, AWS API Gateway, CMS integration</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#00dfd8', marginRight: '8px' }}>→</span>
                  <span><strong>Performance Optimization:</strong> Dev refresh from 6 minutes to 12 seconds (30x faster)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#00dfd8', marginRight: '8px' }}>→</span>
                  <span><strong>CI/CD & Automation:</strong> Pre-commit hooks catch errors in 10s, review loops reduced by 35%</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Clear Call to Action */}
        <div>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            marginBottom: '1.5rem',
            color: '#fafafa',
            fontWeight: '600'
          }}>
            Ready to transform your development process?
          </p>
          
          <div style={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '12px' : '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <a 
              href="#projects"
              style={{
                padding: isMobile ? '14px 32px' : '16px 40px',
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
              See My Impact →
            </a>
            
            <a 
              href="#contact"
              style={{
                padding: isMobile ? '14px 32px' : '16px 40px',
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
              Schedule a Call
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{
          marginTop: isMobile ? '3rem' : '4rem',
          padding: isMobile ? '1rem' : '1.5rem',
          background: 'rgba(39, 39, 42, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '2rem'
        }}>
          <div style={{ 
            fontSize: isMobile ? '0.85rem' : '0.9rem', 
            color: '#a1a1aa' 
          }}>
            🏢 <strong style={{ color: '#e4e4e7' }}>Critical Mass</strong> Senior Developer
          </div>
          <div style={{ 
            fontSize: isMobile ? '0.85rem' : '0.9rem', 
            color: '#a1a1aa' 
          }}>
            🚀 <strong style={{ color: '#e4e4e7' }}>5+ Years</strong> Enterprise Experience
          </div>
          <div style={{ 
            fontSize: isMobile ? '0.85rem' : '0.9rem', 
            color: '#a1a1aa' 
          }}>
            🎯 <strong style={{ color: '#e4e4e7' }}>15+ Projects</strong> Delivered
          </div>
        </div>
      </div>
    </section>
  )
}