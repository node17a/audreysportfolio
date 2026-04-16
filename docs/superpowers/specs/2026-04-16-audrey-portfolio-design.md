# Audrey Leo — Portfolio Site Design Spec
**Date:** 2026-04-16  
**Stack:** Next.js 14 App Router · Tailwind CSS · Framer Motion · TypeScript  
**Deploy target:** Vercel

---

## Overview

Single-page portfolio for Audrey Leo — art student, creative technologist. All navigation is anchor-scroll (no routing). The site communicates personality through a physical "mood board" aesthetic: scattered objects, terminal windows, polaroids, tickets, and hand-crafted CSS components.

---

## Architecture

```
/app
  layout.tsx          — Inter + Dancing Script via next/font/google, global metadata, smooth scroll
  page.tsx            — assembles Hero → About → Works → Playground → Experience → Contact in order
/components
  Navbar.tsx          — fixed, transparent, hides on scroll-down / shows on scroll-up
  Hero.tsx            — 100vh absolute-positioned scatter canvas (mood board desktop)
  About.tsx           — dark #0A0A0A, two-column: Terminal card + bio text
  Works.tsx           — light #F5F4F1, 2-col bento grid of 4 project cards
  Playground.tsx      — warm #F0EDE8, CSS columns masonry of 10 photo cards
  Experience.tsx      — light #F5F4F1, vertical timeline of 5 entries
  Contact.tsx         — dark #0A0A0A, centered email + LinkedIn link pills + footer
  Terminal.tsx        — reusable macOS terminal shell (title bar + traffic lights + body slot)
/hooks
  useScrollDirection.ts — returns "up" | "down", used by Navbar
/styles
  globals.css         — float/blink keyframes, scroll-behavior: smooth
vercel.json           — framework: nextjs, cache-control headers, security headers
```

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| Off-white | `#F5F4F1` | Default section bg |
| True black | `#0A0A0A` | About, Contact bg |
| Accent amber | `#F5C842` | Mac folder, stars, border accents |
| Muted | `#888888` | Captions, tagline |
| Card bg | `#FFFFFF` | Polaroids, white cards |
| Terminal | `#1C1C1E` | Terminal windows |
| Kraft | `#C8A97E` | Photo collage board |
| Warm off-white | `#F0EDE8` | Playground section bg |

---

## Typography

- **Primary:** Inter (300 / 400 / 500 / 600) via `next/font/google` → CSS var `--font-inter`
- **Script:** Dancing Script (700) via `next/font/google` → CSS var `--font-dancing`
- Script font used **only** on: hero name signature, "capture moments" overlay on polaroid board
- Headings: `tracking-tight`; body: `font-light` or `font-normal`, generous `leading-relaxed`

---

## Section-by-Section Design

### Section 1 — Hero (`100vh`, off-white, graph-paper grid)

Full-canvas scatter layout. **All child elements are `position: absolute`** — no flex/grid at the top level.

| Element | Position | Detail |
|---|---|---|
| Navbar | `fixed top-0` | Transparent, Inter medium, hide-on-scroll-down |
| Name signature | `top: 38%, left: 50%` | Dancing Script clamp(5rem,9vw,8rem), `#1a1a1a` |
| Tagline | below name | Inter all-caps, 0.7rem, tracking-widest, `#888` |
| Badge/lanyard card | `top: 12%, left: 3%` | Dark card + lanyard strap + profile gradient circle, `rotate-[-2deg]`, float-delay-1 |
| Vinyl/playlist card | `top: 52%, left: 3%` | White card, vinyl SVG, float-delay-2 |
| Ripped paper | `top: 5%, left: 22%` | White div, CSS clip-path torn bottom, emoji objects, float-delay-3 |
| Event ticket | `top: 8%, right: 6%` | White card, `border-2 border-black`, barcode divs, `rotate-[2deg]`, float-delay-1 |
| Polaroid board | `top: 15%, right: -1%` | Kraft bg `#C8A97E`, 7 polaroids overlapping, Dancing Script overlay, float-delay-4 |
| Mac folder | `bottom: 20%, left: 30%` | CSS-only yellow folder `#F5C842`, `rotate-[-3deg]`, float-delay-5 |
| Terminal window | `bottom: 10%, left: 40%` | `Terminal.tsx`, whoami + ls output, blinking cursor, float-delay-3 |
| Flower vase | `bottom: 28%, left: 22%` | Arch div + 🌸, `rotate-[5deg]`, float |
| ✦ stars | scattered | Amber `#F5C842`, 12px |
| Black dot | `bottom: 30%, right: 42%` | `w-4 h-4 rounded-full bg-black` |

