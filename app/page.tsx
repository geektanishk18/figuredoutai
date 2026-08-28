import { AuditBand } from '@/components/home/AuditBand'
import { Comparison } from '@/components/home/Comparison'
import { DemoSection } from '@/components/home/DemoSection'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { IndustriesGrid } from '@/components/home/IndustriesGrid'
import { ReferenceBuildTeaser } from '@/components/home/ReferenceBuildTeaser'

export default function HomePage() {
  return (
    <>
      <Hero />
      <DemoSection />
      <Comparison />
      <HowItWorks />
      <IndustriesGrid />
      <ReferenceBuildTeaser />
      <AuditBand />
    </>
  )
}
