import { GENERIC_COMPARISON, type ComparisonRow } from '@/lib/content/comparison-matrix'
import { cn } from '@/lib/utils'

/**
 * The chatbot / decision-layer comparison, as a semantic table.
 *
 * Two things are load-bearing and should not be "simplified" away:
 *
 *   1. It is a real `<table>` with a `<caption>`, `<th scope="col">` and
 *      `<th scope="row">`. That markup is what lets a screen reader announce
 *      "Urgency, decision layer, scores and prioritises" instead of three
 *      loose fragments, and it is what makes the comparison machine-readable.
 *      A grid of divs would look identical and communicate nothing.
 *
 *   2. It is styled to not read as a spreadsheet. No vertical rules, no zebra
 *      striping, no cell borders — the only rules are horizontal hairlines
 *      separating rows, and the decision-layer column carries a tinted ground
 *      so the eye lands on the answer rather than scanning a grid.
 *
 * Mobile keeps the table intact and lets it scroll inside its own container,
 * which is the site's existing convention. The alternative — flipping display
 * to block at small widths to stack the cells — silently discards the table
 * semantics in several screen readers, which would trade the first property
 * above for a small amount of convenience.
 */

interface ComparisonMatrixProps {
  rows?: readonly ComparisonRow[]
  /** Names the subject in the caption and column head, e.g. "clinic enquiries". */
  subject?: string
  className?: string
}

const HEAD = 'px-5 py-3.5 text-left align-bottom text-micro font-medium uppercase'

export function ComparisonMatrix({
  rows = GENERIC_COMPARISON,
  subject,
  className,
}: ComparisonMatrixProps) {
  const caption = subject
    ? `How a chatbot and a decision layer each handle ${subject}`
    : 'How a chatbot and a decision layer each handle an enquiry'

  return (
    <div className={cn('edge-fade -mx-1 overflow-x-auto px-1', className)}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>

        <thead>
          <tr>
            <th scope="col" className={cn(HEAD, 'text-muted')}>
              <span className="sr-only">Dimension</span>
            </th>
            <th scope="col" className={cn(HEAD, 'text-muted')}>
              A chatbot
            </th>
            {/*
              The tint is on every cell of this column rather than on a wrapper:
              a table cell cannot be reliably grouped and painted through
              `<colgroup>` across browsers once borders collapse.
            */}
            <th scope="col" className={cn(HEAD, 'rounded-t-frame bg-sky/[0.06] text-sky')}>
              A decision layer
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.dimension} className="border-t border-line align-top">
              <th
                scope="row"
                className="py-4 pl-5 pr-4 text-micro font-medium uppercase text-muted"
              >
                {row.dimension}
              </th>
              <td className="py-4 pr-4 text-copy text-muted">{row.chatbot}</td>
              <td className="bg-sky/[0.06] px-5 py-4 text-copy text-body">{row.layer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
