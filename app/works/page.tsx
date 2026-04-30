'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { projects as realProjects } from '@/lib/projects'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
const mono  = '"SF Mono", ui-monospace, "Cascadia Code", monospace'

const allProjects = [
  ...realProjects.map(p => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    tags: p.tags,
    image: p.heroImage,
    bg: p.bg,
    aspectRatio: '4/3' as const,
  })),
  {
    id: 'generative-type',
    slug: '',
    title: 'Generative Type',
    description: 'Typeface experiments using p5.js — letters that breathe, warp, and respond to cursor movement.',
    tags: ['CREATIVE CODING', 'TYPOGRAPHY'],
    image: null as string | null,
    bg: '#2D1B4E',
    aspectRatio: '4/3' as const,
  },
  {
    id: 'bloom-zine',
    slug: '',
    title: 'Bloom Zine',
    description: 'Self-published A5 zine exploring the aesthetics of urban nature — photography, collage, and hand-lettering.',
    tags: ['PRINT', 'EDITORIAL'],
    image: null as string | null,
    bg: '#F2E0D0',
    aspectRatio: '3/4' as const,
  },
  {
    id: 'sensory-overload',
    slug: '',
    title: 'Sensory Overload',
    description: 'Interactive web experience translating anxiety into visual and audio chaos that the user can gradually calm.',
    tags: ['INTERACTIVE MEDIA', 'WEB'],
    image: null as string | null,
    bg: '#1C1C1C',
    aspectRatio: '4/3' as const,
  },
  {
    id: 'woven-identity',
    slug: '',
    title: 'Woven Identity',
    description: 'Textile series exploring cultural duality through weave patterns that shift between two visual languages.',
    tags: ['TEXTILES', 'CRAFT'],
    image: null as string | null,
    bg: '#8B5E3C',
    aspectRatio: '3/4' as const,
  },
  {
    id: 'quiet-hours',
    slug: '',
    title: 'Quiet Hours',
    description: 'Ambient sound app for focus and rest. Generative audio blends field recordings with synthesised tones.',
    tags: ['APP DESIGN', 'UX/UI'],
    image: null as string | null,
    bg: '#E8EEF4',
    aspectRatio: '4/3' as const,
  },
  {
    id: 'data-diary',
    slug: '',
    title: 'Data Diary',
    description: 'Personal data visualisation — six months of mood, sleep, and screen time rendered as hand-drawn charts.',
    tags: ['DATA VIZ', 'SELF-INITIATED'],
    image: null as string | null,
    bg: '#FCEBD5',
    aspectRatio: '4/3' as const,
  },
  {
    id: 'light-study',
    slug: '',
    title: 'Light Study No. 3',
    description: 'Long-exposure photography series shot across London — capturing how artificial light bleeds into architecture.',
    tags: ['PHOTOGRAPHY'],
    image: null as string | null,
    bg: '#1C2632',
    aspectRatio: '3/4' as const,
  },
]

type DisplayProject = typeof allProjects[number]

function ProjectCard({ project, index }: { project: DisplayProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      style={{
        cursor: project.slug ? 'pointer' : 'default',
        background: '#fff',
        border: '1px solid #E8E8E4',
        borderRadius: 16,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Tag */}
      <p style={{
        fontFamily: mono,
        fontSize: '0.58rem',
        color: '#aaa',
        letterSpacing: '0.06em',
        margin: '0 0 10px',
        textTransform: 'uppercase',
      }}>
        [{project.tags.join(', ')}]
      </p>

      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: project.aspectRatio,
        background: project.bg,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 14,
      }}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: sfPro,
        fontWeight: 500,
        fontSize: '0.95rem',
        color: '#111',
        letterSpacing: '-0.01em',
        margin: '0 0 4px',
        lineHeight: 1.3,
      }}>
        {project.title}
      </h2>

      {/* Description */}
      {project.description && (
        <p style={{
          fontFamily: sfPro,
          fontSize: '0.75rem',
          color: '#999',
          lineHeight: 1.5,
          fontWeight: 400,
          margin: 0,
        }}>
          {project.description}
        </p>
      )}
    </motion.div>
  )
}

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#F5F5F3', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px 56px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #E0E0DC', paddingBottom: 32 }}
          >
            <div>
              <p style={{ fontFamily: mono, fontSize: '0.62rem', color: '#bbb', letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>
                [{allProjects.length} projects]
              </p>
              <h1 style={{ fontFamily: sfPro, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#111', letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
                All Works
              </h1>
            </div>
            <span style={{ fontFamily: mono, fontSize: '0.62rem', color: '#ccc', letterSpacing: '0.06em', paddingBottom: 4 }}>2022 — 2024</span>
          </motion.div>
        </div>

        {/* 2-column grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 48px 140px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px 40px' }}>
          {allProjects.map((p, i) =>
            p.slug ? (
              <Link key={p.id} href={`/works/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <ProjectCard project={p} index={i} />
              </Link>
            ) : (
              <ProjectCard key={p.id} project={p} index={i} />
            )
          )}
        </div>

      </main>
    </>
  )
}
