# Audrey Leo Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete personal portfolio website for Audrey Leo using Next.js 14 App Router, Tailwind CSS, Framer Motion, and TypeScript, ready for Vercel deployment.

**Architecture:** Single-page app assembled in `page.tsx` with 6 section components. Hero uses a full-canvas absolute-positioned scatter layout for a physical mood board aesthetic. All other sections use Framer Motion `useInView` fade-up entrances. A shared `Terminal.tsx` renders the macOS terminal chrome used in both Hero and About sections.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, `next/font/google` (Inter + Dancing Script)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `vercel.json` | Create | Deployment config + security/cache headers |
| `styles/globals.css` | Create | Float, blink keyframes; masonry utility; scroll-behavior |
| `app/globals.css` | Replace | Import `../styles/globals.css` |
| `tailwind.config.ts` | Replace | Add font-family CSS variable extensions |
| `app/layout.tsx` | Replace | Inter + Dancing Script fonts, global metadata |
| `app/page.tsx` | Replace | Assembles all sections |
| `components/Terminal.tsx` | Create | Reusable macOS terminal chrome + body slot |
| `hooks/useScrollDirection.ts` | Create | Returns `"up" \| "down"` scroll direction |
| `components/Navbar.tsx` | Create | Fixed transparent nav, hides on scroll-down |
| `components/Hero.tsx` | Create | 100vh scatter canvas with all mood board objects |
| `components/About.tsx` | Create | Dark two-column: Terminal + bio |
| `components/Works.tsx` | Create | Light 2-col bento grid of 4 project cards |
| `components/Playground.tsx` | Create | Warm CSS-columns masonry of 10 art cards |
| `components/Experience.tsx` | Create | Light vertical timeline of 5 entries |
| `components/Contact.tsx` | Create | Dark centered links + footer |

---

## Task 1: Scaffold Next.js 14 project

**Files:**
- Create: entire project scaffold in `/Users/dreiiz/Desktop/audrey-portfolio-site`

- [ ] **Step 1: Run create-next-app in existing directory**

```bash
cd /Users/dreiiz/Desktop/audrey-portfolio-site
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected output: `Success! Created` with no errors. If prompted about existing files, confirm overwrite.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `added N packages` with no errors.

- [ ] **Step 3: Verify dev server starts**

```bash
npx next build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully` or similar. No fatal errors.

- [ ] **Step 4: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with Tailwind and Framer Motion"
```

---

## Task 2: vercel.json

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Write vercel.json**

Create `vercel.json` at the project root:

```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: add vercel.json with security and cache headers"
```

---

## Task 3: Global styles + Tailwind config

**Files:**
- Create: `styles/globals.css`
- Replace: `app/globals.css`
- Replace: `tailwind.config.ts`

- [ ] **Step 1: Create styles/globals.css**

Create `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

/* ── Float animation ── */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
  50%       { transform: translateY(-8px) rotate(var(--rotation, 0deg)); }
}

.float           { animation: float 3s ease-in-out infinite; }
.float-delay-1   { animation-delay: 0.3s; }
.float-delay-2   { animation-delay: 0.6s; }
.float-delay-3   { animation-delay: 0.9s; }
.float-delay-4   { animation-delay: 1.2s; }
.float-delay-5   { animation-delay: 1.5s; }

/* ── Cursor blink ── */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor-blink { animation: blink 1s step-end infinite; }

/* ── Masonry columns (responsive) ── */
.masonry {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .masonry { column-count: 2; }
}

@media (min-width: 1024px) {
  .masonry { column-count: 3; }
}
```

- [ ] **Step 2: Replace app/globals.css**

Replace the entire contents of `app/globals.css` with:

```css
@import '../styles/globals.css';
```

- [ ] **Step 3: Replace tailwind.config.ts**

Replace the entire contents of `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add styles/globals.css app/globals.css tailwind.config.ts
git commit -m "feat: add global CSS keyframes, masonry utility, Tailwind font config"
```

---

## Task 4: app/layout.tsx

**Files:**
- Replace: `app/layout.tsx`

