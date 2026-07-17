export default function StructuredData() {
  const BASE = "https://findmashur.dev";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: "Mashrur Rahman",
        jobTitle: "Senior Product Engineer & Technical Lead",
        description:
          "Senior full-stack engineer in Calgary, Alberta, with 6+ years building performant, accessible web applications with Next.js, React, and TypeScript.",
        url: BASE,
        image: `${BASE}/images/headshot.jpg`,
        sameAs: [
          "https://www.linkedin.com/in/mashrurio",
          "https://github.com/Mashrur749",
        ],
        email: "rmashrur.w749@gmail.com",
        telephone: "+1 403-703-7831",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Calgary",
          addressRegion: "Alberta",
          addressCountry: "Canada",
        },
        worksFor: {
          "@type": "Organization",
          name: "Critical Mass",
          url: "https://www.criticalmass.com",
        },
        // Capgemini consultant on a Meta engagement — not a Meta alumnus.
        // Listed honestly to avoid overstating the relationship.
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Seneca College",
            url: "https://www.senecacollege.ca",
          },
        ],
        knowsAbout: [
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
          "Accessibility (WCAG)",
          "Three.js",
        ],
        availableForWork: true,
        seekingEmployment: {
          "@type": "JobPosting",
          description: "Seeking senior full-stack engineering positions",
          employmentType: ["FULL_TIME", "CONTRACT"],
          jobLocation: [
            {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Calgary",
                addressRegion: "Alberta",
                addressCountry: "Canada",
              },
            },
            {
              "@type": "VirtualLocation",
              description: "Remote work across Canada and beyond",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "Mashrur Rahman — Senior Full-Stack Engineer",
        description:
          "Portfolio of Mashrur Rahman, a senior full-stack engineer in Calgary, Alberta specializing in Next.js, React, TypeScript, and Three.js.",
        publisher: { "@id": `${BASE}/#person` },
        inLanguage: "en-CA",
      },
      {
        "@type": "ProfilePage",
        "@id": `${BASE}/#webpage`,
        url: BASE,
        name: "Mashrur Rahman | Senior Full-Stack Engineer",
        description:
          "Senior full-stack engineer in Calgary, Alberta. Next.js, React, TypeScript, and Three.js. Open to new roles, remote-friendly.",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
