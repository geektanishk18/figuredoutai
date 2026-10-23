'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'

type DemoSpec = { title: string; intro: string; inputs: { label: string; options: string[] }[]; steps: { title: string; detail: string; output: string }[] }

const DEMOS: Record<string, DemoSpec> = {
  'system-1': {
    title: 'Prospecting sequence',
    intro: 'Explore a sample outbound workflow using fictional prospect data.',
    inputs: [{ label: 'Target segment', options: ['B2B SaaS founders', 'Marketing agencies', 'Recruitment teams'] }, { label: 'Sequence style', options: ['Helpful and concise', 'Insight-led', 'Direct'] }],
    steps: [
      { title: 'Define the ICP', detail: 'Set the audience, company profile and qualification signals.', output: 'Audience rules created: role, company type and relevance signals.' },
      { title: 'Research context', detail: 'Collect approved public context and identify a relevant business angle.', output: 'A fictional prospect record is enriched with role and company context.' },
      { title: 'Draft outreach', detail: 'Generate a personalised first touch based on the selected style.', output: 'A draft message is prepared for human review.' },
      { title: 'Review and follow up', detail: 'A person approves the message and the workflow tracks the next touch.', output: 'Follow-up is scheduled in the simulated pipeline; nothing is sent.' },
    ],
  },
  'system-2': {
    title: 'Content production flow',
    intro: 'Turn a source idea into channel-ready content with review checkpoints.',
    inputs: [{ label: 'Content channel', options: ['LinkedIn', 'Instagram', 'Newsletter'] }, { label: 'Voice', options: ['Expert and clear', 'Conversational', 'Bold'] }],
    steps: [
      { title: 'Capture source brief', detail: 'Start from a campaign idea or approved reference.', output: 'Brief structured into audience, message and objective.' },
      { title: 'Generate angles', detail: 'Explore useful themes and choose a relevant narrative.', output: 'Three content angles are available for selection.' },
      { title: 'Create draft', detail: 'Adapt the chosen angle to the selected channel and voice.', output: 'A channel-formatted draft is ready for editorial review.' },
      { title: 'Review and queue', detail: 'Check facts, brand voice and approval status.', output: 'Draft marked ready for review; no social post is published.' },
    ],
  },
  'system-3': {
    title: 'Lead intelligence preview',
    intro: 'See how a natural-language ideal customer profile becomes a reviewable shortlist.',
    inputs: [{ label: 'Market', options: ['India', 'United States', 'United Kingdom'] }, { label: 'Company size', options: ['1–10 employees', '11–50 employees', '51–200 employees'] }],
    steps: [
      { title: 'Describe the ICP', detail: 'Specify industry, geography, size and relevant signals.', output: 'Search criteria are structured from the selected market and company size.' },
      { title: 'Collect candidate records', detail: 'Gather candidate records from approved sources.', output: 'A fictional sample set is collected for the walkthrough.' },
      { title: 'Deduplicate and assess', detail: 'Remove duplicates and compare each record against the criteria.', output: 'Sample records receive fit reasons and review flags.' },
      { title: 'Review shortlist', detail: 'Inspect fit and decide which records should move forward.', output: 'A reviewable shortlist is prepared; no live database is queried.' },
    ],
  },
  'system-4': {
    title: 'Inbound conversion assistant',
    intro: 'Walk through a sample enquiry intake and qualification interaction.',
    inputs: [{ label: 'Enquiry type', options: ['Product enquiry', 'Service request', 'Demo request'] }, { label: 'Urgency', options: ['This week', 'This month', 'Just exploring'] }],
    steps: [
      { title: 'Capture enquiry', detail: 'Retain the source and the prospect’s stated need.', output: 'Sample enquiry captured with source context.' },
      { title: 'Ask missing questions', detail: 'Ask only relevant qualification questions.', output: 'A concise follow-up question is selected based on the enquiry.' },
      { title: 'Recommend next step', detail: 'Use the answers to suggest a suitable next action.', output: 'A suggested next step is prepared with a confidence note.' },
      { title: 'Route to a person', detail: 'Pass a structured summary to the appropriate owner.', output: 'A hand-off summary is displayed; no CRM or inbox is changed.' },
    ],
  },
  'system-5': {
    title: 'Multi-agent workflow',
    intro: 'Explore a conceptual process split into bounded specialist tasks.',
    inputs: [{ label: 'Process', options: ['Research and brief', 'Operations review', 'Customer onboarding'] }, { label: 'Review policy', options: ['Human approval required', 'Escalate exceptions'] }],
    steps: [
      { title: 'Receive trigger', detail: 'Capture request, context and permitted actions.', output: 'A task envelope is created for the selected process.' },
      { title: 'Delegate specialist tasks', detail: 'Assign bounded tasks with clear inputs and outputs.', output: 'Research, analysis and coordination steps are mapped.' },
      { title: 'Validate shared state', detail: 'Check outputs against rules and flag missing information.', output: 'Validation results and exceptions are summarised.' },
      { title: 'Approve completion', detail: 'Route consequential or uncertain actions for human approval.', output: 'A review-ready completion summary is produced.' },
    ],
  },
}

