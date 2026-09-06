import type { IntakeOutcome } from '@/components/diagram'
import type { IndustrySlug } from '@/lib/constants'
import type { ComparisonRow } from './comparison-matrix'

/**
 * The public, masked view of each vertical's decision architecture.
 *
 * WHAT THIS FILE DELIBERATELY DOES NOT CONTAIN, AND WHY.
 *
 * `lib/scenarios/*` holds the full architecture for each sector: named rules
 * with their exact conditions and actions, the routing table with destinations
 * and acknowledgement windows, escalation thresholds, and a timed decision log.
 * All of that was previously published on the industry pages.
 *
 * It is no longer, by decision: those specifics are the part a competitor can
 * copy in an afternoon, and they are what the paid engagement produces. They
 * now belong to the Intake Audit deliverable rather than to a public page.
 *
 * So nothing here carries a threshold, a time window, a rule identifier, or a
 * verbatim condition. What it carries instead is the *shape* of the system —
 * how priority ordering works, what happens when nothing is acknowledged, what
 * the layer refuses to decide. That is the part a prospect needs in order to
 * judge whether the thinking is sound, it is genuinely useful writing rather
 * than a teaser, and it gives a competitor nothing they could implement from.
 *
 * The scenario files stay in the repository. They are the source the audit
 * deliverable is built from; they are simply no longer rendered.
 *
 * WHEN ADDING A VERTICAL: read its scenario file for grounding, then write at
 * this altitude. If a sentence you are about to add would let someone rebuild a
 * rule, it belongs in the audit, not here.
 */

export interface DepthPanel {
  /** Summary line. A claim the reader can decide to open, not a label. */
  summary: string
  /** Short meta shown collapsed — how substantial the panel is. */
  meta?: string
  /** Paragraphs. Present in the HTML whether or not the panel is open. */
  body: readonly string[]
}

export interface IndustryDepth {
  /** Two to three sentences answering the page's core question outright. */
  answer: string
  /** Channels for `<IntakeFlow />`. Shortened from the scenario's intake path. */
  flowChannels: readonly string[]
  /** What the layer tests for, in a phrase. No thresholds. */
  flowCriteria: string
  flowOutcomes: readonly [IntakeOutcome, IntakeOutcome, IntakeOutcome]
  flowCaption: string
  /** What the layer does here — icon-led, scannable. */
  criteria: readonly { title: string; body: string }[]
  /** This vertical's chatbot / decision-layer comparison. */
  comparison: readonly ComparisonRow[]
  /** The masked depth, in disclosure panels. */
  depth: readonly DepthPanel[]
}

