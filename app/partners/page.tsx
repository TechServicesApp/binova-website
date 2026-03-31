'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Mail, Phone, ArrowUpRight, ChevronRight, Building2, Briefcase } from 'lucide-react'
import { PARTNERS } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Partner {
  id: number
  firstName: string
  lastName: string
  company: string
  position: string
  role: string
  category: string
  image?: string
  description: string
  email: string
  phone: string
  specialization: string
}

// ─── Avatar colors — one per partner ─────────────────────────────────────────

const PARTNER_PALETTE = [
  { bg: '#135B34', text: '#FFFFFF' },
  { bg: '#1a8a4c', text: '#FFFFFF' },
  { bg: '#D4AF37', text: '#FFFFFF' },
]

function getAvatar(i: number) {
  return PARTNER_PALETTE[i % PARTNER_PALETTE.length]
}

// ─── Category colors ────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'Media & Communications': '#135B34',
  'Engineering & Construction': '#1a8a4c',
  'Pharmaceutical & Biotech': '#D4AF37',
}

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#135B34'
}

// ─── Partner card ──────────────────────────────────────────────────────────────

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const [hovered, setHovered] = useState(false)
  const avatar = getAvatar(index)
  const categoryColor = getCategoryColor(partner.category)
  const initials = `${partner.firstName[0]}${partner.lastName[0]}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl border text-center md:text-left cursor-pointer w-full"
      style={{
        background: hovered ? 'rgba(247,249,250,0.98)' : 'rgba(255,255,255,0.95)',
        borderColor: hovered ? `${categoryColor}60` : '#E2E8F0',
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered ? '0 20px 50px rgba(19,91,52,0.15)' : '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top colour line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* LEFT SECTION: Logo & Company */}
      <div
        className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 w-full sm:w-auto sm:flex-shrink-0"
        style={{ borderRight: `1px solid ${hovered ? categoryColor + '20' : '#E2E8F0'}` }}
      >
        {/* Logo/Avatar container */}
        <div className="relative flex-shrink-0">
          <div
            className="relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-2xl overflow-hidden border-2"
            style={{
              background: partner.image ? 'transparent' : `radial-gradient(circle at 35% 35%, ${avatar.bg}, ${avatar.bg}dd)`,
              borderColor: hovered ? `${categoryColor}40` : `${categoryColor}20`,
              boxShadow: hovered ? `0 0 28px ${categoryColor}40` : '0 0 0 transparent',
              transition: 'all 0.4s ease',
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
                className="font-bold tracking-tight font-display"
                style={{
                  fontSize: 'clamp(14px, 3vw, 32px)',
                  color: avatar.text,
                  lineHeight: 1,
                }}
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Company info */}
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 text-center sm:text-left">
          <h3
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-colors duration-300 font-display"
            style={{
              color: hovered ? '#135B34' : '#2D3748',
              lineHeight: 1.2,
            }}
          >
            {partner.company}
          </h3>
          <span
            className="rounded-full px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider w-fit mx-auto sm:mx-0"
            style={{ background: `${categoryColor}12`, color: `${categoryColor}bb` }}
          >
            {partner.category}
          </span>
        </div>
      </div>

      {/* MIDDLE SECTION: Consultant Info */}
      <div
        className="relative flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 w-full sm:flex-1"
        style={{ borderRight: `1px solid ${hovered ? categoryColor + '20' : '#E2E8F0'}`, borderTop: `1px solid ${hovered ? categoryColor + '20' : '#E2E8F0'}` }}
      >
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
          {/* Title & Name */}
          <div>
            <p
              className="text-[10px] sm:text-xs md:text-sm font-bold font-sans"
              style={{ color: categoryColor }}
            >
              {partner.role}
            </p>
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#2D3748] mt-1 font-display">
              {partner.firstName} {partner.lastName}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-xs md:text-sm leading-relaxed text-[#4A5568] font-sans">
            {partner.description}
          </p>

          {/* Specialization badge */}
          <div className="flex items-center gap-2 justify-center sm:justify-start mt-0.5 sm:mt-1">
            <span
              className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide font-sans px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg"
              style={{ background: `${categoryColor}12`, color: categoryColor }}
            >
              {partner.specialization}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Contact Actions */}
      <div className="relative flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 w-full sm:w-auto sm:flex-shrink-0" style={{ borderTop: `1px solid ${hovered ? categoryColor + '20' : '#E2E8F0'}` }}>
        {/* Connect label — hidden on mobile */}
        <div className="hidden sm:block text-center mb-1 md:mb-2">
          <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-[#A0AEC0] font-sans">
            Connect
          </p>
        </div>

        {/* Contact buttons */}
        <div className="flex gap-2 sm:gap-3">
          <a
            href={`mailto:${partner.email}`}
            aria-label={`Email ${partner.firstName}`}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300"
            style={{
              borderColor: hovered ? `${categoryColor}40` : '#E2E8F0',
              color: hovered ? categoryColor : '#A0AEC0',
              background: hovered ? `${categoryColor}08` : 'transparent',
            }}
          >
            <Mail className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
          </a>
          <a
            href={`tel:${partner.phone}`}
            aria-label={`Call ${partner.firstName}`}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300"
            style={{
              borderColor: hovered ? `${categoryColor}40` : '#E2E8F0',
              color: hovered ? categoryColor : '#A0AEC0',
              background: hovered ? `${categoryColor}08` : 'transparent',
            }}
          >
            <Phone className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
          </a>
        </div>

        {/* Index number */}
        <span
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 font-mono text-[9px] sm:text-[11px] font-medium select-none"
          style={{ color: hovered ? categoryColor : '#E2E8F0' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const categories = ['All', ...Array.from(new Set(PARTNERS.map(p => p.category)))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PARTNERS
    : PARTNERS.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]">
      {/* Grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(80px, 16vw, 200px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            PARTNERS
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
              <span className="text-[#135B34]">Partners</span>
            </motion.div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[#135B34]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Key Strategic Partners
                  </span>
                </div>
                <h1
                  className="leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(48px, 8vw, 88px)',
                    fontWeight: 700,
                  }}
                >
                  Our<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Partners & Consultants
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  Trusted consulting partners and specialists who bring expertise, innovation, and world-class solutions to every project.
                </p>
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

        {/* ════════════════ FILTER BAR ════════════════ */}
        <div className="sticky top-20 z-30 border-b border-[#E2E8F0] backdrop-blur-[20px] bg-white/90 shadow-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {categories.map(category => {
                  const isActive = activeCategory === category
                  const color = category === 'All' ? '#135B34' : getCategoryColor(category)
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className="flex-shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-sans"
                      style={{
                        color: isActive ? '#FFFFFF' : '#4A5568',
                        background: isActive ? color : 'transparent',
                        border: `1px solid ${isActive ? color : '#E2E8F0'}`,
                      }}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>

              <span className="text-xs text-[#A0AEC0] font-sans">
                <span className="font-mono font-semibold text-[#135B34]">{filtered.length}</span>
                {' '}/ {PARTNERS.length} partners
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════ GRID ════════════════ */}
        <section className="py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 lg:gap-8 grid-cols-1 w-full"
              >
                {filtered.map((partner, i) => (
                  <PartnerCard key={`${partner.firstName}-${partner.lastName}-${i}`} partner={partner} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════════════════ CTA SECTION ════════════════ */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[#135B34]/20 p-12 md:p-16 bg-gradient-to-br from-[#F0F7F4] to-white shadow-lg"
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #135B34, transparent)' }} />
              <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display"
                style={{
                  fontSize: 'clamp(60px, 12vw, 140px)',
                  fontWeight: 900,
                  color: 'rgba(19,91,52,0.03)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                COLLABORATE
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Partnership Opportunities
                  </p>
                  <h2 className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display">
                    Interested in partnering with us?
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    We welcome strategic partnerships, consulting engagements, and collaborative opportunities. Get in touch to discuss how we can work together.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <Link
                    href="/contact?type=partnership"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#135B34] to-[#1a8a4c] font-sans"
                  >
                    Start a Partnership <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:text-[#135B34] text-[#135B34] font-sans"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  )
}
