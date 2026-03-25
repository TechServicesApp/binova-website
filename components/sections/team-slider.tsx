'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/constants'
import Image from 'next/image'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const INK        = '#1A1612'
const VELLUM     = '#F5F0E8'
const GOLD       = '#B8922A'
const GOLD_LIGHT = '#D4AF62'
const FOREST     = '#135B34'

const deptColor = (_dept: string) => FOREST

// Roman numerals
const ROMANS = [
  ['M',1000],['CM',900],['D',500],['CD',400],
  ['C',100],['XC',90],['L',50],['XL',40],
  ['X',10],['IX',9],['V',5],['IV',4],['I',1],
] as const
function toRoman(n: number): string {
  let r = ''; for (const [s,v] of ROMANS) { while (n >= v) { r += s; n -= v } } return r
}
function pad2(n: number) { return String(n).padStart(2,'0') }

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticBtn({ onClick, children, style, className }: {
  onClick: () => void; children: React.ReactNode; style?: React.CSSProperties; className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick} className={className}>
      {children}
    </motion.button>
  )
}

// ─── Lot hexagon badge ────────────────────────────────────────────────────────
function LotBadge({ index, color }: { index: number; color: string }) {
  return (
    <div className="relative" style={{ width: 52, height: 52 }}>
      <svg viewBox="0 0 52 52" width="52" height="52" className="absolute inset-0">
        <polygon points="26,2 50,14 50,38 26,50 2,38 2,14" fill="transparent" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <polygon points="26,8 44,17 44,35 26,44 8,35 8,17" fill={`${color}12`} stroke={color} strokeWidth="0.5" opacity="0.4" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontSize: 10, color, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
        {toRoman(index + 1)}
      </span>
    </div>
  )
}

