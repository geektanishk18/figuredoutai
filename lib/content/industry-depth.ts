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


const realEstate: IndustryDepth = {
  answer:
    'Portal leads are paid for twice — once to the portal, and again in the sales time spent on enquiries that were never going to convert. A decision layer establishes budget and finance readiness before anyone gives up a Saturday, deduplicates the same buyer arriving through three portals, and books the site visit while the enquiry is still warm.',

  flowChannels: [
    'Portal leads, each portal its own inbox',
    'Campaign forms, arriving in bursts',
    'WhatsApp, often after hours',
    'Channel-partner referrals',
  ],
  flowCriteria: 'Budget, finance readiness, configuration fit and stated visit intent',
  flowOutcomes: [
    { state: 'escalated', label: 'To a person', destination: 'visit-ready, with budget and finance already established' },
    { state: 'held', label: 'Held', destination: 'nurtured against a possession timeline that does not match yet' },
    { state: 'lost', label: 'Closed', destination: 'answered, with the reason recorded' },
  ],
  flowCaption:
    'Leads arrive from portals, campaigns and referrals, are deduplicated across sources, and are qualified on budget and finance before a site visit is offered. Sales opens an enquiry that has already been established rather than one that still has to be.',

  criteria: [
    {
      title: 'Budget, stated not guessed',
      body: 'The layer establishes a budget band by asking, and records what was said. It does not estimate affordability from a locality, a phone number or a name.',
    },
    {
      title: 'Finance readiness',
      body: 'Whether a loan is approved, in progress or not started changes what happens next more than almost anything else, and it is asked on first contact.',
    },
    {
      title: 'The same buyer, three times',
      body: 'One person enquiring through three portals is one enquiry. Duplicates are matched and merged before three sales people call the same buyer.',
    },
    {
      title: 'Timeline honesty',
      body: 'A buyer whose timeline does not match your possession date is held and nurtured rather than pushed at a site visit that will not convert.',
    },
  ],

  comparison: [
    { dimension: 'A portal lead at 11pm', chatbot: 'Waits for the office to open', layer: 'Responds immediately, on the portal the lead arrived through' },
    { dimension: 'The same buyer, three portals', chatbot: 'Three separate conversations', layer: 'Matched and merged into one, with the source recorded' },
    { dimension: 'Budget', chatbot: 'Not asked, or asked and ignored', layer: 'Established on first contact and attached to the record' },
    { dimension: 'A Saturday site visit', chatbot: 'Booked for anyone who asks', layer: 'Booked once budget and finance readiness are established' },
  ],

  depth: [
    {
      summary: 'Why the layer refuses to score anyone on how serious they sound',
      meta: 'Fairness',
      body: [
        'The most tempting rule to write in residential property is also the one this system will not carry: grading an enquiry on tone, on how the message is written, on the locality it came from, or on how serious the buyer seems. Those signals correlate with things a business must not sort on, and they are wrong often enough to be expensive on their own terms.',
        'So qualification runs on what the buyer states — budget band, finance position, configuration, timeline — and on nothing that was inferred about them. A terse three-word message from someone with an approved loan outranks a long enthusiastic one from someone who has not started. That is a deliberate constraint, and it is the reason the routing holds up when a sales manager reviews it.',
      ],
    },
    {
      summary: 'How the same buyer arriving through three portals is handled',
      meta: 'Deduplication',
      body: [
        'A buyer who fills in the same form on three portals is one buyer, but every portal delivers to its own inbox and each looks like a fresh lead. Three sales people then call the same person within an hour, which is the fastest way to make a serious buyer stop answering.',
        'The layer matches incoming enquiries against what is already in the pipeline and merges them into a single record, keeping every source attached rather than discarding the later ones. Attribution is preserved because it decides commission, and commission disputes are the reason deduplication usually does not get built. Merging does not resolve attribution — it records the facts and leaves the dispute to a human.',
      ],
    },
    {
      summary: 'What happens when nobody acknowledges a routed lead',
      meta: 'Escalation',
      body: [
        'Every routed lead has a named owner and a window in which that owner is expected to acknowledge it. The windows differ by what was routed — the point is that one exists at all, because a lead handed to a shared inbox nobody is accountable for is not meaningfully different from a lead nobody bought.',
        'If the window passes, the lead escalates along a path defined in advance rather than sitting where it was left, and the escalation records that the first owner did not respond. Over a few weeks that record tells you which sources are being worked and which are being paid for and ignored, which is usually not what the team believes.',
      ],
    },
    {
      summary: 'What the sales team can change, and what it can see',
      meta: 'Control',
      body: [
        'The rule set is written in your language rather than in code, because the people who should be changing it are the ones who qualify buyers today. Moving a budget floor, or changing which configuration routes to which sales person, is an edit to a document the layer then follows.',
        'Every decision is logged with the rule that produced it, and every human override against the decision it replaced. Override patterns are the most useful signal here: when sales consistently overrules the layer on a particular kind of enquiry, the written rule and the actual judgement have come apart, and that is visible before anyone thinks to raise it.',
      ],
    },
  ],
}

