import { govCards } from '@/lib/content/why-sections'

/** Board 1b's two governance cards. */
export function GovernanceCards() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {govCards.map((card) => (
        <li key={card.title} className="rounded-panel border border-sky/[0.12] bg-panel p-rules">
          <h3 className="font-heading text-[1.25rem] font-semibold leading-[1.22] text-paper">
            {card.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-body">{card.body}</p>
        </li>
      ))}
    </ul>
  )
}
