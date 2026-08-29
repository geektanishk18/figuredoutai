import type { IndustrySlug } from '@/lib/constants'
import type { IndustryDemo } from './types'

/**
 * Generated from `REG` in `design/QualifyDemo.dc.html` — the design canvas is
 * the content source of truth for the demo, and every string here is verbatim
 * from it. An earlier hand-written pass paraphrased this copy and left Hinglish
 * in the clinics script ("Namaste 🙏"), which board 1f had already retired.
 * Regenerate rather than edit.
 */

/**
 * Share of missed enquiries counted as real opportunities.
 *
 * Held at 0.30 on every vertical, and the panel says so out loud — a figure the
 * reader cannot audit is worth nothing, so the arithmetic states its own
 * assumption rather than hiding it.
 */
const CONVERSION_FACTOR = 0.3

export const INDUSTRY_DEMOS: Record<IndustrySlug, IndustryDemo> = {
  'clinics': {
    slug: 'clinics',
    label: 'Clinics',
    contact: { name: 'Ramesh Sharma', initials: 'RS', status: 'new enquiry' },
    sliders: {
      volume: { label: 'Calls a day', min: 8, max: 90, step: 1, initial: 30, format: 'count' },
      missPct: { label: 'Share that go unanswered', min: 5, max: 50, step: 1, initial: 25, format: 'percent' },
      unitValue: { label: 'Average value of a patient', min: 300, max: 3000, step: 50, initial: 700, format: 'inr' },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'enquiries',
    noun: 'patients',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'Hello 🙏 Can I get an appointment with the doctor tomorrow? My throat is very painful.', at: '9:12 AM' },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, text: 'Hello?', at: '9:41 AM' },
        { kind: 'in', wait: 1500, text: 'Until what time is the clinic open?', at: '11:05 AM' },
        { kind: 'system', wait: 1500, text: '📞 Two calls placed. Neither answered.' },
        { kind: 'system', wait: 1800, text: 'Six hours later. Still no reply.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'Hello 🙏 Can I get an appointment with the doctor tomorrow? My throat is very painful.', at: '9:12 AM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Welcome to the clinic 🙏 These slots are open tomorrow:', at: '9:12 AM', options: ['11:00 AM', '4:30 PM', '6:00 PM'] },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, text: '4:30 PM works', at: '9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Confirmed ✅ Tomorrow, 4:30 PM. Please send the patient\'s name and age.', at: '9:13 AM' },
        { kind: 'in', wait: 1100, text: 'Ramesh Sharma, for a throat consultation', at: '9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Thank you 🙏 A reminder will arrive tomorrow at 3:30 PM. Please bring any previous reports with you.', at: '9:14 AM' },
        { kind: 'system', wait: 1200, text: '✅ Routed to the front desk with the slot already held and the reason for the visit captured', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'This patient went to another clinic. Nobody at yours ever knew.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. The front desk arrived to find the appointment already booked.', status: 'appointment confirmed' },
    },
  },
  'real-estate': {
    slug: 'real-estate',
    label: 'Real estate',
    contact: { name: 'Priya Nair', initials: 'PN', status: 'new enquiry' },
    sliders: {
      volume: { label: 'Enquiries a day', min: 5, max: 60, step: 1, initial: 20, format: 'count' },
      missPct: { label: 'Share that go unanswered', min: 5, max: 50, step: 1, initial: 30, format: 'percent' },
      unitValue: { label: 'Commission on a closed deal', min: 20000, max: 300000, step: 5000, initial: 80000, format: 'inr' },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'enquiries',
    noun: 'site visits',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'Hi, I saw the 3BHK listing in Sector 78. Is it still available? Can I see it this weekend? 🙂', at: '9:12 AM' },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, text: 'Hello?', at: '9:41 AM' },
        { kind: 'in', wait: 1500, text: 'What is the asking price on that unit?', at: '11:05 AM' },
        { kind: 'system', wait: 1500, text: '📞 Two calls placed. Neither answered.' },
        { kind: 'system', wait: 1800, text: 'Six hours later. Still no reply.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'Hi, I saw the 3BHK listing in Sector 78. Is it still available? Can I see it this weekend? 🙂', at: '9:12 AM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Thanks for writing in 🙏 The Sector 78 unit is available. These site visit slots are open this weekend:', at: '9:12 AM', options: ['Sat 11:00 AM', 'Sat 4:30 PM', 'Sun 12:00 PM'] },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, text: 'Saturday 4:30 works', at: '9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Confirmed ✅ Saturday, 4:30 PM. Are you buying to live in, or as an investment?', at: '9:13 AM' },
        { kind: 'in', wait: 1100, text: 'To live in. Shifting in March, loan already approved.', at: '9:14 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Noted 🙏 Sending the floor plan and the two comparable units in the same tower.', at: '9:14 AM' },
        { kind: 'system', wait: 1200, text: '✅ Routed to the Sector 78 closing agent with intent, timeline and finance status attached', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'This buyer booked a site visit with another agent the same evening.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. The closing agent picked up a visit that was already qualified.', status: 'site visit confirmed' },
    },
  },
  restaurants: {
    slug: 'restaurants',
    label: 'Restaurants',
    contact: { name: 'Arjun Menon', initials: 'AM', status: 'new enquiry' },
    sliders: {
      volume: { label: 'Orders and bookings a day', min: 20, max: 200, step: 1, initial: 60, format: 'count' },
      missPct: { label: 'Share that go unanswered', min: 5, max: 40, step: 1, initial: 20, format: 'percent' },
      unitValue: { label: 'Average order value', min: 400, max: 4000, step: 50, initial: 1200, format: 'inr' },
    },
    workingDays: 30,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'orders and bookings',
    noun: 'covers',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'Hi, table for 6 tonight around 8:30? Also, do you deliver to Indiranagar? 🙏', at: '5:12 PM' },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, text: 'Hello?', at: '5:41 PM' },
        { kind: 'in', wait: 1500, text: 'Is 8:30 available, or should we come earlier?', at: '6:20 PM' },
        { kind: 'system', wait: 1500, text: '📞 Two calls placed. Neither answered.' },
        { kind: 'system', wait: 1800, text: 'Six hours later. Still no reply.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'Hi, table for 6 tonight around 8:30? Also, do you deliver to Indiranagar? 🙏', at: '5:12 PM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Good evening 🙏 These tables are free tonight:', at: '5:12 PM', options: ['7:45 PM', '8:30 PM', '9:15 PM'] },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, text: '8:30 PM, six of us', at: '5:13 PM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Confirmed ✅ Table for six at 8:30 PM. Any dietary requirements we should note?', at: '5:13 PM' },
        { kind: 'in', wait: 1100, text: 'One jain meal, and indoor seating please', at: '5:14 PM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Noted 🙏 Indoor table held. Delivery to Indiranagar runs until 11 PM — menu link sent.', at: '5:14 PM' },
        { kind: 'system', wait: 1200, text: '✅ Booking confirmed, dietary note routed to the kitchen, delivery question answered in the same thread', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'The table went to the restaurant that replied. Six covers, gone quietly.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. The floor manager saw a confirmed table with the dietary note attached.', status: 'table confirmed' },
    },
  },
  travel: {
    slug: 'travel',
    label: 'Travel',
    contact: { name: 'Neha Gupta', initials: 'NG', status: 'new enquiry' },
    sliders: {
      volume: { label: 'Enquiries a day', min: 5, max: 60, step: 1, initial: 18, format: 'count' },
      missPct: { label: 'Share that go unanswered', min: 5, max: 50, step: 1, initial: 30, format: 'percent' },
      unitValue: { label: 'Average booking value', min: 15000, max: 200000, step: 5000, initial: 45000, format: 'inr' },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'enquiries',
    noun: 'bookings',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'Hi, planning Bali for six nights in October, two adults. Can you share a package? 🙂', at: '9:12 AM' },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, text: 'Hello?', at: '9:41 AM' },
        { kind: 'in', wait: 1500, text: 'Do you handle the visa as well?', at: '11:05 AM' },
        { kind: 'system', wait: 1500, text: '📞 Two calls placed. Neither answered.' },
        { kind: 'system', wait: 1800, text: 'Six hours later. Still no reply.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'Hi, planning Bali for six nights in October, two adults. Can you share a package? 🙂', at: '9:12 AM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Thanks for writing in 🙏 Three October options for two adults, six nights:', at: '9:12 AM', options: ['Value', 'Mid-range', 'Premium'] },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, text: 'Mid-range looks right', at: '9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Noted ✅ Are your dates fixed, or flexible by a few days?', at: '9:13 AM' },
        { kind: 'in', wait: 1100, text: 'Flexible — first two weeks of October', at: '9:14 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Thank you 🙏 Visa support is included. Sending three dated itineraries with fares held for 48 hours.', at: '9:14 AM' },
        { kind: 'system', wait: 1200, text: '✅ Routed to the Bali desk with dates, budget band and party size already captured', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'These travellers booked through an aggregator instead. No enquiry ever closed.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. The destination desk received dates, budget band and party size already captured.', status: 'itinerary sent' },
    },
  },
  recruitment: {
    slug: 'recruitment',
    label: 'Recruitment',
    contact: { name: 'Aditya Rao', initials: 'AR', status: 'new applicant' },
    sliders: {
      volume: { label: 'Applicants a day', min: 20, max: 300, step: 1, initial: 80, format: 'count' },
      missPct: { label: 'Share left unscreened', min: 10, max: 70, step: 1, initial: 40, format: 'percent' },
      unitValue: { label: 'Placement fee', min: 30000, max: 300000, step: 5000, initial: 90000, format: 'inr' },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'applicants',
    noun: 'placements',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'Applied for the Senior Backend Engineer role this morning. Happy to share more detail.', at: 'Mon 9:12 AM' },
        { kind: 'system', wait: 1300, text: 'Automated acknowledgement sent. The application is still unread.' },
        { kind: 'system', wait: 1400, text: '— no reply —' },
        { kind: 'in', wait: 1500, text: 'Following up on my application — is there an update? 🙂', at: 'Wed 10:04 AM' },
        { kind: 'system', wait: 1500, text: 'Still unread. No screening call offered.' },
        { kind: 'system', wait: 1800, text: 'Friday. The applicant accepted another offer.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'Applied for the Senior Backend Engineer role this morning. Happy to share more detail.', at: 'Mon 9:12 AM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Thanks for applying 🙏 Three quick questions before this goes to a recruiter. What is your notice period?', at: 'Mon 9:12 AM' },
        { kind: 'in', wait: 1000, text: '30 days', at: 'Mon 9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Noted. Where are you based, and does the Bengaluru office work for you?', at: 'Mon 9:13 AM' },
        { kind: 'in', wait: 1000, text: 'Bengaluru already. In-office is fine.', at: 'Mon 9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Last one — how many years have you run Go in production?', at: 'Mon 9:14 AM' },
        { kind: 'in', wait: 1100, text: 'Four years, two of them on payments infrastructure', at: 'Mon 9:14 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 900, text: 'Thank you ✅ Scored against the role criteria. These screening slots are open with the hiring recruiter:', at: 'Mon 9:15 AM', options: ['Tue 11:00 AM', 'Tue 4:30 PM', 'Wed 12:00 PM'] },
        { kind: 'pick', wait: 1300, index: 0 },
        { kind: 'system', wait: 1200, text: '✅ Screened, scored and scheduled — with notice period, location and mandatory skill all on the record', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'Your best applicant that week was screened by a competitor first.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. The recruiter opened an inbox that had already scored and scheduled this applicant.', status: 'screening scheduled' },
    },
  },
  hvac: {
    slug: 'hvac',
    label: 'HVAC',
    contact: { name: 'Suresh Iyer', initials: 'SI', status: 'new service call' },
    sliders: {
      volume: { label: 'Service calls a day', min: 5, max: 60, step: 1, initial: 20, format: 'count' },
      missPct: { label: 'Share that go unanswered', min: 5, max: 50, step: 1, initial: 28, format: 'percent' },
      unitValue: { label: 'Average job value', min: 2000, max: 40000, step: 500, initial: 8000, format: 'inr' },
    },
    workingDays: 26,
    conversionFactor: CONVERSION_FACTOR,
    missedNoun: 'service calls',
    noun: 'jobs',
    scripts: {
      today: [
        { kind: 'in', wait: 400, text: 'The AC in our main hall has stopped cooling. Can someone come today? 🙏', at: '9:12 AM' },
        { kind: 'system', wait: 1500, text: '— no reply —' },
        { kind: 'in', wait: 1400, text: 'Hello?', at: '9:41 AM' },
        { kind: 'in', wait: 1500, text: 'Do you service Whitefield?', at: '11:05 AM' },
        { kind: 'system', wait: 1500, text: '📞 Two calls placed. Neither answered.' },
        { kind: 'system', wait: 1800, text: 'Six hours later. Still no reply.', tone: 'dead' },
        { kind: 'verdict', wait: 1400 },
      ],
      layer: [
        { kind: 'in', wait: 400, text: 'The AC in our main hall has stopped cooling. Can someone come today? 🙏', at: '9:12 AM' },
        { kind: 'typing', wait: 600 },
        { kind: 'out', wait: 900, text: 'Sorry to hear that 🙏 A technician can reach Whitefield today. These windows are open:', at: '9:12 AM', options: ['1:00 PM', '4:00 PM', '6:30 PM'] },
        { kind: 'pick', wait: 1300, index: 1 },
        { kind: 'in', wait: 500, text: '4 PM works', at: '9:13 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Confirmed ✅ Today, 4:00 PM. Is the unit under warranty or on an annual maintenance contract?', at: '9:13 AM' },
        { kind: 'in', wait: 1100, text: 'AMC, renewed in June', at: '9:14 AM' },
        { kind: 'typing', wait: 500 },
        { kind: 'out', wait: 800, text: 'Noted 🙏 Logged against the AMC, so there is no visit charge. Technician details follow shortly.', at: '9:14 AM' },
        { kind: 'system', wait: 1200, text: '✅ Job assigned and dispatched, with contract status resolved before anyone was called', tone: 'live' },
        { kind: 'verdict', wait: 900 },
      ],
    },
    verdicts: {
      today: { badge: '0', text: 'Another contractor sent a technician that afternoon. This job was never quoted.', status: 'gone' },
      layer: { badge: '4 sec', text: 'First reply. Dispatch opened a job with the warranty status already resolved.', status: 'technician dispatched' },
    },
  },
}

/** Switcher order, as the design lays the pills out. */
export const DEMO_INDUSTRY_LIST = Object.values(INDUSTRY_DEMOS)
