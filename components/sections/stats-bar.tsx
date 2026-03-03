'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { STATS } from '@/lib/constants'

type Stat = typeof STATS[number]

export function StatsBar() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="relative bg-white border-y border-[#E2E8F0] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={i} className="group relative flex flex-col items-center text-center">
              {/* Separator */}
              {i > 0 && (
                <div className="absolute -left-4 top-1/2 hidden h-16 w-[1px] -translate-y-1/2 md:block"
                  style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)' }}
                />
              )}
              {/* Value */}
              <div className="font-mono text-5xl font-medium text-[#135B34] transition-all group-hover:drop-shadow-[0_0_16px_rgba(19,91,52,0.3)] md:text-6xl">
                {'symbol' in stat ? (
                  stat.symbol
                ) : inView ? (
                  <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              {/* Label */}
              <div className="mt-3 text-xs font-sans uppercase tracking-[0.15em] text-[#4A5568]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
