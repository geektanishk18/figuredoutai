import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import Content from '@/content/decision-layer.mdx'
import { PageShell } from '@/components/content/PageShell'
import { ComparisonMatrix } from '@/components/diagram'

export const metadata: Metadata = pageMeta({
  title: 'AI Decision Layer — Deciding, Not Answering',
  description:
    'A chatbot returns a scripted reply and leaves the decision to a human. An AI decision layer applies your rules, scores, routes and escalates with context.',
  path: '/decision-layer',
})

export default function DecisionLayerPage() {
  return (
    <PageShell
      eyebrow="The category"
      title="A chatbot answers. A decision layer decides."
      lede={
        <p>
          A chatbot returns a scripted reply and leaves every decision to a human. A decision layer
          applies the rules your business already runs on: it scores what arrives, prioritises it,
          routes it to the person who should own it, and escalates with the context attached. Your
          team opens an already-qualified conversation rather than a transcript.
        </p>
      }
      /*
        The comparison lives here rather than on the homepage. Both pages used
        to make the same argument in the same words and compete for the same
        query; this is the page whose entire subject it is. The homepage now
        states the distinction and links here.

        Full width — a three-column table inside the prose measure scrolls
        horizontally on desktop, which it has no reason to.
      */
      wide={<ComparisonMatrix subject="an enquiry" />}
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'How engagements run', href: '/how-it-works' },
      ]}
    >
      <Content />
    </PageShell>
  )
}
