'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'

const services = [
    {
        title: 'Reverse Engineering',
        description: 'Converting physical parts into precise digital 3D parametric CAD models.',
        details: [
            'High-precision surface reconstruction from scan data.',
            'Parametric modeling for editable CAD history (STEP, IGES, XT).',
            'Design optimization for manufacturing.',
            'Legacy part restoration and digital archiving.',
            'Output compatible with SolidWorks, Catia, NX, and Fusion 360.'
        ],
        icon: '🔄',
    },
    {
        title: '3D Scanning',
        description: 'High-accuracy laser and structured light scanning for complex geometries.',
        details: [
            'Metrology-grade accuracy down to 0.02mm.',
            'Portable scanning solutions for on-site data acquisition.',
            'Color texture mapping for visual assets.',
            'Large-volume scanning for automotive and industrial structures.',
            'Non-contact measurement for delicate or complex surfaces.'
        ],
        icon: '📡',
    },
    {
        title: '3D Printing',
        description: 'Rapid prototyping and additive manufacturing solutions.',
        details: [
            'FDM, SLA, and SLS printing technologies.',
            'Functional prototyping with engineering-grade materials.',
            'Low-volume batch production.',
            'Complex geometry fabrication impossible with traditional machining.',
            'Rapid turnaround times for urgent project needs.'
        ],
        icon: '🖨️',
    },
    {
        title: 'Product Design & Development',
        description: 'End-to-end product engineering from concept to manufacturing.',
        details: [
            'Conceptual design and industrial styling.',
            'Mechanical engineering and DFM (Design for Manufacturing).',
            'Finite Element Analysis (FEA) for structural validation.',
            'Mold flow analysis and tooling design.',
            'Prototype testing and iteration cycles.'
        ],
        icon: '💡',
    },
    {
        title: 'Computer-Aided Inspection',
        description: 'Metrology-grade validation comparing scan data to CAD models.',
        details: [
            'Color map deviation analysis.',
            'GD&T (Geometric Dimensioning and Tolerancing) verification.',
            'First Article Inspection (FAI) reporting.',
            'Wear and tear analysis for tooling maintenance.',
            'Automated inspection pipelines.'
        ],
        icon: '🔍',
    },
    {
        title: 'Scan To BIM',
        description: 'Creating Building Information Models from 3D scan data.',
        details: [
            'As-built documentation for architecture and construction.',
            'LOD 200 to LOD 500 modeling standards.',
            'MEP (Mechanical, Electrical, Plumbing) mapping.',
            'Clash detection and renovation planning.',
            'Virtual tours and digital twin creation.'
        ],
        icon: '🏗️',
    },
]

export default function Services() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    }

    return (
        <section
            ref={ref}
            id="services"
            className="relative py-10 md:py-16"
        >
            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-primary font-mono tracking-widest text-sm uppercase mb-4">
                        Our Expertise
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white uppercase">
                        Services
                    </h2>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            variants={itemVariants}
                            onClick={() => setSelectedService(service)}
                        />
                    ))}
                </motion.div>
            </Container>

            {/* Service Details Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedService(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-white/10 p-8 md:p-10 rounded-2xl max-w-2xl w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-5xl">{selectedService.icon}</span>
                                <h3 className="text-3xl font-bold text-white font-heading">{selectedService.title}</h3>
                            </div>

                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                {selectedService.description}
                            </p>

                            <div className="space-y-3">
                                <h4 className="text-primary font-mono text-xs tracking-widest uppercase mb-2">Key Features</h4>
                                <ul className="space-y-2">
                                    {selectedService.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-400">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={() => setSelectedService(null)} // Or link to contact page
                                    className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full transition-colors font-mono text-sm uppercase tracking-wide"
                                >
                                    Close Details
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

function ServiceCard({ service, variants, onClick }: { service: any, variants: any, onClick: () => void }) {
    return (
        <motion.div
            variants={variants}
            onClick={onClick}
            className="group relative p-8 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
            whileHover={{ y: -5 }}
            layoutId={`service-card-${service.title}`} // Optional: for shared element transition if desired
        >
            <div className="mb-6 flex items-center justify-between">
                <span className="text-4xl">{service.icon}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
            </p>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
        </motion.div>
    )
}
