'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F7F4] via-white to-[#F7F9FA] py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[#135B34]/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-[15%] bottom-[15%] h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Geometric patterns */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#135B34" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8"
      >
        {/* Decorative top line */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-8 flex items-center justify-center gap-4"
        >
          <motion.div 
            className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#135B34]"
            animate={{ width: ['48px', '64px', '48px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#135B34] font-semibold">
            Get Started
          </span>
          <motion.div 
            className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"
            animate={{ width: ['48px', '64px', '48px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </motion.div>
        
        <motion.h2
          variants={fadeUp}
          className="mb-6 font-display text-5xl font-bold text-[#2D3748] md:text-6xl lg:text-7xl leading-tight"
        >
          <span className="inline-block bg-gradient-to-r from-[#135B34] to-[#1a8a4c] bg-clip-text text-transparent">
            Ready to Transform
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-[#2D3748] to-[#4A5568] bg-clip-text text-transparent">
            Your Project?
          </span>
        </motion.h2>
        
        <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-lg text-[#4A5568] font-sans leading-relaxed">
          Let us bring our expertise in feasibility, design, supply and management to your 
          next venture. Together, we build excellence.
        </motion.p>
        
        <motion.div 
          variants={fadeUp} 
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#135B34] to-[#1a8a4c] px-10 py-5 text-base font-sans font-semibold text-white shadow-[0_8px_24px_rgba(19,91,52,0.25)] transition-all hover:shadow-[0_12px_32px_rgba(19,91,52,0.35)]"
            >
              <span className="relative z-10">Start a Conversation</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/careers"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-[#D4AF37] bg-white px-10 py-5 text-base font-sans font-semibold text-[#2D3748] transition-all hover:bg-[#D4AF37] hover:text-white hover:shadow-[0_8px_24px_rgba(212,175,55,0.25)]"
            >
              <span className="relative z-10">Join Our Team</span>
              <motion.div
                className="absolute right-4 h-6 w-6 rounded-full bg-[#D4AF37]/20 transition-all group-hover:bg-white/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[#A0AEC0]"
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#135B34]" />
            <span>14 Sectors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span>2 Continents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#135B34]" />
            <span>50+ Experts</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
