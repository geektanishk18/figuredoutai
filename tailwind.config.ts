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
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
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
