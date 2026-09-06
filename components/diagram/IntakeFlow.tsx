import { DeclineIcon, EscalateIcon, HeldIcon, QualifyIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * The core diagram: an enquiry arrives, qualification is applied, it is sorted
 * three ways, and each outcome is routed.
 *
 * WHY THIS IS NOT ONE INLINE SVG.
 *
 * The plan called for hand-authored inline SVG, and the reasons behind that —
 * no charting library, no runtime cost, drawn for this subject rather than
 * picked from a pack — all hold and are met here. What does not survive contact
 * with the requirements is putting the *text* inside the SVG:
 *
 *   - An SVG cannot reflow. At 375px a horizontal four-stage diagram either
 *     scales its `<text>` down to about 7px or scrolls sideways. The brief
 *     requires it to be legible at mobile width.
 *   - `<text>` inside SVG is extracted far less reliably by crawlers and answer
 *     engines than HTML text. This diagram carries the vertical's channel list
 *     and its three outcomes — content those pages need read, not skipped.
 *
 * So the nodes and every word are HTML, which reflows from a row into a column
 * at a breakpoint and is fully indexable, and the inline SVG is confined to the
 * one thing CSS draws badly: the curved three-way fan. That layer is decorative
 * and `aria-hidden`; it is hidden entirely at mobile width, where the vertical
 * stack reads as a sequence without needing connectors.
 *
 * The `<figcaption>` states the flow in prose. It is visible rather than
 * sr-only — a reader on any device gets the same sentence the diagram draws,
 * and it is the retrievable form of the diagram for anything that does not
 * render it.
 */

export interface IntakeOutcome {
  /** pursue / nurture / decline, in the site's routing vocabulary. */
  state: 'escalated' | 'held' | 'lost'
  label: string
  /** Where it goes. Deliberately no thresholds, no SLAs, no rule identifiers. */
  destination: string
}

interface IntakeFlowProps {
  /** Channels this vertical's enquiries arrive through. Three or four reads best. */
  channels: readonly string[]
  /** What the layer tests for here, in three or four words. */
  criteria: string
  outcomes: readonly [IntakeOutcome, IntakeOutcome, IntakeOutcome]
  /** Prose statement of the flow. Becomes the visible caption. */
  caption: string
  className?: string
}

const OUTCOME_STYLE = {
  escalated: { icon: EscalateIcon, ring: 'border-amber/40', text: 'text-amber' },
  held: { icon: HeldIcon, ring: 'border-sky/40', text: 'text-sky' },
  lost: { icon: DeclineIcon, ring: 'border-loss/40', text: 'text-loss' },
} as const

function Stage({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex-1">
      <p className="mb-3 text-micro font-medium uppercase text-muted">{label}</p>
      {children}
    </div>
  )
}

export function IntakeFlow({ channels, criteria, outcomes, caption, className }: IntakeFlowProps) {
  return (
    <figure className={cn('m-0', className)}>
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
        <Stage label="Arrives">
          <ul className="space-y-2">
            {channels.map((channel) => (
              <li
                key={channel}
                className="rounded-frame border border-line bg-panel px-3.5 py-2.5 text-small text-body"
              >
                {channel}
              </li>
            ))}
          </ul>
        </Stage>

        {/*
          The fan. Decorative: every relationship it draws is stated by the
          stage order, the caption and the outcome list. Hidden below md, where
          the layout is a vertical stack and a horizontal fan would be wrong.
        */}
        <svg
          viewBox="0 0 60 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="hidden h-[9.5rem] w-10 flex-none text-line md:block"
        >
          <path
            d="M0 60h22M38 60h6M44 60c8 0 8-46 16-46M44 60h16M44 60c8 0 8 46 16 46"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={30} cy={60} r={4} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
        </svg>

        <Stage label="Qualified on">
          <div className="rounded-frame border border-sky/35 bg-panel px-3.5 py-3">
            <QualifyIcon className="text-h4 text-sky" />
            <p className="mt-2 text-small text-body">{criteria}</p>
          </div>
        </Stage>

        <Stage label="Sorted and routed">
          <ul className="space-y-2">
            {outcomes.map((outcome) => {
              const style = OUTCOME_STYLE[outcome.state]
              const OutcomeIcon = style.icon
              return (
                <li
                  key={outcome.label}
                  className={cn(
                    'flex items-start gap-2.5 rounded-frame border bg-panel px-3.5 py-2.5',
                    style.ring,
                  )}
                >
                  <OutcomeIcon className={cn('mt-[0.15em] text-h4', style.text)} />
                  <span className="text-small">
                    <span className={cn('font-semibold', style.text)}>{outcome.label}</span>
                    <span className="text-muted"> — {outcome.destination}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </Stage>
      </div>

      <figcaption className="mt-5 border-t border-line pt-4 text-small text-muted">
        {caption}
      </figcaption>
    </figure>
  )
}
