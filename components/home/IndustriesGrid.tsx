import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Liquid, Reveal, SectionHeading } from '@/components/ui'
import { INDUSTRIES } from '@/lib/constants'

export function IndustriesGrid() {
  return (
    <Container as="section" aria-labelledby="industries-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries"
          title={<>Where volume outruns the people <Liquid>handling it</Liquid>.</>}
          description="Different intake paths, the same failure."
        />
      </Reveal>

      <Reveal className="mt-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <li key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className="focus-ring glass-lift group flex h-full flex-col rounded-card border border-line bg-panel p-5 hover:bg-panel-raised sm:p-6"
              >
                <h3 className="text-lg font-semibold text-paper">{industry.label}</h3>
                <p className="mt-2 flex-1 text-[15px] text-body">{industry.intakeFailure}</p>
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
  )
}
