import { Orb } from '@/components/layout/Orb'
import { Button, Container, Liquid } from '@/components/ui'
import { CTA } from '@/lib/constants'

/**
 * Centred hero, matching the composition on figuredoutai.com: the orb behind
 * the mark, the headline carrying the liquid accent on its last word, and a
 * single primary action.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[min(88vh,54rem)] items-center overflow-hidden"
    >
      <Orb
        priority
        className="left-1/2 top-1/2 w-[min(112vw,44rem)] -translate-x-1/2 -translate-y-[56%]"
      />

      <Container className="py-20 text-center sm:py-24">
        <h1
          id="hero-heading"
          className="mx-auto max-w-[16ch] font-heading text-[clamp(2.5rem,8.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-paper"
        >
          Scale Revenue Without Scaling <Liquid>Chaos</Liquid>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg text-body sm:text-xl">
          A decision layer that answers first, applies your qualification rules, and routes with the
          context already attached.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={CTA.href} size="lg">
            {CTA.label}
          </Button>
          <Button href="#demo" variant="ghost" size="lg">
            See it work
          </Button>
        </div>
      </Container>
    </section>
  )
}