const restaurants: IndustryDepth = {
  answer:
    'A restaurant’s enquiries peak in exactly the hour when every member of staff is already on the floor. A decision layer answers the phone and the DMs during service, holds tables against real capacity rather than against optimism, and passes anything with money or allergy risk attached to a person immediately.',

  flowChannels: [
    'Phone, during service',
    'WhatsApp and Instagram DMs',
    'Reservation widget and Google messages',
    'Large-party and private-dining email',
  ],
  flowCriteria: 'Covers, timing against real capacity, occasion, and whether allergy or money is involved',
  flowOutcomes: [
    { state: 'escalated', label: 'To the floor', destination: 'allergies, large parties, events, anything with money attached' },
    { state: 'held', label: 'Held', destination: 'waitlisted against a peak window, with an alternative time offered' },
    { state: 'lost', label: 'Closed', destination: 'answered outright — hours, location, the wait' },
  ],
  flowCaption:
    'Enquiries arrive on four channels and are qualified on covers and timing against real capacity. Routine bookings are confirmed outright; allergies, large parties and anything commercial go to the floor with the details already captured.',

  criteria: [
    {
      title: 'Covers against real capacity',
      body: 'A table is held against what the floor can actually seat at that time, not against an optimistic guess that produces a queue at the door.',
    },
    {
      title: 'Allergies go to a person',
      body: 'Any stated allergy or dietary restriction is captured verbatim and handed to a human. The layer never answers whether a dish is safe.',
    },
    {
      title: 'Large parties and events',
      body: 'Groups above your threshold and private-dining enquiries carry money and coordination, so they route to whoever owns them rather than being confirmed automatically.',
    },
    {
      title: 'The routine questions',
      body: 'Hours, location, parking, the current wait, whether you take walk-ins — answered immediately, every time, without occupying anyone on the floor.',
    },
  ],

  comparison: [
    { dimension: 'Friday, 8pm', chatbot: 'Answers the widget; the phone still rings out', layer: 'Answers phone, DMs and widget at the same standard' },
    { dimension: 'A stated allergy', chatbot: 'Replies from a menu it was given', layer: 'Captures it verbatim and hands it to a person' },
    { dimension: 'A table for fourteen', chatbot: 'Confirms it', layer: 'Routes it to whoever owns large parties' },
    { dimension: 'A full service', chatbot: 'Books anyway', layer: 'Offers a real alternative time and records the demand' },
  ],

  depth: [
    {
      summary: 'Why an allergy is never answered by the layer',
      meta: 'Safety',
      body: [
        'The layer captures a stated allergy or dietary restriction exactly as it was written and routes it to a person. It does not check it against the menu, does not confirm a dish is safe, and does not reassure. That boundary is absolute, and it is the reason this is safe to put in front of guests at all.',
        'The reason is not caution for its own sake. Whether a dish is safe depends on the kitchen that night — substitutions, shared equipment, what actually went into a sauce — and none of that is knowable from a menu document. A system confident enough to answer would be confidently wrong on the night it mattered.',
      ],
    },
    {
      summary: 'How a table is held against capacity rather than against optimism',
      meta: 'Capacity',
      body: [
        'The layer books against what the floor can genuinely seat in a given window, and when that window is full it says so and offers a real alternative rather than confirming a table that will become a queue at the door. Overbooking is a human call with consequences for every guest already seated, so the layer reports saturation and waits.',
        'What it does instead is record the demand it could not take. Over a few weeks that becomes the most honest picture of covers you could not serve — including the enquiries that never became a booking and therefore never appeared in any report.',
      ],
    },
    {
      summary: 'What happens when nobody picks up a routed enquiry during service',
      meta: 'Escalation',
      body: [
        'Every routed enquiry has an owner and a window in which it is expected to be acknowledged, which matters more here than almost anywhere: the busiest hour is exactly when a routed message is most likely to be seen, intended to be answered, and forgotten.',
        'If the window passes, the enquiry escalates along a path set in advance rather than sitting in a queue, and the escalation records that the first owner did not respond. That record tends to show that the gap is not indifference but load, which is a different problem with a different fix.',
      ],
    },
    {
      summary: 'What the restaurant can change, and what it can see',
      meta: 'Control',
      body: [
        'Your thresholds are yours: what counts as a large party, which windows are protected, how far ahead a table can be held, what routes to the floor rather than being confirmed. These are written in plain language and changed without touching code, because the people who know them are on the floor rather than at a keyboard.',
        'Every decision is logged with the rule behind it, and every override against the decision it replaced. When the floor keeps overriding the same rule, the written threshold and the real one have drifted apart — usually because the restaurant changed and the document did not.',
      ],
    },
  ],
}

