# FiguredoutAI — figuredoutai.com

Production marketing site for **FiguredoutAI LLP** · LLPIN ACZ-0822 · Noida, Uttar Pradesh, India.

## Stack

| Concern   | Choice |
|-----------|--------|
| Framework | Next.js 14 App Router, TypeScript (static HTML per route) |
| Styling   | Tailwind CSS |
| Animation | CSS transitions + `IntersectionObserver`; Framer Motion only in the homepage hero |
| Forms     | react-hook-form + zod |
| Email     | Resend, via a Route Handler |
| Deploy    | Vercel |
| Database  | None |

## Getting started

```bash
npm install
npm run dev
```

Requires Node ≥ 18.18.

| Script              | Does |
|---------------------|------|
| `npm run dev`       | Dev server |
| `npm run build`     | Production build — must be clean before any layer is signed off |
| `npm run lint`      | ESLint, zero warnings tolerated |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build:orb` | Regenerates `assets/orb-glow.webp` from `public/branding/orb-transparent.png`. Only needed if the orb artwork changes — the output is committed. |

Copy `.env.example` to `.env.local` before running the contact form locally.

## Layout

```
app/         routes (App Router)
components/  ui/ primitives, then feature components
lib/         constants, helpers
assets/      build-generated images imported by components (never served directly)
public/      static assets
legacy/      the previous Vite site, kept for reference only — not built, not linted
```

## Conventions

- **Brand tokens live in `tailwind.config.ts`.** Do not hard-code hex values in components.
- Text opacity ladder on ink: `text-paper` (headings) → `text-body` 72% → `text-muted` 56%. Never below 56%.
- `teal` is a surface and CTA colour. It measures 3.02:1 on ink and is never used for body text.
- Every interactive element carries `.focus-ring` (or `.focus-ring-panel` on raised surfaces).
- Every animation is guarded by `prefers-reduced-motion`.
- `hello@figuredoutai.com` is the only email address permitted in rendered HTML.
- The hero orb's glow is baked into a raster at build time. Never reintroduce a `filter: blur()`
  behind it — large blur radii on an animated layer are the mobile crash vector this replaced.
- The mobile drawer must stay a **sibling** of `<header>`, not a child: the header's
  `backdrop-filter` creates a containing block that would size the drawer's `inset-0`
  against the 64px header instead of the viewport.
