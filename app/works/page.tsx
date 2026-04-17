'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

const projects = [
  {
    id: 1,
    title: 'Impermanence',
    description: 'Interact with light, color, and sound in an experience exploring memory, change, and letting go.',
    company: 'UCL Slade',
    type: 'Creative Computing',
    year: '2024',
    image: null,
    bg: '#C9D9C8',
  },
  {
    id: 2,
    title: 'Memory Distortion Box',
    description: 'Sound installation built with Arduino + Pure Data. Trigger memories that fragment and distort with proximity.',
    company: 'UCL Slade',
    type: 'Machine Learning & Product Design',
    year: '2024',
    image: null,
    bg: '#1a1a2e',
  },
  {
    id: 3,
    title: 'Plastic Panic',
    description: '2D pixel game in C++. Guide a turtle, dodge trash, earn points, and learn how ocean waste impacts our planet.',
    company: 'UCL Slade',
    type: 'Game Design',
    year: '2024',
    image: null,
    bg: '#134E5E',
  },
  {
    id: 4,
    title: 'ACS Jakarta Batik',
    description: 'Traditional Indonesian batik pattern selected among 800+ submissions — now the official uniform for ACS Jakarta.',
    company: 'ACS Jakarta',
    type: 'Illustration',
    year: '2023',
    image: null,
    bg: '#C4956A',
  },
  {
    id: 5,
    title: 'Compact CR Purifier',
    description: 'Reimagined Corsi-Rosenthal box air purifier designed for accessibility, replicability, and everyday use.',
    company: 'Independent',
    type: 'Product Design',
    year: '2023',
    image: null,
    bg: '#D6D0C8',
  },
  {
    id: 6,
    title: 'Generative Type',
    description: 'Typeface experiments using p5.js — letters that breathe, warp, and respond to cursor movement.',
    company: 'UCL Slade',
    type: 'Creative Coding',
    year: '2024',
    image: null,
    bg: '#2D1B4E',
  },
  {
    id: 7,
    title: 'Bloom Zine',
    description: 'Self-published A5 zine exploring the aesthetics of urban nature — photography, collage, and hand-lettering.',
    company: 'Independent',
    type: 'Print & Editorial',
    year: '2023',
    image: null,
    bg: '#F2E0D0',
  },
  {
    id: 8,
    title: 'Sensory Overload',
    description: 'Interactive web experience translating anxiety into visual + audio chaos that the user can gradually calm.',
    company: 'UCL Slade',
    type: 'Interactive Media',
    year: '2024',
    image: null,
    bg: '#0D0D0D',
  },
  {
    id: 9,
    title: 'Woven Identity',
    description: 'Textile series exploring cultural duality through weave patterns that shift between two visual languages.',
    company: 'ACS Jakarta',
    type: 'Textiles & Craft',
    year: '2022',
    image: null,
    bg: '#8B5E3C',
  },
  {
    id: 10,
    title: 'Quiet Hours',
    description: 'Ambient sound app for focus and rest. Generative audio blends field recordings with synthesised tones.',
    company: 'Independent',
    type: 'App Design',
    year: '2023',
    image: null,
    bg: '#E8EEF4',
  },
  {
    id: 11,
    title: 'Data Diary',
    description: 'Personal data visualisation — six months of mood, sleep, and screen time rendered as hand-drawn charts.',
    company: 'Independent',
    type: 'Data Visualisation',
    year: '2024',
    image: null,
    bg: '#FCEBD5',
  },
  {
    id: 12,
    title: 'Light Study No. 3',
    description: 'Long-exposure photography series shot across London — capturing how artificial light bleeds into architecture.',
    company: 'Independent',
    type: 'Photography',
    year: '2023',
    image: null,
    bg: '#1C2632',
  },
]

function ProjectCard({
  project,
  imageHeight = 240,
  delay = 0,
}: {
  project: (typeof projects)[number]
  imageHeight?: number
  delay?: number
}) {
  const isDark = ['#1', '#0', '#2', '#8'].some(p => project.bg.toLowerCase().startsWith(p))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -3 }}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          width: '100%',
          height: imageHeight,
          borderRadius: 12,
          background: project.bg,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{
              fontFamily: sfPro,
              fontSize: '0.55rem',
              color: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              image coming soon
            </span>
          </div>
        )}

        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)',
          backdropFilter: 'blur(6px)',
          borderRadius: 20,
          padding: '4px 10px',
        }}>
          <span style={{
            fontFamily: sfPro,
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.58)',
          }}>
            {project.type}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontFamily: sfPro,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1a1a1a',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            {project.title}
          </span>
          <span style={{
            fontFamily: sfPro,
            fontSize: '0.68rem',
            fontWeight: 400,
            color: '#999',
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
          }}>
            {project.company} · {project.year}
          </span>
        </div>
        <p style={{
          fontFamily: sfPro,
          fontSize: '0.76rem',
          color: '#666',
          lineHeight: 1.6,
          fontWeight: 400,
          margin: 0,
        }}>
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function WorksPage() {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh', padding: '80px 0 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Nav back */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 64 }}
        >
          <Link
            href="/"
            style={{
              fontFamily: sfPro,
              fontSize: '0.75rem',
              color: '#999',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← back
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          style={{ marginBottom: 60 }}
        >
          <p style={{
            fontFamily: sfPro,
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: '#bbb',
            textTransform: 'uppercase',
            margin: '0 0 10px',
          }}>
            All Works
          </p>
          <h1 style={{
            fontFamily: sfPro,
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            color: '#1a1a1a',
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1.05,
          }}>
            Everything I&apos;ve made.
          </h1>
        </motion.div>

        {/* Row 1 — 2 large */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 24, marginBottom: 24 }}>
          <ProjectCard project={projects[0]} imageHeight={340} delay={0.1} />
          <ProjectCard project={projects[1]} imageHeight={340} delay={0.16} />
        </div>

        {/* Row 2 — 3 equal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <ProjectCard project={projects[2]} imageHeight={230} delay={0} />
          <ProjectCard project={projects[3]} imageHeight={230} delay={0.06} />
          <ProjectCard project={projects[4]} imageHeight={230} delay={0.12} />
        </div>

        {/* Row 3 — 2 wide + 1 narrow */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, marginBottom: 24 }}>
          <ProjectCard project={projects[5]} imageHeight={290} delay={0} />
          <ProjectCard project={projects[6]} imageHeight={290} delay={0.08} />
        </div>

        {/* Row 4 — 3 equal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <ProjectCard project={projects[7]} imageHeight={230} delay={0} />
          <ProjectCard project={projects[8]} imageHeight={230} delay={0.06} />
          <ProjectCard project={projects[9]} imageHeight={230} delay={0.12} />
        </div>

        {/* Row 5 — 2 equal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <ProjectCard project={projects[10]} imageHeight={260} delay={0} />
          <ProjectCard project={projects[11]} imageHeight={260} delay={0.08} />
        </div>

      </div>
    </main>
  )
}
