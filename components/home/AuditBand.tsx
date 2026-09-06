import { Button, Container, Reveal } from '@/components/ui'
import { CTA } from '@/lib/constants'

export function AuditBand() {
  return (
    <section aria-labelledby="audit-heading" className="border-t border-line bg-panel/40">
      <Container className="py-20 sm:py-24">
        {/*
          The eyebrow here read "The Intake Audit" directly above a heading
          describing the intake audit. It labelled nothing the heading did not
          already say.
        */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="audit-heading" className="mt-4 text-[1.75rem] font-semibold sm:text-[2.25rem]">
            Three working days. No cost, no obligation.
          </h2>

          <p className="mt-5 text-base text-body sm:text-lg">
            We map where enquiries reach you and where they stop. You keep the written intake map,
            whether or not we work together.
          </p>

          <div className="mt-9 flex justify-center">
            <Button href={CTA.href} size="lg">
              {CTA.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
