/**
 * The engagement phases — one source, four phases.
 *
 * The site previously disagreed with itself: the homepage said "Three phases",
 * `/how-it-works` said four (in its H1, `<title>`, meta description and OG
 * image), and `/services` recapped four. Four is correct.
 *
 * Names are verbatim from `content/how-it-works.mdx` and `content/services.mdx`
 * so the three surfaces and `<PhaseRoadmap />` state the same thing word for
 * word. "Intake Audit" keeps its capitals — it is a named deliverable the site
 * refers to as "the Intake Audit" elsewhere; the other three are sentence case
 * because they are descriptions, not product names.
 *
 * `gate` is the approval boundary that closes each phase. Milestone gating is a
 * floor condition `scripts/guards/check-scope.mjs` protects on /services, and it
 * is the most commercially distinctive thing about how these engagements run —
 * so the roadmap draws it rather than drawing four featureless dots.
 */

export interface Phase {
  /** Display number. This content is a genuine sequence, so numbering earns it. */
  n: string
  name: string
  /** One line for a roadmap node. Not the full prose — that lives in the MDX. */
  summary: string
  /** What the client approves before the next phase begins. */
  gate: string
}

export const PHASES: readonly Phase[] = [
  {
    n: '1',
    name: 'Intake Audit',
    summary: 'We map how enquiries reach you and mark where they stop.',
    gate: 'You keep the written intake map, whether or not we go further.',
  },
  {
    n: '2',
    name: 'Logic design',
    summary: 'Your qualification criteria, documented as a rule set you can read.',
    gate: 'Reviewed and signed off by you before anything is built.',
  },
  {
    n: '3',
    name: 'Build and deploy',
    summary: 'Built, integrated, and run alongside your current process first.',
    gate: 'Nothing is switched over on trust.',
  },
  {
    n: '4',
    name: 'Managed operation',
    summary: 'Rules tuned against real outcomes and the overrides your team makes.',
    gate: 'Engagements are built around this phase, not around the build.',
  },
] as const

/** The count, derived. Nothing should ever hardcode "four" beside this list. */
export const PHASE_COUNT = PHASES.length
