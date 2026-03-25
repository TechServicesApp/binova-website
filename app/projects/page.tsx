'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, LayoutGrid, List, Tag, ChevronDown, ChevronUp } from 'lucide-react'
import { PROJECTS as PROJECTS_DATA } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'Completed' | 'In Progress' | 'Planning'
type ViewMode = 'grid' | 'list'

interface Project {
  id: number
  title: string
  sector: string
  year: string
  status: Status
  description: string
  image?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTOR_COLORS: Record<string, string> = {
  'Public Work and Real Estate': '#135B34',
  'Transportation': '#1a5a8a',
  'Energy': '#FF6B35',
  'Health and Sciences': '#D4AF37',
  'Education and Training': '#1a8a4c',
  'Agriculture and Livestock': '#2a9d5f',
  'Mining': '#8B7355',
}

const SECTOR_ICONS: Record<string, string> = {
  'Public Work and Real Estate': '🏗️',
  'Transportation': '🚁',
  'Energy': '⚡',
  'Health and Sciences': '🏥',
  'Education and Training': '🎓',
  'Agriculture and Livestock': '🐄',
  'Mining': '⛏️',
}

const PROJECTS: Project[] = Array.isArray(PROJECTS_DATA) ? PROJECTS_DATA : Object.values(PROJECTS_DATA)

const FILTERS = ['All', ...Object.keys(SECTOR_COLORS)]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSectorColor(sector: string) { return SECTOR_COLORS[sector] ?? '#135B34' }
function getSectorIcon(sector: string)  { return SECTOR_ICONS[sector]  ?? '🏢' }

function statusStyle(status: Status): { bg: string; color: string } {
  if (status === 'Completed')   return { bg: 'rgba(19,91,52,0.15)',  color: '#135B34' }
  if (status === 'In Progress') return { bg: 'rgba(212,175,55,0.15)',  color: '#D4AF37' }
  return                               { bg: 'rgba(160,174,192,0.15)', color: '#A0AEC0' }
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: PROJECTS.length,                                        label: 'Total Projects' },
    { value: PROJECTS.filter(p => p.status === 'Completed').length,  label: 'Completed'     },
    { value: PROJECTS.filter(p => p.status === 'In Progress').length,label: 'In Progress'   },
    { value: PROJECTS.filter(p => p.status === 'Planning').length,   label: 'Planning'      },
  ]
  return (
    <div
      className="mt-10 grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
    >
      {stats.map(({ value, label }, i) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-5 transition-colors duration-300 hover:bg-[#F0F7F4]"
          style={{ borderRight: i < stats.length - 1 ? '1px solid #E2E8F0' : 'none' }}
        >
          <span
            className="text-3xl font-bold font-display text-[#135B34]"
          >
            {value}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A5568] font-sans">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Project card ─────────────────────────────────────────────────────────────

interface CardProps { project: Project; index: number; listView: boolean }

function ProjectCard({ project, index, listView }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const [expandedDesc, setExpandedDesc] = useState(false)
  const color  = getSectorColor(project.sector)
  const icon   = getSectorIcon(project.sector)
  const { bg: statusBg, color: statusColor } = statusStyle(project.status)

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex overflow-hidden rounded-2xl border cursor-pointer transition-all duration-400 ${listView ? 'flex-row' : 'flex-col'}`}
        style={{
          background: hovered ? 'rgba(247,249,250,0.95)' : 'rgba(255,255,255,0.9)',
          borderColor: hovered ? `${color}50` : '#E2E8F0',
          backdropFilter: 'blur(12px)',
          transform: hovered && !listView ? 'translateY(-5px)' : 'none',
          transition: 'all 0.4s ease',
          boxShadow: hovered ? '0 10px 30px rgba(19,91,52,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
      {/* Visual zone */}
      <div
        className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${listView ? 'w-16 sm:w-20 md:w-24 lg:w-28' : 'h-40 sm:h-44 md:h-52 lg:h-60 w-full'}`}
        style={{ background: project.image ? 'transparent' : `linear-gradient(135deg, ${color}15 0%, rgba(240,247,244,0.95) 100%)` }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover z-10"
          />
        )}
        <span
          className={`select-none font-bold leading-none font-display ${project.image ? 'z-0 opacity-0' : 'z-0'}`}
          style={{
            fontSize: listView ? 'clamp(24px, 8vw, 36px)' : 'clamp(48px, 12vw, 80px)',
            color: hovered ? 'rgba(19,91,52,0.05)' : 'rgba(19,91,52,0.02)',
            transition: 'color 0.4s',
          }}
        >
          {String(project.id).padStart(2, '0')}
        </span>

        {/* Animated color line at bottom */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{ width: hovered ? '100%' : '0', background: `linear-gradient(90deg, ${color}, transparent)` }}
        />

        {/* Sector icon
        {!listView && (
          <div
            className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl text-base"
            style={{ background: `${color}18` }}
          >
            {icon}
          </div>
        )} */}

        {/* Status badge */}
        <span
          className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-bold uppercase tracking-wider"
          style={{ background: statusBg, color: statusColor }}
        >
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col gap-1 sm:gap-2 p-3 sm:p-4 md:p-5 ${listView ? 'flex-row items-center gap-4 sm:gap-6' : ''}`}>
        <div className={`flex ${listView ? 'min-w-[140px] sm:min-w-[160px] flex-col gap-1' : 'items-center justify-between'}`}>
          <span className="font-mono text-[10px] sm:text-xs font-semibold" style={{ color }}>
            {project.year}
          </span>
          <span
            className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${color}12`, color }}
          >
            {project.sector}
          </span>
        </div>

        <h3
          className="font-bold leading-snug transition-colors duration-300 font-display text-sm sm:text-base md:text-lg"
          style={{
            fontSize: listView ? 'clamp(13px, 3vw, 15px)' : 'clamp(15px, 4vw, 18px)',
            color: hovered ? '#135B34' : '#2D3748',
            flex: listView ? '1' : undefined,
          }}
        >
          {project.title}
        </h3>

        {!listView && (
          <div className="flex-1">
            <p className={`text-xs sm:text-sm leading-relaxed text-[#4A5568] font-sans ${expandedDesc ? '' : 'line-clamp-2'}`}>
              {project.description}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setExpandedDesc(!expandedDesc)
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#135B34] hover:text-[#1a8a4c] transition-colors"
            >
              {expandedDesc ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  Voir plus
                </>
              )}
            </button>
          </div>
        )}

        <div
          className={`flex items-center justify-between pt-3 ${listView ? 'pt-0 border-0' : 'border-t border-[#E2E8F0]'}`}
        >
          <span className="text-[11px] text-[#A0AEC0] font-sans">Binova Group</span>
         {/* View Details */}
          <span
            className="flex items-center gap-1 text-xs font-semibold transition-all duration-300"
            style={{
              color,
              opacity: hovered ? 1 : 0,
              gap: hovered ? '8px' : '4px',
              transition: 'opacity 0.3s, gap 0.3s',
            }}
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300"
              style={{ transform: hovered ? 'translate(2px,-2px)' : 'none' }} />
          </span>
          
        </div>
      </div>
      </motion.article>
    </Link>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [filter, setFilter]     = useState('All')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.sector === filter)

  const completedCount  = PROJECTS.filter(p => p.status === 'Completed').length
  const inProgressCount = PROJECTS.filter(p => p.status === 'In Progress').length

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]"
    >
      {/* Noise grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">

        {/* ════ HERO ════ */}
        <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          {/* Large editorial BG text */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(80px, 20vw, 220px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            PROJECTS
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-7 md:mb-8 flex items-center gap-2 text-xs sm:text-sm font-sans text-[#A0AEC0]">
              <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
              <span>/</span>
              <span className="text-[#135B34] font-semibold">Projects</span>
            </motion.div>

            {/* Title row */}
            <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="block h-px w-6 sm:w-7 md:w-8 bg-[#135B34]" />
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Portfolio &amp; Achievements
                  </span>
                </div>
                <h1
                  className="font-bold leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(42px, 8vw, 96px)',
                  }}
                >
                  Our<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Projects
                  </span>
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-right text-xs sm:text-sm lg:flex-shrink-0 text-[#A0AEC0] font-sans">
                <div className="font-semibold text-[#135B34]">{PROJECTS.length}</div>
                <div>Projects Tracked</div>
                <div className="mt-1 text-[11px]">2024 — 2025</div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 md:mt-12">
              <StatsBar />
            </motion.div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-12 md:mt-16 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, #135B34, rgba(19,91,52,0.1), transparent)' }} />
          </div>
        </section>

        {/* ════ FILTER BAR ════ */}
        <div
          className="sticky top-16 sm:top-20 z-30 border-b border-[#E2E8F0] backdrop-blur-[20px] bg-white/90 shadow-sm"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 sm:py-4" style={{ scrollbarWidth: 'none' }}>
              {FILTERS.map(f => {
                const isActive = filter === f
                const color    = f === 'All' ? '#34D399' : getSectorColor(f)
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    className="flex-shrink-0 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-sans hover:shadow-md"
                    style={{
                      color: isActive ? '#FFFFFF' : '#4A5568',
                      background: isActive ? color : 'transparent',
                      border: `1px solid ${isActive ? color : '#E2E8F0'}`,
                    }}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ════ GRID ════ */}
        <section className="py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">

            {/* Section label + view toggle */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Tag className="h-3.5 w-3.5 text-[#135B34] flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#135B34] font-sans">
                  {filter === 'All' ? 'All Projects' : filter}
                </span>
                <span
                  className="rounded-full px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold bg-[#F0F7F4] text-[#135B34]"
                >
                  {filtered.length}
                </span>
              </div>

              {/* View toggle */}
              <div className="flex gap-1">
                {([['grid', <LayoutGrid key="g" className="h-3.5 w-3.5" />],
                   ['list', <List key="l" className="h-3.5 w-3.5" />]] as [ViewMode, React.ReactNode][]).map(([mode, icon]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all duration-200"
                    style={{
                      background: viewMode === mode ? 'rgba(19,91,52,0.1)' : 'transparent',
                      borderColor: viewMode === mode ? 'rgba(19,91,52,0.3)' : '#E2E8F0',
                      color: viewMode === mode ? '#135B34' : '#A0AEC0',
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects grid / list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filter + viewMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid'
                  ? 'grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-2 sm:gap-3'
                }
              >
                {filtered.length > 0 ? (
                  filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} listView={viewMode === 'list'} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-sm text-[#A0AEC0] font-sans">
                    No projects in this category yet.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section className="pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-7 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#135B34]/20 p-6 sm:p-8 md:p-10 lg:p-12 lg:p-14 bg-gradient-to-br from-[#F0F7F4] to-white shadow-lg"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #135B34, transparent)' }} />
              {/* BG text */}
              <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display"
                style={{
                  fontSize: 'clamp(80px,14vw,160px)',
                  fontWeight: 900,
                  color: 'rgba(19,91,52,0.03)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                WORK
              </div>

              <div className="relative flex flex-col gap-6 sm:gap-7 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 sm:mb-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Let's Build Together
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3748] font-display leading-snug"
                  >
                    Have a project in mind?
                  </h2>
                  <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#4A5568] font-sans">
                    Binova Holding Group brings together expertise across 14 sectors to deliver
                    world-class projects. Let's discuss your vision.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex flex-shrink-0 items-center gap-2 sm:gap-2.5 rounded-2xl px-5 sm:px-6 md:px-7 py-3 sm:py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#135B34] to-[#1a8a4c] font-sans whitespace-nowrap"
                >
                  Contact Us
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  )
}