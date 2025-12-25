'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const processSteps = [
  {
    number: '01',
    title: 'Physical Part Scanning',
    description: 'High-precision 3D scanning using laser and structured light technology',
  },
  {
    number: '02',
    title: 'Point Cloud Processing',
    description: 'Advanced algorithms process millions of data points into clean geometry',
  },
  {
    number: '03',
    title: 'Surface Reconstruction',
    description: 'Intelligent surface modeling creates accurate NURBS and mesh surfaces',
  },
  {
    number: '04',
    title: 'Parametric CAD Modeling',
    description: 'Conversion to fully parametric, feature-based CAD models',
  },
  {
    number: '05',
    title: 'Quality Validation',
    description: 'Rigorous quality checks ensure ±0.01mm accuracy standards',
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!horizontalRef.current || !containerRef.current) return

    const horizontal = horizontalRef.current
    const container = containerRef.current
    let tween: gsap.core.Tween | null = null

    const getScrollAmount = () => {
      if (!horizontal) return 0
      return horizontal.scrollWidth - window.innerWidth
    }

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    // Wait for next tick to ensure layout is ready
    const timeoutId = setTimeout(() => {
      const scrollAmount = getScrollAmount()
      
      if (scrollAmount <= 0) return

      tween = gsap.to(horizontal, {
        x: () => `-${scrollAmount}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinSpacing: true,
          markers: false, // Set to true for debugging
        },
      })

      window.addEventListener('resize', handleResize)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      if (tween) {
        tween.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={containerRef} id="process" className="relative min-h-screen overflow-hidden">
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10">
        <h2 
          className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-widest gradient-text"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Process
        </h2>
      </div>

      <div
        ref={horizontalRef}
        className="flex h-full"
        style={{ width: 'max-content' }}
      >
        {processSteps.map((step, index) => (
          <ProcessCard key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}

function ProcessCard({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'left 80%',
          end: 'left 20%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-screen min-w-screen h-full flex items-center justify-center px-4 sm:px-8 md:px-16"
    >
      <motion.div
        className="relative max-w-2xl w-full p-12 border border-electric-blue/30 bg-background/50 backdrop-blur-sm hover:border-electric-blue transition-all duration-500 group"
        whileHover={{ scale: 1.02 }}
      >
        {/* Progress line */}
        <div className="absolute top-0 left-0 h-1 bg-electric-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Number */}
        <div className="absolute -top-8 -left-8 text-8xl font-bold text-electric-blue/20 font-heading">
          {step.number}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6 text-electric-blue">
            {step.title}
          </h3>
          <p className="text-lg text-metallic-silver leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-effect-strong pointer-events-none" />
      </motion.div>
    </div>
  )
}

