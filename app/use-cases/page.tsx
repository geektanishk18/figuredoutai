import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import { USE_CASE_PAGES } from '@/lib/use-case-pages'

export const metadata: Metadata = {
  title: 'AI Automation Use Cases for Lead Qualification and Sales',
  description: 'Explore practical AI automation use cases for WhatsApp lead qualification, AI voice receptionists, inbound lead intake, sales workflow automation and CRM integration.',
  alternates: { canonical: '/use-cases' },
  openGraph: { type: 'website', url: '/use-cases', title: 'AI Automation Use Cases | FiguredoutAI', description: 'Practical use cases for lead qualification, inbound intake, sales workflows and CRM integration.' },
}

export default function UseCasesPage() {
  return <div className="relative isolate">
    <BreadcrumbSchema trail={[{name:'Home',path:'/'},{name:'Use cases',path:'/use-cases'}]} />
    <PageBackdrop />
    <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
      <header className="max-w-3xl">
        <Eyebrow>Use cases</Eyebrow>
        <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] sm:text-[2.75rem]">AI automation built around a business problem—not a tool list.</h1>
        <p className="mt-6 text-lg leading-relaxed text-body sm:text-xl">FiguredoutAI designs qualification and workflow systems that capture enquiries, apply agreed rules and route the next action. Explore the use case that best matches your bottleneck.</p>
      </header>
      <section aria-labelledby="use-case-list-heading" className="mt-14">
        <h2 id="use-case-list-heading" className="text-xl font-semibold text-paper">Explore the use cases</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {USE_CASE_PAGES.map(page => <Link key={page.slug} href={`/use-cases/${page.slug}`} className="focus-ring group rounded-card border border-line bg-panel p-6 transition-colors hover:border-sky/35">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">{page.eyebrow}</span>
            <h3 className="mt-3 text-xl font-semibold text-paper">{page.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{page.directAnswer}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky">Explore use case <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span>
          </Link>)}
        </div>
      </section>
      <section className="mt-16 max-w-3xl border-t border-line pt-8">
        <h2 className="text-xl font-semibold text-paper">Where to start</h2>
        <p className="mt-3 leading-relaxed text-body">Start with the point where enquiries currently stall: first response, qualification questions, routing or the CRM hand-off. An intake audit maps the existing process before an integration or AI component is selected.</p>
        <Link href="/contact" className="focus-ring mt-5 inline-flex rounded-lg text-sm font-semibold text-sky underline underline-offset-4">Request an intake audit</Link>
      </section>
    </Container>
  </div>
}
