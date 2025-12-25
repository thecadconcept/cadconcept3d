'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const industries = [
  {
    name: 'Automotive',
    description: 'Precision components and assemblies',
    icon: '🚗',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Aerospace',
    description: 'Critical flight components',
    icon: '✈️',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Manufacturing',
    description: 'Production tooling and fixtures',
    icon: '⚙️',
    gradient: 'from-electric-blue to-metallic-silver',
  },
  {
    name: 'Tooling',
    description: 'Molds, dies, and jigs',
    icon: '🔧',
    gradient: 'from-metallic-silver to-electric-blue',
  },
  {
    name: 'Medical Devices',
    description: 'FDA-compliant medical equipment',
    icon: '🏥',
    gradient: 'from-blue-600 to-cyan-400',
  },
]

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.8,
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section 
      ref={ref} 
      id="industries" 
      className="relative min-h-screen py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>
      
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-metallic-silver/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent mx-auto" />
          </motion.div>
          
          <motion.h2
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="gradient-text">Industries</span>{' '}
            <span className="text-soft-white">Served</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-metallic-silver max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Delivering precision engineering solutions across diverse sectors
          </motion.p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              industry={industry}
              index={index}
              variants={cardVariants}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IndustryCard({
  industry,
  index,
  variants,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  industry: typeof industries[0]
  index: number
  variants: any
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  return (
    <motion.div
      variants={variants}
      className="h-full"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <MagneticButton>
        <motion.div
          className="relative h-full min-h-[280px] p-8 lg:p-10 border-2 border-electric-blue/20 bg-background/40 backdrop-blur-xl group cursor-pointer overflow-hidden"
          whileHover={{ 
            scale: 1.03,
            borderColor: 'rgba(0, 229, 255, 0.8)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            initial={false}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
          />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-electric-blue/30 group-hover:border-electric-blue transition-colors duration-300" />
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-electric-blue via-metallic-silver to-transparent"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Icon */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.1 + 0.5,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue/20 to-metallic-silver/20 border border-electric-blue/30 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-electric-blue/30 transition-all duration-300">
              {industry.icon}
            </div>
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              className="text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-4 text-electric-blue group-hover:text-electric-blue transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {industry.name}
            </motion.h3>
            
            <motion.p
              className="text-lg text-metallic-silver leading-relaxed group-hover:text-soft-white transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              {industry.description}
            </motion.p>
          </div>

          {/* Animated arrow indicator */}
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-electric-blue/30 bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:border-electric-blue group-hover:bg-electric-blue/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.5,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-electric-blue text-xl font-bold"
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.div>

          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-effect-strong pointer-events-none" />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20"
            initial={false}
            animate={{
              background: isHovered
                ? 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent)'
                : 'transparent',
            }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundPosition: isHovered ? '200% 0' : '-200% 0',
            }}
          />
        </motion.div>
      </MagneticButton>
    </motion.div>
  )
}

