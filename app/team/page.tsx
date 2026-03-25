'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Mail, ArrowUpRight, ChevronRight } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  firstName: string
  lastName: string
  position: string
  department: string
  // optional fields — add to constants if available
  bio?: string
  location?: string
  linkedin?: string
  email?: string
  image?: string
  announced?: boolean
}

// ─── Avatar colors — one per member, cycling ─────────────────────────────────

const AVATAR_PALETTE = [
  { bg: '#135B34', text: '#FFFFFF' },
  { bg: '#1a8a4c', text: '#FFFFFF' },
  { bg: '#D4AF37', text: '#FFFFFF' },
  { bg: '#2a9d5f', text: '#FFFFFF' },
  { bg: '#135B34', text: '#FFFFFF' },
  { bg: '#D4AF37', text: '#FFFFFF' },
  { bg: '#1a8a4c', text: '#FFFFFF' },
  { bg: '#2a9d5f', text: '#FFFFFF' },
]

function getAvatar(i: number) {
  return AVATAR_PALETTE[i % AVATAR_PALETTE.length]
}

// ─── Department accent colors ─────────────────────────────────────────────────

const DEPT_COLORS: Record<string, string> = {
  'Executive':         '#135B34',
  'Finance':           '#D4AF37',
  'Engineering':       '#1a8a4c',
  'Operations':        '#D4AF37',
  'Strategy':          '#135B34',
  'Health':            '#2a9d5f',
  'Technology':        '#1a8a4c',
  'Mining':            '#D4AF37',
  'Agriculture':       '#2a9d5f',
  'Communications':    '#135B34',
}

function getDeptColor(dept: string): string {
  for (const key of Object.keys(DEPT_COLORS)) {
    if (dept.toLowerCase().includes(key.toLowerCase())) return DEPT_COLORS[key]
  }
  return '#135B34'
}

