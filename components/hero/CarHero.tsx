'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import TypewriterText from '@/components/ui/TypewriterText'

// Pure Three.js — no @react-three/fiber dependency, React 19 compatible
const Hero3D = dynamic(() => import('./Hero3d'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,229,255,0.12),transparent_38%),radial-gradient(circle_at_62%_55%,rgba(255,102,0,0.08),transparent_28%)]" />
    ),
})

export default function CarHero() {

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section id="home" className="relative w-full min-h-[100svh] bg-background overflow-hidden">

            {/* 3D Scene Layer */}
            <Hero3D />

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10 opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/20 to-background/80 pointer-events-none z-10" />

            {/* Content Layer */}
            <Container className="relative z-20 min-h-[100svh] flex flex-col justify-center pointer-events-none py-24">
                <div className="max-w-3xl pointer-events-auto">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-primary text-xs font-mono tracking-widest uppercase">Next-Gen</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-6 leading-tight tracking-tight">
                            Engineering  <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x">
                                <TypewriterText text="Excellence" delay={1000} speed={150} cursor={false} loop={true} />
                            </span>
                        </h1>
                        <p className="text-accent text-base sm:text-lg md:text-xl max-w-xl mb-8 sm:mb-10 leading-relaxed font-light">
                            From reality to digital precision—engineering high-accuracy CAD models and additive manufacturing solutions for next-generation industries.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <MagneticButton>
                                <Button
                                    size="lg"
                                    className="shadow-glow tracking-widest uppercase"
                                    onClick={scrollToContact}
                                >
                                    Work With Us
                                </Button>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Decorative Grid Lines */}
            <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />
            <div className="absolute top-32 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/30 to-transparent z-10" />

        </section>
    )
}
