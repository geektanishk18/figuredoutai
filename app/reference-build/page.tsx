import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import Content from '@/content/reference-build.mdx'
import { PageShell } from '@/components/content/PageShell'
import { ReferenceLog } from '@/components/content/ReferenceLog'
import { ProofSchema } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = pageMeta({
  title: 'Reference Build — A Decision Layer We Own',
  description:
    'A conversational qualification system we designed and built, and whose IP we own: portal, WhatsApp qualification layer, admin panel and voice.',
  path: '/reference-build',
})

export default function ReferenceBuildPage() {
  return (
    <>
    <ProofSchema
      tier="reference"
      headline="Reference implementation of the decision layer"
      description="A conversational qualification system we designed and built, and whose IP we own: portal, WhatsApp qualification layer, admin panel and voice."
      url={`${SITE_URL}/reference-build/`}
    />
    <PageShell
      eyebrow="Reference build"
      title="A reference implementation of the decision layer, built end to end."
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'Why us', href: '/why-us' },
      ]}
    >
      <Content />
      <ReferenceLog />
    </PageShell>
    </>
  )
}
