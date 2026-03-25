'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Landmark, Building2, FlaskConical, Layers, MonitorSmartphone,
  Zap, Truck, UtensilsCrossed, Wheat, ShoppingCart,
  Radio, GraduationCap, Car, Pickaxe,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type LucideIcon = React.ComponentType<LucideProps>

interface Sector {
  id: number
  name: string       // may contain \n for SVG line-wrap
  shortName: string  // single-line label for tooltip
  Icon: LucideIcon
  description: string
  color: string
}

interface Vec2 { x: number; y: number }

// ─── Constants ────────────────────────────────────────────────────────────────

const CX = 420  // SVG center X
const CY = 310  // SVG center Y
const R  = 225  // orbit radius
const NR = 33   // node radius

// ─── Sector data (real Binova Holding Group) ──────────────────────────────────

const SECTORS: Sector[] = [
  { id: 0,  name: 'Banking\n& Finance',      shortName: 'Banking & Finance',      Icon: Landmark,          color: '#6EE7B7', description: 'Capital markets, banking & financial services' },
  { id: 1,  name: 'Public Works\n& Real Estate',           shortName: 'Public Works & Real Estate',           Icon: Building2,         color: '#93C5FD', description: 'Infrastructure, construction & civil engineering' },
  { id: 2,  name: 'Health &\nSciences',      shortName: 'Health & Sciences',      Icon: FlaskConical,      color: '#F9A8D4', description: 'Medical research, pharma & healthcare innovation' },
  { id: 3,  name: 'Textile &\nPaper',        shortName: 'Textile & Paper',        Icon: Layers,            color: '#FDE68A', description: 'Industrial textiles, packaging & paper products' },
  { id: 4,  name: 'Electronics',             shortName: 'Electronics',            Icon: MonitorSmartphone, color: '#C4B5FD', description: 'Consumer electronics & digital devices' },
  { id: 5,  name: 'Energy\nIndustry',        shortName: 'Energy Industry',        Icon: Zap,               color: '#FCD34D', description: 'Oil, gas, renewables & smart energy grids' },
  { id: 6,  name: 'Transportation',          shortName: 'Transportation',         Icon: Truck,             color: '#6EE7B7', description: 'Logistics, freight & mobility solutions' },
  { id: 7,  name: 'Foods &\nBeverages',      shortName: 'Foods & Beverages',      Icon: UtensilsCrossed,   color: '#FDBA74', description: 'Artisanal food brands, agro-processing & distribution' },
  { id: 8,  name: 'Agriculture\n& Livestock',shortName: 'Agriculture & Livestock',Icon: Wheat,             color: '#86EFAC', description: 'Sustainable farming, livestock & agri-supply chains' },
  { id: 9,  name: 'Supermarkets',            shortName: 'Supermarkets',           Icon: ShoppingCart,      color: '#FCA5A5', description: 'Retail distribution & consumer goods' },
  { id: 10, name: 'Telecom\n& Media',        shortName: 'Telecom & Media',        Icon: Radio,             color: '#FDBA74', description: 'Telecommunications, broadcast & digital media' },
  { id: 11, name: 'Education\n& Training',   shortName: 'Education & Training',   Icon: GraduationCap,     color: '#A5F3FC', description: 'Academic institutions, vocational & EdTech platforms' },
  { id: 12, name: 'Automotive\n& Aerospace', shortName: 'Automotive & Aerospace', Icon: Car,               color: '#FCA5A5', description: 'Vehicle manufacturing, EV & mobility innovation' },
  { id: 13, name: 'Mining\nIndustry',        shortName: 'Mining Industry',        Icon: Pickaxe,           color: '#E2B976', description: 'Mineral extraction, processing & resource management' },
  { id: 14, name: 'Logistics\nTransportation',        shortName: 'Logistics & Transportation',        Icon: Truck,           color: '#FCA5A5', description: 'Supply chain management, freight & distribution' },
]

// ─── Geometry helpers ─────────────────────────────────────────────────────────

function sectorAngle(i: number): number {
  return (i * (2 * Math.PI)) / SECTORS.length - Math.PI / 2
}

function sectorPos(i: number): Vec2 {
  const a = sectorAngle(i)
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
}

function labelAnchor(cosA: number): 'middle' | 'start' | 'end' {
  if (Math.abs(cosA) < 0.18) return 'middle'
  return cosA > 0 ? 'start' : 'end'
}

// ─── SVG Defs (gradients + filters) ──────────────────────────────────────────

