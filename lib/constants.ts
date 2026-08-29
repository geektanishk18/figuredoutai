/**
 * Site-wide constants. Everything here is safe to ship to the browser.
 *
 * The lead-delivery address is deliberately absent — it is server-only and read
 * from the environment inside the Route Handler, never from this module.
 */

export const SITE_URL = 'https://figuredoutai.com'

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
 * Industries
 * ------------------------------------------------------------------ */

export const INDUSTRY_SLUGS = [
  'medical-clinics',
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
    slug: 'medical-clinics',
    label: 'Medical Clinics',
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

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Decision Layer', href: '/decision-layer' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', href: '/services' },
  {
    label: 'Industries',
    href: '/industries',
    children: INDUSTRIES.map((industry) => ({
      label: industry.label,
      href: `/industries/${industry.slug}`,
    })),
  },
  { label: 'Why Us', href: '/why-us' },
  { label: 'About', href: '/about' },
] as const

export const FOOTER_NAV: readonly { label: string; href: string }[] = [
  { label: 'Decision Layer', href: '/decision-layer' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Reference Build', href: '/reference-build' },
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
