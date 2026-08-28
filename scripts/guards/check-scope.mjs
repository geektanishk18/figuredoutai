#!/usr/bin/env node
/**
 * Scope-of-work guard.
 *
 * /services is the commercial contract surface: it defines what is delivered,
 * what is explicitly not, and how billing is gated. These clauses are the ones
 * that stop a client holding us to something we never sold, and they are the
 * first casualty of any word-count target.
 *
 * A line-by-line diff catches a change once. This catches it every time.
 */
import { readFileSync } from 'node:fs'

const RAW = readFileSync('content/services.mdx', 'utf8')

/**
 * MDX hard-wraps prose, so a clause that reads as one sentence is split across
 * lines in the source. Compare against whitespace-normalised text or the guard
 * fails on reflow rather than on an actual removal.
 */
const SERVICES = RAW.replace(/\s+/g, ' ')

/** Verbatim clauses. If one is reworded deliberately, update it here in the same commit. */
const PROTECTED = [
  // Deliverables
  ['Service 01 heading', '## 01 · Qualification Logic Design'],
  ['Service 02 heading', '## 02 · Conversational Decision Layer'],
  ['Service 03 heading', '## 03 · Operating Visibility'],
  ['Rule-set ownership', 'This is yours whether or not we build anything further.'],
  // Boundaries — the clauses that limit what we are on the hook for
  [
    'Never-does boundary',
    'improvise outside your rules, or make a decision it cannot explain',
  ],
  ['Audit is free and kept', 'No cost, no obligation. You keep the map.'],
  ['Not lead generation', 'We are not a lead-generation service. We do not create demand.'],
  // Commercials
  ['Setup + retainer model', 'one-time setup fee, then a phased retainer across build and live operation'],
  ['Infrastructure billing', 'Infrastructure billed at cost plus margin'],
  [
    'Milestone gating',
    'Every phase is milestone-gated — you approve each stage before the next begins, and before it is billed.',
  ],
  // Fit conditions
  ['Volume precondition', 'existing enquiry volume'],
  ['Definable-criteria precondition', 'qualification criteria that can be'],
]

const MIN_WORDS = 650

let failed = 0
for (const [name, clause] of PROTECTED) {
  if (!SERVICES.includes(clause.replace(/\s+/g, ' '))) {
    failed += 1
    console.error(`\n  MISSING scope clause — ${name}\n    expected: "${clause}"`)
  }
}

const words = RAW.split(/\s+/).filter(Boolean).length
if (words < MIN_WORDS) {
  failed += 1
  console.error(`\n  /services shrank to ${words} words (floor ${MIN_WORDS}). It is exempt from content reduction.`)
}

if (failed > 0) {
  console.error(`\n${failed} scope-of-work violation${failed === 1 ? '' : 's'}.\n`)
  process.exit(1)
}
console.log(`Scope of work: ${PROTECTED.length} clauses intact, /services at ${words} words.`)
