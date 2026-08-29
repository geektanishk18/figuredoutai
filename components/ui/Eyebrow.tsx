import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  className?: string
  children: ReactNode
}

/**
 * Small uppercase kicker above a heading. Never a heading element itself.
 *
 * Board 1e types this as a pill: Inter 500 at 11px, 0.14em, uppercase, sitting
 * in a hairline sky border. It sets the eyebrow apart from a stray label and
 * gives the hero a fixed object to hang off, which is why the chrome is part
 * of the primitive rather than applied per section.
 */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center rounded-full border border-sky/20 px-3 py-1.5',
        'font-sans text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-sky',
        className,
      )}
    >
      {children}
    </p>
  )
}

export { Eyebrow as EyebrowPill }
