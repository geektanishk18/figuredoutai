import type { MetadataRoute } from 'next'
import { INDUSTRIES, RESERVED_ROUTES, SITE_URL } from '@/lib/constants'

// Required for `output: 'export'` — a static export has no server to
// generate this on request, so Next needs to know it can render it once,
// at build time, like any other route.
export const dynamic = 'force-static'

/**
 * Generated, not static. `RESERVED_ROUTES` is filtered out explicitly rather
 * than relying on the route simply not existing — so the exclusion survives
 * someone later adding the page.
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/decision-layer', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/why-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
  ...INDUSTRIES.map((industry) => ({
    path: `/industries/${industry.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/reference-build', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.filter((route) => !RESERVED_ROUTES.includes(route.path)).map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
