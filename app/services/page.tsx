'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fadeUp, staggerContainer, slideFromLeft, slideFromRight } from '@/lib/animations'
import { SERVICES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

const SERVICE_IMAGES: Record<string, string> = {
  search: '/Feasibility.jpg',
  compass: '/Design.jpg',
  package: '/Furniture.jpg',
  gantt: '/Management.jpg',
}

function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    

        <section className="relative overflow-hidden pt-32 pb-16 bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]">
          {/* BG editorial text */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(100px, 18vw, 220px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {title}
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2 text-xs font-sans text-[#A0AEC0]"
            >
              <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
              <span>/</span>
              <span className="text-[#135B34]">{title}</span>
            </motion.div>

            {/* Title row */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[#135B34]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Our Services
                  </span>
                </div>
                <h1
                  className="leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 96px)',
                    fontWeight: 700,
                  }}
                >
                  End-to-End<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Solutions
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  From feasibility to project delivery, we provide comprehensive solutions
                  built on decades of expertise across multiple sectors.
                </p>
                {/* Services count badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#135B34]/25 bg-[#F0F7F4] px-4 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#135B34]" />
                  <span className="text-xs font-semibold text-[#135B34] font-sans">
                    4 Core Services
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, #135B34, rgba(19,91,52,0.1), transparent)' }}
            />
          </div>
        </section>

  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="End-to-end solutions from feasibility to project delivery, built on decades of expertise."
      />

      {/* Services Detail */}
      <section className="bg-gradient-to-br from-[#F0F7F4] via-white to-[#F7F9FA] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {SERVICES.map((service, i) => {
            const serviceImage = SERVICE_IMAGES[service.icon as keyof typeof SERVICE_IMAGES]
            const isReversed = i % 2 === 1
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className={`flex flex-col gap-12 py-16 lg:items-center ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } ${i < SERVICES.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
              >
                {/* Visual */}
                <motion.div
                  variants={isReversed ? slideFromRight : slideFromLeft}
                  className="lg:w-1/2"
                >
                  <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-lg transition-all duration-500 hover:border-[#135B34]/50 hover:shadow-xl">
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      priority={i === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-white/30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#135B34]/0 via-[#135B34]/0 to-[#135B34]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <span className="font-display text-7xl font-bold text-[#135B34] drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:text-[#D4AF37] md:text-8xl">
                        {service.step}
                      </span>
                      <div className="rounded-full border border-[#E2E8F0] bg-white/90 px-4 py-2 backdrop-blur-sm transition-all duration-500 group-hover:border-[#135B34]/50 hover:bg-[#F0F7F4]">
                        <span className="text-sm font-semibold text-[#2D3748] font-sans">
                          {service.title}
                        </span>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full bg-[#135B34]/20 blur-2xl transition-all duration-500 group-hover:h-24 group-hover:w-24 group-hover:bg-[#D4AF37]/40" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={isReversed ? slideFromLeft : slideFromRight}
                  className="lg:w-1/2"
                >
                  <span className="mb-2 inline-block font-mono text-sm text-[#135B34] font-sans">
                    Step {service.step}
                  </span>
                  <h2 className="mb-4 font-display text-3xl font-bold text-[#2D3748] md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-base leading-relaxed text-[#4A5568] font-sans">
                    {service.description}
                  </p>
                  <ul className="mb-8 space-y-2">
                    {[
                      'Comprehensive analysis & reporting',
                      'Industry best practices',
                      'Sustainability-focused approach',
                      'Expert team delivery',
                    ].map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-[#2D3748] font-sans">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#135B34]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#135B34] px-6 py-3 text-sm font-sans font-semibold text-white transition-all hover:bg-[#0f4728] hover:shadow-lg"
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #135B34, #1a8a4c)' }}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
            Ready to transform your project?
          </h2>
          <p className="mb-8 text-[#F0F7F4] font-sans">
            Let us know about your vision and we will find the best path to make it reality.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-sans font-semibold text-[#135B34] transition-all hover:bg-[#F0F7F4] hover:shadow-lg"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
