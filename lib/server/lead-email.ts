import 'server-only'
import type { LeadInput } from '@/lib/lead-schema'

/**
 * Builds the notification email for an audit request.
 *
 * Kept as a pure function so the subject, reply-to and body can be verified
 * without sending anything. The destination address is read from the
 * environment and never hard-coded, so it cannot leak into a client bundle. The
 * sending address is required for the same reason it is not defaulted: an
 * unverified sender is rejected by Resend, which loses the lead silently.
 */

function istTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date)
}

export interface LeadEmail {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
}

export function buildLeadEmail(lead: LeadInput, now: Date = new Date()): LeadEmail {
  const to = process.env.LEAD_DELIVERY_EMAIL
  if (!to) throw new Error('LEAD_DELIVERY_EMAIL is not configured')

  // Required, never defaulted. A fallback sender here is silent failure: Resend
  // rejects any send from an address outside a verified domain, so a wrong
  // default loses leads without surfacing an error anywhere.
  const from = process.env.LEAD_FROM_EMAIL
  if (!from) throw new Error('LEAD_FROM_EMAIL is not configured')

  const lines = [
    `Name:              ${lead.name}`,
    `Work email:        ${lead.email}`,
    `Company:           ${lead.company}`,
    `Phone:             ${lead.phone?.length ? lead.phone : '— not provided —'}`,
    `Industry:          ${lead.industry}`,
    `Monthly volume:    ${lead.volume}`,
    '',
    'What currently happens to an enquiry after it arrives?',
    lead.intake?.length ? lead.intake : '— not provided —',
    '',
    `Submitted:         ${istTimestamp(now)} IST`,
  ]

  return {
    from,
    to,
    replyTo: lead.email,
    subject: `Audit request — ${lead.company} (${lead.industry}, ${lead.volume})`,
    text: lines.join('\n'),
  }
}
