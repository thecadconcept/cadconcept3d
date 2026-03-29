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
    id: 'services-scope',
    title: '1. Services & Scope of Work',
    content: [
      {
        subtitle: 'Services Offered',
        body: `${COMPANY} provides B2B engineering and design services including: 3D Scanning (structured-light, laser, photogrammetry), Reverse Engineering, Scan-to-CAD conversion, 3D Printing (FDM and resin prototyping), CAD Modeling (parametric and surface modeling), and Product Design & Development. All services are provided exclusively to businesses, professionals, and institutions.`,
      },
      {
        subtitle: 'Project Scope Agreement',
        body: 'Every project commences with a mutually agreed Scope of Work (SOW) or quotation document. The SOW defines deliverables, timelines, file formats, accuracy requirements, and pricing. Work proceeds only after written confirmation (email acceptance is sufficient) by the client.',
      },
      {
        subtitle: 'Change Requests',
        body: 'Any modification to the agreed scope — including additional features, revised specifications, format changes, or extended iterations — constitutes a Change Request. Change Requests are assessed for additional cost and timeline impact and require written approval before implementation.',
      },
    ],
  },
  {
    id: 'quotation-payment',
    title: '2. Quotation, Pricing & Payment',
    content: [
      {
        subtitle: 'Quotations',
        body: 'All quotations are valid for 15 days from the date of issue unless otherwise stated. Pricing is project-specific and depends on complexity, turnaround time, material requirements, and software licensing. We reserve the right to revise a quotation if the scope of work changes significantly after assessment.',
      },
      {
        subtitle: 'Payment Terms',
        body: 'Standard payment terms are: 50% advance before project commencement, 50% balance upon delivery of final files. For high-value or multi-phase projects, milestone-based payment schedules will be specified in the SOW. Accepted payment methods include bank transfer (NEFT/RTGS/IMPS), UPI, and international wire transfer.',
      },
      {
        subtitle: 'Late Payments',
        body: 'Invoices unpaid beyond the agreed due date may attract a delay charge of 1.5% per month on the outstanding amount. We reserve the right to withhold delivery of final files until full payment is received. Repeated non-payment may result in suspension of services.',
      },
      {
        subtitle: 'Taxes',
        body: 'All quoted prices are exclusive of applicable GST (Goods and Services Tax) as per Indian tax law. GST will be charged at the applicable rate and shown separately on invoices. International clients may be subject to customs duties or import regulations in their respective jurisdictions.',
      },
    ],
  },
  {
    id: 'deliverables-ip',
    title: '3. Deliverables & Intellectual Property',
    content: [
      {
        subtitle: 'File Formats & Delivery',
        body: 'Deliverable file formats (e.g., STEP, IGES, STL, SolidWorks, Fusion 360, DWG/DXF) will be specified in the project SOW. Files are delivered digitally via secure transfer links, email, or shared drives. Physical samples or printed prototypes will be shipped via courier at the client\'s cost.',
      },
      {
        subtitle: 'Ownership of Deliverables',
        body: 'Upon receipt of full payment, the client receives full ownership of all final deliverable files created specifically for their project. Ownership transfers only after complete payment is received. We retain no rights to commercialize, resell, or redistribute client-specific designs.',
      },
      {
        subtitle: 'Our Proprietary Tools',
        body: `${COMPANY} retains ownership of all internally developed workflows, tools, scripts, templates, macros, and methodologies used in the production of deliverables. These remain the intellectual property of ${COMPANY} regardless of project completion or payment.`,
      },
      {
        subtitle: 'Portfolio & Showcase Rights',
        body: `We may showcase non-confidential project work in our portfolio, social media, or promotional materials. If you require that your project remain confidential and not be shared publicly, please notify us in writing before or at the time of project commencement. ${COMPANY} will honour all such confidentiality requests.`,
      },
    ],
  },
  {
    id: 'timelines-revisions',
    title: '4. Timelines, Revisions & Delivery',
    content: [
      {
        subtitle: 'Estimated Timelines',
        body: 'Project timelines are estimates based on the agreed scope and are stated in the SOW. Timelines begin only after receipt of advance payment and all required input materials (files, physical samples, reference data). Delays caused by the client, incomplete inputs, or third-party dependencies are not attributed to us.',
      },
      {
        subtitle: 'Revision Policy',
        body: 'Each project includes a defined number of revision rounds as specified in the SOW (typically 2–3 rounds). Revisions must be submitted in writing within 5 business days of receiving each deliverable. Requests beyond the included revision rounds are charged at our standard hourly or per-revision rate.',
      },
      {
        subtitle: 'Acceptance & Sign-Off',
        body: 'Deliverables are considered accepted when: the client provides written approval, the client uses the files in production or downstream workflows, or 7 business days pass after delivery without written objection. Accepted deliverables are considered final and billable.',
      },
    ],
  },
  {
    id: 'client-obligations',
    title: '5. Client Obligations',
    content: [
      {
        subtitle: 'Accuracy of Inputs',
        body: 'Clients are responsible for providing accurate, complete, and up-to-date input data including CAD files, reference drawings, physical parts, specifications, and project briefs. Errors or rework caused by inaccurate or incomplete inputs provided by the client may result in additional charges.',
      },
      {
        subtitle: 'Lawful Use',
        body: 'Clients represent and warrant that they have the legal right to share all input data and that the resulting deliverables will be used for lawful purposes only. We will not knowingly assist in projects that infringe third-party intellectual property rights, violate export control regulations, or are intended for illegal use.',
      },
      {
        subtitle: 'Timely Feedback',
        body: 'Clients agree to provide timely feedback, approvals, and inputs as required by the project schedule. Significant delays in client response (more than 10 business days without communication) may result in re-scheduling of the project and revised delivery timelines.',
      },
    ],
  },
  {
    id: 'confidentiality',
    title: '6. Confidentiality & NDA',
    content: [
      {
        subtitle: 'Mutual Confidentiality',
        body: 'Both parties agree to treat all shared project information, technical data, business information, and pricing as confidential. Neither party will disclose the other\'s confidential information to third parties without prior written consent, except as required by law.',
      },
      {
        subtitle: 'NDA on Request',
        body: `${COMPANY} is willing to sign a formal Non-Disclosure Agreement (NDA) prior to project commencement if required by the client. NDA requests should be submitted before any sensitive project information is shared. Standard projects are protected under the confidentiality provisions of these Terms.`,
      },
    ],
  },
  {
    id: 'liability-warranty',
    title: '7. Liability, Warranty & Disclaimer',
    content: [
      {
        subtitle: 'Accuracy Disclaimer',
        body: 'While we apply professional diligence and industry-standard techniques, all deliverables — particularly scan data, reverse-engineered models, and dimensional outputs — carry inherent measurement tolerances. Accuracy specifications will be stated in the SOW. We do not warrant zero-error precision beyond what is contractually specified.',
      },
      {
        subtitle: 'Fitness for Purpose',
        body: 'It is the client\'s responsibility to verify that deliverables meet their specific engineering, manufacturing, or regulatory requirements before use in production. We are not liable for losses arising from reliance on deliverables without adequate client-side verification.',
      },
      {
        subtitle: 'Limitation of Liability',
        body: `In no event shall ${COMPANY}\'s total liability exceed the total amount paid by the client for the specific project giving rise to the claim. We are not liable for indirect, consequential, incidental, or punitive damages, loss of revenue, loss of data, or business interruption.`,
      },
      {
        subtitle: 'Post-Delivery Warranty',
        body: 'We offer a 15-day post-delivery correction period for defects directly attributable to our work and within the agreed specifications. Warranty does not apply to changes in client requirements after delivery, misuse, or modifications made to files by the client.',
      },
    ],
  },
  {
    id: 'cancellation',
    title: '8. Cancellation & Termination',
    content: [
      {
        subtitle: 'Client Cancellation',
        body: 'If the client cancels a project after commencement, payment is due for all work completed to date, calculated as a proportion of the agreed project fee. The advance payment (50%) is non-refundable once work has begun. Cancellations must be communicated in writing.',
      },
      {
        subtitle: 'Our Right to Terminate',
        body: `${COMPANY} reserves the right to terminate a project engagement with written notice in cases of: non-payment, provision of fraudulent or unlawfully obtained inputs, violation of these Terms, or circumstances making project completion impossible (force majeure). In such cases, payment for completed work remains due.`,
      },
      {
        subtitle: 'Mutual Termination',
        body: 'Either party may terminate an ongoing engagement by providing 7 days written notice if the other party materially breaches these Terms and fails to remedy the breach within the notice period.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '9. Governing Law & Dispute Resolution',
    content: [
      {
        subtitle: 'Jurisdiction',
        body: 'These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Ahmedabad, Gujarat, India.',
      },
      {
        subtitle: 'Dispute Resolution Process',
        body: 'In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation within 30 days of written notice of the dispute. If negotiation fails, disputes will be referred to arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in Ahmedabad.',
      },
      {
        subtitle: 'International Clients',
        body: 'For clients outside India, the governing law remains Indian law. International commercial arbitration rules may be agreed upon mutually at the time of contract. Currency conversions for payments are calculated at the prevailing bank rate at the time of invoice.',
      },
    ],
  },
  {
    id: 'contact',
    title: '10. Contact & Acceptance',
    content: [
      {
        subtitle: 'Acceptance of Terms',
        body: 'By submitting a project inquiry, signing a quotation, making a payment, or sharing project files with us, you acknowledge that you have read, understood, and agreed to these Terms of Service.',
      },
      {
        subtitle: 'Contact Information',
        body: `For questions, disputes, or legal notices, please contact us at: Email: ${EMAIL} | Phone: ${PHONE} | Address: ${ADDRESS}. We will respond to all formal enquiries within 5 business days.`,
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

export default function TermsOfServicePage() {
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
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-accent text-lg max-w-2xl leading-relaxed">
              These terms govern the professional relationship between {COMPANY} and our clients.
              Please read them carefully before engaging our engineering and design services.
            </p>
            <p className="text-accent/60 text-sm font-mono mt-4">
              Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last Updated: {EFFECTIVE_DATE}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* ── Notice Banner ───────────────────────────────────────────────── */}
      <Container className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-5"
        >
          <span className="text-primary text-lg mt-0.5 flex-shrink-0">ℹ</span>
          <p className="text-accent/80 text-sm leading-relaxed">
            By submitting a project enquiry, signing a quotation, or making a payment, you accept these Terms of Service in full.
            If you do not agree, please refrain from engaging our services and contact us to discuss your requirements.
          </p>
        </motion.div>
      </Container>

      {/* ── Table of Contents ───────────────────────────────────────────── */}
      <Container className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
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
                  {String(i + 1).padStart(2, '0')}
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
              Questions about our terms?
            </h3>
            <p className="text-accent mb-6 max-w-xl">
              We believe in transparent business relationships. If you have any questions about these terms before engaging with us, please reach out — we are happy to clarify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Contact Us
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
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-primary">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </div>
  )
}
