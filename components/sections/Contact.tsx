'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Ahmedabad, Gujarat, India',
    link: '#',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 8401440804',
    link: 'tel:+918401440804',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'thecadconcept3d@gmail.com',
    link: 'mailto:thecadconcept3d@gmail.com',
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create FormData object for submission (simulation)
    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('message', formData.message)
    if (file) {
      data.append('file', file)
    }

    console.log('Submitting Form:', Object.fromEntries(data.entries()))
    if (file) console.log('File:', file.name)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setFile(null)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

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
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen py-16 md:py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest gradient-text mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-accent max-w-2xl mx-auto">
            Ready to transform your physical parts into precision CAD models?
            Let&apos;s discuss your project.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide mb-6 text-primary">
                Contact Information
              </h3>
              <p className="text-accent mb-8 leading-relaxed">
                We&apos;re here to help you with all your reverse engineering and
                scan to CAD needs. Reach out to us through any of the following
                channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="flex items-start gap-4 p-6 border border-primary/30 bg-background/50 backdrop-blur-sm hover:border-primary transition-all duration-300 group rounded-lg"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.3 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-primary mb-1 font-medium">
                      {info.label}
                    </h4>
                    <p className="text-lg text-foreground group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-4 text-primary">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm flex items-center justify-center text-primary hover:border-primary hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-bold">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 border border-primary/30 bg-background/50 backdrop-blur-sm rounded-xl"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wide text-primary mb-2 font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary-900/80 border border-primary/30 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all rounded-md"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wide text-primary mb-2 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary-900/80 border border-primary/30 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all rounded-md"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm uppercase tracking-wide text-primary mb-2 font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary-900/80 border border-primary/30 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all rounded-md"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <label
                  htmlFor="file"
                  className="block text-sm uppercase tracking-wide text-primary mb-2 font-medium"
                >
                  Project File (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden" // Hiding the default input
                  />
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed border-primary/30 rounded-md cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center p-4"
                  >
                    {file ? (
                      <div className="flex items-center gap-2 text-primary">
                        <span className="text-xl">📄</span>
                        <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-accent">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl mb-1 text-primary/50">📂</span>
                        <span className="text-sm text-accent">Click to upload CAD files or documents</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wide text-primary mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary-900/80 border border-primary/30 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all resize-none rounded-md"
                  placeholder="Tell us about your project..."
                />
              </div>

              <MagneticButton>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full shadow-glow"
                  variant='primary'
                  size='lg'
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </MagneticButton>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

