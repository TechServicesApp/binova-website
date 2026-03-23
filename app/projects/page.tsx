'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, LayoutGrid, List, Tag } from 'lucide-react'

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

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Binova Staff Residence',
    sector: 'Public Work and Real Estate',
    year: '2026',
    status: 'In Progress',
    description: 'To house its staff, the group wants to build around 130 four-story buildings, 20 duplexes, and a leisure center to accommodate around 10,000 people in its new industrial city, for an investment of about 70 million euros. The completion date is estimated for early 2028, with construction starting in December 2026.',
    image: '/projets/binova-staff.jpg',
  },
  {
    id: 2,
    title: 'Binova Palace Hotel',
    sector: 'Public Work and Real Estate',
    year: '2026',
    status: 'In Progress',
    description: 'Project to build a 5-star, 250-room hotel in the Ocean department of southern Cameroon. The project represents an investment of 75 million euros and construction is scheduled to take two years.',
  },
  {
    id: 3,
    title: 'Southern Cameroon Airport',
    sector: 'Transportation',
    year: '2026',
    status: 'In Progress',
    description: 'Private initiative to build an ultra-modern international airport with 6 runways up to 3 km long. Estimated at 5 billion euros, Binova plans phased deployment to transform air transport, tourism, and business in Cameroon.',
  },
  {
    id: 4,
    title: '80MW Solar Power Plant',
    sector: 'Energy',
    year: '2026',
    status: 'In Progress',
    description: 'Estimated at 60 million euros, with a 20 MW storage unit and built on 100 hectares. Binova expects this project to reduce long-term electricity costs and guarantee clean, environmentally friendly energy for its factories.',
  },
  {
    id: 5,
    title: 'Dosage Form Pharmaceutical Manufacturing Unit',
    sector: 'Health and Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'With an investment of approximately 100 million euros for the construction phase on a 7-hectare area, Binova is building its first state-of-the-art pharmaceutical manufacturing unit in Africa. Construction starts in early 2027 for 24 months in southern Cameroon.',
  },
  {
    id: 6,
    title: 'API and Biologics Manufacturing Unit',
    sector: 'Health and Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'With an investment of approximately 140 million euros for the construction phase on a 12-hectare area, Binova is building its first state-of-the-art biotech manufacturing unit in Africa. Construction starts in early 2027 for 24 months in southern Cameroon.',
  },
  {
    id: 7,
    title: 'Holyframe University',
    sector: 'Education and Training',
    year: '2027',
    status: 'In Progress',
    description: 'Construction on a dedicated 100-hectare area including administrative buildings, amphitheaters, classrooms, tutorial rooms, laboratories, library, and restaurant to ensure high-value scientific and technological training. Start is planned for early 2027 over 3 years, with an initial 300 million euros first phase.',
  },
  {
    id: 8,
    title: 'Poultry Farming',
    sector: 'Agriculture and Livestock',
    year: '2027',
    status: 'In Progress',
    description: 'Plan to develop a modern farm with a capacity of 5 million animals for an investment of 60 million euros.',
  },
  {
    id: 9,
    title: 'Aluminium Production',
    sector: 'Mining',
    year: '2027',
    status: 'In Progress',
    description: 'Planned investment in aluminum production with a processing plant capacity of 750,000 tons per year to support demand from the automotive industry.',
  },
  {
    id: 10,
    title: 'Hospitals',
    sector: 'Health and Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'Binova intends to build several reference hospitals and university hospitals in multiple African cities to improve medical care and patient experience.',
  },
  {
    id: 11,
    title: 'Drugs Distribution',
    sector: 'Health and Sciences',
    year: '2027',
    status: 'In Progress',
    description: 'Binova intends to build several drug distribution centers in all African capitals to facilitate access to quality medicine at the best prices.',
  },
]

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
  const color  = getSectorColor(project.sector)
  const icon   = getSectorIcon(project.sector)
  const { bg: statusBg, color: statusColor } = statusStyle(project.status)

  return (
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
        className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${listView ? 'w-28' : 'h-44 w-full'}`}
        style={{ background: project.image ? 'transparent' : `linear-gradient(135deg, ${color}15 0%, rgba(240,247,244,0.95) 100%)` }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <span
          className="select-none font-bold leading-none font-display"
          style={{
            fontSize: listView ? 36 : 80,
            color: hovered ? 'rgba(19,91,52,0.08)' : 'rgba(19,91,52,0.04)',
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
          className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
          style={{ background: statusBg, color: statusColor }}
        >
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col gap-2 p-5 ${listView ? 'flex-row items-center gap-6' : ''}`}>
        <div className={`flex ${listView ? 'min-w-[160px] flex-col gap-1' : 'items-center justify-between'}`}>
          <span className="font-mono text-xs font-semibold" style={{ color }}>
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
          className="font-bold leading-snug transition-colors duration-300 font-display"
          style={{
            fontSize: listView ? 15 : 17,
            color: hovered ? '#135B34' : '#2D3748',
            flex: listView ? '1' : undefined,
          }}
        >
          {project.title}
        </h3>

        {!listView && (
          <p className="flex-1 text-sm leading-relaxed text-[#4A5568] font-sans">
            {project.description}
          </p>
        )}

        <div
          className={`flex items-center justify-between pt-3 ${listView ? 'pt-0 border-0' : 'border-t border-[#E2E8F0]'}`}
        >
          <span className="text-[11px] text-[#A0AEC0] font-sans">Binova Group</span>
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
        <section className="relative overflow-hidden pt-32 pb-16">
          {/* Large editorial BG text */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(100px,18vw,220px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            PROJECTS
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2 text-xs font-sans text-[#A0AEC0]">
              <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
              <span>/</span>
              <span className="text-[#135B34]">Projects</span>
            </motion.div>

            {/* Title row */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[#135B34]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Portfolio &amp; Achievements
                  </span>
                </div>
                <h1
                  className="font-bold leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 96px)',
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
                className="text-right text-sm lg:flex-shrink-0 text-[#A0AEC0] font-sans">
                <div>{PROJECTS.length} Projects Tracked</div>
                <div>2024 — 2025</div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <StatsBar />
            </motion.div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, #135B34, rgba(19,91,52,0.1), transparent)' }} />
          </div>
        </section>

        {/* ════ FILTER BAR ════ */}
        <div
          className="sticky top-20 z-30 border-b border-[#E2E8F0] backdrop-blur-[20px] bg-white/90 shadow-sm"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4" style={{ scrollbarWidth: 'none' }}>
              {FILTERS.map(f => {
                const isActive = filter === f
                const color    = f === 'All' ? '#34D399' : getSectorColor(f)
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    className="flex-shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 font-sans"
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
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            {/* Section label + view toggle */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Tag className="h-3.5 w-3.5 text-[#135B34]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#135B34] font-sans">
                  {filter === 'All' ? 'All Projects' : filter}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[10px] bg-[#F0F7F4] text-[#135B34]"
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200"
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
                  ? 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-3'
                }
              >
                {filtered.length > 0 ? (
                  filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} listView={viewMode === 'list'} />
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center text-sm text-[#A0AEC0] font-sans">
                    No projects in this category yet.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[#135B34]/20 p-12 md:p-14 bg-gradient-to-br from-[#F0F7F4] to-white shadow-lg"
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

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                    Let's Build Together
                  </p>
                  <h2
                    className="text-3xl font-bold text-[#2D3748] md:text-4xl font-display"
                  >
                    Have a project in mind?
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#4A5568] font-sans">
                    Binova Holding Group brings together expertise across 14 sectors to deliver
                    world-class projects. Let's discuss your vision.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex flex-shrink-0 items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#135B34] to-[#1a8a4c] font-sans"
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