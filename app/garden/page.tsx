'use client'
import { useRef, useEffect, useState } from 'react'
import { sfPro, mono } from '@/lib/fonts'

const F = (id: string) => `https://framerusercontent.com/images/${id}`

// ─── Types ─────────────────────────────────────────────────────────────────

type Card = {
  id: string
  x: number; y: number; rot: number; width: number
  label: string; sublabel?: string
  image?: string; video?: string
  href?: string; bg: string; portrait?: boolean
}

// ─── Card Data ──────────────────────────────────────────────────────────────

const CARDS: Card[] = [
  { id: 'impermanence', x: 180,  y: 160,  rot: -4,   width: 280, label: 'Impermanence',           sublabel: 'Creative Computing',           image: F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),  href: '/works/impermanence',         bg: '#D8DDD8' },
  { id: 'membox',       x: 720,  y: 80,   rot: 3.5,  width: 260, label: 'Memory Distortion Box',  sublabel: 'Installation · Sound Art',     image: '/memory-distortion-box-cover.png',  href: '/works/memory-distortion-box', bg: '#1a1a2e' },
  { id: 'plasticpanic', x: 1280, y: 200,  rot: -6,   width: 290, label: 'Plastic Panic',          sublabel: 'Game Design · Pixel Art',      image: F('v6vBj0wRDyoQcOvYUg0KCOKBwSg.jpg'), href: '/works/plastic-panic',        bg: '#134E5E' },
  { id: 'purifier',     x: 1880, y: 120,  rot: 5,    width: 265, label: 'Redesigned Air Purifier',sublabel: 'Product Design · Fabrication', image: '/cr-purifier-render-nobg.png',       href: '/works/cr-purifier',          bg: '#D6D0C8' },
  { id: 'batik',        x: 2420, y: 210,  rot: -3,   width: 285, label: 'ACS Jakarta Batik',      sublabel: 'Textiles',                     image: F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),  bg: '#F5EDE0' },
  { id: 'sleeping',     x: 110,  y: 730,  rot: 6,    width: 260, label: '4D Self-Portrait',       sublabel: 'Blender · 3D',                 video: '/sleeping-render.mp4',              bg: '#1a1520' },
  { id: 'flowerbloom',  x: 660,  y: 820,  rot: -5,   width: 270, label: 'Flower Bloom',           sublabel: 'p5.js · Generative Art',       video: '/FLOWERBLOOM.mov',                  bg: '#0d0d0d' },
  { id: 'photo',        x: 1210, y: 750,  rot: 2,    width: 230, label: 'Portrait',               sublabel: '2024',                         image: '/AUDREYPHOTO.jpg',                  bg: '#E8E2D9', portrait: true },
  { id: 'gallery',      x: 1750, y: 840,  rot: -7,   width: 280, label: 'Gallery Setup',          sublabel: 'UCL Slade · 2024',             image: F('TMyHiq1SiK9esypoj7AADxXGQWc.jpg'), bg: '#DDD9D5' },
  { id: 'sprites',      x: 2340, y: 780,  rot: 4,    width: 255, label: 'Sprite Sheet',           sublabel: 'Procreate · Pixel Art',        image: F('jEDXcktxbk4MdNruBhFeZou94c.jpg'),  bg: '#EEF0F2' },
  { id: 'purifierfront',x: 300,  y: 1400, rot: -2,   width: 265, label: 'Purifier Prototype',     sublabel: 'Fabrication',                  image: '/FRONT PURIFIER.jpg',               bg: '#EAE6E0' },
  { id: 'circuit',      x: 950,  y: 1480, rot: 7.5,  width: 280, label: 'Circuit Schematic',      sublabel: 'Tinkercad · Electronics',      image: '/tinkercad-schematic.png',          bg: '#F0F4F8' },
]

// ─── Flower Data ────────────────────────────────────────────────────────────

type FlowerDef = { x: number; y: number; type: 'tulip' | 'daisy' | 'petal' | 'wild'; color: string; scale: number; rot: number }

