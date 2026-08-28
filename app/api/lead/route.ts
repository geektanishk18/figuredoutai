import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { leadSchema } from '@/lib/lead-schema'
import { buildLeadEmail } from '@/lib/server/lead-email'
import { rateLimit } from '@/lib/server/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Configuration health check. Reports what is missing without ever echoing a
 * secret — only whether each variable is present. Development only.
 */
export async function GET() {
  if (!isDev) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const apiKey = process.env.RESEND_API_KEY ?? ''
  return NextResponse.json({
    resendApiKey: apiKey
      ? apiKey.startsWith('re_')
        ? 'set'
        : 'set but does not look like a Resend key (should start with re_)'
      : 'MISSING — paste it into .env.local',
    leadDeliveryEmail: process.env.LEAD_DELIVERY_EMAIL ?? 'MISSING',
    leadFromEmail: process.env.LEAD_FROM_EMAIL ?? 'MISSING — must be an address on a Resend-verified domain',
    ready: Boolean(apiKey && process.env.LEAD_DELIVERY_EMAIL && process.env.LEAD_FROM_EMAIL),
  })
}

/** One generic message for every failure. Nothing internal reaches the client. */
const GENERIC_ERROR = { error: 'We could not process that request.' }

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(GENERIC_ERROR, { status: 400 })
  }

  // Never trust the client's validation — re-run the same schema here.
  const parsed = leadSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Some details were missing or invalid.' }, { status: 400 })
  }

  const lead = parsed.data

  // Honeypot: accept the request, do nothing with it, tell the bot nothing.
  if (lead.website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const limit = rateLimit(clientIp(request))
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          'That is a few too many requests in a short time. Please wait a few minutes, or email us at hello@figuredoutai.com.',
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error(
      '[lead] RESEND_API_KEY is not set. Paste a key from https://resend.com/api-keys into .env.local, then restart the server.',
    )
    return NextResponse.json(
      isDev
        ? { error: 'Email is not configured yet: RESEND_API_KEY is missing from .env.local.' }
        : GENERIC_ERROR,
      { status: 500 },
    )
  }

  // The sender must be an address on a Resend-verified domain. Checked here
  // rather than left to throw, so a form that is deliberately not yet wired up
  // reports that plainly instead of surfacing as a generic 500.
  const from = process.env.LEAD_FROM_EMAIL
  if (!from) {
    console.error(
      '[lead] LEAD_FROM_EMAIL is not set. Lead delivery is paused until a sender on a Resend-verified domain is configured.',
    )
    return NextResponse.json(
      isDev
        ? { error: 'Lead delivery is paused: LEAD_FROM_EMAIL is not configured.' }
        : GENERIC_ERROR,
      { status: 503 },
    )
  }

  try {
    const email = buildLeadEmail(lead)
    const { error } = await new Resend(apiKey).emails.send({
      from: email.from,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
    })

    if (error) {
      // Log the provider's failure, never the submission itself.
      console.error(`[lead] Resend rejected the send — ${error.name}: ${error.message}`)
      if (/domain/i.test(error.message)) {
        console.error(
          '[lead] The sending domain in LEAD_FROM_EMAIL must be verified at https://resend.com/domains',
        )
      }
      return NextResponse.json(
        // In development, surface the provider's reason so it is fixable.
        isDev ? { error: `Email provider rejected the send: ${error.message}` } : GENERIC_ERROR,
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (cause) {
    console.error('[lead] unexpected failure:', cause instanceof Error ? cause.name : 'unknown')
    return NextResponse.json(GENERIC_ERROR, { status: 500 })
  }
}
