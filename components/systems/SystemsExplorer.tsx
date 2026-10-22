'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, CircleHelp, Network, Search, Share2, Sparkles, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

const SYSTEMS = [
  {
    id: 'system-1',
    number: '01',
    title: 'LinkedIn outbound prospecting system',
    category: 'Outbound sales',
    Icon: Share2,
    problem: ['Manual prospect research consumes hours before a rep can start selling.', 'Generic messages get ignored and follow-ups fall through the cracks.', 'Activity is scattered across spreadsheets, browser tabs and inboxes.'],
    solution: ['Define an ideal customer profile and research criteria.', 'Prepare prospect context and draft personalised outreach for review.', 'Track a multi-touch sequence with clear follow-up states and human approval.'],
    outcome: ['Less time spent switching tools and assembling prospect lists.', 'More consistent, relevant outreach and follow-up.', 'A clearer view of which prospects need attention next.'],
    flow: ['ICP and targeting rules', 'Prospect research and context', 'Personalised draft generation', 'Human review and send', 'Follow-up state and reply triage'],
    disclosure: 'The walkthrough illustrates an outbound workflow. It does not connect to LinkedIn or send messages.',
  },
  {
    id: 'system-2',
    number: '02',
    title: 'AI content production system',
    category: 'Content operations',
    Icon: Sparkles,
    problem: ['Content production depends on repeated manual research and drafting.', 'Brand voice varies across channels and contributors.', 'Review, repurposing and publishing hand-offs are hard to track.'],
    solution: ['Turn a source brief or approved reference material into structured content angles.', 'Generate channel-specific drafts against defined brand and format rules.', 'Add human review, revisions and publishing checkpoints before anything goes live.'],
    outcome: ['Shorter first-draft cycles and more repeatable production.', 'Consistent formatting and brand guardrails across channels.', 'Clearer ownership of review and approval steps.'],
    flow: ['Source brief', 'Angle and outline generation', 'Channel-specific drafts', 'Human review and edits', 'Approved content queue'],
    disclosure: 'This is a representative production workflow. It does not publish to connected social accounts.',
  },
  {
    id: 'system-3',
    number: '03',
    title: 'AI lead prospecting engine',
    category: 'Lead intelligence',
    Icon: Search,
    problem: ['Teams spend time searching across disconnected sources.', 'Raw lists contain duplicates and prospects outside the ideal customer profile.', 'Sales reps receive data without a clear reason to prioritise one lead over another.'],
    solution: ['Translate a natural-language ICP into explicit search criteria.', 'Organise candidate records, remove duplicates and assess fit against the criteria.', 'Present a reviewable shortlist with fit reasons and enrichment status.'],
    outcome: ['Less manual list cleaning and qualification work.', 'More consistent prioritisation against the ICP.', 'A prospect list that explains why each record may be relevant.'],
    flow: ['Describe the ICP', 'Parse search criteria', 'Collect candidate records', 'Deduplicate and assess fit', 'Review and export shortlist'],
    disclosure: 'The demo uses fictional records only. It does not scrape websites or query a live prospect database.',
  },
  {
    id: 'system-4',
    number: '04',
    title: 'AI sales conversion agent',
    category: 'Inbound conversion',
    Icon: Workflow,
    problem: ['Inbound leads wait for a response while teams are busy.', 'Sales calls repeat the same qualification questions.', 'Leads are passed on without enough context for a useful next step.'],
    solution: ['Capture the enquiry and retain its source and context.', 'Ask structured questions about need, fit, budget or timing where appropriate.', 'Recommend a next step and route the summary to a person when confidence is low or a human decision is needed.'],
    outcome: ['Faster, more consistent initial responses when deployed with suitable integrations.', 'Better-prepared sales conversations.', 'Fewer context gaps between intake and follow-up.'],
    flow: ['Capture inbound interest', 'Understand need and fit', 'Ask missing questions', 'Suggest next step', 'Route context to sales'],
    disclosure: 'This is an interaction and decision-flow preview. No messages are sent and no CRM is updated.',
  },
  {
    id: 'system-5',
    number: '05',
    title: 'Multi-agent enterprise workflows',
    category: 'Enterprise operations',
    Icon: Network,
    problem: ['End-to-end processes span teams, tools and repetitive hand-offs.', 'A single automation becomes difficult to maintain as tasks and exceptions grow.', 'Operators lack visibility into where a process stalled or why a decision was made.'],
    solution: ['Split the process into bounded tasks handled by specialised agents or workflow steps.', 'Define shared context, tool permissions, validation and escalation rules.', 'Add checkpoints, logging and human approval for consequential or ambiguous actions.'],
    outcome: ['More observable, modular workflows.', 'Clearer responsibility for each process step.', 'A safer path to automate repeatable work while retaining human oversight.'],
    flow: ['Trigger and context', 'Specialist task agents', 'Validation and shared state', 'Approval or exception handling', 'Auditable completion summary'],
    disclosure: 'The diagram is a conceptual multi-agent workflow, not a live enterprise deployment.',
  },
] as const

