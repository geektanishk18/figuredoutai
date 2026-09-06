import { DisclosurePanel } from '@/components/ui'
import type { Scenario } from '@/lib/scenarios/types'
import type { IndustryDepth } from '@/lib/content/industry-depth'
import { CTA } from '@/lib/constants'
import { LogIcon, OverrideIcon } from '@/components/icons'

/**
 * The decision architecture, as published.
 *
 * This replaces `<ScenarioBlock>` on the industry pages. The difference is what
 * it withholds: `ScenarioBlock` rendered the whole thing — every rule with its
 * exact condition and action, the routing table with destinations and
 * acknowledgement windows, escalation thresholds, and a timed decision log.
 * That is roughly a thousand words per page of directly copyable specification,
 * and it is the substance of what the paid Intake Audit produces.
 *
 * So the specifics move to the audit deliverable and this renders the shape:
 * how ordering works, what happens when nothing is acknowledged, and what the
 * layer refuses to decide. A prospect can still judge whether the thinking is
 * sound, which is the job the depth was doing; a competitor gets nothing they
 * could implement from.
 *
 * `ScenarioBlock` is untouched and still used nowhere else — it is kept rather
 * than deleted because the scenario data behind it is the source the audit
 * deliverable is built from, and the component documents how that data renders.
 *
 * Two things stay in full and visible, deliberately:
 *
 *   - `summary`, because it states the vertical's actual problem in one place.
 *   - `neverDecides`, because it is the safety argument and a differentiator.
 *     Competitors are not harmed by knowing what this system refuses to do, and
 *     a buyer evaluating a clinical product needs to read it without opening
 *     anything. It is the one part of the old block that should be louder, not
 *     quieter.
 */

interface DecisionArchitectureProps {
  scenario: Scenario
  depth: IndustryDepth
  headingId: string
}

export function DecisionArchitecture({ scenario, depth, headingId }: DecisionArchitectureProps) {
  return (
    <section aria-labelledby={headingId} className="mt-16">
      <h2 id={headingId} className="text-h2 font-semibold text-paper">
        How the decision layer is built here
      </h2>

      <p className="mt-4 max-w-[62ch] text-lede text-body">{scenario.summary}</p>

      {/*
        The depth. Collapsed by default, and present in the server-rendered HTML
        either way — see the note in DisclosurePanel for why that distinction is
        the whole point rather than an implementation detail.
      */}
      <div className="mt-8 border-t border-line">
        {depth.depth.map((panel) => (
          <DisclosurePanel key={panel.summary} summary={panel.summary} meta={panel.meta}>
            {panel.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-0 first:mt-0 [&+p]:mt-4">
                {paragraph}
              </p>
            ))}
          </DisclosurePanel>
        ))}
      </div>

      {/* ── What it never decides ──────────────────────────────── */}
      <div className="mt-12">
        <h3 className="flex items-center gap-2.5 text-h3 font-semibold text-paper">
          <OverrideIcon className="text-sky" />
          What this layer never decides
        </h3>
        <ul className="mt-5 space-y-4">
          {scenario.neverDecides.map((item) => (
            <li key={item.decision} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-1 w-1 flex-none rounded-full bg-loss"
              />
              <span className="text-copy leading-relaxed text-body">
                <strong className="font-semibold text-paper">{item.decision}</strong>
                {' — '}
                {item.why}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Where the full rule set lives ──────────────────────── */}
      <div className="mt-10 rounded-card border border-line bg-panel p-5 sm:p-6">
        <h3 className="flex items-center gap-2.5 text-h4 font-semibold text-paper">
          <LogIcon className="text-sky" />
          The rule set itself
        </h3>
        <p className="mt-3 max-w-[62ch] text-copy leading-relaxed text-body">
          The written rules — every condition, what it routes to, the
          acknowledgement window it carries and what happens when that window passes — are
          what the Intake Audit produces for your clinic specifically. Three working days, no
          cost, and you keep the map whether or not we build anything.
        </p>
        <a
          href={CTA.href}
          className="focus-ring mt-4 inline-flex rounded-frame text-copy font-semibold text-sky underline underline-offset-4 hover:text-peak"
        >
          {CTA.label}
        </a>
      </div>
    </section>
  )
}
