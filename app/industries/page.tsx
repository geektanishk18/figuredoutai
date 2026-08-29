import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IndustryDemo } from '@/components/demo'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { Container, Eyebrow, Reveal, SectionHeading } from '@/components/ui'
import { INDUSTRIES } from '@/lib/constants'
import { INDUSTRY_PAGES } from '@/lib/industry-pages'

export const metadata: Metadata = {
  title: 'Industries We Build Decision Layers For',
  description:
    'Clinics, real estate, restaurants, travel, recruitment and HVAC. Different intake paths, the same failure, different qualification criteria.',
  alternates: { canonical: '/industries' },
  openGraph: { type: 'website', url: '/industries' },
}

export default function IndustriesPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />

      <Container className="pt-16 sm:pt-20">
        <header className="max-w-prose">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] sm:text-[2.75rem]">
            Different intake paths. The same failure.
          </h1>
          <p className="mt-6 text-lg text-body sm:text-xl">
            Every one of these businesses receives more enquiries than it can qualify consistently,
            through channels that were never designed together. What differs is the criteria that
            decide which enquiry matters, and where it should go.
          </p>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            Each page below sets out that industry&rsquo;s actual intake failure modes, the
            qualification criteria we encode, and how a qualified enquiry gets routed.
          </p>
        </header>
      </Container>

      <Container as="section" aria-labelledby="industry-list-heading" className="py-14 sm:py-16">
        <h2 id="industry-list-heading" className="sr-only">
          All industries
        </h2>
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="focus-ring glass-lift group flex h-full flex-col rounded-card border border-line bg-panel p-5 hover:bg-panel-raised sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-paper">{industry.label}</h3>
                  <p className="mt-2 flex-1 text-[15px] text-body">
                    {INDUSTRY_PAGES[industry.slug].lede}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky">
                    See the intake path
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-180 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <Container as="section" aria-labelledby="what-differs-heading" className="pb-6">
        <div className="max-w-prose">
          <h2
            id="what-differs-heading"
            className="text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]"
          >
            What actually differs between them
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            The failure is the same everywhere: more enquiries arrive than anyone can qualify
            consistently, through channels that grew up separately and share no queue. What changes
            from one industry to the next is the set of questions that decide whether an enquiry
            matters.
          </p>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            A clinic sorts on symptom urgency and which clinician the patient belongs to. A property
            business sorts on intent, budget band and possession timeline — an end user and an
            investor are different products, not different tones. A restaurant sorts on party size,
            service capacity and whether a request needs the kitchen to prepare something. A travel
            operator sorts on dates, group composition and whether the season can still take the
            booking. Recruitment sorts on mandatory credentials first, because everything after that
            is wasted if a licence or a notice period rules the candidate out. Field service sorts on
            system type and site criticality, because those decide which engineer can attend at all.
          </p>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            Those criteria are not interchangeable, which is why we do not arrive with a template.
            Each page below sets out how that industry&rsquo;s intake actually breaks, the criteria we
            encode against it, and where a qualified enquiry is routed once the layer has decided.
          </p>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            If your business is not listed, the method does not change. It needs existing enquiry
            volume and criteria that can be written down — and if you do not have both, the audit
            will say so.
          </p>
        </div>
      </Container>

      <section
        aria-labelledby="industries-demo-heading"
        className="border-t border-line bg-panel/30 py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="industries-demo-heading"
            align="center"
            eyebrow="See it work"
            title="Pick your industry. Put your own numbers in."
            description="The same enquiry, handled two ways — and what the gap between them costs over a year."
            className="mx-auto mb-10 text-center"
          />
          <IndustryDemo />
        </Container>
      </section>
    </div>
  )
}
