interface Row {
  readonly n: string
  readonly title: string
  readonly body: string
}

/**
 * The numbered process rows shared by board 1d's "How we work" and board 1b's
 * three-row version of the same section. One component, because they are the
 * same object drawn twice — only the row data differs.
 */
export function NumberedRows({ rows }: { rows: readonly Row[] }) {
  return (
    <ol className="border-t border-sky/[0.08]">
      {rows.map((row) => (
        <li
          key={row.n}
          className="grid gap-2 border-b border-sky/[0.08] py-6 md:grid-cols-[48px_minmax(0,260px)_minmax(0,1fr)] md:gap-6"
        >
          <span aria-hidden="true" className="font-sans text-[13px] font-medium text-sky">
            {row.n}
          </span>
          <h3 className="font-heading text-[1.25rem] font-semibold leading-[1.22] text-paper">
            {row.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-body">{row.body}</p>
        </li>
      ))}
    </ol>
  )
}