const clinics: IndustryDepth = {
  answer:
    'A clinic loses enquiries in the gap between a patient deciding to call and someone being free to answer. A decision layer takes first response on every channel, sorts what arrives by described urgency, specialty and payment route, and books what it can book. The front desk stops being the first filter and starts seeing only what still needs a person.',

  flowChannels: [
    'Phone, during clinic hours',
    'WhatsApp, at any hour',
    'Listing and portal enquiries',
    'Website form',
  ],
  flowCriteria: 'Described urgency, specialty fit, payment route, and whether the patient is returning',
  flowOutcomes: [
    {
      state: 'escalated',
      label: 'To a person',
      destination: 'anything clinical, or anything the rules do not cover',
    },
    {
      state: 'held',
      label: 'Held',
      destination: 'waitlisted, with an alternative offered',
    },
    {
      state: 'lost',
      label: 'Closed',
      destination: 'answered in full, with the reason recorded',
    },
  ],
  flowCaption:
    'Enquiries arrive on four channels and are qualified against criteria the clinic wrote. Most are answered or booked outright; anything clinical, ambiguous or outside the rules goes to a person with the context already attached.',

  criteria: [
    {
      title: 'Urgency, as described',
      body: 'Language a clinician approved is matched against a list a clinician wrote. The layer never assesses a symptom — it recognises words and hands over.',
    },
    {
      title: 'The right clinician',
      body: 'Specialty is checked against the complaint before a slot is offered, and a mismatch is corrected out loud rather than silently rebooked.',
    },
    {
      title: 'Continuity',
      body: 'A returning patient is matched to their prior visit and routed back to the clinician who saw them, without being asked to re-explain their history.',
    },
    {
      title: 'Payment route',
      body: 'Self-pay, insurance and corporate panel each carry different prerequisites. The layer captures which one applies before the appointment is confirmed.',
    },
  ],

  comparison: [
    {
      dimension: 'A call at 9:12',
      chatbot: 'Answers if the caller used the web widget',
      layer: 'Answers on the phone, on WhatsApp and in the portal inbox',
    },
    {
      dimension: 'Symptom language',
      chatbot: 'Treats it as text to reply to',
      layer: 'Matches it against the clinic-approved list and stops qualifying',
    },
    {
      dimension: 'A returning patient',
      chatbot: 'Meets them as a stranger',
      layer: 'Recognises them and routes to the clinician who saw them',
    },
    {
      dimension: 'A full day',
      chatbot: 'Offers a slot it cannot honour',
      layer: 'Reports saturation and waits for a human call on overbooking',
    },
  ],

  depth: [
    {
      summary: 'How the rule set is ordered, and what happens when two rules match',
      meta: 'Priority',
      body: [
        'Rules sit in priority bands rather than in a list, and the ordering is decided before anything is built. When an enquiry matches more than one rule, the lower band takes it and every other rule that matched is recorded as considered. That record is the useful part: it shows what the layer nearly did, which is where a rule set that has drifted from the clinic’s judgement first becomes visible.',
        'Nothing about the ordering is inferred by a model at runtime. It is written down, reviewed with the people who apply the criteria today, and signed off before it takes any traffic. Your team can change a band without touching code, and a change takes effect for every enquiry after it, not retroactively.',
      ],
    },
    {
      summary: 'Why the layer never assesses a symptom',
      meta: 'Safety',
      body: [
        'The distinction the whole design rests on: the layer matches described language against a red-flag list a doctor wrote and approved. That is pattern matching against a clinical list, not triage, and the difference is the entire safety argument.',
        'When a match occurs the layer stops qualifying. It does not offer a slot, ask about payment, or continue the conversation as though it were routine. It returns the guidance the clinic specified, alerts the duty clinician, and hands over. A system that tried to be cleverer than that would be practising medicine, which is not something software should do and not something a clinic should accept liability for.',
      ],
    },
    {
      summary: 'What happens when nobody acknowledges a routed enquiry',
      meta: 'Escalation',
      body: [
        'Every enquiry the layer routes has a named owner and a window in which that owner is expected to acknowledge it. The windows differ by what was routed — the point is that one exists at all, because an enquiry handed to a queue nobody is accountable for is not meaningfully different from a missed call.',
        'If the window passes without acknowledgement, the enquiry escalates along a path defined in advance rather than sitting where it was left. The escalation is logged with the fact that the first owner did not respond, which over a few weeks tells the clinic something useful about where its intake actually breaks — usually not where anyone assumed.',
      ],
    },
    {
      summary: 'What the clinic can change, and what it can see',
      meta: 'Control',
      body: [
        'The rule set is written in the clinic’s own language, not in code, because the people who should be changing it are the people who apply the criteria today rather than whoever is available to edit a config file. Changing what counts as same-day, or which department owns which complaint, is an edit to a document that the layer then follows.',
        'Every decision is logged with the rule that produced it, and every human override is logged against the decision it replaced. Override patterns are the most valuable signal the system produces: they show precisely where the written rules and the clinic’s actual judgement have come apart, which is the thing that tells you a rule needs changing before anyone thinks to complain about it.',
      ],
    },
  ],
}

/**
 * Verticals restructured so far.
 *
 * The industry page renders the new structure for any slug present here and
 * keeps its previous layout for the rest, so the six pages can be migrated and
 * reviewed one at a time rather than in a single change nobody can read. The
 * fallback goes away once all six are in.
 */
export const INDUSTRY_DEPTH: Partial<Record<IndustrySlug, IndustryDepth>> = {
  clinics,
}
