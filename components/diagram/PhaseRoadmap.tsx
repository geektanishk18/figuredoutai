import { PHASES } from '@/lib/content/phases'
import { cn } from '@/lib/utils'

/**
 * The engagement phases as a timeline.
 *
 * Numbered markers are used here, and only here. General design guidance treats
 * 01/02/03 as template chrome, which is right in most places on this site — but
 * the caveat is that numbering is legitimate when the content genuinely is a
 * sequence, and an engagement that runs Intake Audit -> Logic design -> Build
 * and deploy -> Managed operation is exactly that. The numbers carry order,
 * which is information the reader needs.
 *
 * What the roadmap draws, and why it is not four dots on a line: each node
 * carries its approval gate. Milestone-gated payment is a floor condition of
 * the commercial model, and it is the most genuinely distinctive thing about
 * how these engagements run. A timeline that omitted it would be decoration;
 * one that shows it is the argument.
 *
 * All text is real HTML text, not `<text>` inside an SVG. Text in SVG is less
 * reliably extracted by crawlers and answer engines, and this component sits on
 * a page whose job is to be quoted. The connector is drawn with a CSS rule
 * rather than an SVG path for the same reason it is not a library: a 1px line
 * between four boxes does not need a coordinate system, and CSS reflows it
 * between the horizontal and vertical arrangements for free.
 */

export function PhaseRoadmap({ className }: { className?: string }) {
  return (
    <ol
      className={cn(
        'relative grid gap-8 md:grid-cols-4 md:gap-5',
        // The spine. Vertical on mobile, horizontal from md up — inset so it
        // starts and ends at the first and last marker rather than running off
        // past them, which is what makes it read as a span rather than a rule.
        'before:absolute before:bg-line before:content-[""]',
        'before:left-[0.9375rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px',
        'md:before:left-0 md:before:top-[0.9375rem] md:before:h-px md:before:w-full',
        className,
      )}
    >
      {PHASES.map((phase) => (
        <li key={phase.n} className="relative flex gap-4 md:flex-col md:gap-0">
          {/*
            The marker sits above the spine and paints an opaque ground, so the
            line passes behind it rather than through it.
          */}
          <span
            aria-hidden="true"
            className={cn(
              'relative z-10 flex h-[1.875rem] w-[1.875rem] flex-none items-center justify-center',
              'rounded-full border border-sky/35 bg-panel',
              'num text-micro font-semibold text-sky',
            )}
          >
            {phase.n}
          </span>

          <div className="md:mt-5">
            {/*
              The number is decorative in the marker (aria-hidden) and carried
              in the heading text instead, so a screen reader announces "Phase 1,
              Intake Audit" once rather than reading a bare numeral first.
            */}
            <h3 className="text-h4 font-semibold text-paper">
              <span className="sr-only">{`Phase ${phase.n} — `}</span>
              {phase.name}
            </h3>
            <p className="mt-2 text-small text-body">{phase.summary}</p>

            {/*
              The gate. Marked with a rule and a lighter weight so it reads as a
              boundary on the phase rather than another line of description.
            */}
            <p className="mt-3 border-t border-line pt-3 text-micro leading-relaxed text-muted">
              {phase.gate}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
