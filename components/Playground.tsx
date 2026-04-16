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
