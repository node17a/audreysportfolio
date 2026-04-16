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
