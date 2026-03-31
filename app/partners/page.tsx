'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Mail, ArrowUpRight, ChevronRight, Phone } from 'lucide-react'
import { TEAM_MEMBERS, PARTNERS } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  firstName: string
  lastName: string
  position: string
  department: string
  bio?: string
  location?: string
  linkedin?: string
  email?: string
  image?: string
  announced?: boolean
}

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

// ─── Constants ────────────────────────────────────────────────────────────────

const GREEN  = '#135B34'
const GOLD   = '#D4AF37'
const GREEN2 = '#1a8a4c'
const GREEN3 = '#2a9d5f'

const AVATAR_PALETTE = [
  { bg: GREEN,  text: '#fff' },
  { bg: GREEN2, text: '#fff' },
  { bg: GOLD,   text: '#fff' },
  { bg: GREEN3, text: '#fff' },
  { bg: '#0f4228', text: '#fff' },
  { bg: GOLD,   text: '#fff' },
  { bg: GREEN2, text: '#fff' },
  { bg: GREEN3, text: '#fff' },
]
function getAvatar(i: number) { return AVATAR_PALETTE[i % AVATAR_PALETTE.length] }

const DEPT_COLORS: Record<string, string> = {
  Executive: GREEN, Finance: GOLD, Engineering: GREEN2,
  Operations: GOLD, Strategy: GREEN, Health: GREEN3,
  Technology: GREEN2, Mining: GOLD, Agriculture: GREEN3,
  Communications: GREEN,
}
function getDeptColor(dept: string) {
  for (const k of Object.keys(DEPT_COLORS))
    if (dept.toLowerCase().includes(k.toLowerCase())) return DEPT_COLORS[k]
  return GREEN
}

const LOGO_GRADIENTS = [
  `linear-gradient(135deg,${GREEN},${GREEN2})`,
  'linear-gradient(135deg,#2a4a0f,#3a6b15)',
  'linear-gradient(135deg,#5a2000,#8a3810)',
  'linear-gradient(135deg,#0a2a4a,#104a7a)',
  'linear-gradient(135deg,#3a0a4a,#6a1a7a)',
]


// ─── PartnerGridCard ──────────────────────────────────────────────────────────

