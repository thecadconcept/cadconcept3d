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

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-6 animate-marquee w-max">
            {duplicatedTechs.map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 border border-primary/30 bg-background/50 backdrop-blur-sm text-2xl font-bold uppercase tracking-wider text-primary whitespace-nowrap hover:border-primary hover:scale-105 transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

