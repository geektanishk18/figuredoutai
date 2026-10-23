import type { Metadata } from 'next'
import { Container, Eyebrow } from '@/components/ui'
import { SystemsExplorer } from '@/components/systems/SystemsExplorer'

export const metadata: Metadata = {
  title: 'Systems We’ve Built | AI Automation Workflows',
  description: 'Explore FiguredoutAI systems for LinkedIn outbound prospecting, AI content production, lead prospecting, sales conversion and multi-agent enterprise workflows.',
  alternates: { canonical: '/systems' },
  openGraph: { type: 'website', url: '/systems' },
}

export default function SystemsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(144,194,231,0.12),transparent_55%)]" />
        <Container className="relative py-16 sm:py-24">
          <Eyebrow>Systems we’ve built</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-paper">
            Designed around the work that <span className="text-sky">needs to get done</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Five system concepts, each grounded in a business bottleneck. Explore the problem, how the workflow addresses it and the outcomes it is designed to support.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-full border border-line px-3 py-1.5">Problem → system → outcome</span>
            <span className="rounded-full border border-line px-3 py-1.5">Interactive workflow previews</span>
            <span className="rounded-full border border-line px-3 py-1.5">No fabricated case studies</span>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <SystemsExplorer />
        <div className="mt-8 rounded-xl border border-line bg-panel/50 p-4 sm:p-5">
          <p className="text-sm font-semibold text-paper">How to read this portfolio</p>
          <p className="mt-2 text-sm leading-relaxed text-body">
            These are systems FiguredoutAI has worked on and designed. We are not presenting them as client case studies or claiming production deployments, client metrics, or realised revenue outcomes. The workflow previews use illustrative scenarios and run locally in the browser; they do not connect to LinkedIn, a live prospect database, social publishing accounts, CRMs, telephony or client infrastructure. Potential outcomes depend on implementation, data quality, integrations and the business process.
          </p>
        </div>
      </Container>
    </>
  )
}
