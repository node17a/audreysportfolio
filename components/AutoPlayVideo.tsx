'use client'
import { useRef, useEffect } from 'react'

export default function AutoPlayVideo({ src, style }: { src: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  return (
    <video ref={ref} src={src} loop muted playsInline preload="none" style={style} />
  )
}
