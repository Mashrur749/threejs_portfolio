'use client'

import { useState, useEffect } from 'react'

export default function NavigationMobile() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const navItems = [
    { label: 'Achievements', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled || mobileMenuOpen ? 'rgba(9, 9, 11, 0.95)' : 'rgba(9, 9, 11, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(39, 39, 42, 0.5)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px'
        }}>
          {/* Logo */}
          <a
            href="/"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f97316',
              textDecoration: 'none'
            }}
          >
            MR
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    color: '#a1a1aa',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Mashrur_Rahman_Resume.pdf"
                download
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f97316',
                  color: '#ffffff',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
              >
                Download CV
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s',
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
              }} />
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            paddingBottom: '16px',
            borderTop: '1px solid rgba(39, 39, 42, 0.5)',
            marginTop: '8px'
          }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  borderBottom: '1px solid rgba(39, 39, 42, 0.3)'
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Mashrur_Rahman_Resume.pdf"
              download
              style={{
                display: 'block',
                marginTop: '16px',
                padding: '12px 20px',
                backgroundColor: '#f97316',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                textAlign: 'center'
              }}
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}