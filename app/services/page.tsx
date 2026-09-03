import type { Metadata } from 'next'
import Content from '@/content/services.mdx'
import { PageShell } from '@/components/content/PageShell'

export const metadata: Metadata = {
  title: 'Services — AI Automation & Decision Systems',
  description:
    'We design qualification logic, deploy the conversational decision layer that executes it, and report on every decision it makes. Built on your rules.',
  alternates: { canonical: '/services' },
  openGraph: { type: 'website', url: '/services' },
}

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Three things we build."
      ctas={[{ label: 'Get your intake audit', href: '/contact' }]}
    >
      <Content />
    </PageShell>
  )
}
