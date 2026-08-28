import { assertScenarioDepth, type Scenario } from './types'

export const restaurants: Scenario = assertScenarioDepth({
  sector: 'Restaurants',
  slug: 'restaurants',
  summary:
    'Covers and timing decide everything, and the decisions are worth the most in exactly the hour nobody can answer the phone. The layer holds tables against real capacity and escalates anything with money or allergy risk attached.',
  intakePath: [
    'Phone during service — the hour with the highest value and the least capacity to answer',
    'WhatsApp and Instagram DMs, increasingly the default for groups',
    'Google Business messages and the reservation widget',
    'Large-party and private-dining enquiries, usually by email',
    'Walk-ins asking about the wait',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Allergy or dietary restriction stated',
      condition: 'Message names an allergy, intolerance, or a religious dietary requirement',
      action:
        'Capture it verbatim, attach it to the booking, and notify the kitchen at confirmation rather than on arrival. Never confirm that a dish is safe.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Large party threshold',
      condition: 'Party of 8 or more',
      action:
        'Do not auto-confirm. Capture headcount, occasion and timing, then route to the manager, since large parties change the shape of the floor.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'Peak-window capacity',
      condition: 'Requested time falls inside a peak window and the covers remaining are below the reserve threshold',
      action:
        'Offer the nearest slot either side of peak with the real wait stated. Never confirm a table that does not exist.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Private dining and events',
      condition: 'Enquiry mentions a private room, buyout, or a set menu for a group',
      action: 'Capture date, headcount and budget band, then route to events. This never enters the standard booking flow.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Same-day short-notice',
      condition: 'Booking requested for today, within 3 hours',
      action: 'Check live covers, offer only what is actually held, and give a truthful wait estimate rather than a hopeful one.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Occasion flag',
      condition: 'Message mentions a birthday, anniversary, or proposal',
      action: 'Tag the booking and notify the floor manager. Occasion bookings carry the highest complaint cost when missed.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'Modification or cancellation',
      condition: 'Existing booking reference or matching phone number, with a change requested',
      action: 'Amend covers and time directly, release the freed capacity immediately, and confirm the change in writing.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'No-show risk',
      condition: 'Guest has two or more no-shows on record, or the party is 6+ at peak',
      action: 'Require a confirmation reply, and hold the table only until the stated cutoff.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Delivery or takeaway misdirect',
      condition: 'Enquiry is about a delivery order, aggregator issue, or refund',
      action: 'Route to the aggregator channel that owns it and say so plainly. Do not attempt to resolve a third-party order.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Complaint language',
      condition: 'Message describes a bad experience, illness after a meal, or a billing dispute',
      action: 'Stop the booking flow entirely. Route to the manager with the message verbatim and no automated reply beyond acknowledgement.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'Out-of-hours enquiry',
      condition: 'Message arrives when the restaurant is closed and no rule above R5 has matched',
      action: 'Acknowledge with opening time and the next bookable slot, and queue for the floor manager at open.',
      priority: 11,
    },
  ],
  routing: [
    {
      rule: 'R1',
      destination: 'Kitchen — flagged on the booking, plus floor manager',
      acknowledge: 'At confirmation',
      onNoAcknowledgement: 'Escalate to the head chef before the guest arrives, never on arrival.',
    },
    {
      rule: 'R2',
      destination: 'Floor manager — large-party queue',
      acknowledge: '2 hours',
      onNoAcknowledgement: 'Escalate to the general manager. A large party left unanswered books elsewhere the same day.',
    },
    {
      rule: 'R4',
      destination: 'Events desk',
      acknowledge: 'Same working day',
      onNoAcknowledgement: 'Escalate to the general manager with the budget band attached.',
    },
    {
      rule: 'R6',
      destination: 'Floor manager — occasion list for the service',
      acknowledge: 'Before the service starts',
      onNoAcknowledgement: 'Re-notify at pre-service briefing.',
    },
    {
      rule: 'R10',
      destination: 'General manager — direct, no automated reply',
      acknowledge: '30 minutes',
      onNoAcknowledgement: 'Escalate to the owner. Complaints are never left to a queue.',
    },
    {
      rule: 'R7',
      destination: 'Booking system — amended automatically, floor notified',
      acknowledge: 'Immediate',
      onNoAcknowledgement: 'Not applicable; the amendment is logged and the capacity released regardless.',
    },
  ],
  escalation: [
    {
      trigger: 'Allergy flag unacknowledged by the kitchen',
      threshold: 'Before service begins',
      path: 'Floor manager → head chef, repeating. The booking is not marked ready until a human has acknowledged the flag.',
    },
    {
      trigger: 'Peak covers oversold',
      threshold: 'Any confirmed booking beyond held capacity',
      path: 'Immediate manager alert. The layer stops confirming and holds the remaining enquiries in a queue.',
    },
    {
      trigger: 'Complaint mentioning illness',
      threshold: 'Immediate',
      path: 'General manager and owner together, message verbatim, no automated reply beyond acknowledgement.',
    },
    {
      trigger: 'Large party unanswered into service',
      threshold: '2 hours',
      path: 'General manager, with the enquiry and headcount attached.',
    },
  ],
  walkthrough: {
    channel: 'Instagram DM, Friday 20:35, mid-service',
    enquiry:
      '"hi do you have a table for 9 tomorrow around 8:30? one of us is coeliac. it\'s my mum\'s 60th"',
    steps: [
      {
        at: '0s',
        decision: 'Matched R1 — dietary restriction stated',
        rule: 'R1',
        reasoning:
          '"coeliac" is captured verbatim and attached to the booking immediately. R1 is the top band because an allergy discovered on arrival is the most expensive miss on this list.',
      },
      {
        at: '1s',
        decision: 'Matched R2 — party of 9 exceeds the auto-confirm threshold',
        rule: 'R2',
        reasoning:
          'Nine covers changes the floor plan. R2 blocks auto-confirmation, so the layer captures rather than commits — three rules matched here and the ordering decided which one acts.',
      },
      {
        at: '2s',
        decision: 'Tagged R6 — occasion',
        rule: 'R6',
        reasoning:
          'A 60th is logged for the floor manager’s occasion list. It does not change routing, but it is the difference between a good service and a complaint.',
      },
      {
        at: '6s',
        decision: 'Replied acknowledging all three, without confirming the table',
        rule: 'R2',
        reasoning:
          'The reply names the coeliac note, the headcount and the occasion back to the guest, and states a manager will confirm. It promises nothing about a table that has not been checked.',
      },
      {
        at: '8s',
        decision: 'Routed to floor manager; kitchen notified of the coeliac flag',
        rule: 'R1',
        reasoning: 'The kitchen is told at confirmation time, not at arrival, which is the whole point of capturing it at 20:35 on a Friday.',
      },
      {
        at: '41m',
        decision: 'Manager confirmed 8:45 after service; layer sent written confirmation',
        rule: 'R2',
        reasoning:
          'A human made the capacity decision. The layer held the enquiry, kept the guest informed, and did not oversell peak.',
      },
    ],
    outcome:
      'A nine-cover booking with an allergy and an occasion arrived during the busiest half hour of the week and was answered in six seconds without a single premature promise. The kitchen knew about the coeliac guest a day ahead.',
  },
  neverDecides: [
    {
      decision: 'Whether a dish is safe for an allergy',
      why:
        'It records the restriction and routes it to the kitchen. Confirming a dish is safe is a food-safety judgement that belongs to a chef, and the consequence of getting it wrong is not commercial.',
    },
    {
      decision: 'Whether to overbook a service',
      why: 'Capacity is a manager’s call. The layer reports remaining covers and stops confirming when they run out.',
    },
    {
      decision: 'Whether to comp a bill or offer a refund',
      why: 'Any complaint stops the automated flow entirely and goes to a human with the message verbatim.',
    },
    {
      decision: 'Whether to hold a table past the cutoff',
      why: 'The cutoff is the restaurant’s policy. Extending it trades one guest against another, which is a floor decision.',
    },
  ],
})
