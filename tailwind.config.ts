import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { BRAND, GLASS, GLASS_LAYERS } from './lib/brand'

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
  theme: {
    extend: {
      colors: {
        ink: BRAND.ink,
        panel: { DEFAULT: BRAND.panel, raised: BRAND.panelRaised },
        teal: { DEFAULT: BRAND.teal, hover: BRAND.tealHover, active: BRAND.tealActive },
        sky: BRAND.sky,
        cyan: BRAND.cyan,
        paper: BRAND.paper,
        amber: BRAND.amber,
        loss: BRAND.loss,
        ok: BRAND.ok,
        line: BRAND.line,
        body: BRAND.body,
        muted: BRAND.muted,
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '72rem',
        prose: '44rem',
      },
      borderRadius: {
        card: '16px',
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
        // Ported from figuredoutai.com — the heading gradient drift and glint.
        'liquid-shift': {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        'liquid-glint': {
          '0%, 100%': { opacity: '0.18', transform: 'translateX(-18%) skewX(-12deg)' },
          '50%': { opacity: '0.5', transform: 'translateX(16%) skewX(-12deg)' },
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