function SvgDefs() {
  return (
    <defs>
      <radialGradient id="bvAura" cx="50%" cy="50%">
        <stop offset="0%"   stopColor="#135B34" stopOpacity="0.08" />
        <stop offset="65%"  stopColor="#135B34" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#135B34" stopOpacity="0"    />
      </radialGradient>

      <linearGradient id="bvLogoFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0F7F4" />
      </linearGradient>

      <linearGradient id="bvLogoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#135B34" />
        <stop offset="50%"  stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#135B34" />
      </linearGradient>

      <linearGradient id="bvLogoText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#2D3748" />
        <stop offset="50%"  stopColor="#135B34" />
        <stop offset="100%" stopColor="#2D3748" />
      </linearGradient>

      <filter id="bvGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
  )
}

// ─── Orbital ring ─────────────────────────────────────────────────────────────

interface OrbitalRingProps { r: number; dur: string; dash: string; ccw?: boolean }

function OrbitalRing({ r, dur, dash, ccw = false }: OrbitalRingProps) {
  return (
    <circle cx={CX} cy={CY} r={r} fill="none"
      stroke="rgba(19,91,52,0.12)" strokeWidth="0.8" strokeDasharray={dash}>
      <animateTransform attributeName="transform" type="rotate"
        from={`0 ${CX} ${CY}`}
        to={ccw ? `-360 ${CX} ${CY}` : `360 ${CX} ${CY}`}
        dur={dur} repeatCount="indefinite" />
    </circle>
  )
}

// ─── Orbital particle ─────────────────────────────────────────────────────────

interface OrbitalParticleProps {
  r: number; deg: number; dur: string
  size?: number; color?: string; ccw?: boolean
}

function OrbitalParticle({ r, deg, dur, size = 2.4, color = '#135B34', ccw = false }: OrbitalParticleProps) {
  const rad = (deg * Math.PI) / 180
  return (
    <circle cx={CX + r * Math.cos(rad)} cy={CY + r * Math.sin(rad)} r={size} fill={color} opacity="0.3">
      <animateTransform attributeName="transform" type="rotate"
        from={`0 ${CX} ${CY}`}
        to={ccw ? `-360 ${CX} ${CY}` : `360 ${CX} ${CY}`}
        dur={dur} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3.5s" repeatCount="indefinite" />
    </circle>
  )
}

// ─── Connection line ──────────────────────────────────────────────────────────

interface ConnectionLineProps { index: number; active: boolean; color: string }

function ConnectionLine({ index, active, color }: ConnectionLineProps) {
  const p = sectorPos(index)
  return (
    <g>
      {/* Static line */}
      <line x1={CX} y1={CY} x2={p.x} y2={p.y}
        stroke={active ? color : 'rgba(226,232,240,0.6)'}
        strokeWidth={active ? 1.6 : 0.9}
        strokeLinecap="round"
        opacity={active ? 0.85 : 0.5}
        style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease, opacity 0.4s ease' }}
      />
      {/* Animated flow line on active */}
      {active && (
        <line x1={CX} y1={CY} x2={p.x} y2={p.y}
          stroke={color} strokeWidth="2.8" strokeLinecap="round"
          strokeDasharray="10 130" opacity="0.8" filter="url(#bvGlow)">
          <animate attributeName="stroke-dashoffset" from="140" to="0" dur="1.8s" repeatCount="indefinite" />
        </line>
      )}
    </g>
  )
}

// ─── Sector node ──────────────────────────────────────────────────────────────

interface SectorNodeProps {
  sector: Sector
  index: number
  active: boolean
  onEnter: () => void
  onLeave: () => void
}

