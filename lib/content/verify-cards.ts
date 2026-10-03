/**
 * Extracted verbatim from `renderVals()` in the design canvas
 * (`FiguredoutAI Visual System.dc.html`). The canvas is the content source of
 * truth: this file is generated from it, not written by hand, so the site and
 * the approved design cannot drift apart.
 *
 * Do not edit the strings here to fix a reading — change the canvas and
 * re-extract, or the two stop agreeing about what the site says.
 */
/*
 * The registration specifics — LLPIN, statute, registered office — used to be
 * repeated here as well as on /about. Two pages asserting the same registry
 * facts gives a crawler two candidate homes for one entity claim and gives a
 * reader two places to check for drift.
 *
 * /about is the canonical home: it carries the Organization and Person schema,
 * its H1 names the entity, and `<EntityBlock>` states the same fields there in
 * full. What stays here is what /why-us is actually arguing — that the people
 * are named and the contact is real — with the registry detail one link away.
 */
export const verifyCards = [
  { label: 'Founders', value: 'Tanishk Singhal · Yashvardhan Awasthi', state: 'Named partners' },
  { label: 'Contact of record', value: 'hello@figuredoutai.com', state: 'Monitored' },
  { label: 'Registered entity', value: 'FiguredoutAI LLP', state: 'Details on About' },
] as const
