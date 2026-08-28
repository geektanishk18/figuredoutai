import type { MetadataRoute } from 'next'
import { RESERVED_ROUTES, SITE_URL } from '@/lib/constants'

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
