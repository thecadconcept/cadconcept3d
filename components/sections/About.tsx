'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import BlueprintSVG from '@/components/ui/BlueprintSVG'

const services = [
  '3D Scanning',
  'Reverse Engineering',
  'Scan to CAD Conversion',
  'Manufacturing Ready Models',
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  }

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Blueprint SVG */}
          <motion.div variants={itemVariants} className="relative">
            <BlueprintSVG />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h2
              className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest gradient-text"
              variants={itemVariants}
            >
              What We Do
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-metallic-silver leading-relaxed"
              variants={itemVariants}
            >
              We transform physical objects into precise digital models using
              state-of-the-art 3D scanning technology and advanced CAD software.
              Our reverse engineering services bridge the gap between physical
              reality and digital precision.
            </motion.p>

            <motion.ul
              className="space-y-4"
              variants={containerVariants}
            >
              {services.map((service, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={bulletVariants}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 bg-electric-blue rounded-full glow-effect" />
                  <span className="text-xl text-soft-white font-medium">
                    {service}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

