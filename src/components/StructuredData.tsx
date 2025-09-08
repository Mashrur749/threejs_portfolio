export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mashrur.dev/#person",
        "name": "Mashrur Rahman",
        "jobTitle": "Senior Full-Stack Developer",
        "description": "Senior Next.js and React Developer with 5+ years of experience building enterprise web applications",
        "url": "https://mashrur.dev",
        "image": "https://mashrur.dev/profile-image.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/mashrurio",
          "https://github.com/mashrurrahman"
        ],
        "email": "rmashrur.w749@gmail.com",
        "telephone": "+1-calgary-contact",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Calgary",
          "addressRegion": "Alberta",
          "addressCountry": "Canada",
          "postalCode": "T2X"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "Critical Mass",
          "url": "https://www.criticalmass.com"
        },
        "alumniOf": [
          {
            "@type": "Organization",
            "name": "Meta",
            "url": "https://about.meta.com"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "Seneca College",
            "url": "https://www.senecacollege.ca"
          }
        ],
        "knowsAbout": [
          "Next.js Development",
          "React.js",
          "TypeScript",
          "Node.js",
          "GraphQL",
          "AWS",
          "Full-Stack Development",
          "Enterprise Web Applications",
          "Performance Optimization",
          "CI/CD",
          "Agile Development"
        ],
        "availableForWork": true,
        "seekingEmployment": {
          "@type": "JobPosting",
          "description": "Seeking Senior Full-Stack Developer positions",
          "employmentType": ["FULL_TIME", "CONTRACT"],
          "jobLocation": [
            {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Calgary",
                "addressRegion": "Alberta",
                "addressCountry": "Canada"
              }
            },
            {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Toronto",
                "addressRegion": "Ontario",
                "addressCountry": "Canada"
              }
            },
            {
              "@type": "VirtualLocation",
              "description": "Remote work available"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://mashrur.dev/#website",
        "url": "https://mashrur.dev",
        "name": "Mashrur Rahman - Senior Developer Portfolio",
        "description": "Portfolio of Mashrur Rahman, a Senior Full-Stack Developer in Calgary, Alberta specializing in Next.js, React, and TypeScript",
        "publisher": {
          "@id": "https://mashrur.dev/#person"
        },
        "inLanguage": "en-CA"
      },
      {
        "@type": "WebPage",
        "@id": "https://mashrur.dev/#webpage",
        "url": "https://mashrur.dev",
        "name": "Mashrur Rahman | Senior Next.js Developer Calgary | Full-Stack Engineer",
        "description": "Senior Full-Stack Developer in Calgary, Alberta. Specializing in Next.js, React, TypeScript. Available for remote positions across Canada.",
        "isPartOf": {
          "@id": "https://mashrur.dev/#website"
        },
        "about": {
          "@id": "https://mashrur.dev/#person"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://mashrur.dev"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Calgary Developer",
              "item": "https://mashrur.dev#hero"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Projects",
              "item": "https://mashrur.dev#projects"
            }
          ]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://mashrur.dev/#service",
        "name": "Mashrur Rahman - Full-Stack Development Services",
        "provider": {
          "@id": "https://mashrur.dev/#person"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "State",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Toronto",
            "containedInPlace": {
              "@type": "State",
              "name": "Ontario"
            }
          },
          {
            "@type": "Country",
            "name": "Canada"
          }
        ],
        "serviceType": [
          "Next.js Development",
          "React Development",
          "Full-Stack Development",
          "Web Application Development",
          "Performance Optimization",
          "Enterprise Solutions"
        ],
        "priceRange": "$$$$"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}