'use client'
import { useRef, useEffect } from 'react'

interface Props {
  src: string
  style?: React.CSSProperties
  className?: string
}

export default function AutoPlayVideo({ src, style, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    v.muted = true

    const tryPlay = () => { v.play().catch(() => {}) }

    // Attempt immediately
    tryPlay()

    // Retry once the video has buffered enough
    v.addEventListener('canplay', tryPlay)

    // Retry whenever it scrolls into view (covers off-screen / lazy-rendered cases)
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) tryPlay() },
      { threshold: 0.1 }
    )
    io.observe(v)

    return () => {
      v.removeEventListener('canplay', tryPlay)
      io.disconnect()
    }
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
