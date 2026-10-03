interface Row {
  /** Stable key. Not rendered — see the note below. */
  readonly n: string
  readonly title: string
  readonly body: string
}

/**
 * The commitment rows shared by /about's "How we work" and /why-us.
 *
 * This was `NumberedRows` and drew an 01 / 02 / 03 marker beside each row.
 * Numbered markers are only meaningful where the content is genuinely a
 * sequence, and neither of these lists is one: "we build and deploy", "we stay
 * after go-live", "we are judged on outcomes" are four simultaneous
 * commitments, not four steps in an order. The numbers implied a progression
 * that does not exist and invited the reader to look for one.
 *
 * Numbering is kept where it is earned — `<PhaseRoadmap />` and the homepage
 * phase cards, where the engagement really does run in order.
 *
 * `n` stays on the data as the React key: it is stable, unique, and changing
 * the shape of two generated content files to drop a field nobody renders
 * would be churn for its own sake.
 */
export function CommitmentRows({ rows }: { rows: readonly Row[] }) {
  return (
    <ul className="border-t border-sky/[0.08]">
      {rows.map((row) => (
        <li
          key={row.n}
          className="grid gap-2 border-b border-sky/[0.08] py-6 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-8"
        >
          <h3 className="text-h3 font-semibold text-paper">{row.title}</h3>
          <p className="text-copy text-body">{row.body}</p>
        </li>
      ))}
    </ul>
  )
}
