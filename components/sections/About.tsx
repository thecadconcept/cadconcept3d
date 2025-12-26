'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BlueprintSVG from '@/components/ui/BlueprintSVG'
import Container from '@/components/ui/Container'

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
      className="relative py-16 md:py-24 bg-background overflow-hidden"
    >
      <Container>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Visual (Blueprint SVG) - Wrapped in Glass Card */}
          <motion.div
            variants={itemVariants}
            className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 bg-surface-50/5 backdrop-blur-sm shadow-2xl flex items-center justify-center p-6 md:p-8 order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent z-10 pointer-events-none" />
            <BlueprintSVG />

            {/* Decorative Corner Text */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-primary/50">
              FIG 1.1 - TARGET_SYSTEM
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="relative z-10 space-y-8 order-2">
            <motion.div variants={itemVariants}>
              <p className="text-primary font-mono tracking-widest text-xs md:text-sm uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight">
                Precision. <br />
                Passion. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">
                  Perfection.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-muted text-base md:text-lg font-light leading-relaxed border-l-2 border-primary/30 pl-6">
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
      </Container>
    </section>
  )
}
