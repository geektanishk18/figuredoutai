import Link from 'next/link'
import { Container } from '@/components/ui'
import { WORDMARK_HEIGHTS, Wordmark } from './Wordmark'
import { COMPANY, CONTACT, FOOTER_NAV, INDUSTRIES, LEGAL_NAV } from '@/lib/constants'

const columnHeading = 'font-heading text-xs font-semibold uppercase tracking-[0.16em] text-sky'
const listLink =
  'focus-ring -mx-2 block rounded-lg px-2 py-1.5 text-sm text-body hover:text-paper'

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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
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
