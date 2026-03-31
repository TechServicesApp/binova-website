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
  const c = getCategoryColor(partner.category)
  const companyInitials = partner.company.split(' ').slice(0, 2).map(w => w[0]).join('')
  const consultantInitials = `${partner.firstName[0]}${partner.lastName[0]}`

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={partner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex items-start sm:items-center justify-center overflow-y-auto sm:overflow-visible"
        >
          <div className="w-full max-w-4xl px-3 xs:px-4 sm:px-8 md:px-12 py-4 sm:py-0">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl sm:rounded-3xl border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(247,249,250,0.99) 100%)`,
                borderColor: c + '30',
                boxShadow: `0 20px 70px ${c}18, inset 0 1px 0 rgba(255,255,255,0.8)`,
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, transparent, ${c}, ${c}, transparent)` }} />

              {/* ── MOBILE < sm : vertical stack ── */}
              <div className="sm:hidden flex flex-col">
                {/* Company header */}
                <div className="flex items-center gap-3 px-4 pt-6 pb-4"
                  style={{ borderBottom: `1px solid ${c}15` }}>
                  {/* Logo */}
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border-2 overflow-hidden"
                    style={{ background: `${c}12`, borderColor: `${c}35`, boxShadow: `0 6px 20px ${c}20` }}>
                    {partner.logo
                      ? <img src={partner.logo} alt={partner.company} className="h-10 w-10 object-contain" />
                      : <span className="font-bold text-xl font-display" style={{ color: c }}>{companyInitials}</span>
                    }
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold font-display truncate" style={{ color: c }}>{partner.company}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-0.5"
                      style={{ background: `${c}12`, color: c, border: `1px solid ${c}25` }}>
                      {partner.category}
                    </span>
                  </div>
                </div>

                {/* Consultant section */}
                <div className="flex items-start gap-3 px-4 py-4">
                  {/* Photo */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full overflow-hidden"
                    style={{
                      background: partner.image ? 'transparent' : `linear-gradient(135deg, ${c}, ${c}cc)`,
                      outline: `2px solid ${c}`,
                      outlineOffset: '3px',
                    }}>
                    {partner.image
                      ? <img src={partner.image} alt={`${partner.firstName} ${partner.lastName}`} className="h-full w-full object-cover object-top" />
                      : <span className="font-bold text-white text-lg font-display">{consultantInitials}</span>
                    }
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: c }}>Lead Consultant</p>
                    <h2 className="text-lg font-bold font-display text-[#2D3748] leading-tight">
                      {partner.firstName} <span style={{ color: c }}>{partner.lastName}</span>
                    </h2>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: c }}>{partner.role}</p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="px-4 pb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: `${c}10`, border: `1px solid ${c}28` }}>
                    <span className="font-bold" style={{ color: c }}>✦</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: c }}>{partner.specialization}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="px-4 pb-5 text-[11px] leading-relaxed text-[#4A5568]">
                  {partner.description}
                </p>
              </div>

              {/* ── SMALL TABLET sm–md : horizontal compact ── */}
              <div className="hidden sm:flex md:hidden flex-row">
                {/* Left — logo + company */}
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-7 w-48 flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${c}08, ${c}03)`, borderRight: `1px solid ${c}18` }}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 overflow-hidden"
                    style={{ background: `${c}12`, borderColor: `${c}35`, boxShadow: `0 10px 30px ${c}22` }}>
                    {partner.logo
                      ? <img src={partner.logo} alt={partner.company} className="h-16 w-16 object-contain" />
                      : <span className="font-bold text-3xl font-display" style={{ color: c }}>{companyInitials}</span>
                    }
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-bold font-display" style={{ color: c }}>{partner.company}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full inline-block mt-1.5"
                      style={{ background: `${c}12`, color: c, border: `1px solid ${c}25` }}>
                      {partner.category}
                    </span>
                  </div>
                </div>

                {/* Right — consultant */}
                <div className="flex-1 flex flex-col justify-center px-6 py-7 gap-3">
                  <div className="flex items-center gap-3">
                    {/* Photo */}
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full overflow-hidden"
                      style={{
                        background: partner.image ? 'transparent' : `linear-gradient(135deg, ${c}, ${c}cc)`,
                        outline: `2px solid ${c}`,
                        outlineOffset: '3px',
                      }}>
                      {partner.image
                        ? <img src={partner.image} alt={`${partner.firstName} ${partner.lastName}`} className="h-full w-full object-cover object-top" />
                        : <span className="font-bold text-white text-lg font-display">{consultantInitials}</span>
                      }
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: c }}>Lead Consultant</p>
                      <h2 className="text-lg font-bold font-display text-[#2D3748] leading-tight">
                        {partner.firstName} <span style={{ color: c }}>{partner.lastName}</span>
                      </h2>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: c }}>{partner.role}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg w-fit"
                    style={{ background: `${c}10`, border: `1px solid ${c}28` }}>
                    <span className="font-bold text-sm" style={{ color: c }}>✦</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: c }}>{partner.specialization}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#4A5568]">{partner.description}</p>
                </div>
              </div>

              {/* ── TABLET md–lg and DESKTOP ≥ lg : original 2-col ── */}
              <div className="hidden md:grid md:grid-cols-2 gap-0">
                {/* Left side — Logo + Company */}
                <div
                  className="relative flex flex-col items-center justify-center gap-5 md:gap-6 lg:gap-7 p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[360px] lg:min-h-[400px]"
                  style={{ background: `linear-gradient(135deg, ${c}08, ${c}03)`, borderRight: `1px solid ${c}18` }}
                >
                  <div className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${c}, transparent 70%)` }} />

                  <div className="relative z-10 flex flex-col items-center gap-5 md:gap-6">
                    {/* Logo */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <div className="flex h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-2xl border-2 overflow-hidden"
                        style={{ background: `${c}12`, borderColor: `${c}38`, boxShadow: `0 16px 50px ${c}22` }}>
                        {partner.logo
                          ? <img src={partner.logo} alt={partner.company} className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain" />
                          : <span className="font-bold font-display text-3xl md:text-4xl lg:text-5xl" style={{ color: c }}>{companyInitials}</span>
                        }
                      </div>
                    </motion.div>

                    {/* Company name + badge */}
                    <motion.div
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-center"
                    >
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-display mb-2" style={{ color: c }}>
                        {partner.company}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider"
                        style={{ background: `${c}15`, color: c, border: `1px solid ${c}30` }}>
                        {partner.category}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Right side — Consultant */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="flex flex-col justify-center gap-4 md:gap-5 p-6 md:p-8 lg:p-10"
                >
                  {/* Photo */}
                  <div className="flex h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      background: partner.image ? 'transparent' : `linear-gradient(135deg, ${c}, ${c}cc)`,
                      outline: `2.5px solid ${c}`,
                      outlineOffset: '4px',
                      boxShadow: `0 0 20px ${c}30`,
                    }}>
                    {partner.image
                      ? <img src={partner.image} alt={`${partner.firstName} ${partner.lastName}`} className="h-full w-full object-cover object-top" />
                      : <span className="font-bold text-white text-2xl md:text-3xl font-display">{consultantInitials}</span>
                    }
                  </div>

                  {/* Name & role */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: c }}>Lead Consultant</p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D3748] leading-tight font-display">
                      {partner.firstName}<br />
                      <span style={{ color: c }}>{partner.lastName}</span>
                    </h2>
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-wider mt-2" style={{ color: c }}>{partner.role}</p>
                  </div>

                  {/* Specialization */}
                  <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl w-fit"
                    style={{ background: `${c}10`, border: `1px solid ${c}30` }}>
                    <span className="text-base md:text-lg font-bold" style={{ color: c }}>✦</span>
                    <span className="text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: c }}>{partner.specialization}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm leading-relaxed text-[#4A5568]">{partner.description}</p>
                </motion.div>
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
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
  const partners = PARTNERS as Partner[]

  const next = () => setCurrent(c => (c + 1) % partners.length)
  const prev = () => setCurrent(c => (c - 1 + partners.length) % partners.length)

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // 12s on mobile, 8s on desktop
    const interval = isMobile ? 12000 : 8000
    
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [current, isMobile])

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 md:mb-20 text-center"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
            <span className="block h-px w-6 sm:w-8 bg-[#135B34]" />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
              Strategic Partners
            </span>
            <span className="block h-px w-6 sm:w-8 bg-[#135B34]" />
          </div>
          <h2
            className="leading-[0.95] text-[#2D3748] font-display mb-4"
            style={{ fontSize: 'clamp(28px, 6vw, 64px)', fontWeight: 700 }}
          >
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Consulting Partners
            </span>
          </h2>
          <p className="mt-3 sm:mt-6 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-[#4A5568] font-sans">
            Industry-leading consultants and partner companies that bring expertise and innovation to our projects.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            /* hauteur auto sur mobile, fixe à partir de sm */
            height: 'auto',
            minHeight: 'clamp(320px, 60vw, 420px)',
          }}
        >
          {/* On mobile, height is driven by content — use min-h instead of fixed h */}
          <div className="sm:hidden w-full">
            {partners.map((partner, idx) => (
              idx === current && (
                <div key={partner.id}>
                  <PartnerSlide partner={partner} isActive={true} />
                </div>
              )
            ))}
          </div>

          {/* Tablet + Desktop: fixed height container */}
          <div
            className="hidden sm:block relative"
            style={{ height: 'clamp(360px, 50vw, 540px)' }}
          >
            {partners.map((partner, idx) => (
              <PartnerSlide key={partner.id} partner={partner} isActive={idx === current} />
            ))}
          </div>

          {/* Nav arrows — only visible on sm+ */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 text-white transition-all duration-300 hover:opacity-85 active:scale-95"
            style={{ background: '#135B34', borderColor: '#1a8a4c' }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 text-white transition-all duration-300 hover:opacity-85 active:scale-95"
            style={{ background: '#135B34', borderColor: '#1a8a4c' }}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile nav arrows + dots below the card */}
        <div className="sm:hidden flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-white"
            style={{ background: '#135B34', borderColor: '#1a8a4c' }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {partners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                style={{
                  width: idx === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: idx === current ? '#135B34' : '#135B3440',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                aria-label={`Go to partner ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-white"
            style={{ background: '#135B34', borderColor: '#1a8a4c' }}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dots — tablet + desktop */}
        <div className="hidden sm:flex justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: idx === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: idx === current ? '#135B34' : '#135B3440',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to partner ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 sm:mt-12 flex justify-center"
        >
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-5 sm:px-7 py-3 sm:py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:shadow-lg text-[#135B34] font-sans"
          >
            View All Partners <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}