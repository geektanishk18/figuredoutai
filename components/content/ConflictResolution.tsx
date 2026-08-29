import { Provenance as ProvenanceChip } from '@/components/content/Provenance'
import { conflictRules } from '@/lib/content/conflict-rules'
import { recConflictRules } from '@/lib/content/rec-conflict-rules'
import type { IndustrySlug } from '@/lib/constants'

/**
 * Conflict resolution — the closing block of boards 1c and 2b.
 *
 * A routing table says where each signal goes. It does not say what happens
 * when an enquiry matches two rows at once, which is the case a reader with
 * real intake volume will think of immediately. This block answers it, and the
 * ordering is the answer: rules are numbered, and the lower number wins.
 *
 * Only the two verticals the canvas authors rule sets for render this. The
 * other four would need conflict rules invented for them, and an invented
 * governance rule presented in the same frame as an authored one is exactly the
 * kind of claim the provenance chip exists to prevent.
 */
const RULES: Partial<Record<IndustrySlug, readonly { n: string; text: string }[]>> = {
  'medical-clinics': conflictRules,
  recruitment: recConflictRules,
}

export function hasConflictRules(slug: IndustrySlug): boolean {
  return slug in RULES
}

export function ConflictResolution({ slug, headingId }: { slug: IndustrySlug; headingId: string }) {
  const rules = RULES[slug]
  if (!rules) return null

  return (
    <section aria-labelledby={headingId} className="mt-10">
      <div className="rounded-panel border border-line bg-panel p-card sm:p-rules">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 id={headingId} className="font-heading text-xl font-semibold text-paper sm:text-2xl">
            When two rules match
          </h3>
          <ProvenanceChip tier="scenario" />
        </div>

        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-body">
          When two rules match, the lower order wins.
        </p>

        <ol className="mt-6 space-y-3">
          {rules.map((rule) => (
            <li
              key={rule.n}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-sky/[0.08] pt-3 first:border-t-0 first:pt-0"
            >
              <span className="num text-[13px] font-semibold tabular-nums text-sky">{rule.n}</span>
              <span className="text-[15.5px] leading-relaxed text-body">{rule.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
