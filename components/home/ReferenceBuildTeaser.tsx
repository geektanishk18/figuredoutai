import { Button, Container, Eyebrow, Reveal } from '@/components/ui'

const PARTS = [
  'Buyer-facing portal',
  'WhatsApp qualification layer',
  'Admin panel',
  'Voice qualification',
]

export function ReferenceBuildTeaser() {
  return (
    <Container as="section" aria-labelledby="reference-heading" className="py-20 sm:py-28">
      <Reveal>
        <div className="rounded-card border border-line bg-panel p-7 sm:p-10">
          <Eyebrow>Reference build</Eyebrow>

          <h2
            id="reference-heading"
            className="mt-4 max-w-2xl text-[1.625rem] font-semibold sm:text-[2rem]"
          >
            A reference implementation of the decision layer, built end to end.
          </h2>

          <p className="mt-5 max-w-2xl text-[15px] text-body sm:text-base">
            A system we designed and built, and whose IP we own.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {PARTS.map((part) => (
              <li
                key={part}
                className="rounded-full border border-line px-3 py-1.5 text-[13px] text-body"
              >
                {part}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/reference-build" variant="secondary">
              See the architecture
            </Button>
          </div>
        </div>
      </Reveal>
    </Container>
  )
}