const travel: IndustryDepth = {
  answer:
    'A proper travel quote takes hours to build, so the first reply is usually a holding message — and the enquiry cools before the itinerary arrives. A decision layer captures dates, party composition and budget on first contact, so a consultant starts from a brief rather than from a conversation, and anyone already travelling is treated as a separate class of urgent.',

  flowChannels: [
    'WhatsApp, frequently mid-trip',
    'Website forms with partial dates',
    'Instagram DMs from campaigns',
    'Phone, evenings and weekends',
  ],
  flowCriteria: 'Travel dates, party composition, budget band, and whether the traveller is already away',
  flowOutcomes: [
    { state: 'escalated', label: 'To a consultant', destination: 'anyone already travelling, and anything with a date pressing' },
    { state: 'held', label: 'Held', destination: 'dates still open — nurtured until they firm up' },
    { state: 'lost', label: 'Closed', destination: 'destination not served, answered with a reason' },
  ],
  flowCaption:
    'Enquiries arrive on four channels and are qualified on dates, party and budget before an itinerary is built. A traveller already away is escalated immediately; everything else reaches a consultant as a brief rather than as an opening question.',

  criteria: [
    {
      title: 'Someone already travelling',
      body: 'A traveller mid-trip with a problem is a different class of enquiry from someone planning one, and is escalated to a person immediately rather than qualified.',
    },
    {
      title: 'Dates, even approximate',
      body: 'Fixed dates, a flexible window, or nothing yet — each changes what a consultant should do next, so it is established before anything is built.',
    },
    {
      title: 'Party composition',
      body: 'Who is travelling — adults, children, ages, a group — determines the itinerary more than the destination does, and is captured on first contact.',
    },
    {
      title: 'Budget, stated as a band',
      body: 'A band rather than a number, asked directly. It is the difference between a quotation and a conversation, and guessing it wastes the consultant’s day.',
    },
  ],

  comparison: [
    { dimension: 'An enquiry at 11pm', chatbot: 'Sends a holding message', layer: 'Captures dates, party and budget while the intent is live' },
    { dimension: 'A traveller stuck abroad', chatbot: 'Queues it with everything else', layer: 'Escalates it immediately as its own class' },
    { dimension: 'What the consultant opens', chatbot: 'A transcript to read', layer: 'A brief with dates, party and budget already established' },
    { dimension: 'A destination you do not serve', chatbot: 'Improvises an answer', layer: 'Says so, with a reason, and closes the enquiry honestly' },
  ],

  depth: [
    {
      summary: 'Why someone already travelling is handled before anything else',
      meta: 'Urgency',
      body: [
        'A traveller mid-trip with a problem is not a lead, and treating them as one is how a repeat client becomes a former one. The layer recognises that an enquiry is coming from someone already away and escalates it to a person immediately, without qualifying, without asking about budget, and without offering anything.',
        'It also does not attempt to solve the problem. Rebooking a stranded traveller, paying for a hotel, deciding what the company will absorb — those are commercial decisions with real money attached and they stay with a consultant. The layer’s job is to make sure the message reaches one in minutes rather than in the morning.',
      ],
    },
    {
      summary: 'Why dates and budget are established before an itinerary exists',
      meta: 'Qualification',
      body: [
        'Building a proper itinerary is hours of work, and the enquiry that prompted it is often gone by the time it is ready. The expensive failure is not a slow reply — it is a detailed reply built on assumptions, sent to someone whose dates never worked, whose party was different, or whose budget was half what was assumed.',
        'So dates, party composition and a budget band are established on first contact, in the channel the enquiry arrived through, while the traveller is still paying attention. A consultant then starts from a brief. That does not make the itinerary faster to build; it makes it the right one to build.',
      ],
    },
    {
      summary: 'What happens when nobody acknowledges a routed enquiry',
      meta: 'Escalation',
      body: [
        'Every routed enquiry carries an owner and a window in which that owner is expected to acknowledge it, and enquiries from someone already travelling carry the shortest. The windows differ by what was routed; what matters is that one exists, because a high-value enquiry sitting in a shared inbox is indistinguishable from one that was never received.',
        'When a window passes, the enquiry escalates along a path defined in advance and the escalation records that the first owner did not respond. Across a season that record shows which kinds of enquiry consistently wait — usually the ones that take the most work to answer, which are also the ones worth the most.',
      ],
    },
    {
      summary: 'What the agency can change, and what it can see',
      meta: 'Control',
      body: [
        'Which destinations you serve, what budget bands mean for your business, how far ahead a departure counts as imminent, which consultant owns which region — all written in plain language and changed without code, because these change with the season and with who is on the team.',
        'Every decision is logged with the rule behind it and every override against the decision it replaced. Override patterns show where the written rules and the consultants’ judgement have come apart, which in travel is usually a destination or a season the rules were written before.',
      ],
    },
  ],
}

