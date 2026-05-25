'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { sfPro } from '@/lib/fonts'
import { useIsMobile } from '@/lib/useIsMobile'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

function BrandChip({ src, alt, width = 52, bg = '#f0f0f0', height = 18 }: { src: string; alt: string; width?: number; bg?: string; height?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', background: bg, borderRadius: 6, padding: '2px 8px', border: '1px solid rgba(0,0,0,0.07)', margin: '0 3px', position: 'relative', top: '-1px' }}>
      <img src={src} alt={alt} style={{ height, width: 'auto', maxWidth: width, objectFit: 'contain', display: 'block' }} />
    </span>
  )
}

function LogoImg({ src, alt, height = 18, width }: { src: string; alt: string; height?: number; width?: number }) {
  return (
    <img src={src} alt={alt} style={{ height, width: 'auto', maxWidth: width, objectFit: 'contain', display: 'inline', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px' }} />
  )
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section style={{ position: 'relative', background: '#F5F5F3', overflow: 'hidden' }}>

      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

      {/* Soft blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,190,255,0.28) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,220,255,0.22) 0%, transparent 65%)', filter: 'blur(56px)', pointerEvents: 'none' }} />

      {/* Two-column layout */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: isMobile ? '100px 24px 60px' : '130px 64px 90px',
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 32 : 56,
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT: 3D model — appears below text on mobile (column-reverse) */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: isMobile ? 'none' : '0 0 42%', width: isMobile ? '100%' : undefined, height: isMobile ? 260 : 380, pointerEvents: 'none' }}
        >
          <SleepingModel />
        </motion.div>

        {/* RIGHT: content */}
        <div style={{ flex: 1, width: isMobile ? '100%' : undefined }}>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: sfPro,
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
              color: '#111',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 24px',
            }}
          >
            Audrey Leo <span style={{ fontWeight: 300 }}>crafts</span> bold,{' '}
            <span style={{ fontWeight: 300, color: '#555' }}>story-driven </span>
            <span style={{
              fontStyle: 'italic',
              fontWeight: 300,
              textDecorationLine: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: '#D4C5E8',
              textUnderlineOffset: '4px',
            }}>experiences</span>
            {' '}
            <span style={{ fontWeight: 300, color: '#555' }}>through </span>
            creative design,{' '}
            <span style={{ fontWeight: 300, color: '#666' }}>brand strategy &amp; visual storytelling.</span>
          </motion.h1>

          {/* Subtitle + credentials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 28 }}
          >
            <p style={{
              fontFamily: sfPro,
              fontSize: '0.88rem',
              color: '#777',
              fontWeight: 300,
              lineHeight: 1.75,
              margin: '0 0 16px',
            }}>
              Art and Technology @ <BrandChip src="/UCL.png" alt="UCL" width={52} bg="#f0f0f0" />
            </p>

            {/* Logo stickers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <span style={{ fontFamily: sfPro, fontSize: '0.72rem', color: '#777', fontWeight: 400 }}>Currently Student Ambassador @</span>
                <BrandChip src="/Canva_logo.svg.png" alt="Canva" width={72} bg="#f0f0f0" />
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: sfPro, fontSize: '0.72rem', color: '#777', fontWeight: 400 }}>Sales @</span>
                <BrandChip src="/maje2.png" alt="Maje" width={64} bg="#f5f5f5" />
              </div>
              <p style={{ fontFamily: sfPro, fontSize: '0.78rem', color: '#999', fontWeight: 300, margin: '4px 0 0', lineHeight: 1.5 }}>
                Open to marketing, branding, and commercial internships &amp; creative opportunities.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: sfPro, fontSize: '0.72rem', color: '#777', fontWeight: 400 }}>Prev.</span>
                <LogoImg src="/lfw.png" alt="London Fashion Week" height={40} width={130} />
                <span style={{ color: '#999' }}>&amp;</span>
                <LogoImg src="/Lawson.png" alt="Lawson" height={44} width={120} />
                <span style={{ color: '#999' }}>&amp;</span>
                <LogoImg src="/idn.png" alt="IDN Media" height={34} width={80} />
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            style={{ display: 'flex', gap: 14, alignItems: 'center' }}
          >
            <motion.a
              href="#works"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: sfPro, fontSize: '0.85rem', fontWeight: 500, color: '#fff', textDecoration: 'none', background: '#1C1C1A', borderRadius: 40, padding: '12px 28px', display: 'inline-block', letterSpacing: '0.01em' }}
            >
              See my work →
            </motion.a>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
