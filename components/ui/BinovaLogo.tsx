// components/BinovaLogo.tsx
// Reproduction pixel-perfect du logo officiel Binova Holding Group

import { useId } from 'react'

interface BinovaLogoProps {
  size?: number
  variant?: 'full' | 'icon'
  /** Couleur du texte principal — défaut blanc pour fonds sombres */
  textColor?: string
  /** Couleur du sous-titre — défaut blanc translucide */
  subColor?: string
}

export function BinovaLogo({
  size = 52,
  variant = 'full',
  textColor = '#ffffff',
  subColor = 'rgba(255,255,255,0.85)',
}: BinovaLogoProps) {
  // IDs uniques pour éviter les conflits SVG quand plusieurs logos sont affichés
  const id = useId()
  const shadowId = `bv-shadow-${id}`
  const epiId = `bv-epi-${id}`
  const leafExtId = `bv-leaf-ext-${id}`
  const leafIntId = `bv-leaf-int-${id}`
  const sunId = `bv-sun-${id}`

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(size * 0.22) }}>

      {/* ══════════════════════════════════════════════════════════════════
          PICTOGRAMME SVG — Fidèle au logo officiel Binova
          • 4 feuilles : 2 extérieures larges inclinées + 2 intérieures
          • Épi central vert clair effilé avec reflet
          • 2 soleils jaune-orangé
          • 3 points rouges verticaux
          • Base verte aplatie
          • Cercle blanc avec bordure verte
      ══════════════════════════════════════════════════════════════════ */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Ombre portée douce sous le cercle */}
          <filter id={shadowId} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000030" />
          </filter>

          {/* Dégradé latéral pour l'épi central */}
          <linearGradient id={epiId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3d8c28" />
            <stop offset="35%"  stopColor="#7dbc48" />
            <stop offset="65%"  stopColor="#5fa832" />
            <stop offset="100%" stopColor="#2d6a1a" />
          </linearGradient>

          {/* Dégradé feuilles extérieures */}
          <linearGradient id={leafExtId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1a5218" />
            <stop offset="50%"  stopColor="#2a7020" />
            <stop offset="100%" stopColor="#1a5218" />
          </linearGradient>

          {/* Dégradé feuilles intérieures */}
          <linearGradient id={leafIntId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1e5c1c" />
            <stop offset="50%"  stopColor="#2e7a28" />
            <stop offset="100%" stopColor="#1e5c1c" />
          </linearGradient>

          {/* Dégradé radial soleil */}
          <radialGradient id={sunId} cx="40%" cy="38%">
            <stop offset="0%"   stopColor="#ffe040" />
            <stop offset="55%"  stopColor="#ffc020" />
            <stop offset="100%" stopColor="#f09000" />
          </radialGradient>
        </defs>

        {/* ── Cercle blanc (avec ombre) ── */}
        <circle cx="100" cy="100" r="96" fill="white" filter={`url(#${shadowId})`} />

        {/* ── Feuille extérieure gauche (large, inclinée ~38°) ── */}
        <ellipse cx="55" cy="115" rx="15" ry="56"
          transform="rotate(-38 55 115)"
          fill={`url(#${leafExtId})`} />
        <line x1="36" y1="68" x2="66" y2="155"
          stroke="#1a5218" strokeWidth="1.2" opacity="0.55" />

        {/* ── Feuille extérieure droite ── */}
        <ellipse cx="145" cy="115" rx="15" ry="56"
          transform="rotate(38 145 115)"
          fill={`url(#${leafExtId})`} />
        <line x1="164" y1="68" x2="134" y2="155"
          stroke="#1a5218" strokeWidth="1.2" opacity="0.55" />

        {/* ── Feuille intérieure gauche (moins large, ~18°) ── */}
        <ellipse cx="76" cy="120" rx="11" ry="48"
          transform="rotate(-18 76 120)"
          fill={`url(#${leafIntId})`} />

        {/* ── Feuille intérieure droite ── */}
        <ellipse cx="124" cy="120" rx="11" ry="48"
          transform="rotate(18 124 120)"
          fill={`url(#${leafIntId})`} />

        {/* ── Épi central : ombre de profondeur ── */}
        <ellipse cx="103" cy="110" rx="17" ry="55" fill="#2a6a15" opacity="0.35" />

        {/* ── Épi central : corps principal ── */}
        <ellipse cx="100" cy="108" rx="16" ry="54" fill={`url(#${epiId})`} />

        {/* ── Épi central : reflet clair (highlight gauche) ── */}
        <ellipse cx="94" cy="98" rx="5.5" ry="30"
          fill="#a8d860" opacity="0.55" />

        {/* ── Base / sol ── */}
        <ellipse cx="100" cy="162" rx="26" ry="7" fill="#1e5c1c" opacity="0.6" />

        {/* ── Soleil gauche ── */}
        <circle cx="68" cy="60" r="15" fill={`url(#${sunId})`} />

        {/* ── Soleil droit ── */}
        <circle cx="132" cy="60" r="15" fill={`url(#${sunId})`} />

        {/* ── 3 points rouges (haut / milieu / bas) ── */}
        <circle cx="100" cy="84"  r="7.5" fill="#cc1800" />
        <circle cx="100" cy="84"  r="5"   fill="#e62010" />

        <circle cx="100" cy="108" r="7.5" fill="#cc1800" />
        <circle cx="100" cy="108" r="5"   fill="#e62010" />

        <circle cx="100" cy="132" r="7.5" fill="#cc1800" />
        <circle cx="100" cy="132" r="5"   fill="#e62010" />

        {/* ── Bordure cercle vert foncé ── */}
        <circle cx="100" cy="100" r="96"
          fill="none" stroke="#1a5218" strokeWidth="3.5" />
      </svg>

      {/* ══════════════════════════════════════════════════════════════════
          WORDMARK  (si variant='full')
          Typographie Georgia serif, identique au logo officiel
      ══════════════════════════════════════════════════════════════════ */}
      {variant === 'full' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          {/* "Binova" — bold, grande taille */}
          <span
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: Math.round(size * 0.52),
              fontWeight: 700,
              color: textColor,
              letterSpacing: '0.01em',
              lineHeight: 1.1,
            }}
          >
            Binova
          </span>
          {/* "Holding Group" — regular, légèrement plus petit */}
          <span
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: Math.round(size * 0.28),
              fontWeight: 400,
              color: subColor,
              letterSpacing: '0.02em',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            Holding Group
          </span>
        </div>
      )}
    </div>
  )
}