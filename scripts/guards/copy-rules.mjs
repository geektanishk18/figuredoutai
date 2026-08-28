/**
 * Rule B — no stage signalling.
 *
 * Never state or imply the company's stage, age, size, or maturity. Absence of
 * published client work is described as policy, or not described at all.
 *
 * Patterns are anchored to the company as subject rather than matching bare
 * vocabulary. "not yet considered" describing a mortgage, or React's "first
 * client render", are not violations — and a rule that flags them gets
 * switched off, which is the only way this stops working.
 */
export const STAGE_PATTERNS = [
  String.raw`we(?:'re| are| have been)\s+(?:still\s+)?(?:very\s+)?(?:early|new|young|growing|small)\b`,
  String.raw`\bpre[- ]revenue\b`,
  String.raw`\bearly[- ]stage\b`,
  String.raw`\bearly days\b`,
  String.raw`we (?:have not|haven't) earned`,
  String.raw`\bnot earned (?:it )?yet\b`,
  String.raw`\bas we grow\b`,
  String.raw`\bstill building (?:our|the) (?:company|business|team|practice)\b`,
  String.raw`\bour first clients?\b`,
  String.raw`\bfirst few clients\b`,
  String.raw`\b(?:we are|we're) a (?:startup|start-up|new)\b`,
  String.raw`\bnascent\b`,
  String.raw`\bfledgling\b`,
  String.raw`\bin its infancy\b`,
  String.raw`\bfor a company our (?:size|age)\b`,
]

/**
 * Rule A — no fabricated proof. Catches the specific failure mode of a
 * placeholder company name invented to fill a proof card.
 */
export const FABRICATED_PROOF_PATTERNS = [
  String.raw`\b(?:Acme|Contoso|ExampleCorp|Example Corp|Globex|Initech|Umbrella Corp|Widgets? Inc|Foo(?:Bar)? (?:Inc|Ltd))\b`,
  // Matches the emission, not the mention — a comment documenting the ban is
  // not a violation, but a schema block actually declaring one is.
  String.raw`['"]@type['"]\s*:\s*['"](?:Review|AggregateRating)['"]`,
  String.raw`\b(?:TestimonialCard|ClientLogoWall|FakeReview)\b`,
]

export const RULE_B_MESSAGE =
  "Rule B — no stage signalling. Never state or imply the company's stage, age, size, or maturity. Describe absence of published client work as policy, or not at all."

export const RULE_A_MESSAGE =
  'Rule A — no fabricated proof. Never invent a company name, testimonial, or rating to fill a proof block. Render a labelled scenario, or render nothing.'
