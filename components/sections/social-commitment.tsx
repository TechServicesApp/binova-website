'use client'

import { motion } from 'framer-motion'
import { SOCIAL_CARDS } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Leaf, Users, CheckCircle } from 'lucide-react'

const ICONS = {
  leaf: Leaf,
  users: Users,
  'check-circle': CheckCircle,
}

const MARQUEE_TEXT = 'ECO-FRIENDLY \u00B7 COMMUNITY DRIVEN \u00B7 BEYOND COMPLIANCE \u00B7 SUSTAINABLE \u00B7 IMPACTFUL \u00B7 '

export function SocialCommitment() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#F0F7F4]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-6 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl font-semibold italic text-[#135B34] md:text-6xl lg:text-7xl"
          >
            <span className="block">No Sustainability,</span>
            <span className="block">No Excellence.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-[#4A5568] font-sans">
            We love the earth. We have only one.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {SOCIAL_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS]
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ rotateY: 5, scale: 1.02 }}
                className="group rounded-2xl border border-[#E2E8F0] bg-white p-8 backdrop-blur-sm transition-all hover:border-[#135B34]/30 hover:shadow-[0_4px_24px_rgba(19,91,52,0.08)]"
                style={{ perspective: '1000px' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F7F4]">
                  <Icon className="h-6 w-6 text-[#135B34]" />
                </div>
                <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden bg-white border-y border-[#E2E8F0] py-4">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          <span className="font-sans text-sm uppercase tracking-[0.25em] text-[#135B34]/40">
            {MARQUEE_TEXT.repeat(6)}
          </span>
          <span className="font-sans text-sm uppercase tracking-[0.25em] text-[#135B34]/40">
            {MARQUEE_TEXT.repeat(6)}
          </span>
        </div>
      </div>
    </section>
  )
}
