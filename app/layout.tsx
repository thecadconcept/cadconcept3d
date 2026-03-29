import type { Metadata } from 'next'
import { Inter, Manrope, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ContentProtection from '@/components/ContentProtection'
import { localBusinessSchema, organizationSchema, serviceListSchema } from '@/components/seo/schemas'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

// ─── Site constants ───────────────────────────────────────────────────────────
const SITE_URL = 'https://cadconcept3d.com'   // ← update to your live domain
const OG_IMAGE = `${SITE_URL}/og-image.jpg`   // ← add a 1200×630 image to /public

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'CAD Concept 3D | Reverse Engineering & 3D Scanning — Ahmedabad',
    template: '%s | CAD Concept 3D',
  },

  description:
    'CAD Concept 3D delivers precision reverse engineering, 3D scanning, scan-to-CAD, 3D printing, and product design services in Ahmedabad, India — trusted by global manufacturing clients.',

  keywords: [
    // Local Ahmedabad / India
    'CAD services Ahmedabad',
    'reverse engineering Ahmedabad',
    '3D scanning Ahmedabad',
    'scan to CAD Ahmedabad',
    '3D printing Ahmedabad',
    'product design Ahmedabad',
    'CAD modeling Gujarat',
    'engineering services Ahmedabad',
    'industrial 3D scanning India',
    // International / industry
    'reverse engineering services',
    'scan to CAD services',
    '3D scanning for manufacturing',
    'industrial 3D printing services',
    'product design and development',
    'CAD conversion services',
    'point cloud to CAD',
    'SOLIDWORKS reverse engineering',
    'precision engineering services',
    'CAD Concept 3D',
  ],

  authors: [{ name: 'CAD Concept 3D', url: SITE_URL }],
  creator: 'CAD Concept 3D',
  publisher: 'CAD Concept 3D',

  // ── Canonical + hreflang ──────────────────────────────────────────────────
  alternates: {
    canonical: '/',
    languages: {
      'en':      '/',
      'en-IN':   '/',
      'x-default': '/',
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_IN'],
    url: SITE_URL,
    siteName: 'CAD Concept 3D',
    title: 'CAD Concept 3D | Reverse Engineering & 3D Scanning Services',
    description:
      'Precision reverse engineering, 3D scanning, CAD modeling, 3D printing, and product design — Ahmedabad, India. Serving global manufacturing clients.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'CAD Concept 3D — Reverse Engineering & 3D Scanning Services, Ahmedabad',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'CAD Concept 3D | Reverse Engineering & 3D Scanning — Ahmedabad',
    description:
      'Precision reverse engineering, 3D scanning, CAD modeling, and 3D printing services. Ahmedabad, India.',
    images: [OG_IMAGE],
    creator: '@cadconcept3d',
  },

  // ── Crawler directives ────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  // ── Search Console verification ───────────────────────────────────────────
  // verification: { google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN' },

  category: 'Engineering & Manufacturing Services',
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ── Google Analytics ──────────────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K2D06323Z1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K2D06323Z1');
          `}
        </Script>

        {/* ── Structured Data / JSON-LD ─────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
        />
      </head>

      <body className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ContentProtection />
        <CustomCursor />
        <ScrollProgress />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  )
}