- [ ] **Step 1: Write layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Audrey Leo — Creative & Technologist',
  description:
    'Portfolio of Audrey Leo, art & technology student at UCL Slade School of Art. Creative computing, interactive media, and design.',
  openGraph: {
    title: 'Audrey Leo — Creative & Technologist',
    description:
      'Portfolio of Audrey Leo, art & technology student at UCL Slade School of Art.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add layout with Inter + Dancing Script fonts and OpenGraph metadata"
```

---

## Task 5: Terminal.tsx

**Files:**
- Create: `components/Terminal.tsx`

- [ ] **Step 1: Create components/ directory and write Terminal.tsx**

```bash
mkdir -p components hooks
```

Create `components/Terminal.tsx`:

```tsx
interface TerminalProps {
  children: React.ReactNode
  className?: string
}

export default function Terminal({ children, className = '' }: TerminalProps) {
  return (
    <div className={`bg-[#1C1C1E] rounded-xl overflow-hidden shadow-2xl ${className}`}>
      {/* Title bar */}
      <div className="bg-[#2C2C2E] px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-xs text-gray-400 mx-auto">audrey-leo — zsh</span>
      </div>
      {/* Body */}
      <div className="p-4 font-mono text-sm space-y-1">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Terminal.tsx
git commit -m "feat: add reusable Terminal macOS chrome component"
```

---

## Task 6: useScrollDirection hook

**Files:**
- Create: `hooks/useScrollDirection.ts`

- [ ] **Step 1: Write useScrollDirection.ts**

Create `hooks/useScrollDirection.ts`:

```ts
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/useScrollDirection.ts
git commit -m "feat: add useScrollDirection hook for Navbar hide/show"
```

---

## Task 7: Navbar.tsx

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Write Navbar.tsx**

Create `components/Navbar.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with scroll-direction hide/show"
```

---

## Task 8: Hero.tsx

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write Hero.tsx**

Create `components/Hero.tsx`:

```tsx
import Terminal from './Terminal'

const polaroids = [
  { gradient: 'from-pink-200 to-rose-300',     rotate: '-rotate-2' },
  { gradient: 'from-sky-200 to-blue-300',      rotate: 'rotate-3'  },
  { gradient: 'from-amber-200 to-yellow-300',  rotate: '-rotate-1' },
  { gradient: 'from-emerald-200 to-green-300', rotate: 'rotate-2'  },
  { gradient: 'from-violet-200 to-purple-300', rotate: '-rotate-3' },
  { gradient: 'from-orange-200 to-red-200',    rotate: 'rotate-1'  },
  { gradient: 'from-teal-200 to-cyan-300',     rotate: '-rotate-2' },
]

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="#F5C842">
    <path d="M6 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z" />
  </svg>
)

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        backgroundColor: '#F5F4F1',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* ────────────────── MOBILE LAYOUT ────────────────── */}
      <div className="md:hidden flex flex-col items-center justify-center h-full pt-24 pb-12 px-6 gap-8">
        <div className="text-center">
          <h1
            className="font-dancing"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 5rem)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1 }}
          >
            Audrey Leo
          </h1>
          <p className="mt-4 text-[#888888]" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            A CREATIVE. A TECHNOLOGIST. IN BETWEEN.
          </p>
        </div>

        <Terminal className="w-full max-w-xs">
          <p><span className="text-[#4ADE80]">~ $ whoami</span></p>
          <p className="text-gray-300">Creative &amp; Technologist @ UCL Slade</p>
          <p>&nbsp;</p>
          <p><span className="text-[#4ADE80]">~ $ ls interests/</span></p>
          <p className="text-gray-300">arduino/ p5js/ c++/ illustration/ ux</p>
          <p>
            <span className="text-[#4ADE80]">~ $ </span>
            <span className="inline-block w-2 h-4 bg-[#4ADE80] cursor-blink align-middle" />
          </p>
        </Terminal>

        <div className="flex flex-col items-center">
          <div className="w-1 h-12 bg-black rounded" />
          <div className="bg-[#1a1a1a] rounded-2xl w-44 p-5 shadow-xl">
            <p className="text-white font-semibold text-base">Audrey Leo</p>
            <p className="text-gray-400 text-xs mt-0.5">Art &amp; Technology</p>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mx-auto mt-3" />
          </div>
        </div>
      </div>

      {/* ────────────────── DESKTOP SCATTER ────────────────── */}
      <div className="hidden md:block relative w-full h-full">

        {/* Center — Name + tagline */}
        <div
          className="absolute text-center"
          style={{ top: '38%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
        >
          <h1
            className="font-dancing"
            style={{ fontSize: 'clamp(5rem, 9vw, 8rem)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1 }}
          >
            Audrey Leo
          </h1>
          <p className="mt-8 text-[#888888]" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            A CREATIVE. A TECHNOLOGIST. IN BETWEEN.
          </p>
        </div>

        {/* Left — Badge / Lanyard */}
        <div
          className="absolute float float-delay-1"
          style={{ top: '12%', left: '3%', '--rotation': '-2deg' } as React.CSSProperties}
        >
          <div className="-rotate-[2deg]">
            <div className="w-1 h-16 bg-black mx-auto rounded" />
            <div className="bg-[#1a1a1a] rounded-2xl w-48 p-5 shadow-xl">
              <div className="flex gap-3 items-start">
                <p
                  className="text-white text-[9px] tracking-widest uppercase flex-shrink-0"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  AUDREY LEO · DESIGNER
                </p>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg leading-tight">Audrey Leo</p>
                  <p className="text-gray-400 text-xs mt-1">Art &amp; Technology</p>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mx-auto mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left — Vinyl / Playlist card */}
        <div
          className="absolute float float-delay-2"
          style={{ top: '52%', left: '3%', '--rotation': '0deg' } as React.CSSProperties}
        >
          <div className="bg-white rounded-2xl w-48 p-4 shadow-md">
            <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto">
              <circle cx="40" cy="40" r="38" fill="#1a1a1a" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="22" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="14" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="5"  fill="#22C55E" />
            </svg>
            <p className="text-center text-gray-400 text-[9px] tracking-widest uppercase mt-2">PLAYLIST</p>
            <p className="text-center font-bold text-base mt-0.5">Vibe Coding</p>
            <p className="text-center text-gray-400 text-xs mt-0.5">X projects and counting</p>
            <p className="text-center text-gray-400 text-[10px] mt-0.5">Learning by building</p>
          </div>
        </div>

        {/* Top center — Ripped paper */}
        <div
          className="absolute float float-delay-3"
          style={{ top: '5%', left: '22%', '--rotation': '1deg' } as React.CSSProperties}
        >
          <div
            className="rotate-[1deg] bg-white shadow-md"
            style={{
              width: '380px',
              paddingBottom: '2.5rem',
              clipPath:
                'polygon(0 0,100% 0,100% 82%,97% 90%,94% 80%,91% 88%,88% 78%,85% 87%,82% 77%,79% 85%,76% 75%,73% 83%,70% 73%,67% 81%,64% 71%,61% 79%,58% 69%,55% 77%,52% 67%,49% 75%,46% 65%,43% 73%,40% 63%,37% 71%,34% 63%,31% 71%,28% 61%,25% 69%,22% 61%,19% 69%,16% 59%,13% 67%,10% 59%,7% 67%,4% 59%,0 65%)',
            }}
          >
            <div className="flex items-center justify-center gap-8 px-10 pt-6 pb-6">
              <span className="text-6xl" style={{ transform: 'rotate(-5deg)', display: 'inline-block' }}>🌿</span>
              <span className="text-4xl" style={{ transform: 'rotate(3deg)',  display: 'inline-block' }}>☕</span>
              <span className="text-3xl" style={{ transform: 'rotate(-8deg)', display: 'inline-block' }}>✏️</span>
              <div
                className="w-16 h-12 bg-[#E8D5A3] rounded-sm shadow-sm"
                style={{ transform: 'rotate(6deg)' }}
              />
            </div>
          </div>
        </div>

        {/* Top right — Event ticket */}
        <div
          className="absolute float float-delay-1"
          style={{ top: '8%', right: '6%', '--rotation': '2deg' } as React.CSSProperties}
        >
          <div className="rotate-[2deg] bg-white border-2 border-black rounded-lg w-72 shadow-lg flex overflow-hidden">
            <div className="flex-1 p-5">
              <p className="font-bold text-2xl leading-tight">ART × TECHNOLOGY</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <p className="text-xs text-gray-500">Design tour</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-gray-500">
                <span>Time: Anytime</span>
                <span>Price: Free</span>
                <span>Location: London + Online</span>
                <span>Open worldwide</span>
              </div>
              <p className="mt-3 text-[9px] tracking-widest text-gray-400 uppercase">EST. 2024 · PRESENT</p>
            </div>
            <div className="w-16 border-l-2 border-dashed border-black flex flex-col items-center justify-center gap-3 p-2">
              <p
                className="text-[9px] font-bold tracking-widest"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                AUDREY LEO
              </p>
              <div className="flex gap-[2px] items-end">
                {[3, 6, 2, 8, 4, 7, 3, 5, 9, 2].map((h, i) => (
                  <div key={i} className="w-[2px] bg-black" style={{ height: `${h * 3}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Polaroid board */}
        <div
          className="absolute float float-delay-4"
          style={{ top: '15%', right: '-1%', '--rotation': '1deg' } as React.CSSProperties}
        >
          <div className="rotate-[1deg] bg-[#C8A97E] rounded-2xl p-4 shadow-2xl relative" style={{ width: '340px' }}>
            <div className="grid grid-cols-3 gap-1">
              {polaroids.map((p, i) => (
                <div key={i} className={`bg-white p-1.5 pb-6 shadow-md ${p.rotate}`}>
                  <div className={`h-24 w-full rounded-sm bg-gradient-to-br ${p.gradient}`} />
                </div>
              ))}
            </div>
            <p
              className="font-dancing text-white text-xl absolute bottom-3 right-4"
              style={{ transform: 'rotate(-8deg)' }}
            >
              capture moments
            </p>
          </div>
        </div>

        {/* Center-bottom left — Mac folder */}
        <div
          className="absolute float float-delay-5"
          style={{ bottom: '20%', left: '30%', '--rotation': '-3deg' } as React.CSSProperties}
        >
          <div className="-rotate-[3deg] relative" style={{ width: '128px' }}>
            <div className="w-16 h-4 bg-[#F5C842] rounded-t-lg absolute top-0 left-4" />
            <div className="w-32 h-24 bg-[#F5C842] rounded-b-xl rounded-tr-xl shadow-lg mt-3 relative overflow-hidden">
              <div className="absolute inset-2 bg-[#FBDA61] rounded-xl" />
            </div>
          </div>
        </div>

        {/* Center — Terminal */}
        <div
          className="absolute float float-delay-3"
          style={{ bottom: '10%', left: '40%', '--rotation': '0deg' } as React.CSSProperties}
        >
          <Terminal className="w-80">
            <p><span className="text-[#4ADE80]">~ $ whoami</span></p>
            <p className="text-gray-300">Creative &amp; Technologist @ UCL Slade</p>
            <p>&nbsp;</p>
            <p><span className="text-[#4ADE80]">~ $ ls interests/</span></p>
            <p className="text-gray-300">arduino/ p5js/ c++/ illustration/ ux</p>
            <p>
              <span className="text-[#4ADE80]">~ $ </span>
              <span className="inline-block w-2 h-4 bg-[#4ADE80] cursor-blink align-middle" />
            </p>
          </Terminal>
        </div>

        {/* Bottom-left — Flower vase */}
        <div
          className="absolute float float-delay-1"
          style={{ bottom: '28%', left: '22%', '--rotation': '5deg' } as React.CSSProperties}
        >
          <div
            className="w-20 h-28 bg-white shadow-md flex items-end justify-center pb-3"
            style={{ borderRadius: '50% 50% 0 0', transform: 'rotate(5deg)' }}
          >
            <span className="text-3xl">🌸</span>
          </div>
        </div>

        {/* ✦ stars */}
        <div className="absolute" style={{ top: '25%', left: '48%' }}>
          <StarIcon />
        </div>
        <div className="absolute" style={{ top: '70%', right: '35%' }}>
          <StarIcon />
        </div>

        {/* Black dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-black"
          style={{ bottom: '30%', right: '42%' }}
        />

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero full-canvas scatter layout with all mood board objects"
```

---

## Task 9: About.tsx

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Write About.tsx**

Create `components/About.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from './Terminal'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-[#0A0A0A] py-28 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
      >
        {/* Left — Terminal */}
        <Terminal className="rounded-2xl">
          <p><span className="text-[#4ADE80]">~ $ whoami</span></p>
          <p className="text-gray-300">Audrey Leo — Creative &amp; Technologist</p>
          <p>&nbsp;</p>
          <p><span className="text-[#4ADE80]">~ $ cat about.txt</span></p>
          <p className="text-gray-300">First year @ Slade School of Art, UCL</p>
          <p className="text-gray-300">Studying Art &amp; Technology</p>
          <p>&nbsp;</p>
          <p><span className="text-[#4ADE80]">~ $ ls interests/</span></p>
          <p className="text-gray-300">p5.js&nbsp;&nbsp;Arduino&nbsp;&nbsp;C++&nbsp;&nbsp;UI/UX&nbsp;&nbsp;Illustration</p>
          <p>&nbsp;</p>
          <p><span className="text-[#4ADE80]">~ $ echo $motto</span></p>
          <p className="text-gray-300">&quot;The most creative is the most personal.&quot;</p>
          <p className="text-gray-300">— Martin Scorsese</p>
          <p>
            <span className="text-[#4ADE80]">~ $ </span>
            <span className="inline-block w-2 h-4 bg-[#4ADE80] cursor-blink align-middle" />
          </p>
        </Terminal>

        {/* Right — Bio */}
        <div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#F5C842" className="mb-4">
            <path d="M6 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z" />
          </svg>
          <h2 className="text-white text-4xl font-semibold tracking-tight">
            Meet the Maker ── .✦
          </h2>
          <p className="text-gray-300 font-light leading-relaxed text-base mt-6">
            Hey! I&apos;m Audrey, a creative, a technologist and everything in between. I enjoy using
            emerging tech as a medium for my artistic pursuits.
          </p>
          <p className="text-gray-300 font-light leading-relaxed text-base mt-4">
            Currently a first year at Slade School of Art @ University College London pursuing Art
            &amp; Technology, I enjoy making things that beep, blink, and make you feel something.
            I mess around with whatever tech I can get my hands on to turn messy human emotions into
            interactive experiences.
          </p>
          <blockquote className="border-l-2 border-amber-400 pl-4 mt-6">
            <p className="text-white italic">
              &quot;The most creative is the most personal.&quot;
            </p>
            <p className="text-gray-500 text-sm mt-1">— Martin Scorsese</p>
          </blockquote>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section with terminal and bio"
```

---

## Task 10: Works.tsx

**Files:**
- Create: `components/Works.tsx`

- [ ] **Step 1: Write Works.tsx**

Create `components/Works.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'Impermanence',
    tag: 'Creative Computing',
    tagColor: 'bg-teal-400/20 text-teal-300',
    gradient: 'from-[#0F2027] to-[#2C5364]',
    description:
      'Interact with light, color, and sound in Impermanence, a p5.js + Arduino experience exploring memory, change, and letting go.',
  },
  {
    title: 'Memory Distortion Box',
    tag: 'Machine Learning & Product Design',
    tagColor: 'bg-purple-400/20 text-purple-300',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    description:
      'Sound installation built with Arduino, coded with Pure Data, modelled with AutoCAD. Trigger memories that fragment and distort with proximity.',
  },
  {
    title: 'Plastic Panic',
    tag: 'Game Design',
    tagColor: 'bg-green-400/20 text-green-300',
    gradient: 'from-[#134E5E] to-[#71B280]',
    description:
      '2D pixel game developed in C++. Guide a turtle, dodge trash, earn points, and learn how ocean waste impacts our planet.',
  },
  {
    title: 'Traditional Batik Uniform',
    tag: 'Illustration',
    tagColor: 'bg-orange-400/20 text-orange-300',
    gradient: 'from-[#c94b4b] to-[#4b134f]',
    description:
      'Traditional Indonesian Batik Pattern, selected among 800+ submissions. Winning piece, now the official batik uniform for ACS Jakarta.',
  },
]

export default function Works() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="works" className="bg-[#F5F4F1] py-24 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <p className="text-xs tracking-widest text-gray-400 uppercase">Maker Space</p>
        <h2 className="text-4xl font-semibold tracking-tight mt-2 mb-8">
          A Gallery of My Creative Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group h-72 bg-gradient-to-br ${project.gradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className={`self-start text-xs px-3 py-1 rounded-full ${project.tagColor}`}>
                  {project.tag}
                </span>
                <div>
                  <h3 className="text-white text-2xl font-semibold">{project.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.description}</p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Works.tsx
git commit -m "feat: add Works bento grid with 4 project cards"
```

---

## Task 11: Playground.tsx

**Files:**
- Create: `components/Playground.tsx`

- [ ] **Step 1: Write Playground.tsx**

Create `components/Playground.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const artworks = [
  { gradient: 'from-rose-100 to-pink-200',     height: 'h-48', caption: 'Acrylic on canvas',    rotate: 'rotate-1'  },
  { gradient: 'from-sky-100 to-indigo-200',    height: 'h-64', caption: 'Digital illustration', rotate: '-rotate-1' },
  { gradient: 'from-amber-100 to-orange-200',  height: 'h-40', caption: 'Arduino sculpture',    rotate: 'rotate-2'  },
  { gradient: 'from-emerald-100 to-teal-200',  height: 'h-64', caption: 'Ink study',            rotate: '-rotate-2' },
  { gradient: 'from-violet-100 to-purple-200', height: 'h-48', caption: 'Mixed media',          rotate: 'rotate-0'  },
  { gradient: 'from-yellow-100 to-amber-200',  height: 'h-40', caption: 'Ceramics',             rotate: 'rotate-1'  },
  { gradient: 'from-cyan-100 to-sky-200',      height: 'h-64', caption: 'p5.js sketch',         rotate: '-rotate-1' },
  { gradient: 'from-red-100 to-rose-200',      height: 'h-48', caption: 'Charcoal',             rotate: 'rotate-2'  },
  { gradient: 'from-green-100 to-emerald-200', height: 'h-40', caption: 'Watercolor',           rotate: '-rotate-2' },
  { gradient: 'from-fuchsia-100 to-violet-200',height: 'h-64', caption: 'Photography',          rotate: 'rotate-0'  },
]

export default function Playground() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="playground" className="bg-[#F0EDE8] py-24 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <p className="text-xs tracking-widest text-gray-400 uppercase">Experimental Playground</p>
        <h2 className="text-4xl font-semibold tracking-tight mt-2 mb-8">
          Graphics, Paintings and Sculptures
        </h2>

        <div className="masonry">
          {artworks.map((art, i) => (
            <div
              key={i}
              className={`break-inside-avoid mb-4 bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 ${art.rotate} transition-all duration-300 hover:rotate-0 hover:shadow-md`}
            >
              <div className={`w-full ${art.height} bg-gradient-to-br ${art.gradient}`} />
              <p className="px-3 py-2 text-xs text-gray-400 font-light">{art.caption}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Playground.tsx
git commit -m "feat: add Playground masonry grid with 10 artwork cards"
```

---

## Task 12: Experience.tsx

**Files:**
- Create: `components/Experience.tsx`

- [ ] **Step 1: Write Experience.tsx**

Create `components/Experience.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    company: 'University College London Indonesian Society',
    role: 'Marketing Director',
    date: 'Oct 2025 – Present',
    location: 'London, UK',
    bullets: [
      'Manage all media operations for 200+ member society.',
      'Design promotional materials, branding and merchandise.',
      'Only first-year in office for current supervising board.',
    ],
  },
  {
    company: 'London Fashion Week FW26',
    role: 'AV and Tech Team Lead',
    date: 'Aug – Sept 2025',
    location: 'London, UK',
    bullets: [],
  },
  {
    company: 'Lawson',
    role: 'Marketing & Communications Intern',
    date: 'June – Aug 2025',
    location: 'Jakarta, Indonesia',
    bullets: [],
  },
  {
    company: 'IDN Media',
    role: 'UI/UX Design Intern',
    date: 'May – July 2024',
    location: 'Jakarta, Indonesia',
    bullets: [],
  },
  {
    company: 'Oxford University',
    role: 'Research Scholar',
    date: 'June – July 2023',
    location: 'Oxford, UK',
    bullets: [],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="bg-[#F5F4F1] py-24 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-semibold tracking-tight">── .✦ Experiences</h2>

        <div className="relative pl-8 mt-12">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />

          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-10">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-black" />
              <p className="font-semibold text-base">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.role}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {exp.date} · {exp.location}
              </p>
              {exp.bullets.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-sm text-gray-600 font-light flex gap-2 items-start">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: add Experience vertical timeline"
```

---

## Task 13: Contact.tsx

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Write Contact.tsx**

Create `components/Contact.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="bg-[#0A0A0A] py-28 px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Amber star */}
        <div className="flex justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 12 12" fill="#F5C842">
            <path d="M6 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z" />
          </svg>
        </div>

        <h2 className="text-5xl font-semibold text-white tracking-tight">
          Let&apos;s build together.
        </h2>
        <p className="text-gray-400 mt-4 text-base font-light">
          I&apos;d love to connect with you!
        </p>

        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:audrey17leo@gmail.com"
            className="border border-white/20 rounded-full px-6 py-3 text-white text-sm hover:bg-white hover:text-black transition-colors duration-200"
          >
            ✉ audrey17leo@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/audrey17leo"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 rounded-full px-6 py-3 text-white text-sm hover:bg-white hover:text-black transition-colors duration-200"
          >
            ↗ linkedin.com/in/audrey17leo
          </a>
        </div>
      </motion.div>

      {/* Footer bar */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">
        <p className="text-gray-500 text-sm">© 2026 Audrey Leo</p>
        <p className="text-gray-500 text-sm">Built with Next.js · Deployed on Vercel</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact section with email/LinkedIn pills and footer"
```

---

## Task 14: page.tsx — final assembly

**Files:**
- Replace: `app/page.tsx`

- [ ] **Step 1: Write page.tsx**

Replace `app/page.tsx` with:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Playground from '@/components/Playground'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Playground />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Run full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build completes. `✓ Compiled successfully`. All pages generated with no errors.

- [ ] **Step 4: Smoke-test dev server**

```bash
npm run dev &
sleep 4
curl -s http://localhost:3000 | grep -c "html"
kill %1
```

Expected: outputs `1` (HTML returned).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble page.tsx — portfolio complete"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Hero: scatter canvas, all named elements (badge, vinyl, ripped paper, ticket, polaroid board, folder, terminal, vase, stars, dot)
- ✅ About: dark bg, two-column, Terminal with all commands, bio paragraphs, blockquote
- ✅ Works: 4 cards, correct gradient pairs, tag colors, hover arrow
- ✅ Playground: 10 cards, CSS columns masonry, captions, hover straighten
- ✅ Experience: 5 entries, bullets on UCL Indo Society only
- ✅ Contact: star, heading, link pills, footer row
- ✅ Navbar: transparent, fixed, hide-on-scroll-down
- ✅ Animations: float keyframes with `--rotation`, cursor-blink, Framer Motion useInView on all sections
- ✅ Fonts: Inter (300/400/500/600) + Dancing Script (700) via next/font/google
- ✅ vercel.json: framework + security headers + cache headers
- ✅ scroll-behavior: smooth in globals.css
- ✅ Mobile hero: collapses to centered flex-col stack, scatter-only elements hidden

**Type consistency:** `useScrollDirection` returns `'up' | 'down'` and Navbar reads it directly — consistent. `Terminal` props (`children`, `className`) used identically in Hero and About — consistent.

**No placeholders:** All content is final copy from spec. No lorem ipsum. No TBD.
