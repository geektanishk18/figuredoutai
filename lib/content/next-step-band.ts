/**
 * The closing call-to-action band, transcribed from boards 1c and 2b.
 *
 * Only the two verticals the canvas authors carry copy here. The band names
 * what the audit actually looks at for that industry, and that specificity is
 * the point — a generic version would be a different, weaker promise. Writing
 * one for the other four would mean inventing the promise, so those pages keep
 * their existing calls to action instead.
 */
export const nextStepBand = {
  'medical-clinics': {
    eyebrow: 'Next step',
    title: 'Your three-day intake audit.',
    body: 'Which enquiries are going unanswered, what is still pending on WhatsApp, and what the clinics around you are doing.',
    cta: 'Request your audit',
    reassurance: 'Three working days. No cost, no obligation.',
  },
  recruitment: {
    eyebrow: 'Next step',
    title: 'Your three-day intake audit.',
    body: 'Which applications are going unscreened, how long a strong profile waits, and what the roles you are losing on have in common.',
    cta: 'Request your audit',
    reassurance: 'Three working days. No cost, no obligation.',
  },
} as const

export type NextStepSlug = keyof typeof nextStepBand
