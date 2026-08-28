import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base = [
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
  'transition-colors duration-180',
  'focus-ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // 44px minimum touch target at every size.
  'min-h-[44px]',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal text-paper hover:bg-teal-hover active:bg-teal-active',
  secondary: 'border border-line bg-panel text-paper hover:border-sky/40 hover:bg-panel-raised',
  ghost: 'text-sky hover:bg-sky/10',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-6 py-3.5 text-base',
}

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = StyleProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof StyleProps> & { href?: undefined }

type ButtonAsLink = StyleProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof StyleProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

/**
 * The site's only button.
 *
 * Renders an anchor when `href` is given and a <button> otherwise, so a link is
 * never faked with a click handler. Every variant carries the shared `.focus-ring`,
 * making it keyboard reachable and visibly focused without per-use effort.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as ComponentPropsWithoutRef<'a'> & { href: string }

    if (/^(https?:|mailto:|tel:|#)/.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = rest as ComponentPropsWithoutRef<'button'>

  return (
    <button {...buttonProps} type={buttonProps.type ?? 'button'} className={classes}>
      {children}
    </button>
  )
}
