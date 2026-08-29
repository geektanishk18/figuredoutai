import type { IndustrySlug } from '@/lib/constants'

/** One beat of a scripted conversation. `wait` is the delay before this step runs. */
export type Step =
  | { kind: 'in'; wait: number; text: string; at: string }
  | { kind: 'out'; wait: number; text: string; at: string; options?: readonly string[] }
  | { kind: 'system'; wait: number; text: string; tone?: 'neutral' | 'dead' | 'live' }
  | { kind: 'typing'; wait: number }
  | { kind: 'pick'; wait: number; index: number }
  | { kind: 'verdict'; wait: number }

/** A step after the player has resolved it into something renderable. */
export interface RenderedMessage {
  key: string
  kind: 'in' | 'out' | 'system'
  text: string
  at?: string
  tone?: 'neutral' | 'dead' | 'live'
  options?: readonly string[]
  pickedIndex?: number
}

export interface SliderSpec {
  label: string
  min: number
  max: number
  step: number
  initial: number
  format: 'count' | 'percent' | 'inr'
}

export interface Verdict {
  /** Short figure shown in the readout. */
  badge: string
  text: string
  /** Contact status line in the thread header once the script ends. */
  status: string
}

export interface IndustryDemo {
  slug: IndustrySlug
  label: string
  /** Person on the other end of the thread. */
  contact: { name: string; initials: string; status: string }
  sliders: { volume: SliderSpec; missPct: SliderSpec; unitValue: SliderSpec }
  /** Working days per month used to turn a daily rate into a monthly one. */
  workingDays: number
  /**
   * Share of missed enquiries counted as real opportunities. Held at 0.30 for
   * every industry so the figure stays conservative and comparable.
   */
  conversionFactor: number
  /**
   * Plural nouns the panel builds its own labels from — "enquiries" missed,
   * "patients" lost. The design composes the metric captions and the
   * conservative-assumption footnote from these two words, so they are stored
   * rather than the finished sentences: one noun to change per vertical, and
   * the three places it appears cannot drift apart.
   */
  missedNoun: string
  noun: string
  scripts: { today: readonly Step[]; layer: readonly Step[] }
  verdicts: { today: Verdict; layer: Verdict }
}
