import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  as?: ElementType
  /** Adds a hover treatment. Only use on cards that are themselves links. */
  interactive?: boolean
  children: ReactNode
}

export function Card({
  as: Tag = 'div',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-line bg-panel p-5 sm:p-6',
        interactive && 'transition-colors duration-180 hover:border-sky/40 hover:bg-panel-raised',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
