'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: 'Accuracy', value: '±0.01mm', suffix: '' },
  { label: 'Parts Digitized', value: '1000', suffix: '+' },
  { label: 'Industry-Grade', value: 'Software', suffix: '' },
]

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Animated noise texture background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest gradient-text text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  stat,
  isInView,
}: {
  stat: typeof stats[0]
  isInView: boolean
}) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(stat.value) || 0

  useEffect(() => {
    if (!isInView || !numericValue) return

    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, numericValue])

  return (
    <motion.div
      className="text-center p-8 border border-electric-blue/30 bg-background/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {numericValue > 0 ? (
        <motion.div
          className="text-6xl md:text-7xl font-bold text-electric-blue mb-4 font-heading"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {stat.value.includes('±') ? stat.value : `${count}${stat.suffix}`}
        </motion.div>
      ) : (
        <motion.div
          className="text-4xl md:text-5xl font-bold text-electric-blue mb-4 font-heading"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {stat.value}
        </motion.div>
      )}
      <p className="text-xl text-metallic-silver uppercase tracking-wide">
        {stat.label}
      </p>
    </motion.div>
  )
}

