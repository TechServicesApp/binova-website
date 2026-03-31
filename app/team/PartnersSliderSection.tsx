'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, ArrowUpRight, ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import { PARTNERS } from '@/lib/constants'

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

const CATEGORY_COLORS: Record<string, { primary: string; secondary: string; glow: string }> = {
  'Media & Communications':     { primary: '#135B34', secondary: '#1a8a4c', glow: 'rgba(19,91,52,0.35)' },
  'Engineering & Construction': { primary: '#1a8a4c', secondary: '#2a9d5f', glow: 'rgba(26,138,76,0.35)' },
  'Pharmaceutical & Biotech':   { primary: '#D4AF37', secondary: '#c49a20', glow: 'rgba(212,175,55,0.35)' },
}

function getCategoryPalette(category: string) {
  return CATEGORY_COLORS[category] ?? { primary: '#135B34', secondary: '#1a8a4c', glow: 'rgba(19,91,52,0.35)' }
}

// Reusable avatar with outline ring (no absolute positioning = no clipping issues)
function Avatar({ partner, size, fontSize, palette }: {
  partner: Partner
  size: number
  fontSize: string
  palette: { primary: string; secondary: string; glow: string }
}) {
  const initials = `${partner.firstName[0]}${partner.lastName[0]}`
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        background: partner.image ? 'transparent' : `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
        outline: `2.5px solid ${palette.primary}`,
        outlineOffset: '4px',
        boxShadow: `0 0 20px ${palette.glow}`,
        flexShrink: 0,
      }}
    >
      {partner.image ? (
        <img
          src={partner.image}
          alt={`${partner.firstName} ${partner.lastName}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      ) : (
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%',
          fontWeight: 700, color: 'white', fontSize,
          fontFamily: 'var(--font-display)',
        }}>
          {initials}
        </span>
      )}
    </div>
  )
}

