'use client'

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'

/**
 * A focal glass surface.
 *
 * Glass is deliberately not the default card. `backdrop-filter` forces a
 * compositor layer and re-rasterises on scroll, so the cost is in the count
 * rather than the radius — a grid of twelve glass cards drops frames on a
 * mid-range Android even at 16px. The budget is six per viewport, enforced at
 * the Phase 5 gate; below the fold, cards stay on solid `bg-panel`.
 *
 * This component must never contain a fixed-position descendant: the glass tier
 * establishes a containing block, which is what sized the mobile drawer to
 * 463x63. Portal any overlay to document.body.
 */
interface GlassPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  as?: ElementType
  /** Adds the depth lift. Only for surfaces that are themselves interactive. */
  interactive?: boolean
  /** Runs the specular sweep once on mount. */
  sweep?: boolean
  children: ReactNode
}

export function GlassPanel({
  as: Tag = 'div',
  interactive = false,
  sweep = false,
  className,
  children,
  ...rest
}: GlassPanelProps) {
  // Pointer position drives a CSS custom property rather than React state:
  // re-rendering on mousemove would cost far more than the effect is worth.
  const trackEdge = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--edge-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--edge-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return (
    <Tag
      className={cn(
        'glass-panel glass-edge relative overflow-hidden rounded-card border p-5 sm:p-6',
        interactive && 'glass-lift hover:border-sky/40',
        sweep && 'glass-sweep',
        className,
      )}
      onMouseMove={trackEdge}
      {...rest}
    >
      {children}
    </Tag>
  )
}
