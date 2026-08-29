'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ProvenanceChip } from '@/components/content'
import type { IndustrySlug } from '@/lib/constants'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { ConversationDemo, type DemoTab } from './ConversationDemo'
import { INDUSTRY_DEMOS, DEMO_INDUSTRY_LIST } from './industries'
import { LossCalculator, type CalculatorValues } from './LossCalculator'
import type { IndustryDemo as IndustryDemoConfig } from './types'

function defaultsFor(industry: IndustryDemoConfig): CalculatorValues {
  return {
    volume: industry.sliders.volume.initial,
    missPct: industry.sliders.missPct.initial,
    unitValue: industry.sliders.unitValue.initial,
  }
}

interface IndustryDemoProps {
  /** Industry the demo opens on. Industry pages pass their own. */
  defaultIndustry?: IndustrySlug
  /** Hidden on industry pages, where the industry is already the subject. */
  showSwitcher?: boolean
  className?: string
}

export function IndustryDemo({
  defaultIndustry = 'medical-clinics',
  showSwitcher = true,
  className,
}: IndustryDemoProps) {
  const [slug, setSlug] = useState<IndustrySlug>(defaultIndustry)
  const [tab, setTab] = useState<DemoTab>('today')
  const industry = INDUSTRY_DEMOS[slug]
  const [values, setValues] = useState<CalculatorValues>(() => defaultsFor(industry))
  const reducedMotion = useReducedMotion()

  const switcherRef = useRef<HTMLDivElement>(null)
  const calculatorHeadingId = useId()
  const conversationHeadingId = useId()
  const switcherLabelId = useId()

  // Switching industry resets the calculator to that industry's own defaults.
  // The conversation restarts on its own — its runKey changes with the slug.
  const selectIndustry = useCallback((next: IndustrySlug) => {
    setSlug(next)
    setValues(defaultsFor(INDUSTRY_DEMOS[next]))
  }, [])

  // Industry pages render this with a fixed industry; keep it in sync if the
  // route changes underneath a preserved component instance.
  useEffect(() => {
    selectIndustry(defaultIndustry)
  }, [defaultIndustry, selectIndustry])

  return (
    <div className={cn('mx-auto w-full max-w-[30rem]', className)}>
      {showSwitcher ? (
        <div className="mb-4">
          <p id={switcherLabelId} className="sr-only">
            Choose an industry
          </p>
          <div className="edge-fade -mx-1">
            <div
              ref={switcherRef}
              role="group"
              aria-labelledby={switcherLabelId}
              className="no-scrollbar flex gap-1.5 overflow-x-auto px-1 pb-1"
            >
              {DEMO_INDUSTRY_LIST.map((entry) => {
                const selected = entry.slug === slug
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectIndustry(entry.slug)}
                    className={cn(
                      'focus-ring min-h-[44px] flex-none whitespace-nowrap rounded-full border px-3.5',
                      'text-[13px] font-semibold',
                      selected
                        ? 'border-teal bg-teal text-paper'
                        : 'border-line bg-panel text-muted hover:text-paper',
                    )}
                  >
                    {entry.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      <LossCalculator
        industry={industry}
        values={values}
        onChange={setValues}
        headingId={calculatorHeadingId}
      />

      <div className="mt-8">
        <ConversationDemo
          industry={industry}
          tab={tab}
          onTabChange={setTab}
          reducedMotion={reducedMotion}
          headingId={conversationHeadingId}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <ProvenanceChip tier="scenario" />
      </div>
    </div>
  )
}
