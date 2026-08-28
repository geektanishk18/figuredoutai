'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface RevealProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

/**
 * Fades and rises a section into view, once.
 *
 * The hidden state lives in CSS keyed on `data-reveal`, so it is present in the
 * server-rendered HTML and there is no flash before hydration. A <noscript>
 * override in the root layout un-hides everything for visitors without
 * JavaScript, who would otherwise never see the observer fire.
 */
export function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        setShown(true)
        observer.disconnect() // once
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <Tag ref={ref} data-reveal={shown ? 'shown' : 'hidden'} className={className}>
      {children}
    </Tag>
  )
}