const FLOWERS: FlowerDef[] = [
  { x: 130,  y: 100,  type: 'tulip', color: '#F4B8C8', scale: 0.90, rot: -12 },
  { x: 490,  y: 60,   type: 'daisy', color: '#F5EED9', scale: 1.00, rot: 5   },
  { x: 590,  y: 155,  type: 'petal', color: '#D4B8F4', scale: 1.10, rot: 25  },
  { x: 650,  y: 55,   type: 'wild',  color: '#F4D4B8', scale: 0.85, rot: -8  },
  { x: 1085, y: 80,   type: 'tulip', color: '#B8D4F4', scale: 1.00, rot: 10  },
  { x: 1160, y: 170,  type: 'daisy', color: '#F4B8C8', scale: 0.90, rot: -5  },
  { x: 1645, y: 95,   type: 'petal', color: '#F5EED9', scale: 1.20, rot: 15  },
  { x: 1710, y: 58,   type: 'tulip', color: '#C8E8B8', scale: 0.95, rot: -20 },
  { x: 2185, y: 138,  type: 'wild',  color: '#D4B8F4', scale: 0.80, rot: 8   },
  { x: 2310, y: 78,   type: 'daisy', color: '#F4B8C8', scale: 1.00, rot: -12 },
  { x: 95,   y: 545,  type: 'wild',  color: '#F4D4B8', scale: 0.90, rot: 6   },
  { x: 460,  y: 600,  type: 'tulip', color: '#F4B8C8', scale: 1.00, rot: -15 },
  { x: 555,  y: 660,  type: 'petal', color: '#D4B8F4', scale: 1.10, rot: 30  },
  { x: 1065, y: 520,  type: 'daisy', color: '#F5EED9', scale: 0.85, rot: -8  },
  { x: 1165, y: 640,  type: 'tulip', color: '#B8D4F4', scale: 0.90, rot: 12  },
  { x: 1640, y: 560,  type: 'wild',  color: '#F4B8C8', scale: 1.00, rot: -5  },
  { x: 2110, y: 615,  type: 'petal', color: '#F4D4B8', scale: 1.20, rot: 20  },
  { x: 2610, y: 500,  type: 'daisy', color: '#D4B8F4', scale: 0.90, rot: -10 },
  { x: 2755, y: 650,  type: 'tulip', color: '#F4B8C8', scale: 0.95, rot: 7   },
  { x: 390,  y: 1205, type: 'petal', color: '#F5EED9', scale: 1.10, rot: -25 },
  { x: 458,  y: 1285, type: 'wild',  color: '#B8D4F4', scale: 0.90, rot: 14  },
  { x: 855,  y: 1165, type: 'tulip', color: '#F4B8C8', scale: 1.00, rot: -6  },
  { x: 1710, y: 1205, type: 'daisy', color: '#D4B8F4', scale: 0.85, rot: 8   },
  { x: 2110, y: 1250, type: 'petal', color: '#F4D4B8', scale: 1.00, rot: -18 },
  { x: 2610, y: 1100, type: 'tulip', color: '#F4B8C8', scale: 0.95, rot: 3   },
  { x: 2810, y: 1310, type: 'wild',  color: '#F5EED9', scale: 1.10, rot: -12 },
  { x: 185,  y: 1755, type: 'daisy', color: '#F4B8C8', scale: 0.90, rot: 20  },
  { x: 710,  y: 1800, type: 'tulip', color: '#D4B8F4', scale: 1.00, rot: -8  },
  { x: 1400, y: 1705, type: 'wild',  color: '#F4D4B8', scale: 0.85, rot: 5   },
  { x: 2000, y: 1785, type: 'petal', color: '#B8D4F4', scale: 1.20, rot: -30 },
  { x: 2510, y: 1705, type: 'daisy', color: '#F4B8C8', scale: 0.90, rot: 15  },
  { x: 840,  y: 1620, type: 'tulip', color: '#F4D4B8', scale: 0.88, rot: -22 },
  { x: 1500, y: 1320, type: 'wild',  color: '#F4B8C8', scale: 0.95, rot: 18  },
]

// ─── SVG Flowers ────────────────────────────────────────────────────────────

function Tulip({ color, scale, rot }: { color: string; scale: number; rot: number }) {
  return (
    <svg width={40 * scale} height={60 * scale} viewBox="0 0 40 60" fill="none" style={{ transform: `rotate(${rot}deg)`, display: 'block' }}>
      <line x1="20" y1="36" x2="20" y2="58" stroke="#6a8c55" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 48 Q12 44 10 38" stroke="#6a8c55" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <ellipse cx="20" cy="22" rx="7" ry="14" fill={color} opacity="0.88" />
      <ellipse cx="12" cy="26" rx="5.5" ry="11" fill={color} opacity="0.72" transform="rotate(-18 12 26)" />
      <ellipse cx="28" cy="26" rx="5.5" ry="11" fill={color} opacity="0.72" transform="rotate(18 28 26)" />
    </svg>
  )
}

function Daisy({ color, scale, rot }: { color: string; scale: number; rot: number }) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg width={36 * scale} height={52 * scale} viewBox="0 0 36 52" fill="none" style={{ transform: `rotate(${rot}deg)`, display: 'block' }}>
      <line x1="18" y1="30" x2="18" y2="50" stroke="#6a8c55" strokeWidth="1.5" strokeLinecap="round" />
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180
        const px = 18 + Math.cos(rad) * 9
        const py = 18 + Math.sin(rad) * 9
        return <ellipse key={i} cx={px} cy={py} rx="3.5" ry="6.5" fill={color} opacity="0.82" transform={`rotate(${a} ${px} ${py})`} />
      })}
      <circle cx="18" cy="18" r="5" fill="#F5D06A" />
      <circle cx="18" cy="18" r="2.5" fill="#E8C058" />
    </svg>
  )
}

