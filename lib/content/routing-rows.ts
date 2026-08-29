/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const routingRows = [
  { ord: '01', signal: 'Symptom language flagged as urgent', route: 'Front desk, phone callback', window: 'Under 5 minutes', color: '#E8A33D' },
  { ord: '02', signal: 'Unmapped intent, low confidence', route: 'Front desk queue, flagged', window: 'Under 15 minutes', color: '#E8A33D' },
  { ord: '03', signal: 'Slot requested and available', route: 'Booked by the layer', window: 'Under 10 seconds', color: '#4FA87C' },
  { ord: '04', signal: 'Doctor requested, no slot this week', route: 'Waitlist plus alternative offered', window: 'Under 1 minute', color: '#90C2E7' },
  { ord: '05', signal: 'Reschedule more than four hours ahead', route: 'Moved by the layer, both parties notified', window: 'Under 30 seconds', color: '#4FA87C' },
  { ord: '06', signal: 'Billing or insurance question', route: 'Accounts, next working hour', window: 'Same day', color: '#90C2E7' },
  { ord: '07', signal: 'Timings, address or fee', route: 'Answered by the layer', window: 'Immediate', color: '#4FA87C' },
] as const
