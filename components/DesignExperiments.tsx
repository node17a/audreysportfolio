'use client'
import { motion } from 'framer-motion'
import { sfPro, mono } from '@/lib/fonts'

const F = (id: string) => `https://framerusercontent.com/images/${id}`

const HEIGHT = 400

const cards: {
  type: 'image' | 'video'
  src: string
  fit?: 'cover' | 'contain'
  bg?: string
  caption: string
}[] = [
  {
    type: 'video',
    src: '/sleeping-render.mp4',
    bg: '#1a1520',
    caption: '4D self-portrait — Blender render',
  },
  {
    type: 'image',
    src: F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),
    fit: 'cover',
    caption: 'ACS Jakarta Batik — Final uniform pattern, selected from 800+ submissions',
  },
  {
    type: 'video',
    src: '/FLOWERBLOOM.mov',
    bg: '#0d0d0d',
    caption: 'Flower based visuals with movement - coded on p5.js',
  },
]

export default function DesignExperiments() {
  return (
    <section style={{ background: '#F5F5F3', paddingBottom: 120 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
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

        {/* Grid */}
        <div style={{ display: 'flex', gap: 20 }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              style={{ flex: 1 }}
            >
              {/* Media */}
              <div style={{
                width: '100%',
                height: HEIGHT,
                borderRadius: 16,
                overflow: 'hidden',
                background: card.bg ?? '#E8E4DE',
              }}>
                {card.type === 'video' ? (
                  <video
                    src={card.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <img
                    src={card.src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: card.fit ?? 'cover',
                      display: 'block',
                    }}
                  />
                )}
              </div>

              {/* Caption */}
              <p style={{
                fontFamily: sfPro,
                fontSize: '0.85rem',
                color: '#555',
                letterSpacing: '-0.01em',
                margin: '12px 2px 0',
                lineHeight: 1.4,
                fontWeight: 300,
              }}>
                {card.caption}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
