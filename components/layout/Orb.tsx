import Image from 'next/image'
import orbGlow from '@/assets/orb-glow.webp'
import { cn } from '@/lib/utils'

interface OrbProps {
  /** Set only on the homepage — it is the LCP-adjacent asset there and nowhere else. */
  priority?: boolean
  className?: string
}

/**
 * Homepage hero backdrop. Inner pages use `PageBackdrop` instead.
 *
 * The glow is baked into the raster at build time (`npm run build:orb`), so
 * nothing here paints a `filter: blur()`. The only animated property is
 * `transform`, which the compositor can run without repainting, and it is
 * confined to viewports at or above 768px — below that the orb is static.
 */
export function Orb({ priority = false, className }: OrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute select-none',
        // Reduced presence on small screens, where it is static.
        'opacity-70 md:opacity-100',
        className,
      )}
    >
      <div className="md:motion-safe:animate-orb-spin md:motion-safe:will-change-transform">
        <Image
          src={orbGlow}
          alt=""
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1280px) 704px, (min-width: 768px) 560px, 420px"
          // A soft, heavily-diffused gradient: compression artefacts have
          // nothing to bite on, and this is the page's LCP element.
          quality={62}
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
