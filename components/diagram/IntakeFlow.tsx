import { DeclineIcon, EscalateIcon, HeldIcon, QualifyIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * The core diagram: an enquiry arrives, qualification is applied, it is sorted
 * three ways, and each outcome is routed.
 *
 * WHY THE TEXT IS NOT INSIDE THE SVG.
 *
 * The plan called for hand-authored inline SVG, and the reasons behind that —
 * no charting library, no runtime cost, drawn for this subject rather than
 * picked from a pack — all hold and are met here. What does not survive contact
 * with the requirements is putting the *text* inside it:
 *
 *   - An SVG cannot reflow. At 375px a horizontal three-stage diagram either
 *     scales its `<text>` down to about 7px or scrolls sideways, and the brief
 *     requires it to be legible at mobile width.
 *   - `<text>` inside SVG is extracted far less reliably by crawlers and answer
 *     engines than HTML text. This diagram carries the vertical's channel list
 *     and its three outcomes — content those pages need read, not skipped.
 *
 * So the stages are HTML, and the inline SVG is confined to the connectors.
 *
 * LAYOUT. A three-column grid with explicit connector tracks between the
 * stages, rather than a flex row with a connector dropped in beside one stage.
 * The first version put its only connector between stages one and two, which is
 * the gap where nothing branches — the fan belongs after qualification, because
 * the fork *is* the argument the page makes. Grid tracks make the two gaps
 * addressable, so each gets the connector that describes it: a converge into
 * qualification, a three-way fan out of it.
 *
 * Both connectors stretch to the row height, so `preserveAspectRatio="none"` is
 * correct — the paths are horizontal runs with vertical offsets, which survive
 * non-uniform scaling — and `vectorEffect="non-scaling-stroke"` keeps the
 * stroke a constant 1.25px however far the box is stretched.
 *
 * Both are `aria-hidden`: everything they express is stated by the stage order,
 * the outcome list and the caption. They are hidden below `md`, where the
 * layout is a vertical stack and a horizontal fan would be describing a
 * relationship the layout no longer has.
 */

export interface IntakeOutcome {
  /** escalated / held / lost, in the site's routing vocabulary. */
  state: 'escalated' | 'held' | 'lost'
  label: string
  /** Where it goes. Deliberately no thresholds, no SLAs, no rule identifiers. */
  destination: string
}

interface IntakeFlowProps {
  /** Channels this vertical's enquiries arrive through. Three or four reads best. */
  channels: readonly string[]
  /** What the layer tests for here, in a phrase. */
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

/** Shared connector chrome. Decorative, stretched, constant stroke. */
function Connector({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="hidden h-full w-full self-stretch text-line md:block"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      vectorEffect="non-scaling-stroke"
    >
      {children}
    </svg>
  )
}

export function IntakeFlow({ channels, criteria, outcomes, caption, className }: IntakeFlowProps) {
  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn(
          'grid gap-6',
          // Three stages with a narrow connector track between each pair. The
          // tracks collapse to nothing below md, where the stages stack.
          'md:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr] md:items-stretch md:gap-0 md:gap-x-3',
        )}
      >
        {/* ── Stage 1 ─────────────────────────────────────────── */}
        <div className="flex flex-col">
          <p className="mb-3 text-micro font-medium uppercase text-muted">Arrives</p>
          <ul className="flex flex-1 flex-col gap-2">
            {channels.map((channel) => (
              <li
                key={channel}
                className="flex flex-1 items-center rounded-frame border border-line bg-panel px-3.5 py-2.5 text-small text-body"
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>

        {/* Converge: several channels into one qualification step. */}
        <Connector>
          <path d="M0 40h18M0 113h18M0 187h18M0 260h18" opacity={0.5} />
          <path d="M18 40c8 0 6 110 22 110M18 113c8 0 10 37 22 37M18 187c8 0 10-37 22-37M18 260c8 0 6-110 22-110" />
        </Connector>

        {/* ── Stage 2 ─────────────────────────────────────────── */}
        <div className="flex flex-col">
          <p className="mb-3 text-micro font-medium uppercase text-muted">Qualified on</p>
          {/*
            The box hugs its content and centres in the track rather than
            stretching to the height of the channel column. Stretching left a
            tall panel with a short sentence adrift in it — the emphasis this
            stage needs comes from the sky border and its position between the
            two connectors, not from occupying the most area.
          */}
          <div className="flex flex-1 items-center">
            <div className="w-full rounded-frame border border-sky/35 bg-panel px-4 py-4">
              <QualifyIcon className="text-h3 text-sky" />
              <p className="mt-3 text-small leading-relaxed text-body">{criteria}</p>
            </div>
          </div>
        </div>

        {/* The fork. This is the gap where the argument happens. */}
        <Connector>
          <path d="M0 150h14" />
          <circle cx={18} cy={150} r={4} vectorEffect="non-scaling-stroke" />
          <path d="M22 150c10 0 8-100 18-100M22 150h18M22 150c10 0 8 100 18 100" />
        </Connector>

        {/* ── Stage 3 ─────────────────────────────────────────── */}
        <div className="flex flex-col">
          <p className="mb-3 text-micro font-medium uppercase text-muted">Sorted and routed</p>
          <ul className="flex flex-1 flex-col gap-2">
            {outcomes.map((outcome) => {
              const style = OUTCOME_STYLE[outcome.state]
              const OutcomeIcon = style.icon
              return (
                <li
                  key={outcome.label}
                  className={cn(
                    'flex flex-1 items-start gap-2.5 rounded-frame border bg-panel px-3.5 py-2.5',
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
        </div>
      </div>

      <figcaption className="mt-6 border-t border-line pt-4 text-small text-muted">
        {caption}
      </figcaption>
    </figure>
  )
}
