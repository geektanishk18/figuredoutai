import { verifyCards } from '@/lib/content/verify-cards'

/**
 * The verification block from board 1b.
 *
 * The site publishes no client logos, testimonials or counts, which leaves a
 * reader with nothing conventional to check us against. This is the substitute:
 * facts that can be verified against a public register rather than taken on
 * trust. Every value here is independently checkable, which is the whole point —
 * a claim the reader can confirm is worth more than one they cannot.
 *
 * Three columns on the board, not two. The status line uses `ok` for its dot
 * because each one asserts a state that currently holds.
 */
export function VerificationGrid() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {verifyCards.map((card) => (
        <div key={card.label} className="rounded-panel border border-sky/[0.12] bg-panel p-rules">
          <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
            {card.label}
          </dt>
          <dd className="mt-3 font-heading text-[17px] font-semibold leading-snug text-paper">
            {card.value}
          </dd>
          <dd className="mt-3.5 inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ok">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
            {card.state}
          </dd>
        </div>
      ))}
    </dl>
  )
}
