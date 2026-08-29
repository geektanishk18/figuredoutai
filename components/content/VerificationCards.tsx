import { verifyCards } from '@/lib/content/verify-cards'

/**
 * The verification block from board 1b.
 *
 * The site publishes no client logos, testimonials or counts, which leaves a
 * reader with nothing conventional to check us against. This is the substitute:
 * facts that can be verified against a public register rather than taken on
 * trust. Every value here is independently checkable, which is the whole point —
 * a claim the reader can confirm is worth more than one they cannot.
 */
export function VerificationCards({ headingId }: { headingId: string }) {
  return (
    <section aria-labelledby={headingId} className="mt-14">
      <h2 id={headingId} className="text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]">
        What you can verify
      </h2>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {verifyCards.map((card) => (
          <div key={card.label} className="rounded-panel border border-line bg-panel p-card">
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
              {card.label}
            </dt>
            <dd className="mt-2 text-[16px] leading-snug text-paper">{card.value}</dd>
            <dd className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-sky">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
              {card.state}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
