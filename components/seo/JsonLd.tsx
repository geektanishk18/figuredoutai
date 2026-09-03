import { COMPANY, CONTACT, ORGANIZATION_SAME_AS, SITE_URL } from '@/lib/constants'
import { schemaTypeFor, type PublishableTier } from '@/components/content/Provenance'

/**
 * Structured data.
 *
 * Every value here is verifiable — entity name, LLPIN, registered address,
 * named founders. No ratings, no review counts, no client numbers: those
 * properties invite exactly the fabricated proof this site does not publish.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
/**
 * The `/about/` fragment ids carry the trailing slash because that is the
 * page's canonical URL — `trailingSlash: true` serves it at `/about/`, and
 * the page's own canonical tag says so. An `@id` of `/about#tanishk-singhal`
 * anchors the person to a URL the site never claims as canonical, which is
 * the kind of near-miss that leaves a knowledge graph holding two
 * half-confident records instead of one confident one.
 */
export const TANISHK_ID = `${SITE_URL}/about/#tanishk-singhal`
export const YASHVARDHAN_ID = `${SITE_URL}/about/#yashvardhan-awasthi`

function JsonLdScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        /*
          The spellings the brand is actually written as in the wild. Google
          currently answers a brand search with "Did you mean: figured out
          ai" and hedges its AI Overview with "If you are referring to
          FiguredoutAI" — both are symptoms of one missing claim: that the
          single-token spelling, the spaced spelling and the logo wordmark
          are the same entity. `alternateName` is where that claim goes.
          `figuredout.ai` appears here and nowhere else in prose: it is the
          logo lockup, not a way the company writes its own name.
        */
        alternateName: ['FiguredoutAI LLP', 'Figuredout AI', 'figuredout.ai'],
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand/icon-512.png`,
        image: `${SITE_URL}/brand/og-image.png`,
        description: COMPANY.positioning,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: COMPANY.city,
          addressRegion: COMPANY.state,
          addressCountry: 'IN',
        },
        // The LLPIN is the company's verifiable public identifier.
        identifier: {
          '@type': 'PropertyValue',
          name: 'LLPIN',
          value: COMPANY.llpin,
        },
        // Linked, not embedded: each founder is its own addressable Person
        // (PersonSchema below), so a crawler that resolves this @id graph
        // gets one consistent record of who runs the company, not two
        // different descriptions of the same person in two places.
        founder: [{ '@id': TANISHK_ID }, { '@id': YASHVARDHAN_ID }],
        foundingLocation: `${COMPANY.city}, ${COMPANY.state}, ${COMPANY.country}`,
        areaServed: { '@type': 'Country', name: 'India' },
        /*
          Corroboration, not decoration. An entity claim the site makes about
          itself is weak on its own; `sameAs` points at profiles under
          separate control that say the same thing, which is most of how a
          knowledge graph moves from "probably this company" to "this
          company". The URLs are the canonical profile forms — see
          ORGANIZATION_SAME_AS for why the share-tracking parameters are
          stripped.
        */
        sameAs: ORGANIZATION_SAME_AS,
        knowsAbout: [
          'Conversational qualification',
          'Lead qualification logic',
          'Enquiry routing and escalation',
          'AI decision layer',
          'Enquiry intake automation',
          'Growth infrastructure',
          'WhatsApp lead qualification',
        ],
      }}
    />
  )
}

/**
 * One addressable record per founder, linked from `OrganizationSchema.founder`
 * by `@id` rather than duplicated inline. This is what lets a crawler resolve
 * "who is the CEO of FiguredoutAI" to a single, consistent answer instead of
 * two disagreeing descriptions of the same person.
 *
 * `url` points at `/about/` — the page that actually carries the person's
 * bio — rather than at a per-person page, because no per-person page exists.
 * Pointing at one that does not would be a claim the site cannot honour.
 */
export function PersonSchema({
  id,
  name,
  jobTitle,
  sameAs,
}: {
  id: string
  name: string
  jobTitle: string
  sameAs?: readonly string[]
}) {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': id,
        name,
        jobTitle,
        worksFor: { '@id': ORGANIZATION_ID },
        url: `${SITE_URL}/about/`,
        ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
      }}
    />
  )
}

export function WebSiteSchema() {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: COMPANY.name,
        alternateName: COMPANY.legalName,
        description: COMPANY.positioning,
        inLanguage: 'en-IN',
        publisher: { '@id': ORGANIZATION_ID },
      }}
    />
  )
}

/**
 * Breadcrumbs for nested routes.
 *
 * States the hierarchy a crawler would otherwise have to infer from URL
 * shape alone. Only rendered where there is a real hierarchy to describe —
 * a breadcrumb trail on a top-level page is a trail of one, which says
 * nothing and still has to be parsed.
 *
 * `item` is omitted on the final crumb per Google's guidance: the last
 * element is the current page, and pointing it at itself adds a self-
 * reference that consumers have to special-case.
 */
export function BreadcrumbSchema({
  trail,
}: {
  /** Ordered, root first. The last entry is the current page. */
  trail: readonly { name: string; path: string }[]
}) {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          ...(index < trail.length - 1
            ? { item: `${SITE_URL}${crumb.path === '/' ? '/' : `${crumb.path}/`}` }
            : {}),
        })),
      }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        // Addressable, so the service can be referenced rather than restated.
        // Distinct from the page's own identity: the page is a document, the
        // service is the thing the document describes.
        '@id': `${url}#service`,
        name,
        description,
        url,
        serviceType: 'Conversational qualification and routing',
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'India' },
      }}
    />
  )
}

/**
 * Marks up a proof block — an engineered scenario or the reference build.
 *
 * The `@type` comes from the same tier that produces the visible label, so the
 * structured data and the label cannot disagree about what a page is. It is
 * always `Article` or `CreativeWork`: `Review` and `AggregateRating` require an
 * identifiable author, and emitting either without one is fabricated structured
 * data — penalised by search engines, and corrosive to the position this site
 * is built on.
 */
export function ProofSchema({
  tier,
  headline,
  description,
  url,
}: {
  tier: PublishableTier
  headline: string
  description: string
  url: string
}) {
  return (
    <JsonLdScript
      schema={{
        '@context': 'https://schema.org',
        '@type': schemaTypeFor(tier),
        '@id': `${url}/#proof`,
        headline,
        description,
        url,
        isAccessibleForFree: true,
        author: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        // States plainly that this is a modelled architecture rather than a
        // record of delivered client work.
        ...(tier === 'scenario'
          ? { genre: 'Engineered scenario', abstract: 'Modelled decision architecture, not a record of delivered client work.' }
          : {}),
      }}
    />
  )
}
