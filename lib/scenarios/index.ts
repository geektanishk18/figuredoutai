import type { IndustrySlug } from '@/lib/constants'
import type { Scenario } from './types'
import { clinics } from './clinics'
import { realEstate } from './real-estate'
import { restaurants } from './restaurants'
import { travel } from './travel'
import { recruitment } from './recruitment'
import { hvac } from './hvac'

/**
 * Every sector we publish an industry page for has a scenario. Typed as a total
 * record so adding an industry without one is a compile error rather than a
 * page that quietly renders without its proof block.
 */
export const SCENARIOS: Record<IndustrySlug, Scenario> = {
  'clinics': clinics,
  'real-estate': realEstate,
  restaurants,
  travel,
  recruitment,
  hvac,
}

export function getScenario(slug: IndustrySlug): Scenario {
  return SCENARIOS[slug]
}

export type { Scenario } from './types'
