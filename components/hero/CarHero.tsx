'use client'

import { motion } from 'framer-motion'
import CarScene from './CarScene'

export default function CarHero() {
    return (
        <section className="relative w-full h-screen bg-[#020202] overflow-hidden">

            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                <CarScene />
            </div>

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10 opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none z-10" />

            {/* Content Layer */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 md:px-12 pointer-events-none">
                <div className="max-w-3xl pointer-events-auto">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">Next-Gen</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold font-sans text-white mb-6 leading-tight tracking-tight">
                            Engineering  <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 animate-gradient-x">
                                Excellence
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
                            From reality to digital precision—engineering high-accuracy CAD models and additive manufacturing solutions for next-generation industries.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm tracking-widest rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all uppercase"
                            >
                                Work With Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent z-10" />
            <div className="absolute top-32 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-cyan-900/30 to-transparent z-10" />

        </section>
    )
}
