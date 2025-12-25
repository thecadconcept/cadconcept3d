import type { Metadata } from 'next'
import { Inter, Manrope, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'CAD Concept - Reverse Engineering & Scan to CAD Solutions',
  description: 'From Physical Part to Precision CAD Model. Professional 3D scanning, reverse engineering, and scan to CAD conversion services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}

