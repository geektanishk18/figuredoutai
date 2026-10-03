import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import { LegalSections } from '@/components/content/LegalSections'
import { PageShell } from '@/components/content/PageShell'
import { COMPANY } from '@/lib/constants'
import { PRIVACY_SECTIONS } from '@/lib/legal'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How FiguredoutAI LLP collects, uses, stores and protects information, including AI processing, cookies, third-party services, retention and your rights.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lede={<p>{COMPANY.entityString}</p>}
    >
      <LegalSections sections={PRIVACY_SECTIONS} />
    </PageShell>
  )
}
