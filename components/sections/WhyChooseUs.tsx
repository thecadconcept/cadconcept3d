'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: 'Accuracy', value: '±0.01mm', suffix: '', desc: 'Metrology-grade precision scanning.' },
  { label: 'Parts Digitized', value: '1000', suffix: '+', desc: 'From tiny gears to full aircraft.' },
  { label: 'Turnaround', value: '24', suffix: 'h', desc: 'Rapid processing times.' },
]

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 md:px-8 lg:px-16 bg-black/[0.96] overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4"
          >
            Our Advantage
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Why Industry Leaders Choose Us
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isInView={isInView} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, isInView, index }: { stat: any, isInView: boolean, index: number }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
      </div>

      <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
        {stat.value}<span className="text-cyan-500 text-3xl">{stat.stat?.suffix || stat.suffix}</span>
      </div>

      <h3 className="text-xl text-cyan-100 font-medium mb-2">{stat.label}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
    </motion.div>
  )
}
