'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { INDUSTRIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface IndustriesMenuProps {
  /** True when the current route is /industries or one of its children. */
  active: boolean
  /** True only on /industries itself, rather than one of its children. */
  isIndex: boolean
  linkClassName: string
}

/**
 * Desktop-only dropdown. Opens on hover and on keyboard focus, closes on
 * Escape, on pointer leave, and whenever focus moves outside the wrapper.
 */
export function IndustriesMenu({ active, isIndex, linkClassName }: IndustriesMenuProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      event.preventDefault()
      close()
      triggerRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close()
      }}
    >
      <Link
        ref={triggerRef}
        href="/industries"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        // "page" on /industries itself; "true" marks the containing section
        // when a child industry page is open.
        aria-current={isIndex ? 'page' : active ? 'true' : undefined}
        className={cn(linkClassName, 'inline-flex items-center gap-1')}
      >
        Industries
        <ChevronDown
          aria-hidden="true"
          className={cn('h-4 w-4 transition-transform duration-180', open && 'rotate-180')}
        />
      </Link>

      <ul
        id={menuId}
        // Kept mounted so the aria-controls target always resolves; visibility
        // (not just opacity) is toggled so hidden items leave the tab order.
        className={cn(
          'absolute left-0 top-full z-50 min-w-[15rem] rounded-card border border-line',
          'bg-panel p-2 shadow-[0_18px_40px_rgba(0,0,0,0.55)]',
          'transition-opacity duration-180',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        {INDUSTRIES.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={`/industries/${industry.slug}`}
              tabIndex={open ? undefined : -1}
              className="focus-ring-panel block rounded-lg px-3 py-2.5 text-sm text-body transition-colors duration-180 hover:bg-panel-raised hover:text-paper"
            >
              {industry.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
