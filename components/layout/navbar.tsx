'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'


// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-[20px] saturate-[1.8] border-b border-[#E2E8F0] shadow-sm'
            : 'bg-white/90 backdrop-blur-[20px] saturate-[1.8] border-b border-[#E2E8F0] shadow-sm'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="relative flex-shrink-0"
                style={{ width: 140, height: 80 }}
              >
                <img
                  src="/LogoBinova.png"
                  alt="Binova Holding Group"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors font-sans",
                      scrolled 
                        ? "text-[#4A5568] hover:text-[#135B34]" 
                        : "text-[#4A5568] hover:text-[#135B34]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full"
                        style={{ background: scrolled ? '#135B34' : '#135B34' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* ── CTA + Mobile Toggle ── */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium font-sans transition-all duration-300",
                  scrolled
                    ? "border-[#135B34] bg-[#135B34] text-white hover:bg-[#0f4728] hover:border-[#0f4728] hover:shadow-lg"
                    : "border-[#135B34] bg-[#135B34] text-white hover:bg-[#0f4728] hover:border-[#0f4728] hover:shadow-lg"
                )}
              >
                Contact Us
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "lg:hidden relative z-50 p-2 transition-colors",
                  scrolled && !mobileOpen ? "text-[#2D3748]" : "text-[#2D3748]"
                )}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #F0F7F4 0%, #FFFFFF 50%, #F7F9FA 100%)' }}
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.06) 0%, transparent 70%)' }} />
            </div>

            

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-3xl font-semibold tracking-tight transition-colors font-display',
                      pathname === link.href
                        ? 'text-[#135B34]'
                        : 'text-[#4A5568] hover:text-[#2D3748]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="rounded-full border-2 border-[#135B34] bg-[#135B34] px-8 py-3 text-sm font-semibold text-white font-sans transition-all hover:bg-[#0f4728] hover:border-[#0f4728] hover:shadow-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}