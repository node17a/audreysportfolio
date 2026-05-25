'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfPro, mono } from '@/lib/fonts'

const F = (id: string) => `https://framerusercontent.com/images/${id}`

const CARD_W = 340
const GAP = 20

const cards: {
  type: 'image' | 'video'
  src: string
  bg?: string
  caption: string
  objectPosition?: string
}[] = [
  {
    type: 'video',
    src: '/sleeping-render.mp4',
    bg: '#1a1520',
    caption: '4D self-portrait — Blender render',
  },
  {
    type: 'video',
    src: '/applayout.mov',
    bg: '#0a0a12',
    caption: 'Link — mobile UI walkthrough for a student networking app',
    objectPosition: 'center top',
  },
  {
    type: 'video',
    src: '/cardanim.mp4',
    bg: '#0d0d0d',
    caption: 'Link — 3D digital e-card animation',
  },
  {
    type: 'image',
    src: F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),
    caption: 'ACS Jakarta Batik — Final uniform pattern, selected from 800+ submissions',
  },
  {
    type: 'video',
    src: '/FLOWERBLOOM.mov',
    bg: '#0d0d0d',
    caption: 'Flower bloom — body-tracked interactive generative visuals in p5.js',
  },
]

const N = cards.length
const TRANSLATE = N * (CARD_W + GAP)

function CardMedia({ card, style }: { card: typeof cards[0]; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  if (card.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={card.src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.objectPosition ?? 'center', display: 'block', ...style }}
      />
    )
  }
  return (
    <img
      src={card.src}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.objectPosition ?? 'center', display: 'block', ...style }}
    />
  )
}

export default function DesignExperiments() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ background: '#F5F5F3', paddingBottom: 120, position: 'relative' }}>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TRANSLATE}px); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 36 }}
        >
          <p style={{ fontFamily: mono, fontSize: '0.58rem', color: '#bbb', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px' }}>
            [Design Experiments]
          </p>
          <h2 style={{ fontFamily: sfPro, fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#111', letterSpacing: '-0.025em', lineHeight: 1.15, margin: 0 }}>
            Textiles, 3D, and things made{' '}
            <span style={{ fontWeight: 600 }}>for the love of making.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', paddingLeft: 48 }}>
        <div
          className="marquee-track"
          style={{ display: 'flex', gap: GAP, width: `${2 * N * (CARD_W + GAP)}px` }}
        >
          {[...cards, ...cards].map((card, i) => {
            const cardIndex = i % N
            const isHovered = hovered === cardIndex
            return (
              <div
                key={i}
                style={{ width: CARD_W, flexShrink: 0 }}
                onMouseEnter={() => setHovered(cardIndex)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  width: '100%',
                  height: 380,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: card.bg ?? '#E8E4DE',
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease',
                  transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  filter: hovered !== null && !isHovered ? 'blur(2px) brightness(0.8)' : 'none',
                  cursor: 'pointer',
                }}>
                  <CardMedia card={card} />
                </div>
                <p style={{
                  fontFamily: sfPro,
                  fontSize: '0.82rem',
                  color: hovered !== null && !isHovered ? '#aaa' : '#555',
                  letterSpacing: '-0.01em',
                  margin: '12px 2px 0',
                  lineHeight: 1.4,
                  fontWeight: 300,
                  transition: 'color 0.3s ease',
                }}>
                  {card.caption}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(8,8,8,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '52vw',
                maxWidth: 680,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                background: cards[hovered].bg ?? '#E8E4DE',
                aspectRatio: '4/3',
              }}
            >
              <CardMedia card={cards[hovered]} />
            </motion.div>
            <p style={{
              fontFamily: sfPro,
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {cards[hovered].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
