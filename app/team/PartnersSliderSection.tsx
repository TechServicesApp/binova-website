'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, ArrowUpRight, ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import { PARTNERS } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Category accent colors ───────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, { primary: string; secondary: string; glow: string }> = {
  'Media & Communications':      { primary: '#135B34', secondary: '#1a8a4c', glow: 'rgba(19,91,52,0.35)' },
  'Engineering & Construction':  { primary: '#1a8a4c', secondary: '#2a9d5f', glow: 'rgba(26,138,76,0.35)' },
  'Pharmaceutical & Biotech':    { primary: '#D4AF37', secondary: '#c49a20', glow: 'rgba(212,175,55,0.35)' },
}

function getCategoryPalette(category: string) {
  return CATEGORY_COLORS[category] ?? { primary: '#135B34', secondary: '#1a8a4c', glow: 'rgba(19,91,52,0.35)' }
}

// ─── Partner Slide Card ───────────────────────────────────────────────────────

function PartnerSlide({ partner, isActive }: { partner: Partner; isActive: boolean }) {
  const palette = getCategoryPalette(partner.category)
  const initials = `${partner.firstName[0]}${partner.lastName[0]}`
  const companyInitials = partner.company.split(' ').slice(0, 2).map(w => w[0]).join('')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: '28px',
        background: 'linear-gradient(145deg, #0a1a0f 0%, #0e2318 40%, #0a1a0f 100%)',
        minHeight: '420px',
        boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 80px ${palette.glow}`,
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          borderRadius: '28px',
        }}
      />

      {/* Glow orb top-right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-80px',
          right: '-80px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Accent bar left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: `linear-gradient(180deg, transparent, ${palette.primary}, ${palette.secondary}, transparent)`,
          borderRadius: '28px 0 0 28px',
        }}
      />

      <div className="relative flex flex-col lg:flex-row h-full min-h-[420px]">

        {/* ── LEFT — Consultant photo + info ── */}
        <div className="flex flex-col items-center justify-center gap-5 px-10 py-10 lg:py-0 lg:w-64 xl:w-72 flex-shrink-0">

          {/* Photo */}
          <div className="relative">
            {/* Glowing ring */}
            <div
              className="absolute -inset-2 rounded-full"
              style={{
                background: `conic-gradient(${palette.primary}, ${palette.secondary}, #D4AF37, ${palette.primary})`,
                padding: '2px',
                borderRadius: '50%',
                filter: `blur(0px)`,
                boxShadow: `0 0 24px ${palette.glow}`,
              }}
            />
            <div
              className="relative flex h-28 w-28 xl:h-32 xl:w-32 items-center justify-center rounded-full overflow-hidden"
              style={{
                background: partner.image
                  ? 'transparent'
                  : `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
                border: '3px solid #0e2318',
                zIndex: 1,
              }}
            >
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={`${partner.firstName} ${partner.lastName}`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <span
                  className="font-bold text-white"
                  style={{ fontSize: '28px', fontFamily: 'var(--font-display)' }}
                >
                  {initials}
                </span>
              )}
            </div>
          </div>

          {/* Consultant name */}
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: palette.secondary }}>
              Lead Consultant
            </p>
            <h4
              className="text-xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {partner.firstName}<br />
              <span style={{ color: palette.secondary === '#D4AF37' ? '#D4AF37' : palette.secondary }}>{partner.lastName}</span>
            </h4>
            <p
              className="mt-1 text-[10px] uppercase tracking-widest font-semibold"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {partner.role}
            </p>
          </div>

          {/* Contact buttons */}
          <div className="flex items-center gap-2 mt-1">
            <a
              href={`mailto:${partner.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: `${palette.primary}30`,
                border: `1px solid ${palette.primary}50`,
                color: palette.secondary,
              }}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a
              href={`tel:${partner.phone}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: `${palette.primary}20`,
                border: `1px solid ${palette.primary}40`,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Vertical separator */}
        <div
          className="hidden lg:block w-px flex-shrink-0 my-10"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        />

        {/* ── MIDDLE — Company info & description ── */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 py-10 lg:py-12">

          {/* Category badge */}
          <div
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              background: `${palette.primary}20`,
              border: `1px solid ${palette.primary}40`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: palette.primary, boxShadow: `0 0 6px ${palette.primary}` }}
            />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: palette.secondary }}
            >
              {partner.category}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '46ch' }}
          >
            {partner.description}
          </p>

          {/* Specialization */}
          <div
            className="inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: palette.secondary }}>
              ✦ {partner.specialization}
            </span>
          </div>
        </div>

        {/* Vertical separator */}
        <div
          className="hidden lg:block w-px flex-shrink-0 my-10"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        />

        {/* ── RIGHT — Company logo + name ── */}
        <div
          className="flex flex-col items-center justify-center gap-5 px-8 lg:px-10 py-10 lg:py-0 lg:w-56 xl:w-64 flex-shrink-0"
        >
          {/* Logo */}
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-2xl overflow-hidden"
            style={{
              background: partner.logo
                ? 'rgba(255,255,255,0.05)'
                : `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
              border: `1px solid rgba(255,255,255,0.08)`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.company}
                className="h-full w-full object-contain p-4"
              />
            ) : (
              <span
                className="font-bold text-white text-2xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {companyInitials}
              </span>
            )}
          </div>

          {/* Company name */}
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Company
            </p>
            <h3
              className="text-base xl:text-lg font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {partner.company}
            </h3>
          </div>

          {/* Index dot */}
          <div
            className="flex items-center gap-1.5 mt-2"
          >
            <Building2 className="h-3 w-3" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span
              className="font-mono text-[10px]"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {String(partner.id).padStart(2, '0')}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

