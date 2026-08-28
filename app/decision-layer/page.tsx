import type { Metadata } from 'next'
import Content from '@/content/decision-layer.mdx'
import { PageShell } from '@/components/content/PageShell'

export const metadata: Metadata = {
  title: 'The Decision Layer — Deciding, Not Just Answering',
  description:
    'A chatbot returns a scripted reply and leaves the decision to a human. A decision layer applies your rules, scores, routes and escalates with context attached.',
  alternates: { canonical: '/decision-layer' },
  openGraph: { type: 'website', url: '/decision-layer' },
}

export default function DecisionLayerPage() {
  return (
    <PageShell
      eyebrow="The category"
      title="A chatbot answers. A decision layer decides."
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'How engagements run', href: '/how-it-works' },
      ]}
    >
      <Content />
    </PageShell>
  )
}
