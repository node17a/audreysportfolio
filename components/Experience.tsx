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
