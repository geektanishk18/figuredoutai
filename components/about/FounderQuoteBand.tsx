import { Container } from '@/components/ui'
import { GlowBackdrop } from '@/components/ui/GlowBackdrop'

/**
 * The full-bleed closing quote on board 1d.
 *
 * It breaks out of the page's measure deliberately: the board gives it the
 * whole width and its own glow, which is what marks it as the founders
 * speaking rather than another body paragraph.
 */
export function FounderQuoteBand() {
  return (
    <section className="relative isolate mt-section overflow-hidden border-y border-sky/[0.08] py-20">
      <GlowBackdrop className="left-[-10%] top-[-120%] h-[620px] w-[1100px] max-w-none" />
      <Container>
        <blockquote className="max-w-[980px]">
          <p className="font-heading text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.28] text-paper">
            “We are not trying to be the agency that added AI to Indian businesses. We want to be
            the reason they stopped needing more people in order to grow.”
          </p>
          <cite className="mt-6 block font-sans text-[13px] font-medium uppercase not-italic tracking-[0.1em] text-muted">
            Tanishk Singhal &amp; Yashvardhan Awasthi · Founders
          </cite>
        </blockquote>
      </Container>
    </section>
  )
}
