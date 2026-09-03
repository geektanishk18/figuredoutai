import type { FaqItem } from '@/components/content/Faq'
import type { IndustrySlug } from '@/lib/constants'

/**
 * Per-vertical questions, written to be retrieved rather than browsed.
 *
 * Three constraints shape every answer here:
 *
 * 1. Self-contained. An answer engine quotes a passage away from its page,
 *    so an answer that leans on the paragraph above it arrives meaningless.
 *    Each one names its own subject and resolves in 40–60 words.
 * 2. Only claims the site can stand behind. No volumes, no response times,
 *    no outcome figures, no client work — the proof policy forbids inventing
 *    them, and an AI system cross-checking a fabricated number against other
 *    sources finds nothing and discounts the whole page.
 * 3. "Chatbot" appears only as the contrast — the category the market was
 *    sold — never as a description of what we build.
 *
 * The questions are phrased the way a buyer in that vertical would actually
 * type them, because that is the string a retrieval system matches against.
 */
export const INDUSTRY_FAQS: Record<IndustrySlug, readonly FaqItem[]> = {
  clinics: [
    {
      question: 'How do you handle patient calls a clinic misses?',
      answer:
        'A decision layer answers every enquiry the moment it arrives, on WhatsApp, phone or web form, whether or not the front desk is free. It captures what the patient needs, sorts by described urgency, and books against the clinic’s real availability rather than taking a message for someone to return later.',
    },
    {
      question: 'Can patients book clinic appointments over WhatsApp?',
      answer:
        'Yes. WhatsApp is where most Indian clinic enquiries already arrive, so the qualification layer works there directly. It asks what the appointment is for, checks the clinic’s own rules on urgency and specialty, and confirms a slot — without a receptionist reading and replying to each message by hand.',
    },
    {
      question: 'Does an AI receptionist decide anything medical?',
      answer:
        'No. It sorts on what the patient describes — stated urgency, which specialty fits, how they intend to pay — and hands anything clinical to a clinician. Assessing symptoms is practising medicine; the layer is built to route the enquiry to the person qualified to do that, not to replace them.',
    },
    {
      question: 'What makes this different from a clinic chatbot?',
      answer:
        'A chatbot answers the question it was asked and leaves the judgement to a human, so someone still reads every transcript to decide who matters. A decision layer applies the clinic’s own criteria to each enquiry and routes it — the front desk sees appointments and escalations, not a queue of conversations.',
    },
  ],
  'real-estate': [
    {
      question: 'How do you qualify property buyers automatically?',
      answer:
        'The layer asks what actually determines fit — budget, intent, timeline, financing route — before anyone from the agency spends time on the enquiry. Answers are read against the agency’s own criteria, so a serious buyer reaches an agent with context attached and an unqualified one is handled without taking up a call.',
    },
    {
      question: 'Can this respond to portal leads faster than an agent can?',
      answer:
        'Portal leads are paid for and then usually won by whoever replies first. A decision layer responds immediately, at any hour, and starts qualifying while the enquiry is still warm — rather than waiting for an agent between site visits to work through a list of names.',
    },
    {
      question: 'Does it book site visits, or just collect details?',
      answer:
        'It books them. Once an enquiry meets the criteria the agency has defined, the layer moves to scheduling against real availability rather than passing a lead record to someone else to chase. Enquiries that do not meet those criteria are answered and closed without occupying an agent’s day.',
    },
    {
      question: 'Who decides what counts as a qualified property lead?',
      answer:
        'You do. The qualification rules are yours — written from your criteria during the logic design phase, documented, and changeable afterwards as configuration rather than code. The layer applies them consistently; it does not improvise its own view of which buyers are worth pursuing.',
    },
  ],
  restaurants: [
    {
      question: 'How does a restaurant stop missing booking calls?',
      answer:
        'Enquiry volume peaks exactly when the floor is busiest, which is when calls go unanswered. A decision layer takes every booking request as it arrives, checks it against real table capacity, and holds or declines it — instead of a voicemail nobody returns before the guest books elsewhere.',
    },
    {
      question: 'Can it handle bookings and general enquiries together?',
      answer:
        'Yes. Requests arrive mixed — a table for tonight, a large group next month, a question about the menu — and the layer sorts them by what each one needs. Bookings are held against capacity; anything requiring a decision from the floor is passed on with the details already gathered.',
    },
    {
      question: 'What happens when the restaurant is fully booked?',
      answer:
        'The layer works from real capacity, so it does not confirm a table that does not exist. A request it cannot hold is answered honestly at the moment it arrives, with whatever alternative the restaurant’s rules allow — rather than being accepted and then unwound by a call the next morning.',
    },
  ],
  travel: [
    {
      question: 'How do you automate a travel enquiry response?',
      answer:
        'A proper itinerary quote takes hours, so the first reply is usually a holding message. A decision layer instead captures what a quote actually needs — dates, group size, budget, destination — on first contact, so the operator starts from a brief rather than from a name and a phone number.',
    },
    {
      question: 'Can it qualify travel leads before a consultant is involved?',
      answer:
        'That is the point of it. The layer asks what the operator’s own criteria require and sorts enquiries on the answers, so consultants spend their hours building itineraries for travellers who have stated a real budget and real dates, rather than on enquiries that were never going to convert.',
    },
    {
      question: 'Does it replace the travel consultant who builds the itinerary?',
      answer:
        'No. Building an itinerary is judgement work and stays with your consultants. What changes is what reaches them: a qualified enquiry with the brief already gathered, instead of an inbox where the qualifying conversation still has to happen before any planning can start.',
    },
  ],
  recruitment: [
    {
      question: 'How do you automate candidate screening?',
      answer:
        'One opening can draw hundreds of applications, and the strongest candidates accept elsewhere while a recruiter is still reading. A decision layer screens every applicant against the same written criteria as they apply, so shortlisting starts immediately rather than after someone works down a queue.',
    },
    {
      question: 'Is every applicant screened against the same standard?',
      answer:
        'Yes — that is what makes it different from screening by hand. The criteria are documented before launch and applied identically to the first application and the four-hundredth, regardless of when it arrived or who would otherwise have picked it up.',
    },
    {
      question: 'Can a recruiter overrule a screening decision?',
      answer:
        'Always. Every decision is logged with the reasoning that produced it, and any outcome can be overridden by a person. Escalation paths are defined before the system goes live rather than added after a disagreement, so there is a route for the cases the rules did not anticipate.',
    },
    {
      question: 'What happens to candidates who do not meet the criteria?',
      answer:
        'They get an answer. Applicants who do not qualify are handled by the layer without occupying a recruiter, and the record of why is kept and reviewable — rather than the common outcome, where an application is neither progressed nor replied to and the candidate hears nothing at all.',
    },
  ],
  hvac: [
    {
      question: 'How does an HVAC company stop missing service calls?',
      answer:
        'The people qualified to answer a technical call are usually on a job when it comes in. A decision layer answers immediately, scopes what has actually failed, and dispatches or schedules accordingly — so an urgent call is triaged when it arrives rather than returned hours later.',
    },
    {
      question: 'Can it tell an emergency from a routine service request?',
      answer:
        'It sorts on what the caller describes, against the urgency rules your business has defined — what counts as an emergency, what can wait for the next scheduled visit, what needs a specific technician. Those rules are yours, written during logic design and changeable afterwards.',
    },
    {
      question: 'Does it dispatch the right technician for the fault?',
      answer:
        'It routes on the fault as described and on the rules you have set about who handles what. The enquiry reaches the technician with the scoping already done, instead of arriving as a callback request that someone has to work through before any dispatch decision can be made.',
    },
  ],
}
