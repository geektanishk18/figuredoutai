import { founders } from '@/lib/content/founders'
import { SOCIAL } from '@/lib/constants'

const META = 'font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-muted'
const RULE = 'mt-5 border-t border-sky/[0.08] pt-5'

/**
 * Profiles per founder, keyed by the name on the card.
 *
 * Rendered for the same reason the footer renders the company's: the Person
 * schema on this page claims these profiles via `sameAs`, and a visible link
 * is the version of that claim a crawler can follow. Only founders with
 * public profiles appear — an absent entry renders nothing rather than a
 * dead or invented link.
 */
const FOUNDER_PROFILES: Record<string, readonly { label: string; href: string }[]> = {
  'Tanishk Singhal': [
    { label: 'LinkedIn', href: SOCIAL.tanishk.linkedin },
    { label: 'X', href: SOCIAL.tanishk.x },
    { label: 'Instagram', href: SOCIAL.tanishk.instagram },
  ],
}

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
 *
 * `grid-cols-1` on the list is explicit rather than implied. Without it there
 * is no column template below `lg`, so the cards land in an implicit `auto`
 * track — and an `auto` track's growth limit is its max-content size. The role
 * line ("CO-FOUNDER & CHIEF EXECUTIVE OFFICER", uppercase with 0.1em tracking)
 * does not wrap at max-content, which sized the track to 332px inside a 280px
 * container and put the whole page into horizontal scroll at 320px. Setting
 * `min-width: 0` on the card cannot fix that — auto tracks size to max-content
 * regardless. `grid-cols-1` is `repeat(1, minmax(0, 1fr))`: definite and
 * shrinkable, so the track follows the container. Nothing changes at any other
 * width.
 */
export function Founders() {
  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {founders.map((founder) => {
        const profiles = FOUNDER_PROFILES[founder.name]

        return (
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

          {profiles ? (
            <div className={RULE}>
              <p className={META}>Profiles</p>
              <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                {profiles.map((profile) => (
                  <li key={profile.label}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${founder.name} on ${profile.label}`}
                      className="focus-ring rounded text-[15px] text-sky underline underline-offset-4 hover:text-peak"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        )
      })}
    </ul>
  )
}