// Reusable company logo (no clipping issues)
function CompanyLogo({ partner, size, palette }: {
  partner: Partner
  size: number
  palette: { primary: string; secondary: string; glow: string }
}) {
  const companyInitials = partner.company.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: partner.logo ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: `0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
        flexShrink: 0,
      }}
    >
      {partner.logo ? (
        <img src={partner.logo} alt={partner.company} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
      ) : (
        <span style={{ fontWeight: 700, color: 'white', fontSize: size * 0.28, fontFamily: 'var(--font-display)' }}>
          {companyInitials}
        </span>
      )}
    </div>
  )
}

function ContactButtons({ partner, palette, small = false }: {
  partner: Partner
  palette: { primary: string; secondary: string; glow: string }
  small?: boolean
}) {
  const s = small ? 32 : 36
  const iconSize = small ? 12 : 14
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <a href={`mailto:${partner.email}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: s, height: s, borderRadius: 10, background: `${palette.primary}30`, border: `1px solid ${palette.primary}50`, color: palette.secondary, flexShrink: 0 }}>
        <Mail size={iconSize} />
      </a>
      <a href={`tel:${partner.phone}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: s, height: s, borderRadius: 10, background: `${palette.primary}18`, border: `1px solid ${palette.primary}35`, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
        <Phone size={iconSize} />
      </a>
    </div>
  )
}

function CategoryBadge({ category, palette }: { category: string; palette: { primary: string; secondary: string; glow: string } }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 999, padding: '5px 12px', background: `${palette.primary}22`, border: `1px solid ${palette.primary}42`, width: 'fit-content' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.primary, boxShadow: `0 0 6px ${palette.primary}`, flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: palette.secondary, whiteSpace: 'nowrap' }}>{category}</span>
    </div>
  )
}

function SpecTag({ text, palette }: { text: string; palette: { secondary: string } }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 10, padding: '8px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content' }}>
      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: palette.secondary }}>✦ {text}</span>
    </div>
  )
}

function PartnerSlide({ partner }: { partner: Partner }) {
  const palette = getCategoryPalette(partner.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 'clamp(16px, 3vw, 28px)',
        background: 'linear-gradient(145deg, #0a1a0f 0%, #0e2318 40%, #0a1a0f 100%)',
        boxShadow: `0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${palette.glow}`,
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      {/* Glow orb */}
      <div style={{
        pointerEvents: 'none', position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
      }} />
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, transparent 0%, ${palette.primary} 30%, ${palette.secondary} 70%, transparent 100%)`,
      }} />

      {/* ══════════════════════════════════════════
          MOBILE  < 640px — vertical stack
      ══════════════════════════════════════════ */}
      <div className="sm:hidden" style={{ padding: '28px 20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Row: consultant + company */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          {/* Consultant */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
            <Avatar partner={partner} size={68} fontSize="18px" palette={palette} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: palette.secondary, marginBottom: 2 }}>Consultant</p>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.3, fontFamily: 'var(--font-display)', margin: 0 }}>
                {partner.firstName} {partner.lastName}
              </h4>
              <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{partner.role}</p>
            </div>
          </div>
          {/* Separator */}
          <div style={{ width: 1, height: 110, alignSelf: 'center', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)', flexShrink: 0 }} />
          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
            <CompanyLogo partner={partner} size={68} palette={palette} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 2 }}>Company</p>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.3, fontFamily: 'var(--font-display)', margin: 0 }}>{partner.company}</h3>
            </div>
          </div>
        </div>
        {/* Badge */}
        <CategoryBadge category={partner.category} palette={palette} />
        {/* Description */}
        <p style={{ fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.56)', margin: 0 }}>{partner.description}</p>
        {/* Spec + contacts */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <SpecTag text={partner.specialization} palette={palette} />
          <ContactButtons partner={partner} palette={palette} small />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SMALL TABLET  sm–md (640–768px) — 2 col
      ══════════════════════════════════════════ */}
      <div className="hidden sm:flex md:hidden" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', minHeight: 380 }}>
          {/* Consultant col */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '32px 24px', width: 200, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <Avatar partner={partner} size={88} fontSize="22px" palette={palette} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: palette.secondary, marginBottom: 3 }}>Lead Consultant</p>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'white', lineHeight: 1.25, fontFamily: 'var(--font-display)', margin: 0 }}>
                {partner.firstName}<br />{partner.lastName}
              </h4>
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>{partner.role}</p>
            </div>
            <ContactButtons partner={partner} palette={palette} />
          </div>
          {/* Content + company */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ marginBottom: 12 }}><CategoryBadge category={partner.category} palette={palette} /></div>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', marginBottom: 14, maxWidth: '38ch' }}>{partner.description}</p>
              <SpecTag text={partner.specialization} palette={palette} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 24px' }}>
              <CompanyLogo partner={partner} size={52} palette={palette} />
              <div>
                <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', marginBottom: 2 }}>Company</p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1.3, fontFamily: 'var(--font-display)', margin: 0 }}>{partner.company}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TABLET  md–lg (768–1024px) — 3 col compact
      ══════════════════════════════════════════ */}
      <div className="hidden md:flex lg:hidden" style={{ minHeight: 420 }}>
        {/* Consultant */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 24px', width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <Avatar partner={partner} size={96} fontSize="24px" palette={palette} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: palette.secondary, marginBottom: 4 }}>Lead Consultant</p>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: 'white', lineHeight: 1.25, fontFamily: 'var(--font-display)', margin: 0 }}>
              {partner.firstName}<br />{partner.lastName}
            </h4>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{partner.role}</p>
          </div>
          <ContactButtons partner={partner} palette={palette} />
        </div>
        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ marginBottom: 16 }}><CategoryBadge category={partner.category} palette={palette} /></div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 18, maxWidth: '40ch' }}>{partner.description}</p>
          <SpecTag text={partner.specialization} palette={palette} />
        </div>
        {/* Company */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 24px', width: 200, flexShrink: 0 }}>
          <CompanyLogo partner={partner} size={96} palette={palette} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.28)', marginBottom: 4 }}>Company</p>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', lineHeight: 1.3, fontFamily: 'var(--font-display)', margin: 0 }}>{partner.company}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building2 size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{String(partner.id).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP  ≥ lg (1024px+) — full luxury 3-col
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex" style={{ minHeight: 480 }}>
        {/* Consultant */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '56px 36px', width: 260, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <Avatar partner={partner} size={128} fontSize="32px" palette={palette} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: palette.secondary, marginBottom: 6 }}>Lead Consultant</p>
            <h4 style={{ fontSize: 22, fontWeight: 700, color: 'white', lineHeight: 1.2, fontFamily: 'var(--font-display)', margin: 0 }}>
              {partner.firstName}<br />
              <span style={{ color: palette.secondary }}>{partner.lastName}</span>
            </h4>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{partner.role}</p>
          </div>
          <ContactButtons partner={partner} palette={palette} />
        </div>
        {/* Sep */}
        <div style={{ width: 1, margin: '56px 0', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)', flexShrink: 0 }} />
        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 48px 56px 48px' }}>
          <div style={{ marginBottom: 22 }}><CategoryBadge category={partner.category} palette={palette} /></div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', marginBottom: 24, maxWidth: '48ch' }}>{partner.description}</p>
          <SpecTag text={partner.specialization} palette={palette} />
        </div>
        {/* Sep */}
        <div style={{ width: 1, margin: '56px 0', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)', flexShrink: 0 }} />
        {/* Company */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '56px 36px', width: 240, flexShrink: 0 }}>
          <CompanyLogo partner={partner} size={128} palette={palette} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.28)', marginBottom: 6 }}>Company</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', lineHeight: 1.3, fontFamily: 'var(--font-display)', margin: 0 }}>{partner.company}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building2 size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>{String(partner.id).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PartnersSliderSection() {
  const partners = PARTNERS as Partner[]
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % partners.length)
    }, 6000)
  }

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [partners.length])

  const handlePrev = () => { setCurrent(c => (c - 1 + partners.length) % partners.length); startInterval() }
  const handleNext = () => { setCurrent(c => (c + 1) % partners.length); startInterval() }
  const goTo = (i: number) => { setCurrent(i); startInterval() }

  const activePartner = partners[current]
  const palette = getCategoryPalette(activePartner.category)

  return (
    <section className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10,26,15,0.04) 50%, transparent 100%)' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 lg:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="block h-px w-8 bg-[#135B34]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                Strategic Partners
              </span>
            </div>
            <h2
              className="leading-[0.95] text-[#2D3748] font-display"
              style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 700 }}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#A0AEC0' }}>
              <span style={{ color: '#135B34', fontWeight: 700 }}>{String(current + 1).padStart(2, '0')}</span>
              <span style={{ margin: '0 4px', color: '#CBD5E0' }}>/</span>
              {String(partners.length).padStart(2, '0')}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:border-[#135B34] hover:text-[#135B34] active:scale-95"
                style={{ borderColor: '#E2E8F0', color: '#4A5568', background: 'white' }}
                aria-label="Previous partner">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:opacity-85 active:scale-95"
                style={{ background: '#135B34', color: 'white', border: '1px solid #135B34' }}
                aria-label="Next partner">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <PartnerSlide key={activePartner.id} partner={activePartner} />
        </AnimatePresence>

        {/* Dots */}
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {partners.map((p, i) => {
            const pal = getCategoryPalette(p.category)
            return (
              <button key={p.id} onClick={() => goTo(i)}
                style={{
                  height: 4, borderRadius: 2,
                  width: i === current ? 36 : 16,
                  background: i === current ? pal.primary : '#E2E8F0',
                  opacity: i === current ? 1 : 0.55,
                  transition: 'all 0.3s ease',
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
                aria-label={`Go to partner ${i + 1}`}
              />
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <Link href="/partners"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#135B34]/30 px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-semibold transition-all duration-300 hover:border-[#135B34] hover:shadow-lg text-[#135B34] font-sans">
            View All Partners <ArrowUpRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}