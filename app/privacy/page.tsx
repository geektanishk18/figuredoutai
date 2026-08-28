import type { Metadata } from 'next'
import { LegalSections } from '@/components/content/LegalSections'
import { PageShell } from '@/components/content/PageShell'
import { COMPANY } from '@/lib/constants'
import { PRIVACY_SECTIONS } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${COMPANY.legalName} collects, uses, stores and protects information.`,
  alternates: { canonical: '/privacy' },
  openGraph: { type: 'website', url: '/privacy' },
}

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
