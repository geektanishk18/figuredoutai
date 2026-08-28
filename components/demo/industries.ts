import type { IndustrySlug } from '@/lib/constants'
import type { IndustryDemo } from './types'

/**
 * Every industry keeps `conversionFactor` at 0.30. The page says so out loud —
 * a consistent, deliberately low assumption is what makes the figure arguable
 * rather than promotional.
 */
const CONVERSION_FACTOR = 0.3

const LAYER_VERDICT_BADGE = '4 sec'

export const INDUSTRY_DEMOS: Record<IndustrySlug, IndustryDemo> = {
  'medical-clinics': {
    slug: 'medical-clinics',
    label: 'Medical Clinics',
    contact: { name: 'Ramesh Sharma', initials: 'RS', status: 'new patient' },
    sliders: {
      volume: { label: 'Calls a day', min: 8, max: 90, step: 1, initial: 30, format: 'count' },
      missPct: { label: 'Missed', min: 5, max: 50, step: 1, initial: 25, format: 'percent' },
      unitValue: {
        label: 'Average value of a patient',
        min: 300,
        max: 3000,
        step: 50,
        initial: 700,
        format: 'inr',
      },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    metrics: { missedLabel: 'calls missed each month', outcomeLabel: 'patients who never arrive' },
    unitNoun: 'per visit',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '9:12 AM',
          text: 'Namaste 🙏 Can I get an appointment with the doctor tomorrow? Severe throat pain.',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, at: '9:41 AM', text: 'Hello?' },
        { kind: 'in', wait: 1500, at: '11:05 AM', text: 'Until what time is the clinic open?' },
        { kind: 'system', wait: 1500, text: '📞 2 calls placed — neither answered' },
        { kind: 'system', wait: 1800, text: 'Six hours on — still no reply', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '9:12 AM',
          text: 'Namaste 🙏 Can I get an appointment with the doctor tomorrow? Severe throat pain.',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '9:12 AM',
          text: 'Namaste 🙏 Dr. Mehta has these slots free tomorrow:',
          options: ['11:00 AM', '4:30 PM', '6:00 PM'],
        },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, at: '9:13 AM', text: '4:30 PM works' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '9:13 AM',
          text: 'Confirmed ✅ Tomorrow, 4:30 PM. Please send the patient name and age.',
        },
        { kind: 'in', wait: 1100, at: '9:13 AM', text: 'Ramesh Sharma, 54' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '9:14 AM',
          text: 'Thank you 🙏 A reminder will reach you at 3:30 PM tomorrow. Please bring any earlier reports.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Booked and passed to the front desk with the symptom noted',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'This patient booked at another clinic. Nobody at the clinic ever knew.',
        status: 'went elsewhere',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. The receptionist arrived to an appointment already booked.',
        status: 'appointment confirmed',
      },
    },
  },

  'real-estate': {
    slug: 'real-estate',
    label: 'Real Estate',
    contact: { name: 'Priya Nair', initials: 'PN', status: 'portal enquiry' },
    sliders: {
      volume: { label: 'Enquiries a day', min: 5, max: 60, step: 1, initial: 20, format: 'count' },
      missPct: { label: 'Missed', min: 5, max: 50, step: 1, initial: 30, format: 'percent' },
      unitValue: {
        label: 'Commission on a closing',
        min: 20000,
        max: 300000,
        step: 5000,
        initial: 80000,
        format: 'inr',
      },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    metrics: {
      missedLabel: 'enquiries missed each month',
      outcomeLabel: 'site visits that never happen',
    },
    unitNoun: 'per closing',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '10:04 AM',
          text: 'Hi, I saw the 3BHK in Powai on the portal. Is it still available?',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, at: '10:38 AM', text: 'What is the asking price?' },
        { kind: 'in', wait: 1500, at: '12:15 PM', text: 'Could I see it this weekend?' },
        { kind: 'system', wait: 1500, text: '📞 1 call placed — went to voicemail' },
        { kind: 'system', wait: 1800, text: 'Next morning — still no reply', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '10:04 AM',
          text: 'Hi, I saw the 3BHK in Powai on the portal. Is it still available?',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '10:04 AM',
          text: 'It is available. What would be most useful first?',
          options: ['Book a site visit', 'Price and payment plan', 'Floor plan'],
        },
        { kind: 'pick', wait: 1300, index: 0 },
        { kind: 'in', wait: 500, at: '10:05 AM', text: 'Book a site visit' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '10:05 AM',
          text: 'Saturday has slots open. Are you buying to live in it, or as an investment?',
        },
        {
          kind: 'in',
          wait: 1100,
          at: '10:06 AM',
          text: 'To live in. We need possession within three months.',
        },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '10:06 AM',
          text: 'Noted. Saturday 11:00 AM is held with Anjali from the Powai team.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Routed to Anjali — end user, three-month possession, visit booked',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'She booked a viewing with the broker who replied first. That enquiry was already paid for.',
        status: 'gone quiet',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. Anjali opened a qualified buyer, not a form submission.',
        status: 'site visit booked',
      },
    },
  },

  restaurants: {
    slug: 'restaurants',
    label: 'Restaurants',
    contact: { name: 'Arjun Desai', initials: 'AD', status: 'table enquiry' },
    sliders: {
      volume: {
        label: 'Orders and bookings a day',
        min: 20,
        max: 200,
        step: 1,
        initial: 60,
        format: 'count',
      },
      missPct: { label: 'Missed', min: 5, max: 40, step: 1, initial: 20, format: 'percent' },
      unitValue: {
        label: 'Average order value',
        min: 400,
        max: 4000,
        step: 100,
        initial: 1200,
        format: 'inr',
      },
    },
    workingDays: 30,
    conversionFactor: CONVERSION_FACTOR,
    metrics: {
      missedLabel: 'orders and bookings missed each month',
      outcomeLabel: 'covers that never sit down',
    },
    unitNoun: 'per order',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '6:40 PM',
          text: 'Do you have a table for 6 tonight at 8:30?',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, at: '7:02 PM', text: 'Is outdoor seating available?' },
        { kind: 'in', wait: 1500, at: '7:35 PM', text: 'Never mind, we will try somewhere else.' },
        { kind: 'system', wait: 1500, text: '📞 2 calls placed — line busy both times' },
        { kind: 'system', wait: 1800, text: '8:30 PM — the table stayed empty', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '6:40 PM',
          text: 'Do you have a table for 6 tonight at 8:30?',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '6:40 PM',
          text: 'We can seat 6 at 8:30 PM. Where would you prefer?',
          options: ['Outdoor deck', 'Indoor, air-conditioned', 'Either is fine'],
        },
        { kind: 'pick', wait: 1300, index: 0 },
        { kind: 'in', wait: 500, at: '6:41 PM', text: 'Outdoor deck' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '6:41 PM',
          text: 'Held ✅ Table for 6, 8:30 PM, outdoor deck. Any occasion we should prepare for?',
        },
        { kind: 'in', wait: 1100, at: '6:42 PM', text: 'A birthday. Can you arrange a cake?' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '6:42 PM',
          text: 'Arranged. The cake reaches the table at 9:15 PM. Your reference is TD-4471.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Table held and passed to the floor manager with the cake note',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'Six covers walked to the restaurant that picked up. On a Friday, that repeats all evening.',
        status: 'booked elsewhere',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. The floor manager got a table plan, not a voicemail.',
        status: 'table confirmed',
      },
    },
  },

  travel: {
    slug: 'travel',
    label: 'Travel',
    contact: { name: 'Meera Iyer', initials: 'MI', status: 'package enquiry' },
    sliders: {
      volume: { label: 'Enquiries a day', min: 5, max: 60, step: 1, initial: 18, format: 'count' },
      missPct: { label: 'Missed', min: 5, max: 50, step: 1, initial: 30, format: 'percent' },
      unitValue: {
        label: 'Average booking value',
        min: 15000,
        max: 200000,
        step: 5000,
        initial: 45000,
        format: 'inr',
      },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    metrics: {
      missedLabel: 'enquiries missed each month',
      outcomeLabel: 'bookings that go elsewhere',
    },
    unitNoun: 'per booking',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '11:20 AM',
          text: 'Hello, we want a 6-night Kerala package for 4 people in December.',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        {
          kind: 'in',
          wait: 1400,
          at: '3:45 PM',
          text: 'Any update? We are deciding by Friday.',
        },
        { kind: 'in', wait: 1500, at: 'Next day, 10:10 AM', text: 'Hello?' },
        { kind: 'system', wait: 1500, text: '📞 1 call placed — no answer' },
        { kind: 'system', wait: 1800, text: 'Two days on — no itinerary sent', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '11:20 AM',
          text: 'Hello, we want a 6-night Kerala package for 4 people in December.',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '11:20 AM',
          text: 'December is peak season, so availability moves quickly. What matters most to you?',
          options: ['Backwaters and houseboat', 'Hill stations', 'Beach and Ayurveda'],
        },
        { kind: 'pick', wait: 1300, index: 0 },
        { kind: 'in', wait: 500, at: '11:21 AM', text: 'Backwaters and houseboat' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '11:21 AM',
          text: 'Is this 2 adults and 2 children, and what budget per person should I plan against?',
        },
        {
          kind: 'in',
          wait: 1100,
          at: '11:23 AM',
          text: '2 adults, 2 children aged 9 and 12. Around ₹40,000 each.',
        },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '11:23 AM',
          text: 'That fits a 6-night Alleppey and Munnar plan. A draft itinerary reaches you within the hour.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Routed to the Kerala desk — dates, group and budget already captured',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'She booked with the operator who answered the same morning. December does not wait.',
        status: 'booked elsewhere',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. The consultant started at the itinerary, not at the questions.',
        status: 'itinerary in progress',
      },
    },
  },

  recruitment: {
    slug: 'recruitment',
    label: 'Recruitment',
    contact: { name: 'Sandeep Kulkarni', initials: 'SK', status: 'applicant' },
    sliders: {
      volume: {
        label: 'Applicants a day',
        min: 20,
        max: 300,
        step: 1,
        initial: 80,
        format: 'count',
      },
      missPct: { label: 'Left unscreened', min: 10, max: 70, step: 1, initial: 40, format: 'percent' },
      unitValue: {
        label: 'Fee on a placement',
        min: 30000,
        max: 300000,
        step: 5000,
        initial: 90000,
        format: 'inr',
      },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    metrics: {
      missedLabel: 'applications left unscreened each month',
      outcomeLabel: 'placements that never close',
    },
    unitNoun: 'per placement',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '9:05 AM',
          text: 'Applying for the Field Sales Executive role in Pune. 3 years in the same territory.',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        {
          kind: 'in',
          wait: 1400,
          at: 'Day 3, 9:05 AM',
          text: 'Just checking whether my application was received.',
        },
        { kind: 'system', wait: 1500, text: '412 applications sitting in the inbox this week' },
        {
          kind: 'system',
          wait: 1800,
          text: 'Day 6 — he accepted an offer elsewhere',
          tone: 'dead',
        },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '9:05 AM',
          text: 'Applying for the Field Sales Executive role in Pune. 3 years in the same territory.',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '9:05 AM',
          text: 'Thanks for applying. Two quick questions. Which describes your experience?',
          options: ['Field sales, 2+ years', 'Inside sales only', 'Fresher'],
        },
        { kind: 'pick', wait: 1300, index: 0 },
        { kind: 'in', wait: 500, at: '9:06 AM', text: 'Field sales, 2+ years' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '9:06 AM',
          text: 'Do you have a two-wheeler and a valid licence, and how soon could you join?',
        },
        { kind: 'in', wait: 1100, at: '9:07 AM', text: 'Yes to both. I can join in three weeks.' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '9:07 AM',
          text: 'You meet the brief. A recruiter will call you today between 4 and 6 PM.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Qualified against your rules and routed to the Pune hiring manager',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'He met the brief. Nobody reached his application before the other offer arrived.',
        status: 'accepted elsewhere',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. The recruiter opened a shortlist, not an inbox.',
        status: 'screened and routed',
      },
    },
  },

  hvac: {
    slug: 'hvac',
    label: 'HVAC',
    contact: { name: 'Vikram Rao', initials: 'VR', status: 'service request' },
    sliders: {
      volume: {
        label: 'Service calls a day',
        min: 5,
        max: 60,
        step: 1,
        initial: 20,
        format: 'count',
      },
      missPct: { label: 'Missed', min: 5, max: 50, step: 1, initial: 28, format: 'percent' },
      unitValue: {
        label: 'Average job value',
        min: 2000,
        max: 40000,
        step: 500,
        initial: 8000,
        format: 'inr',
      },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    metrics: {
      missedLabel: 'service calls missed each month',
      outcomeLabel: 'jobs that go to another vendor',
    },
    unitNoun: 'per job',
    scripts: {
      today: [
        {
          kind: 'in',
          wait: 400,
          at: '8:50 AM',
          text: 'Our office AC has stopped cooling. Can someone come today?',
        },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, at: '11:30 AM', text: 'It is getting unbearable. Any update?' },
        { kind: 'in', wait: 1500, at: '1:15 PM', text: 'Should I call someone else?' },
        { kind: 'system', wait: 1500, text: '📞 3 calls placed — none answered' },
        {
          kind: 'system',
          wait: 1800,
          text: 'By evening the job had gone to another vendor',
          tone: 'dead',
        },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        {
          kind: 'in',
          wait: 400,
          at: '8:50 AM',
          text: 'Our office AC has stopped cooling. Can someone come today?',
        },
        { kind: 'typing', wait: 600 },
        {
          kind: 'out',
          wait: 900,
          at: '8:50 AM',
          text: 'Sorry to hear that. Which kind of system is it?',
          options: ['Split AC', 'Window AC', 'Central / VRF'],
        },
        { kind: 'pick', wait: 1300, index: 2 },
        { kind: 'in', wait: 500, at: '8:51 AM', text: 'Central / VRF' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '8:51 AM',
          text: 'Understood. Is the site under an active AMC, and how many units are affected?',
        },
        { kind: 'in', wait: 1100, at: '8:52 AM', text: 'No AMC. Four units on the second floor.' },
        { kind: 'typing', wait: 500 },
        {
          kind: 'out',
          wait: 800,
          at: '8:52 AM',
          text: 'A senior technician can reach you between 12 and 2 PM today. Holding that slot now.',
        },
        {
          kind: 'system',
          wait: 1200,
          text: '✅ Routed to the VRF team — four units, no AMC, same-day slot held',
          tone: 'live',
        },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: {
        badge: '0',
        text: 'An urgent, high-value job went to whoever answered the phone first.',
        status: 'lost to another vendor',
      },
      layer: {
        badge: LAYER_VERDICT_BADGE,
        text: 'First reply in four seconds. Dispatch received a scoped job, not a callback request.',
        status: 'technician dispatched',
      },
    },
  },
}

export const DEMO_INDUSTRY_LIST = Object.values(INDUSTRY_DEMOS)
