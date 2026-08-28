import { Button, Container, SectionHeading } from '@/components/ui'
import { PageBackdrop } from '@/components/layout/PageBackdrop'

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
