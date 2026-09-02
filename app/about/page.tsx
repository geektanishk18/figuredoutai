import type { Metadata } from 'next'
import { Beliefs, EntityBlock, FounderQuoteBand, Founders, NumberedRows } from '@/components/about'
import { LabelledSection } from '@/components/content/LabelledSection'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { PersonSchema, TANISHK_ID, YASHVARDHAN_ID } from '@/components/seo/JsonLd'
import { Container, Eyebrow, Liquid } from '@/components/ui'
import { existParas } from '@/lib/content/exist-paras'
import { workRows } from '@/lib/content/work-rows'

const TITLE =
  'About FiguredoutAI | Tanishk Singhal & Yashvardhan Awasthi — Growth Infrastructure for Indian Businesses'
const DESCRIPTION =
  'FiguredoutAI LLP builds growth infrastructure for Indian businesses — systems that qualify enquiries and scale revenue without scaling headcount. Founded by Tanishk Singhal (CEO) and Yashvardhan Awasthi (CTO), based in Noida.'

export const metadata: Metadata = {
  // `absolute` stops the layout's `%s | FiguredoutAI` template appending to a
  // title that already names the brand.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  // `openGraph` on a route replaces the parent's object wholesale rather than
  // merging into it (see app/opengraph-image.tsx's own note on this same
  // trap) — title/description/siteName/locale have to be repeated here or
  // a shared link shows the homepage's copy instead of this page's.
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: 'FiguredoutAI',
    locale: 'en_IN',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

/**
 * Board 1d, section for section.
 *
 * This page used to render `content/about.mdx` through `PageShell`, which put
 * everything — founders included — into a single 44rem prose column. That is
 * why the founders arrived as bare headings and paragraphs: the shell had no
 * way to express a card, and the measure had no room for a two-column grid.
 * The board's sections need the full container width, so the page owns its own
 * layout and pulls its copy from `lib/content/*`, which is generated from the
 * canvas.
 */
export default function AboutPage() {
  return (
    <div className="relative isolate">
      <PersonSchema
        id={TANISHK_ID}
        name="Tanishk Singhal"
        jobTitle="Co-Founder & Chief Executive Officer"
        sameAs={['https://x.com/tanishk_ai']}
      />
      <PersonSchema
        id={YASHVARDHAN_ID}
        name="Yashvardhan Awasthi"
        jobTitle="Co-Founder & Chief Technology Officer"
      />
      <PageBackdrop />

      <Container className="pb-24 pt-16 sm:pt-20">
        <header className="max-w-[820px]">
          <Eyebrow>About FiguredoutAI</Eyebrow>
          <h1 className="mt-6 font-heading text-[clamp(2.125rem,5.4vw,3.875rem)] font-bold leading-[1.06] tracking-[-0.02em] text-paper">
            We build the layer that <Liquid>decides</Liquid>.
          </h1>
          <p className="mt-7 max-w-[680px] text-lg leading-[1.6] text-body">
            Most businesses do not lose enquiries because nobody cared. They lose them because the
            enquiry arrived at 9:12 on a Tuesday and the person who could act on it was already on a
            call.
          </p>
        </header>

        <LabelledSection label="Why this company exists" headingId="exists-heading">
          <h2 id="exists-heading" className="sr-only">
            Why this company exists
          </h2>
          <div className="max-w-[680px] space-y-6">
            {existParas.map((para) => (
              <p key={para.slice(0, 40)} className="text-[17px] leading-[1.75] text-body">
                {para}
              </p>
            ))}
          </div>
        </LabelledSection>

        <LabelledSection label="The people behind it" variant="stack" headingId="founders-heading">
          <h2 id="founders-heading" className="sr-only">
            The people behind it
          </h2>
          <Founders />
        </LabelledSection>

        <LabelledSection label="What we believe" variant="stack" headingId="beliefs-heading">
          <h2 id="beliefs-heading" className="sr-only">
            What we believe
          </h2>
          <Beliefs />
        </LabelledSection>

        <LabelledSection label="How we work" headingId="work-heading">
          <h2 id="work-heading" className="sr-only">
            How we work
          </h2>
          <NumberedRows rows={workRows} />
        </LabelledSection>
      </Container>

      <FounderQuoteBand />

      <Container className="pb-24">
        <EntityBlock headingId="entity-heading" />
      </Container>
    </div>
  )
}
