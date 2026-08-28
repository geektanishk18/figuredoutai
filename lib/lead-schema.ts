import { z } from 'zod'

/**
 * The single schema for an audit request. Imported by the form and re-run by the
 * Route Handler — the server never trusts that the client validated anything.
 */

export const INDUSTRY_OPTIONS = [
  'Clinics & Healthcare',
  'Real Estate',
  'Restaurants & Food',
  'Travel',
  'Recruitment & Staffing',
  'HVAC & Field Services',
  'Other',
] as const

export const VOLUME_OPTIONS = [
  'Under 200',
  '200–1,000',
  '1,000–5,000',
  '5,000+',
  'Not sure',
] as const

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Please keep this under 80 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    // Free-mail domains are accepted deliberately: many Indian SMB founders use
    // Gmail as their working address.
    .email('Please enter a valid email address.')
    .max(254, 'Please enter a valid email address.'),
  company: z
    .string()
    .trim()
    .min(2, 'Please enter your company name.')
    .max(120, 'Please keep this under 120 characters.'),
  phone: z.string().trim().max(24, 'Please keep this under 24 characters.').optional(),
  industry: z.enum(INDUSTRY_OPTIONS, { errorMap: () => ({ message: 'Please choose an industry.' }) }),
  volume: z.enum(VOLUME_OPTIONS, {
    errorMap: () => ({ message: 'Please choose a monthly enquiry volume.' }),
  }),
  intake: z.string().trim().max(1000, 'Please keep this under 1,000 characters.').optional(),
  /**
   * Honeypot. Deliberately permissive: a filled value must reach the Route
   * Handler so it can be accepted and silently discarded. Rejecting it here
   * would return a validation error, which tells the bot it was detected.
   */
  website: z.string().max(200).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

export const INTAKE_MAX = 1000
