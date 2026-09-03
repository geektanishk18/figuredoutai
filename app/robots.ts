import type { MetadataRoute } from 'next'
import { RESERVED_ROUTES, SITE_URL } from '@/lib/constants'

// Required for `output: 'export'` — a static export has no server to
// generate this on request, so Next needs to know it can render it once,
// at build time, like any other route.
export const dynamic = 'force-static'

/**
 * Search and AI crawlers, named explicitly.
 *
 * Under the robots.txt spec a bot with no group of its own falls back to
 * `*`, so naming these changes nothing about what is currently permitted —
 * every one of them was already allowed. The value is that it stops being
 * accidental. A future `Disallow` added to the `*` group would silently
 * withdraw access from every AI answer engine at once; with each agent in
 * its own group, that edit has to be made deliberately, per bot.
 *
 * Kept separate from the `*` group for a second reason: `*` carries the two
 * real exclusions below, and neither of them should apply differently to a
 * search crawler than to an AI one. They are repeated per group rather than
 * inherited, because groups do not inherit — a named group replaces `*`
 * entirely for that agent, it does not merge with it. Omitting the
 * exclusions here would have quietly exposed the reserved route to exactly
 * the crawlers this file is meant to be explicit about.
 */
const CRAWLERS = [
  // Search
  'Googlebot',
  'Bingbot',
  'Applebot',
  // AI answer engines and their grounding crawlers
  'Google-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Applebot-Extended',
  'CCBot',
]

/**
 * `/api/` no longer exists — the Route Handler was removed when the site
 * became a static export — but the entry is kept because the path is a
 * plausible future addition and an exclusion costs nothing. The reserved
 * route is disallowed as well as being absent from the sitemap.
 */
const DISALLOW = ['/api/', ...RESERVED_ROUTES]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
