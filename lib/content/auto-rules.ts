/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const autoRules = [
  'Appointment request where a matching slot is open',
  'Clinic timings, address, directions and consultation fee',
  'Reschedule or cancel more than four hours ahead',
  'Reminder the evening before, with what to bring',
  'Repeat patient asking for the same doctor as last visit',
] as const
