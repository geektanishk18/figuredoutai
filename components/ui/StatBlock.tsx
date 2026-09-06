import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * One figure with its label.
 *
 * Deliberately narrow in what it will display. The brief's proof policy forbids
 * any figure that could read as a measured client outcome, and a general-purpose
 * stat component is exactly how such a figure arrives later without anyone
 * deciding to add one: a row of big numbers under a hero is the default
 * treatment, and it implies results whether or not the copy claims them.
 *
 * So `source` is required and has two permitted values. Every stat on the site
 * must be either arithmetic from the reader's own slider input, or a fact about
 * the registered entity that a reader can verify independently. There is no
 * third option, and adding one is a decision someone has to make in this file
 * rather than at a call site.
 */

interface StatBlockProps {
  /** The figure. Pre-formatted — this component does no number formatting. */
  value: ReactNode
  /** What the figure counts. Sentence case, no colon. */
  label: ReactNode
  /**
   * Where the number came from. Not decoration — it is the guard.
   *
   * `calculated` — computed live from the reader's own inputs.
   * `registry`   — a verifiable fact about the entity (LLPIN, incorporation).
   */
  source: 'calculated' | 'registry'
  /** Routing state, where the figure represents one. Drives the colour only. */
  tone?: 'neutral' | 'lost' | 'escalated' | 'handled'
  className?: string
}

const TONE: Record<NonNullable<StatBlockProps['tone']>, string> = {
  neutral: 'text-paper',
  lost: 'text-loss',
  escalated: 'text-amber',
  handled: 'text-ok',
}

export function StatBlock({ value, label, source, tone = 'neutral', className }: StatBlockProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p
        // `num` is the tabular-figures utility. A figure that changes as a
        // slider moves must not reflow the layout under it.
        className={cn('num text-h2 font-bold leading-none tracking-tight', TONE[tone])}
        // A calculated figure is announced when it changes; a registry fact
        // never changes, so announcing it would be noise.
        {...(source === 'calculated' ? { 'aria-live': 'polite', 'aria-atomic': true } : {})}
      >
        {value}
      </p>
      <p className="text-micro leading-tight text-muted">{label}</p>
    </div>
  )
}
