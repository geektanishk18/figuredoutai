import { assertScenarioDepth, type Scenario } from './types'

export const hvac: Scenario = assertScenarioDepth({
  sector: 'HVAC',
  slug: 'hvac',
  summary:
    'Breakdowns and quotations arrive in the same inbox and need opposite speeds. The layer separates them on the first message, treats safety risk as its own class, and never dispatches an engineer against a fault it has diagnosed itself.',
  intakePath: [
    'Phone — dominant during a heatwave, and saturated exactly when it matters',
    'WhatsApp with photographs of the unit or error code',
    'AMC clients messaging their assigned coordinator',
    'Website form for new installations and quotations',
    'Builder and facility-manager enquiries for multi-unit sites',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Safety risk',
      condition:
        'Message describes a gas smell, burning smell, smoke, electrical sparking, water ingress into electrics, or a tripping main',
      action:
        'Stop qualifying. Return the safety instruction the company has approved — isolate power, ventilate, do not operate — and alert the duty supervisor. No booking, no quotation.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Vulnerable-occupancy breakdown',
      condition: 'Total cooling or heating failure at a site with an infant, an elderly or ill occupant, or a medical requirement',
      action: 'Same-day dispatch regardless of queue position, with the reason recorded so the prioritisation is auditable.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'AMC contract entitlement',
      condition: 'Site or phone number matches an active annual maintenance contract',
      action:
        'Apply the contracted response window, route to the assigned coordinator, and never quote for work the contract already covers.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Complete failure versus degraded performance',
      condition: 'Unit is entirely non-functional, as against cooling poorly or noisy',
      action: 'Complete failure takes the breakdown queue. Degraded performance takes the scheduled-service queue with a stated date.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Warranty status',
      condition: 'Unit was installed by the company within the warranty period',
      action: 'Flag as warranty before dispatch, so no chargeable visit is booked against covered work.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Commercial multi-unit site',
      condition: 'Enquiry concerns more than 3 units, a chiller, or a facility contract',
      action: 'Route to the commercial desk. Never quote multi-unit work from residential pricing.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'New installation quotation',
      condition: 'Enquiry is for supply or installation rather than a fault',
      action:
        'Capture area, floor, existing wiring and preferred capacity, then route to sales on a working-day clock. This never enters the breakdown queue.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'Service-area boundary',
      condition: 'Site is outside the serviceable radius',
      action: 'Say so immediately with the boundary stated. A slow no during a heatwave is the worst outcome for both sides.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Repeat fault within warranty of work',
      condition: 'Same unit reported faulty within 30 days of a completed job',
      action:
        'Route to the supervisor, not the queue, and attach the previous job card. A repeat visit is a quality signal before it is a dispatch.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Peak-load surge',
      condition: 'Breakdown volume exceeds available engineer capacity for the day',
      action:
        'Acknowledge every enquiry with a truthful next-available window rather than a hopeful one, and hold the queue in arrival order behind R1 and R2.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'Payment dispute or complaint',
      condition: 'Message concerns billing, a previous engineer’s conduct, or a refund',
      action: 'Stop the dispatch flow. Route to the supervisor with the message verbatim.',
      priority: 11,
    },
  ],
  routing: [
    {
      rule: 'R1',
      destination: 'Duty supervisor — direct alert',
      acknowledge: '5 minutes',
      onNoAcknowledgement: 'Escalate to the operations manager, repeating until acknowledged.',
    },
    {
      rule: 'R2',
      destination: 'Dispatch — same-day, priority insert',
      acknowledge: '15 minutes',
      onNoAcknowledgement: 'Escalate to the operations manager to reassign an engineer from a lower-priority job.',
    },
    {
      rule: 'R3',
      destination: 'Assigned AMC coordinator',
      acknowledge: 'Per contracted window',
      onNoAcknowledgement: 'Escalate to the account manager before the contracted window lapses, not after.',
    },
    {
      rule: 'R4',
      destination: 'Breakdown queue — engineer dispatch',
      acknowledge: '1 hour',
      onNoAcknowledgement: 'Escalate to the dispatch supervisor.',
    },
    {
      rule: 'R6',
      destination: 'Commercial desk',
      acknowledge: '4 working hours',
      onNoAcknowledgement: 'Escalate to the sales head.',
    },
    {
      rule: 'R7',
      destination: 'Sales — quotation queue',
      acknowledge: '1 working day',
      onNoAcknowledgement: 'Escalate to the sales head with the captured site details.',
    },
  ],
  escalation: [
    {
      trigger: 'Safety report unacknowledged',
      threshold: '5 minutes',
      path: 'Duty supervisor → operations manager → manager’s mobile, repeating. This path has no give-up condition.',
    },
    {
      trigger: 'AMC contracted window at risk',
      threshold: '75% of the window elapsed',
      path: 'Notify the account manager while the window can still be met.',
    },
    {
      trigger: 'Engineer capacity exceeded',
      threshold: 'Queue longer than the day’s capacity',
      path: 'Notify operations before more same-day promises are made. The layer stops offering same-day slots it cannot support.',
    },
    {
      trigger: 'Repeat fault inside 30 days',
      threshold: 'Any',
      path: 'Supervisor directly, with the previous job card attached. Never a routine re-dispatch.',
    },
  ],
  walkthrough: {
    channel: 'WhatsApp, Thursday 14:30, peak summer',
    enquiry:
      '"AC completely stopped, there is a burning smell from the outdoor unit. we have a 3 month old baby at home. please send someone"',
    steps: [
      {
        at: '0s',
        decision: 'Matched R1 — safety risk',
        rule: 'R1',
        reasoning:
          '"burning smell" is on the approved safety list. R1 is the top band, so it acts before R2, R4 and R10, all of which also matched.',
      },
      {
        at: '0s',
        decision: 'Suppressed dispatch booking',
        rule: 'R1',
        reasoning:
          'The customer asked for an engineer. Booking a slot first would leave a possibly live electrical fault running for hours — the safety instruction goes out before anything is scheduled.',
      },
      {
        at: '3s',
        decision: 'Returned the approved isolation instruction',
        rule: 'R1',
        reasoning:
          'Fixed text the company approved: isolate power at the breaker, do not operate the unit, ventilate. The layer does not diagnose the cause of a burning smell.',
      },
      {
        at: '5s',
        decision: 'Alerted the duty supervisor, message verbatim',
        rule: 'R1',
        reasoning: 'Verbatim rather than summarised, because a paraphrase of a safety description discards the detail that decides urgency.',
      },
      {
        at: '6s',
        decision: 'Recorded R2 — vulnerable occupancy — as a priority factor',
        rule: 'R2',
        reasoning:
          'The three-month-old does not change what R1 does, but it is attached to the job so the same-day insert is justified and auditable rather than discretionary.',
      },
      {
        at: '4m',
        decision: 'Supervisor acknowledged; engineer reassigned from a scheduled service',
        rule: 'R2',
        reasoning:
          'A human made the reassignment decision. The layer supplied the safety instruction, the priority factors, and the queue position it would otherwise have had.',
      },
    ],
    outcome:
      'At the busiest hour of a summer Thursday, a potential electrical fault got an isolation instruction in three seconds and a supervisor in four minutes — and no engineer was dispatched against a fault the layer had diagnosed itself.',
  },
  neverDecides: [
    {
      decision: 'What is wrong with the unit',
      why:
        'It matches described symptoms against a company-approved list to decide urgency. Diagnosis happens on site, by an engineer looking at the equipment.',
    },
    {
      decision: 'Whether a repair is safe to attempt',
      why: 'It issues the approved isolation instruction and routes to a supervisor. Anything further is an engineering judgement with a safety consequence.',
    },
    {
      decision: 'The cost of a repair',
      why: 'Parts and labour are quoted after inspection. A number given before an engineer has seen the unit becomes a dispute.',
    },
    {
      decision: 'Whether work falls under warranty or AMC',
      why: 'It flags the contract status it can see and lets a supervisor rule on coverage. Entitlement decisions carry contractual weight.',
    },
  ],
})
