import { z } from 'zod'
import { industryOpts } from '@/lib/content/industry-opts'
import { registryRows } from '@/lib/content/registry-rows'
import { volumeOpts } from '@/lib/content/volume-opts'

/**
 * The single schema for an audit request. Imported by the form and re-run by the
 * Route Handler — the server never trusts that the client validated anything.
 */

/**
 * The vertical registry drives the industry pages and this select from one
 * place. These lists were previously retyped here, and had already drifted —
 * the form offered "Clinics & Healthcare" and "HVAC & Field Services" while the
 * registry and the whole of the rest of the site said "Clinics" and "HVAC", so
 * a lead arrived labelled with a category no page used.
 */
export const INDUSTRY_OPTIONS = industryOpts
export const VOLUME_OPTIONS = volumeOpts

/**
 * The select is the registry plus "Other". If a vertical is added to the
 * canvas and this list is not regenerated, the build fails here rather than
 * shipping a form that cannot describe one of the industries the site sells.
 */
const _registryCoversTheSelect: true =
  (INDUSTRY_OPTIONS.length === registryRows.length + 1) as true
void _registryCoversTheSelect

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