// ─── Partners Slider Section ──────────────────────────────────────────────────

export function PartnersSliderSection() {
  const partners = PARTNERS as Partner[]
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = (index: number, dir: 1 | -1 = 1) => {
    setDirection(dir)
    setCurrent(index)
  }

  const prev = () => goTo((current - 1 + partners.length) % partners.length, -1)
  const next = () => goTo((current + 1) % partners.length, 1)

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % partners.length)
    }, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [partners.length])

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % partners.length)
    }, 6000)
  }

  const handlePrev = () => { prev(); resetInterval() }
  const handleNext = () => { next(); resetInterval() }

  const activePartner = partners[current]
  const palette = getCategoryPalette(activePartner.category)

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">

      {/* Background ambiance */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,26,15,0.04) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-[#135B34]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                Strategic Partners
              </span>
            </div>
            <h2
              className="leading-[0.95] text-[#2D3748] font-display"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700 }}
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
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            {/* Counter */}
            <span className="font-mono text-sm text-[#A0AEC0]">
              <span className="text-[#135B34] font-bold">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              {String(partners.length).padStart(2, '0')}
            </span>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300"
                style={{
                  borderColor: '#E2E8F0',
                  color: '#4A5568',
                  background: 'white',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#135B34'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#135B34'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#4A5568'
                }}
                aria-label="Previous partner"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300"
                style={{
                  borderColor: '#135B34',
                  background: '#135B34',
                  color: 'white',
                }}
                aria-label="Next partner"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Slider ── */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <PartnerSlide
              key={activePartner.id}
              partner={activePartner}
              isActive={true}
            />
          </AnimatePresence>
        </div>

        {/* ── Dots pagination ── */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {partners.map((p, i) => {
            const pal = getCategoryPalette(p.category)
            return (
              <button
                key={p.id}
                onClick={() => { goTo(i, i > current ? 1 : -1); resetInterval() }}
                className="transition-all duration-400"
                style={{
                  height: '4px',
                  width: i === current ? '32px' : '16px',
                  borderRadius: '2px',
                  background: i === current ? pal.primary : '#E2E8F0',
                }}
                aria-label={`Go to partner ${i + 1}`}
              />
            )
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:text-[#135B34] hover:shadow-lg text-[#135B34] font-sans"
          >
            View All Partners <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}