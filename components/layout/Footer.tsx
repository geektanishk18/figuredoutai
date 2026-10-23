import Link from 'next/link'
import { Linkedin, Instagram } from 'lucide-react'
import { Container } from '@/components/ui'
import { WORDMARK_HEIGHTS, Wordmark } from './Wordmark'
import { COMPANY, CONTACT, FOOTER_NAV, INDUSTRIES, LEGAL_NAV, SOCIAL } from '@/lib/constants'

const columnHeading = 'font-heading text-xs font-semibold uppercase tracking-[0.16em] text-sky'
const listLink =
  'focus-ring -mx-2 block rounded-lg px-2 py-1.5 text-sm text-body hover:text-paper'

/**
 * The company's own profiles.
 *
 * These are the same URLs the Organization schema claims via `sameAs`, and
 * that is the point of rendering them: a `sameAs` claim asserts the profiles
 * belong to this entity, and a visible, followable link from the site to the
 * profile is the corroboration a crawler can actually traverse. A claim made
 * only in the head is weaker than one the page also makes in the open.
 *
 * X is deliberately absent here — the account is Tanishk's personal profile,
 * linked from the founder record on /about/ rather than presented as a
 * company channel.
 */
const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: SOCIAL.company.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: SOCIAL.company.instagram, Icon: Instagram },
] as const

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:pr-6">
            {/* Footer sits on `panel` — a dark surface, so the light wordmark. */}
            <Wordmark height={WORDMARK_HEIGHTS.desktop} />
            <p className="mt-4 max-w-xs text-sm text-body">{COMPANY.positioning}</p>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className={columnHeading}>
              Company
            </h2>
            <ul className="mt-4 space-y-0.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={listLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-industries-heading">
            <h2 id="footer-industries-heading" className={columnHeading}>
              Industries
            </h2>
            <ul className="mt-4 space-y-0.5">
              {INDUSTRIES.map((industry) => (
                <li key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`} className={listLink}>
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 id="footer-contact-heading" className={columnHeading}>
              Contact
            </h2>
            <ul className="mt-4 space-y-0.5" aria-labelledby="footer-contact-heading">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={listLink}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className={listLink}>
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <address className="mt-4 text-sm not-italic text-muted">
              {COMPANY.entityString}
            </address>

            <ul className="mt-5 flex items-center gap-2" aria-label="FiguredoutAI on social media">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    // Off-site, and opened in a new tab so the visitor does
                    // not lose the page. `noopener` is the security half of
                    // the pair; `noreferrer` is deliberately absent — the
                    // referrer is how these platforms attribute the visit
                    // back to the site, which is the point of linking out.
                    target="_blank"
                    rel="noopener"
                    aria-label={`FiguredoutAI on ${label}`}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-body hover:border-sky/40 hover:text-paper"
                  >
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative mt-16 overflow-hidden select-none">
          <p className="whitespace-nowrap text-center font-heading text-[clamp(3.5rem,14.5vw,13rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-paper/[0.045] blur-[1.5px] [text-shadow:0_0_42px_rgba(94,235,255,0.13)]">
            FIGUREDOUTAI
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel via-panel/50 to-transparent" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {COMPANY.legalName}
          </p>
          <ul className="flex items-center gap-4">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-lg text-sm text-muted hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
