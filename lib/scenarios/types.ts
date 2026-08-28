/**
 * An engineered scenario is a decision architecture we designed for a sector,
 * published as a modelled architecture and labelled as one.
 *
 * The depth is the point. A prospect cannot verify a testimonial, but they can
 * evaluate whether a routing table resolves rule conflicts sensibly and whether
 * escalation thresholds are thought through. A thin scenario is worse than none,
 * so the shape below makes thinness a type error rather than an editorial
 * judgement — see `assertScenarioDepth`.
 */

/** Ordered by the priority band a rule occupies when two rules match at once. */
export interface QualificationRule {
  /** Stable identifier used by the routing table and the decision log. */
  id: string
  name: string
  /** The condition as it would be written for the people who apply it today. */
  condition: string
  /** What the layer does when the condition holds. */
  action: string
  /**
   * Lower wins. Conflicts are resolved by band, then by declaration order, so
   * two rules can never both claim an enquiry without a defined winner.
   */
  priority: number
}

export interface RoutingRow {
  /** Which rule, by id, sends this enquiry. */
  rule: string
  destination: string
  /** Time the destination has to acknowledge before the escalation path runs. */
  acknowledge: string
  onNoAcknowledgement: string
}

export interface EscalationPath {
  trigger: string
  threshold: string
  path: string
}

export interface DecisionLogStep {
  /** Elapsed time from arrival. */
  at: string
  decision: string
  /** The rule id responsible, or `—` where no rule applied. */
  rule: string
  reasoning: string
}

export interface Walkthrough {
  /** The enquiry as it actually arrived, verbatim in the channel's own voice. */
  enquiry: string
  channel: string
  steps: DecisionLogStep[]
  outcome: string
}

export interface Scenario {
  sector: string
  /** Matches the industry slug so a page can look up its own scenario. */
  slug: string
  summary: string
  intakePath: string[]
  rules: QualificationRule[]
  routing: RoutingRow[]
  escalation: EscalationPath[]
  walkthrough: Walkthrough
  /** Decisions deliberately left with a human, and why. */
  neverDecides: { decision: string; why: string }[]
}

/** Minimum depth. A scenario below this does not get published. */
export const MIN_RULES = 8

/**
 * Runs at module load, so an under-specified scenario fails the build rather
 * than shipping as a thin page nobody catches.
 */
export function assertScenarioDepth(scenario: Scenario): Scenario {
  const problems: string[] = []

  if (scenario.rules.length < MIN_RULES) {
    problems.push(`only ${scenario.rules.length} rules, minimum is ${MIN_RULES}`)
  }
  if (scenario.routing.length === 0) problems.push('no routing table')
  if (scenario.escalation.length === 0) problems.push('no escalation logic')
  if (scenario.walkthrough.steps.length < 4) {
    problems.push(`decision-log walkthrough has ${scenario.walkthrough.steps.length} steps, minimum is 4`)
  }
  if (scenario.neverDecides.length === 0) problems.push('does not state what it never decides')

  const ruleIds = new Set(scenario.rules.map((r) => r.id))
  for (const row of scenario.routing) {
    if (!ruleIds.has(row.rule)) problems.push(`routing row references unknown rule ${row.rule}`)
  }
  for (const step of scenario.walkthrough.steps) {
    if (step.rule !== '—' && !ruleIds.has(step.rule)) {
      problems.push(`decision log references unknown rule ${step.rule}`)
    }
  }

  if (problems.length > 0) {
    throw new Error(`Scenario "${scenario.slug}" is under-specified: ${problems.join('; ')}`)
  }
  return scenario
}
