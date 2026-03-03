'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, ArrowUpRight, ArrowRight, Tag } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NEWS = [
  {
    id: 1,
    title: 'Binova Expands Mining Operations in Central Africa',
    date: 'January 2026',
    category: 'Press Release',
    excerpt: 'The expansion marks a significant milestone in our commitment to sustainable resource extraction across the continent, opening new corridors of opportunity.',
    featured: true,
    readTime: '4 min read',
    tag: 'Mining',
  },
  {
    id: 2,
    title: 'New Partnership with Canadian Infrastructure Fund',
    date: 'December 2025',
    category: 'Partnership',
    excerpt: 'A strategic alliance to unlock $200M+ in infrastructure projects across Cameroon and neighboring countries.',
    featured: false,
    readTime: '3 min read',
    tag: 'Finance',
  },
  {
    id: 3,
    title: 'Annual Sustainability Report Published',
    date: 'November 2025',
    category: 'Report',
    excerpt: 'Our comprehensive report details ESG progress, community impact, and environmental milestones achieved this year.',
    featured: false,
    readTime: '6 min read',
    tag: 'ESG',
  },
  {
    id: 4,
    title: 'Binova Launches Agricultural Innovation Hub',
    date: 'October 2025',
    category: 'Innovation',
    excerpt: 'A state-of-the-art research and development center focused on sustainable agriculture in West Africa.',
    featured: false,
    readTime: '5 min read',
    tag: 'Agriculture',
  },
  {
    id: 5,
    title: 'Team Expansion: 20 New Experts Join Binova',
    date: 'September 2025',
    category: 'People',
    excerpt: 'Welcoming world-class talent in engineering, finance, and project management to strengthen our global capabilities.',
    featured: false,
    readTime: '2 min read',
    tag: 'People',
  },
  {
    id: 6,
    title: 'Solar Energy Project Breaks Ground in Douala',
    date: 'August 2025',
    category: 'Projects',
    excerpt: 'A landmark clean energy initiative that will power over 10,000 households in the Littoral region.',
    featured: false,
    readTime: '4 min read',
    tag: 'Energy',
  },
]

const CATEGORIES = ['All', 'Press Release', 'Partnership', 'Report', 'Innovation', 'People', 'Projects']

// ─── Category accent colors ───────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Press Release': '#34D399',
  'Partnership':   '#93C5FD',
  'Report':        '#FDE68A',
  'Innovation':    '#C4B5FD',
  'People':        '#F9A8D4',
  'Projects':      '#6EE7B7',
}

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? '#34D399'
}

