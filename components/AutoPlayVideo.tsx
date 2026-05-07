'use client'
import { useRef, useEffect } from 'react'

export default function AutoPlayVideo({ src, style }: { src: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    const play = () => v.play().catch(() => {})
    play()
    v.addEventListener('canplay', play, { once: true })
    return () => v.removeEventListener('canplay', play)
  }, [])

  return (
    <video ref={ref} src={src} autoPlay loop muted playsInline preload="auto" style={style} />
  )
}
