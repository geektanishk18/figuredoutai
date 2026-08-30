/**
 * Extracted verbatim from the static markup of board 1b in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). Unlike its neighbours in this
 * directory these strings are not in the canvas's `renderVals()` block — board
 * 1b writes them inline — but the rule is the same: the canvas is the content
 * source of truth, so they are copied out rather than authored here.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
export const whyLede =
  'Qualification logic is the set of judgements that decide whether a conversation is worth a business owner’s time — and it is different for every business on earth.'

export const howLede = 'We work alongside a business, not underneath it.'

export const govCards = [
  {
    title: 'Your data stays in your systems.',
    body: 'We document what the layer reads, what it stores, and what it never touches.',
  },
  {
    title: 'Every phase is milestone-gated.',
    body: 'You approve each stage before the next begins.',
  },
] as const

export const engagements = {
  title: 'Depth is not something we can promise at volume.',
  body: 'This work requires direct access to the people who genuinely understand the business, and sustained attention long after deployment. We deliberately keep a small number of active engagements so that every one of them gets both. It is a constraint we have chosen — and it is the reason the work holds up.',
} as const

export const verifyNote =
  'Filed with the Ministry of Corporate Affairs and verifiable against the public register.'
