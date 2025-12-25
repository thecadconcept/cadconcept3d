'use client'

import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Industries from '@/components/sections/Industries'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import TechnologyStack from '@/components/sections/TechnologyStack'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Process />
      <Industries />
      <WhyChooseUs />
      <TechnologyStack />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}

