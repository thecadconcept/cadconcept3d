'use client'

import Header from '@/components/sections/Header'
import CarHero from '@/components/hero/CarHero'
import Mission from '@/components/sections/Mission'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <CarHero />
      <About />
      <Mission />
      <Services />
      <Industries />
      <Contact />
      <Footer />
    </main>
  )
}

