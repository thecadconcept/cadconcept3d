'use client'

import { motion } from 'framer-motion'
import Scene from '@/components/3d/Scene'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <Scene />

      {/* Overlay UI - Z-Index 10 ensures it's above canvas */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-blue/20 bg-electric-blue/5 backdrop-blur-sm pointer-events-auto"
            >
              <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              <span className="text-electric-blue text-xs uppercase tracking-[0.2em] font-medium">
                Next-Gen Scanning
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-white"
            >
              REVERSE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-metallic-silver to-white bg-300% animate-shine">
                ENGINEERING
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-metallic-silver text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            >
              Transform physical reality into digital precision. We specialize in
              Scan-to-CAD services for automotive, aerospace, and industrial applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 pointer-events-auto"
            >
              <MagneticButton>
                <a href="#contact" className="px-8 py-4 bg-electric-blue text-background text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]">
                  Start Project
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#process" className="px-8 py-4 bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md">
                  Explore Process
                </a>
              </MagneticButton>
            </motion.div>

          </div>
        </div>
      </div>

      {/* HUD Elements / Decor */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-10 pointer-events-none opacity-50">
        <div className="flex flex-col gap-2 font-mono text-xs text-electric-blue">
          <div className="flex gap-4">
            <span>COORD_X: 42.1293</span>
            <span>COORD_Y: 11.2393</span>
          </div>
          <div className="h-[1px] w-32 bg-electric-blue/30" />
          <span>STATUS: SCANNING...</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block z-10 pointer-events-auto">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-electric-blue rounded-full"
          />
        </motion.div>
      </div>

    </section>
  )
}
