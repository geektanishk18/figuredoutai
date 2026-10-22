import type { MetadataRoute } from 'next'
import { INDUSTRIES, RESERVED_ROUTES, SITE_URL } from '@/lib/constants'
import { lastModifiedFor } from '@/lib/sitemap-lastmod'

// Required for `output: 'export'` — a static export has no server to
// generate this on request, so Next needs to know it can render it once,
// at build time, like any other route.
export const dynamic = 'force-static'

/**
 * Generated, not static. `RESERVED_ROUTES` is filtered out explicitly rather
 * than relying on the route simply not existing — so the exclusion survives
 * someone later adding the page.
 *
 * `sources` is what dates the entry: the files whose last commit decides
 * this route's `lastmod`. See `lib/sitemap-lastmod.ts`.
 */
type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  sources: readonly string[]
}

/**
 * Shared chrome — the layout, nav and footer — is deliberately NOT a source
 * for any route.
 *
 * It does render on every page, so including it is defensible on a literal
 * reading. But it makes every chrome edit re-date all seventeen URLs at
 * once, which is the same "everything changed simultaneously" signal that
 * `new Date()` produced, only with a more convincing timestamp. A crawler
 * recrawling /privacy/ because the footer gained a link learns the same
 * wrong lesson either way.
 *
 * `lastmod` answers "did what this page is about change?", and for that the
 * route's own content is the honest source.
 */

const ROUTES: Route[] = [
  {
    path: '/',
    priority: 1,
    changeFrequency: 'weekly',
    sources: ['app/page.tsx', 'components/home', 'components/demo'],
  },
  {
    path: '/decision-layer',
    priority: 0.9,
    changeFrequency: 'monthly',
    sources: ['app/decision-layer/page.tsx', 'content/decision-layer.mdx'],
  },
  {
    path: '/how-it-works',
    priority: 0.8,
    changeFrequency: 'monthly',
    sources: ['app/how-it-works/page.tsx', 'content/how-it-works.mdx'],
  },
  {
    path: '/services',
    priority: 0.8,
    changeFrequency: 'monthly',
    sources: ['app/services/page.tsx', 'content/services.mdx'],
  },
  {
    path: '/why-us',
    priority: 0.8,
    changeFrequency: 'monthly',
    sources: ['app/why-us/page.tsx', 'components/why-us', 'lib/content'],
  },
  {
    path: '/industries',
    priority: 0.7,
    changeFrequency: 'monthly',
    sources: ['app/industries/page.tsx', 'lib/industry-pages.ts'],
  },
  ...INDUSTRIES.map((industry) => ({
    path: `/industries/${industry.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    sources: [
      'app/industries/[slug]/page.tsx',
      `content/industries/${industry.slug}.mdx`,
      `lib/scenarios/${industry.slug}.ts`,
      'lib/industry-pages.ts',
    ],
  })),
  {
    path: '/systems',
    priority: 0.8,
    changeFrequency: 'monthly',
    sources: ['app/systems/page.tsx', 'components/systems/SystemsExplorer.tsx', 'components/home/SystemsShowcase.tsx'],
  },
  {
    path: '/reference-build',
    priority: 0.6,
    changeFrequency: 'yearly',
    sources: ['app/reference-build/page.tsx', 'content/reference-build.mdx'],
  },
  {
    path: '/about',
    priority: 0.6,
    changeFrequency: 'yearly',
    sources: ['app/about/page.tsx', 'components/about', 'lib/content'],
  },
  {
    path: '/contact',
    priority: 0.9,
    changeFrequency: 'yearly',
    sources: ['app/contact/page.tsx', 'components/contact', 'content/contact.mdx'],
  },
  {
    path: '/privacy',
    priority: 0.2,
    changeFrequency: 'yearly',
    sources: ['app/privacy/page.tsx'],
  },
  {
    path: '/terms',
    priority: 0.2,
    changeFrequency: 'yearly',
    sources: ['app/terms/page.tsx'],
  },
]

/**
 * `trailingSlash: true` means every route is served at `<path>/`, and every
 * page's own canonical tag declares that form. A sitemap listing the
 * unslashed variant hands a crawler a URL that redirects (301, via
 * .htaccess) to the URL the page claims as canonical — the sitemap
 * contradicting the canonical it is supposed to corroborate.
 */
function absolute(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.filter((route) => !RESERVED_ROUTES.includes(route.path)).map((route) => ({
    url: absolute(route.path),
    lastModified: lastModifiedFor(route.sources),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
