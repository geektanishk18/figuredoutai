import { Button, Card, Container, Liquid, Reveal, SectionHeading } from '@/components/ui'

const STEPS = [
  {
    n: '01',
    title: 'Map the intake path',
    body: 'Every channel, every owner, every point where a conversation stops. Most of what we find was never designed — it accumulated.',
  },
  {
    n: '02',
    title: 'Encode the qualification rules',
    body: 'What counts as urgent, what disqualifies, what escalates — written down with the people who apply it today.',
  },
  {
    n: '03',
    title: 'Deploy and tune',
    body: 'It runs alongside your current process before it takes live traffic, then tunes against real outcomes and real overrides.',
  },
]

export function HowItWorks() {
  return (
    <Container as="section" aria-labelledby="how-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="how-heading"
          eyebrow="How it works"
          title={<>Three phases, in this <Liquid>order</Liquid>.</>}
          description="The middle one is what almost everyone skips."
        />
      </Reveal>

      <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
        {STEPS.map((step) => (
          <Card key={step.n} as="article" className="flex flex-col">
            <span
              aria-hidden="true"
              className="num font-heading text-sm font-bold tracking-[0.14em] text-sky"
            >
              {step.n}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-paper">{step.title}</h3>
            <p className="mt-3 text-[15px] text-body">{step.body}</p>
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
