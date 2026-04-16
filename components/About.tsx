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
