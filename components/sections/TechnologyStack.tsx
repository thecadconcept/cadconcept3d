'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const technologies = [
  'CMM',
  'Laser Scanner',
  'Structured Light Scanner',
  'SolidWorks',
  'CATIA',
  'NX',
  'Geomagic',
  'PolyWorks',
]

export default function TechnologyStack() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Duplicate for seamless loop
  const duplicatedTechs = [...technologies, ...technologies]

  return (
    <section ref={ref} className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest gradient-text text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Technology Stack
        </motion.h2>

        <div className="relative">
          {/* Marquee container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -50 * 8 * 16], // Move by width of all items
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedTechs.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 px-8 py-4 border border-primary/30 bg-background/50 backdrop-blur-sm text-2xl font-bold uppercase tracking-wider text-primary whitespace-nowrap"
                  whileHover={{ scale: 1.1, borderColor: '#00E5FF' }}
                  transition={{ duration: 0.3 }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

