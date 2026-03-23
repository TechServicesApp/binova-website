'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import {
  Building2, FlaskConical, Zap, Pickaxe,
  MonitorSmartphone,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type LucideIcon = React.ComponentType<LucideProps>

interface Subsidiary {
  id: number
  name: string
  shortName: string
  Icon: LucideIcon
  color: string
  description: string
  website: string
  established: number
  focus: string[]
  continent: 'Africa' | 'North America' | 'Both'
}

// ─── Data — Binova subsidiaries ───────────────────────────────────────────────

const SUBSIDIARIES: Subsidiary[] = [
  {
    id: 1, name: 'Binova Rock Builders Ltd', shortName: 'Rock Builders',
    Icon: Building2, color: '#135B34', established: 2023, continent: 'Both',
    description: 'We are a construction company, and we build every kind of infrastructure ranging from residential (homes), commercial (offices, hotels), industrial (facilities, warehouse, power plant) to heavy civil (roads, bridges, airport, railway).',
    website: 'www.binova-rockbuilders.com',
    focus: ['Residential', 'Commercial', 'Industrial', 'Heavy Civil'],
  },
  {
    id: 2, name: 'Binova Pharmaceuticals Ltd', shortName: 'Pharmaceuticals',
    Icon: FlaskConical, color: '#D4AF37', established: 2023, continent: 'Africa',
    description: 'We are a state of the art Pharmaceutical manufacturing company, highly regulated with sterile facilities, latest equipments and technology designed to produce almost every dosage form under strict GMP with a capacity of 20 billion tablets and capsules per year.',
    website: 'www.binovapharma.com',
    focus: ['GMP', 'Sterile Facilities', '20B Tablets & Capsules/Year'],
  },
  {
    id: 3, name: 'Binova Energies Corporation Ltd', shortName: 'Energies',
    Icon: Zap, color: '#1a8a4c', established: 2023, continent: 'Both',
    description: 'We are a state of the art industries specialised in developing, manufacturing, and deploying innovative renewable technologies and advanced energy storage for individuals, homes, and industries.',
    website: 'www.binovaenergies.com',
    focus: ['Renewables', 'Energy Storage', 'Industrial Energy'],
  },
  {
    id: 4, name: 'Binova Mining Corporation Ltd', shortName: 'Mining',
    Icon: Pickaxe, color: '#D4AF37', established: 2023, continent: 'Both',
    description: 'We are a large global mining group engaged in the exploration and extraction of natural resources ore like gold, silver, aluminium, tungsten, graphite, tin, iron...etc for global industrial use.',
    website: 'www.binovamining.com',
    focus: ['Exploration', 'Extraction', 'Global Industrial Supply'],
  },
  {
    id: 5, name: 'Binova Sciences Ltd', shortName: 'Sciences',
    Icon: MonitorSmartphone, color: '#2a9d5f', established: 2023, continent: 'Both',
    description: 'We are a state of the art biotech production company, highly regulated with sterile facilities, latest equipments and technology designed to produce APIs, Biologics, and vaccines under strict GMP to supply big pharma.',
    website: 'www.binovasciences.com',
    focus: ['APIs', 'Biologics', 'Vaccines', 'GMP'],
  },
]

const CONTINENTS = ['All', 'Africa', 'North America', 'Both'] as const
type ContinentFilter = typeof CONTINENTS[number]

// ─── Subsidiary card ──────────────────────────────────────────────────────────

