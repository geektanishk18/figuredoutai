/**
 * The single source of colour truth.
 *
 * Imported by `tailwind.config.ts` (to generate the utility classes) and by
 * anything that needs a raw hex outside CSS — theme-color metadata, OG image
 * generation, canvas fills. Components should use the Tailwind classes.
 *
 * Measured against #030A0E (ink):
 *   paper 100%  17.15:1   headings
 *   paper  72%   8.95:1   body copy      → token `body`
 *   paper  56%   5.70:1   secondary      → token `muted`  (never go lower)
 *   sky          10.49:1
 *   amber         9.24:1
 *   ok            6.86:1
 *   loss          5.48:1
 *   teal          3.02:1  surface/fill/CTA only — never body text
 *
 * Button label (paper) against its own surface, all three states AA-normal:
 *   teal 5.67:1 · tealHover 4.79:1 · tealActive 7.46:1
 */
export const BRAND = {
  ink: '#030A0E',
  panel: '#08171D',
  panelRaised: '#0C1F27',
  teal: '#1B6579',
  tealHover: '#1F7187',
  tealActive: '#155264',
  sky: '#90C2E7',
  /** Live-site accent, used for glows and the liquid heading gradient. 14.05:1 on ink. */
  cyan: '#5EEBFF',
  paper: '#F0EDEF',
  amber: '#E8A33D',
  loss: '#D4645A',
  ok: '#4FA87C',
  line: 'rgba(144, 194, 231, 0.16)',
  /** Body copy — paper at 72%. */
  body: 'rgba(240, 237, 239, 0.72)',
  /** Secondary copy — paper at 56%. The floor. */
  muted: 'rgba(240, 237, 239, 0.56)',
} as const

/**
 * Glass surface system.
 *
 * Three tiers, and components pick a tier rather than writing blur values. That
 * is what makes the 24px ceiling auditable by grep and the per-viewport budget
 * enforceable — an ad-hoc `backdrop-blur-[Npx]` anywhere defeats both.
 *
 * Hard ceiling: 24px. The live site stacks 72 elements blurring at 72–130px,
 * which is the mobile crash vector this rebuild exists to escape. Convincing
 * glass sits at 14–20px, so the ceiling costs nothing visually.
 *
 * `saturate()` is what separates glass from a grey scrim: it pulls colour
 * through from whatever sits behind, so the orb bleeds through the panels.
 *
 * WARNING: `backdrop-filter` creates a containing block for fixed-position
 * descendants. A glass surface must never contain one — that is the bug that
 * sized the mobile drawer to 463x63. Portal overlays to document.body.
 */
export const GLASS_BLUR_CEILING_PX = 24

export const GLASS = {
  /** Nav and sticky chrome. */
  veil: { blur: 10, saturate: 125 },
  /** Cards and scenario surfaces. */
  panel: { blur: 16, saturate: 140 },
  /** Drawer and dialog — portalled, never nested in another glass surface. */
  modal: { blur: 20, saturate: 150 },
} as const

export type GlassTier = keyof typeof GLASS

/** Every tier composes the same four layers. */
export const GLASS_LAYERS = {
  background: 'rgba(240, 237, 239, 0.045)',
  border: 'rgba(144, 194, 231, 0.16)',
  /** Top-edge specular highlight. */
  edgeLight: 'rgba(240, 237, 239, 0.09)',
  depth: 'rgba(3, 10, 14, 0.38)',
} as const

export function backdropFilterFor(tier: GlassTier): string {
  const { blur, saturate } = GLASS[tier]
  if (blur > GLASS_BLUR_CEILING_PX) {
    throw new Error(`Glass tier "${tier}" blurs at ${blur}px, above the ${GLASS_BLUR_CEILING_PX}px ceiling.`)
  }
  return `blur(${blur}px) saturate(${saturate}%)`
}
