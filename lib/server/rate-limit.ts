import 'server-only'

/**
 * Fixed-window rate limit, held in memory.
 *
 * The stack has no database by design, so this is per-instance: a serverless
 * deployment enforces it per warm instance rather than globally. That is enough
 * to stop a single client hammering the form, which is what it is for. If this
 * ever needs to be authoritative, it needs shared storage — not a bigger Map.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

interface Window {
  count: number
  resetAt: number
}

const windows = new Map<string, Window>()

/** Drops expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export function rateLimit(key: string, now: number = Date.now()): RateLimitResult {
  if (windows.size > 500) sweep(now)

  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterSeconds: 0 }
  }

  existing.count += 1
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  if (existing.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfterSeconds }
  }

  return { allowed: true, remaining: MAX_REQUESTS - existing.count, retryAfterSeconds }
}

/** Test seam — lets a verification run start from a clean window. */
export function resetRateLimit() {
  windows.clear()
}
