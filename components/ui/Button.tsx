import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Every board draws the action as a pill with a hairline sky border and no
 * fill — never a solid slab. `rounded-full` and the transparent ground are
 * therefore part of the base, not a variant, so no call site can opt out of
 * the shape and reintroduce the filled button this replaced.
 */
const base = [
  'inline-flex items-center justify-center gap-2 rounded-full border font-semibold',
  'bg-transparent',
  'focus-ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // 44px minimum touch target at every size.
  'min-h-[44px]',
].join(' ')

/**
 * Board 1a, measured off the canvas:
 *   primary   border sky 42% · label peak · hover border sky 100%, ground teal 22%
 *   secondary border sky 14% · label paper 72% · hover border sky 30%, label paper
 *
 * `teal` appears only as a 22% hover wash. It is a surface colour at 3.02:1 and
 * was previously the button's whole ground with `paper` sitting on it — legible,
 * but not what any board draws.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'border-sky/[0.42] text-peak hover:border-sky hover:bg-teal/[0.22]',
  secondary: 'border-sky/[0.14] text-body hover:border-sky/30 hover:text-paper',
  ghost: 'border-transparent text-sky hover:bg-sky/10',
}

/** Board 1a sets the primary action at 16px/28px on a 15px label. */
const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-7 py-4 text-[15px]',
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
