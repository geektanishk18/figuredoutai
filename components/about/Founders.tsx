import { founders } from '@/lib/content/founders'

const META = 'font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-muted'
const RULE = 'mt-5 border-t border-sky/[0.08] pt-5'

/**
 * Board 1d's founder cards.
 *
 * This was previously a pair of `###` headings and loose paragraphs in the MDX
 * body, which lost every structural cue the board relies on: the initials tile,
 * the ownership line, and the vision quote set apart in sky. Those are not
 * decoration — "Owns" is the only place the site says who is accountable for
 * what, and it has to survive as a labelled field rather than dissolve into
 * prose.
 *
 * The quote carries the founder's own words, so it is a `<blockquote>` with a
 * `<cite>`, not a styled paragraph.
 */
export function Founders() {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {founders.map((founder) => (
        <li
          key={founder.name}
          className="rounded-panel border border-sky/[0.12] bg-panel p-founder"
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 flex-none items-center justify-center rounded-tile border border-sky/30 font-heading text-[15px] font-semibold tracking-[0.02em] text-sky"
            >
              {founder.initials}
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-[1.75rem] font-semibold leading-[1.18] text-paper">
                {founder.name}
              </h3>
              <p className="mt-1.5 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-peak">
                {founder.role}
              </p>
            </div>
          </div>

          <div className={RULE}>
            <p className={META}>Owns</p>
            <p className="mt-2 text-[16px] font-semibold leading-snug text-paper">{founder.owns}</p>
          </div>

          <div className={RULE}>
            <p className={META}>Background</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-body">{founder.bio}</p>
          </div>

          <blockquote className={`${RULE} border-l-2 border-l-sky/[0.42] pl-5`}>
            <p className="text-[15px] font-medium leading-[1.6] text-sky">{founder.vision}</p>
            <cite className="sr-only">{founder.name}</cite>
          </blockquote>
        </li>
      ))}
    </ul>
  )
}
