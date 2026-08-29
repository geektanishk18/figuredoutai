import { GLOW } from '@/lib/brand'
import { cn } from '@/lib/utils'

interface GlowBackdropProps {
  /** Extra positioning. The default fills the nearest positioned ancestor. */
  className?: string
}

/**
 * The glow, and the only thing that renders it.
 *
 * Board 1e specifies one gradient — sky into teal into nothing — and reuses it
 * behind every hero and panel rather than tinting per section. Routing it
 * through a single component is what keeps that true: there is one place to
 * change, and `check-blur` has one blur value to audit.
 *
 * The element is inert by construction. It is absolutely positioned behind
 * content, takes no pointer events, and is hidden from assistive tech — it
 * carries no meaning, only light.
 *
 * `filter` is set once and never transitioned. Animating a blur forces a
 * repaint of the blurred region every frame, which is the mobile jank this
 * design's 24px ceiling exists to avoid.
 */
export function GlowBackdrop({ className }: GlowBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={{
        background: GLOW.gradient,
        filter: `blur(${GLOW.blurPx}px)`,
      }}
    />
  )
}
