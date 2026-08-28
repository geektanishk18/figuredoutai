import { Check, Minus } from 'lucide-react'
import { Container, Liquid, Reveal, SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

const CHATBOT = [
  'Returns a scripted reply',
  'Cannot rank urgency',
  'Hands your team a transcript',
  'The decision still waits for a human',
]

const DECISION_LAYER = [
  'Answers first, on your rules',
  'Scores and prioritises',
  'Routes with context attached',
  'Your team opens a decision',
]

function Column({
  title,
  kicker,
  items,
  emphasised,
}: {
  title: string
  kicker: string
  items: readonly string[]
  emphasised?: boolean
}) {
  const Icon = emphasised ? Check : Minus

  return (
    <div
      className={cn(
        'rounded-card border p-6 sm:p-7',
        // Glass on the emphasised column only. Both columns in glass would put
        // two compositor layers side by side for no gain in contrast between
        // them — the whole point is that one card reads as the answer.
        emphasised
          ? 'glass-panel glass-edge relative overflow-hidden border-sky/35'
          : 'border-line bg-panel/50',
      )}
    >
      <p
        className={cn(
          'font-heading text-[11px] font-semibold uppercase tracking-[0.16em]',
          emphasised ? 'text-sky' : 'text-muted',
        )}
      >
        {kicker}
      </p>
      <h3
        className={cn(
          'mt-2 text-xl font-semibold sm:text-2xl',
          emphasised ? 'text-paper' : 'text-body',
        )}
      >
        {title}
      </h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon
              aria-hidden="true"
              className={cn(
                'mt-0.5 h-4 w-4 flex-none',
                emphasised ? 'text-ok' : 'text-muted',
              )}
            />
            <span className={cn('text-[15px]', emphasised ? 'text-body' : 'text-muted')}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Comparison() {
  return (
    <Container as="section" aria-labelledby="comparison-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="comparison-heading"
          eyebrow="The distinction"
          title={<>A chatbot answers. A decision layer <Liquid>decides</Liquid>.</>}
        />
      </Reveal>

      <Reveal className="mt-12 grid gap-5 lg:grid-cols-2">
        <Column kicker="What most businesses were sold" title="A chatbot" items={CHATBOT} />
        <Column
          kicker="What we build"
          title="A decision layer"
          items={DECISION_LAYER}
          emphasised
        />
      </Reveal>

      <Reveal className="mt-10">
        <p className="max-w-prose text-lg font-semibold text-paper">
          The human layer stays. It stops being the first layer.
        </p>
      </Reveal>
    </Container>
  )
}
