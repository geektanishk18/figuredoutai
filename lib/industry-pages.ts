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
  'medical-clinics': {
    title: 'Decision Layer for Medical Clinics',
    description:
      'Clinic calls arrive while the front desk is with a patient. A decision layer answers, triages by urgency and books the right clinician.',
    heading: 'The patients who called while your front desk was busy.',
    lede: 'Clinics do not lose enquiries through indifference. They lose them because the person who answers the phone is also checking in a patient, taking a payment and finding a file.',
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
    heading: 'Four hundred applications, and the good ones leave first.',
    lede: 'Recruitment has the opposite of a demand problem. The constraint sits entirely on the screening side, and it decides who you actually get to hire.',
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
