import type { Metadata } from 'next'
import { COMPANY } from '@/lib/constants'

/**
 * Metadata for one route, with social cards that describe that route.
 *
 * Two Next behaviours made every route but /about share the homepage's
 * cards. `openGraph` on a route replaces the layout's object wholesale, so
 * `siteName` and `locale` were dropped. And a route with no `twitter` object
 * inherits the layout's, so X/LinkedIn previews showed the homepage title and
 * description on every page. Building all of it here keeps the four pieces —
 * title, description, canonical, cards — from drifting apart per route.
 *
 * Images are left out on purpose: each route's `opengraph-image.tsx` is picked
 * up for `og:image`, and `twitter:image` falls back to it once the route
 * declares its own `twitter` object.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string
  description: string
  /** Route path, e.g. `/about`. Resolved against `metadataBase`. */
  path: string
  /** Set when the title already names the brand, so the layout template is skipped. */
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${COMPANY.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: COMPANY.name,
      locale: 'en_IN',
      title: fullTitle,
      description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
