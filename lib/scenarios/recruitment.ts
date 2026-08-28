import { assertScenarioDepth, type Scenario } from './types'

export const recruitment: Scenario = assertScenarioDepth({
  sector: 'Recruitment',
  slug: 'recruitment',
  summary:
    'Two intake streams run at once — clients raising roles and candidates applying to them — and they need opposite handling. The layer screens candidates against stated role requirements only, and is deliberately barred from inferring anything a person did not write down.',
  intakePath: [
    'Applications through job boards — Naukri, LinkedIn, Indeed',
    'Direct applications to a careers inbox',
    'WhatsApp from referred candidates',
    'Client vacancy briefs by email or call',
    'Recruiter-sourced profiles entering the same pipeline',
  ],
  rules: [
    {
      id: 'R1',
      name: 'Client vacancy brief',
      condition: 'Message is from a client raising a new role rather than a candidate applying',
      action:
        'Split from the candidate stream entirely. Capture role, seniority, budget band, location model and timeline, then route to the account owner.',
      priority: 1,
    },
    {
      id: 'R2',
      name: 'Hard eligibility',
      condition: 'Role carries a non-negotiable requirement — work authorisation, a licence, or a mandatory certification',
      action:
        'Confirm it in one direct question. A candidate who cannot legally hold the role is declined immediately, with the reason stated.',
      priority: 2,
    },
    {
      id: 'R3',
      name: 'Stated experience threshold',
      condition: 'Candidate’s stated years of relevant experience are below the role’s written minimum',
      action:
        'Decline for this role with the reason given, and offer the pipeline for roles where the threshold fits. Judged on what the candidate stated, never inferred from dates.',
      priority: 3,
    },
    {
      id: 'R4',
      name: 'Compensation alignment',
      condition: 'Candidate’s stated expectation exceeds the client’s approved band by more than 20%',
      action: 'Surface the band honestly and ask whether it remains of interest. Do not advance a candidate who will decline at offer.',
      priority: 4,
    },
    {
      id: 'R5',
      name: 'Notice period against start date',
      condition: 'Notice period extends beyond the client’s required start date',
      action: 'Capture both, flag the gap for the recruiter, and never quietly submit a candidate who cannot start on time.',
      priority: 5,
    },
    {
      id: 'R6',
      name: 'Location and work model',
      condition: 'Role is on-site or hybrid and the candidate is not within commuting distance',
      action: 'Confirm relocation intent explicitly. An assumed willingness to relocate is the most common late-stage collapse.',
      priority: 6,
    },
    {
      id: 'R7',
      name: 'Duplicate application',
      condition: 'Same candidate already in the pipeline for this role, or submitted by another agency',
      action: 'Attach to the existing record and flag ownership. Never submit the same candidate twice.',
      priority: 7,
    },
    {
      id: 'R8',
      name: 'Skill match against the written brief',
      condition: 'Candidate’s stated skills are matched against the requirements as the client wrote them',
      action:
        'Score against the written brief only. Every matched and unmatched requirement is logged, so a recruiter can see the reasoning rather than a number.',
      priority: 8,
    },
    {
      id: 'R9',
      name: 'Re-application cooling period',
      condition: 'Candidate was declined for a materially similar role within 90 days',
      action: 'Route to the original recruiter with the prior decision attached, rather than re-screening from scratch.',
      priority: 9,
    },
    {
      id: 'R10',
      name: 'Candidate withdrawal or query',
      condition: 'Message is a status question, withdrawal, or availability change rather than an application',
      action: 'Route to the owning recruiter. Never answer a status question with an automated stage name.',
      priority: 10,
    },
    {
      id: 'R11',
      name: 'High-volume posting burst',
      condition: 'More than 40 applications to one role within an hour',
      action:
        'Acknowledge every applicant with a realistic review window, then release to the recruiter in batches. Never leave an applicant with silence.',
      priority: 11,
    },
  ],
  routing: [
    {
      rule: 'R1',
      destination: 'Account owner — client queue',
      acknowledge: '1 hour',
      onNoAcknowledgement: 'Escalate to the delivery head. An unanswered vacancy brief goes to a competing agency the same day.',
    },
    {
      rule: 'R2',
      destination: 'Declined, with the reason stated to the candidate',
      acknowledge: 'Immediate',
      onNoAcknowledgement: 'Not applicable.',
    },
    {
      rule: 'R8',
      destination: 'Owning recruiter — shortlist queue, with the match breakdown attached',
      acknowledge: '1 working day',
      onNoAcknowledgement: 'Escalate to the team lead and notify the candidate of the delay.',
    },
    {
      rule: 'R5',
      destination: 'Recruiter — flagged start-date conflict',
      acknowledge: '1 working day',
      onNoAcknowledgement: 'Escalate before client submission, never after.',
    },
    {
      rule: 'R7',
      destination: 'Frozen pending an ownership decision',
      acknowledge: '4 hours',
      onNoAcknowledgement: 'Escalate to the delivery head. Ownership is never resolved automatically.',
    },
    {
      rule: 'R10',
      destination: 'Owning recruiter — candidate care',
      acknowledge: '1 working day',
      onNoAcknowledgement: 'Escalate to the team lead.',
    },
  ],
  escalation: [
    {
      trigger: 'Client vacancy brief unanswered',
      threshold: '1 hour',
      path: 'Account owner → delivery head. Client-side silence is the most expensive failure in this sector.',
    },
    {
      trigger: 'Candidate awaiting a decision',
      threshold: '5 working days',
      path: 'Notify the owning recruiter, then the team lead. A candidate left silent for a week is lost and talks about it.',
    },
    {
      trigger: 'Agency ownership disputed',
      threshold: 'Any',
      path: 'Freeze the submission and surface both claims with timestamps. The layer never adjudicates a placement fee.',
    },
    {
      trigger: 'Rule conflict at the same band',
      threshold: 'Any',
      path: 'Lower-numbered rule wins, both are logged, and the collision is flagged for the next rule review.',
    },
  ],
  walkthrough: {
    channel: 'Naukri application, Tuesday 02:14',
    enquiry:
      'Backend engineer application. Stated 4 years’ experience, expectation ₹28L, notice 90 days, based in Pune. Role: Bengaluru hybrid, 3+ years, band to ₹24L, start within 45 days.',
    steps: [
      {
        at: '0s',
        decision: 'Classified as candidate, not client brief',
        rule: 'R1',
        reasoning:
          'R1 runs first on every message because the two streams need opposite handling. This is an application, so the candidate path continues.',
      },
      {
        at: '1s',
        decision: 'Hard eligibility cleared; experience threshold met',
        rule: 'R3',
        reasoning:
          'Four stated years against a written minimum of three. Judged on what the candidate wrote, not inferred from employment dates — that inference is where screening quietly becomes discrimination.',
      },
      {
        at: '2s',
        decision: 'Compensation flagged — expectation 17% above band',
        rule: 'R4',
        reasoning:
          '₹28L against a ₹24L ceiling is inside the 20% tolerance, so this is flagged rather than declined. Outside it, the layer would have asked before advancing.',
      },
      {
        at: '3s',
        decision: 'Start-date conflict flagged',
        rule: 'R5',
        reasoning:
          '90 days’ notice against a 45-day requirement. Logged as a blocker for the recruiter to raise, never quietly submitted and discovered at offer stage.',
      },
      {
        at: '4s',
        decision: 'Relocation intent unconfirmed — asked directly',
        rule: 'R6',
        reasoning:
          'Pune-based candidate, Bengaluru hybrid role. The layer asks rather than assumes, because assumed relocation is the most common late collapse in this pipeline.',
      },
      {
        at: '6s',
        decision: 'Held pending relocation answer, with the full match breakdown attached',
        rule: 'R8',
        reasoning:
          'Two flags and one open question. The recruiter receives every matched and unmatched requirement rather than a score, so the reasoning is auditable.',
      },
    ],
    outcome:
      'An application submitted at 02:14 was acknowledged instantly, screened against the written brief only, and reached the recruiter with the compensation gap and start-date conflict already surfaced — the two things normally discovered at offer stage.',
  },
  neverDecides: [
    {
      decision: 'Whether a candidate is a good cultural fit',
      why:
        'It matches stated skills against written requirements. Fit is a human judgement, and automating it is how bias enters a pipeline at scale and stays undetected.',
    },
    {
      decision: 'Anything inferred from a name, photograph, age, gender, or institution',
      why:
        'These are not inputs. The layer reads stated skills, stated experience and stated eligibility, and the decision log proves which fields produced each outcome.',
    },
    {
      decision: 'Final rejection after the screening stage',
      why: 'Beyond hard eligibility, declines are made by a recruiter. The layer flags and holds; it does not close a candidate out.',
    },
    {
      decision: 'Placement-fee ownership in a dispute',
      why: 'It records both claims with timestamps and freezes the submission for a human.',
    },
  ],
})
