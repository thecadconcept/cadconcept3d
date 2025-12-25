'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollY } = useScroll()

  // Optimized scroll detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  })

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScrollSpy = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = navItems.map(item => item.href.replace('#', ''))

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // Improved detection logic
            if (rect.top <= 200 && rect.bottom >= 100) {
              setActiveSection(section)
              break // Stop checking once we find the top-most active section
            }
          }
        }
      }, 100)
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollSpy)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    setActiveSection(targetId)
    setIsMobileMenuOpen(false)

    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80 // Slightly less offset for better fit
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.nav
          className={`relative rounded-full transition-all duration-500 mx-auto max-w-7xl ${isScrolled
              ? 'bg-background/70 backdrop-blur-md border border-electric-blue/20 shadow-lg shadow-electric-blue/5'
              : 'bg-transparent border border-transparent'
            }`}
        >
          <div className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-2'
            }`}>
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group relative z-50"
              whileHover="hover"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue/20 to-purple-500/20 border border-electric-blue/50 flex items-center justify-center overflow-hidden"
                variants={{
                  hover: { rotate: 180, borderRadius: "50%" }
                }}
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                <div className="w-4 h-4 bg-electric-blue rounded-sm transform rotate-45 group-hover:bg-white transition-colors duration-300" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-tight leading-none text-white">
                  CAD<span className="text-electric-blue">Concept</span>
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 block ${isActive ? 'text-background' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-electric-blue rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </motion.a>
                  </li>
                )
              })}
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <MagneticButton>
                  <motion.button
                    className="px-6 py-2.5 bg-transparent border border-electric-blue/30 text-electric-blue font-medium rounded-full text-sm hover:bg-electric-blue hover:text-background transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Quote
                  </motion.button>
                </MagneticButton>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-white block origin-center transition-transform"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-0.5 bg-white block transition-opacity"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-white block origin-center transition-transform"
                  />
                </div>
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/90 lg:hidden flex flex-col justify-center items-center"
          >
            <nav className="w-full max-w-sm px-6">
              <ul className="space-y-4 flex flex-col items-center">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="w-full"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block text-3xl font-heading font-bold text-center py-2 transition-colors duration-300 ${activeSection === item.href.replace('#', '')
                          ? 'text-electric-blue'
                          : 'text-zinc-500 hover:text-white'
                        }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 flex justify-center"
              >
                <button className="px-8 py-3 bg-electric-blue text-background font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all transform hover:-translate-y-1">
                  Get Started Project
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

