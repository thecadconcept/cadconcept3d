'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const socialLinks = [
  { name: 'LinkedIn', icon: 'in', href: '#' },
  { name: 'Twitter', icon: 'tw', href: '#' },
  { name: 'Email', icon: '@', href: 'mailto:info@cadconcept.com' },
]

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Our Process', href: '#process' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
]

const services = [
  '3D Scanning',
  'Reverse Engineering',
  'CAD Conversion',
  'Quality Validation',
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
      id="contact"
      className="relative border-t border-electric-blue/20 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-metallic-silver flex items-center justify-center glow-effect">
                <span className="text-background font-bold text-lg font-heading">CC</span>
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-electric-blue">
                CAD Concept
              </h3>
            </div>
            <p className="text-metallic-silver mb-6 leading-relaxed">
              Precision reverse engineering and scan to CAD solutions for
              manufacturing excellence.
            </p>
            <MagneticButton>
              <button className="px-6 py-3 bg-electric-blue text-background font-bold uppercase tracking-wider rounded-full text-sm hover:bg-opacity-90 transition-all glow-effect">
                Get Started
              </button>
            </MagneticButton>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-6 text-electric-blue">
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
                    className="text-metallic-silver hover:text-electric-blue transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-electric-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-6 text-electric-blue">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="text-metallic-silver flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                  {service}
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
            <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-6 text-electric-blue">
              Contact
            </h4>
            <ul className="space-y-3 mb-8 text-metallic-silver">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-electric-blue/30 flex items-center justify-center">
                  <span className="text-electric-blue text-xs">@</span>
                </div>
                <a href="mailto:info@cadconcept.com" className="hover:text-electric-blue transition-colors">
                  info@cadconcept.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-electric-blue/30 flex items-center justify-center">
                  <span className="text-electric-blue text-xs">📞</span>
                </div>
                <a href="tel:+15551234567" className="hover:text-electric-blue transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-electric-blue/30 flex items-center justify-center">
                  <span className="text-electric-blue text-xs">📍</span>
                </div>
                <span>123 Engineering St, Tech City, TC 12345</span>
              </li>
            </ul>

            <div>
              <h5 className="font-heading text-sm font-bold uppercase tracking-wide mb-4 text-electric-blue">
                Follow Us
              </h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-electric-blue/30 bg-background/50 backdrop-blur-sm flex items-center justify-center text-electric-blue hover:border-electric-blue hover:bg-electric-blue/10 transition-all group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-sm font-bold group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent mb-8"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-metallic-silver text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} CAD Concept. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-electric-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-electric-blue transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

