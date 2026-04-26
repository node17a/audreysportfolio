'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'

const links = [
  { label: 'Home',   href: '/' },
  { label: 'Works',  href: '/works' },
  { label: 'About',  href: '/#about' },
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
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4C5E8, #C0B0D8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: sfPro, fontWeight: 600, fontSize: '0.68rem', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.02em' }}>AL</span>
            </div>
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
            const active = pathname === l.href || (l.href === '/works' && pathname.startsWith('/works'))
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

        {/* Right — CV icon */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="View CV"
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            textDecoration: 'none',
            transition: 'background 0.18s',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        </a>

      </div>
    </div>
  )
}
