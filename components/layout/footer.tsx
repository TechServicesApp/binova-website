'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS, OFFICES } from '@/lib/constants'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight, Send } from 'lucide-react'
import { BinovaLogo } from '@/components/ui/BinovaLogo'
import { motion } from 'framer-motion'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeError, setSubscribeError] = useState('')
  const [subscribeSuccess, setSubscribeSuccess] = useState('')
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeError('')
    setSubscribeSuccess('')

    if (!email.trim()) {
      setSubscribeError('Please enter a valid email address.')
      return
    }

    try {
      setIsSubscribing(true)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), source: 'footer' }),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubscribeError(result?.error ?? 'Unable to subscribe right now. Please try again.')
        return
      }

      setSubscribeSuccess('Subscribed successfully.')
      setEmail('')
    } catch {
      setSubscribeError('Network error. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-[#E2E8F0] bg-gradient-to-br from-[#F0F7F4] via-white to-[#F7F9FA]">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top gradient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(19,91,52,0.3), rgba(212,175,55,0.2), transparent)' }}
        />
        
        {/* Ambient blobs */}
        <div 
          className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -top-32 right-0 h-80 w-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
        />

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(19,91,52,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(19,91,52,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#135B34]/20 bg-gradient-to-r from-[#135B34]/5 via-white/50 to-[#D4AF37]/5 p-10 backdrop-blur-sm">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 h-20 w-20 border-l-2 border-t-2 border-[#135B34]/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 h-20 w-20 border-r-2 border-b-2 border-[#D4AF37]/30 rounded-br-3xl" />
            
            <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-[#2D3748] font-display mb-2">
                  Stay <span className="text-[#135B34]">Connected</span>
                </h3>
                <p className="text-sm text-[#4A5568] font-sans max-w-md">
                  Subscribe to our newsletter for the latest insights, projects updates, and opportunities.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="w-full max-w-md space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0AEC0]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-white pl-11 pr-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all duration-300 focus:border-[#135B34] focus:outline-none focus:ring-2 focus:ring-[#135B34]/20 font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#135B34] to-[#1a8a4c] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#135B34]/25 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 font-sans"
                  >
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    {isSubscribing ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
                {subscribeError && (
                  <p className="text-xs text-red-600 font-sans">{subscribeError}</p>
                )}
                {subscribeSuccess && (
                  <p className="text-xs text-[#135B34] font-sans">{subscribeSuccess}</p>
                )}
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* ── Brand column (larger) ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            {/* Logo */}
            <Link href="/" className="inline-block group">
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="relative flex-shrink-0"
                style={{ width: 180, height: 180 }}
              >
                <img
                  src="/LogoBinova.png"
                  alt="Binova Holding Group"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </Link>

            {/* Tagline with decorative line */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <p className="text-sm font-bold text-[#D4AF37] font-display uppercase tracking-wider">
                A Passion for Excellence
              </p>
            </div>

            {/* Description */}
            <p className="mt-4 text-[15px] leading-relaxed text-[#4A5568] font-sans max-w-sm">
              Bridging continents through sustainable investment and world-class project delivery across 14 sectors.
            </p>

            {/* Stats mini cards */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { value: '14+', label: 'Sectors' },
                { value: '2', label: 'Countries' },
                { value: '50+', label: 'Experts' },
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="group rounded-xl border border-[#E2E8F0] bg-white/60 p-3 text-center transition-all duration-300 hover:border-[#135B34]/30 hover:shadow-md backdrop-blur-sm"
                >
                  <div className="text-lg font-bold text-[#135B34] font-display group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-medium text-[#4A5568] font-sans uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons - redesigned */}
            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#135B34] font-sans mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'LinkedIn',  Icon: Linkedin,  color: '#0A66C2' },
                  { label: 'Twitter',   Icon: Twitter,   color: '#1DA1F2' },
                  { label: 'Instagram', Icon: Instagram, color: '#E4405F' },
                ].map(({ label, Icon, color }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    onMouseEnter={() => setHoveredSocial(label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#A0AEC0] transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-lg hover:-translate-y-1"
                    style={{
                      background: hoveredSocial === label ? color : undefined,
                      borderColor: hoveredSocial === label ? color : undefined,
                    }}
                  >
                    <Icon className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />
                    
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-[#2D3748] px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                      {label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-[#2D3748]" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Navigation ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-1 rounded-full bg-[#135B34]" />
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#135B34] font-sans">
                Navigation
              </h3>
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-[#4A5568] transition-all duration-300 hover:text-[#135B34] hover:translate-x-1 font-sans"
                  >
                    <div className="flex items-center gap-2">
                      <span className="block h-px w-0 bg-gradient-to-r from-[#D4AF37] to-[#135B34] transition-all duration-300 group-hover:w-4" />
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-3 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-[#135B34]" />
                    </div>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Offices ── */}
          {OFFICES.map((office, officeIndex) => (
            <motion.div 
              key={office.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + officeIndex * 0.1 }}
              className="lg:col-span-3"
            >
              <div className="group rounded-2xl border border-[#E2E8F0] bg-white/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#135B34]/30 hover:shadow-lg">
                {/* Country badge */}
                <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-gradient-to-r from-[#135B34]/10 to-[#D4AF37]/10 px-4 py-1.5 border border-[#135B34]/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#135B34] animate-pulse" />
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#135B34] font-sans">
                    {office.country}
                  </h3>
                </div>
                
                
                <div className="space-y-3 text-sm text-[#4A5568] font-sans">
                  <div className="group/item flex items-start gap-3 transition-all duration-300 hover:text-[#135B34]">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#135B34]/5 transition-all duration-300 group-hover/item:bg-[#135B34]/10">
                      <MapPin className="h-4 w-4 text-[#135B34]" />
                    </div>
                    <span className="flex-1">{office.city}</span>
                  </div>
                  
                  <div className="group/item flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#135B34]/5 transition-all duration-300 group-hover/item:bg-[#135B34]/10">
                      <Mail className="h-4 w-4 text-[#135B34]" />
                    </div>
                    <a 
                      href={`mailto:${office.email}`}
                      className="flex-1 transition-all duration-300 hover:text-[#135B34] hover:translate-x-1"
                    >
                      {office.email}
                    </a>
                  </div>
                  
                  <div className="group/item flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#135B34]/5 transition-all duration-300 group-hover/item:bg-[#135B34]/10">
                      <Phone className="h-4 w-4 text-[#135B34]" />
                    </div>
                    <a 
                      href={`tel:${office.phone}`}
                      className="flex-1 transition-all duration-300 hover:text-[#135B34] hover:translate-x-1"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom bar with enhanced design ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 relative"
        >
          {/* Decorative divider */}
          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent" />
          
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-[#A0AEC0] font-sans">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-[#4A5568]">Binova Holding Group</span>. All rights reserved.
            </p>
            
            <div className="flex items-center gap-1">
              <div className="flex gap-6 mr-6">
                {['Privacy Policy', 'Terms of Service', 'Cookies'].map((label) => (
                  <Link
                    key={label}
                    href="#"
                    className="group relative text-xs text-[#A0AEC0] transition-colors hover:text-[#135B34] font-sans"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#135B34] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
              
              {/* Scroll to top button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#A0AEC0] transition-all duration-300 hover:border-[#135B34] hover:text-white hover:bg-[#135B34] hover:shadow-md hover:-translate-y-1"
                aria-label="Scroll to top"
              >
                <ArrowRight className="h-3.5 w-3.5 -rotate-90 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}