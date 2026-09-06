import type { RoutingState } from '@/lib/brand'

/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 *
 * `color` was a raw hex per row, which put three palette values outside
 * `lib/brand.ts` and let a routing colour drift from the token it was copied
 * from. Rows now name a routing *state* and resolve the colour through
 * `ROUTING`, so the meaning is in the data and the value stays single-source.
 */
interface RecRoutingRow {
  /** Priority order as displayed. Not a rule identifier. */
  ord: string
  /** What the layer recognised. */
  signal: string
  /** Where it went. */
  route: string
  /** Acknowledgement window. */
  window: string
  /** Resolves to a colour through `ROUTING`. */
  state: RoutingState
}

export const recRoutingRows = [
  { ord: '01', signal: 'Senior or leadership title in the applied role', route: 'Recruiter, direct review', window: 'Under 15 minutes', state: 'escalated' },
  { ord: '02', signal: 'Ambiguous seniority, or an unmapped title', route: 'Recruiter queue, flagged', window: 'Under 30 minutes', state: 'escalated' },
  { ord: '03', signal: 'A referral, or a repeat applicant', route: 'Recruiter, matched to the prior record', window: 'Under 5 minutes', state: 'escalated' },
  { ord: '04', signal: 'Strong profile outside the stated band', route: 'Hiring manager, with the band noted', window: 'Same day', state: 'held' },
  { ord: '05', signal: 'Notice period outside range, everything else met', route: 'Held, revisited at shortlist', window: 'Under 1 minute', state: 'held' },
  { ord: '06', signal: 'Every mandatory criterion met', route: 'Screening call offered by the layer', window: 'Under 10 seconds', state: 'handled' },
  { ord: '07', signal: 'Mandatory skill absent', route: 'Declined, with a written reason', window: 'Immediate', state: 'handled' },
] as const satisfies readonly RecRoutingRow[]
