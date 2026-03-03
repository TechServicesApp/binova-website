import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { ServicesTimeline } from '@/components/sections/services-timeline'
import { Philosophy } from '@/components/sections/philosophy'
import { SocialCommitment } from '@/components/sections/social-commitment'
import { SectorsBentoGrid } from '@/components/sections/sectors-bento-grid'
import { GlobalPresence } from '@/components/sections/global-presence'
import { TeamSlider } from '@/components/sections/team-slider'
import { CTASection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesTimeline />
      <Philosophy />
      <SocialCommitment />
      <SectorsBentoGrid />
      <GlobalPresence />
      <TeamSlider />
      <CTASection />
    </>
  )
}
