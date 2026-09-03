import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import Clinics from '@/content/industries/clinics.mdx'
import RealEstate from '@/content/industries/real-estate.mdx'
import Restaurants from '@/content/industries/restaurants.mdx'
import Travel from '@/content/industries/travel.mdx'
import Recruitment from '@/content/industries/recruitment.mdx'
import Hvac from '@/content/industries/hvac.mdx'
import { IndustryDemo } from '@/components/demo'
import { PageShell } from '@/components/content/PageShell'
import { ScenarioBlock } from '@/components/content/ScenarioBlock'
import { ConflictResolution } from '@/components/content/ConflictResolution'
import { NextStepBand } from '@/components/content/NextStepBand'
import { Faq, FaqSchema } from '@/components/content/Faq'
import { BreadcrumbSchema, ProofSchema, ServiceSchema } from '@/components/seo/JsonLd'
import { SectionHeading } from '@/components/ui'
import { INDUSTRIES, SITE_URL, type IndustrySlug, getIndustry } from '@/lib/constants'
import { INDUSTRY_FAQS } from '@/lib/content/industry-faqs'
import { INDUSTRY_PAGES } from '@/lib/industry-pages'
import { getScenario } from '@/lib/scenarios'

/** Static map rather than a dynamic import, so every page is bundled at build time. */
const CONTENT: Record<IndustrySlug, ComponentType> = {
  'clinics': Clinics,
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
  const faqs = INDUSTRY_FAQS[industry.slug]

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.label, path: `/industries/${industry.slug}` },
        ]}
      />

      <ServiceSchema
        name={`Conversational decision layer — ${industry.name}`}
        description={page.description}
        url={`${SITE_URL}/industries/${industry.slug}/`}
      />

      <ProofSchema
        tier="scenario"
        headline={`Decision architecture — ${industry.name}`}
        description={scenario.summary}
        url={`${SITE_URL}/industries/${industry.slug}/`}
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
        {/* Boards 1c and 2b close the architecture section here. Renders only
            for the verticals the canvas authors conflict rules for. */}
        <ConflictResolution slug={industry.slug} headingId="conflict-resolution" />
        {/*
          Visible on-page content, not a schema-only block. The questions are
          the ones a buyer in this vertical actually asks, and each answer is
          written to survive being lifted out and quoted on its own.

          FaqSchema rides along because it is free next to content that
          already exists — not because it earns a rich result. Google
          deprecated FAQ rich results in May 2026; the markup is inert in
          search and the retrievable prose above is what does the work.
        */}
        <Faq items={faqs} />
      </PageShell>

      <FaqSchema items={faqs} />

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
          {/* Boards 1c and 2b both pass switcher="true": the reader has already
              picked a subject, so letting them compare verticals is useful here
              in a way it is not on the homepage. */}
          <IndustryDemo defaultIndustry={industry.slug} showSwitcher />
          <NextStepBand slug={industry.slug} headingId="next-step" />
        </div>
      </section>
    </>
  )
}
