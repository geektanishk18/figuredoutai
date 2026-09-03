import type { MetadataRoute } from 'next'
import { RESERVED_ROUTES, SITE_URL } from '@/lib/constants'

// Required for `output: 'export'` — a static export has no server to
// generate this on request, so Next needs to know it can render it once,
// at build time, like any other route.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The reserved route is disallowed as well as absent from the sitemap.
      disallow: ['/api/', ...RESERVED_ROUTES],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
