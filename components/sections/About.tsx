'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BlueprintSVG from '@/components/ui/BlueprintSVG'

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 flex items-center bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Visual (Blueprint SVG) - Wrapped in Glass Card */}
          <motion.div
            variants={itemVariants}
            className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-2xl flex items-center justify-center p-6 md:p-8 order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <BlueprintSVG />

            {/* Decorative Corner Text */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-cyan-500/50">
              FIG 1.1 - TARGET_SYSTEM
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="relative z-10 space-y-8 order-2">
            <motion.div variants={itemVariants}>
              <p className="text-cyan-500 font-mono tracking-widest text-xs md:text-sm uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-white leading-tight">
                Precision. <br />
                Passion. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Perfection.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-gray-400 text-base md:text-lg font-light leading-relaxed border-l-2 border-cyan-500/30 pl-6">
              <p>
                At <b>CAD CONCEPT 3D</b>, we combine accuracy, innovation, and engineering excellence to transform real-world components into high-fidelity digital models and manufacturing-ready solutions.
              </p>
              <p>
                With expertise in 3D Scanning, Reverse Engineering, and Additive Manufacturing, we deliver engineering-grade outputs for complex mechanical and engineering applications.
              </p>
              <p>
                Our solutions help businesses accelerate development, reduce risk, and gain a competitive edge, ensuring consistent quality from concept to manufacturing.
              </p>
            </motion.div>


          </div>

        </motion.div>
      </div>
    </section>
  )
}