// ─── Timeline sidebar ─────────────────────────────────────────────────────────
function TimelineSidebar({ current, onSelect, color }: {
  current: number; onSelect: (i: number) => void; color: string
}) {
  const activeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }, [current])
  const total = TEAM_MEMBERS.length

  return (
    <div className="hidden xl:flex flex-col gap-0 overflow-y-auto flex-shrink-0"
      style={{ width: 210, maxHeight: '74vh', scrollbarWidth: 'none', borderLeft: `1px solid ${GOLD}22`, paddingLeft: 22 }}>
      <div className="mb-5 flex-shrink-0">
        <p className="text-[7px] font-bold uppercase tracking-[0.5em] mb-0.5" style={{ color: `${INK}40` }}>Catalogue</p>
        <p className="text-[10px] font-bold" style={{ color: GOLD, fontFamily: 'Georgia, serif' }}>{total} Members</p>
      </div>
      <div className="flex flex-col relative">
        <div className="absolute left-[21px] top-4 bottom-4 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}28 20%, ${GOLD}28 80%, transparent)` }} />
        {TEAM_MEMBERS.map((m, i) => {
          const isActive = i === current
          const c = deptColor(m.department)
          return (
            <button key={i} ref={isActive ? activeRef : undefined} onClick={() => onSelect(i)}
              className="group relative flex items-center gap-3 py-2.5 text-left transition-all duration-300">
              <div className="relative flex-shrink-0" style={{ width: 44 }}>
                <motion.div
                  animate={{ width: isActive ? 14 : 7, height: isActive ? 14 : 7, backgroundColor: isActive ? c : `${INK}22`, boxShadow: isActive ? `0 0 14px ${c}55` : 'none' }}
                  className="rounded-full absolute top-1/2 -translate-y-1/2" style={{ right: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                {isActive && (
                  <motion.div initial={{ scale: 2, opacity: 0.6 }} animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute top-1/2 -translate-y-1/2 right-0 rounded-full"
                    style={{ width: 14, height: 14, background: c }} />
                )}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <span className="font-mono text-[7px] block mb-0.5" style={{ color: isActive ? c : `${INK}28` }}>{toRoman(i + 1)}</span>
                <p className="text-[10px] font-bold leading-tight truncate transition-colors duration-300"
                  style={{ color: isActive ? INK : `${INK}50`, fontFamily: 'Georgia, serif' }}>{m.lastName}</p>
                <p className="text-[8px] leading-tight truncate transition-colors duration-300"
                  style={{ color: isActive ? c : `${INK}30` }}>{m.firstName}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Portrait ────────────────────────────────────────────────────────────────
function Portrait({ member, color }: { member: any; color: string }) {
  const initials = `${member.firstName[0]}${member.lastName[0]}`
  return (
    <div className="relative w-full" style={{ aspectRatio: '5/6' }}>
      {/* Decorative offset frame */}
      <div className="absolute pointer-events-none" style={{
        inset: -1,
        border: `1px solid ${GOLD}35`,
        clipPath: 'polygon(6% 0%, 97% 0%, 100% 4%, 100% 92%, 94% 100%, 3% 100%, 0% 96%, 0% 8%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        inset: 7,
        border: `1px solid ${GOLD}16`,
        clipPath: 'polygon(6% 0%, 97% 0%, 100% 4%, 100% 92%, 94% 100%, 3% 100%, 0% 96%, 0% 8%)',
      }} />

      {/* Photo */}
      <div className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'polygon(6% 0%, 97% 0%, 100% 4%, 100% 92%, 94% 100%, 3% 100%, 0% 96%, 0% 8%)' }}>
        {member.image ? (
          <>
            <Image src={member.image} alt={`${member.firstName} ${member.lastName}`} fill
              className="object-cover object-top transition-transform duration-700 hover:scale-[1.04]"
              unoptimized priority quality={98}
              style={{ filter: 'sepia(8%) contrast(1.05) saturate(0.92)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to bottom, transparent 50%, rgba(26,22,18,0.58) 100%), radial-gradient(ellipse at center, transparent 40%, rgba(26,22,18,0.1) 100%)`,
            }} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `${VELLUM}` }}>
            <span style={{ fontSize: 'clamp(80px, 14vw, 140px)', fontFamily: 'Georgia, serif', color: `${color}20`, fontStyle: 'italic' }}>{initials}</span>
          </div>
        )}
      </div>

      {/* Dept tag */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(245,240,232,0.93)', backdropFilter: 'blur(8px)', borderTop: `2px solid ${color}` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <span className="text-[7.5px] font-bold uppercase tracking-[0.3em]" style={{ color: INK, fontFamily: 'Georgia, serif' }}>{member.department}</span>
        </div>
      </div>

      {/* Lot badge */}
      <div className="absolute top-5 right-5 z-10">
        <LotBadge index={TEAM_MEMBERS.indexOf(member)} color={color} />
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function TeamSlider() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [touchX, setTouchX] = useState(0)
  const total = TEAM_MEMBERS.length
  const member = TEAM_MEMBERS[cur]
  const color = deptColor(member.department)

  const go = useCallback((i: number) => {
    const next = (i + total) % total
    setDir(next > cur || (cur === total - 1 && next === 0) ? 1 : -1)
    setCur(next)
  }, [cur, total])

  useEffect(() => { if (paused) return; const id = setInterval(() => go(cur + 1), 6500); return () => clearInterval(id) }, [cur, paused, go])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1) }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [cur, go])

  const photoV = {
    enter: (d: number) => ({ x: d > 0 ? '6%' : '-6%', opacity: 0, filter: 'blur(4px)' }),
    center: { x: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ x: d > 0 ? '-5%' : '5%', opacity: 0, filter: 'blur(2px)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }),
  }
  const nameV = {
    enter: { clipPath: 'inset(0 100% 0 0)' },
    center: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }
  const fadeUp = (delay = 0) => ({
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: VELLUM, minHeight: '100vh', fontFamily: 'Georgia, "Times New Roman", serif' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => setTouchX(e.touches[0].clientX)}
      onTouchEnd={e => { const d = touchX - e.changedTouches[0].clientX; if (Math.abs(d) > 50) go(d > 0 ? cur + 1 : cur - 1) }}
    >
      {/* Paper grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

      {/* Architectural grid */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${GOLD}0E 1px, transparent 1px), linear-gradient(90deg, ${GOLD}0E 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Color bleed */}
      <AnimatePresence>
        <motion.div key={`bleed-${cur}`} className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}
          style={{ background: `radial-gradient(ellipse 48% 55% at 36% 45%, ${color}08 0%, transparent 60%)` }} />
      </AnimatePresence>

      {/* Diagonal accent line */}
      <div className="pointer-events-none absolute" style={{
        top: 0, bottom: 0, left: '41%', width: 1,
        background: `linear-gradient(to bottom, transparent 0%, ${GOLD}18 15%, ${GOLD}18 85%, transparent 100%)`,
        transform: 'rotate(3deg)', transformOrigin: 'top center',
      }} />

      {/* ── Masthead ── */}
      <div className="border-b" style={{ borderColor: `${GOLD}28` }}>
        <div className="mx-auto max-w-[1380px] px-8 sm:px-12 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <polygon points="14,1 27,7 27,21 14,27 1,21 1,7" stroke={GOLD} strokeWidth="1.2" fill="none" />
              <polygon points="14,6 22,10 22,18 14,22 6,18 6,10" stroke={GOLD} strokeWidth="0.6" fill={`${GOLD}08`} />
              <text x="14" y="15.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill={GOLD} fontFamily="Georgia, serif" letterSpacing="1">B</text>
            </svg>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.6em]" style={{ color: `${INK}40`, fontFamily: 'system-ui' }}>Binova Group</p>
              <p className="text-[8px]" style={{ color: GOLD }}>The Leadership Collection</p>
            </div>
          </div>
          <div className="hidden md:block text-center">
            <AnimatePresence mode="wait">
              <motion.p key={cur} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                style={{ fontSize: 10, color: `${INK}35`, letterSpacing: '0.12em' }}>
                Lot {toRoman(cur + 1)} of {toRoman(total)}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold uppercase tracking-[0.4em]" style={{ color: `${INK}32`, fontFamily: 'system-ui' }}>Est. 2020</p>
            <AnimatePresence mode="wait">
              <motion.p key={`dept-${cur}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[8px] font-bold" style={{ color }}>{member.department}</motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-[1380px] px-8 sm:px-12 lg:px-16 py-12 lg:py-14">
        <div className="flex gap-10 xl:gap-14 items-start">
          <TimelineSidebar current={cur} onSelect={go} color={color} />

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-start">
            {/* Photo */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={`photo-${cur}`} custom={dir} variants={photoV} initial="enter" animate="center" exit="exit">
                <Portrait member={member} color={color} />
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <div className="flex flex-col justify-center lg:pt-6">
              <AnimatePresence mode="wait">
                <motion.div key={`info-${cur}`}>
                  {/* Lot + rule */}
                  <motion.div variants={fadeUp(0)} initial="enter" animate="center" exit="exit"
                    className="flex items-center gap-4 mb-7">
                    <span style={{ fontSize: 8, color: GOLD, letterSpacing: '0.5em', fontFamily: 'Georgia, serif' }}
                      className="font-bold flex-shrink-0">LOT · {toRoman(cur + 1)}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD}40 70%, transparent)` }} />
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <line x1="9" y1="0" x2="9" y2="18" stroke={GOLD} strokeWidth="0.8" opacity="0.45" />
                        <line x1="0" y1="9" x2="18" y2="9" stroke={GOLD} strokeWidth="0.8" opacity="0.45" />
                        <circle cx="9" cy="9" r="2.5" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.65" />
                        <circle cx="9" cy="9" r="1" fill={GOLD} opacity="0.6" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Name */}
                  <div className="mb-6 overflow-hidden">
                    <motion.p variants={fadeUp(0.06)} initial="enter" animate="center" exit="exit"
                      className="uppercase font-bold mb-1" style={{ fontSize: 9, color, letterSpacing: '0.45em', fontFamily: 'system-ui' }}>
                      {member.firstName}
                    </motion.p>
                    <div className="overflow-hidden">
                      <motion.h2 variants={nameV} initial="enter" animate="center" exit="exit"
                        className="font-bold leading-[0.85]"
                        style={{ fontSize: 'clamp(50px, 6.5vw, 88px)', color: INK, letterSpacing: '-0.035em', fontStyle: 'italic' }}>
                        {member.lastName}
                      </motion.h2>
                    </div>
                  </div>

                  {/* Position */}
                  <motion.p variants={fadeUp(0.2)} initial="enter" animate="center" exit="exit"
                    className="font-bold mb-5 leading-snug"
                    style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', color: `${INK}78`, fontStyle: 'normal', letterSpacing: '0.01em' }}>
                    {member.position}
                  </motion.p>

                  {/* Gold rule with compass rose */}
                  <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1, transition: { delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }} exit={{ opacity: 0 }} className="mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD}40 70%, transparent)` }} />
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <polygon points="11,1 13,9 21,11 13,13 11,21 9,13 1,11 9,9" fill={GOLD} opacity="0.5" />
                        <circle cx="11" cy="11" r="2" fill={GOLD} opacity="0.7" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Bio */}
                  {(member as any).bio && (
                    <motion.p variants={fadeUp(0.32)} initial="enter" animate="center" exit="exit"
                      className="mb-7 line-clamp-4"
                      style={{ fontSize: 'clamp(13px, 1.05vw, 15px)', color: `${INK}58`, lineHeight: 1.78, fontStyle: 'normal', letterSpacing: '0.006em' }}>
                      {(member as any).bio}
                    </motion.p>
                  )}

                  {/* Provenance table */}
                  <motion.div variants={fadeUp(0.38)} initial="enter" animate="center" exit="exit"
                    className="mb-8" style={{ border: `1px solid ${GOLD}22`, borderTop: `2px solid ${GOLD}` }}>
                    {[
                      { key: 'Department', val: member.department },
                      { key: 'Reference', val: `BNV·${pad2(cur + 1)}` },
                      { key: 'Catalogue', val: `${pad2(cur + 1)} / ${pad2(total)}` },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center" style={{ borderBottom: i < 2 ? `1px solid ${GOLD}14` : 'none' }}>
                        <div className="flex-shrink-0 px-4 py-3 border-r" style={{ width: 118, borderColor: `${GOLD}14`, background: `${GOLD}06` }}>
                          <span className="text-[7.5px] font-bold uppercase tracking-[0.35em]" style={{ color: `${INK}42`, fontFamily: 'system-ui' }}>{row.key}</span>
                        </div>
                        <div className="px-4 py-3 flex-1">
                          <span className="text-[11px] font-bold" style={{ color: INK, fontFamily: 'Georgia, serif' }}>{row.val}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA row */}
                  <motion.div variants={fadeUp(0.46)} initial="enter" animate="center" exit="exit"
                    className="flex items-center gap-4 flex-wrap">
                    <a href={(member as any).linkedin ?? '#'} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3.5 text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
                      style={{ background: INK, color: VELLUM, border: `1px solid ${INK}`, fontFamily: 'system-ui' }}
                      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 8px 28px ${color}35` }}
                      onMouseLeave={e => { e.currentTarget.style.background = INK; e.currentTarget.style.borderColor = INK; e.currentTarget.style.boxShadow = 'none' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      View Profile
                      <svg viewBox="0 0 16 16" fill="none" width="9" height="9" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </a>
                    <div className="flex items-center gap-2 ml-auto">
                      <MagneticBtn onClick={() => go(cur - 1)}
                        className="flex h-11 w-11 items-center justify-center transition-all duration-300"
                        style={{ border: `1px solid ${GOLD}38`, background: 'transparent', color: `${INK}55` }}>
                        <svg viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="currentColor" strokeWidth="1.8">
                          <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </MagneticBtn>
                      <MagneticBtn onClick={() => go(cur + 1)}
                        className="flex h-11 w-11 items-center justify-center transition-all duration-300"
                        style={{ border: `1px solid ${color}`, background: `${color}0E`, color }}>
                        <svg viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 12h14M14 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </MagneticBtn>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="border-t" style={{ borderColor: `${GOLD}22` }}>
        <div className="mx-auto max-w-[1380px] px-8 sm:px-12 lg:px-16 py-4 flex items-center justify-between gap-8">
          {/* Scrubber */}
          <div className="flex items-center gap-4 max-w-xs flex-1">
            <span className="text-[7px] font-bold uppercase tracking-[0.4em] flex-shrink-0" style={{ color: `${INK}32`, fontFamily: 'system-ui' }}>Progress</span>
            <div className="flex-1 h-px cursor-pointer relative group" style={{ background: `${GOLD}20` }}
              onClick={e => { const r = e.currentTarget.getBoundingClientRect(); go(Math.floor(((e.clientX - r.left) / r.width) * total)) }}>
              <motion.div className="absolute top-0 left-0 h-full"
                animate={{ width: `${((cur + 1) / total) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: `linear-gradient(90deg, ${color}, ${GOLD})` }} />
              <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 transition-transform group-hover:scale-125"
                animate={{ left: `${((cur + 1) / total) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 8, height: 8, background: VELLUM, borderColor: color }} />
            </div>
            <span className="font-mono text-[8px] flex-shrink-0" style={{ color: `${INK}38` }}>{pad2(cur + 1)}/{pad2(total)}</span>
          </div>

          {/* Dots */}
          <div className="hidden md:flex items-center gap-1.5 mx-4">
            {TEAM_MEMBERS.map((_, i) => (
              <button key={i} onClick={() => go(i)} className="transition-all duration-300 rounded-full"
                style={{ width: i === cur ? 20 : 5, height: 5, background: i === cur ? `linear-gradient(90deg, ${color}, ${GOLD})` : `${INK}1A`, borderRadius: 99, boxShadow: i === cur ? `0 0 10px ${color}40` : 'none' }}
                aria-label={`Member ${i + 1}`} />
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="hidden lg:flex items-center gap-2">
            {['←','→'].map(k => (
              <kbd key={k} className="flex h-6 w-6 items-center justify-center text-[9px] font-mono"
                style={{ border: `1px solid ${GOLD}28`, color: `${INK}32`, background: `${GOLD}06` }}>{k}</kbd>
            ))}
            <span className="text-[7px] uppercase tracking-[0.3em] ml-1" style={{ color: `${INK}26`, fontFamily: 'system-ui' }}>Navigate</span>
          </div>
        </div>
      </div>
    </section>
  )
}