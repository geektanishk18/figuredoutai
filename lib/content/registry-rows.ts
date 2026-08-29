/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const registryRows = [
  { slug: 'clinics', s1: 'Calls/day · 8–90 · 30', s2: 'Missed % · 5–50 · 25', s3: 'Patient value · ₹300–3,000 · ₹700', days: '26', noun: 'patients' },
  { slug: 'real-estate', s1: 'Enquiries/day · 5–60 · 20', s2: 'Missed % · 5–50 · 30', s3: 'Commission · ₹20,000–3,00,000 · ₹80,000', days: '26', noun: 'site visits' },
  { slug: 'restaurants', s1: 'Orders + bookings/day · 20–200 · 60', s2: 'Missed % · 5–40 · 20', s3: 'Order value · ₹400–4,000 · ₹1,200', days: '30', noun: 'covers' },
  { slug: 'travel', s1: 'Enquiries/day · 5–60 · 18', s2: 'Missed % · 5–50 · 30', s3: 'Booking value · ₹15,000–2,00,000 · ₹45,000', days: '26', noun: 'bookings' },
  { slug: 'recruitment', s1: 'Applicants/day · 20–300 · 80', s2: 'Unscreened % · 10–70 · 40', s3: 'Placement fee · ₹30,000–3,00,000 · ₹90,000', days: '26', noun: 'placements' },
  { slug: 'hvac', s1: 'Service calls/day · 5–60 · 20', s2: 'Missed % · 5–50 · 28', s3: 'Job value · ₹2,000–40,000 · ₹8,000', days: '26', noun: 'jobs' },
] as const
