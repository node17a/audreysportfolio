'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

// ── Boxed chip (Maje, UCL — keep the pill) ───────────────────────────────────
function BrandChip({ src, alt, width = 52, bg = '#f0f0f0' }: { src: string; alt: string; width?: number; bg?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', background: bg, borderRadius: 6, padding: '2px 8px', border: '1px solid rgba(0,0,0,0.07)', margin: '0 3px', position: 'relative', top: '-1px' }}>
      <img src={src} alt={alt} style={{ height: 18, width: 'auto', maxWidth: width, objectFit: 'contain', display: 'block' }} />
    </span>
  )
}

// ── Plain logo — no box, just the image inline ────────────────────────────────
function LogoImg({ src, alt, height = 18, width }: { src: string; alt: string; height?: number; width?: number }) {
  return (
    <img src={src} alt={alt} style={{ height, width: 'auto', maxWidth: width, objectFit: 'contain', display: 'inline', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px' }} />
  )
}

// ── Wax seal badge ────────────────────────────────────────────────────────────
function WaxSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(135deg, #D4C5E8, #C0B0D8)', boxShadow: '0 2px 8px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.4)', position: 'relative', flexShrink: 0 }}
    >
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.45)' }} />
      <span style={{ fontFamily: sfPro, fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em', zIndex: 1 }}>AL</span>
    </motion.div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', minHeight: '100vh', background: '#F5F5F3', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}
    >
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

      {/* Soft pastel blob — top right */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,190,255,0.28) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      {/* Soft blob — bottom left */}
      <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,220,255,0.22) 0%, transparent 65%)', filter: 'blur(56px)', pointerEvents: 'none' }} />

      {/* ── Two-column layout ── */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1280, margin: '0 auto', padding: '140px 64px 80px', gap: 48, flexDirection: 'row-reverse' }}>

        {/* ── RIGHT (visually): Bio ── */}
        <div style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Name + seal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: sfPro, fontWeight: 600, fontSize: 'clamp(2.6rem, 4vw, 4rem)', color: '#111', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}
            >
              Audrey Leo
            </motion.h1>
            <WaxSeal />
          </div>

          {/* Bio paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: sfPro, fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)', color: '#1a1a1a', lineHeight: 1.65, fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            Audrey is a{' '}
            <span style={{ fontWeight: 500, color: '#111' }}>designer</span>,{' '}
            <span style={{ fontWeight: 500, color: '#111' }}>marketing strategist</span>,{' '}
            <span style={{ fontWeight: 500, color: '#111' }}>creator</span> and{' '}
            <span style={{ fontWeight: 500, color: '#111' }}>builder</span>, making complex ideas feel human.
          </motion.div>

          {/* Company lines */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {/* Currently */}
            <div style={{ fontFamily: sfPro, fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: '#555', lineHeight: 2, fontWeight: 300, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
              <span>Art &amp; Tech @</span>
              <BrandChip src="/UCL.png" alt="UCL" width={52} bg="#f0f0f0" />
              <span style={{ margin: '0 6px', color: '#ccc' }}>·</span>
              <span>Sales @</span>
              <BrandChip src="/maje2.png" alt="Maje" width={58} bg="#f5f5f5" />
            </div>

            {/* Previously */}
            <div style={{ fontFamily: sfPro, fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: '#555', lineHeight: 2, fontWeight: 300, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
              <span>Prev.</span>
              <LogoImg src="/lfw.png" alt="London Fashion Week" height={52} width={160} />
              <span style={{ color: '#ccc' }}>&</span>
              <LogoImg src="/Lawson.png" alt="Lawson Station" height={58} width={150} />
              <span style={{ color: '#ccc' }}>&</span>
              <LogoImg src="/idn.png" alt="IDN Media" height={44} width={100} />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 8 }}
          >
            <motion.a
              href="#works"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: sfPro, fontSize: '0.85rem', fontWeight: 500, color: '#fff', textDecoration: 'none', background: '#111', borderRadius: 40, padding: '12px 28px', display: 'inline-block', letterSpacing: '0.01em' }}
            >
              See my work →
            </motion.a>
            <motion.a
              href="/garden"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: sfPro, fontSize: '0.85rem', fontWeight: 400, color: '#888', textDecoration: 'none', borderBottom: '1px solid #ddd', paddingBottom: 2 }}
            >
              ✦ The Garden
            </motion.a>
          </motion.div>

        </div>

        {/* ── LEFT: 3D model ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: '0 0 52%', height: 580, minHeight: 580, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
        >
          <SleepingModel />
        </motion.div>

      </div>
    </section>
  )
}
