import type { Scenario } from '@/lib/scenarios/types'
import { GlassPanel } from '@/components/ui'
import { Provenance } from './Provenance'

/**
 * Renders one engineered scenario in full: rules, routing, escalation, a worked
 * decision log, and the decisions deliberately left to a human.
 *
 * It always renders the whole architecture. There is no summary variant,
 * because the depth is the proof — an excerpt would be exactly the thin
 * scenario this is designed not to be.
 */

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-sky"
    >
      {children}
    </h3>
  )
}

export function ScenarioBlock({ scenario }: { scenario: Scenario }) {
  const headingId = `scenario-${scenario.slug}`

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <Provenance tier="scenario" />

      <h2 id={headingId} className="mt-5 text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]">
        The decision architecture, in full
      </h2>

      <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-body">
        {scenario.summary}
      </p>

      {/* ── Intake path ─────────────────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-intake`}>Where enquiries arrive</Heading>
        <ul className="mt-4 space-y-2.5">
          {scenario.intakePath.map((channel) => (
            <li key={channel} className="flex gap-3 text-[16px] leading-relaxed text-body">
              <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-sky" />
              {channel}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Rules ───────────────────────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-rules`}>
          Qualification rules · {scenario.rules.length}, in priority order
        </Heading>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted">
          Lower number wins. When two rules match the same enquiry, the lower band takes it and both
          are logged as considered.
        </p>
        <ol className="mt-5 space-y-3">
          {scenario.rules.map((rule) => (
            <li
              key={rule.id}
              className="rounded-card border border-line bg-panel p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-cyan">
                  {rule.id}
                </span>
                <strong className="text-[16px] font-semibold text-paper">{rule.name}</strong>
              </div>
              <dl className="mt-3 space-y-2 text-[15.5px] leading-relaxed">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:w-24 sm:flex-none sm:pt-[0.35em]">
                    When
                  </dt>
                  <dd className="text-body">{rule.condition}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:w-24 sm:flex-none sm:pt-[0.35em]">
                    Then
                  </dt>
                  <dd className="text-body">{rule.action}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Routing table ───────────────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-routing`}>Routing table</Heading>
        <div className="mt-4 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[42rem] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-panel-raised">
                {['Rule', 'Goes to', 'Ack within', 'If not acknowledged'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="whitespace-nowrap border-b border-line px-4 py-3 font-heading text-[10.5px] font-semibold uppercase tracking-[0.13em] text-sky"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenario.routing.map((row) => (
                <tr key={row.rule} className="align-top">
                  <td className="border-b border-line px-4 py-3 font-mono text-[13px] font-semibold text-cyan">
                    {row.rule}
                  </td>
                  <td className="border-b border-line px-4 py-3 text-paper">{row.destination}</td>
                  <td className="whitespace-nowrap border-b border-line px-4 py-3 text-body">
                    {row.acknowledge}
                  </td>
                  <td className="border-b border-line px-4 py-3 text-body">
                    {row.onNoAcknowledgement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Escalation ──────────────────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-escalation`}>Escalation logic</Heading>
        <ul className="mt-4 space-y-3">
          {scenario.escalation.map((path) => (
            <li key={path.trigger} className="rounded-card border border-line bg-panel p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="text-[16px] font-semibold text-paper">{path.trigger}</strong>
                <span className="font-mono text-[12px] text-amber">{path.threshold}</span>
              </div>
              <p className="mt-2 text-[15.5px] leading-relaxed text-body">{path.path}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Decision log walkthrough ────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-log`}>One enquiry, traced end to end</Heading>
        <GlassPanel sweep className="mt-4 border-sky/30">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {scenario.walkthrough.channel}
          </p>
          <p className="mt-2 text-[16.5px] leading-relaxed text-paper">
            {scenario.walkthrough.enquiry}
          </p>
        </GlassPanel>

        <ol className="mt-5 space-y-3">
          {scenario.walkthrough.steps.map((step, i) => (
            <li
              key={`${step.at}-${i}`}
              className="grid grid-cols-[3.6rem_minmax(0,1fr)] gap-x-4 rounded-card border border-line bg-panel p-4 sm:p-5"
            >
              <span className="font-mono text-[12.5px] font-semibold tabular-nums text-amber">
                {step.at}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <strong className="text-[15.5px] font-semibold text-paper">{step.decision}</strong>
                  <span className="font-mono text-[12px] text-cyan">{step.rule}</span>
                </div>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-body">{step.reasoning}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-body">
          {scenario.walkthrough.outcome}
        </p>
      </div>

      {/* ── What it never decides ───────────────────────────────── */}
      <div className="mt-10">
        <Heading id={`${headingId}-never`}>What this layer never decides</Heading>
        <ul className="mt-4 space-y-3">
          {scenario.neverDecides.map((item) => (
            <li key={item.decision} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-loss" />
              <span className="text-[16px] leading-relaxed text-body">
                <strong className="font-semibold text-paper">{item.decision}</strong>
                {' — '}
                {item.why}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
