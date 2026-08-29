/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const recRoutingRows = [
  { ord: '01', signal: 'Senior or leadership title in the applied role', route: 'Recruiter, direct review', window: 'Under 15 minutes', color: '#E8A33D' },
  { ord: '02', signal: 'Ambiguous seniority, or an unmapped title', route: 'Recruiter queue, flagged', window: 'Under 30 minutes', color: '#E8A33D' },
  { ord: '03', signal: 'A referral, or a repeat applicant', route: 'Recruiter, matched to the prior record', window: 'Under 5 minutes', color: '#E8A33D' },
  { ord: '04', signal: 'Strong profile outside the stated band', route: 'Hiring manager, with the band noted', window: 'Same day', color: '#90C2E7' },
  { ord: '05', signal: 'Notice period outside range, everything else met', route: 'Held, revisited at shortlist', window: 'Under 1 minute', color: '#90C2E7' },
  { ord: '06', signal: 'Every mandatory criterion met', route: 'Screening call offered by the layer', window: 'Under 10 seconds', color: '#4FA87C' },
  { ord: '07', signal: 'Mandatory skill absent', route: 'Declined, with a written reason', window: 'Immediate', color: '#4FA87C' },
] as const