function Petal({ color, scale, rot }: { color: string; scale: number; rot: number }) {
  return (
    <svg width={22 * scale} height={30 * scale} viewBox="0 0 22 30" fill="none" style={{ transform: `rotate(${rot}deg)`, display: 'block' }}>
      <ellipse cx="11" cy="15" rx="8" ry="13" fill={color} opacity="0.68" transform="rotate(-10 11 15)" />
    </svg>
  )
}

function Wildflower({ color, scale, rot }: { color: string; scale: number; rot: number }) {
  return (
    <svg width={32 * scale} height={50 * scale} viewBox="0 0 32 50" fill="none" style={{ transform: `rotate(${rot}deg)`, display: 'block' }}>
      <line x1="16" y1="22" x2="16" y2="48" stroke="#6a8c55" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="16" y1="30" x2="7"  y2="24" stroke="#6a8c55" strokeWidth="1.0" strokeLinecap="round" />
      <line x1="16" y1="36" x2="25" y2="28" stroke="#6a8c55" strokeWidth="1.0" strokeLinecap="round" />
      <circle cx="16" cy="17" r="4.5" fill={color} opacity="0.88" />
      <circle cx="7"  cy="21" r="3"   fill={color} opacity="0.78" />
      <circle cx="25" cy="25" r="3"   fill={color} opacity="0.78" />
      <circle cx="16" cy="17" r="1.8" fill="#F5D06A" />
      <circle cx="7"  cy="21" r="1.2" fill="#F5D06A" />
      <circle cx="25" cy="25" r="1.2" fill="#F5D06A" />
    </svg>
  )
}

function FlowerEl({ def }: { def: FlowerDef }) {
  const el =
    def.type === 'tulip' ? <Tulip color={def.color} scale={def.scale} rot={def.rot} /> :
    def.type === 'daisy' ? <Daisy color={def.color} scale={def.scale} rot={def.rot} /> :
    def.type === 'petal' ? <Petal color={def.color} scale={def.scale} rot={def.rot} /> :
    <Wildflower color={def.color} scale={def.scale} rot={def.rot} />
  return (
    <div style={{ position: 'absolute', left: def.x, top: def.y, pointerEvents: 'none', userSelect: 'none' }}>
      {el}
    </div>
  )
}

// ─── Poster Card ────────────────────────────────────────────────────────────

function PosterCard({ card, preventClick, onOpen }: {
  card: Card
  preventClick: React.MutableRefObject<boolean>
  onOpen: (c: Card) => void
}) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    const play = () => v.play().catch(() => {})
    play()
    v.addEventListener('canplay', play, { once: true })
    return () => v.removeEventListener('canplay', play)
  }, [])

  const isPng = typeof card.image === 'string' && card.image.endsWith('.png')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (preventClick.current) return
        onOpen(card)
      }}
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        width: card.width,
        transform: `rotate(${card.rot}deg) translateY(${hovered ? -8 : 0}px)`,
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        background: '#FEFEFE',
        borderRadius: 12,
        padding: 10,
        boxShadow: hovered
          ? '0 22px 55px rgba(0,0,0,0.24), 0 4px 14px rgba(0,0,0,0.10)'
          : '0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: card.portrait ? '3/4' : '4/3',
        borderRadius: 8,
        overflow: 'hidden',
        background: card.bg,
        marginBottom: 8,
        position: 'relative',
      }}>
        {card.video ? (
          <video
            ref={videoRef}
            src={card.video}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : card.image ? (
          <img
            src={card.image}
            alt={card.label}
            draggable={false}
            style={{
              width: '100%', height: '100%', display: 'block',
              objectFit: isPng ? 'contain' : 'cover',
              transform: isPng ? 'scale(1.3)' : 'none',
              userSelect: 'none',
            }}
          />
        ) : null}
      </div>

      <p style={{ fontFamily: sfPro, fontSize: '0.75rem', fontWeight: 500, color: '#111', margin: '0 2px 2px', letterSpacing: '-0.01em', lineHeight: 1.3, userSelect: 'none' }}>
        {card.label}
      </p>
      {card.sublabel && (
        <p style={{ fontFamily: mono, fontSize: '0.52rem', color: '#aaa', margin: '0 2px', letterSpacing: '0.04em', textTransform: 'uppercase', userSelect: 'none' }}>
          {card.sublabel}
        </p>
      )}
    </div>
  )
}

