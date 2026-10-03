import type { IndustrySlug } from '@/lib/constants'

/**
 * "A chatbot answers. A decision layer decides." — as a table.
 *
 * The site's central distinction currently exists only as two cards on the
 * homepage. Cards are fine for a glance, but the relationship being expressed
 * is genuinely tabular: each row is one dimension of handling an enquiry, with
 * the two approaches' values for it. A table says that; two lists side by side
 * leave the reader to pair them up by eye, and leave a machine reading the page
 * to pair them up by guesswork.
 *
 * That matters more than usual here. Structured comparisons are among the most
 * reliably parsed things on a page for an answer engine, and this particular
 * comparison is the one the company most wants quoted correctly.
 *
 * The generic rows below are the homepage's existing approved copy, re-cut into
 * dimension/value triples. Wording is preserved rather than rewritten.
 */

export interface ComparisonRow {
  /** The dimension being compared. Becomes a `<th scope="row">`. */
  dimension: string
  /** What the market's product does. Never described as what we build. */
  chatbot: string
  /** What a decision layer does. */
  layer: string
}

export const GENERIC_COMPARISON: readonly ComparisonRow[] = [
  {
    dimension: 'On arrival',
    chatbot: 'Returns a scripted reply',
    layer: 'Answers first, on your rules',
  },
  {
    dimension: 'Urgency',
    chatbot: 'Cannot rank one enquiry against another',
    layer: 'Scores and prioritises against your criteria',
  },
  {
    dimension: 'Handover',
    chatbot: 'Hands your team a transcript',
    layer: 'Routes to an owner with context attached',
  },
  {
    dimension: 'The decision',
    chatbot: 'Still waits for a human',
    layer: 'Already made, and logged with its reason',
  },
] as const

/**
 * Per-vertical rows.
 *
 * Empty for now: Phase 3 authors each vertical's version alongside the rest of
 * that page's restructure, where the vertical's own intake failure is in view.
 * `comparisonFor` falls back to the generic set, so a vertical without its own
 * rows renders the correct comparison rather than nothing.
 */
export const INDUSTRY_COMPARISON: Partial<Record<IndustrySlug, readonly ComparisonRow[]>> = {}

export function comparisonFor(slug?: IndustrySlug): readonly ComparisonRow[] {
  return (slug && INDUSTRY_COMPARISON[slug]) || GENERIC_COMPARISON
}
