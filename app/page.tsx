'use client'

import Header from '@/components/sections/Header'
import CarHero from '@/components/hero/CarHero'
import Mission from '@/components/sections/Mission'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      {/* Landmark: site-wide navigation */}
      <Header />

      <main className="relative overflow-x-hidden">
        {/* Hero – primary page heading lives inside CarHero as <h1> */}
        <CarHero />

        {/* About & Mission — introductory content */}
        <article aria-label="About CAD Concept 3D">
          <About />
          <Mission />
        </article>

        {/* Core services — most important for SEO keyword coverage */}
        <section aria-label="Our Services">
          <Services />
        </section>

        {/* Industries & social proof */}
        <section aria-label="Industries We Serve">
          <Industries />
        </section>

        <section aria-label="Client Testimonials">
          <Testimonials />
        </section>

        {/* Contact — conversion section */}
        <section aria-label="Contact Us" id="contact-section">
          <Contact />
        </section>
      </main>

      {/* Landmark: site-wide footer */}
      <Footer />
    </>
  )
}

