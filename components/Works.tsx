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
