import type { Metadata } from 'next'
import { LegalSections } from '@/components/content/LegalSections'
import { PageShell } from '@/components/content/PageShell'
import { COMPANY } from '@/lib/constants'
import { TERMS_SECTIONS } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms governing use of services provided by ${COMPANY.legalName}.`,
  alternates: { canonical: '/terms' },
  openGraph: { type: 'website', url: '/terms' },
}

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Service" lede={<p>{COMPANY.entityString}</p>}>
      <LegalSections sections={TERMS_SECTIONS} />
    </PageShell>
  )
}