function SubsidiaryCard({ sub, index }: { sub: Subsidiary; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border cursor-pointer"
      style={{
        background: hovered ? 'rgba(247,249,250,0.95)' : 'rgba(255,255,255,0.9)',
        borderColor: hovered ? `${sub.color}60` : '#E2E8F0',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 10px 30px rgba(19,91,52,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top colour line */}
      <div
        className="h-0.5 transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0',
          background: `linear-gradient(90deg, ${sub.color}, transparent)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${sub.color}0c, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card number */}
      <span
        className="absolute top-4 right-4 font-mono text-[10px] font-medium tracking-widest select-none text-[#E2E8F0]"
      >
        {String(sub.id).padStart(2, '0')}
      </span>

      <div className="relative flex flex-1 flex-col gap-4 p-6">

        {/* Icon + established */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
            style={{
              background: hovered ? `${sub.color}22` : `${sub.color}12`,
            }}
          >
            <sub.Icon
              size={22}
              strokeWidth={1.6}
              style={{ color: sub.color, transition: 'color 0.3s' }}
            />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
              style={{ background: `${sub.color}15`, color: sub.color }}
            >
              {sub.continent}
            </span>
            <span className="font-mono text-[10px] text-[#A0AEC0]">
              Est. {sub.established}
            </span>
          </div>
        </div>

        {/* Name */}
        <div>
          <h3
            className="text-base font-bold leading-tight transition-colors duration-300 font-display"
            style={{
              color: hovered ? '#135B34' : '#2D3748',
            }}
          >
            {sub.name}
          </h3>
        </div>

        {/* Description */}
        <p
          className="flex-1 text-sm leading-relaxed text-[#4A5568] font-sans"
        >
          {sub.description}
        </p>

        <a
          href={`https://${sub.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold underline-offset-4 hover:underline font-sans"
          style={{ color: sub.color }}
        >
          {sub.website}
        </a>

        {/* Focus tags */}
        <div className="flex flex-wrap gap-1.5">
          {sub.focus.map(tag => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-[10px] font-medium"
              style={{ background: `${sub.color}10`, color: `${sub.color}cc` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t border-[#E2E8F0] pt-4"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A0AEC0] font-sans">
            Binova Group
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-300"
            style={{
              color: sub.color,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            Discover <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SubsidiariesPage() {
  const [continent, setContinent] = useState<ContinentFilter>('All')

  const filtered = continent === 'All'
    ? SUBSIDIARIES
    : SUBSIDIARIES.filter(s => s.continent === continent || s.continent === 'Both')

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]"
    >
      {/* Grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative overflow-hidden pt-32 pb-16">
          {/* BG editorial text */}
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
            SUBSIDIARIES
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
              <span className="text-[#135B34]">Subsidiaries</span>
            </motion.div>

            {/* Title row */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[#135B34]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    The Binova Group
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
                    Subsidiaries
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  We are a growing group of companies, and we develop businesses in every domain anywhere in the world.
                  Our subsidiaries are leaders, each in its sector - united by one vision of excellence.
                </p>

                {/* Continent badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { label: 'Africa',        color: '#135B34', count: SUBSIDIARIES.filter(s => s.continent !== 'North America').length },
                    { label: 'North America', color: '#1a8a4c', count: SUBSIDIARIES.filter(s => s.continent !== 'Africa').length },
                  ].map(({ label, color, count }) => (
                    <span
                      key={label}
                      className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
                      style={{ borderColor: `${color}30`, color, background: `${color}08` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                      {count} entities · {label}
                    </span>
                  ))}
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

        {/* ════════════════ FILTER BAR ════════════════ */}
        <div
          className="sticky top-20 z-30 border-b border-[#E2E8F0] backdrop-blur-[20px] bg-white/90 shadow-sm"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
              {/* Continent filters */}
              <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {CONTINENTS.map(c => {
                  const isActive = continent === c
                  return (
                    <button
                      key={c}
                      onClick={() => setContinent(c)}
                      className="flex-shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-sans"
                      style={{
                        color: isActive ? '#FFFFFF' : '#4A5568',
                        background: isActive ? '#135B34' : 'transparent',
                        border: `1px solid ${isActive ? '#135B34' : '#E2E8F0'}`,
                      }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>

              {/* Count */}
              <div className="flex items-center gap-2 text-xs text-[#A0AEC0] font-sans">
                <span className="font-mono font-semibold text-[#135B34]">{filtered.length}</span>
                <span>/ {SUBSIDIARIES.length} subsidiaries</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ GRID ════════════════ */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={continent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((sub, i) => (
                  <SubsidiaryCard key={sub.id} sub={sub} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
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
                PARTNER
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Work With Us
                  </p>
                  <h2
                    className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display"
                  >
                    Partner with a Binova subsidiary
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    Each subsidiary operates with full autonomy while benefiting from the strength
                    of the Binova Group. Let's explore how we can work together.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#135B34] to-[#1a8a4c] font-sans"
                  >
                    Contact Us <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:text-[#135B34] text-[#135B34] font-sans"
                  >
                    View Projects <ExternalLink className="h-4 w-4" />
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