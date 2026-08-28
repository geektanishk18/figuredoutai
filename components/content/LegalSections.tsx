import type { LegalSection } from '@/lib/legal'

export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <div className="mt-4">
      {sections.map((section) => (
        <section key={section.heading} className="mt-12 first:mt-8">
          <h2 className="text-xl font-semibold text-paper sm:text-[1.375rem]">{section.heading}</h2>

          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[16px] leading-relaxed text-body">
              {paragraph}
            </p>
          ))}

          {section.bullets?.length ? (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-sky/70"
                  />
                  <span className="text-[16px] leading-relaxed text-body">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.closingParagraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[16px] leading-relaxed text-body">
              {paragraph}
            </p>
          ))}

          {section.email ? (
            <p className="mt-4">
              <a
                href={`mailto:${section.email}`}
                className="focus-ring rounded text-sky underline underline-offset-4 hover:text-paper"
              >
                {section.email}
              </a>
            </p>
          ) : null}
        </section>
      ))}
    </div>
  )
}
