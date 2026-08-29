'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { COMPANY, CTA, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { IndustriesMenu } from './IndustriesMenu'
import { MobileDrawer } from './MobileDrawer'
import { WORDMARK_HEIGHTS, Wordmark } from './Wordmark'

const linkBase =
  'focus-ring rounded-lg px-2.5 py-2 text-sm font-medium'

export function Nav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerTitleId = useId()

  // The nav's ground fades in once the page has moved. Over the hero the bar
  // sits on the glow with nothing behind it; past that it has to hold its own
  // against arbitrary content scrolling underneath.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  // A route change means the drawer has done its job.
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    // Focus returns to the control that opened it, not to the top of the page.
    toggleRef.current?.focus()
  }, [])

  return (
    // The drawer is a sibling of <header>, never a child: `backdrop-filter`
    // establishes a containing block for fixed-position descendants, which would
    // otherwise size the drawer's `inset-0` against the 64px header instead of
    // the viewport.
    <>
      <header
        className={cn(
          'sticky top-0 z-40 h-16 border-b border-line',
          // glass.veil — 10px. The tier owns the blur value, the @supports
          // fallback and the reduced-transparency branch; this never writes one.
          // bg-ink/85 sits under the glass so the nav stays opaque enough to
          // read against any section that scrolls beneath it.
          'glass-veil',
        )}
      >
        {/*
          The opaque ground lives on its own layer purely so that scrolling
          animates opacity rather than a background colour. Same look, but it
          composites instead of repainting the bar, and it keeps the audit of
          animated properties down to transform and opacity.
        */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-ink/85 transition-opacity duration-180',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${COMPANY.name} — home`}
            className="focus-ring flex flex-none items-center rounded-lg py-2"
          >
            {/*
              Board 1e: 30px in the desktop nav, 26px on mobile. Both render so
              the swap is a CSS breakpoint rather than a client-side measure —
              the bar must not reflow between hydration and first paint.
            */}
            <Wordmark priority height={WORDMARK_HEIGHTS.mobile} className="lg:hidden" />
            <Wordmark priority height={WORDMARK_HEIGHTS.desktop} className="hidden lg:block" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <IndustriesMenu
                      active={isActive(item.href)}
                      isIndex={pathname === item.href}
                      linkClassName={cn(
                        linkBase,
                        isActive(item.href)
                          ? 'text-sky'
                          : 'text-body hover:bg-panel hover:text-paper',
                      )}
                    />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        linkBase,
                        'block',
                        isActive(item.href)
                          ? 'text-sky'
                          : 'text-body hover:bg-panel hover:text-paper',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex flex-none items-center gap-2">
            <Button href={CTA.href} size="sm" className="hidden lg:inline-flex">
              {CTA.label}
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-label="Open navigation"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg text-paper lg:hidden"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        isActive={isActive}
        titleId={drawerTitleId}
      />
    </>
  )
}
