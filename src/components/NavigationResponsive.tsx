'use client'

import { useState, useEffect } from 'react'

export default function NavigationResponsive() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        backgroundColor: scrolled ? 'rgba(9, 9, 11, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(39, 39, 42, 0.5)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 20px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Logo */}
        <a
          href="/"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f97316',
            textDecoration: 'none'
          }}
        >
          MR
        </a>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}
        className="hidden md:flex"
        >
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
              padding: '8px 16px',
              backgroundColor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer'
          }}
          className="block md:hidden"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
            }} />
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'opacity 0.3s',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          display: 'block',
          padding: '16px 0',
          borderTop: '1px solid rgba(39, 39, 42, 0.5)',
          backgroundColor: 'rgba(9, 9, 11, 0.95)',
          backdropFilter: 'blur(12px)'
        }}
        className="md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: '#a1a1aa',
                textDecoration: 'none',
                fontSize: '16px'
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Mashrur_Rahman_Resume.pdf"
            download
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '10px 20px',
              backgroundColor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px'
            }}
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  )
}