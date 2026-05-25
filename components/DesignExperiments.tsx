'use client'
import { motion } from 'framer-motion'
import { sfPro, mono } from '@/lib/fonts'
import AutoPlayVideo from '@/components/AutoPlayVideo'

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

export default function DesignExperiments() {
  return (
    <section style={{ background: '#F5F5F3', paddingBottom: 120 }}>

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
          style={{
            display: 'flex',
            gap: GAP,
            width: `${2 * N * (CARD_W + GAP)}px`,
          }}
        >
          {[...cards, ...cards].map((card, i) => (
            <div key={i} style={{ width: CARD_W, flexShrink: 0 }}>
              <div style={{
                width: '100%',
                height: 380,
                borderRadius: 16,
                overflow: 'hidden',
                background: card.bg ?? '#E8E4DE',
              }}>
                {card.type === 'video' ? (
                  <AutoPlayVideo
                    src={card.src}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: card.objectPosition ?? 'center',
                      display: 'block',
                      background: card.bg,
                    }}
                  />
                ) : (
                  <img
                    src={card.src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: card.objectPosition ?? 'center',
                      display: 'block',
                    }}
                  />
                )}
              </div>
              <p style={{
                fontFamily: sfPro,
                fontSize: '0.82rem',
                color: '#555',
                letterSpacing: '-0.01em',
                margin: '12px 2px 0',
                lineHeight: 1.4,
                fontWeight: 300,
              }}>
                {card.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
