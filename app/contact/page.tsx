'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { OFFICES } from '@/lib/constants'
import { MapPin, Mail, Phone, Send, Linkedin, Twitter, Instagram, Globe, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4] pt-32 pb-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.06) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        </div>

        {/* Grain texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.015,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display"
          style={{
            fontSize: 'clamp(100px, 18vw, 220px)',
            fontWeight: 700,
            color: 'rgba(19,91,52,0.025)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          CONTACT
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-xs text-[#A0AEC0] font-sans"
          >
            <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
            <span>/</span>
            <span className="text-[#135B34]">Contact</span>
          </motion.div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, #135B34, transparent)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#135B34] font-sans">
                  Get In Touch
                </span>
              </div>
              <h1 className="mb-6 font-display text-5xl font-bold leading-[0.95] text-[#2D3748] md:text-6xl lg:text-7xl">
                Let's Create <br />
                <span style={{
                  background: 'linear-gradient(135deg, #135B34 0%, #1a8a4c 40%, #D4AF37 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Together
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#4A5568] font-sans">
                Have a project in mind or questions about our services? Our team is ready to help turn your vision into reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
            >
              <div className="rounded-xl border bg-white p-4 backdrop-blur-sm" style={{ borderColor: 'rgba(19,91,52,0.2)', boxShadow: '0 2px 8px rgba(19,91,52,0.04)' }}>
                <Clock className="mb-2 h-5 w-5 text-[#135B34]" />
                <p className="text-xs font-semibold text-[#2D3748] font-sans">Response Time</p>
                <p className="text-[10px] text-[#A0AEC0] font-sans">Within 24 hours</p>
              </div>
              <div className="rounded-xl border bg-white p-4 backdrop-blur-sm" style={{ borderColor: 'rgba(19,91,52,0.2)', boxShadow: '0 2px 8px rgba(19,91,52,0.04)' }}>
                <Globe className="mb-2 h-5 w-5 text-[#135B34]" />
                <p className="text-xs font-semibold text-[#2D3748] font-sans">Global Reach</p>
                <p className="text-[10px] text-[#A0AEC0] font-sans">2 Continents</p>
              </div>
              <div className="rounded-xl border bg-white p-4 backdrop-blur-sm" style={{ borderColor: 'rgba(19,91,52,0.2)', boxShadow: '0 2px 8px rgba(19,91,52,0.04)' }}>
                <Send className="mb-2 h-5 w-5 text-[#135B34]" />
                <p className="text-xs font-semibold text-[#2D3748] font-sans">Support</p>
                <p className="text-[10px] text-[#A0AEC0] font-sans">24/7 Available</p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, #135B34, rgba(19,91,52,0.1), transparent)' }}
          />
        </div>
      </section>

      {/* Contact Split */}
      <section className="bg-gradient-to-br from-[#F7F9FA] via-white to-[#F0F7F4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-16">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeUp} 
                className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 backdrop-blur-xl transition-all hover:border-[#135B34]/30 lg:p-10"
                style={{ boxShadow: '0 4px 20px rgba(19,91,52,0.08)' }}
              >
                {/* Decorative gradient */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl transition-all" style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.06), transparent)' }} />
                
                <div className="relative">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-[400px] flex-col items-center justify-center text-center"
                    >
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#135B34] shadow-lg" style={{ boxShadow: '0 10px 30px rgba(19,91,52,0.3)' }}>
                        <Send className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="mb-3 font-display text-3xl font-bold text-[#2D3748]">Message Sent!</h3>
                      <p className="text-[#4A5568] font-sans">We will get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                            Full Name <span className="text-[#135B34]">*</span>
                          </label>
                          <input
                            id="name"
                            {...register('name')}
                            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                            Email <span className="text-[#135B34]">*</span>
                          </label>
                          <input
                            id="email"
                            {...register('email')}
                            type="email"
                            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                            placeholder="john@company.com"
                          />
                          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                            Phone
                          </label>
                          <input
                            id="phone"
                            {...register('phone')}
                            type="tel"
                            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                            placeholder="+1 (416) 555-0199"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                            Company
                          </label>
                          <input
                            id="company"
                            {...register('company')}
                            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                            placeholder="Company Inc."
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                          Service of Interest <span className="text-[#135B34]">*</span>
                        </label>
                        <select
                          id="service"
                          {...register('service')}
                          className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                        >
                          <option value="">Select a service</option>
                          <option value="feasibility">Feasibility Studies</option>
                          <option value="design">Design & Execution</option>
                          <option value="supply">Furniture & Supply</option>
                          <option value="management">Project Management</option>
                          <option value="investment">Investment</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.service && <p className="mt-1.5 text-xs text-red-500">{errors.service.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#4A5568] font-sans">
                          Message <span className="text-[#135B34]">*</span>
                        </label>
                        <textarea
                          id="message"
                          {...register('message')}
                          rows={5}
                          className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-sm text-[#2D3748] placeholder:text-[#A0AEC0] transition-all focus:border-[#135B34] focus:bg-white focus:outline-none focus:ring-2 font-sans"
                          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                          placeholder="Tell us about your project..."
                        />
                        {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#135B34] px-6 py-4 font-semibold text-white transition-all hover:bg-[#0f4728] disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                        style={{ boxShadow: '0 4px 14px rgba(19,91,52,0.25)' }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} className="mb-2">
                <h2 className="mb-2 font-display text-2xl font-bold text-[#2D3748]">Our Offices</h2>
                <p className="text-sm text-[#4A5568] font-sans">Visit us or send us a message</p>
              </motion.div>

              {OFFICES.map((office, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:border-[#135B34]/30 hover:shadow-xl"
                  style={{ boxShadow: '0 2px 8px rgba(19,91,52,0.06)' }}
                >
                  {/* Decorative corner */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-all" style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04), transparent)' }} />
                  
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-3xl">{office.flag === 'CA' ? '\uD83C\uDDE8\uD83C\uDDE6' : '\uD83C\uDDE8\uD83C\uDDF2'}</span>
                      <div>
                        <h3 className="font-sans text-lg font-semibold text-[#2D3748]">{office.country}</h3>
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-[#135B34] font-sans" style={{ background: 'rgba(19,91,52,0.1)' }}>
                          {office.type}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3.5">
                      <div className="flex items-start gap-3 text-sm text-[#4A5568] font-sans">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#135B34]" />
                        <span>{office.city}</span>
                      </div>
                      <a 
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-3 text-sm text-[#4A5568] transition-colors hover:text-[#135B34] font-sans"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-[#135B34]" />
                        <span>{office.email}</span>
                      </a>
                      <a 
                        href={`tel:${office.phone}`}
                        className="flex items-center gap-3 text-sm text-[#4A5568] transition-colors hover:text-[#135B34] font-sans"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-[#135B34]" />
                        <span>{office.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social */}
              <motion.div 
                variants={fadeUp} 
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
                style={{ boxShadow: '0 2px 8px rgba(19,91,52,0.06)' }}
              >
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#135B34] font-sans">
                  Connect With Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] text-[#4A5568] transition-all hover:border-[#135B34] hover:bg-[#135B34] hover:text-white hover:shadow-lg"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] text-[#4A5568] transition-all hover:border-[#135B34] hover:bg-[#135B34] hover:text-white hover:shadow-lg"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] text-[#4A5568] transition-all hover:border-[#135B34] hover:bg-[#135B34] hover:text-white hover:shadow-lg"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
