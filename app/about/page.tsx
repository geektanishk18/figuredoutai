import type { Metadata } from 'next'
import Content from '@/content/about.mdx'
import { PageShell } from '@/components/content/PageShell'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  // The content file's meta title already names the brand; `absolute` stops the
  // layout template appending it again.
  title: { absolute: 'About FiguredoutAI — Building the Decision Layer for Indian Businesses' },
  description:
    'FiguredoutAI LLP builds conversational qualification systems for businesses with real enquiry volume. Registered in Noida, Uttar Pradesh. LLPIN ACZ-0822.',
  alternates: { canonical: '/about' },
  openGraph: { type: 'website', url: '/about' },
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="We build the layer that decides."
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'See how the decision layer works', href: '/decision-layer' },
      ]}
    >
      <Content />

      <section aria-labelledby="company-heading" className="mt-14">
        <h2
          id="company-heading"
          className="text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]"
        >
          The company
        </h2>
        <p className="mt-5 text-[16.5px] leading-relaxed text-body">
          {COMPANY.legalName} is registered in India under the {COMPANY.registeredUnder}.
        </p>
        {/* The LLPIN is a verifiable credential, so it stays selectable text. */}
        <p className="mt-5 text-[16.5px] leading-relaxed text-body">
          <strong className="font-semibold text-paper">LLPIN {COMPANY.llpin}</strong> — verifiable on
          the MCA portal.
          <br />
          Registered address: {COMPANY.city}, {COMPANY.state}, {COMPANY.country}.
        </p>
      </section>

      <blockquote className="mt-12 rounded-card border border-line bg-panel p-6 sm:p-8">
        <p className="text-[17px] leading-relaxed text-body sm:text-lg">
          “We are not trying to be the agency that added AI to Indian businesses. We want to be the
          reason they stopped needing more people in order to grow.”
        </p>
        <footer className="mt-4 text-sm text-muted">
          — Tanishk Singhal &amp; Yashvardhan Awasthi, Founders
        </footer>
      </blockquote>
    </PageShell>
  )
}
