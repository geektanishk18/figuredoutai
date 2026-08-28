import { assertScenarioDepth, type Scenario } from './types'

export const medicalClinics: Scenario = assertScenarioDepth({
  sector: 'Medical clinics',
  slug: 'medical-clinics',
  summary:
    'Symptom urgency decides everything here, and it has to be assessed without practising medicine. The layer sorts on described urgency, specialty fit and payment route, and hands anything clinical to a clinician.',
  intakePath: [
    'Phone — dominant, and the channel least able to absorb load',
    'WhatsApp to the clinic number — read quickly, answered slowly',
    'Practo and JustDial listing enquiries — separate inbox, separate owner',
    'Website form — checked when someone remembers',
    'Walk-ins expecting to be seen today',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Red-flag symptom language',
      condition:
        'Message contains chest pain or tightness, breathlessness, one-sided weakness, slurred speech, uncontrolled bleeding, or a stated pregnancy complication',
      action:
        'Stop qualifying. Return emergency guidance, advise immediate emergency care, and alert the duty doctor. No slot is offered and no payment question is asked.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Paediatric fever threshold',
      condition: 'Patient is under 5 and a fever above 38.5°C or lasting more than 48 hours is described',
      action: 'Same-day paediatric slot, duty paediatrician notified with the reported temperature and duration.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'Same-day symptom band',
      condition:
        'Acute but non-emergency presentation — fever under 48 hours, injury without deformity, acute pain rated 6 or above',
      action: 'Offer the earliest same-day slot with the matching specialty. Hold the slot for 10 minutes pending confirmation.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Returning patient continuity',
      condition: 'Phone number or name matches a patient seen in the last 18 months',
      action:
        'Route to the same clinician where the presenting complaint is related. Attach the prior visit date and the treating doctor. Do not re-ask history already on file.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Specialty mismatch',
      condition: 'The requested department does not match the described complaint',
      action:
        'Confirm the complaint in one question, then offer the correct department. Never silently rebook — state which department and why.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Corporate panel pre-authorisation',
      condition: 'Payment route is a corporate panel or TPA requiring pre-authorisation',
      action:
        'Capture employee ID and panel name before offering a slot. Route to billing for pre-auth, and mark the slot provisional until cleared.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'Insurance cashless eligibility',
      condition: 'Caller states insurance and the procedure is on the cashless list',
      action: 'Capture insurer and policy number, flag for the billing desk, and confirm the slot without delaying on paperwork.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'Geriatric slot length',
      condition: 'Patient is 65 or over, or mobility assistance is mentioned',
      action: 'Book a double-length slot and flag ground-floor consultation where the clinic has more than one level.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Routine and preventive',
      condition: 'No acute symptom — check-up, vaccination, report collection, or follow-up on a stable condition',
      action: 'Offer the next appropriate opening. No escalation, no duty-doctor notification.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Out-of-hours arrival',
      condition: 'Enquiry arrives outside consulting hours and no rule above R3 has matched',
      action:
        'Acknowledge immediately with the next available slot and an explicit reply time. Queue for the front desk at opening, ordered by arrival.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'Travel-distance realism',
      condition: 'Caller states a location more than 45 minutes from the clinic and requests a slot within the hour',
      action: 'Offer the slot but state the realistic arrival window, and hold a later alternative rather than booking a slot that will be missed.',
      priority: 11,
    },
    {
      id: 'R12',
      name: 'Repeat no-show history',
      condition: 'Patient record shows two or more no-shows in the last six months',
      action: 'Offer the slot with a confirmation requirement, and flag it to the front desk rather than auto-holding a peak-hour opening.',
      priority: 12,
    },
  ],
  routing: [
    {
      rule: 'R1',
      destination: 'Duty doctor — direct alert, plus front desk',
      acknowledge: 'Immediate',
      onNoAcknowledgement: 'Escalate to clinic manager after 2 minutes and repeat until acknowledged.',
    },
    {
      rule: 'R2',
      destination: 'Duty paediatrician',
      acknowledge: '5 minutes',
      onNoAcknowledgement: 'Escalate to clinic manager; offer the next paediatric slot at any location.',
    },
    {
      rule: 'R3',
      destination: 'Front desk — same-day queue',
      acknowledge: '15 minutes',
      onNoAcknowledgement: 'Re-notify, then escalate to the senior receptionist.',
    },
    {
      rule: 'R4',
      destination: 'Prior treating clinician’s list',
      acknowledge: '2 hours',
      onNoAcknowledgement: 'Fall back to the next available clinician in the same specialty, and say so explicitly.',
    },
    {
      rule: 'R6',
      destination: 'Billing desk — pre-authorisation queue',
      acknowledge: '4 working hours',
      onNoAcknowledgement: 'Notify the patient of the delay before they travel. Never let a provisional slot go silent.',
    },
    {
      rule: 'R9',
      destination: 'Front desk — routine queue',
      acknowledge: 'Same working day',
      onNoAcknowledgement: 'Roll into the next morning’s queue at the top.',
    },
  ],
  escalation: [
    {
      trigger: 'Red-flag symptom unacknowledged',
      threshold: '2 minutes',
      path: 'Duty doctor → clinic manager → the manager’s mobile, repeating. This path never stops on its own.',
    },
    {
      trigger: 'Same-day queue depth',
      threshold: 'More than 6 unacknowledged same-day enquiries',
      path: 'Notify the senior receptionist that same-day capacity is saturated, before more slots are promised.',
    },
    {
      trigger: 'Patient asks for a human',
      threshold: 'First request, no repetition needed',
      path: 'Stop the qualifying sequence immediately and hand to the front desk with everything captured so far attached.',
    },
    {
      trigger: 'Rule conflict at the same priority band',
      threshold: 'Any',
      path: 'Take the lower-numbered rule, log both as considered, and flag the collision for the next rule review.',
    },
  ],
  walkthrough: {
    channel: 'WhatsApp, 21:47',
    enquiry: '"my father 71 has been having chest tightness since evening, can we come tomorrow morning"',
    steps: [
      {
        at: '0s',
        decision: 'Matched R1 — red-flag symptom language',
        rule: 'R1',
        reasoning:
          '"chest tightness" is on the red-flag list. R1 sits in the top priority band, so evaluation stops here — R8 (geriatric) and R10 (out-of-hours) would otherwise both have matched.',
      },
      {
        at: '0s',
        decision: 'Suppressed the booking flow',
        rule: 'R1',
        reasoning:
          'The patient asked for tomorrow morning. Offering that slot would confirm a delay the symptom does not support, so no slot is offered and no payment question is asked.',
      },
      {
        at: '4s',
        decision: 'Returned emergency guidance and advised immediate emergency care',
        rule: 'R1',
        reasoning:
          'Guidance is fixed text approved by the clinic. The layer does not assess severity, name a likely cause, or advise on treatment — it routes to someone who can.',
      },
      {
        at: '6s',
        decision: 'Alerted the duty doctor with the message verbatim',
        rule: 'R1',
        reasoning:
          'Verbatim rather than summarised. A paraphrase of a symptom description is a clinical judgement the layer is not permitted to make.',
      },
      {
        at: '2m',
        decision: 'No acknowledgement — escalated to the clinic manager',
        rule: 'R1',
        reasoning: 'The R1 escalation path repeats until a human acknowledges. It has no give-up condition.',
      },
      {
        at: '2m 20s',
        decision: 'Acknowledged by the clinic manager; layer withdrew',
        rule: '—',
        reasoning:
          'Once a human owns the enquiry the layer stops acting and logs the handover. It does not continue messaging alongside a person.',
      },
    ],
    outcome:
      'The enquiry arrived at 21:47, well outside consulting hours, on the channel most likely to be read the next morning. A human owned it two minutes and twenty seconds later. Every decision above is in the log with the rule that produced it.',
  },
  neverDecides: [
    {
      decision: 'Whether a symptom is serious',
      why:
        'It matches described language against a clinic-approved red-flag list. That is pattern matching against a list a doctor wrote, not triage, and the distinction is the entire safety argument.',
    },
    {
      decision: 'What condition a patient may have',
      why: 'No differential, no likely cause, no reassurance. It routes to a clinician and stops.',
    },
    {
      decision: 'Whether to waive or discount a fee',
      why: 'Commercial judgement stays with the clinic. The layer captures the payment route and escalates anything unusual.',
    },
    {
      decision: 'Whether to overbook a full clinic',
      why:
        'Capacity is a human call with consequences for every patient already booked. The layer reports saturation and waits.',
    },
  ],
})