// ─── Decorative index number ──────────────────────────────────────────────────
function IndexNumber({ n }: { n: number }) {
  return (
    <span
      className="absolute top-5 right-5 font-mono text-[11px] font-medium tracking-widest"
      style={{ color: 'rgba(255,255,255,0.1)' }}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}

// ─── Featured hero card ───────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: (typeof NEWS)[0] }) {
  const color = getCategoryColor(article.category)
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative col-span-full overflow-hidden rounded-3xl border cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(13,34,64,0.95) 0%, rgba(5,17,30,0.98) 60%)',
        borderColor: `${color}25`,
        minHeight: 340,
      }}
    >
      {/* Large decorative number */}
      <span
        className="pointer-events-none absolute -right-4 -top-6 select-none font-mono font-black leading-none"
        style={{ fontSize: 'clamp(120px,18vw,200px)', color: 'rgba(52,211,153,0.04)' }}
      >
        01
      </span>

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${color}10 0%, transparent 60%)` }}
      />

      {/* Accent left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl" style={{ background: color }} />

      <div className="relative flex flex-col justify-between gap-6 p-8 md:p-12 h-full">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: `${color}18`, color }}
            >
              {article.category}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Featured
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {article.date}
            </span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl">
          <h2
            className="text-3xl font-bold text-white leading-tight md:text-4xl lg:text-5xl group-hover:text-emerald-50 transition-colors duration-300"
            style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
          >
            {article.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '60ch' }}>
            {article.excerpt}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-300" style={{ color }}>
          Read Full Story
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </motion.article>
  )
}

// ─── Standard card ────────────────────────────────────────────────────────────
function NewsCard({ article, index }: { article: (typeof NEWS)[0]; index: number }) {
  const color = getCategoryColor(article.category)
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500"
      style={{
        background: 'rgba(7,21,38,0.7)',
        borderColor: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}35`
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.background = 'rgba(10,28,52,0.85)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.background = 'rgba(7,21,38,0.7)'
      }}
    >
      <IndexNumber n={article.id} />

      {/* Color strip top */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Meta */}
        <div className="mb-4 flex items-center gap-2.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${color}15`, color }}
          >
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <Calendar className="h-3 w-3" /> {article.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-base font-bold leading-snug text-white group-hover:text-emerald-50 transition-colors duration-300"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {article.readTime}
          </span>
          <span
            className="flex items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2"
            style={{ color }}
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured  = NEWS.find(n => n.featured)!
  const rest      = NEWS.filter(n => !n.featured)
  const filtered  = activeCategory === 'All'
    ? rest
    : rest.filter(n => n.category === activeCategory)

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(160deg, #04111e 0%, #071526 50%, #050e1c 100%)',
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      {/* ── Noise grain overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.022]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* ── Ambient glows ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-32 pb-20">
          {/* Large editorial background text */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-black uppercase leading-none"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(100px, 20vw, 240px)',
              color: 'rgba(255,255,255,0.018)',
              letterSpacing: '-0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            MEDIA
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2 text-xs"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span style={{ color: '#34D399' }}>Media</span>
            </motion.div>

            {/* Title block */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-8" style={{ background: '#34D399' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
                    Latest News & Updates
                  </span>
                </div>

                {/* H1 */}
                <h1
                  className="text-6xl font-light leading-[0.95] text-white md:text-7xl lg:text-8xl"
                  style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
                >
                  Media &<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #34D399 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Press
                  </span>
                </h1>
              </motion.div>

              {/* Right meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2 lg:text-right"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <span className="text-sm">{NEWS.length} Articles Published</span>
                <span className="text-sm">2025 — 2026</span>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, #34D399, rgba(52,211,153,0.1), transparent)' }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FILTER BAR
        ════════════════════════════════════════════════ */}
        <section className="sticky top-20 z-30 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', background: 'rgba(4,17,30,0.85)' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat
                const color    = cat === 'All' ? '#34D399' : getCategoryColor(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                    style={{
                      color: isActive ? (cat === 'All' ? '#04111e' : '#04111e') : 'rgba(255,255,255,0.4)',
                      background: isActive ? color : 'transparent',
                      border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CONTENT
        ════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            {/* Featured article (only visible when showing All) */}
            <AnimatePresence>
              {activeCategory === 'All' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <FeaturedCard article={featured} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Section label */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  {activeCategory === 'All' ? 'All Stories' : activeCategory}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                  style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399' }}
                >
                  {filtered.length}
                </span>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.length > 0 ? (
                  filtered.map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center">
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      No articles in this category yet.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            NEWSLETTER CTA
        ════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border p-10 md:p-14"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,64,0.9) 0%, rgba(5,17,30,0.95) 100%)',
                borderColor: 'rgba(52,211,153,0.15)',
              }}
            >
              {/* BG text */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black uppercase"
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 'clamp(80px,14vw,160px)',
                  color: 'rgba(52,211,153,0.04)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                NEWS
              </div>

              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #34D399, transparent)' }} />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
                    Stay Connected
                  </p>
                  <h2
                    className="text-3xl font-bold text-white md:text-4xl"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Never miss an update
                  </h2>
                  <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Subscribe to receive Binova's latest news, reports and announcements.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-xl border px-4 py-3 text-sm text-white outline-none transition-colors focus:border-emerald-500"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderColor: 'rgba(255,255,255,0.12)',
                      minWidth: 240,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <button
                    className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
                    style={{
                      background: 'linear-gradient(135deg, #2E7D32, #34D399)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  )
}