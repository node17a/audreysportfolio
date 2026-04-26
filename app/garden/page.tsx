'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

// ── Category colour system ────────────────────────────────────────────────────
type Category = 'painting' | 'sculpture' | 'graphics' | 'photography' | 'code' | 'film'

const CAT: Record<Category, { core: string; light: string; label: string }> = {
  painting:    { core: '#E882A8', light: '#F9C8DC', label: 'Paintings'       },
  sculpture:   { core: '#7AAEE8', light: '#BDD4F8', label: 'Sculptures'      },
  graphics:    { core: '#E8C060', light: '#F8E8A8', label: 'Graphics'         },
  photography: { core: '#A888D8', light: '#D8C4F5', label: 'Photography'     },
  code:        { core: '#78C8A0', light: '#BCECCE', label: 'Creative Code'   },
  film:        { core: '#E8A078', light: '#F8D0B4', label: 'Film / Video'    },
}

const CURSOR_LABEL: Record<Category, string> = {
  painting:    'PAINTED!',
  sculpture:   'SCULPTED!',
  graphics:    'DESIGNED!',
  photography: 'CAPTURED!',
  code:        'CODED!',
  film:        'FILMED!',
}

// ── Flower data ───────────────────────────────────────────────────────────────
type FlowerData = {
  id: number
  category: Category
  top: number; left: number
  scale: number; rotate: number
  floatDur: number
  bloomed: boolean
  title: string; medium: string; year: string; description: string
  image: string | null
}

const flowers: FlowerData[] = [
  { id:1,  category:'sculpture',   top:28, left:15, scale:0.72, rotate:12,  floatDur:3.8, bloomed:false,
    title:'Arduino Sculpture',     medium:'Arduino + Steel',     year:'2025',
    description:'A kinetic sculpture exploring proximity and memory through hardware.',               image:null },
  { id:2,  category:'painting',    top:50, left:16, scale:1.05, rotate:-8,  floatDur:4.2, bloomed:true,
    title:'Acrylic Studies',       medium:'Acrylic on canvas',   year:'2024',
    description:'Loose expressive studies done in one sitting. Colour as feeling, not representation.', image:null },
  { id:3,  category:'painting',    top:22, left:32, scale:1.0,  rotate:5,   floatDur:3.5, bloomed:true,
    title:'Ink Studies',           medium:'Ink on paper',        year:'2024',
    description:'Gestural ink drawings made without lifting the pen. Each piece is one continuous line.', image:null },
  { id:4,  category:'graphics',    top:68, left:22, scale:0.95, rotate:-5,  floatDur:4.6, bloomed:true,
    title:'Digital Illustrations', medium:'Procreate',           year:'2024',
    description:'Character and environment illustrations. Flat shapes, bold palettes.',               image:null },
  { id:5,  category:'photography', top:32, left:48, scale:0.62, rotate:20,  floatDur:3.2, bloomed:false,
    title:'Photography Series',    medium:'35mm Film',           year:'2025',
    description:'Street photography on expired film. Still scanning.',                                image:null },
  { id:6,  category:'painting',    top:54, left:42, scale:1.12, rotate:-12, floatDur:5.0, bloomed:true,
    title:'Watercolour Series',    medium:'Watercolour',         year:'2024',
    description:'Loose watercolour studies of plants, windows, and light.',                          image:null },
  { id:7,  category:'sculpture',   top:76, left:38, scale:0.58, rotate:8,   floatDur:3.9, bloomed:false,
    title:'Ceramics',              medium:'Ceramics',            year:'2025',
    description:'First time throwing on a wheel. Still in progress.',                                image:null },
  { id:8,  category:'graphics',    top:24, left:64, scale:1.0,  rotate:6,   floatDur:4.4, bloomed:true,
    title:'Batik Patterns',        medium:'Illustration',        year:'2023',
    description:'Traditional Indonesian batik selected from 800+ submissions — now the ACS Jakarta uniform.', image:null },
  { id:9,  category:'painting',    top:50, left:68, scale:0.88, rotate:-10, floatDur:4.8, bloomed:true,
    title:'Mixed Media',           medium:'Mixed media',         year:'2024',
    description:'Collage, paint, and found material. About memory and layering.',                    image:null },
  { id:10, category:'graphics',    top:74, left:58, scale:1.05, rotate:14,  floatDur:3.6, bloomed:true,
    title:'Graphic Prints',        medium:'Digital print',       year:'2024',
    description:'Posters and editorial illustrations. Retro palette, flat shapes.',                  image:null },
  { id:11, category:'film',        top:40, left:78, scale:0.65, rotate:-6,  floatDur:4.1, bloomed:false,
    title:'Video Work',            medium:'Video',               year:'2025',
    description:'Short films and loops. Still shooting.',                                            image:null },
  { id:12, category:'code',        top:66, left:76, scale:0.92, rotate:10,  floatDur:4.3, bloomed:true,
    title:'p5.js Sketches',        medium:'Creative code',       year:'2024',
    description:'Generative sketches in p5.js — noise fields, particle systems, colour studies.',    image:null },
]

