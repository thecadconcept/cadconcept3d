'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Image from 'next/image'



const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
]



export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <footer
      ref={ref}
      className="relative border-t border-primary/20 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <Container className="relative py-12">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-6 group cursor-pointer"
              whileHover="hover"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center overflow-hidden"
                variants={{
                  hover: { scale: 1.1 }
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="CAD Concept Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
                CAD<span className="text-primary">Concept</span> 3D
              </h3>
            </motion.div>
            <p className="text-accent mb-6 leading-relaxed">
              Precision reverse engineering and scan to CAD solutions for
              manufacturing excellence.
            </p>
            <MagneticButton>
              <Button
                variant="primary"
                className="rounded-full shadow-glow"
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) {
                    const offset = 80
                    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset
                    window.scrollTo({ top: pos, behavior: 'smooth' })
                  }
                }}
              >
                Get Started
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:pl-16"
          >
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-6 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-accent hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-6 text-primary">
              Contact
            </h4>
            <ul className="space-y-3 mb-8 text-accent">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">@</span>
                </div>
                <a href="mailto:thecadconcept3d@gmail.com" className="hover:text-primary transition-colors">
                  thecadconcept3d@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">📞</span>
                </div>
                <a href="tel:+918401440804" className="hover:text-primary transition-colors">
                  +91 8401440804
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">📍</span>
                </div>
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>

          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-accent text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} CAD Concept. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer >
  )
}

