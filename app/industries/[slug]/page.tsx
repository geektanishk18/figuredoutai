import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import MedicalClinics from '@/content/industries/medical-clinics.mdx'
import RealEstate from '@/content/industries/real-estate.mdx'
import Restaurants from '@/content/industries/restaurants.mdx'
import Travel from '@/content/industries/travel.mdx'
import Recruitment from '@/content/industries/recruitment.mdx'
import Hvac from '@/content/industries/hvac.mdx'
import { IndustryDemo } from '@/components/demo'
import { PageShell } from '@/components/content/PageShell'
import { ScenarioBlock } from '@/components/content/ScenarioBlock'
import { ProofSchema, ServiceSchema } from '@/components/seo/JsonLd'
import { SectionHeading } from '@/components/ui'
import { INDUSTRIES, SITE_URL, type IndustrySlug, getIndustry } from '@/lib/constants'
import { INDUSTRY_PAGES } from '@/lib/industry-pages'
import { getScenario } from '@/lib/scenarios'

/** Static map rather than a dynamic import, so every page is bundled at build time. */
const CONTENT: Record<IndustrySlug, ComponentType> = {
  'medical-clinics': MedicalClinics,
  'real-estate': RealEstate,
  restaurants: Restaurants,
  travel: Travel,
  recruitment: Recruitment,
  hvac: Hvac,
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = INDUSTRY_PAGES[slug as IndustrySlug]
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { type: 'website', url: `/industries/${slug}` },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const page = INDUSTRY_PAGES[industry.slug]
  const Content = CONTENT[industry.slug]
  const scenario = getScenario(industry.slug)

  return (
    <>
      <ServiceSchema
        name={`Conversational decision layer — ${industry.name}`}
        description={page.description}
        url={`${SITE_URL}/industries/${industry.slug}`}
      />

      <ProofSchema
        tier="scenario"
        headline={`Decision architecture — ${industry.name}`}
        description={scenario.summary}
        url={`${SITE_URL}/industries/${industry.slug}`}
      />

      <PageShell
        eyebrow={industry.label}
        title={page.heading}
        lede={<p>{page.lede}</p>}
        ctas={[
          { label: 'Get your intake audit', href: '/contact' },
          { label: 'All industries', href: '/industries' },
        ]}
      >
        <Content />
        <ScenarioBlock scenario={scenario} />
      </PageShell>

      <section
        aria-labelledby="industry-demo-heading"
        className="border-t border-line bg-panel/30 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8">
          <SectionHeading
            id="industry-demo-heading"
            align="center"
            eyebrow="See it work"
            title={`Put your own ${page.sentenceNoun} numbers in.`}
            description="The same enquiry, handled two ways — and what the gap between them costs over a year."
            className="mx-auto mb-10 text-center"
          />
          {/* Pre-set to this industry; the switcher is redundant on a page about it. */}
          <IndustryDemo defaultIndustry={industry.slug} showSwitcher={false} />
        </div>
      </section>
    </>
  )
}
