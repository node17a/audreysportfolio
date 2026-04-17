'use client'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const sfPro = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'

export default function Navbar() {
  const scrollDirection = useScrollDirection()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="flex items-center justify-between px-8 py-5">
        <span
          style={{
            fontFamily: sfPro,
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#1a1a1a',
            letterSpacing: '-0.01em',
          }}
        >
          Audrey Leo
        </span>
        <div className="flex items-center gap-7">
          {['About', 'Works', 'Experience', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: sfPro,
                fontWeight: 400,
                fontSize: '0.8rem',
                color: '#666',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >
              {link}
            </a>
          ))}
          <a
            href="/garden"
            style={{
              fontFamily: sfPro,
              fontWeight: 500,
              fontSize: '0.78rem',
              color: '#A882C8',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              background: 'linear-gradient(135deg, rgba(232,208,252,0.45), rgba(249,194,216,0.45))',
              border: '1px solid rgba(200,168,230,0.35)',
              borderRadius: 20,
              padding: '4px 13px',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(216,180,248,0.7), rgba(249,180,210,0.7))'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#7A50A8'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(180,140,220,0.5)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(232,208,252,0.45), rgba(249,194,216,0.45))'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#A882C8'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,168,230,0.35)'
            }}
          >
            ✦ The Garden
          </a>
        </div>
      </div>
    </nav>
  )
}
