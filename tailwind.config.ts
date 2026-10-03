import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { BRAND, CHAT, GLASS, GLASS_LAYERS } from './lib/brand'

/**
 * Brand tokens are the single source of colour truth for the site.
 * Values match the printed brochure and visiting cards.
 *
 * Text-on-ink opacity ladder — never go below `muted` (56%):
 *   paper  100%  headings          17.15:1 on ink
 *   body    72%  body copy          8.95:1 on ink
 *   muted   56%  secondary/labels   5.70:1 on ink
 *
 * `teal` measures 3.02:1 on ink. It is a surface, fill and CTA colour only —
 * never use it for body text. Text sitting on a teal surface uses `paper` (5.67:1).
 */
/**
 * `#RRGGBB` -> `"R G B"`, for CSS custom properties that need to carry an alpha.
 * Derived from the token rather than transcribed, so the two cannot drift.
 */
function channels(hex: string): string {
  const n = Number.parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  /**
   * Tailwind's content scan is plain string matching, so the word
   * "transition" inside a code comment was enough to emit the bare
   * `.transition` utility — whose property list includes box-shadow, filter
   * and backdrop-filter, every one of them forbidden here. No element ever
   * used the class, but the rule sat in the built CSS and any honest audit of
   * animated properties had to flag it. Blocking it keeps that audit clean and
   * makes reaching for the catch-all a build-time no-op rather than a
   * performance regression nobody notices.
   *
   * The explicit `transition-opacity` / `transition-transform` utilities are
   * unaffected.
   */
  blocklist: ['transition'],
  theme: {
    extend: {
      colors: {
        ink: BRAND.ink,
        panel: { DEFAULT: BRAND.panel, raised: BRAND.panelRaised },
        teal: { DEFAULT: BRAND.teal, hover: BRAND.tealHover, active: BRAND.tealActive },
        sky: BRAND.sky,
        peak: BRAND.peak,
        cyan: BRAND.cyan,
        paper: BRAND.paper,
        amber: BRAND.amber,
        loss: BRAND.loss,
        ok: BRAND.ok,
        /**
         * The demo's inverted chat surface. Scoped under `chat-` so it is
         * obvious at the call site that these are not page text tokens and do
         * not follow the on-ink opacity ladder.
         */
        chat: {
          header: CHAT.header,
          canvas: CHAT.canvas,
          incoming: CHAT.incoming,
          outgoing: CHAT.outgoing,
          text: CHAT.text,
          meta: CHAT.meta,
          'dead-bg': CHAT.deadBg,
          'dead-text': CHAT.deadText,
          'live-bg': CHAT.liveBg,
          'live-text': CHAT.liveText,
        },
        line: BRAND.line,
        body: BRAND.body,
        muted: BRAND.muted,
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      /**
       * The type scale.
       *
       * Before this existed the site carried 35 distinct arbitrary font sizes —
       * `text-[15px]`, `text-[15.5px]`, `text-[16px]` and `text-[16.5px]` were
       * four separate body sizes nobody could tell apart, and every new
       * component invented a 36th. Colour and spacing were already single-source
       * (`lib/brand.ts`, the named spacing steps); type was the one axis with no
       * system behind it.
       *
       * Nine steps, named by the job rather than the size, on a 1.25 major third
       * anchored at 1rem. Line-height and tracking travel with the step, so a
       * heading cannot be set at the right size with the wrong leading.
       *
       * The two display steps clamp because they are the only type on the page
       * that should respond to viewport width; everything from `h3` down holds
       * its size and lets the measure do the work instead.
       *
       * Tailwind's default numeric sizes (`text-sm`, `text-lg`) still resolve —
       * `extend` adds rather than replaces — so existing call sites keep working
       * while components migrate onto these steps as they are touched.
       */
      fontSize: {
        /** Eyebrow pills and provenance chips. Uppercase, so tracked out. */
        chip: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        /** Diagram labels, table headers, stat captions. */
        micro: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        /** Secondary copy, captions, table cells. */
        small: ['0.875rem', { lineHeight: '1.5' }],
        /**
         * The default. Replaces the 15 / 15.5 / 16 / 16.5px cluster.
         *
         * Named `copy`, not `body`: `colors.body` already exists, and Tailwind
         * serves both `fontSize` and `textColor` from the same `text-*` prefix.
         * A `fontSize.body` step would make `text-body` — used 76 times as a
         * colour — resolve to whichever plugin registered last.
         */
        copy: ['1rem', { lineHeight: '1.6' }],
        /**
         * Page ledes and the opening prose every page owes its core question.
         * One step above body so the answer reads as the answer.
         */
        lede: ['1.0625rem', { lineHeight: '1.65' }],
        /** Card titles, disclosure summaries. */
        h4: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        /** Sub-section headings, FAQ questions. */
        h3: ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        /** Section headings. */
        h2: ['clamp(1.5rem, 2.6vw, 1.875rem)', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        /** Page H1. The only step allowed to dominate a viewport. */
        display: ['clamp(2.125rem, 5.4vw, 3.875rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        container: '72rem',
        prose: '44rem',
      },
      /**
       * Board 1e's radius scale, named by what each step is for. `card` is kept
       * as an alias of the 16px step so existing call sites keep working.
       */
      borderRadius: {
        chip: '4px',
        frame: '8px',
        tab: '11px',
        tile: '16px',
        card: '16px',
        panel: '20px',
      },
      /**
       * Board 1e's spacing scale. Tailwind's default numeric scale stays
       * available; these are the named steps the design actually measures in,
       * so a value like `p-card` is traceable back to the token sheet.
       */
      spacing: {
        dot: '8px',
        row: '14px',
        card: '20px',
        belief: '26px',
        rules: '32px',
        founder: '36px',
        col: '48px',
        gutter: '56px',
        section: '88px',
      },
      transitionDuration: {
        180: '180ms',
      },
      keyframes: {
        // Rise only. It used to fade from opacity 0 as well, which hid every
        // page's largest element for the first 180ms of every load and pushed
        // LCP back by that much on all routes.
        'fade-rise': {
          from: { transform: 'translateY(12px)' },
          to: { transform: 'none' },
        },
        typing: {
          '0%, 60%, 100%': { opacity: '0.3' },
          '30%': { opacity: '1' },
        },
        // Compositor-only. Never add filter, box-shadow, width or opacity here.
        'orb-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 180ms ease-out both',
        'orb-spin': 'orb-spin 90s linear infinite',
        typing: 'typing 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    /**
     * `glass-veil` / `glass-panel` / `glass-modal`.
     *
     * A component picks a tier and never writes a blur value, which keeps the
     * 24px ceiling greppable and the six-surface budget countable. Each tier
     * composes the same four layers so glass reads as one material.
     *
     * The `@supports` fallback and `prefers-reduced-transparency` branch are
     * defined here, with the tier itself, rather than left to each component
     * to remember.
     */
    /**
     * Brand values as CSS custom properties.
     *
     * `globals.css` needs a few brand colours for rules that Tailwind classes
     * cannot express (gradients clipped to text, keyframes). Emitting them here
     * from `BRAND` keeps `lib/brand.ts` the only place a colour is defined —
     * without this, globals.css grows a second, silently drifting palette.
     */
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--brand-ink': BRAND.ink,
          '--brand-sky': BRAND.sky,
          '--brand-peak': BRAND.peak,
          '--brand-paper': BRAND.paper,
          /**
           * Space-separated channels, for the rules in `globals.css` that need
           * a brand colour at partial alpha — slider tracks, the edge-light
           * gradient, the hover border.
           *
           * Those were written as literal `rgba(144, 194, 231, …)`, which is
           * `sky` copied by hand into five places with no link back to the
           * token. A hex custom property cannot be given an alpha, so the
           * channels are emitted separately and composed as
           * `rgb(var(--brand-sky-rgb) / 0.15)`.
           */
          '--brand-sky-rgb': channels(BRAND.sky),
          '--brand-paper-rgb': channels(BRAND.paper),
        },
      })
    }),
    plugin(({ addComponents }) => {
      const tiers = Object.entries(GLASS).map(([name, { blur, saturate }]) => [
        `.glass-${name}`,
        {
          backgroundColor: GLASS_LAYERS.background,
          borderColor: GLASS_LAYERS.border,
          boxShadow: `inset 0 1px 0 ${GLASS_LAYERS.edgeLight}, 0 8px 32px ${GLASS_LAYERS.depth}`,
          '@supports (backdrop-filter: blur(1px))': {
            backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
          },
          // No backdrop-filter support, or the viewer has asked for reduced
          // transparency: fall back to the solid panel. Same box, same layout.
          '@supports not (backdrop-filter: blur(1px))': {
            backgroundColor: BRAND.panel,
          },
          '@media (prefers-reduced-transparency: reduce)': {
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            backgroundColor: BRAND.panel,
          },
        },
      ])
      addComponents(Object.fromEntries(tiers))
    }),
  ],
}

export default config
