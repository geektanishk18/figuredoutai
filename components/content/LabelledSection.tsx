import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The section frame boards 1b and 1d use everywhere.
 *
 * Both boards hang every section off a small uppercase label in the far-left
 * gutter. Two arrangements appear, and which one is used is a function of how
 * wide the content is rather than a per-section styling choice:
 *
 *   `aside` — label in its own left column, prose or rows beside it. Used where
 *             the content is a measure-limited column ("Why this company
 *             exists", "How we work", "Governance", "Engagements").
 *   `stack` — label above content that needs the full width. Used for the card
 *             grids ("The people behind it", "What we believe", "Verification").
 *
 * Below `lg` both collapse to the same stacked order, which is what the 375
 * artboards show.
 */
interface LabelledSectionProps {
  label: string
  variant?: 'aside' | 'stack'
  /** Sits beside the label in `aside`, or under it in `stack`. */
  intro?: ReactNode
  /** Right-hand note, opposite the intro. Board 1b uses it for the MCA line. */
  note?: ReactNode
  headingId?: string
  className?: string
  children: ReactNode
}

const LABEL =
  'font-sans text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted'

export function LabelledSection({
  label,
  variant = 'aside',
  intro,
  note,
  headingId,
  className,
  children,
}: LabelledSectionProps) {
  if (variant === 'stack') {
    return (
      <section aria-labelledby={headingId} className={cn('mt-section', className)}>
        <p className={LABEL}>{label}</p>
        {intro || note ? (
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-col">
            <div className="max-w-[780px]">{intro}</div>
            {note ? <div className="max-w-[340px] text-[15px] leading-[1.6] text-body">{note}</div> : null}
          </div>
        ) : null}
        <div className="mt-8">{children}</div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn('mt-section grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-col', className)}
    >
      <div>
        <p className={LABEL}>{label}</p>
        {intro ? <div className="mt-3 text-[15px] leading-[1.6] text-body">{intro}</div> : null}
      </div>
      <div>{children}</div>
    </section>
  )
}
