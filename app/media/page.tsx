'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, ArrowUpRight, ArrowRight, Tag, Clock, Eye, ChevronRight } from 'lucide-react'

// ─── Real images via Unsplash ──────────────────────────────────────────────────
const IMAGES = {
  pharmaceutical: 'https://images.unsplash.com/photo-1578496479763-c21ef8a43d50?w=1600&q=80&fit=crop',
  energy:         'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&fit=crop',
  recruitment:    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop',
  mining:         'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80&fit=crop',
  supplyChain:    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80&fit=crop',
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const NEWS = [
  {
    id: 1,
    title: 'Official Launch of the Construction of a State-of-the-Art Pharmaceutical Plant and a Biotech Production Plant in South Cameroon',
    date: 'March 2026',
    dateISO: '2026-03-18',
    category: 'Press Release',
    excerpt: 'Two key projects to tackle Africa\'s dependence on health solutions and medicine supply from abroad.',
    body: 'Binova officially launches the construction of two flagship healthcare-industrial facilities in South Cameroon to strengthen regional pharmaceutical sovereignty and biotech capacity.',
    featured: true,
    readTime: '5 min read',
    views: '2.1k',
    tag: 'Pharma',
    image: IMAGES.pharmaceutical,
    author: { name: 'Binova Media Desk', role: 'Corporate Communications' },
  },
  {
    id: 2,
    title: 'Clean Energy Project Breaks Ground in Kribi, Cameroon',
    date: 'March 2026',
    dateISO: '2026-03-18',
    category: 'Projects',
    excerpt: 'A landmark clean energy initiative that will supply about 80MW to power industries, businesses, and households in the South region.',
    featured: false,
    readTime: '4 min read',
    views: '1.7k',
    tag: 'Energy',
    image: IMAGES.energy,
    author: { name: 'Paul Nguema', role: 'Energy Director' },
  },
  {
    id: 3,
    title: 'Pool of Recruitment in 2026–2027 in Kribi',
    date: 'March 2026',
    dateISO: '2026-03-18',
    category: 'People',
    excerpt: 'Binova announces a massive recruitment of engineers, technicians, and workmen for construction purposes.',
    featured: false,
    readTime: '3 min read',
    views: '1.3k',
    tag: 'Hiring',
    image: IMAGES.recruitment,
    author: { name: 'Clara Biya', role: 'HR Director' },
  },
  {
    id: 4,
    title: 'Binova Plans to Invest in Mining Operations in Africa',
    date: 'March 2026',
    dateISO: '2026-03-18',
    category: 'Investment',
    excerpt: 'The expansion in the mining industry marks a significant milestone in our commitment to sustainable resource extraction across the continent for long-term African economic growth.',
    featured: false,
    readTime: '5 min read',
    views: '1.9k',
    tag: 'Mining',
    image: IMAGES.mining,
    author: { name: 'Sophie Nkolo', role: 'Chief Operations' },
  },
  {
    id: 5,
    title: 'Africa\'s Largest Pharmaceutical Distribution Project',
    date: 'March 2026',
    dateISO: '2026-03-18',
    category: 'Supply Chain',
    excerpt: 'Binova is focusing its resources on developing, strengthening, securing, and optimizing the pharmaceutical supply chain across Africa to improve access to quality medicine at the best price.',
    featured: false,
    readTime: '4 min read',
    views: '2.3k',
    tag: 'Pharma',
    image: IMAGES.supplyChain,
    author: { name: 'Marc Etienne', role: 'Supply Chain Director' },
  },
]

const CATEGORIES = ['All', 'Press Release', 'Projects', 'People', 'Investment', 'Supply Chain']

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  'Press Release': { bg: '#135B34', text: '#FFFFFF' },
  'Projects':      { bg: '#D4AF37', text: '#FFFFFF' },
  'People':        { bg: '#135B34', text: '#FFFFFF' },
  'Investment':    { bg: '#1a8a4c', text: '#FFFFFF' },
  'Supply Chain':  { bg: '#2a9d5f', text: '#FFFFFF' },
}
const getColor = (cat: string) => CAT_COLORS[cat] ?? { bg: '#135B34', text: '#FFFFFF' }

