'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Total animation time before unmounting
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2800)

        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden'

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
                >
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 overflow-hidden">

                        {/* CAD - From Left */}
                        <motion.div
                            initial={{ x: '-100vw', opacity: 0, scale: 1.5 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                            className="relative overflow-hidden"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-heading text-white tracking-tight">
                                CAD
                            </h1>
                        </motion.div>

                        {/* Concept 3D - From Right */}
                        <motion.div
                            initial={{ x: '100vw', opacity: 0, scale: 1.5 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                            className="relative overflow-hidden"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 tracking-tight">
                                Concept 3D
                            </h1>
                        </motion.div>

                    </div>

                    {/* Scan line effect (enhanced) */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                        className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                    />

                </motion.div>
            )}
        </AnimatePresence>
    )
}
