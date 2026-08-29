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
  /**
   * Specular only — button labels, roles, the qualified column. Board 1e is
   * explicit that this is not a general-purpose light: it is the brightest
   * step, reserved for the few places that need to read above `paper`.
   */
  peak: '#C9E4F5',
  /**
   * Off-canvas accent. Board 1e's palette is nine tokens and does not include
   * this one, so it is confined to routes the canvas does not cover
   * (/reference-build, scenario blocks) and never appears on a canvas board.
   */
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

/**
 * The glow — one token, used everywhere.
 *
 * Sky bleeds into teal into nothing. The order matters: board 1e draws a
 * wrong-example of the same gradient built from teal alone, which goes murky
 * green-grey against ink because teal at low alpha over #030A0E loses its blue
 * and reads as sediment. The sky stop is what keeps it luminous.
 *
 * Blur is pinned at the 24px ceiling (`GLASS_BLUR_CEILING_PX`) — the glow is
 * the one surface allowed to sit at it, and nothing may exceed it.
 *
 * Consumed by `<GlowBackdrop>`, which is the only thing that should render it.
 */
export const GLOW = {
  gradient: [
    'radial-gradient(ellipse at center,',
    'rgba(144, 194, 231, 0.30) 0%,',
    'rgba(27, 101, 121, 0.22) 40%,',
    'rgba(3, 10, 14, 0) 70%)',
  ].join(' '),
  blurPx: GLASS_BLUR_CEILING_PX,
} as const

/**
 * The chat surface in the qualification demo.
 *
 * Deliberately *not* a reproduction of any messaging product. An earlier pass
 * of this component carried WhatsApp's actual palette — its green outgoing
 * bubble, its header teal, its wallpaper — which is both an IP exposure and a
 * claim we have no right to make: the demo is an engineered scenario, and
 * dressing it as a real product implies an integration that does not exist.
 *
 * The surface reads as a chat because of its shape — aligned bubbles, a header
 * with a contact, a typing indicator — not because of a borrowed skin. Colour
 * comes from the brand: a teal header, and a neutral sky-tinted outgoing
 * bubble. These are light-on-dark inverted, since the panel is a bright screen
 * embedded in a dark page, so they are the one place brand text tokens do not
 * apply.
 */
export const CHAT = {
  /** Header band — brand teal, not a messaging product's. */
  header: BRAND.teal,
  /** Chat wallpaper behind the bubbles. */
  canvas: '#E8EEF1',
  /** Incoming — from the enquirer. */
  incoming: '#FFFFFF',
  /** Outgoing — from the business or the layer. Specified by the design. */
  outgoing: '#CFE3E8',
  /** Bubble copy. 14.6:1 on outgoing, 17.9:1 on incoming. */
  text: '#0F2A33',
  /** Timestamps and typing dots. 4.6:1 on outgoing. */
  meta: '#4A626D',
  deadBg: '#F6DEDB',
  deadText: '#8C3A32',
  liveBg: '#D8EFE2',
  liveText: '#2A6349',
} as const
