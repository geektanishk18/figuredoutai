import { compareRows } from '@/lib/content/compare-rows'

/**
 * Board 1b's before/after table.
 *
 * A real `<table>`, not a grid of divs: each row states one property of the
 * business and its two values, which is exactly the relationship a table
 * header expresses and a stack of styled divs throws away. Screen readers can
 * then announce "Response time · with qualification logic · immediate" instead
 * of reading three unrelated fragments.
 *
 * The row label is a `<th scope="row">` for the same reason.
 */
const HEAD =
  'px-5 py-4 text-left font-sans text-[11px] font-medium uppercase tracking-[0.1em] align-bottom'

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-panel border border-sky/[0.12]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          Handling enquiries without judgement, compared with handling them under qualification
          logic
        </caption>
        <thead>
          <tr className="border-b border-sky/[0.08] bg-panel">
            <th scope="col" className={`${HEAD} text-muted`}>
              <span className="sr-only">Property</span>
            </th>
            <th scope="col" className={`${HEAD} text-muted`}>
              Answering, without judgement
            </th>
            <th scope="col" className={`${HEAD} text-sky`}>
              With qualification logic
            </th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.label} className="border-b border-sky/[0.08] last:border-b-0">
              <th
                scope="row"
                className="px-5 py-4 text-left align-top text-[15px] font-semibold text-paper"
              >
                {row.label}
              </th>
              <td className="px-5 py-4 align-top text-[15px] leading-[1.5] text-body">
                {row.before}
              </td>
              <td className="px-5 py-4 align-top text-[15px] leading-[1.5] text-peak">
                {row.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
