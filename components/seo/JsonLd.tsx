import { COMPANY, CONTACT, SITE_URL } from '@/lib/constants'
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
        url: SITE_URL,
        logo: `${SITE_URL}/brand/icon-512.png`,
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
        founder: [
          {
            '@type': 'Person',
            name: 'Tanishk Singhal',
            jobTitle: 'Co-Founder & Chief Executive Officer',
          },
          {
            '@type': 'Person',
            name: 'Yashvardhan Awasthi',
            jobTitle: 'Co-Founder & Chief Technology Officer',
          },
        ],
        areaServed: { '@type': 'Country', name: 'India' },
        knowsAbout: [
          'Conversational qualification',
          'Lead qualification logic',
          'Enquiry routing and escalation',
        ],
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
        url: SITE_URL,
        name: COMPANY.name,
        description: COMPANY.positioning,
        inLanguage: 'en-IN',
        publisher: { '@id': ORGANIZATION_ID },
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
