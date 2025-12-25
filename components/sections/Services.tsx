'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'

const services = [
    {
        title: 'Reverse Engineering',
        description: 'Converting physical parts into precise digital 3D parametric CAD models.',
        icon: '🔄',
    },
    {
        title: '3D Scanning',
        description: 'High-accuracy laser and structured light scanning for complex geometries.',
        icon: '📡',
    },
    {
        title: '3D Printing',
        description: 'Rapid prototyping and additive manufacturing solutions.',
        icon: '🖨️',
    },
    {
        title: 'Product Design & Development',
        description: 'End-to-end product engineering from concept to manufacturing.',
        icon: '💡',
    },
    {
        title: 'Computer-Aided Inspection',
        description: 'Metrology-grade validation comparing scan data to CAD models.',
        icon: '🔍',
    },
    {
        title: 'Scan To BIM',
        description: 'Creating Building Information Models from 3D scan data.',
        icon: '🏗️',
    },
]

export default function Services() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })

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
            className="relative py-24"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent" />
            </div>

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
                        <ServiceCard key={index} service={service} variants={itemVariants} />
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

function ServiceCard({ service, variants }: { service: any, variants: any }) {
    return (
        <motion.div
            variants={variants}
            className="group relative p-8 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300"
            whileHover={{ y: -5 }}
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
