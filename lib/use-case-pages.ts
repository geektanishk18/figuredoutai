export interface UseCasePage {
  slug: string; title: string; description: string; eyebrow: string; heading: string; lede: string;
  directAnswer: string; problem: string; steps: readonly string[]; benefits: readonly string[];
  fit: string; limitations: string;
  faqs: readonly { question: string; answer: string }[];
  related: readonly { label: string; href: string }[];
}

/** Answer-led buyer pages. Benefits are intended outcomes, not performance guarantees. */
export const USE_CASE_PAGES = [
  {
    slug: 'whatsapp-lead-qualification',
    title: 'WhatsApp Lead Qualification Automation',
    description: 'Qualify inbound WhatsApp enquiries with structured questions, lead scoring, routing and human hand-off based on your business rules.',
    eyebrow: 'WhatsApp lead qualification',
    heading: 'Turn WhatsApp enquiries into qualified next steps.',
    lede: 'Design a consistent intake workflow for the channel where your prospects already start conversations.',
    directAnswer: 'WhatsApp lead qualification automation is a workflow that asks inbound prospects relevant questions, records their answers, assesses fit against agreed criteria and routes each enquiry to a person or next step.',
    problem: 'A shared inbox can turn into unread messages, repeated questions and incomplete hand-offs. Replying quickly helps, but does not tell the team which enquiry matters, whether it fits or who owns the next action.',
    steps: [
      'Capture available enquiry source and conversation context through the approved integration.',
      'Ask only the missing qualification questions agreed with your team, such as requirement, location, budget range or timing where relevant.',
      'Apply documented fit, priority and escalation rules. Do not guess when information is missing.',
      'Send a structured summary to the right owner or system, with a human review path for ambiguous cases.'
    ],
    benefits: ['More consistent first-response and qualification steps.', 'Less manual copying of answers from chat into spreadsheets or a CRM.', 'Clearer follow-up ownership and visibility into why an enquiry was prioritised.'],
    fit: 'Best for businesses with meaningful WhatsApp enquiry volume, repeatable qualification questions and clear routing rules.',
    limitations: 'This does not generate demand. A production setup depends on approved WhatsApp Business Platform access, provider capabilities, messaging policies, consent and integration testing.',
    faqs: [
      { question: 'What is WhatsApp lead qualification automation?', answer: 'It asks inbound WhatsApp prospects relevant questions, structures their answers, checks fit against agreed rules and routes the enquiry to an appropriate next step.' },
      { question: 'Can it qualify leads before a salesperson replies?', answer: 'Yes, after the approved integration and flow are deployed. It can collect initial details and prepare a summary; exceptions should be escalated rather than guessed.' },
      { question: 'Does this require WhatsApp Business Platform?', answer: 'A production workflow usually needs an approved WhatsApp Business Platform provider or supported integration. The correct setup depends on your number, provider and use case.' },
      { question: 'Will it replace our sales team?', answer: 'No. It handles repeatable intake and routing so people can focus on negotiation, relationship-building and judgement.' }
    ],
    related: [{label:'Inbound lead intake',href:'/use-cases/inbound-lead-intake'},{label:'CRM and AI integration',href:'/use-cases/crm-ai-integration'},{label:'Real estate workflows',href:'/industries/real-estate'}]
  },
  {
    slug: 'ai-voice-receptionist',
    title: 'AI Voice Receptionist and Call Qualification',
    description: 'Plan an AI voice receptionist to capture caller needs, qualify inbound calls and route or escalate requests with clear human fallback.',
    eyebrow: 'AI voice receptionist',
    heading: 'Give every inbound call a clear next step.',
    lede: 'Design a first layer for routine call intake without pretending the system is human or asking it to handle situations outside its scope.',
    directAnswer: 'An AI voice receptionist is a voice-based intake system that answers or assists with incoming calls, identifies the caller’s reason for contacting a business, collects required details and routes the call or summary to the appropriate person or workflow.',
    problem: 'Calls arrive while teams are serving customers or handling other calls. Missed calls can mean lost context and delayed follow-up. A useful voice workflow needs transparent disclosure, sensible limits and a reliable route to a person.',
    steps: [
      'Define supported call types, business hours, AI disclosure and situations requiring immediate human transfer.',
      'Use a short question flow to capture the caller’s reason, urgency and relevant details.',
      'Connect call outcomes to booking, ticketing, CRM or notifications only after access and integration scope are confirmed.',
      'Provide a clear fallback for low confidence, complaints, sensitive requests or callers asking for a person.'
    ],
    benefits: ['A consistent first step for routine inbound calls.', 'Structured call summaries that reduce repeated explanation at hand-off.', 'Clearer escalation paths for urgent or unresolved requests.'],
    fit: 'Consider voice automation when calls follow repeatable intake patterns and your team can provide a reliable human fallback.',
    limitations: 'Do not use unsupervised automation for high-stakes clinical, legal or financial judgement. Validate telephony, consent and recording rules, emergency handling, language coverage and transfer behaviour for the deployment location.',
    faqs: [
      { question: 'What can an AI voice receptionist do?', answer: 'It can disclose that it is an AI, identify call intent, collect agreed details, answer approved routine questions and route or escalate using configured rules.' },
      { question: 'Can it book appointments?', answer: 'It can when connected to an appropriate booking or calendar system and configured with availability, confirmation and failure-handling rules.' },
      { question: 'What if it does not understand the caller?', answer: 'It should ask for clarification within limits, preserve what is known and transfer or arrange human follow-up instead of inventing an answer.' },
      { question: 'Is FiguredoutAI already connected to my phone system?', answer: 'A live deployment depends on the selected telephony provider, permissions, call flows and testing. Integration must be scoped and verified before it is described as live.' }
    ],
    related: [{label:'Inbound lead intake',href:'/use-cases/inbound-lead-intake'},{label:'Clinic intake workflows',href:'/industries/clinics'},{label:'How implementation works',href:'/how-it-works'}]
  },
  {
    slug: 'sales-workflow-automation',
    title: 'AI Sales Workflow Automation',
    description: 'Automate repeatable sales operations from enquiry capture and qualification to routing, follow-up tasks and authorised CRM updates.',
    eyebrow: 'Sales workflow automation',
    heading: 'Automate the hand-offs between enquiry and sales action.',
    lede: 'Connect intake, qualification, ownership and follow-up into one process with explicit rules for exceptions and human decisions.',
    directAnswer: 'AI sales workflow automation combines workflow rules and AI-assisted interpretation to capture enquiries, qualify them against business criteria, assign ownership, prepare follow-ups and update connected systems when authorised.',
    problem: 'A form arrives, a message is forwarded, a spreadsheet is updated and a reminder is forgotten. App connections move information, but a dependable sales process also defines fit, ownership, exceptions and the next action.',
    steps: [
      'Map lead sources, qualification fields, owners, stages and current failure points.',
      'Define deterministic rules for required fields, assignment and status changes; use AI for language interpretation where useful.',
      'Connect only authorised systems and log important decisions and failures.',
      'Add human approval for sensitive actions and monitor exceptions before expanding automation.'
    ],
    benefits: ['Fewer manual hand-offs and repeated data-entry steps.', 'More consistent assignment and follow-up ownership.', 'A clearer record of what happened to an enquiry and why.'],
    fit: 'Useful for teams with recurring sales processes, multiple lead sources, clear ownership rules and enough volume that manual coordination creates delays.',
    limitations: 'Automation cannot compensate for an undefined sales process, poor source data or a lack of demand. Agree the rules and simplify the process before adding integrations.',
    faqs: [
      { question: 'What is AI sales workflow automation?', answer: 'It uses workflow rules and AI-assisted steps to move an enquiry through qualification, assignment, follow-up preparation and authorised system updates.' },
      { question: 'Which sales tasks should be automated first?', answer: 'Start with frequent, rules-based work with a clear owner and measurable failure mode, such as required-field checks, lead assignment or follow-up reminders.' },
      { question: 'Can AI make sales decisions automatically?', answer: 'AI can assist with interpretation and prioritisation, but consequential decisions should use agreed rules, confidence thresholds and human escalation paths.' },
      { question: 'How is this different from connecting apps?', answer: 'App connections move data. A well-designed workflow also defines the conditions, ownership, exceptions and next action for that data.' }
    ],
    related: [{label:'Inbound lead intake',href:'/use-cases/inbound-lead-intake'},{label:'CRM and AI integration',href:'/use-cases/crm-ai-integration'},{label:'Systems portfolio',href:'/systems'}]
  },
  {
    slug: 'inbound-lead-intake',
    title: 'Inbound Lead Intake and Qualification',
    description: 'Capture enquiries from supported channels, ask qualification questions, score fit and route each lead with source and context preserved.',
    eyebrow: 'Inbound lead intake',
    heading: 'Give every inbound enquiry a defined next step.',
    lede: 'Standardise how web, messaging and phone enquiries are captured, qualified and handed to the right person.',
    directAnswer: 'Inbound lead intake automation receives enquiries from supported channels, captures structured details, asks missing qualification questions, applies agreed routing rules and hands the result to a person or connected business system.',
    problem: 'When each channel is handled differently, teams lose source attribution, repeat questions and struggle to tell which enquiries need attention first.',
    steps: [
      'Map supported channels and preserve source, timestamp and available context.',
      'Agree what counts as qualified, disqualified, urgent or incomplete.',
      'Collect missing details through an appropriate conversational or form-based flow.',
      'Route a structured summary to the right owner and record the decision, escalating ambiguous cases.'
    ],
    benefits: ['A consistent intake process across supported channels.', 'Better context at hand-off and fewer repeated questions.', 'More useful reporting on source, status, routing and unresolved enquiries.'],
    fit: 'Best when inbound demand already exists, qualification criteria can be defined and each enquiry type has a clear next action.',
    limitations: 'It does not create leads or fix an offer that does not convert. Confirm channel integrations, data permissions, retention and consent before launch.',
    faqs: [
      { question: 'What is inbound lead intake automation?', answer: 'It captures inbound enquiries, collects details needed to assess fit, preserves source context and routes each enquiry to the right next step.' },
      { question: 'Which channels can it support?', answer: 'Depending on available integrations, it may support website forms, chat, WhatsApp, email or phone. Each channel must be configured and tested before it is described as live.' },
      { question: 'How is a lead qualified?', answer: 'The business defines criteria such as need, fit, geography, budget range, urgency or timing. The workflow asks for missing information and escalates uncertain cases.' },
      { question: 'Can we see where each lead came from?', answer: 'Yes, if source is captured at the entry point and carried through the workflow into reporting or CRM fields.' }
    ],
    related: [{label:'WhatsApp lead qualification',href:'/use-cases/whatsapp-lead-qualification'},{label:'AI voice receptionist',href:'/use-cases/ai-voice-receptionist'},{label:'Industries served',href:'/industries'}]
  },
  {
    slug: 'crm-ai-integration',
    title: 'CRM and AI Workflow Integration',
    description: 'Connect AI-assisted lead qualification to CRM workflows with structured fields, ownership rules, activity logging and exception handling.',
    eyebrow: 'CRM and AI integration',
    heading: 'Make your CRM reflect what happened to each lead.',
    lede: 'Connect qualification decisions to the records and next actions your sales team actually uses, with explicit permissions and error handling.',
    directAnswer: 'CRM and AI integration connects an AI-assisted workflow to a customer relationship management system so it can create or update authorised records, map qualification answers to fields, assign ownership and log the next action with context.',
    problem: 'When qualification lives in a separate inbox or transcript, CRM records stay incomplete or stale. Teams repeat questions, lose source context and work from inconsistent lead statuses.',
    steps: [
      'Review CRM objects, fields, lifecycle stages, permissions and existing automations.',
      'Define permitted reads and writes, duplicate detection and behaviour when data is missing.',
      'Map qualification answers to structured fields and log source, routing and activity context.',
      'Log failed updates, retry safely and send ambiguous record matches for human review.'
    ],
    benefits: ['More consistent CRM records after intake and qualification.', 'Less manual re-entry of answers already captured.', 'Better traceability from source enquiry to owner, status and next action.'],
    fit: 'A good fit when a team already uses a CRM, has agreed field definitions and ownership rules, and can provide integration access.',
    limitations: 'Do not let AI overwrite important records without permissions, validation and recovery. Clean up inconsistent field definitions before automating writes.',
    faqs: [
      { question: 'Can AI update our CRM automatically?', answer: 'Yes, when the CRM integration supports the actions and the business has authorised them. Field mapping, duplicate detection and error handling should be tested first.' },
      { question: 'Which CRMs can be connected?', answer: 'Options depend on the CRM API, connector, plan and permissions. Confirm the specific system and actions before promising a connection.' },
      { question: 'How do you prevent duplicate leads?', answer: 'Compare approved identifiers and existing records before creating a lead. Uncertain matches should go to review rather than being merged blindly.' },
      { question: 'Will the CRM show the lead source?', answer: 'It can when source is captured at intake and mapped to an appropriate CRM field or activity.' }
    ],
    related: [{label:'Sales workflow automation',href:'/use-cases/sales-workflow-automation'},{label:'Inbound lead intake',href:'/use-cases/inbound-lead-intake'},{label:'Services and implementation',href:'/services'}]
  }
] as const satisfies readonly UseCasePage[]

export function getUseCasePage(slug: string): UseCasePage | undefined {
  return USE_CASE_PAGES.find((page) => page.slug === slug)
}
