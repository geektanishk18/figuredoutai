import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import { CommitmentRows } from '@/components/about'
import { LabelledSection } from '@/components/content/LabelledSection'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { Container, Eyebrow } from '@/components/ui'
import { ComparisonTable, GovernanceCards, VerificationGrid } from '@/components/why-us'
import { howRows } from '@/lib/content/how-rows'
import { engagements, howLede, verifyNote, whyLede } from '@/lib/content/why-sections'

export const metadata: Metadata = pageMeta({
  // The brand name is appended by the layout's `%s | FiguredoutAI` template,
  // so naming it here too rendered "Why FiguredoutAI — … | FiguredoutAI".
  title: 'Why Us — AI Automation Agency in India',
  description:
    'Qualification logic decides whether a conversation is worth an owner’s time. We build it from your criteria, document it, and stay accountable for it.',
  path: '/why-us',
})

const SECTION_H2 =
  'font-heading text-[clamp(1.5rem,3vw,2.375rem)] font-semibold leading-[1.16] tracking-[-0.01em] text-paper'

/**
 * Board 1b, section for section.
 *
 * The previous implementation rendered `content/why-us.mdx`, whose four
 * numbered essays ("The gap is the logic, not the model", "Your rules, not our
 * template", …) do not appear on any board. They were not a rewording of this
 * page — they were different content, so this replaces them rather than editing
 * them. The comparison table, governance cards and verification grid the board
 * specifies had data waiting in `lib/content/*` that nothing rendered.
 */
export default function WhyUsPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />

      <Container className="pb-24 pt-16 sm:pt-20">
        <header className="max-w-[820px]">
          <Eyebrow>Why us</Eyebrow>
          <h1 className="mt-6 font-heading text-[clamp(2.125rem,5.4vw,3.875rem)] font-bold leading-[1.06] tracking-[-0.02em] text-paper">
            Qualification logic is built, not downloaded.
          </h1>
          <p className="mt-7 max-w-[680px] text-lede text-body">{whyLede}</p>
          {/*
            The page's own question, answered outright. The lede above defines
            what qualification logic is; a reader on this route is asking
            something narrower — why have this built rather than bought or
            configured — and that answer needs to be in plain prose near the
            top rather than assembled from the sections below it.
          */}
          <p className="mt-5 max-w-[680px] text-lede text-body">
            We build that logic from your criteria rather than shipping a template, document it in
            language your team can read and change, and stay accountable for how it performs after
            it goes live. What you own at the end is a rule set, not access to someone
            else&rsquo;s product.
          </p>
        </header>

        <LabelledSection label="How we work" intro={howLede} headingId="how-heading">
          <h2 id="how-heading" className="sr-only">
            How we work
          </h2>
          <CommitmentRows rows={howRows} />
        </LabelledSection>

        <LabelledSection
          label="What changes for a business"
          variant="stack"
          headingId="changes-heading"
          intro={
            <h2 id="changes-heading" className={SECTION_H2}>
              The difference is not how well it talks. It is whether it knows what it is{' '}
              listening for.
            </h2>
          }
        >
          <ComparisonTable />
        </LabelledSection>

        <LabelledSection label="Governance" headingId="governance-heading">
          <h2 id="governance-heading" className="sr-only">
            Governance
          </h2>
          <GovernanceCards />
        </LabelledSection>

        <LabelledSection label="Engagements" headingId="engagements-heading">
          <h2 id="engagements-heading" className={SECTION_H2}>
            {engagements.title}
          </h2>
          <p className="mt-6 max-w-[780px] text-[17px] leading-[1.75] text-body">
            {engagements.body}
          </p>
        </LabelledSection>

        <LabelledSection
          label="Verification"
          variant="stack"
          headingId="verification-heading"
          intro={
            <h2 id="verification-heading" className={SECTION_H2}>
              Everything on this page is checkable.
            </h2>
          }
          note={verifyNote}
        >
          <VerificationGrid />
        </LabelledSection>
      </Container>
    </div>
  )
}
