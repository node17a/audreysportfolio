'use client'
import { useRef, useEffect } from 'react'

interface Props {
  src: string
  style?: React.CSSProperties
  className?: string
}

function forcePlay(v: HTMLVideoElement) {
  v.muted = true
  if (v.readyState >= 3) {
    v.play().catch(() => {})
    return
  }
  // Not buffered yet — wait for canplay, then play exactly once
  v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true })
  // Fallback: retry after a short delay in case canplay already fired
  setTimeout(() => { if (v.paused) v.play().catch(() => {}) }, 300)
}

export default function AutoPlayVideo({ src, style, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    forcePlay(v)

    // Re-trigger when it scrolls into view (off-screen elements)
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && v.paused) forcePlay(v) },
      { threshold: 0.1 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={style}
      className={className}
    />
  )
}
