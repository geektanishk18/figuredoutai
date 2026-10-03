import type { Metadata } from 'next'
import { Button, Container, SectionHeading } from '@/components/ui'
import { PageBackdrop } from '@/components/layout/PageBackdrop'

/**
 * This route exported no metadata, so it inherited the root default — which
 * made the 404 page and the homepage ship an identical `<title>` and
 * description. Two routes asserting the same title is the one duplication a
 * crawler is guaranteed to notice, and the page it would notice it on is the
 * one page on the site that should never be indexed at all.
 */
export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'This page does not exist or has moved. The site covers the decision layer, how engagements run, the industries we build for, and the intake audit.',
  robots: { index: false, follow: true },
  // Without this the 404 inherits the layout's canonical of `/`, telling a
  // crawler that a page it must not index is a copy of the homepage.
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="py-24 sm:py-32">
        <SectionHeading
          as="h1"
          eyebrow="404"
          title="That page does not exist."
          description="The link may be out of date. The sections below cover everything on the site."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Get your intake audit
          </Button>
        </div>
      </Container>
    </div>
  )
}
