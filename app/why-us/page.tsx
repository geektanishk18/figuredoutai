import type { Metadata } from 'next'
import Content from '@/content/why-us.mdx'
import { PageShell } from '@/components/content/PageShell'
import { VerificationCards } from '@/components/content/VerificationCards'

export const metadata: Metadata = {
  title: 'Why FiguredoutAI — Decision Logic, Not Chatbots',
  description:
    'Most AI vendors connect tools so information moves faster. We build the layer that decides what happens to it. Your rules, documented, auditable, and owned by you.',
  alternates: { canonical: '/why-us' },
  openGraph: { type: 'website', url: '/why-us' },
}

export default function WhyUsPage() {
  return (
    <PageShell
      eyebrow="Why us"
      title="Most AI vendors move your information faster. We decide what happens to it."
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'See the reference build', href: '/reference-build' },
      ]}
    >
      <Content />
      <VerificationCards headingId="verification" />
    </PageShell>
  )
}
