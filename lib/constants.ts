/**
 * Site-wide constants. Everything here is safe to ship to the browser.
 *
 * The lead-delivery address is deliberately absent — it is server-only and read
 * from the environment inside the Route Handler, never from this module.
 */

/**
 * The canonical origin, used for `metadataBase`, the sitemap, robots.txt and
 * every JSON-LD `@id`.
 *
 * `.env.example` has always documented `NEXT_PUBLIC_SITE_URL`, but nothing read
 * it — the origin was hard-coded, so a Netlify preview or branch deploy emitted
 * canonicals, a sitemap and structured data all pointing at the production
 * domain. That makes a preview claim to *be* production to any crawler that
 * reaches it.
 *
 * The production value stays the default, so an unset variable behaves exactly
 * as before. Netlify sets `URL` per deploy context; map it to this variable in
 * the UI to make previews describe themselves honestly.
 *
 * Must be `NEXT_PUBLIC_` — `JsonLd` and `metadataBase` are evaluated where the
 * value has to be inlined at build time.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://figuredoutai.com'
).replace(/\/$/, '')

export const COMPANY = {
  name: 'FiguredoutAI',
  legalName: 'FiguredoutAI LLP',
  llpin: 'ACZ-0822',
  registeredUnder: 'Limited Liability Partnership Act, 2008',
  city: 'Noida',
  state: 'Uttar Pradesh',
  country: 'India',
  /** Canonical one-line entity string. Use verbatim wherever the entity is stated. */
  entityString: 'FiguredoutAI LLP · LLPIN ACZ-0822 · Noida, Uttar Pradesh, India',
  positioning: 'Growth infrastructure for businesses that intend to scale output, not headcount.',
  tagline: 'Scaling revenue without scaling chaos.',
} as const

export const CONTACT = {
  /** The only email address that may appear in rendered HTML. */
  email: 'hello@figuredoutai.com',
  phone: '+91 81076 58699',
  phoneHref: 'tel:+918107658699',
} as const

export const CTA = {
  label: 'Get your intake audit',
  href: '/contact',
} as const

/* ------------------------------------------------------------------ *
 * Social profiles
 * ------------------------------------------------------------------ */

/**
 * Canonical profile URLs — tracking parameters deliberately stripped.
 *
 * The URLs as shared from the mobile apps carry share-attribution query
 * strings (`utm_source=share_via`, `igsh=`, `?s=11&t=`). Those identify the
 * share event, not the profile, and they expire. Two reasons they must not
 * ship: schema.org `sameAs` is an identity claim, and a URL that resolves
 * differently later is a broken claim; and a crawler treats the parameterised
 * and clean URLs as separate entities, which is the opposite of what
 * `sameAs` is for — consolidating identity across the web.
 */
export const SOCIAL = {
  company: {
    linkedin: 'https://www.linkedin.com/company/figuredout-ai/',
    instagram: 'https://www.instagram.com/figuredout.ai',
  },
  tanishk: {
    linkedin: 'https://www.linkedin.com/in/tanishksinghal',
    x: 'https://x.com/tanishk_ai',
    instagram: 'https://www.instagram.com/tanishk.figureitout',
  },
} as const

/**
 * Everything the Organization entity claims as itself. Order is not
 * meaningful to a consumer, but the company profiles lead because they are
 * the strongest corroboration of the entity's own identity.
 */
export const ORGANIZATION_SAME_AS: readonly string[] = [
  SOCIAL.company.linkedin,
  SOCIAL.company.instagram,
  SOCIAL.tanishk.linkedin,
  SOCIAL.tanishk.x,
]

/* ------------------------------------------------------------------ *
 * Industries
 * ------------------------------------------------------------------ */

export const INDUSTRY_SLUGS = [
  'clinics',
  'real-estate',
  'restaurants',
  'travel',
  'recruitment',
  'hvac',
] as const

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number]

export interface IndustryEntry {
  slug: IndustrySlug
  /** Short label — navigation, segmented control, cards. */
  label: string
  /** Longer label — page titles and prose. */
  name: string
  /** The intake failure this industry recognises, in one line. */
  intakeFailure: string
}

export const INDUSTRIES: readonly IndustryEntry[] = [
  {
    slug: 'clinics',
    label: 'Clinics',
    name: 'Medical clinics and healthcare',
    intakeFailure: 'Calls that arrive while the front desk is with a patient.',
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    name: 'Real estate',
    intakeFailure: 'Portal enquiries that go to whoever replies first.',
  },
  {
    slug: 'restaurants',
    label: 'Restaurants',
    name: 'Restaurants and food service',
    intakeFailure: 'Bookings lost to a busy line on a Friday evening.',
  },
  {
    slug: 'travel',
    label: 'Travel',
    name: 'Travel and tour operators',
    intakeFailure: 'Itinerary requests that cool off before a quote arrives.',
  },
  {
    slug: 'recruitment',
    label: 'Recruitment',
    name: 'Recruitment and staffing',
    intakeFailure: 'Applications that outlive the offer the candidate accepted.',
  },
  {
    slug: 'hvac',
    label: 'HVAC',
    name: 'HVAC and field services',
    intakeFailure: 'Urgent service calls answered by another vendor first.',
  },
] as const

export function getIndustry(slug: string): IndustryEntry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug)
}

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export interface NavItem {
  label: string
  href: string
  /** Present when the item opens a dropdown on desktop / expands in the drawer. */
  children?: readonly { label: string; href: string }[]
}

/**
 * The nav exactly as every canvas board draws it: five items in sentence case,
 * then the CTA. Decision Layer, Services and Reference Build are deliberately
 * not here — the boards show a five-item bar, and those routes stay reachable
 * (and indexed) through `FOOTER_NAV`. Removing them from the header is a
 * navigation decision the design makes; it is not a decision to unpublish them.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Why us', href: '/why-us' },
  { label: 'How it works', href: '/how-it-works' },
  {
    label: 'Industries',
    href: '/industries',
    children: INDUSTRIES.map((industry) => ({
      label: industry.label,
      href: `/industries/${industry.slug}`,
    })),
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const FOOTER_NAV: readonly { label: string; href: string }[] = [
  { label: 'Decision Layer', href: '/decision-layer' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Reference Build', href: '/reference-build' },
  { label: 'Systems We’ve Built', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const LEGAL_NAV: readonly { label: string; href: string }[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const

/**
 * Reserved and deliberately not built. Kept here so the sitemap generator in
 * Layer 7 can assert its own exclusion rather than relying on the route
 * simply being absent.
 */
export const RESERVED_ROUTES: readonly string[] = ['/ai-for-businesses'] as const
