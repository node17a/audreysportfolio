'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { mono } from '@/lib/fonts'

const DOT_COLOR  = '#1C1C1A'
const PILL_COLOR = '#1C1C1A'

export default function CustomCursor() {
  const [exploring, setExploring] = useState(false)
  const [visible, setVisible]     = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  const x = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.4 })

  // Pill: ~70×24, Dot: 10×10 — borderRadius:100 gives circle/pill automatically
  const w = useSpring(10, { stiffness: 280, damping: 26 })
  const h = useSpring(10, { stiffness: 280, damping: 26 })

  const visibleRef   = useRef(false)
  const exploringRef = useRef(false)

  useEffect(() => {
    let rafId: number | null = null
    let pendingX = -200
    let pendingY = -200

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        rawX.set(pendingX)
        rawY.set(pendingY)
        if (!visibleRef.current) {
          visibleRef.current = true
          setVisible(true)
        }
      })
    }

    let overRafId: number | null = null
    let pendingOverTarget: Element | null = null

    const onOver = (e: MouseEvent) => {
      pendingOverTarget = e.target as Element
      if (overRafId !== null) return
      overRafId = requestAnimationFrame(() => {
        overRafId = null
        const el = pendingOverTarget?.closest('[data-cursor="explore"]')
        const isExplore = !!el
        if (isExplore === exploringRef.current) return
        exploringRef.current = isExplore
        setExploring(isExplore)
        w.set(isExplore ? 72 : 10)
        h.set(isExplore ? 26 : 10)
      })
    }

    const onLeave = () => { visibleRef.current = false; setVisible(false) }
    const onEnter = () => { visibleRef.current = true;  setVisible(true) }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      if (rafId    !== null) cancelAnimationFrame(rafId)
      if (overRafId !== null) cancelAnimationFrame(overRafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, w, h])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform, width, height',
        width: w,
        height: h,
        borderRadius: 100,
        background: exploring ? PILL_COLOR : DOT_COLOR,
        opacity: visible ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.15s ease',
      }}
    >
      <AnimatePresence>
        {exploring && (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{
              fontFamily: mono,
              fontSize: '0.55rem',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#fff',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            Explore
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
