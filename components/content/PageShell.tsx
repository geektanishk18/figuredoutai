import type { ReactNode } from 'react'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { Button, Container, Eyebrow } from '@/components/ui'

export interface PageCta {
  label: string
  href: string
}

interface PageShellProps {
  eyebrow: string
  title: string
  lede?: ReactNode
  /** Rendered under the header, before the MDX body. */
  children: ReactNode
  /**
   * Rendered between the header and `children`, at full container width.
   *
   * `children` is clamped to the 44rem prose measure, which is right for body
   * copy and wrong for a diagram: a four-node roadmap inside it is squeezed
   * into the left half of the page with its labels wrapping. Anything with a
   * horizontal structure of its own belongs here instead.
   */
  wide?: ReactNode
  ctas?: readonly PageCta[]
}

/**
 * The frame every long-form page shares: header, prose column, closing CTAs.
 * Body copy comes from `content/*.mdx`; this owns hierarchy and rhythm.
 */
export function PageShell({ eyebrow, title, lede, children, wide, ctas }: PageShellProps) {
  return (
    <div className="relative isolate">
      <PageBackdrop />

      <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
        <header className="max-w-prose">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] sm:text-[2.75rem]">{title}</h1>
          {lede ? <div className="mt-6 text-lg text-body sm:text-xl">{lede}</div> : null}
        </header>

        {wide ? <div className="mt-12">{wide}</div> : null}

        <div className="mt-4 max-w-prose">{children}</div>

        {ctas?.length ? (
          <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-10">
            {ctas.map((cta, index) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={index === 0 ? 'primary' : 'secondary'}
                size="lg"
              >
                {cta.label}
              </Button>
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  )
}
