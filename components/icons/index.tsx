import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The icon set, drawn for this subject.
 *
 * `lucide-react` is already a dependency and stays for interface chrome — the
 * menu button, chevrons, the close X, the social marks in the footer. Those
 * should look conventional, because a hamburger that is trying to be original
 * is a hamburger nobody recognises.
 *
 * These are different. They are the vocabulary of the thing the company sells,
 * and picking them out of a general-purpose pack is how a site ends up looking
 * like every other site that picked from the same pack. A "decline" icon from a
 * generic set is an X in a circle; here it is a path that runs into a stop,
 * because the argument the whole site makes is about what happens to an enquiry
 * as it travels.
 *
 * One geometric logic holds them together:
 *
 *   - A 24x24 grid, and every terminal sits on a 4px division of it.
 *   - One stroke weight (1.5), round caps and joins, no fills.
 *   - Every mark is a PATH with NODES on it. An enquiry arrives along a line;
 *     the line then converges, branches, is held, is escalated, or stops. The
 *     only filled element permitted is the 1.6px dot that marks a decision
 *     point, so "a decision happened here" reads identically everywhere.
 *   - Nothing is enclosed in a circle or a rounded square. Containers would
 *     turn a path grammar into a badge set.
 *
 * Sizing is in `em`, not px, so an icon set beside text tracks the type scale
 * from Phase 1 rather than needing a size prop at every call site.
 */

interface IconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'children'> {
  /**
   * Accessible name. Omit for decorative use — the icon is then `aria-hidden`
   * and contributes nothing to the accessibility tree, which is correct when
   * adjacent text already says what it means.
   */
  title?: string
  className?: string
}

function Icon({ title, className, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      // A decorative icon must be hidden from assistive tech, not given an
      // empty label — an unlabelled <svg> with role="img" is announced as an
      // unnamed image by several screen readers.
      {...(title ? { role: 'img' } : { 'aria-hidden': true, focusable: false })}
      className={cn('inline-block flex-none align-[-0.125em]', className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/** The decision point. Filled, because it is the one thing that is not a path. */
function Node({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={1.6} fill="currentColor" stroke="none" />
}

/**
 * Intake — several channels converging on one entry point.
 * Three lines in, one node. The asymmetry is deliberate: enquiries do not
 * arrive evenly spaced, and a perfectly symmetric fan reads as a wifi glyph.
 */
export function IntakeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 5h5.5M3 12h4M3 19h5.5" />
      <path d="M8.5 5c4 0 5 7 8.5 7M7 12h10M8.5 19c4 0 5-7 8.5-7" />
      <Node cx={17} cy={12} />
    </Icon>
  )
}

/**
 * Qualification — a path meeting a gate that tests it.
 * The gate is a diamond because a diamond is the one shape in flow notation
 * that already means "a question is asked here", and borrowing an established
 * convention is different from borrowing a style.
 */
export function QualifyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h4.5" />
      <path d="M11 7.5 15.5 12 11 16.5 6.5 12 11 7.5Z" />
      <path d="M15.5 12H22" />
    </Icon>
  )
}

/**
 * Routing — one path forking into three outcomes.
 * The three-way fan is the shape the whole site argues for: pursue, nurture,
 * decline. It is drawn once here and repeated at every scale in `IntakeFlow`.
 */
export function RouteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h6" />
      <Node cx={8} cy={12} />
      <path d="M8 12c5 0 5-7 9.5-7M8 12h9.5M8 12c5 0 5 7 9.5 7" />
      <path d="M20 5h2M20 12h2M20 19h2" />
    </Icon>
  )
}

/**
 * Escalation — the path steps up and hands off.
 * Rising steps rather than an upward arrow: escalation here is a transfer to a
 * person at a defined threshold, not an increase in magnitude.
 */
export function EscalateIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 19h5v-5h5V9h5V4h5" />
      <Node cx={7} cy={14} />
      <Node cx={12} cy={9} />
      <Node cx={17} cy={4} />
    </Icon>
  )
}

/**
 * Decline — the path runs into a stop and ends.
 * A terminal bar, not a cross. A declined enquiry was handled and closed with a
 * reason; a cross would say it was rejected or that something failed.
 */
export function DeclineIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h13" />
      <Node cx={15} cy={12} />
      <path d="M19 5.5v13" />
    </Icon>
  )
}

/**
 * Timing — the acknowledgement window.
 * An open arc rather than a closed clock face: what matters is the elapsed
 * segment before a threshold, not the time of day.
 */
export function TimingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4a8 8 0 1 1-7.6 5.5" />
      <path d="M4.2 4.4v5.2h5.2" />
      <path d="M12 8v4.4l3 1.8" />
    </Icon>
  )
}

/**
 * Held — the path is parked, then resumes.
 * A gap in an otherwise continuous line. Nothing was decided; it was deferred,
 * which is a third state and needs to not look like either of the other two.
 */
export function HeldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5.5" />
      <Node cx={7.5} cy={12} />
      <path d="M10.5 8.5v7M13.5 8.5v7" />
      <Node cx={16.5} cy={12} />
      <path d="M16.5 12H22" />
    </Icon>
  )
}

/**
 * Override — a human diverts the path around the decision.
 * The dashed segment is the route the layer would have taken; the solid curve
 * is what a person did instead. Override tracking is the most valuable signal
 * the system produces, so it gets its own mark rather than a generic pencil.
 */
export function OverrideIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 15h4" />
      <Node cx={6} cy={15} />
      <path d="M6 15h12" strokeDasharray="2 2.5" opacity={0.55} />
      <path d="M6 15c3.5 0 3-9 6.5-9S18 11 18 15" />
      <path d="M18 15h4" />
    </Icon>
  )
}

/**
 * Decision log — stacked entries, each with the decision point that produced it.
 * Rows of differing length, because a log is a record of unlike events; equal
 * rows would read as a list or a menu.
 */
export function LogIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Node cx={4} cy={6} />
      <Node cx={4} cy={12} />
      <Node cx={4} cy={18} />
      <path d="M8 6h13M8 12h9M8 18h11" />
    </Icon>
  )
}

export type IconComponent = typeof IntakeIcon
