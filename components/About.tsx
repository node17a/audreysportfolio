'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

// ── Mini pinwheel flower (same style as The Garden) ──────────────────────────
function MiniFlower({
  size = 36,
  core,
  light,
  rotate = 0,
}: {
  size?: number
  core: string
  light: string
  rotate?: number
}) {
  // Use a fixed internal viewBox so ratios stay consistent at any size
  const V = 100
  const id = `mf-${core.replace('#','')}-${size}`
  const petals = 14

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${V} ${V}`}
      fill="none"
      style={{ transform: `rotate(${rotate}deg)`, display: 'block', overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="28%"  stopColor={light}  stopOpacity="0.90" />
          <stop offset="70%"  stopColor={core}   stopOpacity="0.82" />
          <stop offset="100%" stopColor={core}   stopOpacity="0.40" />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="20"
          rx="8"
          ry="26"
          fill={`url(#${id})`}
          opacity="0.75"
          transform={`rotate(${i * (360 / petals)} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill="white" opacity="0.65" />
      <circle cx="50" cy="50" r="5.5" fill={light} opacity="0.9" />
    </svg>
  )
}

// ── Photo → Video hover card ──────────────────────────────────────────────────
function PhotoVideoCard() {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    setHovered(true)
    videoRef.current?.play()
  }
  function handleMouseLeave() {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>

      {/* Decorative mini flowers */}
      <div style={{ position: 'absolute', top: -22, left: -18, zIndex: 2 }}>
        <MiniFlower size={42} core="#E882A8" light="#F9C8DC" rotate={15} />
      </div>
      <div style={{ position: 'absolute', top: -14, right: 24, zIndex: 2 }}>
        <MiniFlower size={28} core="#7AAEE8" light="#BDD4F8" rotate={-10} />
      </div>
      <div style={{ position: 'absolute', top: '22%', right: -22, zIndex: 2 }}>
        <MiniFlower size={36} core="#E8C060" light="#F8E8A8" rotate={20} />
      </div>
      <div style={{ position: 'absolute', top: '48%', left: -26, zIndex: 2 }}>
        <MiniFlower size={32} core="#A888D8" light="#D8C4F5" rotate={-5} />
      </div>
      <div style={{ position: 'absolute', bottom: 48, left: -14, zIndex: 2 }}>
        <MiniFlower size={22} core="#78C8A0" light="#BCECCE" rotate={30} />
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: -20, zIndex: 2 }}>
        <MiniFlower size={38} core="#F9C2D8" light="#FDE8F2" rotate={-18} />
      </div>
      <div style={{ position: 'absolute', bottom: -16, left: 40, zIndex: 2 }}>
        <MiniFlower size={26} core="#E8A078" light="#F8D0B4" rotate={10} />
      </div>
      <div style={{ position: 'absolute', top: '70%', right: -12, zIndex: 2 }}>
        <MiniFlower size={20} core="#E882A8" light="#F9C8DC" rotate={-25} />
      </div>

      {/* Card */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: 340,
          height: 420,
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        }}
      >
        {/* Photo */}
        <img
          src="/me.jpg"
          alt="Audrey Leo"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 0 : 1,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src="/me.mp4"
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Hover hint */}
        <div style={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: hovered ? 0 : 0.7,
          transition: 'opacity 0.3s ease',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          borderRadius: 20,
          padding: '5px 14px',
          fontFamily: sfPro,
          fontSize: '0.65rem',
          color: '#fff',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          hover me ✦
        </div>
      </div>
    </div>
  )
}

// ── About section ─────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-[#0A0A0A] py-28 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* Left — Photo / Video */}
        <div className="flex justify-center md:justify-start">
          <PhotoVideoCard />
        </div>

        {/* Right — Bio */}
        <div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#F5C842" className="mb-4">
            <path d="M6 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z" />
          </svg>
          <h2 className="text-white text-4xl font-semibold tracking-tight">
            Meet the Maker ── .✦
          </h2>
          <p className="text-gray-300 font-light leading-relaxed text-base mt-6">
            Hey! I&apos;m Audrey, a creative, a technologist and everything in between. I enjoy using
            emerging tech as a medium for my artistic pursuits.
          </p>
          <p className="text-gray-300 font-light leading-relaxed text-base mt-4">
            Currently a first year at Slade School of Art @ University College London pursuing Art
            &amp; Technology, I enjoy making things that beep, blink, and make you feel something.
            I mess around with whatever tech I can get my hands on to turn messy human emotions into
            interactive experiences.
          </p>
          <blockquote className="border-l-2 border-amber-400 pl-4 mt-6">
            <p className="text-white italic">
              &quot;The most creative is the most personal.&quot;
            </p>
            <p className="text-gray-500 text-sm mt-1">— Martin Scorsese</p>
          </blockquote>
        </div>
      </motion.div>
    </section>
  )
}
