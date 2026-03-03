'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SERVICES } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Search, Compass, Package, BarChart3 } from 'lucide-react'

const ICONS = {
  search: Search,
  compass: Compass,
  package: Package,
  gantt: BarChart3,
}

export function ServicesTimeline() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="relative overflow-hidden bg-[#F0F7F4] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-20 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block text-xs font-sans uppercase tracking-[0.2em] text-[#135B34]"
          >
            What We Do
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-semibold text-[#2D3748] md:text-5xl lg:text-6xl"
          >
            Our Services
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base text-[#4A5568] font-sans leading-relaxed">
            From feasibility to completion, we deliver end-to-end solutions with excellence at every stage.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Progress Line - Desktop */}
          <div className="absolute left-0 right-0 top-[30px] hidden h-[2px] bg-[#E2E8F0] lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #135B34, #D4AF37)',
                filter: 'drop-shadow(0 0 4px rgba(19,91,52,0.2))',
              }}
            />
          </div>

          {/* Progress Line - Mobile (vertical) */}
          <div className="absolute left-[30px] top-0 bottom-0 w-[2px] bg-[#E2E8F0] lg:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #135B34, #D4AF37)',
                filter: 'drop-shadow(0 0 4px rgba(19,91,52,0.2))',
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon as keyof typeof ICONS]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border-2 border-[#135B34] bg-white transition-shadow hover:shadow-[0_0_16px_rgba(19,91,52,0.15)]">
                    <span className="font-mono text-lg font-medium text-[#135B34]">
                      {service.step}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="group flex-1 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:-translate-y-2 hover:border-[#135B34]/30 hover:shadow-[0_4px_20px_rgba(19,91,52,0.08)]">
                    <Icon className="mb-3 h-8 w-8 text-[#D4AF37]" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-[#2D3748] lg:text-2xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A5568] font-sans">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
