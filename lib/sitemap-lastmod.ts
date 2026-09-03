import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'

/**
 * Real `lastmod` dates, derived from the last commit that touched each
 * route's own sources.
 *
 * The previous sitemap stamped `new Date()` on every URL on every build, so
 * a deploy that changed one page claimed all seventeen had changed. A
 * crawler that repeatedly fetches an unchanged page after being told it
 * changed learns to discount the signal, which costs exactly the recrawl
 * responsiveness the sitemap exists to buy.
 *
 * Git is the source rather than filesystem mtime: on a fresh clone or a CI
 * checkout every mtime is the checkout time, which would reintroduce the
 * same "everything changed at once" lie in a less obvious form.
 */

/** Resolved once per build — `git log` is a subprocess, and this runs per route. */
const cache = new Map<string, string | null>()

function lastCommitISO(path: string): string | null {
  const hit = cache.get(path)
  if (hit !== undefined) return hit

  let result: string | null = null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    result = out || null
  } catch {
    // No git history reachable (a tarball deploy, a shallow clone with the
    // path outside its depth). Fall through to mtime rather than failing the
    // build — a slightly wrong date is recoverable, a broken build is not.
    result = null
  }

  if (!result) {
    try {
      result = statSync(path).mtime.toISOString()
    } catch {
      result = null
    }
  }

  cache.set(path, result)
  return result
}

/**
 * The most recent commit across every source that renders a route.
 *
 * A route is rarely one file: `/about/` is its page plus the components and
 * the extracted copy it renders, and a change to any of them changes the
 * page a crawler sees. Taking the newest across the set is what makes the
 * date describe the *page* rather than one arbitrary file behind it.
 *
 * Falls back to the repository's own last commit when nothing resolves, so
 * the field is always present and always a real date.
 */
export function lastModifiedFor(paths: readonly string[]): Date {
  const stamps = paths
    .map(lastCommitISO)
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value))

  if (stamps.length > 0) return new Date(Math.max(...stamps))

  const repo = lastCommitISO('.')
  return repo ? new Date(repo) : new Date()
}
