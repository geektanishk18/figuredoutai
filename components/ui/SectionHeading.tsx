import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  /** Heading level. Pick the one the document outline requires — never for size. */
  as?: 'h1' | 'h2' | 'h3'
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Set when a section is labelled by this heading via aria-labelledby. */
  id?: string
}

const sizes = {
  h1: 'text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold',
  h2: 'text-[1.625rem] sm:text-[2rem] lg:text-[2.375rem] font-semibold',
  h3: 'text-xl sm:text-2xl font-semibold',
} as const

export function SectionHeading({
  as: Tag = 'h2',
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-prose', className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={sizes[Tag]}>
        {title}
      </Tag>
      {description ? <p className="mt-4 text-base text-body sm:text-lg">{description}</p> : null}
    </div>
  )
}
