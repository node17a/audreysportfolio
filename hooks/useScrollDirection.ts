'use client'
import { useState, useEffect, useRef } from 'react'

export function useScrollDirection(): 'up' | 'down' {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDirection
}