// ── Pinwheel flower SVG (bloom) ───────────────────────────────────────────────
function PinwheelFlower({ id, core, light }: { id: number; core: string; light: string }) {
  const gid = `pfg${id}`
  const petals = 14
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white"  stopOpacity="0.95" />
          <stop offset="28%"  stopColor={light}  stopOpacity="0.90" />
          <stop offset="68%"  stopColor={core}   stopOpacity="0.82" />
          <stop offset="100%" stopColor={core}   stopOpacity="0.45" />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50" cy="20"
          rx="11" ry="27"
          fill={`url(#${gid})`}
          opacity="0.75"
          transform={`rotate(${i * (360 / petals)} 50 50)`}
        />
      ))}
      {/* Bright centre */}
      <circle cx="50" cy="50" r="11" fill="white" opacity="0.65" />
      <circle cx="50" cy="50" r="6"  fill={light}  opacity="0.9"  />
      <circle cx="48" cy="48" r="2.5" fill="white" opacity="0.6"  />
    </svg>
  )
}

// ── Bud flower SVG (WIP) ──────────────────────────────────────────────────────
function BudFlower({ id, core, light }: { id: number; core: string; light: string }) {
  const gid = `bfg${id}`
  const petals = 8
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.9"  />
          <stop offset="35%"  stopColor={light} stopOpacity="0.85" />
          <stop offset="100%" stopColor={core}  stopOpacity="0.55" />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="30" cy="14"
          rx="7" ry="17"
          fill={`url(#${gid})`}
          opacity="0.7"
          transform={`rotate(${i * (360 / petals)} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="8"  fill="white" opacity="0.55" />
      <circle cx="30" cy="30" r="4"  fill={light}  opacity="0.85" />
      <circle cx="29" cy="29" r="1.5" fill="white" opacity="0.5"  />
    </svg>
  )
}

// ── Noise overlay ─────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 3,
      opacity: 0.5, mixBlendMode: 'soft-light',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '220px 220px',
    }} />
  )
}

// ── Individual flower item ────────────────────────────────────────────────────
function FlowerItem({ flower, onSelect, onFirstHover, onHoverStart, onHoverEnd }: {
  flower: FlowerData
  onSelect: (f: FlowerData) => void
  onFirstHover: () => void
  onHoverStart: (label: string, color: string) => void
  onHoverEnd: () => void
}) {
  const [hovering, setHovering] = useState(false)
  const { core, light } = CAT[flower.category]

  return (
    <div style={{
      position: 'absolute',
      top: `${flower.top}%`, left: `${flower.left}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
    }}>
      {/* Bud tooltip */}
      <AnimatePresence>
        {!flower.bloomed && hovering && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.14 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(30,20,40,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
              fontFamily: sfPro, fontSize: '0.56rem',
              letterSpacing: '0.08em', padding: '5px 13px',
              borderRadius: 20, whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            still growing... 🌱
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: flower.floatDur, repeat: Infinity, ease: 'easeInOut', delay: flower.id * 0.3 }}
      >
        {/* Ambient glow behind bloomed flowers */}
        {flower.bloomed && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(-50%, -50%) scale(${hovering ? 1.7 : 1.1})`,
            width: '120%', height: '120%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${core}55 0%, transparent 70%)`,
            filter: 'blur(12px)',
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            opacity: hovering ? 1 : 0.5,
            pointerEvents: 'none', zIndex: -1,
          }} />
        )}

        {/* Flower */}
        <motion.div
          style={{
            transformOrigin: 'center',
            display: 'inline-block',
            cursor: 'none',
            rotate: flower.rotate,
          }}
          animate={{ scale: hovering && flower.bloomed ? flower.scale * 1.14 : flower.scale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={() => {
            setHovering(true)
            onFirstHover()
            onHoverStart(
              flower.bloomed ? CURSOR_LABEL[flower.category] : 'GROWING...',
              flower.bloomed ? core : '#9ADBA0'
            )
          }}
          onMouseLeave={() => { setHovering(false); onHoverEnd() }}
          onClick={() => { if (flower.bloomed) onSelect(flower) }}
        >
          {flower.bloomed
            ? <PinwheelFlower id={flower.id} core={core} light={light} />
            : <BudFlower      id={flower.id} core={core} light={light} />}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Full-screen artwork view ──────────────────────────────────────────────────
function ArtworkView({ flower, onClose }: { flower: FlowerData; onClose: () => void }) {
  const { core, light } = CAT[flower.category]
  return (
    <motion.div
      key="artwork"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px',
        background: `
          radial-gradient(ellipse at 25% 30%, ${light}CC 0%, transparent 55%),
          radial-gradient(ellipse at 75% 70%, ${core}55 0%, transparent 50%),
          #FAF8FF
        `,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', opacity: 0.35, mixBlendMode: 'soft-light',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '220px 220px',
      }} />

      <button onClick={onClose} style={{
        position: 'absolute', top: 24, right: 28,
        fontFamily: sfPro, fontSize: '0.7rem', color: '#AAA2BC',
        background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', zIndex: 10,
      }}>✕ close</button>

      <button onClick={onClose} style={{
        position: 'absolute', top: 24, left: 28,
        fontFamily: sfPro, fontSize: '0.7rem', color: '#AAA2BC',
        background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em', zIndex: 10,
      }}>← the garden</button>

      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex', gap: 56, alignItems: 'center',
          width: '100%', maxWidth: 1080, position: 'relative', zIndex: 5,
        }}
      >
        {/* Image */}
        <div style={{
          flex: '0 0 auto',
          width: 'min(60vw, 640px)',
          aspectRatio: '4 / 3',
          borderRadius: 22, overflow: 'hidden',
          background: `linear-gradient(140deg, ${light} 0%, ${core}88 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 24px 80px ${core}66, 0 4px 20px rgba(0,0,0,0.05)`,
        }}>
          {flower.image
            ? <img src={flower.image} alt={flower.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <span style={{ fontFamily: sfPro, fontSize: '0.6rem', color: '#C4BED8', letterSpacing: '0.1em' }}>add image</span>}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          {/* Category dot + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: core }} />
            <p style={{ fontFamily: sfPro, fontSize: '0.56rem', letterSpacing: '0.2em', color: '#B0A8C0', textTransform: 'uppercase', margin: 0 }}>
              {CAT[flower.category].label} · {flower.medium} · {flower.year}
            </p>
          </div>
          <h2 style={{
            fontFamily: sfPro, fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#2A2035', letterSpacing: '-0.03em',
            margin: '0 0 22px', lineHeight: 1.1,
          }}>{flower.title}</h2>
          <p style={{
            fontFamily: sfPro, fontSize: '0.82rem',
            color: '#7A7088', lineHeight: 1.8, margin: 0,
          }}>{flower.description}</p>

          {/* Mini pinwheel as accent */}
          <div style={{ marginTop: 36, opacity: 0.7 }}>
            <PinwheelFlower id={flower.id + 100} core={core} light={light} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


// ── Garden page ───────────────────────────────────────────────────────────────
export default function Garden() {
  const [selected, setSelected] = useState<FlowerData | null>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [cursor, setCursor] = useState<{ label: string; color: string } | null>(null)

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <>
    <Navbar />
    <div style={{
      position: 'relative', width: '100%',
      height: '100vh', overflow: 'hidden',
      background: `
        radial-gradient(ellipse at 10% 18%, rgba(216,208,252,0.8) 0%, transparent 50%),
        radial-gradient(ellipse at 88% 12%, rgba(196,230,255,0.7) 0%, transparent 45%),
        radial-gradient(ellipse at 76% 84%, rgba(196,240,210,0.75) 0%, transparent 50%),
        radial-gradient(ellipse at 16% 88%, rgba(255,216,230,0.7) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(255,252,255,0.9) 0%, transparent 55%),
        #F2EEFF
      `,
    }}>
      <NoiseOverlay />

      {/* About modal */}
      <AnimatePresence>
        {aboutOpen && (
          <>
            {/* Invisible click-away layer — no blur, no dim */}
            <div
              onClick={() => setAboutOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 300 }}
            />
            {/* Flex wrapper handles centering so framer-motion y doesn't fight CSS transform */}
            <div style={{
              position: 'fixed', inset: 0, zIndex: 301,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
            <motion.div
              key="about-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 'min(88vw, 480px)',
                pointerEvents: 'all',
                background: `
                  radial-gradient(ellipse at 20% 20%, rgba(216,208,252,0.6) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 80%, rgba(249,194,216,0.5) 0%, transparent 55%),
                  rgba(250,248,255,0.96)
                `,
                borderRadius: 24,
                padding: '40px 36px 36px',
                boxShadow: '0 32px 80px rgba(100,80,140,0.18), 0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid rgba(200,188,230,0.35)',
                overflow: 'hidden',
              }}
            >
              {/* Noise on card */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                opacity: 0.4, mixBlendMode: 'soft-light',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px', borderRadius: 24,
              }} />

              {/* Close */}
              <button
                onClick={() => setAboutOpen(false)}
                style={{
                  position: 'absolute', top: 16, right: 20,
                  fontFamily: sfPro, fontSize: '0.66rem', color: '#C0B4D8',
                  background: 'none', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.04em', zIndex: 10,
                }}
              >✕</button>

              {/* Label */}
              <p style={{
                fontFamily: sfPro, fontSize: '0.52rem',
                letterSpacing: '0.22em', color: '#C4B4DC',
                textTransform: 'uppercase', margin: '0 0 14px',
                position: 'relative', zIndex: 5,
              }}>
                a note from the gardener
              </p>

              {/* Heading */}
              <h2 style={{
                fontFamily: sfPro, fontWeight: 300,
                fontSize: '1.5rem', color: '#3A2E52',
                letterSpacing: '-0.025em', lineHeight: 1.2,
                margin: '0 0 20px', position: 'relative', zIndex: 5,
              }}>
                I have always been a little obsessed with flowers.
              </h2>

              {/* Body */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <p style={{
                  fontFamily: sfPro, fontSize: '0.8rem',
                  color: '#7A7090', lineHeight: 1.82,
                  margin: '0 0 14px', fontWeight: 400,
                }}>
                  The way they bloom without asking. The way each one opens at its own pace, in its own colour, without apology. There is something deeply generous about a flower — it gives its whole self just by existing.
                </p>
                <p style={{
                  fontFamily: sfPro, fontSize: '0.8rem',
                  color: '#7A7090', lineHeight: 1.82,
                  margin: '0 0 14px', fontWeight: 400,
                }}>
                  Over time, that obsession quietly became a metaphor. Every piece of work I make — a painting, a sculpture, a sketch in code — feels like something trying to bloom. Some are already open. Others are still buds, still figuring out what they want to be.
                </p>
                <p style={{
                  fontFamily: sfPro, fontSize: '0.8rem',
                  color: '#9A88B8', lineHeight: 1.82,
                  margin: 0, fontStyle: 'italic',
                }}>
                  This is not a portfolio. It is a garden of design stories — and you are very welcome to wander. ✦
                </p>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Title + about link — top center */}
      <div style={{
        position: 'absolute', top: '7%', left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 20,
        whiteSpace: 'nowrap',
      }}>
        <p style={{ fontFamily: sfPro, fontSize: '0.54rem', letterSpacing: '0.24em', color: '#C4B8DC', textTransform: 'uppercase', margin: 0 }}>
          a garden of stories
        </p>
        <h1 style={{
          fontFamily: sfPro, fontWeight: 300,
          fontSize: 'clamp(2rem, 4vw, 3.4rem)',
          color: '#3A2E52', letterSpacing: '-0.03em',
          margin: '6px 0 0', lineHeight: 1,
        }}>The Garden</h1>
        <button
          onClick={() => setAboutOpen(true)}
          style={{
            marginTop: 10,
            fontFamily: sfPro, fontSize: '0.6rem', color: '#7A62A8',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.1em',
            textDecoration: 'underline',
            textUnderlineOffset: 4,
            textDecorationColor: 'rgba(140,110,200,0.4)',
            display: 'block', width: '100%',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4A3478' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#7A62A8' }}
        >
          about this garden ✦
        </button>
      </div>

      {/* Hover hint */}
      <AnimatePresence>
        {hintVisible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0.35] }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 2.5, times: [0, 0.3, 0.8, 1], repeat: Infinity }}
            style={{
              position: 'absolute', bottom: 32, left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: sfPro, fontSize: '0.62rem',
              color: '#B0A4C8', letterSpacing: '0.14em',
              margin: 0, zIndex: 20, pointerEvents: 'none', whiteSpace: 'nowrap',
            }}
          >
            hover over a flower ✦
          </motion.p>
        )}
      </AnimatePresence>

      {/* Category legend */}
      <div style={{
        position: 'absolute', bottom: 28, right: 28,
        zIndex: 20, display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        {(Object.entries(CAT) as [Category, typeof CAT[Category]][]).map(([, val]) => (
          <div key={val.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: val.core, opacity: 0.8 }} />
            <span style={{ fontFamily: sfPro, fontSize: '0.56rem', color: '#B0A4C8', letterSpacing: '0.08em' }}>
              {val.label}
            </span>
          </div>
        ))}
      </div>

      {/* Flowers */}
      {flowers.map(flower => (
        <FlowerItem
          key={flower.id}
          flower={flower}
          onSelect={setSelected}
          onFirstHover={() => setHintVisible(false)}
          onHoverStart={(label, color) => setCursor({ label, color })}
          onHoverEnd={() => setCursor(null)}
        />
      ))}

      {/* Custom cursor label */}
      <AnimatePresence>
        {cursor && (
          <motion.div
            key="cursor-label"
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: mouse.x + 16,
              top: mouse.y - 12,
              pointerEvents: 'none',
              zIndex: 9999,
              fontFamily: sfPro,
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: cursor.color,
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: 6,
              whiteSpace: 'nowrap',
              boxShadow: `0 2px 16px ${cursor.color}44`,
              userSelect: 'none',
            }}
          >
            {cursor.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artwork overlay */}
      <AnimatePresence>
        {selected && (
          <ArtworkView key={selected.id} flower={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
    </>
  )
}
