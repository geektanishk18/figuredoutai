'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { CTA, INDUSTRIES, NAV_ITEMS } from '@/lib/constants'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/lib/hooks/useLockBodyScroll'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  isActive: (href: string) => boolean
  titleId: string
}

export function MobileDrawer({ open, onClose, isActive, titleId }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [industriesOpen, setIndustriesOpen] = useState(false)

  useFocusTrap(panelRef, open, onClose)
  useLockBodyScroll(open)

  if (!open) return null

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink lg:hidden"
    >
      <h2 id={titleId} className="sr-only">
        Site navigation
      </h2>

      <div className="flex h-16 flex-none items-center justify-end px-5 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg text-paper"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <nav aria-label="Main" className="flex-1 px-5 pb-10 sm:px-6">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => setIndustriesOpen((value) => !value)}
                  aria-expanded={industriesOpen}
                  aria-controls="drawer-industries"
                  className={cn(
                    'focus-ring flex w-full items-center justify-between rounded-lg px-3 py-3.5',
                    'font-heading text-lg font-semibold',
                    isActive(item.href) ? 'text-sky' : 'text-paper',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'h-5 w-5 transition-transform duration-180',
                      industriesOpen && 'rotate-180',
                    )}
                  />
                </button>
                {/* Kept mounted so `aria-controls` always resolves; `hidden` takes it
                    out of both the accessibility tree and the tab order. */}
                <ul
                  id="drawer-industries"
                  hidden={!industriesOpen}
                  className="mb-2 ml-3 space-y-1 border-l border-line pl-3"
                >
                    <li>
                      <Link
                        href="/industries"
                        onClick={onClose}
                        aria-current={isActive('/industries') ? 'page' : undefined}
                        className="focus-ring block rounded-lg px-3 py-2.5 text-base text-body"
                      >
                        All industries
                      </Link>
                    </li>
                    {INDUSTRIES.map((industry) => (
                      <li key={industry.slug}>
                        <Link
                          href={`/industries/${industry.slug}`}
                          onClick={onClose}
                          aria-current={
                            isActive(`/industries/${industry.slug}`) ? 'page' : undefined
                          }
                          className="focus-ring block rounded-lg px-3 py-2.5 text-base text-body"
                        >
                          {industry.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'focus-ring block rounded-lg px-3 py-3.5 font-heading text-lg font-semibold',
                    isActive(item.href) ? 'text-sky' : 'text-paper',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <Button href={CTA.href} onClick={onClose} size="lg" className="mt-8 w-full">
          {CTA.label}
        </Button>
      </nav>
    </div>
  )
}