function SectorNode({ sector, index, active, onEnter, onLeave }: SectorNodeProps) {
  const { Icon } = sector
  const p        = sectorPos(index)
  const a        = sectorAngle(index)
  const cosA     = Math.cos(a)

  const lDist  = NR + 28
  const lx     = p.x + lDist * cosA
  const ly     = p.y + lDist * Math.sin(a)
  const anchor = labelAnchor(cosA)

  const lines = sector.name.split('\n')
  const BW    = 112
  const BH    = lines.length * 15 + 8
  const bx    = anchor === 'middle' ? lx - BW / 2
              : anchor === 'start'  ? lx - 4
              :                       lx - BW + 4

  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: 'pointer' }}>
      {/* Pulsing halo */}
      {active && (
        <circle cx={p.x} cy={p.y} r={NR + 22} fill={sector.color} opacity="0.08">
          <animate attributeName="r"
            values={`${NR + 18};${NR + 27};${NR + 18}`} dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer dashed ring (rotates when active) */}
      <circle cx={p.x} cy={p.y} r={NR + 9}
        fill="none"
        stroke={active ? sector.color : 'rgba(19,91,52,0.15)'}
        strokeWidth="1" strokeDasharray="3 7"
        opacity={active ? 0.6 : 0.35}
        style={{ transition: 'stroke 0.35s ease, opacity 0.35s ease' }}>
        {active && (
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${p.x} ${p.y}`} to={`360 ${p.x} ${p.y}`}
            dur="9s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Main circle */}
      <circle cx={p.x} cy={p.y} r={NR}
        fill={active ? '#FFFFFF' : '#F0F7F4'}
        stroke={active ? sector.color : 'rgba(19,91,52,0.25)'}
        strokeWidth={active ? 2 : 1.5}
        style={{ transition: 'all 0.35s ease' }}
      />

      {/* Lucide icon via foreignObject */}
      <foreignObject x={p.x - 11} y={p.y - 11} width="22" height="22">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore – foreignObject children need xmlns in some TSX setups */}
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Icon
            size={18}
            strokeWidth={1.6}
            style={{ color: active ? sector.color : '#4A5568', transition: 'color 0.3s ease' }}
          />
        </div>
      </foreignObject>

      {/* Label background */}
      <rect x={bx} y={ly - 13} width={BW} height={BH}
        fill={active ? '#FFFFFF' : '#F7F9FA'} opacity="0.95" rx="7"
        style={{ transition: 'fill 0.3s ease' }}
      />

      {/* Label text lines */}
      {lines.map((word, wi) => {
        const tx = anchor === 'middle' ? lx
                 : anchor === 'start'  ? lx + 2
                 :                       lx - 2
        return (
          <text key={wi}
            x={tx} y={ly - 1 + wi * 15}
            textAnchor={anchor}
            fontSize="9.5" fontWeight="600" letterSpacing="0.7"
            fill={active ? sector.color : '#4A5568'}
            style={{ transition: 'fill 0.35s ease', fontFamily: "'DM Sans', sans-serif" }}>
            {word.toUpperCase()}
          </text>
        )
      })}
    </g>
  )
}

// ─── Central logo ─────────────────────────────────────────────────────────────

function CentralLogo() {
  const corners: [[number, number], [number, number]][] = [
    [[-90, -56], [-76, -56]], [[-90, -56], [-90, -42]],
    [[ 90, -56], [ 76, -56]], [[ 90, -56], [ 90, -42]],
    [[-90,  56], [-76,  56]], [[-90,  56], [-90,  42]],
    [[ 90,  56], [ 76,  56]], [[ 90,  56], [ 90,  42]],
  ]

  return (
    <g transform={`translate(${CX}, ${CY})`}>
      {/* Ambient pulse */}
      <circle r="95" fill="#135B34" opacity="0.04">
        <animate attributeName="r"       values="88;108;88"       dur="7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.03;0.07;0.03"  dur="7s" repeatCount="indefinite" />
      </circle>

      {/* Card */}
      <rect x="-92" y="-58" width="184" height="116" rx="17"
        fill="url(#bvLogoFill)" stroke="url(#bvLogoBorder)" strokeWidth="1.6" />
      <rect x="-85" y="-51" width="170" height="102" rx="13"
        fill="none" stroke="rgba(19,91,52,0.15)" strokeWidth="0.8" />

      {/* Corner accents */}
      {corners.map(([[x1, y1], [x2, y2]], i) => (
        <line key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      ))}

      {/* BINOVA text */}
      <text y="-10" textAnchor="middle" fontSize="24" letterSpacing="4.5"
        fill="url(#bvLogoText)" fontWeight="700"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        BINOVA
      </text>

      {/* Animated separator */}
      <rect x="-54" y="2" width="108" height="1.5" rx="1"
        fill="url(#bvLogoBorder)" opacity="0.75">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
      </rect>

      {/* HOLDING GROUP */}
      <text y="19" textAnchor="middle" fontSize="9.5" letterSpacing="2.5"
        fill="#4A5568" fontWeight="500"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        HOLDING GROUP
      </text>

      {/* Tagline */}
      <text y="37" textAnchor="middle" fontSize="6.5" letterSpacing="1.5"
        fill="rgba(212,175,55,0.6)"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        A PASSION FOR EXCELLENCE
      </text>
    </g>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function TooltipCard({ sector }: { sector: Sector | null }) {
  return (
    <AnimatePresence mode="wait">
      {sector && (
        <motion.div
          key={sector.id}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
          style={{ filter: `drop-shadow(0 0 20px ${sector.color}28)` }}
        >
          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-2.5 border whitespace-nowrap"
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderColor: `${sector.color}45`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <span className="h-2 w-2 rounded-full flex-shrink-0"
              style={{ background: sector.color, boxShadow: `0 0 8px ${sector.color}` }} />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em]"
              style={{ color: sector.color }}>
              {sector.shortName}
            </span>
            <span className="text-[#A0AEC0] hidden sm:block">·</span>
            <span className="text-[11px] text-[#4A5568] hidden sm:block">{sector.description}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps { value: string; label: string; accent: string }

function StatCard({ value, label, accent }: StatCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-2xl px-8 py-4 border cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(247,249,250,0.9)',
        borderColor: hovered ? `${accent}50` : 'rgba(226,232,240,0.6)',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${accent}08 0%, transparent 70%)` }} />
      )}
      <div className="text-3xl font-bold" style={{ color: accent }}>{value}</div>
      <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A0AEC0]">{label}</div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SectorsBentoGrid() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [autoIdx, setAutoIdx] = useState<number>(0)
  const userHoverRef          = useRef<boolean>(false)
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null)

  const restartAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!userHoverRef.current) {
      timerRef.current = setInterval(() => {
        setAutoIdx(i => (i + 1) % SECTORS.length)
      }, 2000)
    }
  }

  useEffect(() => {
    restartAuto()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEnter = (i: number) => {
    userHoverRef.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    setHovered(i)
  }
  const handleLeave = () => {
    setHovered(null)
    userHoverRef.current = false
    restartAuto()
  }

  const active       = hovered ?? autoIdx
  const activeSector = SECTORS[active] ?? null

  // Orbital config
  const rings: OrbitalRingProps[] = [
    { r: 135, dur: '75s', dash: '6 14'         },
    { r: 182, dur: '95s', dash: '4 18', ccw: true },
    { r: 240, dur: '55s', dash: '2 24'         },
  ]

  const particles: OrbitalParticleProps[] = [
    { r: 155, deg: 30,  dur: '44s'                    },
    { r: 155, deg: 150, dur: '44s'                    },
    { r: 155, deg: 270, dur: '44s'                    },
    { r: 195, deg: 60,  dur: '60s', ccw: true         },
    { r: 195, deg: 200, dur: '60s', ccw: true         },
    { r: 235, deg: 100, dur: '68s', size: 1.6, color: '#D4AF37' },
    { r: 235, deg: 280, dur: '68s', size: 1.6, color: '#135B34' },
  ]

  const stats: StatCardProps[] = [
    { value: `${SECTORS.length}`, label: 'Sectors',    accent: '#135B34' },
    { value: '2',                 label: 'Continents', accent: '#D4AF37' },
    { value: '50+',               label: 'Experts',    accent: '#135B34' },
    { value: '∞',                 label: 'Ambition',   accent: '#D4AF37' },
  ]

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background: 'linear-gradient(160deg, #F0F7F4 0%, #FFFFFF 55%, #F7F9FA 100%)',
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      {/* Noise grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.035) 0%, transparent 68%)' }} />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] -translate-y-1/4 translate-x-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] translate-y-1/4 -translate-x-1/4 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.025) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase text-[#135B34]"
            style={{ letterSpacing: '0.3em' }}
          >
            <span className="block h-px w-6 bg-[#135B34]/40" />
            Our Ecosystem
            <span className="block h-px w-6 bg-[#135B34]/40" />
          </motion.span>

          <h2
            className="text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #2D3748 0%, #4A5568 40%, #135B34 78%, #2D3748 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Binova Universe
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#4A5568]"
          >
            A constellation of{' '}
            <span className="font-semibold text-[#135B34]">{SECTORS.length} strategic sectors</span>
            {' '}orbiting a unified vision of sustainable growth and lasting impact.
          </motion.p>
        </motion.div>

        {/* ── SVG Visualization ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <svg viewBox="0 0 840 620" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <SvgDefs />

            {/* Ambient center glow */}
            <circle cx={CX} cy={CY} r="285" fill="url(#bvAura)">
              <animate attributeName="r" values="278;296;278" dur="11s" repeatCount="indefinite" />
            </circle>

            {/* Orbital rings */}
            {rings.map((props, i) => <OrbitalRing key={i} {...props} />)}

            {/* Particles */}
            {particles.map((props, i) => <OrbitalParticle key={i} {...props} />)}

            {/* Connection lines (rendered behind nodes) */}
            {SECTORS.map((sector, i) => (
              <ConnectionLine key={sector.id} index={i} active={active === i} color={sector.color} />
            ))}

            {/* Sector nodes */}
            {SECTORS.map((sector, i) => (
              <SectorNode
                key={sector.id}
                sector={sector}
                index={i}
                active={active === i}
                onEnter={() => handleEnter(i)}
                onLeave={handleLeave}
              />
            ))}

            {/* Central logo (on top) */}
            <CentralLogo />
          </svg>

          {/* Floating tooltip */}
          <TooltipCard sector={activeSector} />
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85 }}
          className="mt-6 text-center text-[11px] text-[#A0AEC0] tracking-wide"
        >
          Hover any sector to explore our ecosystem
        </motion.p>

      </div>
    </section>
  )
}