'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { sfPro, mono } from '@/lib/fonts'
import { useIsMobile } from '@/lib/useIsMobile'

const STARS = [
  // row 1 — very top strip
  { char: '✦', top:  5, right:  10, size: '0.62rem', op: 0.58, delay: 0.00, color: '#C0B0D8' },
  { char: '⋆', top:  3, right:  32, size: '0.40rem', op: 0.38, delay: 0.10, color: '#D4C5E8' },
  { char: '✧', top:  8, right:  56, size: '0.52rem', op: 0.48, delay: 0.20, color: '#B4A0DC' },
  { char: '·', top:  2, right:  82, size: '0.72rem', op: 0.32, delay: 0.05, color: '#E8D5F0' },
  { char: '✺', top:  7, right: 110, size: '0.46rem', op: 0.44, delay: 0.25, color: '#FFB7C5' },
  { char: '⋆', top:  4, right: 140, size: '0.38rem', op: 0.34, delay: 0.15, color: '#C0B0D8' },
  { char: '✦', top:  9, right: 172, size: '0.56rem', op: 0.50, delay: 0.35, color: '#D4C5E8' },
  { char: '✧', top:  2, right: 206, size: '0.42rem', op: 0.38, delay: 0.08, color: '#B4A0DC' },
  { char: '✸', top:  6, right: 242, size: '0.50rem', op: 0.38, delay: 0.28, color: '#E8D5F0' },
  { char: '·', top:  3, right: 280, size: '0.66rem', op: 0.28, delay: 0.18, color: '#FFB7C5' },
  { char: '⋆', top:  8, right: 320, size: '0.40rem', op: 0.26, delay: 0.30, color: '#C0B0D8' },
  // row 2
  { char: '✸', top: 22, right:  14, size: '0.48rem', op: 0.38, delay: 0.40, color: '#B4A0DC' },
  { char: '⋆', top: 20, right:  40, size: '0.50rem', op: 0.48, delay: 0.12, color: '#C0B0D8' },
  { char: '✦', top: 26, right:  66, size: '0.44rem', op: 0.44, delay: 0.32, color: '#D4C5E8' },
  { char: '·', top: 18, right:  96, size: '0.70rem', op: 0.28, delay: 0.22, color: '#E8D5F0' },
  { char: '✧', top: 28, right: 128, size: '0.46rem', op: 0.40, delay: 0.42, color: '#FFB7C5' },
  { char: '✶', top: 16, right: 162, size: '0.56rem', op: 0.48, delay: 0.08, color: '#C0B0D8' },
  { char: '✺', top: 30, right: 198, size: '0.42rem', op: 0.34, delay: 0.38, color: '#B4A0DC' },
  { char: '⋆', top: 14, right: 236, size: '0.50rem', op: 0.38, delay: 0.48, color: '#D4C5E8' },
  { char: '✦', top: 32, right: 276, size: '0.46rem', op: 0.44, delay: 0.20, color: '#E8D5F0' },
  { char: '·', top: 12, right: 318, size: '0.68rem', op: 0.24, delay: 0.55, color: '#FFB7C5' },
  // row 3
  { char: '✧', top: 44, right:  12, size: '0.52rem', op: 0.38, delay: 0.50, color: '#FFB7C5' },
  { char: '⋆', top: 42, right:  40, size: '0.42rem', op: 0.34, delay: 0.16, color: '#C0B0D8' },
  { char: '✦', top: 48, right:  70, size: '0.56rem', op: 0.48, delay: 0.44, color: '#D4C5E8' },
  { char: '·', top: 38, right: 104, size: '0.68rem', op: 0.28, delay: 0.26, color: '#B4A0DC' },
  { char: '✺', top: 50, right: 140, size: '0.46rem', op: 0.38, delay: 0.36, color: '#E8D5F0' },
  { char: '✶', top: 36, right: 178, size: '0.50rem', op: 0.44, delay: 0.60, color: '#FFB7C5' },
  { char: '⋆', top: 52, right: 218, size: '0.42rem', op: 0.34, delay: 0.46, color: '#C0B0D8' },
  { char: '✧', top: 34, right: 260, size: '0.56rem', op: 0.38, delay: 0.56, color: '#B4A0DC' },
  { char: '✸', top: 46, right: 302, size: '0.44rem', op: 0.26, delay: 0.65, color: '#D4C5E8' },
  // row 4 — lower, keep right < 150 to stay clear of the bottom-right links
  { char: '✸', top: 62, right:  10, size: '0.46rem', op: 0.34, delay: 0.66, color: '#D4C5E8' },
  { char: '⋆', top: 60, right:  36, size: '0.40rem', op: 0.28, delay: 0.55, color: '#E8D5F0' },
  { char: '✦', top: 66, right:  64, size: '0.50rem', op: 0.38, delay: 0.72, color: '#C0B0D8' },
  { char: '·', top: 58, right:  96, size: '0.66rem', op: 0.24, delay: 0.45, color: '#FFB7C5' },
  { char: '✧', top: 68, right: 130, size: '0.44rem', op: 0.32, delay: 0.62, color: '#B4A0DC' },
]

export default function Contact() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-40px' })

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#F5F5F3',
        borderTop: '1px solid #E4E4E0',
        padding: isMobile ? '36px 24px 32px' : '36px 64px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Star field — top-right corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: s.op } : { opacity: 0 }}
            transition={{ delay: s.delay, duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: s.top,
              right: s.right,
              fontFamily: mono,
              fontSize: s.size,
              color: s.color,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {s.char}
          </motion.span>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Availability line */}
        <p style={{
          fontFamily: sfPro,
          fontSize: '0.97rem',
          fontWeight: 400,
          color: '#111',
          margin: '0 0 20px',
          letterSpacing: '-0.01em',
        }}>
          I&apos;m always down for a chat! say hello{' '}
          <a
            href="mailto:audrey17leo@gmail.com"
            style={{ color: '#111', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            audrey17leo@gmail.com
          </a>
        </p>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 16 : 12,
        }}>
          <span style={{
            fontFamily: mono,
            fontSize: '0.6rem',
            color: '#aaa',
            letterSpacing: '0.03em',
          }}>
            © 2026 Audrey Leo &nbsp;|&nbsp; Made with love, numerous white chocolate matchas &amp; a concerning amount of green grapes.
          </span>

          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/audrey17leo' },
              { label: 'GitHub',   href: 'https://github.com/node17a' },
              { label: 'Email',    href: 'mailto:audrey17leo@gmail.com' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: sfPro,
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: '#111',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