const recruitment: IndustryDepth = {
  answer:
    'Recruitment runs two intake streams at once — clients raising roles and candidates applying to them — and they need opposite handling. A decision layer screens candidates against the written requirements of the role and nothing else, routes client briefs to a recruiter as a brief rather than a voicemail, and is deliberately barred from inferring anything the applicant did not write down.',

  flowChannels: [
    'Job-board applications',
    'Direct applications to a careers inbox',
    'WhatsApp from referred candidates',
    'Client vacancy briefs, by email or call',
  ],
  flowCriteria: 'Stated eligibility, written experience, compensation alignment and notice period',
  flowOutcomes: [
    { state: 'escalated', label: 'To a recruiter', destination: 'shortlisted against the brief, or anything the rules do not cover' },
    { state: 'held', label: 'Held', destination: 'strong but outside a stated band — revisited at shortlist' },
    { state: 'lost', label: 'Closed', destination: 'declined with a written reason, sent to the candidate' },
  ],
  flowCaption:
    'Applications and client briefs enter the same pipeline and are separated on arrival. Candidates are screened against the role’s written requirements only; a recruiter opens a shortlist rather than an inbox, and every declined applicant gets a reason.',

  criteria: [
    {
      title: 'The written brief, and only that',
      body: 'Screening runs against the requirements the client actually wrote down. If a criterion is not in the brief, it is not applied — and if it should be, the brief is what changes.',
    },
    {
      title: 'Non-negotiable criteria first',
      body: 'Work authorisation, mandatory certification, licence requirements — the criteria that are binary and non-negotiable are checked before anything subjective is considered.',
    },
    {
      title: 'Compensation and notice',
      body: 'Two facts that end more processes at offer stage than any skills gap, established at application rather than discovered in week four.',
    },
    {
      title: 'Everyone gets an answer',
      body: 'A declined application is closed with a written reason rather than left in silence. Ghosting applicants is the most common failure in this industry and the easiest to fix.',
    },
  ],

  comparison: [
    { dimension: 'A weekend application', chatbot: 'Auto-acknowledges and files it', layer: 'Screens against the brief and shortlists before Monday' },
    { dimension: 'A client raising a role', chatbot: 'Treats it as another message', layer: 'Recognises it as a brief and routes it as one' },
    { dimension: 'A declined applicant', chatbot: 'Hears nothing', layer: 'Gets a written reason, every time' },
    { dimension: 'What a recruiter opens', chatbot: 'An inbox of applications', layer: 'A shortlist, with the reason each candidate is on it' },
  ],

  depth: [
    {
      summary: 'What the layer is barred from inferring, and why that is written into it',
      meta: 'Fairness',
      body: [
        'The layer screens against what a candidate stated and against the role’s written requirements. It is explicitly barred from inferring anything from a name, a photograph, an age, a gender, or the institution someone attended — not weighted lower, not used as a tiebreak, barred.',
        'This is a constraint rather than a feature, and it is the right one for two separate reasons. Those signals are proxies for characteristics it is unlawful and wrong to sort on. They are also poor predictors: a screening system that leans on them is worse at finding people who can do the job, which is the thing the client is paying for. The prohibition is in the rule set, it is reviewable, and a decision log makes it auditable rather than merely claimed.',
      ],
    },
    {
      summary: 'How two opposite intake streams share one pipeline',
      meta: 'Routing',
      body: [
        'A client raising a vacancy and a candidate applying to one arrive through overlapping channels and need almost opposite handling. A client brief is a commercial conversation that should reach a named recruiter quickly and in full. An application is a screening decision that should be made consistently against a written standard.',
        'The layer separates the two on the first message and handles each on its own path. Getting this wrong in either direction is expensive: a client brief screened like an application is an insult, and an application handled like a client conversation is an inconsistency that shows up later as a process nobody can defend.',
      ],
    },
    {
      summary: 'Why the layer never makes the final rejection',
      meta: 'Boundary',
      body: [
        'The layer can decline an application that fails a hard, stated, binary criterion — no work authorisation for a role that requires it, no mandatory licence. It does not make the final rejection after screening, and it does not decide that a shortlisted candidate is not right.',
        'That call involves judgement about a person’s livelihood, and it stays with a recruiter who can be asked to explain it. What the layer guarantees instead is that the decision is made — a candidate parked indefinitely is the outcome this industry defaults to, and it is worse for everyone than a clear no.',
      ],
    },
    {
      summary: 'What the agency can change, and what it can see',
      meta: 'Control',
      body: [
        'Screening thresholds, which criteria are hard and which are preferences, how re-applications are handled, which recruiter owns which client — written in plain language and changed without code, because they differ per client and sometimes per role.',
        'Every screening decision is logged with the criterion that produced it, and every recruiter override against the decision it replaced. Override patterns here are unusually informative: they show where a client’s written brief and their real requirements disagree, which is a conversation worth having with the client rather than a rule worth quietly bending.',
      ],
    },
  ],
}

