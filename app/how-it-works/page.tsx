import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'
import Content from '@/content/how-it-works.mdx'
import { Faq, FaqSchema, type FaqItem } from '@/components/content/Faq'
import { PageShell } from '@/components/content/PageShell'
import { PhaseRoadmap } from '@/components/diagram'
import { PHASE_COUNT } from '@/lib/content/phases'

export const metadata: Metadata = pageMeta({
  title: 'How It Works — Four Phases, Your Rules',
  description:
    'Lead qualification, implemented in four phases: intake audit, logic design, build and deploy, managed operation. Your rules, documented and changeable.',
  path: '/how-it-works',
})

/**
 * Answers lead with the direct response in the first sentence, so they can be
 * quoted without distortion. The same list feeds the FAQPage schema.
 */
const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'We already tried a chatbot and it did not work. Why would this be different?',
    answer:
      'Most likely it answered questions without deciding anything. The model was rarely the problem — nobody built the qualification logic underneath it. The layer we build applies your rules; it does not improvise.',
  },
  {
    question: 'Will this replace our team?',
    answer:
      'No. It changes what reaches them. Your team stops spending its first hour on enquiries that were never going to convert, and starts on conversations that are already qualified.',
  },
  {
    question: 'Who owns the qualification logic?',
    answer:
      'You do. The rules are yours, documented, auditable and changeable. You are not renting access to a black box.',
  },
  {
    question: 'What happens when our criteria change?',
    answer:
      'The rules are configuration, not code. Changing them is a normal operating task, not a rebuild and not a support ticket.',
  },
  {
    question: 'What if the system gets a decision wrong?',
    answer:
      'Every decision is logged with its reasoning. Humans can override any outcome, and escalation paths are defined before launch rather than bolted on afterwards.',
  },
  {
    question: 'How is this different from agencies pitching AI automation?',
    answer:
      'Most connect tools so information moves. We build the layer that decides what happens to that information. Automation moves data; a decision layer applies judgement.',
  },
  {
    question: 'How long does the intake audit take?',
    answer:
      'Three working days, at no cost and no obligation. It needs roughly two hours of access across those days, and you keep the written intake map whether or not we work together.',
  },
] as const

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title="Four phases. You approve each one before it is billed."
      lede={
        <p>
          {`An engagement runs in ${PHASE_COUNT === 4 ? 'four' : PHASE_COUNT} phases: an intake audit that maps how enquiries reach you, a logic design phase that documents your qualification rules, a build that runs in parallel with your current process before it takes live traffic, and managed operation afterwards. You approve each phase before the next begins, and before it is invoiced.`}
        </p>
      }
      /*
        Full width: the roadmap has four columns and a horizontal spine, and
        the prose measure crushes it into the left half of the page.
      */
      wide={<PhaseRoadmap />}
      ctas={[
        { label: 'Get your intake audit', href: '/contact' },
        { label: 'What we build', href: '/services' },
      ]}
    >
      <FaqSchema items={FAQ_ITEMS} />
      <Content />
      <Faq items={FAQ_ITEMS} />
    </PageShell>
  )
}
