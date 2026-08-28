import { Eyebrow } from '@/components/ui'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqProps {
  items: readonly FaqItem[]
}

/**
 * Question-shaped headings with the direct answer in the first sentence beneath.
 * Rendered as plain markup rather than a disclosure widget so every answer is in
 * the HTML and quotable — the same reason the FAQPage schema is emitted.
 */
export function Faq({ items }: FaqProps) {
  return (
    <section aria-label="Common questions" className="mt-16">
      <Eyebrow className="mb-8">Common questions</Eyebrow>

      {items.map((item) => (
        <div key={item.question} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
          {/*
            Each question is its own heading, so the answer beneath it is
            addressable and quotable on its own — which is what an assistant
            summarising this page actually reads.
          */}
          <h2 className="mt-8 text-[1.25rem] font-semibold text-paper first:mt-0 sm:text-[1.375rem]">
            {item.question}
          </h2>
          <p className="mt-3 text-[16.5px] leading-relaxed text-body">{item.answer}</p>
        </div>
      ))}
    </section>
  )
}

/** JSON-LD for the same questions. Kept next to the component so they cannot drift. */
export function FaqSchema({ items }: { items: readonly FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <script
      type="application/ld+json"
      // Server-rendered constant, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
