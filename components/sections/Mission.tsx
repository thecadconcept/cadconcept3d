'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import CountUp from '@/components/ui/CountUp'

export default function Mission() {
    return (
        <section className="relative h-screen flex items-center overflow-hidden">

            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/Video/reverse-engineering.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/70 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-black/50 to-transparent z-10" />
            </div>

            <Container className="relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-primary font-mono tracking-widest text-sm uppercase mb-4">
                                Our Mission
                            </p>
                            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white leading-tight">
                                Excel. <br />
                                Exceed. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                    Expand.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-md border-l-2 border-primary/30 pl-6"
                        >
                            To excel at complete product development by designing, engineering, and manufacturing composite products at an unrivaled pace and quality.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex gap-8 mt-8 text-sm font-mono text-gray-400">
                                <div>
                                    <span className="block text-white text-2xl font-bold">
                                        <CountUp to={1} pad={2} className="inline-block" />
                                    </span>
                                    <span>DESIGN</span>
                                </div>
                                <div>
                                    <span className="block text-white text-2xl font-bold">
                                        <CountUp to={2} pad={2} className="inline-block" />
                                    </span>
                                    <span>ENGINEER</span>
                                </div>
                                <div>
                                    <span className="block text-white text-2xl font-bold">
                                        <CountUp to={3} pad={2} className="inline-block" />
                                    </span>
                                    <span>BUILD</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side is intentionally empty to let video show, or we can center content. 
                        User asked for "full section", keeping text left aligned over background looks premium. */}
                    <div className="hidden lg:block"></div>

                </div>
            </Container>

            {/* Decorative Corner Text */}
            <div className="absolute bottom-6 right-6 z-20 font-mono text-xs text-primary/70 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                FIG 2.4 - HULL_GEO
            </div>
        </section>
    )
}
