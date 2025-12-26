'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import CountUp from '@/components/ui/CountUp'

export default function Mission() {
    return (
        <section className="relative min-h-[80vh] bg-background flex items-center py-20 overflow-hidden">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="relative z-10 space-y-8">
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
                            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md border-l-2 border-primary/30 pl-6"
                        >
                            To excel at complete product development by designing, engineering, and manufacturing composite products at an unrivaled pace and quality.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex gap-8 mt-8 text-sm font-mono text-gray-500">
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

                    {/* Right: 3D Visual */}
                    <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl group">

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

                        <video
                            className="relative w-full h-full object-cover z-0"
                            autoPlay
                            loop
                            muted
                            playsInline
                        // poster="/images/mission-placeholder.jpg"
                        >
                            <source src="/Video/reverse-engineering.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Decorative Corner Text */}
                        <div className="absolute bottom-6 right-6 z-20 font-mono text-xs text-primary/70 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            FIG 2.4 - HULL_GEO
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
