/**
 * Structured Data Schemas for CAD Concept 3D
 *
 * Three schemas are exported and injected in app/layout.tsx:
 *  1. localBusinessSchema  — targets Ahmedabad local search (Google Maps / Local Pack)
 *  2. organizationSchema   — targets international brand recognition
 *  3. serviceListSchema    — targets international service-intent queries
 */

const SITE_URL = 'https://cadconcept3d.com'
const LOGO_URL = `${SITE_URL}/logo.png`

// ─── 1. LocalBusiness ─────────────────────────────────────────────────────────
// Targets: "3D scanning Ahmedabad", "reverse engineering near me", etc.
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'CAD Concept 3D',
  alternateName: 'CAD Concept',
  description:
    'CAD Concept 3D provides precision reverse engineering, 3D scanning, scan-to-CAD conversion, 3D printing, and product design & development services in Ahmedabad, Gujarat, India.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 200,
    height: 200,
  },
  image: `${SITE_URL}/og-image.jpg`,
  telephone: '+91-8401440804',
  email: 'thecadconcept3d@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // Approximate coordinates for Ahmedabad city center — update with exact address coords
    latitude: 23.0225,
    longitude: 72.5714,
  },
  areaServed: [
    { '@type': 'City',    name: 'Ahmedabad' },
    { '@type': 'State',   name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Australia' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'INR, USD',
  paymentAccepted: 'Bank Transfer, UPI, PayPal',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering & CAD Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Scanning'              } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reverse Engineering'       } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Scan to CAD Conversion'    } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Printing'               } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Product Design & Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CAD Modeling'              } },
    ],
  },
  sameAs: [
    'https://www.instagram.com/cadconcept3d',
    // Add LinkedIn, Facebook, etc. when available
  ],
}

// ─── 2. Organization ──────────────────────────────────────────────────────────
// Targets: branded searches and international knowledge panel
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'CAD Concept 3D',
  alternateName: 'CADConcept3D',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 200,
    height: 200,
  },
  description:
    'A specialized B2B engineering services agency offering 3D scanning, reverse engineering, scan-to-CAD, 3D printing, and product design. Serving manufacturing clients globally from Ahmedabad, India.',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-8401440804',
      email: 'thecadconcept3d@gmail.com',
      areaServed: ['IN', 'US', 'GB', 'DE', 'AU'],
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  ],
  knowsAbout: [
    'CAD Modeling',
    'Reverse Engineering',
    '3D Scanning',
    'Scan to CAD',
    '3D Printing',
    'Product Design and Development',
    'SOLIDWORKS',
    'Point Cloud Processing',
    'Industrial Design',
    'Manufacturing Engineering',
  ],
  sameAs: [
    'https://www.instagram.com/cadconcept3d',
  ],
}

// ─── 3. Service List ──────────────────────────────────────────────────────────
// Targets: international service-intent queries per service type
export const serviceListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Engineering & CAD Services by CAD Concept 3D',
  description: 'Comprehensive list of engineering and CAD services offered by CAD Concept 3D',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/3d-scanning-ahmedabad`,
        name: '3D Scanning Services',
        alternateName: '3D Scanning Ahmedabad',
        description:
          'High-accuracy industrial 3D scanning services using professional equipment. Capture complex geometries for reverse engineering, quality inspection, and digital archiving.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Industrial 3D Scanning',
        areaServed: ['Ahmedabad', 'Gujarat', 'India', 'International'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/reverse-engineering-ahmedabad`,
        name: 'Reverse Engineering Services',
        alternateName: 'Reverse Engineering Ahmedabad',
        description:
          'Precision reverse engineering to convert physical parts into accurate CAD models. Ideal for legacy parts, tooling replicas, and design improvements.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Reverse Engineering',
        areaServed: ['Ahmedabad', 'Gujarat', 'India', 'International'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/scan-to-cad`,
        name: 'Scan to CAD Conversion',
        description:
          'Convert 3D scan data (point clouds / mesh) into precise, feature-rich CAD models compatible with SOLIDWORKS, AutoCAD, CATIA, and other major platforms.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Scan to CAD',
        areaServed: ['India', 'International'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/3d-printing-ahmedabad`,
        name: '3D Printing Services',
        alternateName: '3D Printing Ahmedabad',
        description:
          'Professional FDM and resin 3D printing for prototypes, functional parts, jigs, and fixtures. Fast turnaround with multiple material options.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: '3D Printing',
        areaServed: ['Ahmedabad', 'Gujarat', 'India'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/product-design-development`,
        name: 'Product Design & Development',
        description:
          'End-to-end product design and development services — from concept ideation and 3D modeling to prototype validation and manufacturing-ready drawings.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Product Design',
        areaServed: ['India', 'International'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/cad-modeling-services`,
        name: 'CAD Modeling Services',
        description:
          'Parametric and surface CAD modeling for complex industrial parts, assemblies, and consumer products using SOLIDWORKS, Fusion 360, and CATIA.',
        url: `${SITE_URL}/#services`,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'CAD Modeling',
        areaServed: ['India', 'International'],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
  ],
}
