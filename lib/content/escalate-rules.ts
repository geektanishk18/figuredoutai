/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const escalateRules = [
  'Language describing severe or worsening symptoms',
  'A request for a specific doctor who is unavailable that week',
  'Insurance, billing disputes or refund requests',
  'Third message from the same number without resolution',
  'Anything the layer cannot map to a rule with confidence',
] as const
