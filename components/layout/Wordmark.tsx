import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * The FiguredoutAI wordmark.
 *
 * Two files ship, and the choice is not cosmetic — board 1e is explicit:
 * `wordmark-light.png` on ink and panel, `wordmark-dark.png` on any light
 * surface (invoices, light sections, print). Callers pick a `surface`; nothing
 * reaches for the file directly.
 *
 * The asset is 321×48, so every rendered size is that ratio. Board 1e sets nav
 * height at 30px and puts a hard floor at 24 — `height` is therefore a closed
 * set rather than a free number, which keeps the floor enforceable by reading
 * this file instead of auditing every call site.
 *
 * `width`/`height` are always explicit: Next reserves the box at layout time,
 * so the bar does not reflow when the PNG lands.
 */
const ASPECT = 321 / 48

/** Board 1e: 30px desktop nav, 26px mobile nav. Never below 24. */
export const WORDMARK_HEIGHTS = { desktop: 30, mobile: 26 } as const

export type WordmarkHeight = (typeof WORDMARK_HEIGHTS)[keyof typeof WORDMARK_HEIGHTS]

interface WordmarkProps {
  /** Which ground it sits on. Decides the file, per board 1e. */
  surface?: 'dark' | 'light'
  /** Rendered height in px. 30 desktop, 26 mobile. */
  height?: WordmarkHeight
  /** Eager-load the one in the nav; it is above the fold on every route. */
  priority?: boolean
  className?: string
}

export function Wordmark({
  surface = 'dark',
  height = WORDMARK_HEIGHTS.desktop,
  priority = false,
  className,
}: WordmarkProps) {
  return (
    <Image
      src={surface === 'dark' ? '/brand/wordmark-light.png' : '/brand/wordmark-dark.png'}
      alt="FiguredoutAI"
      width={Math.round(height * ASPECT)}
      height={height}
      priority={priority}
      className={cn('block w-auto', className)}
    />
  )
}
