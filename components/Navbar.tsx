'use client'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export default function Navbar() {
  const scrollDirection = useScrollDirection()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="flex items-center justify-between px-8 py-6">
        <span className="font-medium text-sm text-gray-900">Audrey Leo</span>
        <div className="flex items-center gap-6">
          <a href="#about"      className="text-sm text-gray-600 hover:text-black transition-colors">About</a>
          <a href="#works"      className="text-sm text-gray-600 hover:text-black transition-colors">Works</a>
          <a href="#playground" className="text-sm text-gray-600 hover:text-black transition-colors">Playground</a>
        </div>
      </div>
    </nav>
  )
}