// ─── Member card ──────────────────────────────────────────────────────────────

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false)
  const avatar = getAvatar(index)
  const deptColor = getDeptColor(member.department)
  const initials = `${member.firstName[0]}${member.lastName[0]}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border text-center cursor-pointer"
      style={{
        background: hovered ? 'rgba(247,249,250,0.95)' : 'rgba(255,255,255,0.9)',
        borderColor: hovered ? `${deptColor}60` : '#E2E8F0',
        backdropFilter: 'blur(14px)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 10px 30px rgba(19,91,52,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top colour line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${deptColor}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top, ${deptColor}0d, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Index number */}
      <span
        className="absolute top-4 right-5 font-mono text-[10px] font-medium select-none text-[#E2E8F0]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex w-full flex-col items-center px-3 sm:px-4 md:px-6 lg:px-6 pb-4 md:pb-5 lg:pb-6 pt-5 md:pt-6 lg:pt-7">

        {/* Avatar circle */}
        <div className="relative mb-3 md:mb-4 lg:mb-5">
          {/* Outer ring — spins on hover */}
          <div
            className="absolute -inset-2 rounded-full border-2 border-dashed transition-all duration-700"
            style={{
              borderColor: hovered ? `${deptColor}60` : 'transparent',
              transform: hovered ? 'rotate(12deg)' : 'rotate(0deg)',
            }}
          />
          {/* Avatar */}
          <div
            className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-full overflow-hidden"
            style={{
              background: member.image ? 'transparent' : `radial-gradient(circle at 35% 35%, ${avatar.bg}, ${avatar.bg}dd)`,
              boxShadow: hovered ? `0 0 28px ${deptColor}40` : '0 0 0 transparent',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={`${member.firstName} ${member.lastName}`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <span
                className="font-bold tracking-tight font-display"
                style={{
                  fontSize: 'clamp(16px, 4vw, 28px)',
                  color: avatar.text,
                  lineHeight: 1,
                }}
              >
                {initials}
              </span>
            )}
          </div>

          {/* Online dot */}
          <span
            className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2"
            style={{
              background: deptColor,
              borderColor: 'rgba(255,255,255,0.9)',
              boxShadow: `0 0 8px ${deptColor}`,
            }}
          />
        </div>

        {/* Name */}
        <h3
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 font-display"
          style={{
            color: !member.announced ? '#a0aec0' : (hovered ? '#135B34' : '#2D3748'),
            lineHeight: 1.2,
            opacity: !member.announced ? 0.7 : 1,
          }}
        >
          {member.firstName}
          <br />
          <span style={{ fontWeight: 400 }}>{member.lastName}</span>
        </h3>

        {/* Announcement label for incoming members */}
        {!member.announced && (
          <p className="text-[10px] text-[#a0aec0] font-semibold uppercase tracking-wider mt-1 animate-pulse">
            Announcement coming soon
          </p>
        )}

        {/* Gold separator */}
        <div
          className="my-1.5 md:my-2 lg:my-3 h-px md:h-1 w-6 md:w-8 lg:w-10 transition-all duration-400"
          style={{
            background: `linear-gradient(90deg, transparent, ${deptColor}, transparent)`,
            width: hovered ? 40 : 28,
            transition: 'width 0.4s ease',
          }}
        />

        {/* Position */}
        <p
          className="text-[6px] sm:text-[5px] md:text-[5px] lg:text-xs font-bold  font-sans"
          style={{ color: deptColor }}
        >
          {member.position}
        </p>

        {/* Department badge */}
        <span
          className="mt-1 md:mt-1.5 lg:mt-2 rounded-full px-2 sm:px-2.5 py-0.5 text-[7px] sm:text-[8px] md:text-[9px] font-semibold uppercase tracking-wider"
          style={{ background: `${deptColor}12`, color: `${deptColor}bb` }}
        >
          {member.department}
        </span>

        {/* Bio — optional */}
        {member.bio && (
          <p
            className="mt-4 text-xs leading-relaxed text-[#4A5568] font-sans"
            style={{ maxWidth: '28ch' }}
          >
            {member.bio}
          </p>
        )}

        {/* Divider */}
        <div
          className="my-3 w-full border-t border-[#E2E8F0]"
        />

        {/* Social buttons */}
        <div className="flex items-center gap-2">
          <a
            href={member.linkedin ?? '#'}
            aria-label={`${member.firstName} on LinkedIn`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300"
            style={{
              borderColor: hovered ? `${deptColor}40` : '#E2E8F0',
              color: hovered ? deptColor : '#A0AEC0',
              background: hovered ? `${deptColor}08` : 'transparent',
            }}
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${member.email ?? '#'}`}
            aria-label={`Email ${member.firstName}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300"
            style={{
              borderColor: hovered ? `${deptColor}40` : '#E2E8F0',
              color: hovered ? deptColor : '#A0AEC0',
              background: hovered ? `${deptColor}08` : 'transparent',
            }}
          >
            <Mail className="h-3.5 w-3.5" />
          </a>

          {/* Profile link — appears on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.a
                href="#"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-9 items-center gap-1.5 overflow-hidden rounded-xl px-3 text-xs font-semibold whitespace-nowrap"
                style={{
                  background: `${deptColor}15`,
                  color: deptColor,
                  border: `1px solid ${deptColor}30`,
                }}
              >
                Profile <ChevronRight className="h-3 w-3" />
              </motion.a>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TeamPage() {
  // Derive unique departments from TEAM_MEMBERS for filter
  const departments = ['All', ...Array.from(new Set((TEAM_MEMBERS as unknown as TeamMember[]).map(m => m.department)))]
  const [activeDept, setActiveDept] = useState('All')

  const filtered = activeDept === 'All'
    ? (TEAM_MEMBERS as unknown as TeamMember[])
    : (TEAM_MEMBERS as unknown as TeamMember[]).filter(m => m.department === activeDept)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]"
    >
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
            LEADERSHIP
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
              <span className="text-[#135B34]">Team</span>
            </motion.div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[#135B34]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    The People Behind Binova
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
                    Leadership
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  The people who make the difference, every day — a diverse team of world-class
                  experts united by a passion for excellence.
                </p>

                {/* Stats row */}
                <div className="mt-5 flex gap-4">
                  {[
                    { val: (TEAM_MEMBERS as unknown as TeamMember[]).length, label: 'Members' },
                    { val: departments.length - 1,                 label: 'Departments' },
                    { val: '2',                                     label: 'Continents' },
                  ].map(({ val, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-xl border border-[#E2E8F0] bg-white px-4 py-3"
                    >
                      <span
                        className="text-xl font-bold font-display text-[#135B34]"
                      >
                        {val}
                      </span>
                      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#4A5568] font-sans">
                        {label}
                      </span>
                    </div>
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
              <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {departments.map(dept => {
                  const isActive = activeDept === dept
                  const color = dept === 'All' ? '#135B34' : getDeptColor(dept)
                  return (
                <button
                      key={dept}
                      onClick={() => setActiveDept(dept)}
                      className="flex-shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-sans"
                      style={{
                        color: isActive ? '#FFFFFF' : '#4A5568',
                        background: isActive ? color : 'transparent',
                        border: `1px solid ${isActive ? color : '#E2E8F0'}`,
                      }}
                    >
                      {dept}
                    </button>
                  )
                })}
              </div>

              <span className="text-xs text-[#A0AEC0] font-sans">
                <span className="font-mono font-semibold text-[#135B34]">{filtered.length}</span>
                {' '}/ {(TEAM_MEMBERS as unknown as TeamMember[]).length} members
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════ GRID ════════════════ */}
        <section className="py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
              >
                {filtered.map((member, i) => (
                  <MemberCard key={`${member.firstName}-${member.lastName}`} member={member} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════════════════ JOIN US CTA ════════════════ */}
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
                TEAM
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Grow With Us
                  </p>
                  <h2
                    className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display"
                  >
                    Want to join our team?
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    We're always looking for exceptional talent to strengthen our teams
                    across Africa and North America. See our open positions.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#135B34] to-[#1a8a4c] font-sans"
                  >
                    View Openings <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:text-[#135B34] text-[#135B34] font-sans"
                  >
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