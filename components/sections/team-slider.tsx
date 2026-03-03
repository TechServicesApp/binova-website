'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'

const AVATAR_COLORS = ['#135B34', '#D4AF37', '#4A5568', '#2D3748', '#1a8a4c', '#E8D7A0']

export function TeamSlider() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const next = () => setCurrent((p) => (p + 1) % TEAM_MEMBERS.length)
  const prev = () => setCurrent((p) => (p - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)

  // Auto-play
  useEffect(() => {
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F7F4] via-white to-[#F7F9FA] py-24 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#135B34]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block text-xs font-sans uppercase tracking-[0.2em] text-[#135B34]"
          >
            Leadership
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-semibold text-[#2D3748] md:text-5xl lg:text-6xl"
          >
            Team Makes The Difference
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-[#4A5568] font-sans leading-relaxed">
            With a large number of diversified skills, our team drives excellence across 
            every project and every sector.
          </motion.p>
        </motion.div>

        {/* Horizontal Carousel Slider */}
        <div ref={containerRef} className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${current * (100 / 3)}%` }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {TEAM_MEMBERS.map((member, i) => {
                const distance = Math.abs(i - current)
                const isActive = i === current
                
                return (
                  <motion.div
                    key={i}
                    className="min-w-[calc(33.333%-1rem)] relative"
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: distance > 2 ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="group relative rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center backdrop-blur-xl transition-all hover:border-[#135B34]/30 hover:shadow-[0_12px_40px_rgba(19,91,52,0.12)] overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#135B34]/10 to-transparent rounded-tr-full" />
                      
                      {/* Avatar with gradient ring */}
                      <motion.div
                        className="relative mx-auto mb-6 w-32 h-32"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#135B34] to-[#D4AF37] p-[3px]">
                          <div
                            className="h-full w-full rounded-full flex items-center justify-center text-4xl font-display font-bold text-white relative overflow-hidden"
                            style={{ 
                              background: `linear-gradient(135deg, ${AVATAR_COLORS[i % AVATAR_COLORS.length]}30 0%, ${AVATAR_COLORS[i % AVATAR_COLORS.length]}50 100%)`,
                            }}
                          >
                            <div className="absolute inset-0 bg-white/80" />
                            <span className="relative z-10" style={{ color: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                              {member.firstName[0]}{member.lastName[0]}
                            </span>
                          </div>
                        </div>
                        {/* Pulsing ring */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: AVATAR_COLORS[i % AVATAR_COLORS.length] + '40' }}
                          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </motion.div>

                      <div className="relative z-10">
                        <h3 className="font-display text-2xl font-semibold text-[#2D3748] mb-1">
                          {member.firstName}
                        </h3>
                        <p className="font-display text-lg font-medium text-[#4A5568] mb-4">
                          {member.lastName}
                        </p>

                        <motion.div
                          className="mx-auto my-4 h-[2px] w-12 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${AVATAR_COLORS[i % AVATAR_COLORS.length]}, #D4AF37)` 
                          }}
                          whileHover={{ width: 60 }}
                          transition={{ duration: 0.3 }}
                        />

                        <p className="font-sans text-sm font-semibold text-[#135B34] mb-1">{member.position}</p>
                        <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wider">{member.department}</p>

                        {/* LinkedIn with hover effect */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="mt-6"
                        >
                          <button
                            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F7F4] text-[#135B34] transition-all hover:bg-[#135B34] hover:text-white hover:shadow-lg"
                            aria-label={`${member.firstName} ${member.lastName} LinkedIn`}
                          >
                            <Linkedin className="h-4 w-4" />
                          </button>
                        </motion.div>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div 
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                          style={{ background: 'linear-gradient(90deg, #135B34, #D4AF37)' }}
                          layoutId="activeIndicator"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <motion.button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-[#E2E8F0] text-[#4A5568] transition-all hover:border-[#135B34] hover:text-[#135B34] hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous team member"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            {/* Progress dots with animation */}
            <div className="flex gap-3">
              {TEAM_MEMBERS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative h-3 rounded-full transition-all overflow-hidden"
                  style={{
                    width: i === current ? '32px' : '12px',
                    backgroundColor: i === current ? '#135B34' : '#E2E8F0',
                  }}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to team member ${i + 1}`}
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#135B34] to-[#D4AF37]"
                      layoutId="activeDot"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-[#E2E8F0] text-[#4A5568] transition-all hover:border-[#135B34] hover:text-[#135B34] hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next team member"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
