'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-transparent to-electric-blue/10" />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Turn Physical Reality into{' '}
          <span className="gradient-text">Digital Precision</span>
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent mb-12 mx-auto"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <MagneticButton>
            <RippleButton>
              Get Started Today
            </RippleButton>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

function RippleButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="relative px-12 py-6 bg-electric-blue text-background font-bold uppercase tracking-wider rounded-sm overflow-hidden group">
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300" />
      
      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </button>
  )
}

