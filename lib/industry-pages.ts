import type { IndustrySlug } from './constants'

export interface IndustryPageMeta {
  /** Page <title>. Unique per industry. */
  title: string
  description: string
  /** H1 — states this industry's failure, not a generic category name. */
  heading: string
  lede: string
  /**
   * The industry as a noun that reads correctly mid-sentence. Lower-casing the
   * label does not work — "HVAC" is an acronym and becomes "hvac".
   */
  sentenceNoun: string
}

export const INDUSTRY_PAGES: Record<IndustrySlug, IndustryPageMeta> = {
  clinics: {
    title: 'Decision Layer for Clinics',
    description:
      'Clinic calls arrive while the front desk is with a patient. A decision layer answers, triages by urgency and books the right clinician.',
    /* Board 1c. The sky emphasis falls on "picked up" — one word per headline. */
    heading: 'The patient chose you. Then nobody picked up.',
    lede:
      'A clinic’s enquiries arrive on WhatsApp and on the phone, all day, from people who have already decided where they want to go. The system answers every one of them at the same standard, and the front desk only sees what still needs a person.',
    sentenceNoun: 'clinic',
  },
  'real-estate': {
    title: 'Decision Layer for Real Estate',
    description:
      'Portal leads are paid for, then lost to whoever replies first. A decision layer qualifies intent, budget and timeline, and books the site visit.',
    heading: 'The enquiry you already paid for, answered by someone else.',
    lede: 'In residential property, speed of first response decides who gets the site visit — not price, not inventory, and not the quality of the pitch.',
    sentenceNoun: 'property',
  },
  restaurants: {
    title: 'Decision Layer for Restaurants',
    description:
      'Enquiry volume peaks when nobody can answer it. A decision layer holds tables against real capacity and passes requests to the floor.',
    heading: 'The table that stayed empty because the line was busy.',
    lede: 'A restaurant’s enquiry volume is concentrated into the hours when every member of staff is already on the floor.',
    sentenceNoun: 'restaurant',
  },
  travel: {
    title: 'Decision Layer for Travel Operators',
    description:
      'A proper quote takes hours, so the first reply is usually a placeholder. A decision layer captures dates, group and budget on first contact.',
    heading: 'The itinerary request that cooled before the quote arrived.',
    lede: 'Travel enquiries are high-value, time-sensitive and expensive to answer properly. That combination is exactly why most of them wait.',
    sentenceNoun: 'travel',
  },
  recruitment: {
    title: 'Decision Layer for Recruitment',
    description:
      'One opening draws hundreds of applications and the best candidates leave first. A decision layer screens every one against the same criteria.',
    /* Board 2b. The sky emphasis falls on "Thursday". */
    heading: 'They applied on Monday. Someone read it on Thursday.',
    lede:
      'Applications arrive in volume, from people who have already chosen to work for you. The layer screens every one against the role’s criteria at the same standard, and a recruiter only opens what still needs judgement.',
    sentenceNoun: 'hiring',
  },
  hvac: {
    title: 'Decision Layer for HVAC & Field Services',
    description:
      'The people qualified to answer technical calls are on a roof. A decision layer scopes the fault and dispatches the right technician.',
    heading: 'The urgent job that went to whoever picked up.',
    lede: 'Field service has a structural problem with its own phone: enquiries arrive during working hours precisely because that is when equipment fails.',
    sentenceNoun: 'HVAC',
  },
}
