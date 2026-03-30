'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface Testimonial {
    id: number
    name: string
    role: string
    company: string
    content: string
    rating: number
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'Lead Project Engineer',
        company: 'AutoTech Solutions',
        content: 'CAD Concept delivered exceptional reverse engineering results. The accuracy of the 3D models allowed us to accelerate our prototyping phase by weeks.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Designer',
        company: 'InnovateX',
        content: 'Their 3D scanning services are top-notch. The level of detail captured was impressive, and the final deliverable was perfectly optimized for our CAD software.',
        rating: 5,
    },
    {
        id: 3,
        name: 'David Rodriguez',
        role: 'Manufacturing Director',
        company: 'Precision Parts Ltd',
        content: 'We rely on CAD Concept for quality validation. Their metrology reports are thorough and easy to understand, helping us maintain our high standards.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Emily Wong',
        role: 'R&D Manager',
        company: 'Future Dynamics',
        content: 'Professional, fast, and precise. The team understood our complex requirements and delivered a solution that exceeded our expectations.',
        rating: 5,
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection)
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection
            if (nextIndex < 0) nextIndex = testimonials.length - 1
            if (nextIndex >= testimonials.length) nextIndex = 0
            return nextIndex
        })
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return

        const timer = setInterval(() => {
            paginate(1)
        }, 5000)

        return () => clearInterval(timer)
    }, [isAutoPlaying, paginate])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    }

    return (
        <section className="py-24 bg-secondary overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <Container>
                <div className="text-center mb-16">
                    <motion.h4
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
                    >
                        Client Feedback
                    </motion.h4>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-heading text-white"
                    >
                        Testimonial
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto h-[350px] sm:h-[320px] md:h-[300px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.4 }
                            }}
                            className="absolute w-full"
                        >
                            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-xl">
                                {/* Quote Icon */}
                                <div className="mx-auto mb-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-secondary text-xl sm:text-2xl font-serif">
                                    &quot;
                                </div>

                                <p className="text-base sm:text-lg md:text-2xl text-white font-light leading-relaxed mb-6 sm:mb-8">
                                    {testimonials[currentIndex].content}
                                </p>

                                <div className="flex flex-col items-center gap-2">
                                    <h3 className="text-xl font-heading font-bold text-primary">
                                        {testimonials[currentIndex].name}
                                    </h3>
                                    <p className="text-accent text-sm">
                                        {testimonials[currentIndex].role}
                                    </p>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-sm">★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 mt-12">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-12 h-12 rounded-full border border-white/10 hover:border-primary hover:bg-primary/10 text-white hover:text-primary transition-all flex items-center justify-center group"
                        aria-label="Previous testimonial"
                    >
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1)
                                    setCurrentIndex(index)
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-primary w-8'
                                    : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="w-12 h-12 rounded-full border border-white/10 hover:border-primary hover:bg-primary/10 text-white hover:text-primary transition-all flex items-center justify-center group"
                        aria-label="Next testimonial"
                    >
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                </div>
            </Container>
        </section>
    )
}
