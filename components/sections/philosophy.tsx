'use client'

import { motion } from 'framer-motion'
import { PHILOSOPHY_PILLARS } from '@/lib/constants'
import { fadeUp, staggerContainer, slideFromLeft, slideFromRight } from '@/lib/animations'
import { Globe, Lightbulb, Leaf } from 'lucide-react'

const ICONS = {
  globe: Globe,
  lightbulb: Lightbulb,
  leaf: Leaf,
}

export function Philosophy() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F7F9FA] py-24 lg:py-32">
      {/* Gradient Orbs */}
      <div
        className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #135B34 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite 5s',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5 lg:items-center">
          {/* Left side - Quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            <motion.span
              variants={slideFromLeft}
              className="mb-6 inline-block text-xs font-sans uppercase tracking-[0.2em] text-[#135B34]"
            >
              Our Philosophy
            </motion.span>

            <div className="mb-8" style={{ transform: 'rotate(-1deg)' }}>
              {['No Vision,', 'No Passion,', 'No Action.'].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="block font-display text-5xl font-semibold italic text-[#2D3748] md:text-6xl lg:text-7xl">
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={slideFromLeft}
              className="mb-6 h-[2px] w-20"
              style={{ background: 'linear-gradient(90deg, #D4AF37, #F0CC5A)' }}
            />

            <motion.p variants={slideFromLeft} className="text-base leading-relaxed text-[#4A5568] font-sans">
              Binova Holding Group is driven by an unwavering commitment to excellence.
              We believe that true leadership requires bold vision, genuine passion, and
              decisive action to create lasting value across every sector we touch.
            </motion.p>
          </motion.div>

          {/* Right side - Pillar Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="flex flex-col gap-6 lg:col-span-3"
          >
            {PHILOSOPHY_PILLARS.map((pillar, i) => {
              const Icon = ICONS[pillar.icon as keyof typeof ICONS]
              return (
                <motion.div
                  key={i}
                  variants={slideFromRight}
                  className="group rounded-2xl border border-[#E2E8F0] bg-white p-8 backdrop-blur-xl transition-all hover:border-[#135B34]/30 hover:shadow-[0_4px_24px_rgba(19,91,52,0.08)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F7F4]">
                      <Icon className="h-6 w-6 text-[#135B34]" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                        {pillar.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#4A5568] font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
