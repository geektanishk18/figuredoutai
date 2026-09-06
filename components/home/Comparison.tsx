import { Button, Container, Reveal, SectionHeading } from '@/components/ui'

/**
 * The distinction, on the homepage — as a lead-in and a link.
 *
 * This used to carry the full two-column comparison, which /decision-layer also
 * makes. Two pages on the same site arguing the same point in the same words
 * compete for the same query, and the page that should win is the one whose
 * entire subject it is.
 *
 * So the homepage states the distinction and hands off; `<ComparisonMatrix />`
 * on /decision-layer does the work. This is a deliberate reduction in homepage
 * content, and it is the one place in this redesign where removing text is the
 * point rather than a cost.
 */
export function Comparison() {
  return (
    <Container as="section" aria-labelledby="comparison-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="comparison-heading"
          title="A chatbot answers. A decision layer decides."
          description="A chatbot returns a scripted reply and leaves the decision to a human. A decision layer applies your rules, scores what arrives, routes it to an owner and escalates with the context attached. The human layer stays — it stops being the first layer."
        />
      </Reveal>

      <Reveal className="mt-8">
        <Button href="/decision-layer" variant="secondary">
          What a decision layer does
        </Button>
      </Reveal>
    </Container>
  )
}
