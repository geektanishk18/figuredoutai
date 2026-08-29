import { IndustryDemo } from '@/components/demo'
import { Container, Liquid, Reveal, SectionHeading } from '@/components/ui'

/**
 * The demo as the homepage's product shot — board 1a.
 *
 * No vertical switcher here. Board 1a imports the panel bare
 * (`<dc-import name="QualifyDemo">`) while the industry boards pass
 * `switcher="true"`, and the heading is why: the homepage asks a clinic-specific
 * question, so offering six verticals under it would contradict the copy. The
 * switcher belongs on the industry pages, where the reader has already picked a
 * subject and comparing is useful.
 */
export function DemoSection() {
  return (
    <Container as="section" id="demo" aria-labelledby="demo-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="demo-heading"
          align="center"
          eyebrow="Patient Response Check"
          title={
            <>
              How many patients <Liquid>never reach</Liquid> your clinic?
            </>
          }
          description="Enter your numbers. The arithmetic builds itself."
          className="mx-auto text-center"
        />
      </Reveal>

      <div className="mt-12">
        <IndustryDemo defaultIndustry="medical-clinics" showSwitcher={false} />
      </div>
    </Container>
  )
}
