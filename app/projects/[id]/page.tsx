'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Calendar, DollarSign, Zap } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'

const SECTOR_COLORS: Record<string, string> = {
  'Public Work and Real Estate': '#135B34',
  'Transportation': '#1a5a8a',
  'Energy': '#FF6B35',
  'Health and Sciences': '#D4AF37',
  'Education and Training': '#1a8a4c',
  'Agriculture and Livestock': '#2a9d5f',
  'Mining': '#8B7355',
}

const SECTOR_ICONS: Record<string, string> = {
  'Public Work and Real Estate': '🏗️',
  'Transportation': '🚁',
  'Energy': '⚡',
  'Health and Sciences': '🏥',
  'Education and Training': '🎓',
  'Agriculture and Livestock': '🐄',
  'Mining': '⛏️',
}

function getSectorColor(sector: string) { return SECTOR_COLORS[sector] ?? '#135B34' }
function getSectorIcon(sector: string) { return SECTOR_ICONS[sector] ?? '🏢' }

function statusStyle(status: string): { bg: string; color: string } {
  if (status === 'Completed') return { bg: 'rgba(19,91,52,0.15)', color: '#135B34' }
  if (status === 'In Progress') return { bg: 'rgba(212,175,55,0.15)', color: '#D4AF37' }
  return { bg: 'rgba(160,174,192,0.15)', color: '#A0AEC0' }
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const projectId = parseInt(params.id as string, 10)
  
  const projectsArray = Array.isArray(PROJECTS) ? PROJECTS : Object.values(PROJECTS)
  const project = projectsArray.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2D3748] mb-4">Project Not Found</h1>
          <p className="text-[#4A5568] mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[#135B34] text-white rounded-xl hover:shadow-lg transition-all">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const color = getSectorColor(project.sector)
  const icon = getSectorIcon(project.sector)
  const { bg: statusBg, color: statusColor } = statusStyle(project.status)
  
  const relatedProjects = projectsArray.filter(p => p.sector === project.sector && p.id !== projectId).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F7F9FA] to-[#F0F7F4]">
      {/* Noise grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(19,91,52,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* Header with breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-sans text-[#A0AEC0] mb-8"
          >
            <Link href="/" className="transition-colors hover:text-[#135B34]">Home</Link>
            <span>/</span>
            <Link href="/projects" className="transition-colors hover:text-[#135B34]">Projects</Link>
            <span>/</span>
            <span className="text-[#135B34]">{project.title}</span>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 'clamp(300px, 50vw, 500px)' }}>
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Status badge */}
            <div className="absolute top-6 left-6">
              <span
                className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider"
                style={{ background: statusBg, color: statusColor }}
              >
                {project.status}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title and meta */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{icon}</span>
                <span
                  className="rounded px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{ background: `${color}12`, color }}
                >
                  {project.sector}
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-[#2D3748] font-display">
                {project.title}
              </h1>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#E2E8F0] bg-white/50">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#4A5568]">Year</span>
                  <span className="text-2xl font-bold" style={{ color }}>
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#E2E8F0] bg-white/50">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#4A5568]">Status</span>
                  <span className="text-lg font-bold text-[#2D3748]">
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#E2E8F0] bg-white/50">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#4A5568]">Owner</span>
                  <span className="text-lg font-bold text-[#2D3748]">
                    Binova
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-12">
              <p className="text-lg leading-relaxed text-[#2D3748] mb-6">
                {project.description}
              </p>
              {project.details && (
                <p className="text-base leading-relaxed text-[#4A5568]">
                  {project.details}
                </p>
              )}
            </div>

            {/* Key highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white/50">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: `${color}18` }}
                  >
                    <Zap className="h-6 w-6" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3748] mb-2">Innovative Approach</h3>
                    <p className="text-sm text-[#4A5568]">
                      Cutting-edge technology and best practices implemented throughout the project lifecycle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white/50">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: `${color}18` }}
                  >
                    <Calendar className="h-6 w-6" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3748] mb-2">Strategic Timeline</h3>
                    <p className="text-sm text-[#4A5568]">
                      Carefully planned phases ensuring timely execution and quality delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-2xl border border-[#135B34]/20 bg-gradient-to-br from-[#F0F7F4] to-white">
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">Interested in this project?</h3>
              <p className="text-[#4A5568] mb-6">
                Get in touch with our team to learn more about partnership opportunities and project details.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#135B34] text-white rounded-xl hover:shadow-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-[#E2E8F0] py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-[#2D3748] mb-2 font-display">
                  More in {project.sector}
                </h2>
                <p className="text-[#4A5568] mb-8">Explore other projects in the same sector</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((related, i) => {
                    const relatedColor = getSectorColor(related.sector)
                    return (
                      <Link
                        key={related.id}
                        href={`/projects/${related.id}`}
                        className="group overflow-hidden rounded-2xl border border-[#E2E8F0] hover:border-[#135B34]/30 transition-all hover:shadow-lg"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white h-full"
                        >
                          {/* Image */}
                          <div
                            className="relative overflow-hidden h-48"
                            style={{ background: `${relatedColor}08` }}
                          >
                            {related.image && (
                              <img
                                src={related.image}
                                alt={related.title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <span
                              className="rounded px-2 py-1 text-xs font-bold uppercase tracking-wider inline-block mb-3"
                              style={{ background: `${relatedColor}12`, color: relatedColor }}
                            >
                              {related.sector}
                            </span>
                            <h3 className="font-bold text-[#2D3748] group-hover:text-[#135B34] transition-colors font-display mb-2">
                              {related.title}
                            </h3>
                            <p className="text-xs text-[#A0AEC0]">
                              {related.year} • {related.status}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="border-t border-[#E2E8F0] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#4A5568] mb-6">Want to see all our projects?</p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#135B34] text-white rounded-xl hover:shadow-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                Back to All Projects
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
