import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  as?: ElementType
  /** `prose` narrows to 44rem for long-form reading. */
  width?: 'default' | 'prose'
  children: ReactNode
}

export function Container({
  as: Tag = 'div',
  width = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        width === 'prose' ? 'max-w-prose' : 'max-w-container',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