function PartnerGridCard({ partner, index }: { partner: Partner; index: number }) {
  const [hovered, setHovered] = useState(false)
  const logoGrad = LOGO_GRADIENTS[index % LOGO_GRADIENTS.length]
  const logoInitials = partner.company.split(' ').slice(0, 2).map(w => w[0]).join('')
  const avatarInitials = `${partner.firstName[0]}${partner.lastName[0]}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col overflow-hidden rounded-2xl border cursor-pointer"
      style={{
        background: hovered ? 'rgba(247,250,248,0.98)' : '#fff',
        borderColor: hovered ? `${GREEN}45` : '#E2E8F0',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? `0 16px 48px ${GREEN}14` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg,transparent,${GREEN},${GOLD},transparent)`, opacity: hovered ? 1 : 0 }} />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at top left,${GREEN}07,transparent 60%)`, opacity: hovered ? 1 : 0 }} />

      {/* Header band */}
      <div className="relative px-6 pt-6 pb-5"
        style={{ background: `linear-gradient(135deg,${GREEN}06,${GOLD}04)`, borderBottom: `1px solid ${GREEN}10` }}>
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center font-display text-base font-semibold text-white flex-shrink-0 overflow-hidden"
            style={{ background: logoGrad, boxShadow: hovered ? `0 6px 24px rgba(19,91,52,0.3)` : `0 3px 10px rgba(0,0,0,0.12)`, transition: 'box-shadow 0.4s' }}>
            {partner.logo
              ? <img src={partner.logo} alt={partner.company} className="h-full w-full object-contain p-2" />
              : logoInitials}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-display text-lg font-semibold leading-tight transition-colors duration-300"
              style={{ color: hovered ? GREEN : '#1A202C' }}>
              {partner.company}
            </h3>
            <span className="mt-1.5 inline-block text-[8px] tracking-[0.2em] uppercase font-medium rounded-full px-2.5 py-0.5"
              style={{ color: `${GOLD}bb`, background: `${GOLD}14`, border: `1px solid ${GOLD}28` }}>
              {partner.category}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-5 gap-4">

        {/* Consultant */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 md:h-22 md:w-22 lg:h-26 lg:w-26 items-center justify-center rounded-full overflow-hidden"
            style={{ background: `${GREEN}25`, borderColor: `${GREEN}20` }}>
            {partner.image
              ? <img src={partner.image} alt={`${partner.firstName} ${partner.lastName}`} className="absolute inset-0 h-full w-full object-cover object-top" />
              : avatarInitials}
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-[#A0AEC0] font-sans mb-0.5">Lead Consultant</p>
            <p className="font-display text-[16px] font-semibold text-[#2D3748] leading-tight">{partner.firstName} {partner.lastName}</p>
            <p className="text-[10px] font-sans font-medium" style={{ color: GOLD }}>{partner.role}</p>
          </div>
        </div>

        {/* Specialization */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: `${GREEN}07`, border: `1px solid ${GREEN}14` }}>
          <span className="text-[8px] font-sans font-bold uppercase tracking-[0.15em]" style={{ color: `${GREEN}99` }}>✦</span>
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.12em]" style={{ color: `${GREEN}aa` }}>{partner.specialization}</span>
        </div>

        {/* Description */}
        <p className="text-[12px] leading-relaxed text-[#718096] font-sans font-light flex-1">{partner.description}</p>

        {/* Footer 
        <div className="flex gap-2 pt-1 border-t border-[#F0F4F8]">
          <a href={`mailto:${partner.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl text-[11px] font-semibold font-sans transition-all duration-300"
            style={{ background: hovered ? GREEN : `${GREEN}10`, color: hovered ? '#fff' : GREEN }}>
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
          <a href={`tel:${partner.phone}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300"
            style={{ borderColor: `${GOLD}35`, color: GOLD, background: hovered ? `${GOLD}10` : 'transparent' }}>
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>*/}
      </div>
    </motion.article>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const departments = ['All', ...Array.from(new Set((TEAM_MEMBERS as unknown as TeamMember[]).map(m => m.department)))]
  const [activeDept, setActiveDept] = useState('All')

  const filtered = activeDept === 'All'
    ? (TEAM_MEMBERS as unknown as TeamMember[])
    : (TEAM_MEMBERS as unknown as TeamMember[]).filter(m => m.department === activeDept)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg,#ffffff 0%,#F7F9FA 40%,#F0F7F4 100%)' }}>

      {/* Grain overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[700px] w-[700px] -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle,${GREEN}06 0%,transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-y-1/3 rounded-full"
          style={{ background: `radial-gradient(circle,${GOLD}05 0%,transparent 70%)` }} />
        <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{ background: `radial-gradient(circle,${GREEN2}04 0%,transparent 70%)` }} />
      </div>

      <div className="relative z-10">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20">
          {/* Giant watermark */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display"
            style={{ fontSize: 'clamp(80px,18vw,240px)', fontWeight: 800, color: `${GREEN}08`, letterSpacing: '-0.04em', lineHeight: 1 }}>
            PARTNERS
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-10 flex items-center gap-2 text-xs font-sans text-[#A0AEC0]">
              <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
              <span>/</span>
              <span style={{ color: GREEN }}>Partners</span>
            </motion.div>

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:items-end lg:justify-between">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
                  <span className="block h-px w-6 sm:w-8" style={{ background: GREEN }} />
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] font-sans" style={{ color: GREEN }}>
                    Strategic Partners & Consultants
                  </span>
                </div>
                <h1 className="font-display leading-[0.95] text-[#2D3748]"
                  style={{ fontSize: 'clamp(48px,9vw,100px)', fontWeight: 700 }}>
                  Our<br />
                  <span style={{
                    background: `linear-gradient(135deg,${GREEN} 0%,${GREEN2} 40%,${GOLD} 85%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    Professional Network
                  </span>
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg lg:max-w-sm">
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  Leading consultants and partner companies bringing expertise and innovation to every engagement.
                </p>
                
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 sm:mt-14 lg:mt-16 h-px origin-left"
              style={{ background: `linear-gradient(90deg,${GREEN},${GREEN}20,transparent)` }} />
          </div>
        </section>

       
        
        {/* ══════════════════════════════════════════
            PARTNERS SECTION
        ══════════════════════════════════════════ */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">

            

            {/* ── GRID ────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mb-8">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans text-[#A0AEC0]">
                  Detailed View
                </span>
                <span className="h-px flex-1 max-w-[80px]" style={{ background: `${GREEN}15` }} />
              </div>
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {PARTNERS.map((partner, i) => (
                  <PartnerGridCard key={`grid-${partner.id}`} partner={partner} index={i} />
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            
          </div>

        {/* ══════════════════════════════════════════
            JOIN US CTA
        ══════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 md:py-28 lg:pb-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border p-8 sm:p-10 md:p-12 lg:p-16 shadow-lg"
              style={{ borderColor: `${GREEN}20`, background: `linear-gradient(135deg,${GREEN}06 0%,${GOLD}03 50%,white 100%)` }}>

              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${GREEN},${GOLD},transparent)` }} />

              {/* Watermark */}
              <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display"
                style={{ fontSize: 'clamp(60px,12vw,160px)', fontWeight: 900, color: `${GREEN}04`, letterSpacing: '-0.04em', lineHeight: 1 }}>
                JOIN US
              </div>

              <div className="relative flex flex-col gap-6 sm:gap-8 md:gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 sm:mb-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] font-sans" style={{ color: GREEN }}>
                    Growth Opportunity
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3748] font-display">
                    Join Our Team?
                  </h2>
                  <p className="mt-3 sm:mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    We're constantly seeking exceptional talent to strengthen our teams across Africa and North America.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-shrink-0">
                  <Link href="/careers"
                    className="inline-flex items-center justify-center lg:justify-start gap-2.5 rounded-2xl px-5 sm:px-6 md:px-7 py-3 sm:py-4 text-sm font-semibold text-white font-sans transition-all duration-300 hover:opacity-90 hover:shadow-xl"
                    style={{ background: `linear-gradient(135deg,${GREEN},${GREEN2})` }}>
                    View Openings <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact"
                    className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-2xl border px-5 sm:px-6 md:px-7 py-3 sm:py-4 text-sm font-semibold font-sans transition-all duration-300 hover:shadow-md"
                    style={{ borderColor: `${GREEN}35`, color: GREEN }}>
                    Contact HR
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