'use client'
// Flat scattered-desk hero — real brand stickers, macOS terminal, float animations
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sfPro  = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
const sfMono = '"SF Mono", ui-monospace, "Cascadia Code", "Courier New", monospace'

const ROLES = ['a designer.', 'a technologist.', 'a marketer.', 'a dreamer.', 'a builder.', 'a storyteller.', 'a creative.', 'a maker.']

function CyclingSubtitle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ height: '1.1em', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0,     opacity: 1 }}
          exit={{    y: '-100%', opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-block',
            fontFamily: sfPro,
            fontWeight: 500,
            fontSize: '0.6rem',
            letterSpacing: '0.24em',
            color: '#777',
            textTransform: 'uppercase',
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function Plus({ size = 16, color = '#C4BFB6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="7" y="0" width="2" height="16" fill={color} />
      <rect x="0" y="7" width="16" height="2" fill={color} />
    </svg>
  )
}
function Dot({ size = 6, color = '#C4BFB6' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />
}

// ─── STICKER: London Fashion Week ───────────────────────────────────────────
// DROP YOUR FILE: public/lfw.png
function LFWBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-2" style={{ position: 'absolute', ...style }}>
      <img
        src="/lfw.png"
        alt="London Fashion Week"
        style={{
          width: 100,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}

// ─── STICKER: Anthropic ──────────────────────────────────────────────────────
// DROP YOUR FILE: public/logos/anthropic.png
function AnthropicBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-3" style={{ position: 'absolute', ...style }}>
      <div style={{
        width: 72, height: 72,
        borderRadius: '50%',
        background: '#FDF5F0',
        border: '2.5px solid rgba(255,255,255,0.85)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="/anthropic.svg"
          alt="Anthropic"
          style={{ width: 44, height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ─── STICKER: UCL clover ─────────────────────────────────────────────────────
// DROP YOUR FILE: public/logos/ucl-clover.png
function UCLCloverBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-5" style={{ position: 'absolute', ...style }}>
      <img
        src="/clover.webp"
        alt="UCL"
        style={{
          width: 90,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.18))',
        }}
      />
    </div>
  )
}

// ─── STICKER: Maje ───────────────────────────────────────────────────────────
// DROP YOUR FILE: public/maje2.png
function MajeBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-4" style={{ position: 'absolute', ...style }}>
      <div style={{
        background: '#fff',
        borderRadius: 10,
        padding: '10px 16px',
        filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.14))',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <img
          src="/maje2.png"
          alt="Maje"
          style={{ width: 110, height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ─── STICKER: Sleeping figure ────────────────────────────────────────────────
// DROP YOUR FILE: public/sleeping.png
function SleepingFigure({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-2" style={{ position: 'absolute', ...style }}>
      <img
        src="/sleeping.png"
        alt="Sleeping figure"
        style={{
          width: 120,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}

// ─── STICKER: Flower ─────────────────────────────────────────────────────────
// DROP YOUR FILE: public/flower2.png
function FlowerBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-3" style={{ position: 'absolute', ...style }}>
      <img
        src="/flower2.png"
        alt="Flower"
        style={{
          width: 130,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.14))',
        }}
      />
    </div>
  )
}

// ─── STICKER: Tennis ball ────────────────────────────────────────────────────
function TennisBall({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-1" style={{ position: 'absolute', ...style }}>
      <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#C8E85A', overflow: 'hidden', position: 'relative', border: '2.5px solid rgba(255,255,255,0.7)', boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 54 54">
          <path d="M 7,2 Q 22,27 7,52" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 47,2 Q 32,27 47,52" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

// ─── STICKER: Matcha cup ─────────────────────────────────────────────────────
function MatchaCup({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-3" style={{ position: 'absolute', ...style }}>
      <div style={{ width: 66, height: 74, borderRadius: 14, background: '#D4EBCC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, border: '2.5px solid rgba(255,255,255,0.7)', boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)' }}>
        <svg width="38" height="42" viewBox="0 0 38 42">
          <path d="M 11,9 Q 13,5 11,1" stroke="#7FB86A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 19,9 Q 21,4 19,0" stroke="#7FB86A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 27,9 Q 29,5 27,1" stroke="#7FB86A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 4,11 L 7,39 L 31,39 L 34,11 Z" fill="white" />
          <path d="M 5,15 L 7,39 L 31,39 L 33,15 Z" fill="#7FB86A" opacity="0.35" />
          <ellipse cx="19" cy="15" rx="14" ry="3" fill="#7FB86A" opacity="0.55" />
          <path d="M 32,18 Q 40,24 32,32" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>
        <p style={{ fontFamily: sfMono, fontSize: '0.45rem', color: '#4A8A40', fontWeight: 700, letterSpacing: '0.1em' }}>MATCHA</p>
      </div>
    </div>
  )
}

// ─── STICKER: Film camera ────────────────────────────────────────────────────
function FilmCamera({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-2" style={{ position: 'absolute', ...style }}>
      <div style={{ background: '#2C2C2C', borderRadius: 12, padding: '10px 12px 8px', boxShadow: '0 4px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}>
        <svg width="58" height="40" viewBox="0 0 58 40">
          <rect x="2" y="10" width="54" height="28" rx="5" fill="#3C3C3C" />
          <rect x="16" y="4" width="18" height="9" rx="3" fill="#3C3C3C" />
          <rect x="0" y="16" width="4" height="8" rx="2" fill="#4A4A4A" />
          <rect x="54" y="16" width="4" height="8" rx="2" fill="#4A4A4A" />
          <circle cx="29" cy="24" r="12" fill="#1A1A1A" stroke="#555" strokeWidth="1.5" />
          <circle cx="29" cy="24" r="9" fill="#111" stroke="#444" strokeWidth="1" />
          <circle cx="29" cy="24" r="5.5" fill="#0A0A0A" stroke="#333" strokeWidth="0.8" />
          <circle cx="25" cy="20" r="2" fill="#2A2A2A" />
          <circle cx="24.5" cy="19.5" r="1" fill="#404040" />
          <circle cx="46" cy="12" r="3.5" fill="#C85B3A" />
          <circle cx="46" cy="12" r="2" fill="#E06A48" />
          <circle cx="10" cy="14" r="3" fill="#4A4A4A" stroke="#555" strokeWidth="0.8" />
        </svg>
        <p style={{ fontFamily: sfMono, fontSize: '0.42rem', color: '#666', letterSpacing: '0.12em', textAlign: 'center', marginTop: 4 }}>35mm</p>
      </div>
    </div>
  )
}

// ─── CARD: NIKI — Buzz album (real image) ────────────────────────────────────
// DROP YOUR FILE: public/Buzz.jpg
function NikiBuzz({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-3" style={{ position: 'absolute', ...style }}>
      <img
        src="/Buzz.jpg"
        alt="NIKI – Buzz"
        style={{
          width: 130,
          height: 'auto',
          display: 'block',
          borderRadius: 10,
          boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
        }}
      />
    </div>
  )
}

// ─── CARD: Photo Booth ───────────────────────────────────────────────────────
// DROP YOUR FILE: public/photobooth.gif
function PhotoBoothCard({ style }: { style?: React.CSSProperties }) {
  // Fake thumbnails — same tint as your GIF would look
  return (
    <div className="float float-delay-5" style={{ position: 'absolute', ...style }}>
      <div style={{
        width: 216,
        background: '#181818',
        borderRadius: 11,
        overflow: 'hidden',
        boxShadow: '0 10px 32px rgba(0,0,0,0.38), 0 2px 6px rgba(0,0,0,0.22)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Title bar */}
        <div style={{
          background: 'linear-gradient(180deg, #3A3A3A 0%, #2C2C2C 100%)',
          borderBottom: '1px solid #111',
          padding: '7px 10px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <p style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            fontFamily: sfPro, fontSize: '0.58rem', color: '#999',
            letterSpacing: '0.01em', margin: 0, fontWeight: 500,
          }}>Photo Booth</p>
        </div>

        {/* Main viewfinder */}
        <div style={{
          width: '100%', aspectRatio: '4 / 3',
          background: '#0D0D0D',
          overflow: 'hidden', position: 'relative',
        }}>
          <img
            src="/photobooth.gif"
            alt="Photo Booth"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)', // mirror like real Photo Booth
              display: 'block',
            }}
          />
        </div>

        {/* Bottom strip */}
        <div style={{
          background: '#1E1E1E',
          borderTop: '1px solid #111',
          padding: '7px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          gap: 0,
        }}>
          {/* Red shutter button */}
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #FF6B63, #E5342A)',
            boxShadow: '0 0 0 2px #181818, 0 0 0 3.5px rgba(229,52,42,0.35), inset 0 1px 2px rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M9 3L7.17 5H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-3.17L15 3H9z" fill="white" opacity="0.9"/>
              <circle cx="12" cy="13" r="3.5" fill="white" opacity="0.3"/>
            </svg>
          </div>

          {/* Effects label right */}
          <p style={{
            position: 'absolute', right: 9,
            fontFamily: sfPro, fontSize: '0.5rem',
            color: '#666', margin: 0, letterSpacing: '0.01em',
          }}>Effects</p>
        </div>
      </div>
    </div>
  )
}

// ─── STICKER: UCL logo ───────────────────────────────────────────────────────
// DROP YOUR FILE: public/UCL.png
function UCLLogo({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-1" style={{ position: 'absolute', ...style }}>
      <img
        src="/UCL.png"
        alt="UCL"
        style={{
          width: 110,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}

// ─── CARD: Terminal (white, macOS chrome) ────────────────────────────────────
function WhiteTerminal({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-1" style={{ position: 'absolute', ...style }}>
      <div style={{ width: 288, background: '#FFFFFF', border: '1.5px solid #D8D5CE', borderRadius: 11, overflow: 'hidden', boxShadow: '0 2px 0 rgba(0,0,0,0.06)' }}>
        <div style={{ background: '#F4F2EE', borderBottom: '1px solid #DDD9D2', padding: '9px 14px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <p style={{ fontFamily: sfMono, fontSize: '0.62rem', color: '#999', margin: '0 auto', letterSpacing: '0.02em' }}>audrey-leo — zsh</p>
        </div>
        <div style={{ padding: '14px 18px', fontFamily: sfMono, fontSize: '0.72rem', lineHeight: 1.95, color: '#1a1a1a' }}>
          <p><span style={{ color: '#2DA44E', fontWeight: 600 }}>~ $</span> whoami</p>
          <p style={{ color: '#444' }}>Creative &amp; Technologist @ UCL Slade</p>
          <p style={{ marginTop: 2 }}><span style={{ color: '#2DA44E', fontWeight: 600 }}>~ $</span> ls interests/</p>
          <p style={{ color: '#444' }}>arduino/ p5js/ c++/ illustration/ ux</p>
          <p style={{ marginTop: 2 }}>
            <span style={{ color: '#2DA44E', fontWeight: 600 }}>~ $</span>{' '}
            <span className="cursor-blink" style={{ display: 'inline-block', width: 7, height: 13, background: '#1a1a1a', verticalAlign: 'middle' }} />
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── CARD: Currently ─────────────────────────────────────────────────────────
function CurrentlyCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="float float-delay-4" style={{ position: 'absolute', ...style }}>
      <div style={{ width: 180, background: '#7B9E78', borderRadius: 8, padding: '13px 15px 17px', position: 'relative', boxShadow: '0 2px 0 rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: 7, left: 7, width: 6, height: 6, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
        <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
        <div style={{ fontFamily: sfMono, fontSize: '0.68rem', lineHeight: 1.9, color: '#fff', marginTop: 8 }}>
          <span style={{ opacity: 0.65 }}>currently:</span><br />
          ☕ exploring London&apos;s<br />
          finest bakeries with<br />
          a matcha in hand
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1].map(i => <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.22)' }} />)}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#F5F2EC' }}>

      {/* ── Pastel gradient blobs ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Pink — top right */}
        <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,180,210,0.52) 0%, transparent 68%)', filter: 'blur(55px)' }} />
        {/* Lavender — left center */}
        <div style={{ position: 'absolute', top: '25%', left: '-6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,184,248,0.45) 0%, transparent 68%)', filter: 'blur(55px)' }} />
        {/* Amber — bottom right */}
        <div style={{ position: 'absolute', bottom: '-5%', right: '12%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(252,210,140,0.42) 0%, transparent 68%)', filter: 'blur(50px)' }} />
        {/* Mint — bottom left */}
        <div style={{ position: 'absolute', bottom: '0%', left: '8%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,228,196,0.38) 0%, transparent 68%)', filter: 'blur(50px)' }} />
        {/* Blush peach — top center, behind title */}
        <div style={{ position: 'absolute', top: '20%', left: '35%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(252,210,190,0.30) 0%, transparent 68%)', filter: 'blur(60px)' }} />
        {/* Sky blue — top left */}
        <div style={{ position: 'absolute', top: '-4%', left: '20%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,220,252,0.35) 0%, transparent 68%)', filter: 'blur(48px)' }} />
      </div>

      {/* Grain layer 1 — fine noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        opacity: 0.55, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />
      {/* Grain layer 2 — coarser grain for visible texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        opacity: 0.18, mixBlendMode: 'multiply',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.45' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />

      {/* ✦ Tiny garden echoes */}
      <svg style={{ position: 'absolute', top: '12%', left: '18%', pointerEvents: 'none', zIndex: 2, opacity: 0.3  }} width="12" height="12" viewBox="0 0 20 20" fill="#A888D8"><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z"/></svg>
      <svg style={{ position: 'absolute', top: '70%', right: '16%', pointerEvents: 'none', zIndex: 2, opacity: 0.25 }} width="10" height="10" viewBox="0 0 20 20" fill="#E882A8"><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z"/></svg>
      <svg style={{ position: 'absolute', top: '58%', left: '12%', pointerEvents: 'none', zIndex: 2, opacity: 0.22 }} width="8"  height="8"  viewBox="0 0 20 20" fill="#7AAEE8"><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z"/></svg>
      <svg style={{ position: 'absolute', top: '18%', right: '12%', pointerEvents: 'none', zIndex: 2, opacity: 0.22 }} width="9"  height="9"  viewBox="0 0 20 20" fill="#78C8A0"><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z"/></svg>
      <svg style={{ position: 'absolute', bottom: '22%', left: '44%', pointerEvents: 'none', zIndex: 2, opacity: 0.2  }} width="8"  height="8"  viewBox="0 0 20 20" fill="#E8C060"><path d="M10 0l1.8 8.2L20 10l-8.2 1.8L10 20l-1.8-8.2L0 10l8.2-1.8z"/></svg>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col items-center justify-center h-full" style={{ padding: '6rem 1.5rem 3rem', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant), sans-serif', fontWeight: 400, fontSize: 'clamp(3.5rem,13vw,5.5rem)', color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Audrey Leo
          </h1>
          <div style={{ marginTop: '1rem' }}><CyclingSubtitle /></div>
        </div>
        <WhiteTerminal style={{ position: 'static', transform: 'none' }} />
      </div>

      {/* ── DESKTOP SCATTER ─────────────────────────────────────────────────── */}
      <div className="hidden md:block" style={{ position: 'relative', width: '100%', height: '100%' }}>

        {/* Name + subtitle — center anchor */}
        <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant), sans-serif', fontWeight: 400, fontSize: 'clamp(4.5rem,8vw,8rem)', color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Audrey Leo
          </h1>
          <div style={{ marginTop: '1rem' }}><CyclingSubtitle /></div>
        </div>

        {/* Photo Booth card */}
        <PhotoBoothCard style={{ top: '20%', left: '11%', transform: 'rotate(-3deg)' }} />

        {/* UCL logo */}
        <UCLLogo style={{ top: '14%', left: '30%', transform: 'rotate(-4deg)' }} />

        {/* UCL Clover */}
        <UCLCloverBadge style={{ top: '24%', left: '36%', transform: 'rotate(5deg)' }} />

        {/* London Fashion Week badge */}
        <LFWBadge style={{ top: '42%', left: '22%', transform: 'rotate(-4deg)' }} />

        {/* Tennis ball */}
        <TennisBall style={{ top: '54%', left: '28%', transform: 'rotate(6deg)' }} />

        {/* NIKI Buzz album */}
        <NikiBuzz style={{ top: '60%', left: '22%', transform: 'rotate(-2deg)' }} />

        {/* Maje logo sticker */}
        <MajeBadge style={{ top: '66%', left: '36%', transform: 'rotate(-3deg)' }} />

        {/* Matcha cup */}
        <MatchaCup style={{ top: '60%', left: '44%', transform: 'rotate(5deg)' }} />

        {/* Flower badge — above title, clear of the text */}
        <FlowerBadge style={{ top: '16%', left: '43%', transform: 'rotate(-8deg)' }} />

        {/* Terminal — right, just outside title */}
        <WhiteTerminal style={{ top: '16%', right: '22%', transform: 'rotate(2deg)' }} />

        {/* Sleeping figure */}
        <SleepingFigure style={{ top: '42%', right: '20%', transform: 'rotate(4deg)' }} />

        {/* Anthropic badge */}
        <AnthropicBadge style={{ top: '34%', right: '24%', transform: 'rotate(-6deg)' }} />

        {/* Currently card */}
        <CurrentlyCard style={{ top: '56%', right: '22%', transform: 'rotate(2.5deg)' }} />

        {/* Film camera */}
        <FilmCamera style={{ top: '66%', right: '30%', transform: 'rotate(-3deg)' }} />

        {/* Decorative plus signs */}
        <div style={{ position: 'absolute', top: '32%', left: '28%' }}><Plus /></div>
        <div style={{ position: 'absolute', top: '26%', right: '28%' }}><Plus size={14} /></div>
        <div style={{ position: 'absolute', top: '64%', left: '48%' }}><Plus /></div>
        <div style={{ position: 'absolute', top: '58%', right: '38%' }}><Plus size={12} /></div>

        {/* Decorative dots */}
        <div style={{ position: 'absolute', top: '40%', left: '26%' }}><Dot /></div>
        <div style={{ position: 'absolute', top: '50%', right: '26%' }}><Dot size={8} color="#B8B3AA" /></div>
        <div style={{ position: 'absolute', top: '54%', left: '48%' }}><Dot size={5} /></div>

      </div>
    </section>
  )
}