**Float animation:** CSS `--rotation` variable on each element preserves natural tilt while floating. Staggered delays via `.float-delay-1` through `.float-delay-5`.

**Mobile hero:** All absolute positioning removed. Elements stack as centered flex-col: name → tagline → terminal → badge. `pt-24 pb-12 px-6`. Scatter-only objects (ticket, folder, vase, stars) hidden on mobile.

### Section 2 — About (dark `#0A0A0A`)

Framer Motion `useInView` fade-up, `once: true`, `margin: "-100px"`.  
Two columns, `gap-16`, `max-w-5xl mx-auto px-8 py-28`.

- **Left:** `Terminal.tsx` with `whoami`, `cat about.txt`, `ls interests/`, `echo $motto` — green commands, gray output
- **Right:** ✦ amber star → "Meet the Maker ── .✦" heading → two body paragraphs → blockquote with amber left border

### Section 3 — Works (light `#F5F4F1`)

`grid grid-cols-2 gap-4` desktop, `grid-cols-1` mobile. Cards: `rounded-2xl`, hover `scale-[1.02] shadow-xl transition-all duration-300`. Arrow `→` appears bottom-right on hover via `group-hover:opacity-100`.

| Card | Gradient | Tag color |
|---|---|---|
| Impermanence | `#0F2027` → `#2C5364` | teal |
| Memory Distortion Box | `#1a1a2e` → `#16213e` | purple |
| Plastic Panic | `#134E5E` → `#71B280` | green |
| Traditional Batik Uniform | `#c94b4b` → `#4b134f` | orange |

### Section 4 — Playground (warm `#F0EDE8`)

CSS `columns: 3` desktop / `2` tablet / `1` mobile. 10 cards with `break-inside-avoid mb-4`. Each: white bg, slight random rotation, gradient block of varying heights, small gray caption. On hover: `rotate-0 shadow-md transition-all duration-300` (straightens tilt).

### Section 5 — Experience (`#F5F4F1`)

Vertical timeline, `max-w-3xl`, absolute left line `w-px bg-black/10`, dot `w-2 h-2 rounded-full bg-black` per entry. 5 entries: UCL Indo Society, London Fashion Week FW26, Lawson, IDN Media, Oxford.

### Section 6 — Contact (dark `#0A0A0A`)

Centered ✦ → "Let's build together." → subtext → email + LinkedIn pills → footer row with copyright + "Built with Next.js · Deployed on Vercel".

---

## Animations

| Interaction | Implementation |
|---|---|
| Hero floats | CSS `float` keyframe, `--rotation` var, staggered `.float-delay-N` classes |
| Cursor blink | CSS `cursor-blink` keyframe |
| Nav hide/show | `useScrollDirection` hook → `translateY(-100%)` / `0`, `transition-transform duration-300` |
| Section entrance | Framer Motion `useInView`, `y: 30→0, opacity: 0→1`, `duration: 0.6` |
| Work card hover | `hover:scale-[1.02] hover:shadow-xl transition-all duration-300` |
| Playground card hover | `hover:rotate-0 hover:shadow-md transition-all duration-300` |
| Footer link pills | `hover:bg-white hover:text-black transition-colors duration-200` |

---

## vercel.json

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
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## No Real Images

All visual placeholders are CSS gradients, Tailwind gradient utilities, emoji, or inline SVG. Audrey will replace gradient blocks with real photos after delivery.

---

## Decisions & Rationale

- **`Terminal.tsx` reused** in both Hero and About — avoids duplicating the macOS chrome markup
- **No component library** — every element hand-crafted in Tailwind per brief
- **`next/font/google`** for both fonts — no CDN link tags, fonts self-hosted by Next.js at build time
- **Single `page.tsx`** — this is a portfolio, not an app; no need for routing complexity
- **CSS `columns`** for Playground masonry — simpler than JS masonry libs, works with `break-inside-avoid`
- **`useScrollDirection` in `/hooks/`** — keeps Navbar lean and the hook reusable if needed elsewhere