export function SystemsExplorer() {
  const [activeId, setActiveId] = useState<string>('system-1')
  const [showFlow, setShowFlow] = useState(false)
  const [completed, setCompleted] = useState(false)
  const active = SYSTEMS.find((system) => system.id === activeId) ?? SYSTEMS[0]!

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (SYSTEMS.some((system) => system.id === hash)) setActiveId(hash)
  }, [])

  function selectSystem(id: string) {
    setActiveId(id)
    setShowFlow(false)
    setCompleted(false)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="h-fit rounded-card border border-line bg-panel p-3">
        <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Systems portfolio</p>
        <nav aria-label="Systems portfolio">
          <ul className="space-y-1">
            {SYSTEMS.map(({ id, number, title, Icon }) => (
              <li key={id}>
                <button type="button" onClick={() => selectSystem(id)} aria-pressed={activeId === id} className={cn('focus-ring flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium', activeId === id ? 'border border-sky/20 bg-sky/10 text-paper' : 'text-body hover:bg-panel-raised hover:text-paper')}>
                  <Icon aria-hidden="true" className={cn('h-4 w-4 flex-none', activeId === id ? 'text-sky' : 'text-muted')} />
                  <span className="min-w-0 flex-1">{title.replace(' system', '')}</span>
                  <span className="font-mono text-[10px] text-muted">{number}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 rounded-xl border border-line bg-ink/50 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-paper"><CircleHelp aria-hidden="true" className="h-4 w-4 text-sky" /> What this is</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">A portfolio of system designs and interactive workflow previews. Not a claim of client deployment or measured results.</p>
        </div>
      </aside>

      <section id={active.id} className="min-w-0 rounded-card border border-line bg-panel">
        <div className="border-b border-line p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sky/20 bg-sky/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-sky">{active.category}</span>
            <span className="font-mono text-xs text-muted">SYSTEM {active.number}</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-paper sm:text-3xl">{active.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">A practical workflow concept: identify the bottleneck, design the operating system around it, and keep outcomes reviewable.</p>
        </div>

        <div className="grid gap-0 md:grid-cols-3">
          <ContentColumn title="The business problem" points={active.problem} number="01" />
          <ContentColumn title="How the system addresses it" points={active.solution} number="02" />
          <ContentColumn title="Potential business outcomes" points={active.outcome} number="03" />
        </div>

        <div className="border-t border-line p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-sky">Interactive workflow map</p>
              <p className="mt-1 text-sm text-body">Walk through the main stages and see how the work moves.</p>
            </div>
            <button type="button" onClick={() => { setShowFlow((value) => !value); setCompleted(false) }} aria-expanded={showFlow} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-paper hover:border-sky/30">
              {showFlow ? 'Hide workflow' : 'Explore workflow'} <ChevronDown aria-hidden="true" className={cn('h-4 w-4 transition-transform', showFlow && 'rotate-180')} />
            </button>
          </div>

          {showFlow ? (
            <div className="mt-5">
              <ol className="space-y-2">
                {active.flow.map((step, index) => (
                  <li key={step} className={cn('flex items-center gap-3 rounded-xl border p-3.5 transition-colors', completed ? 'border-emerald-400/20 bg-emerald-400/5' : 'border-line')}>
                    <span className={cn('flex h-7 w-7 flex-none items-center justify-center rounded-full border font-mono text-xs', completed ? 'border-emerald-400/30 text-emerald-300' : 'border-line text-muted')}>{completed ? <Check aria-hidden="true" className="h-4 w-4" /> : index + 1}</span>
                    <span className="flex-1 text-sm font-medium text-paper">{step}</span>
                    {completed ? <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Previewed</span> : null}
                  </li>
                ))}
              </ol>
              <button type="button" onClick={() => setCompleted((value) => !value)} className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal px-4 text-sm font-semibold text-paper">
                {completed ? 'Reset walkthrough' : 'Run workflow preview'} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              {completed ? <p role="status" className="mt-3 text-sm text-body">Preview complete. These stages were simulated locally; no external service was triggered.</p> : null}
            </div>
          ) : null}

          <p className="mt-5 rounded-xl border border-line bg-ink/40 p-3 text-xs leading-relaxed text-muted">{active.disclosure}</p>
        </div>
      </section>
    </div>
  )
}

function ContentColumn({ title, points, number }: { title: string; points: readonly string[]; number: string }) {
  return (
    <div className="border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:p-6 md:last:border-r-0">
      <p className="font-mono text-[10px] text-sky">{number}</p>
      <h3 className="mt-2 text-base font-semibold text-paper">{title}</h3>
      <ul className="mt-4 space-y-3">
        {points.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-body"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky/70" />{point}</li>)}
      </ul>
    </div>
  )
}
