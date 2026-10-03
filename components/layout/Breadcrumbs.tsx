import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'

export interface Crumb {
  name: string
  path: string
}

/**
 * Visible breadcrumb trail plus its BreadcrumbList JSON-LD, from one array.
 *
 * The structured data shipped on its own before, which Google accepts but
 * weights less than a trail a reader can actually see — and two separate
 * sources for the same trail is how they drift. Root first; the last entry is
 * the current page and renders as text with `aria-current`, not a link.
 */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <>
      <BreadcrumbSchema trail={trail} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-paper">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path === '/' ? '/' : `${crumb.path}/`}
                      className="focus-ring rounded-frame hover:text-paper"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
