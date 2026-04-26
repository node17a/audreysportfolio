'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
const mono  = '"SF Mono", ui-monospace, "Cascadia Code", monospace'

const projects = [
  {
    id: 1,
    title: 'Impermanence',
    description: 'Interact with light, color, and sound in an experience exploring memory, change, and letting go.',
    tags: ['CREATIVE COMPUTING', 'INTERACTIVE'],
    image: null,
    bg: '#D8DDD8',
    aspectRatio: '4/3',
  },
  {
    id: 2,
    title: 'Memory Distortion Box',
    description: 'Sound installation built with Arduino + Pure Data. Trigger memories that fragment and distort with proximity.',
    tags: ['MACHINE LEARNING', 'INSTALLATION'],
    image: null,
    bg: '#1a1a2e',
    aspectRatio: '4/3',
  },
  {
    id: 3,
    title: 'Plastic Panic',
    description: '2D pixel game in C++. Guide a turtle, dodge trash, earn points, and learn how ocean waste impacts our planet.',
    tags: ['GAME DESIGN', 'C++'],
    image: null,
    bg: '#134E5E',
    aspectRatio: '4/3',
  },
  {
    id: 4,
    title: 'ACS Jakarta Batik',
    description: 'Traditional Indonesian batik pattern selected among 800+ submissions — now the official uniform for ACS Jakarta.',
    tags: ['ILLUSTRATION', 'TEXTILE'],
    image: null,
    bg: '#C4956A',
    aspectRatio: '4/3',
  },
  {
    id: 5,
    title: 'Compact CR Purifier',
    description: 'Reimagined Corsi-Rosenthal box air purifier designed for accessibility, replicability, and everyday use.',
    tags: ['PRODUCT DESIGN'],
    image: null,
    bg: '#D6D0C8',
    aspectRatio: '4/3',
  },
  {
    id: 6,
    title: 'Generative Type',
    description: 'Typeface experiments using p5.js — letters that breathe, warp, and respond to cursor movement.',
    tags: ['CREATIVE CODING', 'TYPOGRAPHY'],
    image: null,
    bg: '#2D1B4E',
    aspectRatio: '4/3',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const isDark = ['#1', '#0', '#2', '#8'].some(p => project.bg.toLowerCase().startsWith(p))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      {/* Image area */}
      <div style={{ width: '100%', aspectRatio: project.aspectRatio, background: project.bg, position: 'relative', overflow: 'hidden' }}>
        {project.image && (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        {/* Tag — top left overlay */}
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <span style={{
            fontFamily: mono,
            fontSize: '0.62rem',
            color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)',
            letterSpacing: '0.06em',
          }}>
            [{project.tags.join(', ')}]
          </span>
        </div>
      </div>

      {/* Text below image */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 style={{
          fontFamily: sfPro,
          fontWeight: 500,
          fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          color: '#111',
          letterSpacing: '-0.01em',
          margin: 0,
          lineHeight: 1.25,
        }}>
          {project.title}
        </h2>
        <p style={{
          fontFamily: sfPro,
          fontSize: '0.75rem',
          color: '#999',
          lineHeight: 1.55,
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
  return (
    <section id="works" style={{ background: '#F5F5F3', padding: '80px 0 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Rounded frame */}
        <div style={{
          border: '1px solid #E0E0DC',
          borderRadius: 24,
          padding: '48px',
          background: '#F5F5F3',
        }}>

        {/* 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 32px' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: 72, textAlign: 'center' }}
        >
          <Link
            href="/works"
            style={{
              fontFamily: mono,
              fontSize: '0.65rem',
              color: '#aaa',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ddd',
              paddingBottom: 3,
            }}
          >
            [view all works →]
          </Link>
        </motion.div>

        </div>{/* end rounded frame */}

      </div>
    </section>
  )
}
