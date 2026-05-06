'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sfPro } from '@/lib/fonts'

const links = [
  { label: 'Home',   href: '/' },
  { label: 'Works',  href: '/#works' },
  { label: 'About',  href: '/about' },
  { label: 'Garden', href: '/garden' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      padding: '0 24px',
    }}>
      {/* Outer pill */}
      <div style={{
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(232, 232, 230, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 999,
        padding: '5px 5px',
        gap: 6,
        width: '100%',
        maxWidth: 720,
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>

        {/* Left — avatar + name */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            background: 'rgba(255,255,255,0.75)',
            borderRadius: 999,
            padding: '5px 16px 5px 5px',
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <img
              src="/a-logo.png"
              alt="Audrey Leo"
              style={{ height: 30, width: 'auto', display: 'block', flexShrink: 0 }}
            />
            <span style={{ fontFamily: sfPro, fontSize: '0.85rem', fontWeight: 500, color: '#111', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              Audrey Leo
            </span>
          </div>
        </Link>

        {/* Center — nav links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.75)',
          borderRadius: 999,
          padding: '5px 6px',
          gap: 2,
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          {links.map(l => {
            const active = pathname === l.href || (l.href === '/#works' && pathname.startsWith('/works'))
            return (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: sfPro,
                  fontSize: '0.83rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#111' : '#888',
                  textDecoration: 'none',
                  padding: '6px 16px',
                  borderRadius: 999,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.18s',
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>


      </div>
    </div>
  )
}
