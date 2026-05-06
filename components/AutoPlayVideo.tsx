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
    v.play().catch(() => {})
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      style={style}
      className={className}
    />
  )
}
