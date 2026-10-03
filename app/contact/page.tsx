import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import Content from '@/content/contact.mdx'
import { LeadForm } from '@/components/contact/LeadForm'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { Container, Eyebrow } from '@/components/ui'
import { COMPANY, CONTACT } from '@/lib/constants'

export const metadata: Metadata = pageMeta({
  title: 'Get Your Intake Audit',
  description:
    'Request an intake audit. Three working days, no cost. We map how enquiries reach your business and where they stop. You keep the map either way.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />

      <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
        <header className="max-w-prose">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] sm:text-[2.75rem]">
            Get your intake audit.
          </h1>
          <p className="mt-6 text-lg text-body sm:text-xl">
            Three working days. No cost, no obligation, no pitch deck.
          </p>
        </header>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div className="max-w-prose">
            <Content />

            <section aria-labelledby="other-ways-heading" className="mt-14">
              <h2
                id="other-ways-heading"
                className="text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]"
              >
                Other ways to reach us
              </h2>
              <ul className="mt-5 space-y-2">
                <li className="text-[16.5px] text-body">
                  <span className="text-muted">Email:</span>{' '}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="focus-ring rounded text-sky underline underline-offset-4 hover:text-paper"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="text-[16.5px] text-body">
                  <span className="text-muted">Phone:</span>{' '}
                  <a
                    href={CONTACT.phoneHref}
                    className="focus-ring rounded text-sky underline underline-offset-4 hover:text-paper"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
              <address className="mt-5 text-[16px] not-italic text-muted">
                {COMPANY.legalName} · LLPIN {COMPANY.llpin}
                <br />
                {COMPANY.city}, {COMPANY.state}, {COMPANY.country}
              </address>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <section
              aria-labelledby="form-heading"
              className="rounded-card border border-line bg-panel p-6 sm:p-7"
            >
              <h2 id="form-heading" className="text-xl font-semibold text-paper">
                Request your audit
              </h2>
              <p className="mt-2 text-[15px] text-body">We reply within one business day.</p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
