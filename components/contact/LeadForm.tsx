'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui'
import { CONTACT } from '@/lib/constants'
import { INDUSTRY_OPTIONS, INTAKE_MAX, VOLUME_OPTIONS, leadSchema, type LeadInput } from '@/lib/lead-schema'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Set only on the static (Hostinger) build. Netlify runs the real Next server,
 * where `/api/lead` does the sending via Resend — that path stays untouched
 * and this stays unset there.
 *
 * `NEXT_PUBLIC_` because a static export has no server to read it from at
 * request time; it is inlined into the client bundle at build time instead.
 * Web3Forms' access key is designed for exactly this — it identifies where to
 * deliver a submission, not a secret that gates who can send one.
 */
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

const fieldBase =
  'focus-ring w-full rounded-xl border bg-ink px-3.5 py-3 text-[15px] text-paper placeholder:text-muted/70'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm text-loss">
      {message}
    </p>
  )
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)
  /**
   * Disabling the button stops a second click, but not a second `submit` event
   * — Enter in a field, or a programmatic requestSubmit, re-enters the handler
   * before React has re-rendered. This ref is synchronous, so it cannot be
   * outrun by state batching.
   */
  const inFlight = useRef(false)
  const baseId = useId()

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    // Validate on blur, then keep re-validating as the field changes.
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { name: '', email: '', company: '', phone: '', intake: '', website: '' },
  })

  const intakeValue = watch('intake') ?? ''

  // Move focus to the confirmation so a screen reader lands on the outcome.
  useEffect(() => {
    if (status === 'success') confirmationRef.current?.focus()
  }, [status])

  const onSubmit = handleSubmit(
    async (values) => {
      if (inFlight.current) return
      inFlight.current = true
      setServerError(null)
      setStatus('submitting')

      // Honeypot. `/api/lead` accepts and silently discards a filled value
      // server-side so a bot never learns it was caught. The static build has
      // no server to do that, so the same silent discard happens here instead
      // — this branch is taken by neither the sender nor Web3Forms.
      if (values.website) {
        setStatus('success')
        inFlight.current = false
        return
      }

      try {
        const response = WEB3FORMS_ACCESS_KEY
          ? await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `Intake audit request — ${values.company}`,
                from_name: values.name,
                email: values.email,
                replyto: values.email,
                Name: values.name,
                'Work email': values.email,
                Company: values.company,
                Phone: values.phone || '—',
                Industry: values.industry,
                'Monthly enquiry volume': values.volume,
                'What currently happens to an enquiry': values.intake || '—',
              }),
            })
          : await fetch('/api/lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            })

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string
            message?: string
          } | null
          setServerError(body?.error ?? body?.message ?? null)
          setStatus('error')
          return
        }

        if (WEB3FORMS_ACCESS_KEY) {
          const body = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null
          if (body?.success === false) {
            setServerError(body.message ?? null)
            setStatus('error')
            return
          }
        }

        setStatus('success')
      } catch {
        setServerError(null)
        setStatus('error')
      } finally {
        inFlight.current = false
      }
    },
    (invalid) => {
      // Focus the first field that failed, in document order.
      const order: (keyof LeadInput)[] = ['name', 'email', 'company', 'phone', 'industry', 'volume', 'intake']
      const first = order.find((field) => invalid[field])
      if (first) setFocus(first)
    },
  )

  if (status === 'success') {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        className="focus-ring rounded-card border border-ok/40 bg-panel p-7 sm:p-8"
      >
        <h3 className="text-xl font-semibold text-paper">Your request is with us.</h3>
        <p className="mt-4 text-[16px] leading-relaxed text-body">
          We reply within one business day. If nothing arrives, write to{' '}
          <a
            href={`mailto:${CONTACT.email}`}
            className="focus-ring rounded text-sky underline underline-offset-4"
          >
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    )
  }

  const pending = status === 'submitting' || isSubmitting

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
      className={cn(
        'space-y-5 transition-opacity duration-180',
        // Board 2a, state 03: the whole form drops to 45% and stops taking
        // input while the request is in flight. This is also the second guard
        // against a double submit — the first is the in-flight ref, which holds
        // even if a pointer event slips through.
        pending && 'pointer-events-none opacity-45',
      )}
    >
      <div>
        <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-body">
          Name
        </label>
        <input
          id={`${baseId}-name`}
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.name ? 'border-loss' : 'border-line')}
          {...register('name')}
        />
        <FieldError id={`${baseId}-name-error`} message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-body">
          Work email
        </label>
        <input
          id={`${baseId}-email`}
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.email ? 'border-loss' : 'border-line')}
          {...register('email')}
        />
        <FieldError id={`${baseId}-email-error`} message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-company`} className="block text-sm font-medium text-body">
          Company
        </label>
        <input
          id={`${baseId}-company`}
          type="text"
          autoComplete="organization"
          aria-invalid={errors.company ? 'true' : undefined}
          aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.company ? 'border-loss' : 'border-line')}
          {...register('company')}
        />
        <FieldError id={`${baseId}-company-error`} message={errors.company?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-phone`} className="block text-sm font-medium text-body">
          Phone <span className="text-muted">(optional)</span>
        </label>
        <input
          id={`${baseId}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          aria-invalid={errors.phone ? 'true' : undefined}
          aria-describedby={errors.phone ? `${baseId}-phone-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.phone ? 'border-loss' : 'border-line')}
          {...register('phone')}
        />
        <FieldError id={`${baseId}-phone-error`} message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-industry`} className="block text-sm font-medium text-body">
          Industry
        </label>
        <select
          id={`${baseId}-industry`}
          defaultValue=""
          aria-invalid={errors.industry ? 'true' : undefined}
          aria-describedby={errors.industry ? `${baseId}-industry-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.industry ? 'border-loss' : 'border-line')}
          {...register('industry')}
        >
          <option value="" disabled>
            Choose one
          </option>
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id={`${baseId}-industry-error`} message={errors.industry?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-volume`} className="block text-sm font-medium text-body">
          Monthly enquiry volume
        </label>
        <select
          id={`${baseId}-volume`}
          defaultValue=""
          aria-invalid={errors.volume ? 'true' : undefined}
          aria-describedby={errors.volume ? `${baseId}-volume-error` : undefined}
          className={cn(fieldBase, 'mt-2', errors.volume ? 'border-loss' : 'border-line')}
          {...register('volume')}
        >
          <option value="" disabled>
            Choose one
          </option>
          {VOLUME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id={`${baseId}-volume-error`} message={errors.volume?.message} />
      </div>

      <div>
        <label htmlFor={`${baseId}-intake`} className="block text-sm font-medium text-body">
          What currently happens to an enquiry after it arrives?{' '}
          <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id={`${baseId}-intake`}
          rows={4}
          maxLength={INTAKE_MAX}
          placeholder="Where does it go, who picks it up, and where does it usually stall?"
          aria-invalid={errors.intake ? 'true' : undefined}
          aria-describedby={cn(
            `${baseId}-intake-count`,
            errors.intake ? `${baseId}-intake-error` : '',
          ).trim()}
          className={cn(fieldBase, 'mt-2 resize-y', errors.intake ? 'border-loss' : 'border-line')}
          {...register('intake')}
        />
        <p id={`${baseId}-intake-count`} className="num mt-2 text-right text-xs text-muted">
          {intakeValue.length} / {INTAKE_MAX}
        </p>
        <FieldError id={`${baseId}-intake-error`} message={errors.intake?.message} />
      </div>

      {/* Honeypot. Hidden from sight, from the tab order and from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input
          id={`${baseId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {status === 'error' ? (
        <div role="alert" className="rounded-card border border-loss/40 bg-panel p-5">
          <h3 className="font-semibold text-paper">That didn&rsquo;t go through.</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-body">
            {serverError ?? (
              <>
                Try again, or email us directly at{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="focus-ring rounded text-sky underline underline-offset-4"
                >
                  {CONTACT.email}
                </a>{' '}
                and we&rsquo;ll pick it up from there.
              </>
            )}
          </p>
          {serverError ? (
            <p className="mt-2 text-[15px] leading-relaxed text-body">
              You can also email us directly at{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="focus-ring rounded text-sky underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="pt-1">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {/* Board 2a: "No spinner — the label carries it." */}
          {pending ? 'Sending…' : 'Request audit'}
        </Button>
        <p className="mt-3 text-sm text-muted">
          We reply within one business day. No newsletter, no automated sequence.
        </p>
      </div>
    </form>
  )
}
