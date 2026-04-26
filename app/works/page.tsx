'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

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
    aspectRatio: '3/4',
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
  {
    id: 7,
    title: 'Bloom Zine',
    description: 'Self-published A5 zine exploring the aesthetics of urban nature — photography, collage, and hand-lettering.',
    tags: ['PRINT', 'EDITORIAL'],
    image: null,
    bg: '#F2E0D0',
    aspectRatio: '3/4',
  },
  {
    id: 8,
    title: 'Sensory Overload',
    description: 'Interactive web experience translating anxiety into visual and audio chaos that the user can gradually calm.',
    tags: ['INTERACTIVE MEDIA', 'WEB'],
    image: null,
    bg: '#1C1C1C',
    aspectRatio: '4/3',
  },
  {
    id: 9,
    title: 'Woven Identity',
    description: 'Textile series exploring cultural duality through weave patterns that shift between two visual languages.',
    tags: ['TEXTILES', 'CRAFT'],
    image: null,
    bg: '#8B5E3C',
    aspectRatio: '3/4',
  },
  {
    id: 10,
    title: 'Quiet Hours',
    description: 'Ambient sound app for focus and rest. Generative audio blends field recordings with synthesised tones.',
    tags: ['APP DESIGN', 'UX/UI'],
    image: null,
    bg: '#E8EEF4',
    aspectRatio: '4/3',
  },
  {
    id: 11,
    title: 'Data Diary',
    description: 'Personal data visualisation — six months of mood, sleep, and screen time rendered as hand-drawn charts.',
    tags: ['DATA VIZ', 'SELF-INITIATED'],
    image: null,
    bg: '#FCEBD5',
    aspectRatio: '4/3',
  },
  {
    id: 12,
    title: 'Light Study No. 3',
    description: 'Long-exposure photography series shot across London — capturing how artificial light bleeds into architecture.',
    tags: ['PHOTOGRAPHY'],
    image: null,
    bg: '#1C2632',
    aspectRatio: '3/4',
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

export default function WorksPage() {
  return (
    <>
    <Navbar />
    <main style={{ background: '#F5F5F3', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ padding: '100px 48px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}
        >
          <div>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', color: '#aaa', letterSpacing: '0.1em', margin: '0 0 10px', textTransform: 'uppercase' }}>
              [{projects.length} projects]
            </p>
            <h1 style={{ fontFamily: sfPro, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#111', letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
              All Works
            </h1>
          </div>
          <span style={{ fontFamily: mono, fontSize: '0.62rem', color: '#bbb', letterSpacing: '0.06em' }}>2022 — 2024</span>
        </motion.div>
      </div>

      {/* 2-column grid */}
      <div style={{ padding: '0 48px 120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

    </main>
    </>
  )
}