// ─── Category pill ─────────────────────────────────────────────────────────────
function Pill({ category, small }: { category: string; small?: boolean }) {
  const c = getColor(category)
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-widest font-sans ${small ? 'px-2 py-0.5 text-[9px]' : 'px-3 py-1 text-[10px]'}`}
      style={{ background: c.bg, color: c.text }}
    >
      {category}
    </span>
  )
}

// ─── Featured hero ─────────────────────────────────────────────────────────────
function HeroArticle({ article }: { article: any }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ minHeight: 580 }}
    >
      {/* Full-bleed image */}
     

      {/* FEATURED label top-right */}
      <div className="absolute top-6 right-6 z-10">
        <span className="rounded-full px-4 py-2 text-[9px] font-black uppercase tracking-[0.35em] font-sans"
          style={{ background: '#135B34', color: '#FFFFFF', backdropFilter: 'blur(8px)', border: '1px solid rgba(19,91,52,0.2)' }}>
          Featured
        </span>
      </div>

      {/* Issue number watermark */}
      <div
        aria-hidden
        className="absolute right-8 bottom-8 pointer-events-none select-none font-black leading-none font-display"
        style={{ fontSize: 'clamp(80px,14vw,160px)', color: 'rgba(19,91,52,0.04)' }}
      >
        01
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        {/* Meta row */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Pill category={article.category} />
          <span className="flex items-center gap-1.5 text-xs text-[#4A5568] font-sans">
            <Calendar className="h-3 w-3" /> {article.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#4A5568] font-sans">
            <Clock className="h-3 w-3" /> {article.readTime}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#4A5568] font-sans">
            <Eye className="h-3 w-3" /> {article.views}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mb-4 text-3xl font-bold leading-tight text-[#2D3748] md:text-4xl lg:text-5xl xl:text-6xl font-display"
          style={{ maxWidth: '18ch' }}
        >
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-8 text-base leading-relaxed md:text-lg text-[#4A5568] font-sans"
          style={{ maxWidth: '55ch' }}>
          {article.excerpt}
        </p>

        {/* Author + CTA row */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #135B34, #1a8a4c)', color: '#FFFFFF' }}
            >
              {article.author.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2D3748] font-sans">{article.author.name}</p>
              <p className="text-[10px] text-[#4A5568] font-sans">{article.author.role}</p>
            </div>
          </div>

          {/* CTA */}
          <button
            className="flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-4 hover:shadow-lg font-sans"
            style={{ background: '#135B34', color: '#FFFFFF' }}
          >
            Read article <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Side editorial strip (2 tall secondary cards) ────────────────────────────
function SecondaryCard({ article, index }: { article: any; index: number }) {
  const c = getColor(article.category)
  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-4 cursor-pointer rounded-xl p-4 transition-all duration-300 bg-white border border-[#E2E8F0] hover:border-[#135B34]/30 hover:shadow-md"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {/* Thumb */}
      <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={{ width: 90, height: 90 }}>
        <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(19,91,52,0.1) 100%)' }} />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        <div>
          <Pill category={article.category} small />
          <h3
            className="mt-2 text-sm font-bold leading-snug text-[#2D3748] line-clamp-2 group-hover:text-[#135B34] transition-colors font-display"
          >
            {article.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#A0AEC0] font-sans">
          <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />{article.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{article.readTime}</span>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.bg }} />
    </motion.article>
  )
}

// ─── Grid article card ─────────────────────────────────────────────────────────
function ArticleCard({ article, index }: { article: any; index: number }) {
  const c = getColor(article.category)
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl cursor-pointer bg-white border border-[#E2E8F0] transition-all duration-300 hover:border-[#135B34]/30 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 60%)' }} />
        {/* Category top-left */}
        <div className="absolute top-3 left-3">
          <Pill category={article.category} small />
        </div>
        {/* Read time bottom-right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-medium bg-white/90 backdrop-blur-sm border border-[#E2E8F0] text-[#4A5568] font-sans">
          <Clock className="h-2.5 w-2.5" /> {article.readTime}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date + views */}
        <div className="mb-3 flex items-center gap-3 text-[11px] text-[#A0AEC0] font-sans">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{article.views} views</span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-base font-bold leading-snug text-[#2D3748] group-hover:text-[#135B34] transition-colors font-display"
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-xs leading-relaxed line-clamp-3 text-[#4A5568] font-sans">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t border-[#E2E8F0] pt-4"
        >
          {/* Author */}
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
              style={{ background: `${c.bg}20`, color: c.bg }}
            >
              {article.author.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <span className="text-[11px] font-medium text-[#4A5568] font-sans">
              {article.author.name}
            </span>
          </div>

          <span
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-2 font-sans"
            style={{ color: c.bg }}
          >
            Read <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Masthead rule ─────────────────────────────────────────────────────────────
function MastheadRule() {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-[#E2E8F0]" />
      <span
        className="text-[10px] font-black uppercase tracking-[0.5em] px-4 text-[#A0AEC0] font-display"
      >
        Binova
      </span>
      <div className="flex-1 h-px bg-[#E2E8F0]" />
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState('')

  const handleNewsletterSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNewsletterError('')
    setNewsletterSuccess('')

    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter a valid email address.')
      return
    }

    try {
      setIsNewsletterSubmitting(true)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail.trim(), source: 'media-page' }),
      })

      const result = await response.json()

      if (!response.ok) {
        setNewsletterError(result?.error ?? 'Unable to subscribe right now. Please try again.')
        return
      }

      setNewsletterSuccess('Subscribed successfully.')
      setNewsletterEmail('')
    } catch {
      setNewsletterError('Network error. Please try again.')
    } finally {
      setIsNewsletterSubmitting(false)
    }
  }

  const featured = NEWS.find(n => n.featured)
  const rest = NEWS.filter(n => !n.featured)
  const sideCards = rest.slice(0, 2)
  const gridArticles = rest.filter(n => activeCategory === 'All' || n.category === activeCategory)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]"
    >
      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] -translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] translate-y-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">

        
        {/* ════════════════ HERO ════════════════ */}
        <section className="relative overflow-hidden pt-32 pb-16">
          {/* Background image with reduced opacity */}
          

          {/* BG editorial text */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display z-0"
            style={{
              fontSize: 'clamp(100px, 18vw, 220px)',
              fontWeight: 700,
              color: 'rgba(19,91,52,0.025)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            MEDIA
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2 text-xs font-sans text-[#A0AEC0]"
            >
              <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
              <span>/</span>
              <span className="text-[#135B34]">MEDIA</span>
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
                  Latest News & Updates
                  </span>
                </div>
                <h1
                  className="leading-[0.95] text-[#2D3748] font-display"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 96px)',
                    fontWeight: 700,
                  }}
                >
                  Media<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Press
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="max-w-sm"
              >
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  Stay informed about Binova's latest news, announcements and initiatives through our dedicated media section.
                </p>
                {/* Opening count badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
                  style={{ borderColor: 'rgba(19,91,52,0.25)', background: 'rgba(19,91,52,0.06)' }}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#135B34]" />
                  <span className="text-xs font-semibold text-[#135B34] font-sans">
                    {NEWS.length} Articles Published
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



        {/* ── Top editorial line ── */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-[#E2E8F0] scrollbar-hide">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat
            const c = cat === 'All' ? { bg: '#135B34', text: '#FFFFFF' } : getColor(cat)
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 font-sans"
                style={{
                  background: isActive ? c.bg : 'transparent',
                  color: isActive ? c.text : '#A0AEC0',
                  border: `1px solid ${isActive ? c.bg : '#E2E8F0'}`,
                }}
              >
                {cat}
              </button>
            )
          })}
          <div className="ml-auto flex-shrink-0 text-[10px] uppercase tracking-widest text-[#A0AEC0] font-sans">
            {gridArticles.length} articles
          </div>
        </div>

        {/* ── Hero section: Big featured + 2 side cards ── */}
        <AnimatePresence>
          
          {activeCategory === 'All' && featured && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid gap-5 lg:grid-cols-[1fr_340px] relative"
            >
              {/* Background image with reduced opacity */}
              <div className="absolute inset-0 pointer-events-none z-0">
                  <img
                    src={IMAGES.pharmaceutical}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ opacity: 1 }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,249,250,0.9) 50%, rgba(240,247,244,0.95) 100%)'
                    }}
                  />
                </div>
              
              {/* Main hero */}
              <div className="relative z-10">
                

                <HeroArticle article={featured} />
              </div>

              {/* Side strip */}
              <div className="flex flex-col gap-4 relative z-10">
                {/* Section label */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-3 w-0.5 rounded-full bg-[#135B34]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#135B34] font-sans">
                    Latest News
                  </span>
                </div>
                {sideCards.map((a, i) => (
                  <SecondaryCard key={a.id} article={a} index={i} />
                ))}

                {/* Promo block */}
                <div
                  className="mt-auto rounded-xl p-5 flex flex-col gap-3 bg-gradient-to-br from-[#F0F7F4] to-white border border-[#135B34]/20"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#135B34] font-sans">Newsletter</p>
                  <p className="text-sm font-semibold text-[#2D3748] leading-snug font-display">
                    Receive our press releases directly in your inbox
                  </p>
                  <form onSubmit={handleNewsletterSubscribe} className="flex flex-col gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="rounded-xl border border-[#E2E8F0] px-3 py-2.5 text-xs text-[#2D3748] outline-none focus:border-[#135B34] focus:ring-2 focus:ring-[#135B34]/20 transition-colors bg-white font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isNewsletterSubmitting}
                      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 bg-[#135B34] text-white font-sans"
                    >
                      {isNewsletterSubmitting ? 'Sending...' : 'Subscribe'} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {newsletterError && <p className="text-[11px] text-red-600 font-sans">{newsletterError}</p>}
                    {newsletterSuccess && <p className="text-[11px] text-[#135B34] font-sans">{newsletterSuccess}</p>}
                  </form>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <MastheadRule />

        {/* ── Section heading ── */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#135B34] mb-2 font-sans">
              {activeCategory === 'All' ? 'All news' : activeCategory}
            </p>
            <h2
              className="text-2xl font-bold text-[#2D3748] md:text-3xl font-display"
            >
              {activeCategory === 'All' ? 'Latest Articles' : `Articles — ${activeCategory}`}
            </h2>
          </div>
          <span
            className="rounded-full px-3 py-1.5 text-xs font-mono font-bold bg-[#135B34]/10 text-[#135B34] border border-[#135B34]/20"
          >
            {String(gridArticles.length).padStart(2, '0')} articles
          </span>
        </div>

        {/* ── Article grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {gridArticles.length > 0 ? (
              gridArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <p className="text-sm text-[#A0AEC0] font-sans">
                  No articles in this category at the moment.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer strip ── */}
        <footer className="mt-20 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0] pt-8">
          <span className="text-[10px] uppercase tracking-widest text-[#A0AEC0] font-display">
            ©️ 2026 Binova Group — All rights reserved
          </span>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Press Contact', 'Legal Notice'].map(l => (
              <a key={l} href="#" className="text-[10px] uppercase tracking-wider hover:text-[#135B34] transition-colors text-[#A0AEC0] font-sans">{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </div>
  )
}