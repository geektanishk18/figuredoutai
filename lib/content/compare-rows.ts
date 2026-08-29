/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const compareRows = [
  { label: 'Response time', before: 'Hours, or the next working day', after: 'Immediate, at any hour, every day' },
  { label: 'Consistency', before: 'Depends entirely on who picked it up', after: 'The same standard on every single enquiry' },
  { label: 'Owner\'s attention', before: 'Spread thin across every enquiry', after: 'Spent only on the ones that qualify' },
  { label: 'Ceiling on volume', before: 'However many people you can afford to hire', after: 'No meaningful ceiling' },
  { label: 'Record of what happened', before: 'Memory and a long chat scroll', after: 'Structured, reviewable, and useful later' },
  { label: 'Cost of growth', before: 'Rises in step with demand', after: 'Largely flat as demand rises' },
] as const
