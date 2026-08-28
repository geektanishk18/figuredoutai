import { assertScenarioDepth, type Scenario } from './types'

export const travel: Scenario = assertScenarioDepth({
  sector: 'Travel',
  slug: 'travel',
  summary:
    'Travel dates, party composition and budget decide whether an enquiry is a quotation or a conversation. The layer establishes all three before a consultant builds an itinerary nobody asked for, and treats anyone already travelling as a separate class of urgent.',
  intakePath: [
    'WhatsApp — dominant, and frequently mid-trip',
    'Website enquiry forms with partial dates',
    'Instagram DMs from campaign posts',
    'Phone, concentrated in evenings and weekends',
    'Repeat clients messaging a consultant directly',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Traveller in distress',
      condition:
        'Enquirer is currently travelling and reports a missed connection, cancellation, medical issue, lost document, or being stranded',
      action:
        'Stop qualifying. Route immediately to the on-call consultant with the message verbatim and the traveller’s current location. No sales questions.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Imminent departure',
      condition: 'Travel date is within 7 days',
      action: 'Route to a senior consultant on a short acknowledgement clock. Availability and pricing move hourly inside this window.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'Visa dependency',
      condition: 'Destination requires a visa the traveller does not hold, and the date is inside the typical processing window',
      action:
        'State the processing reality before quoting, and capture passport nationality. A trip sold against an impossible visa timeline becomes a refund.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Party composition',
      condition: 'Any enquiry with travellers named',
      action:
        'Capture adults, children with ages, and infants. Ages change room configuration, park pricing and airline rules, and are the most common cause of a re-quote.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Budget band established',
      condition: 'No per-person budget stated',
      action:
        'Ask once, offering bands rather than an open question. Do not build an itinerary against an unknown budget.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Date flexibility',
      condition: 'Dates are stated as approximate or a month is given without days',
      action: 'Capture the flexibility window explicitly. It is the single largest lever on price and the least often recorded.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'Repeat client continuity',
      condition: 'Phone number matches a client who has travelled with the agency before',
      action: 'Route to the original consultant with the prior itinerary attached, regardless of which channel the enquiry arrived on.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'Group and MICE',
      condition: 'Party of 10 or more, or a corporate or event booking',
      action: 'Route to the groups desk. Never quote group travel from standard per-person pricing.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Destination not served',
      condition: 'Requested destination is outside the agency’s operating set',
      action: 'Say so directly and immediately. A slow no is worse than a fast one, and it costs the referral.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Peak-season pricing reality',
      condition: 'Travel falls in a known peak window and the stated budget is below the season floor',
      action: 'State the seasonal floor before quoting, and offer shoulder-date alternatives with the price difference shown.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'Existing booking amendment',
      condition: 'Enquiry references an existing booking reference or invoice',
      action: 'Route to the consultant who owns the booking. Amendments never enter the new-enquiry pool.',
      priority: 11,
    },
  ],
  routing: [
    {
      rule: 'R1',
      destination: 'On-call consultant — direct, 24/7',
      acknowledge: '10 minutes',
      onNoAcknowledgement: 'Escalate to the operations head, repeating. A stranded traveller path does not time out.',
    },
    {
      rule: 'R2',
      destination: 'Senior consultant — urgent departures',
      acknowledge: '30 minutes',
      onNoAcknowledgement: 'Reassign to any available senior consultant and notify the sales head.',
    },
    {
      rule: 'R7',
      destination: 'Original consultant',
      acknowledge: '4 hours',
      onNoAcknowledgement: 'Fall back to the team, with the prior itinerary still attached.',
    },
    {
      rule: 'R8',
      destination: 'Groups and MICE desk',
      acknowledge: 'Same working day',
      onNoAcknowledgement: 'Escalate to the sales head with headcount and dates.',
    },
    {
      rule: 'R11',
      destination: 'Booking owner — amendments queue',
      acknowledge: '2 hours',
      onNoAcknowledgement: 'Escalate to operations. An unanswered amendment close to departure becomes a cancellation.',
    },
    {
      rule: 'R9',
      destination: 'Closed with a direct answer — no assignment',
      acknowledge: 'Immediate',
      onNoAcknowledgement: 'Not applicable.',
    },
  ],
  escalation: [
    {
      trigger: 'Traveller in distress unacknowledged',
      threshold: '10 minutes',
      path: 'On-call consultant → operations head → operations head’s mobile, repeating until acknowledged.',
    },
    {
      trigger: 'Departure inside 72 hours with an open question',
      threshold: '72 hours',
      path: 'Escalate to the sales head regardless of queue position.',
    },
    {
      trigger: 'Visa timeline breached mid-conversation',
      threshold: 'Any',
      path: 'Flag to the consultant before a payment is requested, never after.',
    },
    {
      trigger: 'Quote requested but budget still unknown',
      threshold: 'Second exchange',
      path: 'Hand to a consultant rather than continuing to ask. Two unanswered budget questions means the question is wrong.',
    },
  ],
  walkthrough: {
    channel: 'WhatsApp, Sunday 23:10',
    enquiry:
      '"stuck at Doha, connection to Zurich cancelled, we have the hotel booked from tomorrow. 2 adults 1 child. what do we do"',
    steps: [
      {
        at: '0s',
        decision: 'Matched R1 — traveller in distress',
        rule: 'R1',
        reasoning:
          '"stuck" plus a named airport plus a cancelled connection. R1 is the only rule in the top band and it suppresses everything commercial.',
      },
      {
        at: '0s',
        decision: 'Suppressed all qualifying questions',
        rule: 'R1',
        reasoning:
          'R4 (party composition) and R2 (imminent departure) both matched and were both logged as considered. Asking a stranded family for a budget band is the failure this ordering exists to prevent.',
      },
      {
        at: '3s',
        decision: 'Acknowledged with a named consultant and a time',
        rule: 'R1',
        reasoning:
          'At 23:10 the only thing that matters is that a person is coming and when. The reply names who and how long.',
      },
      {
        at: '5s',
        decision: 'Alerted the on-call consultant, message verbatim with location',
        rule: 'R1',
        reasoning:
          'Verbatim, with the existing booking pulled and attached, so the consultant opens the conversation already knowing the hotel dates at risk.',
      },
      {
        at: '10m',
        decision: 'No acknowledgement — escalated to operations head',
        rule: 'R1',
        reasoning: 'The R1 path repeats and has no give-up condition, because the alternative is a family sleeping in a terminal.',
      },
      {
        at: '11m',
        decision: 'Operations head acknowledged; layer withdrew',
        rule: '—',
        reasoning: 'Handover logged. The layer stops messaging once a human owns the conversation.',
      },
    ],
    outcome:
      'A distress message at 23:10 on a Sunday reached a decision-maker in eleven minutes, with the existing booking already attached, and never once asked the traveller a sales question.',
  },
  neverDecides: [
    {
      decision: 'Whether a visa will be granted',
      why: 'It states published processing times and requirements. Outcomes belong to a consulate, and implying otherwise creates a refund and a reputation problem.',
    },
    {
      decision: 'Whether to rebook or pay for a stranded traveller',
      why: 'Money in a live disruption is a consultant’s call with the supplier. The layer gets a human there fast and gets out of the way.',
    },
    {
      decision: 'Final pricing on a group booking',
      why: 'Group rates are negotiated per departure. Quoting from standard per-person pricing is how a group booking loses money.',
    },
    {
      decision: 'Whether to waive a cancellation charge',
      why: 'Supplier terms and goodwill are commercial judgements the agency owns.',
    },
  ],
})
