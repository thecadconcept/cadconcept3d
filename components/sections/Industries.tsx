'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const industries = [
  {
    name: 'Automotive',
    description: 'Precision scanning and reverse engineering for automotive components and assemblies.',
    icon: '🚗',
  },
  {
    name: 'Aerospace',
    description: 'High-tolerance metrology and surface modeling for critical flight components.',
    icon: '✈️',
  },
  {
    name: 'Manufacturing',
    description: 'Digitizing tooling, fixtures, and molds for reproduction and inventory.',
    icon: '⚙️',
  },
  {
    name: 'Tooling',
    description: 'Verification and repair of complex injection molds, dies, and jigs.',
    icon: '🔧',
  },
  {
    name: 'Medical Devices',
    description: 'FDA-compliant quality inspection and reverse engineering of medical equipment.',
    icon: '🏥',
  },
  {
    name: 'Defense',
    description: 'Secure and reliable scanning solutions for defense and military applications.',
    icon: '🛡️',
  },
]

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      id="industries"
      className="relative py-24 px-4 md:px-8 lg:px-16"
    >
      {/* Background Elements (Mirrors Services) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-900/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 font-mono tracking-widest text-sm uppercase mb-4">

          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-sans uppercase">
            Industries We Serve
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {industries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IndustryCard({ industry, variants }: { industry: any, variants: any }) {
  return (
    <motion.div
      variants={variants}
      className="group relative p-8 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.07] transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-4xl">{industry.icon}</span>
        {/* Arrow Icon */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {industry.name}
      </h3>

      <p className="text-gray-400 leading-relaxed text-sm">
        {industry.description}
      </p>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
      </div>
    </motion.div>
  )
}
