'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, fadeIn, slideFromLeft, scaleIn } from '@/lib/animations'

const VARIANTS = {
  fadeUp,
  fadeIn,
  slideLeft: slideFromLeft,
  scale: scaleIn,
}

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: keyof typeof VARIANTS
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={VARIANTS[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