// ─── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({ card, onClose }: { card: Card; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    v.play().catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isPng = typeof card.image === 'string' && card.image.endsWith('.png')

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(30,30,24,0.75)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FEFEFE',
          borderRadius: 18,
          padding: 16,
          maxWidth: 520,
          width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,0.32)',
        }}
      >
        <div style={{
          width: '100%',
          aspectRatio: card.portrait ? '3/4' : '4/3',
          borderRadius: 10,
          overflow: 'hidden',
          background: card.bg,
          marginBottom: 14,
        }}>
          {card.video ? (
            <video
              ref={videoRef}
              src={card.video}
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : card.image ? (
            <img
              src={card.image}
              alt={card.label}
              style={{
                width: '100%', height: '100%', display: 'block',
                objectFit: isPng ? 'contain' : 'cover',
                transform: isPng ? 'scale(1.3)' : 'none',
              }}
            />
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: sfPro, fontSize: '1rem', fontWeight: 500, color: '#111', margin: '0 0 3px', letterSpacing: '-0.01em' }}>
              {card.label}
            </h2>
            {card.sublabel && (
              <p style={{ fontFamily: mono, fontSize: '0.55rem', color: '#aaa', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {card.sublabel}
              </p>
            )}
          </div>
          {card.href && (
            <a
              href={card.href}
              style={{
                fontFamily: sfPro, fontSize: '0.7rem', color: '#444',
                textDecoration: 'none',
                background: '#F0EFed',
                border: '1px solid #E4E2DF',
                borderRadius: 20,
                padding: '6px 14px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              View case study →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

const WORLD = 3000
const INIT = { x: -180, y: -80 }

export default function GardenPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const worldRef     = useRef<HTMLDivElement>(null)
  const offsetRef    = useRef({ ...INIT })
  const velRef       = useRef({ x: 0, y: 0 })
  const dragRef      = useRef({ active: false, lastX: 0, lastY: 0, dist: 0 })
  const preventClick = useRef(false)
  const rafRef       = useRef<number | null>(null)
  const [lightbox, setLightbox] = useState<Card | null>(null)

  const setTransform = (x: number, y: number) => {
    if (worldRef.current) worldRef.current.style.transform = `translate(${x}px,${y}px)`
  }

  useEffect(() => {
    setTransform(INIT.x, INIT.y)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const tick = () => {
    const v = velRef.current
    v.x *= 0.92
    v.y *= 0.92
    offsetRef.current.x += v.x
    offsetRef.current.y += v.y
    setTransform(offsetRef.current.x, offsetRef.current.y)
    if (Math.abs(v.x) > 0.15 || Math.abs(v.y) > 0.15) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      rafRef.current = null
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    velRef.current = { x: 0, y: 0 }
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY, dist: 0 }
    preventClick.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d.active) return
    const dx = e.clientX - d.lastX
    const dy = e.clientY - d.lastY
    d.lastX = e.clientX
    d.lastY = e.clientY
    d.dist += Math.hypot(dx, dy)
    if (d.dist > 5) preventClick.current = true
    velRef.current = { x: dx, y: dy }
    offsetRef.current.x += dx
    offsetRef.current.y += dy
    setTransform(offsetRef.current.x, offsetRef.current.y)
  }

  const onPointerUp = () => {
    const d = dragRef.current
    if (!d.active) return
    d.active = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
    const v = velRef.current
    if (Math.abs(v.x) > 0.5 || Math.abs(v.y) > 0.5) rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <>
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: 'fixed', inset: 0,
          overflow: 'hidden',
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
          background: '#8da672',
          backgroundImage: [
            'radial-gradient(ellipse at 22% 28%, rgba(120,162,90,0.28) 0%, transparent 55%)',
            'radial-gradient(ellipse at 78% 72%, rgba(98,138,72,0.22) 0%, transparent 48%)',
            'repeating-linear-gradient(88deg, transparent, transparent 22px, rgba(255,255,255,0.022) 22px, rgba(255,255,255,0.022) 23px)',
            'repeating-linear-gradient(2deg, transparent, transparent 22px, rgba(0,0,0,0.028) 22px, rgba(0,0,0,0.028) 23px)',
          ].join(', '),
        }}
      >
        <div ref={worldRef} style={{ position: 'absolute', width: WORLD, height: WORLD, willChange: 'transform' }}>
          {FLOWERS.map((f, i) => <FlowerEl key={i} def={f} />)}
          {CARDS.map(card => (
            <PosterCard key={card.id} card={card} preventClick={preventClick} onOpen={setLightbox} />
          ))}
        </div>

        {/* Hint */}
        <p style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          fontFamily: mono, fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          drag to explore
        </p>
      </div>

      {lightbox && <Lightbox card={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
