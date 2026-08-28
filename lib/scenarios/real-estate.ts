import { assertScenarioDepth, type Scenario } from './types'

export const realEstate: Scenario = assertScenarioDepth({
  sector: 'Real estate',
  slug: 'real-estate',
  summary:
    'Budget honesty and finance readiness decide who is worth a site visit. The layer establishes both before a sales person spends a Saturday, and refuses to grade anyone on tone or perceived seriousness.',
  intakePath: [
    'Portal leads — 99acres, MagicBricks, Housing, each with its own inbox',
    'Meta and Google campaign forms, arriving in bursts after a spend change',
    'WhatsApp to the sales number, often after hours',
    'Walk-ins to the site office',
    'Channel-partner referrals, usually by phone to one named person',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Duplicate across portals',
      condition: 'Same phone number already exists in the pipeline within 90 days',
      action:
        'Attach to the existing record, notify the original owner, and do not create a second lead. Ownership never changes on a duplicate.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Budget floor',
      condition: 'Stated budget is more than 25% below the lowest available inventory in the requested configuration',
      action:
        'Say so plainly, offer the nearest configuration that does fit, and capture interest for future inventory. Do not book a site visit.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'Finance readiness',
      condition: 'Purchase depends on a loan and the status is pre-approved, in progress, or not yet considered',
      action:
        'Capture the status verbatim. Pre-approved routes to a senior closer; in-progress routes to standard sales; not-yet-considered routes to the finance desk first.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Site-visit intent',
      condition: 'Caller proposes or accepts a specific day for a visit',
      action:
        'Offer two concrete slots rather than asking when they are free, confirm the site address, and register the visit against a named sales person.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Configuration match',
      condition: 'Requested configuration is unavailable in the enquired project but exists in another',
      action: 'Name the alternative project and its price band explicitly. Never substitute silently.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Investor versus end-user',
      condition: 'Caller mentions rental yield, resale horizon, or holds units elsewhere',
      action:
        'Tag as investor, route to the closer who handles yield conversations, and attach possession timelines rather than lifestyle material.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'NRI and time-zone handling',
      condition: 'Caller is overseas, or the number carries a non-India country code',
      action:
        'Capture the working time zone, offer call windows inside it, and attach the documentation set NRI purchases require before the first call.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'Possession-timeline mismatch',
      condition: 'Caller needs possession sooner than the project can deliver',
      action:
        'State the honest handover window, and offer ready-to-move inventory where it exists. A visit booked against an impossible timeline wastes a Saturday and loses the referral.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Channel-partner attribution',
      condition: 'Enquiry names a partner, or the number matches a partner-submitted list',
      action: 'Lock attribution to that partner at first contact and record it in the log, before any sales conversation begins.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Campaign burst throttle',
      condition: 'More than 20 leads arrive from one campaign within 15 minutes',
      action:
        'Acknowledge every one immediately with a stated call-back window, then release to the team at a rate they can actually work.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'Cold re-engagement',
      condition: 'Lead has had no contact for 45 days and re-enquires',
      action: 'Return to the original owner with the prior conversation attached, not into the new-lead pool.',
      priority: 11,
    },
  ],
  routing: [
    {
      rule: 'R3',
      destination: 'Senior closer — pre-approved finance queue',
      acknowledge: '20 minutes',
      onNoAcknowledgement: 'Reassign to the next available closer and notify the sales manager.',
    },
    {
      rule: 'R4',
      destination: 'Named sales person, with the site-visit calendar',
      acknowledge: '30 minutes',
      onNoAcknowledgement: 'Reassign and confirm the visit with the customer under the new name.',
    },
    {
      rule: 'R6',
      destination: 'Investor desk',
      acknowledge: '2 hours',
      onNoAcknowledgement: 'Fall back to the standard sales queue with the investor tag retained.',
    },
    {
      rule: 'R7',
      destination: 'NRI desk',
      acknowledge: 'Next working window in the customer’s time zone',
      onNoAcknowledgement: 'Escalate to the sales manager rather than calling at an unreasonable hour.',
    },
    {
      rule: 'R9',
      destination: 'Partner-managed queue, attribution locked',
      acknowledge: '1 hour',
      onNoAcknowledgement: 'Notify the partner directly. Attribution does not lapse on a missed acknowledgement.',
    },
    {
      rule: 'R2',
      destination: 'Nurture list — no sales assignment',
      acknowledge: 'None',
      onNoAcknowledgement: 'Not applicable. This lead is deliberately not consuming sales time.',
    },
  ],
  escalation: [
    {
      trigger: 'Site visit unconfirmed the day before',
      threshold: '18 hours prior',
      path: 'Re-confirm with the customer, then notify the sales person. An unconfirmed Saturday visit is the most expensive silence in the pipeline.',
    },
    {
      trigger: 'Portal lead unacknowledged',
      threshold: '30 minutes',
      path: 'Escalate to the sales manager. Portal leads decay faster than any other channel because the same enquiry went to three competitors.',
    },
    {
      trigger: 'Attribution disputed',
      threshold: 'Any',
      path: 'Freeze the lead, surface both claims with timestamps, and let a human decide. The layer never adjudicates commission.',
    },
    {
      trigger: 'Campaign burst sustained',
      threshold: 'Throttle active more than 2 hours',
      path: 'Notify marketing that spend is outrunning sales capacity, before more budget is committed.',
    },
  ],
  walkthrough: {
    channel: 'MagicBricks portal lead, Saturday 11:20',
    enquiry:
      '"Interested in 3BHK. Budget around 95 lakhs. Loan not yet decided. Can visit this weekend."',
    steps: [
      {
        at: '0s',
        decision: 'Checked for duplicates — none in 90 days',
        rule: 'R1',
        reasoning:
          'Runs first on every enquiry. A duplicate arriving from a second portal is the most common cause of two sales people calling the same person within an hour.',
      },
      {
        at: '2s',
        decision: 'Budget cleared the floor for 3BHK',
        rule: 'R2',
        reasoning:
          '95 lakhs sits inside the available band, so R2 does not fire and the enquiry stays live. Had it been below the floor, no visit would have been offered regardless of stated intent.',
      },
      {
        at: '3s',
        decision: 'Finance status captured as "not yet considered"',
        rule: 'R3',
        reasoning:
          'Recorded in the customer’s own words. This routes to the finance desk before sales, because a visit booked ahead of a loan conversation usually produces a second visit.',
      },
      {
        at: '5s',
        decision: 'Visit intent registered, but held pending finance',
        rule: 'R4',
        reasoning:
          'R3 sits in a lower band than R4, so finance ordering wins the conflict. Both rules are logged as considered — the visit is not refused, it is sequenced.',
      },
      {
        at: '8s',
        decision: 'Replied with two concrete slots and a finance pre-check',
        rule: 'R4',
        reasoning:
          'Two named slots rather than "when suits you?". Open-ended availability questions are the most common point at which a weekend enquiry goes quiet.',
      },
      {
        at: '14m',
        decision: 'Finance desk acknowledged; routed to standard sales with status attached',
        rule: 'R3',
        reasoning: 'The sales person opened a conversation that already had budget and loan position in it.',
      },
    ],
    outcome:
      'A Saturday portal lead reached a sales person with budget confirmed, finance position recorded, and two visit slots already offered — inside fifteen minutes, on the day portal leads decay fastest.',
  },
  neverDecides: [
    {
      decision: 'Whether a buyer is serious',
      why:
        'It records budget, finance status and timeline. Grading someone on tone or perceived intent is exactly the bias that loses good buyers who write short messages.',
    },
    {
      decision: 'Price, discount, or payment-plan flexibility',
      why: 'Negotiation stays with the closer. The layer states published pricing and escalates anything else.',
    },
    {
      decision: 'Commission attribution in a dispute',
      why: 'It records who claimed what and when, then freezes the lead for a human. Money between partners is never an automated call.',
    },
    {
      decision: 'Whether to promise a possession date',
      why: 'It quotes the current published handover window and nothing beyond it. Timeline commitments carry legal weight.',
    },
  ],
})
