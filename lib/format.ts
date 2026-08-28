/**
 * Indian numbering throughout — ₹12,34,567, not ₹1,234,567.
 * Formatters are module-level so they are constructed once, not per render.
 */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const count = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** Guards against NaN/Infinity reaching the DOM as "₹NaN". */
function safe(value: number): number {
  return Number.isFinite(value) ? value : 0
}

export function formatINR(value: number): string {
  return inr.format(Math.round(safe(value)))
}

export function formatCount(value: number): string {
  return count.format(Math.round(safe(value)))
}

export function formatPercent(value: number): string {
  return `${formatCount(value)}%`
}