const hvac: IndustryDepth = {
  answer:
    'Breakdowns and quotations arrive in the same inbox and need opposite speeds — and during a heatwave the phone saturates exactly when a breakdown matters most. A decision layer separates the two on the first message, treats safety risk as its own class, and books an engineer against your real schedule without ever diagnosing the fault itself.',

  flowChannels: [
    'Phone, saturated during a heatwave',
    'WhatsApp with photographs and error codes',
    'AMC clients messaging their coordinator',
    'Website form for installations and quotes',
  ],
  flowCriteria: 'Safety risk, breakdown against quotation, contract entitlement and site type',
  flowOutcomes: [
    { state: 'escalated', label: 'To a person', destination: 'any safety risk, and anything the rules do not cover' },
    { state: 'held', label: 'Held', destination: 'quotation work, scheduled against real availability' },
    { state: 'lost', label: 'Closed', destination: 'outside the service area, answered with a reason' },
  ],
  flowCaption:
    'Breakdowns, quotations and contract calls arrive together and are separated on the first message. Safety risk is escalated to a person immediately; everything else is booked or scheduled against real engineer availability rather than against a guess.',

  criteria: [
    {
      title: 'Safety risk is its own class',
      body: 'Gas smell, electrical burning, water ingress near power — recognised from stated language and escalated to a person immediately, ahead of every other rule.',
    },
    {
      title: 'Breakdown or quotation',
      body: 'A unit that has failed and a new installation enquiry need opposite speeds. Separating them on the first message is most of the value.',
    },
    {
      title: 'Contract entitlement',
      body: 'Whether a caller is on an AMC, in warranty, or neither changes both the response and who pays — established before an engineer is dispatched.',
    },
    {
      title: 'Real availability',
      body: 'Appointments are booked against the schedule engineers are actually on, so a promised slot is one that exists.',
    },
  ],

  comparison: [
    { dimension: 'A heatwave Monday', chatbot: 'Answers the web form; the phone stays engaged', layer: 'Answers every channel at the same standard' },
    { dimension: 'A photograph of an error code', chatbot: 'Guesses at the fault', layer: 'Captures it, attaches it to the job, and does not diagnose' },
    { dimension: 'A breakdown and a quote request', chatbot: 'Same queue, same speed', layer: 'Separated on arrival and given opposite speeds' },
    { dimension: 'An AMC client', chatbot: 'Treated as a new caller', layer: 'Recognised, with entitlement established before dispatch' },
  ],

  depth: [
    {
      summary: 'Why the layer never says what is wrong with the unit',
      meta: 'Boundary',
      body: [
        'The layer captures what the customer described, including photographs and error codes, and attaches all of it to the job. It does not diagnose the fault, does not estimate the repair, and does not tell anyone whether something is safe to attempt. An engineer diagnoses; the layer makes sure the engineer arrives with what the customer already said.',
        'A confident wrong diagnosis is worse than none. It sends the wrong engineer with the wrong part, or it reassures someone about a fault that needed the power turned off. The one thing the layer does act on is stated language indicating a safety risk — and what it does then is stop and escalate, which is the opposite of diagnosing.',
      ],
    },
    {
      summary: 'How breakdowns and quotations are separated on the first message',
      meta: 'Routing',
      body: [
        'A failed unit in July and a quotation for a new installation arrive through the same channels and need opposite handling. A breakdown is an emergency with a customer sitting in the heat; a quotation is a commercial conversation that can properly take a day. Handled at the same speed, one is too slow and the other is wasted urgency.',
        'The layer separates them on the first message and routes each on its own path with its own expectations. Most of the value in this vertical is in that single distinction being made immediately and consistently, rather than by whoever happens to answer.',
      ],
    },
    {
      summary: 'What happens when nobody acknowledges a dispatched job',
      meta: 'Escalation',
      body: [
        'Every routed job has a named owner and a window in which it is expected to be acknowledged, and safety-flagged jobs carry the shortest. The windows differ by what was routed; what matters is that one exists, because during a peak-load week the jobs most likely to be missed are the ones arriving fastest.',
        'When a window passes the job escalates along a path defined in advance, and the escalation records that the first owner did not respond. Across a season that record shows where capacity actually breaks — which is usually a specific hour of a specific kind of day rather than a general shortage of engineers.',
      ],
    },
    {
      summary: 'What the business can change, and what it can see',
      meta: 'Control',
      body: [
        'Your service-area boundary, what counts as a safety flag, how AMC and warranty entitlement are established, which engineer or team owns which site type — written in plain language and changed without code, because these move as the business takes on new contracts.',
        'Every decision is logged with the rule behind it and every override against the decision it replaced. Override patterns show where the written rules and the coordinators’ judgement disagree — frequently around what counts as urgent, which is worth settling in the document rather than differently on every call.',
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
  'real-estate': realEstate,
  restaurants,
  travel,
  recruitment,
  hvac,
}
