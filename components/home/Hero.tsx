import { Button, Container, Eyebrow, GlowBackdrop, Liquid } from '@/components/ui'
import { CTA } from '@/lib/constants'
import { SystemsNetworkScene } from './SystemsNetworkScene'

/**
 * The homepage hero, as board 1a draws it.
 *
 * Left-aligned in an 820px column — not centred. The board puts the eyebrow
 * pill, the headline, the paragraph and both actions on a single left edge, and
 * the demo panel picks that edge up directly below, so centring the hero breaks
 * the one vertical line the whole page is built on.
 *
 * The backdrop is the shared glow, offset up and to the left exactly as the
 * board specifies (left −6%, top −34%, 1100×760). The raster orb that used to
 * sit here is gone: board 1a has no sphere in the hero, and once the headline
 * came down to the board's two-and-a-bit lines the orb's centre landed on top
 * of the paragraph and greyed it out.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-24"
    >
      {/*
        Board geometry, in the board's own units. The glow is wider than the
        viewport on purpose — only its lower-right quadrant is meant to show.
      */}
      <GlowBackdrop className="left-[-6%] top-[-34%] h-[760px] w-[1100px] max-w-none" />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-55 sm:w-[58%]" aria-hidden="true">
        <SystemsNetworkScene />
      </div>

      <Container>
        <div className="relative z-10 max-w-[820px]">
          <Eyebrow>
            <span aria-hidden="true" className="mr-2.5 h-[5px] w-[5px] rounded-full bg-sky" />
            Conversational qualification layer
          </Eyebrow>

          {/*
            Poppins 700 · 76/1.04 · −0.02em at 1440, scaling down to the
            board's 34–38px mobile hero rather than to an arbitrary floor.
          */}
          <h1
            id="hero-heading"
            className="mt-6 font-heading text-[clamp(2.125rem,5.4vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.02em] text-paper"
          >
            More revenue, handled by <Liquid>fewer</Liquid> people.
          </h1>

          <p className="mt-7 max-w-[680px] text-lg leading-[1.6] text-body">
            We build and run the systems that sit between a business and the people trying to buy
            from it — so growth stops depending on how many people you can hire.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Button href={CTA.href} size="lg">
              {CTA.label}
            </Button>
            <Button href="#demo" variant="secondary" size="lg">
              See it work
            </Button>
          </div>

          {/*
            Board 1f adds this under every primary CTA. It answers the question
            the button raises — what am I actually agreeing to — at the point the
            reader asks it, rather than leaving it to the contact page.
          */}
          <p className="mt-4 text-sm text-body">Three working days. No cost, no obligation.</p>
        </div>
      </Container>
    </section>
  )
}
