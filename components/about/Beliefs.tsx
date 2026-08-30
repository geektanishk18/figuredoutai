import { beliefs } from '@/lib/content/beliefs'

/** Board 1d's four-card belief grid. */
export function Beliefs() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {beliefs.map((belief) => (
        <li
          key={belief.title}
          className="rounded-panel border border-sky/[0.12] bg-panel p-belief"
        >
          <h3 className="font-heading text-[1.25rem] font-semibold leading-[1.22] text-paper">
            {belief.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-body">{belief.body}</p>
        </li>
      ))}
    </ul>
  )
}
