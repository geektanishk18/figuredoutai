import type { Metadata } from 'next'
import { Beliefs, EntityBlock, FounderQuoteBand, Founders, CommitmentRows } from '@/components/about'
import { LabelledSection } from '@/components/content/LabelledSection'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { BreadcrumbSchema, PersonSchema, TANISHK_ID, YASHVARDHAN_ID } from '@/components/seo/JsonLd'
import { SOCIAL } from '@/lib/constants'
import { Container, Eyebrow } from '@/components/ui'
import { existParas } from '@/lib/content/exist-paras'
import { workRows } from '@/lib/content/work-rows'

/*
  Both founder names stay in the title — this page's job is to answer "who
  founded FiguredoutAI", and the title is the strongest signal it has. The
  trailing "Growth Infrastructure for Indian Businesses" clause came out
  instead: at 104 characters the whole title was truncated in results, and
  that clause is the half already carried by the description below. 58
  characters keeps every entity term and loses nothing to the cut.
*/
const TITLE = 'About FiguredoutAI — Tanishk Singhal & Yashvardhan Awasthi'
const DESCRIPTION =
  'FiguredoutAI LLP builds growth infrastructure for Indian businesses. Founded by Tanishk Singhal (CEO) and Yashvardhan Awasthi (CTO). Registered in Noida.'

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
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <PersonSchema
        id={TANISHK_ID}
        name="Tanishk Singhal"
        jobTitle="Co-Founder & Chief Executive Officer"
        sameAs={[SOCIAL.tanishk.linkedin, SOCIAL.tanishk.x, SOCIAL.tanishk.instagram]}
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
          {/*
            This read "We build the layer that decides." — a product tagline, on
            the one page that carries the Organization and Person schema and is
            the canonical answer to "who is this company". The H1 is the
            strongest signal on the page about what the page is about, and it
            was spending that signal on positioning already made on four other
            routes.
            It now names the entity and the two people, matching the schema
            beneath it. The tagline is not lost — it is what /decision-layer and
            the homepage are for. The founders' own words stay in the body.
          */}
          <h1 className="mt-6 font-heading text-display font-bold text-paper">
            FiguredoutAI LLP, founded by Tanishk Singhal and Yashvardhan Awasthi.
          </h1>
          <p className="mt-7 max-w-[680px] text-lg leading-[1.6] text-body">
            Most businesses do not lose enquiries because nobody cared. They lose them because the
            enquiry arrived at 9:12 on a Tuesday and the person who could act on it was already on a
            call.
          </p>

          {/*
            The plain-prose answer to "what is FiguredoutAI, who founded it,
            where is it registered, and what does it do" — in one passage,
            near the top, naming the company rather than saying "we".

            This exists because of how it gets read. A search engine hedging
            a brand result with "did you mean" and an assistant hedging with
            "if you are referring to FiguredoutAI" are the same failure: no
            source states the identity outright in a form that can be lifted
            and quoted. Every other paragraph on this page argues a position;
            this one is the record. It is deliberately dull, self-contained,
            and free of anything the site cannot stand behind.

            It is prose, not a schema block, on purpose — the structured data
            in the head says the same thing, but a passage a model can quote
            is what actually lands in an answer.
          */}
          <p className="mt-6 max-w-[680px] text-lg leading-[1.6] text-body">
            FiguredoutAI is a growth infrastructure company registered in Noida, Uttar Pradesh, India
            as FiguredoutAI LLP, LLPIN ACZ-0822. It was founded by Tanishk Singhal, Chief Executive
            Officer, and Yashvardhan Awasthi, Chief Technology Officer. It builds conversational
            qualification layers: systems that read an incoming enquiry against a business&rsquo;s own
            criteria and decide what happens to it, rather than only replying to it.
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
          <CommitmentRows rows={workRows} />
        </LabelledSection>
      </Container>

      <FounderQuoteBand />

      <Container className="pb-24">
        <EntityBlock headingId="entity-heading" />
      </Container>
    </div>
  )
}
