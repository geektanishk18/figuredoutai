import { GlowBackdrop } from '@/components/ui/GlowBackdrop'

/**
 * The wash behind inner-page headers.
 *
 * This previously built its own radial gradient from teal alone. Board 1e
 * draws that exact construction as its wrong-example: teal at low alpha over
 * ink loses its blue and settles into a murky green-grey. It now composes the
 * shared glow, which leads with sky and stays luminous.
 *
 * The orb still belongs to the homepage hero only.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem]">
      <GlowBackdrop />
    </div>
  )
}
