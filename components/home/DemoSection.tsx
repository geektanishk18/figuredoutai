import { IndustryDemo } from '@/components/demo'
import { Container, Liquid, Reveal, SectionHeading } from '@/components/ui'

export function DemoSection() {
  return (
    <Container as="section" id="demo" aria-labelledby="demo-heading" className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          id="demo-heading"
          align="center"
          eyebrow="See it work"
          title={<>Pick your industry. Put your own <Liquid>numbers</Liquid> in.</>}
          className="mx-auto text-center"
        />
      </Reveal>

      <div className="mt-12">
        <IndustryDemo defaultIndustry="medical-clinics" />
      </div>
    </Container>
  )
}
