import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The brand's heading accent, as used on figuredoutai.com — a gradient clipped
 * to the glyphs with a single drift and glint on entry. Reserve it for the one
 * word in a heading that carries the idea.
 */
export function Liquid({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('liquid', className)}>{children}</span>
}
