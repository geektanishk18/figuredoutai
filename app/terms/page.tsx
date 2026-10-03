import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import { LegalSections } from '@/components/content/LegalSections'
import { PageShell } from '@/components/content/PageShell'
import { COMPANY } from '@/lib/constants'
import { TERMS_SECTIONS } from '@/lib/legal'

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description:
    'Terms for using FiguredoutAI LLP services: eligibility, acceptable use, the AI services disclaimer, lead data, intellectual property, payments, liability.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Service" lede={<p>{COMPANY.entityString}</p>}>
      <LegalSections sections={TERMS_SECTIONS} />
    </PageShell>
  )
}
