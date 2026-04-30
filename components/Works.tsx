'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
const mono  = '"SF Mono", ui-monospace, "Cascadia Code", monospace'

const displayProjects = [
  ...realProjects.map(p => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    tags: p.tags,
    image: p.heroImage as string | null,
    aspectRatio: '4/3' as const,
    video:      p.slug === 'plastic-panic' ? '/imac_composite.mp4'  : undefined as string | undefined,
    videoHover: p.slug === 'plastic-panic' ? '/imac_composite2.mp4' : undefined as string | undefined,
  })),
  {
    id: 'generative-type',
    slug: '',
    title: 'Generative Type',
    description: 'Typeface experiments using p5.js — letters that breathe, warp, and respond to cursor movement.',
    tags: ['CREATIVE CODING', 'TYPOGRAPHY'],
    image: null as string | null,
    aspectRatio: '4/3' as const,
    video: undefined as string | undefined,
    videoHover: undefined as string | undefined,
  },
]

type DisplayProject = typeof displayProjects[number]

function ProjectCard({ project, index }: { project: DisplayProject; index: number }) {
  const [hovered, setHovered] = useState(false)
  const hasVideo = !!project.video && !!project.videoHover

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: project.slug ? 'pointer' : 'default',
        background: '#F5F5F3',
        border: '1px solid #E0E0DC',
        borderRadius: 16,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
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

      {/* Media container */}
      {project.id === 'impermanence' && project.image ? (
        /* ── Soft glow frame for Impermanence ── */
        <div style={{
          width: '100%',
          aspectRatio: project.aspectRatio,
          marginBottom: 14,
          position: 'relative',
        }}>
          {/* Blurred glow — sits behind frame, softly halos around it */}
          <img
            src={project.image}
            aria-hidden
            style={{
              position: 'absolute',
              inset: 16,
              width: 'calc(100% - 32px)',
              height: 'calc(100% - 32px)',
              objectFit: 'cover',
              filter: 'blur(18px) saturate(1.2)',
              opacity: 0.38,
              borderRadius: 10,
              zIndex: 0,
            }}
          />
          {/* Gradient border + clean image — no shadows */}
          <div style={{
            position: 'absolute', inset: 20,
            zIndex: 1,
            borderRadius: 11,
            padding: '1.5px',
            background: 'linear-gradient(135deg, rgba(205,182,255,0.75), rgba(182,208,255,0.75), rgba(182,238,224,0.6), rgba(255,218,192,0.65), rgba(205,182,255,0.75))',
            boxSizing: 'border-box' as const,
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: project.aspectRatio,
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 14,
          position: 'relative',
          background: '#F5F5F3',
        }}>
        {hasVideo ? (
          <>
            <video
              src={project.video}
              autoPlay loop muted playsInline
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'multiply',
              }}
            />
            <video
              src={project.videoHover}
              autoPlay loop muted playsInline
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'multiply',
              }}
            />
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: '100%', display: 'block',
              objectFit: 'cover',
            }}
          />
        ) : null}
        </div>
      )}

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
            {displayProjects.map((p, i) =>
              p.slug ? (
                <Link key={p.id} href={`/works/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <ProjectCard project={p} index={i} />
                </Link>
              ) : (
                <ProjectCard key={p.id} project={p} index={i} />
              )
            )}
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

        </div>

      </div>
    </section>
  )
}