export function ProjectInteractiveDemo({ systemId }: { systemId: string }) {
  const spec = DEMOS[systemId]
  const [values, setValues] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0)
  const [ran, setRan] = useState(false)
  const current = spec?.steps[step]
  const configured = useMemo(() => spec?.inputs.map((input) => values[input.label] ?? input.options[0]).join(' · '), [spec, values])

  if (!spec || !current) return null

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-sky/15 bg-[radial-gradient(ellipse_at_top,rgba(0,217,237,.09),transparent_55%),#071016]" aria-label={spec.title}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 p-5 sm:p-6">
        <div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-sky"><Sparkles className="h-4 w-4" /> Interactive project demo</p><h3 className="mt-2 text-xl font-semibold text-paper">{spec.title}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-body">{spec.intro}</p></div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-muted">Local simulation</span>
      </div>
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="space-y-4">
          {spec.inputs.map((input) => <label key={input.label} className="block"><span className="mb-2 block text-xs font-medium text-body">{input.label}</span><select value={values[input.label] ?? input.options[0]} onChange={(event) => { setValues((v) => ({ ...v, [input.label]: event.target.value })); setStep(0); setRan(false) }} className="min-h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-paper focus:border-sky/50 focus:outline-none">{input.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
          <p className="rounded-xl border border-white/5 bg-black/20 p-3 text-xs text-muted">Scenario: {configured}</p>
        </div>
        <div>
          <ol className="grid gap-2 sm:grid-cols-2">{spec.steps.map((item, index) => <li key={item.title}><button type="button" aria-pressed={step === index} onClick={() => { setStep(index); setRan(false) }} className={`min-h-[78px] w-full rounded-xl border p-3 text-left transition-colors ${step === index ? 'border-sky/40 bg-sky/10' : 'border-white/5 bg-black/20 hover:border-white/15'}`}><span className="font-mono text-[10px] text-sky">STEP 0{index + 1}</span><span className="mt-1 block text-sm font-semibold text-paper">{item.title}</span></button></li>)}</ol>
          <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-4"><h4 className="text-sm font-semibold text-paper">{current.title}</h4><p className="mt-2 text-sm leading-relaxed text-body">{current.detail}</p>{ran ? <p role="status" className="mt-3 rounded-lg border border-teal/20 bg-teal/5 p-3 text-sm text-teal">{current.output}</p> : <p className="mt-3 text-xs text-muted">Choose “Run this step” to reveal the simulated output.</p>}</div>
          <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setRan(true)} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-sky px-4 text-sm font-semibold text-ink">Run this step <ArrowRight className="h-4 w-4" /></button><button type="button" onClick={() => { setStep(0); setRan(false) }} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-paper"><RotateCcw className="h-4 w-4" /> Reset</button>{step < spec.steps.length - 1 && <button type="button" onClick={() => { setStep((s) => s + 1); setRan(false) }} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-paper">Next step <ArrowRight className="h-4 w-4" /></button>}{step === spec.steps.length - 1 && ran ? <span className="inline-flex items-center gap-2 text-xs text-teal"><Check className="h-4 w-4" /> Walkthrough complete</span> : null}</div>
        </div>
      </div>
      <p className="border-t border-white/5 px-5 py-3 text-[11px] leading-relaxed text-muted sm:px-6">Demonstration uses local sample data only. No messages are sent, records updated, or third-party services called.</p>
    </section>
  )
}
