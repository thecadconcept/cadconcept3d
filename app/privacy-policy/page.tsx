'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'

const EFFECTIVE_DATE = 'January 1, 2025'
const COMPANY = 'CAD Concept 3D'
const EMAIL = 'thecadconcept3d@gmail.com'
const PHONE = '+91 8401440804'
const ADDRESS = 'Ahmedabad, Gujarat, India'

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        body: 'When you contact us, request a quote, or use our services, we may collect: full name and job title, company / organization name, business email address, phone number, project requirements and technical specifications, and communication history (emails, messages, calls).',
      },
      {
        subtitle: 'Technical & Usage Data',
        body: 'We automatically collect certain information when you visit our website, including IP address, browser type and version, pages visited and time spent, referring URLs, device type and operating system, and geographic location (city/country level).',
      },
      {
        subtitle: 'Files & Project Data',
        body: 'For service delivery purposes, you may share CAD files, 3D scan data, technical drawings, product samples, or specifications. These are treated as strictly confidential and are used solely to deliver the requested service.',
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Service Delivery',
        body: 'We use your information to process project inquiries and quotation requests, deliver 3D scanning, reverse engineering, CAD modeling, 3D printing, and product design services, communicate progress updates and project milestones, issue invoices and manage payments, and provide post-delivery technical support.',
      },
      {
        subtitle: 'Business Communication',
        body: 'With your consent, we may send service announcements, capability updates, technology insights relevant to your industry, and information about new offerings such as advanced materials, software integrations, or expanded scanning capabilities.',
      },
      {
        subtitle: 'Analytics & Improvement',
        body: 'We use aggregated, anonymized data to understand how visitors use our website, improve our service offerings, and enhance the user experience. No personally identifiable information is shared with third-party analytics platforms beyond standard session data.',
      },
    ],
  },
  {
    id: 'confidentiality',
    title: '3. Confidentiality & Intellectual Property',
    content: [
      {
        subtitle: 'Design & Technical Files',
        body: 'All CAD files, 3D scan data, drawings, and technical specifications you share with us remain your intellectual property. We will not reproduce, distribute, or commercialize your proprietary designs without explicit written authorization.',
      },
      {
        subtitle: 'Non-Disclosure Commitment',
        body: 'We treat all project details and business information as confidential. Our team members are bound by confidentiality obligations. We are happy to sign Non-Disclosure Agreements (NDAs) prior to project engagement upon request.',
      },
      {
        subtitle: 'Data Retention',
        body: 'Project files are retained only for the duration of the project and any agreed warranty or support period. After project completion, files are securely archived or deleted at your request within 30 days of written notice.',
      },
    ],
  },
  {
    id: 'data-sharing',
    title: '4. Data Sharing & Third Parties',
    content: [
      {
        subtitle: 'We Do Not Sell Your Data',
        body: 'We do not sell, rent, or trade your personal information or project data to any third party for commercial purposes, ever.',
      },
      {
        subtitle: 'Service Partners',
        body: 'We may share limited project information with trusted technology partners (such as material suppliers or specialist sub-contractors) strictly on a need-to-know basis and always under confidentiality agreements. You will be informed in advance if any third-party involvement is required for your project.',
      },
      {
        subtitle: 'Legal Requirements',
        body: 'We may disclose information if required by applicable Indian law, court order, or government authority. We will make reasonable efforts to notify you of such requirements unless legally prohibited from doing so.',
      },
    ],
  },
  {
    id: 'data-security',
    title: '5. Data Security',
    content: [
      {
        subtitle: 'Technical Safeguards',
        body: 'We implement industry-standard security measures including encrypted file transfer (HTTPS/TLS), password-protected project portals, access controls limiting data to authorized personnel only, and regular security reviews.',
      },
      {
        subtitle: 'Physical Security',
        body: 'Our workstations and file storage systems are secured in our Ahmedabad facility with restricted physical access. Remote work arrangements follow our internal data handling policy.',
      },
      {
        subtitle: 'Breach Notification',
        body: 'In the unlikely event of a data breach affecting your personal or project data, we will notify you promptly, describe the nature of the breach, and take immediate corrective action as required under applicable regulations.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '6. Cookies & Tracking',
    content: [
      {
        subtitle: 'What We Use',
        body: 'Our website uses cookies and similar technologies to remember your preferences, analyze traffic patterns via Google Analytics, and improve site performance. We do not use advertising or retargeting cookies.',
      },
      {
        subtitle: 'Your Control',
        body: 'You can control or disable cookies through your browser settings at any time. Disabling cookies may affect some functionality of the website but will not prevent you from accessing our services.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    content: [
      {
        subtitle: 'Access & Correction',
        body: 'You have the right to request a copy of the personal information we hold about you, correct any inaccurate or outdated information, and receive a clear explanation of how your data is being used.',
      },
      {
        subtitle: 'Deletion & Restriction',
        body: 'You may request deletion of your personal data at any time, subject to legal retention requirements. You may also request that we restrict processing of your data while you contest its accuracy or our lawful basis for processing.',
      },
      {
        subtitle: 'Opt-Out',
        body: 'You may opt out of marketing communications at any time by emailing us or clicking the unsubscribe link in any communication. Opting out will not affect service-related communications necessary to complete your project.',
      },
    ],
  },
  {
    id: 'contact-us',
    title: '8. Contact & Grievance',
    content: [
      {
        subtitle: 'Privacy Enquiries',
        body: `For any questions, concerns, or requests related to this Privacy Policy or your personal data, please contact us at: Email: ${EMAIL} | Phone: ${PHONE} | Address: ${ADDRESS}. We aim to respond to all privacy-related enquiries within 5 business days.`,
      },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.07),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 grid-pattern" />
        </div>
        <Container className="relative py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors text-sm font-mono tracking-widest uppercase mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-mono tracking-widest uppercase">Legal</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-accent text-lg max-w-2xl leading-relaxed">
              At {COMPANY}, we take your privacy and the confidentiality of your project data seriously.
              This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-accent/60 text-sm font-mono mt-4">
              Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last Updated: {EFFECTIVE_DATE}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* ── Table of Contents ───────────────────────────────────────────── */}
      <Container className="py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface-50 border border-primary/10 rounded-2xl p-6 md:p-8"
        >
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-primary mb-4">
            Table of Contents
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {sections.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 text-accent hover:text-primary transition-colors text-sm py-1.5 group"
              >
                <span className="text-primary/40 font-mono text-xs group-hover:text-primary transition-colors">
                  0{i + 1}
                </span>
                {section.title.replace(/^\d+\.\s/, '')}
              </a>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* ── Sections ────────────────────────────────────────────────────── */}
      <Container className="pb-24">
        <div className="max-w-4xl">
          {sections.map((section, sIdx) => (
            <motion.div
              key={section.id}
              id={section.id}
              custom={sIdx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mb-14 scroll-mt-24"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-mono text-xs font-bold">
                    {String(sIdx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-white">
                  {section.title.replace(/^\d+\.\s/, '')}
                </h2>
              </div>

              {/* Subsections */}
              <div className="pl-0 md:pl-14 space-y-6">
                {section.content.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    custom={iIdx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-surface-50 border border-white/5 rounded-xl p-5 md:p-6 hover:border-primary/20 transition-colors"
                  >
                    <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-primary mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-accent leading-relaxed text-sm md:text-base">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Section divider */}
              {sIdx < sections.length - 1 && (
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
              )}
            </motion.div>
          ))}

          {/* ── Contact CTA ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 md:p-10"
          >
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
              Questions about this policy?
            </h3>
            <p className="text-accent mb-6 max-w-xl">
              We are committed to transparent data practices. If you have any questions or want to exercise your rights, please reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Email Us
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ── Minimal Footer ──────────────────────────────────────────────── */}
      <div className="border-t border-primary/10 bg-surface-50">
        <Container className="py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-accent/60 text-xs">
          <span>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </div>
  )
}
