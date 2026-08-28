import { Provenance } from './Provenance'

/**
 * The decision-log walkthrough for the reference build.
 *
 * The page previously described the log without ever showing one, which is the
 * difference between claiming a system is auditable and demonstrating it. This
 * traces a single enquiry through the rule set, including the override — the
 * override is the most useful part, because it is the mechanism by which a
 * written rule and a human's actual judgement are reconciled.
 */

const STEPS = [
  {
    at: '0s',
    decision: 'Enquiry captured from the listing page with project context attached',
    rule: 'Source carry-through',
    reasoning:
      'The listing the buyer was reading travels into the conversation. Discarding it at the form is what forces the first question to be one the buyer has already answered.',
  },
  {
    at: '9s',
    decision: 'Intent classified as end-user',
    rule: 'Intent',
    reasoning:
      'The buyer described who would live in the flat. Investor language — yield, resale horizon — was absent, so the investor routing branch was not taken.',
  },
  {
    at: '24s',
    decision: 'Budget checked against regional inventory, not the price list',
    rule: 'Budget band',
    reasoning:
      'The stated band cleared the floor for the configuration in that region. The same figure would have failed in a different region, which is why the check is regional rather than global.',
  },
  {
    at: '38s',
    decision: 'Timeline recorded as possession within six months',
    rule: 'Timeline',
    reasoning: 'Timeline and budget together decide which inventory is genuinely offerable, so neither is scored alone.',
  },
  {
    at: '51s',
    decision: 'Routed to the regional team owning that inventory',
    rule: 'Region and project',
    reasoning:
      'Routing follows inventory ownership rather than round-robin. An enquiry sent to a team that cannot sell the unit produces a hand-off the buyer experiences as being passed around.',
  },
  {
    at: '1m 12s',
    decision: 'Site visit offered and booked inside the conversation',
    rule: 'Timeline',
    reasoning: 'Booked in-conversation rather than after a callback, which is the step where most enquiries in this market go quiet.',
  },
  {
    at: '3h 40m',
    decision: 'Human override — reassigned to the adjacent regional team',
    rule: 'Override',
    reasoning:
      'The buyer worked near the second region and the rule had matched on home address. The override was recorded against the address rule, not silently applied — and that rule was later amended to weigh workplace proximity.',
  },
] as const

export function ReferenceLog() {
  return (
    <section aria-labelledby="reference-log" className="mt-16">
      <Provenance tier="reference" />

      <h2 id="reference-log" className="mt-5 text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]">
        One enquiry, through the log
      </h2>

      <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-body">
        A decision log is easy to claim and harder to show. This is a single enquiry through the
        reference build, including the point where a person disagreed with the layer and what
        happened to the rule afterwards.
      </p>

      <ol className="mt-6 space-y-3">
        {STEPS.map((step) => (
          <li
            key={step.at}
            className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-x-4 rounded-card border border-line bg-panel p-4 sm:p-5"
          >
            <span className="font-mono text-[12.5px] font-semibold tabular-nums text-amber">
              {step.at}
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="text-[15.5px] font-semibold text-paper">{step.decision}</strong>
                <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-cyan">
                  {step.rule}
                </span>
              </div>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-body">{step.reasoning}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 max-w-[62ch] text-[16.5px] leading-relaxed text-body">
        The override on the last line is the most valuable entry in the log. It is the moment the
        written rule and the operator&rsquo;s real judgement diverged, recorded against the rule that
        caused it. Override patterns are what make a rule set improvable rather than merely deployed
        &mdash; and they are the reason the admin panel was built around the log rather than around a
        message inbox.
      </p>
    </section>
  )
}
