'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { PARTNERS } from '@/lib/constants'

interface Partner {
  id: number
  firstName: string
  lastName: string
  company: string
  logo?: string
  position: string
  role: string
  category: string
  image?: string
  description: string
  email: string
  phone: string
  specialization: string
}

const CATEGORY_COLORS: Record<string, string> = {
  'Media & Communications': '#135B34',
  'Engineering & Construction': '#1a8a4c',
  'Pharmaceutical & Biotech': '#D4AF37',
}

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#135B34'
}

function PartnerSlide({ partner, isActive }: { partner: Partner; isActive: boolean }) {
  const categoryColor = getCategoryColor(partner.category)

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={partner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full max-w-4xl px-6 sm:px-8 md:px-12">
            {/* Card Container */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl backdrop-blur-2xl border"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,249,250,0.98) 100%)`,
                borderColor: categoryColor + '30',
                boxShadow: `0 25px 90px ${categoryColor}20, inset 0 1px 0 rgba(255,255,255,0.8)`,
              }}
            >
              {/* Gradient accent top */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${categoryColor}, ${categoryColor}, transparent)`,
                }}
              />

              {/* Main content grid */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left side - Image & Logo */}
                <div
                  className="relative p-6 md:p-8 flex flex-col items-center justify-center min-h-[360px]"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}08 0%, ${categoryColor}03 100%)`,
                    borderRight: `1px solid ${categoryColor}20`,
                  }}
                >
                  {/* Background elements */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${categoryColor}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-5">
                    {/* Company Logo */}
                    {partner.logo || partner.company ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="relative"
                      >
                        <div
                          className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-2xl border-2"
                          style={{
                            background: `linear-gradient(135deg, ${categoryColor}15 0%, ${categoryColor}05 100%)`,
                            borderColor: categoryColor + '40',
                            boxShadow: `0 20px 60px ${categoryColor}25`,
                          }}
                        >
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={partner.company}
                              className="h-20 w-20 md:h-28 md:w-28 object-contain"
                            />
                          ) : (
                            <span
                              className="font-bold font-display text-white text-center text-4xl md:text-5xl"
                              style={{
                                color: categoryColor,
                              }}
                            >
                              {partner.company.split(' ').slice(0, 2).map(word => word[0]).join('')}
                            </span>
                          )}
                        </div>

                        {/* Decorative ring */}
                        <div
                          className="absolute -inset-6 rounded-2xl border"
                          style={{
                            borderColor: categoryColor + '20',
                            opacity: 0.5,
                          }}
                        />
                      </motion.div>
                    ) : null}

                    {/* Company Name */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-center"
                    >
                      <h3
                        className="text-lg md:text-2xl font-bold font-display mb-2"
                        style={{ color: categoryColor }}
                      >
                        {partner.company}
                      </h3>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                        style={{
                          background: `${categoryColor}15`,
                          color: categoryColor,
                          border: `1px solid ${categoryColor}30`,
                        }}
                      >
                        {partner.category}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right side - Consultant Info */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  {/* Top content */}
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="space-y-5"
                  >
                    {/* Consultant Photo */}
                    

                    <div
                        className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-full overflow-hidden"
                        style={{
                            background: '#135B34',
                    
                            transition: 'box-shadow 0.4s ease',
                        }}
                    >
                        {partner.image && (
                        <img
                            src={partner.image}
                            alt="photo"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                        ) }
                    </div>
                    {/* Name & Title */}
                    <div>
                      <p
                        className="text-sm font-semibold uppercase tracking-[0.15em] mb-2"
                        style={{ color: categoryColor }}
                      >
                        Lead Consultant
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#2D3748] mb-2 font-display">
                        {partner.firstName}
                        <br />
                        <span style={{ color: categoryColor }}>
                          {partner.lastName}
                        </span>
                      </h2>
                      <p
                        className="text-base font-semibold uppercase tracking-wider"
                        style={{ color: categoryColor }}
                      >
                        {partner.role}
                      </p>
                    </div>

                    {/* Specialization */}
                    <div
                      className="inline-flex items-center  px-4 py-3 rounded-xl"
                      style={{
                        background: `${categoryColor}10`,
                        border: `1px solid ${categoryColor}30`,
                      }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{ color: categoryColor }}
                      >
                        ✦
                      </span>
                      <span
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{ color: categoryColor }}
                      >
                        {partner.specialization}
                      </span>
                    </div>

                    {/* Domain/Description */}
                    <p className="text-sm leading-relaxed text-[#4A5568]">
                      {partner.description}
                    </p>
                  </motion.div>

                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-8"
                  >
                    
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PartnersSliderSection() {
  const [current, setCurrent] = useState(0)
  const partners = (PARTNERS as Partner[])

  const next = () => setCurrent((current + 1) % partners.length)
  const prev = () => setCurrent((current - 1 + partners.length) % partners.length)

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-[#135B34]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
              Strategic Partners
            </span>
            <span className="block h-px w-8 bg-[#135B34]" />
          </div>
          <h2
            className="leading-[0.95] text-[#2D3748] font-display mb-4"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
            }}
          >
            Our <span
              style={{
                background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Consulting Partners
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-sm leading-relaxed text-[#4A5568] font-sans">
            Industry-leading consultants and partner companies that bring expertise and innovation to our projects.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative h-[420px] sm:h-[450px] md:h-[480px] rounded-3xl overflow-hidden">
          {/* Slides */}
          {partners.map((partner, idx) => (
            <PartnerSlide key={partner.id} partner={partner} isActive={idx === current} />
          ))}

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 text-white transition-all duration-300 hover:shadow-lg"
            style={{
              background: '#135B34',
              borderColor: '#1a8a4c',
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 text-white transition-all duration-300 hover:shadow-lg"
            style={{
              background: '#135B34',
              borderColor: '#1a8a4c',
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {partners.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === current ? 32 : 12,
                  height: 12,
                  background: idx === current ? '#135B34' : '#135B34' + '40',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA 
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:text-[#135B34] hover:shadow-lg text-[#135B34] font-sans"
          >
            View All Partners <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>*/}
      </div>
    </section>
  )
}

export { PartnersSliderSection }
