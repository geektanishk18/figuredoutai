'use client'

import { useId } from 'react'
import { formatCount, formatINR, formatPercent } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { IndustryDemo, SliderSpec } from './types'

export interface CalculatorValues {
  volume: number
  missPct: number
  unitValue: number
}

export interface CalculatorResult {
  missedPerMonth: number
  realOpportunities: number
  annualLoss: number
}

/**
 * The whole model, in one place.
 *
 *   missedPerMonth    = perDay × (missPct / 100) × workingDays
 *   realOpportunities = missedPerMonth × conversionFactor
 *   annualLoss        = realOpportunities × unitValue × 12
 */
export function calculate(industry: IndustryDemo, values: CalculatorValues): CalculatorResult {
  const missedPerMonth = values.volume * (values.missPct / 100) * industry.workingDays
  const realOpportunities = missedPerMonth * industry.conversionFactor
  const annualLoss = realOpportunities * values.unitValue * 12
  return { missedPerMonth, realOpportunities, annualLoss }
}

function formatValue(spec: SliderSpec, value: number): string {
  if (spec.format === 'inr') return formatINR(value)
  if (spec.format === 'percent') return formatPercent(value)
  return formatCount(value)
}

interface SliderProps {
  spec: SliderSpec
  value: number
  onChange: (value: number) => void
}

function Slider({ spec, value, onChange }: SliderProps) {
  const id = useId()
  const pct = ((value - spec.min) / (spec.max - spec.min)) * 100
  const formatted = formatValue(spec, value)

  return (
    <div className="mb-5 last:mb-1">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-body">
          {spec.label}
        </label>
        <output htmlFor={id} className="num text-[17px] font-semibold text-paper">
          {formatted}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={value}
        // Drives the filled portion of the track. Kept as a custom property so
        // the fill is pure CSS rather than a second painted element.
        style={{ '--pct': `${pct}%` } as React.CSSProperties}
        aria-valuetext={formatted}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

interface LossCalculatorProps {
  industry: IndustryDemo
  values: CalculatorValues
  onChange: (values: CalculatorValues) => void
  headingId: string
}

export function LossCalculator({
  industry,
  values,
  onChange,
  headingId,
}: LossCalculatorProps) {
  const { missedPerMonth, realOpportunities, annualLoss } = calculate(industry, values)
  const conversionPct = Math.round(industry.conversionFactor * 100)

  return (
    <div>
      <h3 id={headingId} className="sr-only">
        Estimate the cost of missed enquiries
      </h3>

      <div className="rounded-card border border-line bg-panel p-4 sm:p-5">
        <Slider
          spec={industry.sliders.volume}
          value={values.volume}
          onChange={(volume) => onChange({ ...values, volume })}
        />
        <Slider
          spec={industry.sliders.missPct}
          value={values.missPct}
          onChange={(missPct) => onChange({ ...values, missPct })}
        />
        <Slider
          spec={industry.sliders.unitValue}
          value={values.unitValue}
          onChange={(unitValue) => onChange({ ...values, unitValue })}
        />
      </div>

      <div
        className={cn(
          'mt-3.5 rounded-card border border-loss/35 p-5 pb-4 text-center',
          'bg-[radial-gradient(120%_100%_at_50%_0%,rgba(212,100,90,0.13),transparent_70%)]',
          'bg-panel',
        )}
      >
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Lost over a year</p>
        {/* aria-live so the figure is announced as the sliders move, and a
            reserved min-width so a digit change cannot shift the layout. */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="num mt-3 min-w-[8ch] text-[clamp(1.5rem,7vw,2.75rem)] font-bold leading-none tracking-tight text-loss"
        >
          {formatINR(annualLoss)}
        </p>
        <p className="mt-2.5 text-[13px] text-muted">From people who had already chosen you</p>

        <div className="mt-4 flex border-t border-line pt-3.5">
          <div className="flex-1 px-2">
            <p className="num text-[22px] font-semibold text-paper">
              {formatCount(missedPerMonth)}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">
              {industry.metrics.missedLabel}
            </p>
          </div>
          <div className="flex-1 border-l border-line px-2">
            <p className="num text-[22px] font-semibold text-amber">
              {formatCount(realOpportunities)}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">
              {industry.metrics.outcomeLabel}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 px-1 text-center text-[11.5px] leading-relaxed text-muted">
        Deliberately conservative: only{' '}
        <strong className="font-semibold text-body">{conversionPct}%</strong> of missed enquiries
        are counted as real opportunities, valued {industry.unitNoun}. The other{' '}
        {100 - conversionPct}% are ignored.
      </p>
    </div>
  )
}
