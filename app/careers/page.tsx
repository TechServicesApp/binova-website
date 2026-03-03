'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles, Heart, Target, Globe, Users, TrendingUp,
  MapPin, Clock, Building2, ChevronDown, ArrowUpRight, Send,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Department = 'Engineering' | 'Finance' | 'Operations' | 'Strategy' | 'Health' | 'Technology'

interface JobOpening {
  id: number
  title: string
  department: Department
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  description: string
  requirements: string[]
  color: string
}

interface Value {
  Icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}

interface Perk {
  icon: string
  title: string
  description: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES: Value[] = [
  {
    Icon: Sparkles,
    title: 'Excellence',
    description: 'We pursue the highest standards in everything we do, delivering world-class results across every sector.',
    color: '#135B34',
  },
  {
    Icon: Heart,
    title: 'Integrity',
    description: 'Transparency, ethics and accountability are at the core of every decision we make.',
    color: '#D4AF37',
  },
  {
    Icon: Target,
    title: 'Impact',
    description: 'We build for lasting, meaningful change — in communities, economies, and lives.',
    color: '#1a8a4c',
  },
  {
    Icon: Globe,
    title: 'Global Vision',
    description: 'From Cameroon to Canada, we think and act on a continental scale with a global mindset.',
    color: '#2a9d5f',
  },
  {
    Icon: Users,
    title: 'Collaboration',
    description: 'Great things happen when diverse minds come together with a shared purpose.',
    color: '#135B34',
  },
  {
    Icon: TrendingUp,
    title: 'Growth',
    description: 'We invest in our people as much as our projects — your development is our priority.',
    color: '#D4AF37',
  },
]

const PERKS: Perk[] = [
  { icon: '', title: 'Work Across Continents',   description: 'Mobility opportunities between Africa and North America' },
  { icon: '', title: 'Performance Bonuses',        description: 'Competitive compensation tied to impact and results' },
  { icon: '', title: 'Learning & Development',    description: 'Annual training budget and mentorship programs' },
  { icon: '', title: 'Health & Wellness',          description: 'Comprehensive medical coverage for you and your family' },
  { icon: '', title: 'Strong Culture',             description: 'Inclusive, diverse and purpose-driven environment' },
  { icon: '', title: 'Career Acceleration',        description: 'Fast-track growth in a rapidly expanding group' },
]

const DEPT_COLORS: Record<Department, string> = {
  Engineering: '#135B34',
  Finance:     '#D4AF37',
  Operations:  '#1a8a4c',
  Strategy:    '#2a9d5f',
  Health:      '#135B34',
  Technology:  '#1a8a4c',
}

// Replace with CAREERS_OPENINGS from @/lib/constants when available
const JOB_OPENINGS: JobOpening[] = [
  {
    id: 1,
    title: 'Senior Project Engineer',
    department: 'Engineering',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    color: '#135B34',
    description: 'Lead complex infrastructure and energy projects across Central Africa. You will manage multi-disciplinary teams and liaise with international partners.',
    requirements: ['5+ years civil/mechanical engineering', 'PMP or equivalent certification', 'Bilingual (French/English)', 'Experience in Sub-Saharan Africa'],
  },
  {
    id: 2,
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Montreal, Canada',
    type: 'Full-time',
    color: '#D4AF37',
    description: 'Analyze investment opportunities, prepare financial models and support strategic decisions across Binova diverse portfolio of sectors.',
    requirements: ['CFA or CPA designation', '3+ years investment analysis', 'Advanced Excel & financial modeling', 'Interest in emerging markets'],
  },
  {
    id: 3,
    title: 'Operations Manager — Mining',
    department: 'Operations',
    location: 'Yaoundé, Cameroon',
    type: 'Full-time',
    color: '#1a8a4c',
    description: 'Oversee day-to-day mining operations, ensure compliance with environmental standards and drive operational efficiency.',
    requirements: ['8+ years mining operations', 'Knowledge of HSE regulations', 'Strong leadership skills', 'Fluent in French'],
  },
  {
    id: 4,
    title: 'Strategy & Business Development',
    department: 'Strategy',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    color: '#2a9d5f',
    description: 'Identify new growth opportunities, build strategic partnerships and contribute to Binova long-term expansion across 14 sectors.',
    requirements: ['MBA or equivalent', '5+ years strategy consulting', 'Strong network in Africa or Canada', 'Excellent communication skills'],
  },
  {
    id: 5,
    title: 'Full-Stack Developer',
    department: 'Technology',
    location: 'Remote',
    type: 'Contract',
    color: '#1a8a4c',
    description: 'Build and maintain internal digital platforms, dashboards and client-facing products for Binova technology initiatives.',
    requirements: ['React / Next.js expertise', 'Node.js & PostgreSQL', '3+ years production experience', 'Strong UI/UX sensibility'],
  },
  {
    id: 6,
    title: 'Medical Research Coordinator',
    department: 'Health',
    location: 'Douala, Cameroon',
    type: 'Full-time',
    color: '#135B34',
    description: 'Coordinate clinical and public health research projects within Binova Health & Sciences division.',
    requirements: ['MSc or PhD in life sciences', 'Research project management', 'Knowledge of African healthcare systems', 'Bilingual preferred'],
  },
]

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-14 text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="block h-px w-8 bg-[#135B34] opacity-60" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">{eyebrow}</span>
        <span className="block h-px w-8 bg-[#135B34] opacity-60" />
      </div>
      <h2
        className="text-4xl font-bold text-[#2D3748] md:text-5xl font-display"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#4A5568] font-sans">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Value card ───────────────────────────────────────────────────────────────

function ValueCard({ value, index }: { value: Value; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-7 transition-all duration-400"
      style={{
        background: hovered ? 'rgba(247,249,250,0.95)' : 'rgba(255,255,255,0.9)',
        borderColor: hovered ? `${value.color}50` : '#E2E8F0',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 10px 30px rgba(19,91,52,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${value.color}10, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-0.5 transition-all duration-500"
        style={{ width: hovered ? '100%' : '0', background: `linear-gradient(90deg, ${value.color}, transparent)` }}
      />

      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: `${value.color}15`, color: value.color }}
      >
        <value.Icon className="h-5 w-5 transition-colors duration-300" />
      </div>

      <div>
        <h3
          className="mb-1.5 text-base font-bold text-[#2D3748] font-display"
        >
          {value.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
          {value.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Perk card ────────────────────────────────────────────────────────────────

function PerkCard({ perk, index }: { perk: Perk; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 rounded-xl border p-5"
      style={{
        background: 'rgba(255,255,255,0.8)',
        borderColor: '#E2E8F0',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="text-2xl flex-shrink-0">{perk.icon}</span>
      <div>
        <h4 className="mb-0.5 text-sm font-bold text-[#2D3748] font-display">{perk.title}</h4>
        <p className="text-xs leading-relaxed text-[#4A5568] font-sans">{perk.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Job accordion ────────────────────────────────────────────────────────────

function JobAccordion({ job, isOpen, onToggle }: {
  job: JobOpening
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border transition-all duration-300"
      style={{
        background: isOpen ? 'rgba(247,249,250,0.95)' : 'rgba(255,255,255,0.9)',
        borderColor: isOpen ? `${job.color}50` : '#E2E8F0',
        backdropFilter: 'blur(12px)',
        boxShadow: isOpen ? '0 8px 24px rgba(19,91,52,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header button */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Dept color dot */}
          <span
            className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: job.color, boxShadow: `0 0 8px ${job.color}` }}
          />
          <div className="min-w-0">
            <h3
              className="mb-2 text-base font-bold text-[#2D3748] font-display"
            >
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#4A5568] font-sans">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3 w-3" style={{ color: job.color }} />
                {job.department}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" style={{ color: job.color }} />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" style={{ color: job.color }} />
                {job.type}
              </span>
            </div>
          </div>
        </div>

        {/* Type badge + chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className="hidden sm:block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${job.color}15`, color: job.color }}
          >
            {job.type}
          </span>
          <ChevronDown
            className="h-4 w-4 transition-transform duration-300 text-[#A0AEC0]"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="border-t px-6 pb-6 pt-5"
              style={{ borderColor: `${job.color}20` }}
            >
              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-[#4A5568] font-sans">
                {job.description}
              </p>

              {/* Requirements */}
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: job.color }}>
                  Key Requirements
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4A5568] font-sans">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: job.color }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 font-sans"
                style={{ background: `linear-gradient(135deg, #135B34, #1a8a4c)`, boxShadow: '0 4px 12px rgba(19,91,52,0.2)' }}
              >
                Apply Now
                <Send className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]"
    >
      {/* Noise grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.022]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />
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
          {/* BG editorial text */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display"
            style={{
              fontSize: 'clamp(100px, 18vw, 220px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            CAREERS
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
              <span className="text-[#135B34]">Careers</span>
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
                    Join Our Team
                  </span>
                </div>
                <h1
                  className="leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 96px)',
                    fontWeight: 700,
                  }}
                >
                  Join the<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Excellence
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  Build your career with a team that is shaping the future across continents —
                  from Central Africa to North America.
                </p>
                {/* Opening count badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
                  style={{ borderColor: 'rgba(19,91,52,0.25)', background: 'rgba(19,91,52,0.06)' }}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#135B34]" />
                  <span className="text-xs font-semibold text-[#135B34] font-sans">
                    {JOB_OPENINGS.length} positions open
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

        {/* ════════════════ OUR VALUES ════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeading
                eyebrow="What We Stand For"
                title="Our Culture"
                subtitle="Six principles that guide every hire, every decision, every project at Binova."
              />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((val, i) => (
                <ValueCard key={val.title} value={val} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ PERKS ════════════════ */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section with left text + right grid */}
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-72 flex-shrink-0"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-6 bg-[#135B34] opacity-60" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">Benefits</span>
                </div>
                <h2
                  className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display"
                >
                  Why work<br />at Binova?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#4A5568] font-sans">
                  We believe the best results come from the best environments.
                  Here's what we offer our team.
                </p>
              </motion.div>

              {/* Right perks grid */}
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                {PERKS.map((perk, i) => (
                  <PerkCard key={perk.title} perk={perk} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ OPEN POSITIONS ════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeading
                eyebrow="Opportunities"
                title="Open Positions"
                subtitle={`${JOB_OPENINGS.length} roles currently open across multiple sectors and locations.`}
              />
            </motion.div>

            {/* Dept legend */}
            <div className="mb-8 flex flex-wrap gap-2">
              {(Object.entries(DEPT_COLORS) as [Department, string][]).map(([dept, color]) => (
                <span
                  key={dept}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: `${color}12`, color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  {dept}
                </span>
              ))}
            </div>

            {/* Accordion list */}
            <div className="flex flex-col gap-3">
              {JOB_OPENINGS.map((job, i) => (
                <JobAccordion
                  key={job.id}
                  job={job}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>

            {/* Spontaneous application */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 flex-wrap"
              style={{
                background: 'rgba(255,255,255,0.8)',
                borderColor: '#E2E8F0',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div>
                <p className="text-sm font-semibold text-[#2D3748] font-display">Don't see your role?</p>
                <p className="mt-0.5 text-xs text-[#4A5568] font-sans">
                  Send a spontaneous application — we're always looking for exceptional talent.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] text-[#135B34] font-sans"
                style={{
                  borderColor: 'rgba(19,91,52,0.3)',
                }}
              >
                Get in Touch <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ CTA BANNER ════════════════ */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border p-12 md:p-16 bg-gradient-to-br from-[#F0F7F4] to-white shadow-lg"
              style={{
                borderColor: 'rgba(19,91,52,0.2)',
              }}
            >
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #135B34, transparent)' }} />

              {/* BG text */}
              <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display"
                style={{
                  fontSize: 'clamp(60px, 12vw, 140px)',
                  fontWeight: 900,
                  color: 'rgba(19,91,52,0.03)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                TALENT
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Shape the Future
                  </p>
                  <h2
                    className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display"
                  >
                    Ready to make an impact?
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    Join a team of passionate experts building a better future across Africa and beyond.
                    Your next chapter starts here.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <Link
                    href="#positions"
                    className="inline-flex items-center gap-2 rounded-2xl border px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] text-[#135B34] font-sans"
                    style={{
                      borderColor: 'rgba(19,91,52,0.3)',
                    }}
                  >
                    View Openings
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 font-sans"
                    style={{
                      background: 'linear-gradient(135deg, #135B34, #1a8a4c)',
                      boxShadow: '0 4px 12px rgba(19,91,52,0.2)',
                    }}
                  >
                    Apply Now <ArrowUpRight className="h-4 w-4" />
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