'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
]

function ProjectCard({
  project,
  imageHeight = 280,
  delay = 0,
}: {
  project: (typeof projects)[number]
  imageHeight?: number
  delay?: number
}) {
  const isDark = ['#1', '#0'].some(p => project.bg.toLowerCase().startsWith(p))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -3 }}
      style={{ cursor: 'pointer' }}
    >
      {/* Image / placeholder */}
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
            <span style={{ fontFamily: sfPro, fontSize: '0.55rem', color: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              image coming soon
            </span>
          </div>
        )}

        {/* Type tag — top-left overlay */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
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
            color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.62)',
          }}>
            {project.type}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontFamily: sfPro,
            fontSize: '0.92rem',
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

export default function Works() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="works" ref={ref} style={{ background: '#FAFAF8', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52 }}
        >
          <div>
            <p style={{
              fontFamily: sfPro,
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              color: '#bbb',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            }}>
              Selected Works
            </p>
            <h2 style={{
              fontFamily: sfPro,
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1a1a1a',
              letterSpacing: '-0.03em',
              margin: 0,
              lineHeight: 1.05,
            }}>
              Things I&apos;ve made.
            </h2>
          </div>
          <Link
            href="/works"
            style={{
              fontFamily: sfPro,
              fontSize: '0.73rem',
              color: '#888',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              borderBottom: '1px solid #ddd',
              paddingBottom: 2,
            }}
          >
            view all →
          </Link>
        </motion.div>

        {/* Row 1 — two cards, left wider */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 24, marginBottom: 24 }}>
          <ProjectCard project={projects[0]} imageHeight={320} delay={0} />
          <ProjectCard project={projects[1]} imageHeight={320} delay={0.08} />
        </div>

        {/* Row 2 — three equal cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <ProjectCard project={projects[2]} imageHeight={220} delay={0.12} />
          <ProjectCard project={projects[3]} imageHeight={220} delay={0.18} />
          <ProjectCard project={projects[4]} imageHeight={220} delay={0.24} />
        </div>

      </div>
    </section>
  )
}
