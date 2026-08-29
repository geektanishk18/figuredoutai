import { cn } from '@/lib/utils'

/**
 * Declares where a proof block's content came from.
 *
 * `tier` drives the visible label, the border treatment and the schema type
 * together, from one place, so a modelled scenario cannot be styled to look
 * like delivered client work — the label and the content cannot drift apart
 * because there is only one thing to change.
 */
export type Tier =
  | 'reference' // "Our reference implementation"
  | 'scenario' // "Engineered scenario · modelled architecture"
  | 'engagement' // reserved — requires a real client's consent
  | 'named' // reserved — requires a real client's consent

/**
 * The two reserved tiers are deliberately unusable. They exist so that a future
 * consenting client is a data change rather than a rebuild, and they are
 * excluded from the prop type so reaching for one is a compile error, not a
 * review comment.
 */
export type PublishableTier = Exclude<Tier, 'engagement' | 'named'>

const RESERVED: readonly Tier[] = ['engagement', 'named']

const LABELS: Record<PublishableTier, { label: string; schemaType: 'CreativeWork' | 'Article' }> = {
  reference: { label: 'Our reference implementation', schemaType: 'CreativeWork' },
  scenario: { label: 'Engineered scenario · modelled architecture', schemaType: 'Article' },
}

/** Never `Review` or `AggregateRating` — those require an identifiable author. */
export function schemaTypeFor(tier: PublishableTier) {
  return LABELS[tier].schemaType
}

export function Provenance({ tier, className }: { tier: PublishableTier; className?: string }) {
  // Belt and braces for a tier arriving from data rather than a literal: this
  // throws during static generation, so the build fails rather than the page
  // shipping an unearned label.
  if (RESERVED.includes(tier)) {
    throw new Error(
      `Provenance tier "${tier}" is reserved and must not be used until a real client has consented in writing.`,
    )
  }

  const entry = LABELS[tier]
  if (!entry) throw new Error(`Unknown Provenance tier "${tier}".`)

  return (
    // Styling is board 1e's provenance chip, to the value: 9px Inter 500 at
    // 0.2em, sky at 72% on a 20% sky border, a 4px radius, and a 1px leading
    // tick rather than a dot. The chip is deliberately quiet — it is a
    // disclosure, not a badge, and must not read as a credential.
    <p
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-chip border border-sky/20 bg-panel px-2.5 py-1',
        'font-sans text-[9px] font-medium uppercase leading-none tracking-[0.2em] text-sky/[0.72]',
        className,
      )}
    >
      <span aria-hidden="true" className="h-2.5 w-px shrink-0 bg-sky/40" />
      {entry.label}
    </p>
  )
}
