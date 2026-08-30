import { IndustryDemo } from '@/components/demo'
import { Container, Reveal } from '@/components/ui'

/**
 * The demo as the homepage's product shot — board 1a, generalised.
 *
 * Board 1a hardcodes the panel to clinics with no switcher — it was drawn
 * before the homepage needed one. That was a defensible reading of the board,
 * but wrong for a homepage every non-clinic visitor lands on: nothing on the
 * page let a recruiter or a restaurant owner see their own numbers.
 *
 * `showHeading` moves the eyebrow and question into `IndustryDemo` itself, so
 * they track whichever industry is currently selected — the panel owns the
 * `slug` state already, and lifting it back up here would mean either
 * duplicating that state or forking the timer/cross-contamination guards in
 * `useScriptPlayer` to keep two owners in sync. One state owner, one hook.
 */
export function DemoSection() {
  return (
    <Container as="section" id="demo" className="py-20 sm:py-28">
      <Reveal>
        <IndustryDemo defaultIndustry="clinics" showSwitcher showHeading />
      </Reveal>
    </Container>
  )
}
