/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const recConflictRules = [
  { n: '01', text: 'Escalation always outranks automation.' },
  { n: '02', text: 'A seniority signal outranks a keyword match.' },
  { n: '03', text: 'A referral or prior application outranks a cold profile.' },
  { n: '04', text: 'When confidence is low, the layer escalates rather than guesses.' },
] as const
