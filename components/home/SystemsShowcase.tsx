import Link from 'next/link'
import { ArrowUpRight, Bot, CalendarClock, Network, Search, Share2 } from 'lucide-react'
import { Container, Eyebrow, Reveal } from '@/components/ui'

const SYSTEMS = [
  { title: 'LinkedIn outbound prospecting', detail: 'Research prospects, tailor outreach and manage follow-up across a structured sequence.', Icon: Share2 },
  { title: 'AI content production', detail: 'Turn source material into channel-ready drafts with review and publishing checkpoints.', Icon: Bot },
  { title: 'AI lead prospecting engine', detail: 'Translate an ideal customer profile into search criteria, then organise and qualify candidate leads.', Icon: Search },
  { title: 'AI sales conversion agent', detail: 'Respond to inbound interest, ask qualification questions and guide prospects toward a relevant next step.', Icon: CalendarClock },
  { title: 'Multi-agent enterprise workflows', detail: 'Coordinate specialised agents across multi-step processes, with hand-offs and human approval where needed.', Icon: Network },
] as const

export function SystemsShowcase() {
  return (
    <Container as="section" aria-labelledby="systems-heading" className="py-20 sm:py-28">
      <Reveal>
        <Eyebrow>Systems we’ve built</Eyebrow>
        <h2 id="systems-heading" className="mt-4 max-w-3xl font-heading text-[1.8rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2.4rem]">
          Practical systems for the work that slows teams down.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
          Each system starts with an operational bottleneck and maps it to a repeatable workflow. Explore the problem, the approach and the outcome it is designed to support.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SYSTEMS.map(({ title, detail, Icon }, index) => (
          <Reveal key={title}>
            <Link href={`/systems#system-${index + 1}`} className="focus-ring group flex h-full min-h-[220px] flex-col rounded-card border border-line bg-panel p-5 transition-colors hover:border-sky/35 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky/20 bg-sky/5 text-sky"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-paper">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{detail}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky">Explore the system <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted">
        These are systems and workflow designs we have worked on—not published client case studies. Outcomes shown on the systems page are intended benefits, not measured client results.
      </p>
    </Container>
  )
}
