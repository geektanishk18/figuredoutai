import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import Clinics from '@/content/industries/clinics.mdx'
import RealEstate from '@/content/industries/real-estate.mdx'
import Restaurants from '@/content/industries/restaurants.mdx'
import Travel from '@/content/industries/travel.mdx'
import Recruitment from '@/content/industries/recruitment.mdx'
import Hvac from '@/content/industries/hvac.mdx'
import { IndustryDemo } from '@/components/demo'
import { DecisionArchitecture } from '@/components/content/DecisionArchitecture'
import { ConflictResolution } from '@/components/content/ConflictResolution'
import { NextStepBand, hasNextStep } from '@/components/content/NextStepBand'
import { Faq, FaqSchema } from '@/components/content/Faq'
import { ProofSchema, ServiceSchema } from '@/components/seo/JsonLd'
import { ComparisonMatrix, IntakeFlow } from '@/components/diagram'
import { QualifyIcon } from '@/components/icons'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { Button, Container, Eyebrow } from '@/components/ui'
import { INDUSTRIES, SITE_URL, type IndustrySlug, getIndustry } from '@/lib/constants'
import { INDUSTRY_FAQS } from '@/lib/content/industry-faqs'
import { INDUSTRY_DEPTH } from '@/lib/content/industry-depth'
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
  return pageMeta({ title: page.title, description: page.description, path: `/industries/${slug}` })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const page = INDUSTRY_PAGES[industry.slug]
  const Content = CONTENT[industry.slug]
  const scenario = getScenario(industry.slug)
  const faqs = INDUSTRY_FAQS[industry.slug]
  /*
   * Every vertical now has depth content, so this is always defined. The
   * non-null assertion is the honest expression of that: `INDUSTRY_DEPTH` stays
   * a Partial so adding a seventh vertical is a type error at the data file
   * rather than a page that silently renders half a layout.
   */
  const depth = INDUSTRY_DEPTH[industry.slug]!

  /*
   * Structured data is identical on both layouts and is emitted once, above the
   * branch. The restructure must not change what a crawler is told about the
   * page — only how a reader meets it.
   */
  const schemas = (
    <>
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
      <FaqSchema items={faqs} />
    </>
  )

  return (
    <>
      {schemas}

      <div className="relative isolate">
        <PageBackdrop />

        <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
              { name: industry.label, path: `/industries/${industry.slug}` },
            ]}
          />
          {/* ── 1. Hero ─────────────────────────────────────────── */}
          <header className="max-w-prose">
            <Eyebrow>{industry.label}</Eyebrow>
            <h1 className="mt-5 text-display font-bold">{page.heading}</h1>
            <p className="mt-6 text-lede text-body">{page.lede}</p>
            {/*
              The page's core question, answered outright in plain prose inside
              the first 200 words of server-rendered text. A hero that is only a
              headline and a calculator does not satisfy that — an answer engine
              lifting from this page needs real sentences here, not an interface.
            */}
            <p className="mt-4 text-lede text-body">{depth.answer}</p>
          </header>

          {/* ── 2. Loss calculator ──────────────────────────────── */}
          <section aria-labelledby="calculator-heading" className="mt-14">
            <h2 id="calculator-heading" className="text-h2 font-semibold text-paper">
              {`What the gap costs, on your own ${page.sentenceNoun} numbers`}
            </h2>
            <p className="mt-3 max-w-[62ch] text-copy text-body">
              Move the sliders. Everything below is arithmetic on what you enter — nothing here is
              a measured result from anyone else&rsquo;s business.
            </p>
            {/*
              Above the fold on desktop and directly below the hero, so a reader
              who lands here meets the arithmetic before the argument. The
              scripted conversation is switched off: it is a modelled scenario
              and it competes with the calculator for the same attention. It
              stays on the homepage and /industries.
            */}
            <IndustryDemo
              className="mt-8"
              defaultIndustry={industry.slug}
              showSwitcher={false}
              showConversation={false}
            />
          </section>

          {/* ── 3. The intake failure ───────────────────────────── */}
          <section aria-labelledby="intake-failure-heading" className="mt-20">
            <h2 id="intake-failure-heading" className="text-h2 font-semibold text-paper">
              Where the enquiries actually go
            </h2>
            <IntakeFlow
              className="mt-8"
              channels={depth.flowChannels}
              criteria={depth.flowCriteria}
              outcomes={depth.flowOutcomes}
              caption={depth.flowCaption}
            />

            {/*
              The vertical's own prose, unchanged. These pain points were audited
              and confirmed genuinely distinct per vertical rather than templated,
              so they are rendered as written rather than regenerated.
            */}
            <div className="mt-12 max-w-prose">
              <Content />
            </div>
          </section>

          {/* ── 4. What the layer does here ─────────────────────── */}
          <section aria-labelledby="criteria-heading" className="mt-20">
            <h2 id="criteria-heading" className="text-h2 font-semibold text-paper">
              What it qualifies on
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {depth.criteria.map((item) => (
                <li
                  key={item.title}
                  className="rounded-card border border-line bg-panel p-5"
                >
                  <QualifyIcon className="text-h3 text-sky" />
                  <h3 className="mt-3 text-h4 font-semibold text-paper">{item.title}</h3>
                  <p className="mt-2 text-copy text-body">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 5. Comparison ───────────────────────────────────── */}
          <section aria-labelledby="comparison-heading" className="mt-20">
            <h2 id="comparison-heading" className="text-h2 font-semibold text-paper">
              A chatbot answers. A decision layer decides.
            </h2>
            <ComparisonMatrix
              className="mt-8"
              rows={depth.comparison}
              subject={`${page.sentenceNoun} enquiries`}
            />
          </section>

          {/* ── 6. Depth ────────────────────────────────────────── */}
          <DecisionArchitecture
            scenario={scenario}
            depth={depth}
            headingId="decision-architecture"
          />

          {/*
            Precedence rules. Kept rather than masked: "escalation always
            outranks automation" is a statement of principle at the same
            altitude as the depth panels, not a specification anyone could
            build from. Renders only for the verticals the canvas authors it
            for.
          */}
          <div className="max-w-prose">
            <ConflictResolution slug={industry.slug} headingId="conflict-resolution" />
          </div>

          {/* ── 7. Q&A ──────────────────────────────────────────── */}
          <div className="max-w-prose">
            <Faq items={faqs} />
          </div>

          {/* ── 8. CTA ──────────────────────────────────────────── */}
          {/*
            NextStepBand names what the audit will tell *this* vertical, which
            is better closing copy than a generic button pair. It only carries
            data for some verticals, so the pair is the fallback rather than an
            addition — two closing CTAs in a row would weaken both.
          */}
          {hasNextStep(industry.slug) ? (
            <NextStepBand slug={industry.slug} headingId="next-step" />
          ) : (
            <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-10">
              <Button href="/contact" variant="primary" size="lg">
                Get your intake audit
              </Button>
              <Button href="/industries" variant="secondary" size="lg">
                All industries
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}
