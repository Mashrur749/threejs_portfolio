'use client'

export default function HeroSimple() {
  return (
    <section style={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      zIndex: 10,
      color: 'white',
      marginTop: '-64px',
      paddingTop: '64px'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10 
      }}>
        {/* Main Heading */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          Hi, I'm{' '}
          <span style={{ 
            background: 'linear-gradient(90deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Mashrur Rahman</span>
        </h1>

        {/* Title */}
        <p style={{ 
          fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
          marginBottom: '2rem',
          color: '#e4e4e7',
          fontWeight: '500'
        }}>
          Senior Developer • Full-Stack Engineer
        </p>

        {/* Value Proposition */}
        <p style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          marginBottom: '3rem',
          color: '#d4d4d8',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Currently building <span style={{ color: '#f97316', fontWeight: 'bold' }}>enterprise web applications</span> at Critical Mass.
          I've reduced deployment times by 300x, cut QA validation time by 60%, and 
          architected solutions handling millions of monthly visits.{' '}
          <span style={{ color: '#fafafa', fontWeight: '600' }}>I'm a senior developer who ships fast, scales reliably, and delivers measurable ROI.</span>
        </p>

        {/* CTA Buttons */}
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '4rem'
        }}>
          <a
            href="#experience"
            style={{
              padding: '1rem 2rem',
              background: '#f97316',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-block'
            }}
          >
            See My Work
          </a>
          <a
            href="#contact"
            style={{
              padding: '1rem 2rem',
              background: 'rgba(39, 39, 42, 0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(63, 63, 70, 1)',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-block'
            }}
          >
            Hire Me for Your Team
          </a>
        </div>

        {/* Quick Stats */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Deployment Speed', value: '300x Faster' },
            { label: 'QA Time Saved', value: '60%' },
            { label: 'Users Served', value: 'Millions' },
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.875rem',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #f97316, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: '#a1a1aa',
                marginTop: '0.25rem',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}