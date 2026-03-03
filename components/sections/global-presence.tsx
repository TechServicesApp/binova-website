'use client'

import { motion } from 'framer-motion'
import { OFFICES } from '@/lib/constants'
import { fadeUp, staggerContainer, slideFromLeft, slideFromRight } from '@/lib/animations'
import { MapPin, Mail, Phone } from 'lucide-react'

export function GlobalPresence() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left - Map Visualization */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideFromLeft}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              {/* Animated ambient glow */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(19,91,52,0.1)',
                    '0 0 60px rgba(19,91,52,0.2)',
                    '0 0 40px rgba(19,91,52,0.1)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Orbital particles */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2"
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      rotate: [angle, angle + 360],
                    }}
                    transition={{
                      duration: 20 + i * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div 
                      className="rounded-full"
                      style={{
                        width: '3px',
                        height: '3px',
                        backgroundColor: i % 2 === 0 ? '#135B34' : '#D4AF37',
                        opacity: 0.3,
                        transform: 'translateX(180px)',
                        boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(19,91,52,0.4)' : 'rgba(212,175,55,0.4)'}`,
                      }}
                    />
                  </motion.div>
                )
              })}
              
              {/* Simplified world map visualization */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#F7F9FA] border border-[#E2E8F0] shadow-[0_8px_32px_rgba(19,91,52,0.08)]"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Globe grid lines with rotation */}
                <motion.svg 
                  viewBox="0 0 400 400" 
                  className="absolute inset-0 h-full w-full" 
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Horizontal lines */}
                  <motion.ellipse 
                    cx="200" cy="200" rx="180" ry="180" 
                    stroke="#E2E8F0" strokeWidth="1"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.ellipse 
                    cx="200" cy="200" rx="180" ry="120" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />
                  <motion.ellipse 
                    cx="200" cy="200" rx="180" ry="60" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                  <motion.line 
                    x1="200" y1="20" x2="200" y2="380" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                  <motion.line 
                    x1="20" y1="200" x2="380" y2="200" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                  />
                  <motion.ellipse 
                    cx="200" cy="200" rx="120" ry="180" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  />
                  <motion.ellipse 
                    cx="200" cy="200" rx="60" ry="180" 
                    stroke="#E2E8F0" strokeWidth="0.8"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  />
                </motion.svg>

                {/* Canada pin */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute"
                  style={{ top: '28%', left: '25%' }}
                >
                  <motion.div 
                    className="relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <motion.div 
                      className="h-4 w-4 rounded-full bg-[#135B34] shadow-[0_0_16px_rgba(19,91,52,0.4)]"
                      animate={{ 
                        boxShadow: [
                          '0 0 16px rgba(19,91,52,0.4)',
                          '0 0 24px rgba(19,91,52,0.6)',
                          '0 0 16px rgba(19,91,52,0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-[#135B34]/30" />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs font-medium text-[#135B34]">
                      Canada
                    </span>
                  </motion.div>
                </motion.div>

                {/* Cameroon pin */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                  className="absolute"
                  style={{ top: '52%', left: '52%' }}
                >
                  <motion.div 
                    className="relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <motion.div 
                      className="h-4 w-4 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.4)]"
                      animate={{ 
                        boxShadow: [
                          '0 0 16px rgba(212,175,55,0.4)',
                          '0 0 24px rgba(212,175,55,0.6)',
                          '0 0 16px rgba(212,175,55,0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                    <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-[#D4AF37]/30" />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs font-medium text-[#D4AF37]">
                      Cameroon
                    </span>
                  </motion.div>
                </motion.div>

                {/* Connecting Arc */}
                <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none">
                  <motion.path
                    d="M 100 112 Q 200 80 208 208"
                    stroke="url(#arc-gradient)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 1.5, ease: 'easeInOut' }}
                  />
                  {/* Animated pulse along the arc */}
                  <motion.path
                    d="M 100 112 Q 200 80 208 208"
                    stroke="url(#arc-gradient-bright)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      delay: 2,
                      duration: 3, 
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 1
                    }}
                  />
                  <defs>
                    <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#135B34" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <linearGradient id="arc-gradient-bright" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#135B34" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#1a8a4c" stopOpacity="1" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-block text-xs font-sans uppercase tracking-[0.2em] text-[#135B34]"
            >
              Global Presence
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mb-4 font-display text-4xl font-semibold italic text-[#2D3748] md:text-5xl"
            >
              Two Continents.<br />One Vision.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-10 text-base text-[#4A5568] font-sans leading-relaxed">
              Strategically positioned between North America and Central Africa to connect
              markets, capital, and opportunities.
            </motion.p>

            {/* Office Cards */}
            <div className="flex flex-col gap-4">
              {OFFICES.map((office, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:border-[#135B34]/30 hover:shadow-[0_4px_20px_rgba(19,91,52,0.08)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-sans text-2xl">{office.flag === 'CA' ? '🇨🇦' : '🇨🇲'}</span>
                    <div>
                      <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[#2D3748]">
                        {office.country}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-sans">{office.type}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[#4A5568] font-sans">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#135B34]" />
                      <span>{office.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#135B34]" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-[#135B34]" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
