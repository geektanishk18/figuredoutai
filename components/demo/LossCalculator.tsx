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

  // Step the display size down as the figure lengthens, mirroring the design
  // source. The thresholds are on the formatted string because Indian grouping
  // adds separators faster than digits — ₹1,26,36,000 is 12 characters for 8
  // digits — so character count, not magnitude, is what makes it wrap.
  const loss = formatINR(annualLoss)
  const lossSize =
    loss.length > 12
      ? 'text-[clamp(1.25rem,5.5vw,1.875rem)]'
      : loss.length > 10
        ? 'text-[clamp(1.375rem,6.5vw,2.25rem)]'
        : 'text-[clamp(1.5rem,7vw,2.75rem)]'

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
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Annual revenue lost</p>
        {/*
          The figure spans ₹43,200 to ₹5,89,68,00,000 as the sliders move, and at
          full width the longest values wrapped to a second line — the card grew
          by 14px and everything below it jumped. Two things hold the geometry
          still: the row is a fixed-height flex box, so the type can resize
          inside it without changing the card, and the size steps down by string
          length so the figure never wraps in the first place.

          aria-live announces the figure as the sliders move; aria-atomic keeps
          it read as one number rather than digit by digit.
        */}
        <div className="mt-3 flex h-[3.25rem] items-center justify-center">
          <p
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              'num whitespace-nowrap font-bold leading-none tracking-tight text-loss',
              lossSize,
            )}
          >
            {loss}
          </p>
        </div>
        <p className="mt-2.5 text-[13px] text-muted">From people who had already chosen you</p>

        <div className="mt-4 flex border-t border-line pt-3.5">
          <div className="flex-1 px-2">
            <p className="num text-[22px] font-semibold text-paper">
              {formatCount(missedPerMonth)}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">
              {industry.missedNoun} missed
              <br />
              each month
            </p>
          </div>
          <div className="flex-1 border-l border-line px-2">
            <p className="num text-[22px] font-semibold text-amber">
              {formatCount(realOpportunities)}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">
              {industry.noun} lost
              <br />
              each month
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 px-1 text-center text-[11.5px] leading-relaxed text-muted">
        Deliberately conservative. Only{' '}
        <strong className="font-semibold text-paper">{conversionPct}%</strong> of unanswered{' '}
        {industry.missedNoun} are counted as real {industry.noun} — the same factor on every
        vertical. The other {100 - conversionPct}% are left out of the arithmetic entirely.
      </p>
    </div>
  )
}
