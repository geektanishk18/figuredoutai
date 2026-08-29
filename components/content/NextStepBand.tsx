import { Button } from '@/components/ui'
import { nextStepBand, type NextStepSlug } from '@/lib/content/next-step-band'
import type { IndustrySlug } from '@/lib/constants'

/** Boards 1c and 2b close on this band. */
export function NextStepBand({ slug, headingId }: { slug: IndustrySlug; headingId: string }) {
  const band = nextStepBand[slug as NextStepSlug]
  if (!band) return null

  return (
    <section
      aria-labelledby={headingId}
      className="mt-section border-t border-sky/10 pt-11 text-center"
    >
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-sky">
        {band.eyebrow}
      </p>
      <h2 id={headingId} className="mt-3 font-heading text-[2rem] font-semibold text-paper">
        {band.title}
      </h2>
      <p className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-relaxed text-body">{band.body}</p>
      <div className="mt-7 flex justify-center">
        <Button href="/contact" size="lg">
          {band.cta}
        </Button>
      </div>
      <p className="mt-5 text-sm text-muted">{band.reassurance}</p>
    </section>
  )
}
