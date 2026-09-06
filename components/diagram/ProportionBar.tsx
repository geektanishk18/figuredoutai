import { cn } from '@/lib/utils'

/**
 * A month's enquiries, drawn to scale.
 *
 * This is the calculator's visual output, and it is the only chart on the site.
 * Two constraints shaped it:
 *
 *   1. Content integrity. Nothing here may look like evidence of results with
 *      real clients. Every segment is arithmetic on numbers the reader typed
 *      into the sliders a moment ago — there is no measured outcome, no trend,
 *      no before-and-after. A trend line was the obvious thing to draw and is
 *      exactly what the proof policy forbids, because a line going up implies
 *      something was measured.
 *
 *   2. It does a job the numbers alone do not. The figure "176 missed" is
 *      abstract; 176 as a visible slice of the month's total is not. The bar
 *      also makes the conservative assumption legible rather than only stated —
 *      the counted portion is visibly a minority of what was missed, which is
 *      the claim the footnote makes in words.
 *
 * No charting library. Recharts would add 100KB+ of First Load JS to draw three
 * rectangles whose widths are percentages; these are three divs and a flex row.
 * The bar is `aria-hidden` because every quantity it shows is already announced
 * by the figures beside it — a screen reader should hear each number once.
 */

export interface Segment {
  /** Share of the whole, 0-100. */
  pct: number
  label: string
  className: string
}

interface ProportionBarProps {
  segments: readonly Segment[]
  /** Names what the full width represents, for the legend. */
  totalLabel: string
  className?: string
}

export function ProportionBar({ segments, totalLabel, className }: ProportionBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div
        aria-hidden="true"
        className="flex h-2.5 w-full gap-px overflow-hidden rounded-full bg-panel-raised"
      >
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={cn('h-full', segment.className)}
            // Percentage widths rather than flex-grow: a zero-value segment
            // must collapse to nothing, and `flex: 0` on a gapped row still
            // leaves its gap behind.
            style={{ width: `${segment.pct}%` }}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-1.5 text-micro text-muted">
            <span
              aria-hidden="true"
              className={cn('h-2 w-2 flex-none rounded-[2px]', segment.className)}
            />
            {segment.label}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-micro text-muted/80">{totalLabel}</p>
    </div>
  )
}
