import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  className?: string
  children: ReactNode
}

/** Small uppercase kicker above a heading. Never a heading element itself. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-sky',
        className,
      )}
    >
      {children}
    </p>
  )
}
