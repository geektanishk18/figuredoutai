import { Button, Card, Container, Reveal, SectionHeading } from '@/components/ui'
import { PHASES, PHASE_COUNT } from '@/lib/content/phases'

/**
 * The engagement phases, on the homepage.
 *
 * This said "Three phases" and listed three steps of its own invention, while
 * /how-it-works and /services both described four named phases — in their H1,
 * page title, meta description and OG image. A visitor comparing two pages of
 * the same site found them disagreeing about how the engagement runs, which is
 * the one thing a prospect is trying to establish.
 *
 * It now renders `PHASES` directly, so the count and the names cannot drift
 * from the other two surfaces again: there is one list, and changing it changes
 * every page that states it.
 */
export function HowItWorks() {
  return (
    <Container as="section" aria-labelledby="how-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="how-heading"
          title={`${PHASE_COUNT === 4 ? 'Four' : String(PHASE_COUNT)} phases, in this order.`}
          description="You approve each one before the next begins, and before it is billed."
        />
      </Reveal>

      <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PHASES.map((phase) => (
          <Card key={phase.n} as="article" className="flex flex-col">
            <span
              aria-hidden="true"
              className="num font-heading text-small font-bold tracking-[0.14em] text-sky"
            >
              {phase.n}
            </span>
            <h3 className="mt-3 text-h4 font-semibold text-paper">
              <span className="sr-only">{`Phase ${phase.n} — `}</span>
              {phase.name}
            </h3>
            <p className="mt-3 text-small text-body">{phase.summary}</p>
          </Card>
        ))}
      </Reveal>

      <Reveal className="mt-8">
        <Button href="/how-it-works" variant="secondary">
          How engagements run
        </Button>
      </Reveal>
    </Container>
  )
}
