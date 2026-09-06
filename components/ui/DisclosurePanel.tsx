import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The progressive-disclosure primitive.
 *
 * THE RULE THIS COMPONENT EXISTS TO ENFORCE: the content is always in the
 * server-rendered HTML and is hidden by CSS. It is never conditionally
 * rendered, and it is never injected on click.
 *
 * That distinction is the whole point. Content a crawler can read in the
 * response body is indexed whether or not a panel is collapsed; content that a
 * click handler inserts into the DOM afterwards is invisible to most crawlers
 * and to nearly every AI answer engine. The industry pages are about to move
 * roughly a thousand words each behind these panels, so getting this wrong
 * would quietly delete the thing those pages rank for.
 *
 * Native `<details>`/`<summary>` is used rather than an ARIA disclosure built
 * from a button and a div, for three reasons:
 *
 *   1. There is no React state, so there is no code path that can render the
 *      content conditionally. The rule is enforced by construction rather than
 *      by a comment asking the next person not to break it.
 *   2. It is a server component. Zero JavaScript ships for it.
 *   3. The keyboard behaviour, focus handling and screen-reader semantics are
 *      the browser's, which is more reliable than a hand-rolled equivalent and
 *      cannot drift.
 *
 * `open` on `<details>` is an initial-state attribute the browser then owns;
 * it is not React state, so passing `defaultOpen` does not make this stateful.
 */

interface DisclosurePanelProps {
  /** The always-visible summary line. Written as a claim, not a label. */
  summary: ReactNode
  /**
   * Optional short line beside the summary — a count, a duration. Visible when
   * collapsed, so the reader can judge whether opening it is worth it.
   */
  meta?: ReactNode
  /** Rendered into the HTML whether the panel is open or not. */
  children: ReactNode
  /** Initial state only. The browser owns it from first paint onward. */
  defaultOpen?: boolean
  /**
   * Shared name turns a group of panels into an exclusive accordion — opening
   * one closes its siblings, handled entirely by the browser. Omit for panels
   * that should open independently.
   */
  name?: string
  className?: string
}

export function DisclosurePanel({
  summary,
  meta,
  children,
  defaultOpen = false,
  name,
  className,
}: DisclosurePanelProps) {
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn(
        'group border-b border-line last:border-b-0',
        // `[&::details-content]` styles the UA-generated content slot so the
        // panel can animate open where supported. Where it is not supported the
        // panel simply opens instantly — the content is present either way,
        // which is the only property that must not depend on browser support.
        '[&::details-content]:overflow-hidden',
        className,
      )}
    >
      <summary
        className={cn(
          'focus-ring flex cursor-pointer list-none items-start gap-3 rounded-frame py-4',
          // Safari draws its own disclosure triangle through a non-standard
          // pseudo-element that `list-style: none` alone does not remove.
          '[&::-webkit-details-marker]:hidden',
          'text-h4 font-semibold text-paper hover:text-sky',
        )}
      >
        {/*
          The marker is a chevron rotated by transform. It is the only thing
          that moves, transform is compositor-only, and the global
          reduced-motion backstop in globals.css stops it for anyone who has
          asked for less movement.
        */}
        <svg
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="mt-[0.3em] flex-none text-sky [transition:transform_180ms_ease] group-open:rotate-90"
        >
          <path d="m9 5 7 7-7 7" />
        </svg>

        <span className="flex-1">{summary}</span>

        {meta ? (
          <span className="mt-[0.3em] flex-none text-micro font-medium uppercase text-muted">
            {meta}
          </span>
        ) : null}
      </summary>

      {/*
        Present in the HTML at all times. Do not wrap this in a condition, and
        do not move it behind a state check — see the note at the top of the
        file for why that would be a silent regression rather than a visible
        bug.
      */}
      <div className="pb-6 pl-[calc(1em+0.75rem)] pr-1 text-copy text-body">{children}</div>
    </details>
  )
}
