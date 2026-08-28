# FiguredoutAI website rebuild — handoff

**Project:** `/Users/tanishk-ai/projects/FiguredoutAI-main`
**Last updated:** 2026-08-28
**State:** All 8 build layers complete and verified. A brand/animation rework is
partially applied. One decision is open (see *Open decisions*).

---

## 0. Read this first — environment traps

These will waste your time if you don't know them.

### Node is not on PATH

There is no system Node on this Mac. Node 22.23.2 lives at `~/.local/node`,
installed from the official tarball (checksum-verified). `/usr/local/bin` is not
writable, so it could not be symlinked.

**Prefix every npm/node/npx command:**

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

The user has *not* added this to their shell profile — a fresh terminal still
won't find `node`.

### Restarting the production server — do it this way

A backgrounded `next start` gets killed when the tool shell resets, and a stale
server can keep serving a **deleted** `.next` directory, which looks exactly
like "my changes aren't applying". Always kill by PID:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd /Users/tanishk-ai/projects/FiguredoutAI-main
for pid in $(lsof -nP -tiTCP:3100 -sTCP:LISTEN 2>/dev/null); do kill -9 "$pid"; done
sleep 1
nohup node node_modules/next/dist/bin/next start --port 3100 > /tmp/fdai.log 2>&1 < /dev/null &
disown
```

Then confirm the served output actually changed — don't trust the browser:

```bash
curl -s http://localhost:3100/ | grep -o '<h1[^>]*>.\{0,120\}'
```

### Browser pane quirks

- It **wedges** after repeated interactions: clicks time out, screenshots come
  back blank. Fix: `tabs_close` then `preview_start` a fresh tab. Blank
  screenshots after a programmatic scroll are almost always capture failures —
  verify against the DOM before reporting a defect. This cost me three
  false-alarm investigations.
- Coordinate-based clicks/hovers are unreliable under viewport emulation (the
  pane scales). Prefer `ref`-based clicks, or drive via JS.
- fps measured in a **non-fronted tab** reads ~20fps because rAF is throttled.
  `tabs_select` first. (I nearly reported a false performance regression.)
- Key names: use `ArrowRight`/`ArrowLeft`, **not** `Right`/`Left`.

### Testing techniques that work

- **Responsive sweep without navigating:** load each route into a
  width-controlled `<iframe>` and measure `contentDocument`. 17 routes × 5
  widths in ~4 calls.
- **Reduced motion:** stub `window.matchMedia` then client-navigate away and
  back so components remount. For *CSS-only* gates (the orb), instead walk
  `document.styleSheets` recursively and flip
  `(prefers-reduced-motion: no-preference)` media rules to `not all`. Note:
  mutating `mediaText` sometimes stops re-resolving computed styles and corrupts
  the tab — recreate it after.
- **Lighthouse** is installed with `--no-save`, so **any `npm install` wipes
  it**. Reinstall: `npm install --no-save lighthouse@12.8.2`. Set
  `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
  Warm the image optimiser first or the first run misreads LCP.
- **zsh does not word-split unquoted variables.** `for r in $ROUTES` runs once
  with the whole string. List items literally.
- Server-only modules (`lib/server/*`) import `server-only`, which throws outside
  a server context. To unit-test them:
  `NODE_OPTIONS="--conditions=react-server" npx tsx test.ts`

---

## 1. What this is

Production marketing site for **FiguredoutAI LLP** · LLPIN ACZ-0822 · Noida.

Rebuilt from a "master build prompt" that works in 8 numbered layers, each with
a QA gate. The previous Vite + React Router site is preserved untouched in
`legacy/` (gitignored, excluded from tsconfig and ESLint). It contains
`ClientReviews.jsx` and `CaseStudies.jsx` — **do not port those**, they violate
the proof rules.

### Copy sources of truth

`~/Downloads/Website Rebuild/`:

| File | Governs |
|---|---|
| `00_COMPANY_KNOWLEDGE_BASE.md` | Parent file — entity, positioning, voice, proof rules |
| `01_ABOUT_PAGE.md` | `/about` |
| `02_SERVICES_PAGE.md` | `/services` |
| `03_WHY_US_PAGE.md` | `/why-us` |
| `04_CONTACT_PAGE.md` | `/contact` + form spec |
| `demo.html` | Reference for the interactive demo (ported in Layer 2) |

**Content file wins on copy; the build prompt wins on architecture.**

### Non-negotiable copy rules

1. No fabricated proof — no client names, logos, counts, testimonials, revenue
   or performance figures.
2. **Never state or imply we lack clients.** No "pre-revenue", "early-stage",
   "we're new", "first clients". Redirect to what's verifiable; never confess.
3. Never call our product a chatbot/bot/assistant. It is a **decision layer**.
4. No AI-slop vocabulary (revolutionary, seamless, leverage, unlock, robust,
   elevate, harness, 10x, cutting-edge, best-in-class, …). No exclamation marks
   in site chrome.
5. "We", never "I".

Legitimate exceptions already reviewed and kept: "chatbot" used **contrastively**
(11 instances, all describing the competing category); one quoted patient line
`"I need a check-up next month"` on `/industries/medical-clinics`; the `/why-us`
disclaimer that names testimonials in order to say we don't publish them.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **15.5.24** App Router, TypeScript, static per route |
| Styling | Tailwind **3.4.18**, tokens in `tailwind.config.ts` ← `lib/brand.ts` |
| Animation | CSS + `IntersectionObserver`. **Framer Motion is NOT installed** (see Open decisions) |
| Content | MDX (`content/*.mdx`) via `@next/mdx`, styled by `mdx-components.tsx` |
| Forms | react-hook-form + zod |
| Email | Resend, via `app/api/lead/route.ts` |
| Database | None (by design) |
| Deploy | Vercel |

`npm audit`: **0 vulnerabilities**.

### Scripts

```
npm run dev        # dev server
npm run build      # production build — must be clean
npm run lint       # eslint . --max-warnings 0
npm run typecheck  # tsc --noEmit
npm run build:orb  # regenerates assets/orb-glow.webp (only if orb art changes)
```

---

## 3. Routes — 17 pages, all static

```
/                        home (hero, demo, comparison, how-it-works, industries, reference build, audit CTA)
/decision-layer          category argument
/how-it-works            4 phases + FAQ (carries FAQPage schema)
/services                three services
/why-us                  positional argument + "What we do not claim"
/about                   founders, entity, LLPIN
/reference-build         architecture, qualification logic, screens
/contact                 audit copy + lead form
/privacy  /terms         ported legal
/industries              index
/industries/[slug]       6 pages: medical-clinics, real-estate, restaurants,
                         travel, recruitment, hvac
/api/lead                POST handler (dynamic); GET = dev-only config health check
```

**Reserved, deliberately absent:** `/ai-for-businesses`. Returns 404, excluded
from `sitemap.ts`, disallowed in `robots.ts`. Keep it that way.

---

## 4. Architecture traps — do not "simplify" these

Each of these was a real bug that took measurement to find.

1. **The mobile drawer must stay a *sibling* of `<header>`, never a child.**
   The header has `backdrop-blur-md`, and `backdrop-filter` creates a containing
   block for fixed-position descendants. As a child, the drawer's `fixed inset-0`
   sized against the 64px header and rendered 463×63. Applies to any future
   modal/overlay.

2. **The demo thread scroll container must not use `justify-end`.**
   `justify-content: flex-end` on an `overflow-y: auto` container pushes overflow
   past the *start* edge where it cannot be scrolled to. Measured: 456px of
   messages in a 312px box reported `scrollHeight === clientHeight`. The inner
   wrapper uses `mt-auto` instead; bubbles carry `shrink-0`.

3. **The `<noscript>` block in `app/layout.tsx` is load-bearing.**
   Scroll-reveal sections render `data-reveal="hidden"` server-side. Without JS
   the observer never runs, so the `<noscript><style>` override un-hides them.
   An earlier attempt used an inline script adding a `.js` class — it never
   reached the served HTML and the animation silently did nothing.

4. **`app/opengraph-image.tsx` does NOT cascade to child segments.**
   Every route needs its own file. Adding `openGraph` to a page's `metadata`
   also *replaces* the parent's openGraph object wholesale.

5. **The lead-delivery address appears in no source file.**
   `lib/server/lead-email.ts` reads `process.env.LEAD_DELIVERY_EMAIL` and throws
   if unset. Both `lib/server/*` modules `import 'server-only'`, and an ESLint
   `no-restricted-syntax` rule blocks the literal in `app/`, `components/`,
   `lib/`. Never inline it as a default.

6. **`useScriptPlayer` leak guards.** Timeout IDs in a ref, cleared on cleanup
   *and* at the start of each run, plus an incrementing run-token checked inside
   every callback. This prevents clinic messages appearing in the HVAC thread
   after a fast industry switch. Verified: 29 message additions across 10 rapid
   switches + 10 tab toggles, zero cross-contamination.

7. **No `filter: blur()` above 24px anywhere.** The old site stacked
   `blur-[96px]`, `blur-[120px]`, `blur-[72px]` — the mobile crash vector. The
   orb's glow is baked into `assets/orb-glow.webp` at build time. The only
   runtime blurs are the nav's 12px `backdrop-filter` and the liquid glint's
   12px. **The live site at figuredoutai.com has 72 elements blurring at
   72–130px — do not port that.**

---

## 5. Brand system

`lib/brand.ts` is the single source of colour truth; `tailwind.config.ts` imports
from it. Never hard-code hex in components.

```
ink #030A0E · panel #08171D (+raised #0C1F27) · teal #1B6579 (+hover #1F7187,
active #155264) · sky #90C2E7 · cyan #5EEBFF · paper #F0EDEF · amber #E8A33D ·
loss #D4645A · ok #4FA87C · line rgba(144,194,231,.16)
body = paper 72% · muted = paper 56% (the floor — never go lower)
```

Measured contrast on ink: paper 17.15:1 · body 8.95:1 · muted 5.70:1 ·
sky 10.49:1 · cyan 14.05:1. **teal is 3.02:1 — surface/CTA only, never body text.**

**Fonts:** Manrope (headings) + Inter (body), both `display: 'swap'`.
Manrope replaced Poppins to match the live site.

**`.liquid`** (`components/ui/Liquid.tsx`, CSS in `globals.css`) — the signature
heading accent ported verbatim from figuredoutai.com: a gradient clipped to the
glyphs, drifting once over 2.8s, with a 12px-blurred glint sweep at 2.6s. All
seven gradient stops clear AA (worst 5.23:1). Under reduced motion the gradient
stays (it's brand) but drift and glint stop. Currently on six words: `Chaos`,
`decides`, `order`, `handling it`, `numbers`, `No cost`. Use sparingly — one word
per heading, the one carrying the idea.

---

## 6. Verified state (Layer 8 final sweep)

| Check | Result |
|---|---|
| Lighthouse, 17 routes × mobile + desktop | Mobile worst: **Perf 85 · A11y 100 · BP 100 · SEO 100**. Desktop Perf 100 on all 17. CLS **0** everywhere |
| Responsive, 17 routes × 320/375/768/1024/1440 | 85 audits, zero overflow, one `h1` each, zero heading skips |
| Console errors | 17/17 routes clean |
| Interactive elements | 563 total, **zero without an accessible name** |
| Keyboard traverse | 25 stops, focus ring on every one, honeypot skipped |
| Link crawl | 17 internal hrefs, **zero 404s** |
| Scroll fps (fronted) | 60.4 fps, zero frames > 20ms |
| Secrets in client bundle | Zero |
| Build / lint / typecheck | Clean |

After the brand rework, `/` re-measured at **Perf 93–95 · A11y 100 · BP 100 ·
SEO 100 · CLS 0**, contrast audit PASS.

---

## 7. Open decisions — these need the user

### 7a. Content reduction (IN PROGRESS — this is the live task)

User asked for "enterprise level leverage, decrease the written content over the
pages". **Homepage is done: 778 → 481 words (−38%).** The other ten pages are
untouched:

```
/decision-layer   616    /industries                   614
/how-it-works     593    /industries/medical-clinics   738
/services         684    /industries/real-estate       685
/why-us           723    /industries/restaurants       695
/about            532    /industries/travel            660
/reference-build  428    /industries/recruitment       688
                         /industries/hvac              684
```

**The conflict:** the build prompt sets a **≥500 word floor** on the six industry
pages, reasoning that "duplicated boilerplate across six pages is the fastest
route to deindexing". Two options were put to the user, **awaiting their answer**:

- **(A) Restructure without deleting** — same word count, broken into cards,
  columns, pull-quotes so far less reads as a wall. SEO intact.
- **(B) Genuinely cut** to ~250–300 words each, accepting weaker organic reach.

Do not start until they choose.

### 7b. Framer Motion

The stack table permits it *only* in the homepage hero; it does not require it.
Not installed — CSS covers the hero and ~30KB would work against the stated
performance priority. Flagged to the user; they haven't objected.

### 7c. `/why-us` copy conflict — still unresolved

`03_WHY_US_PAGE.md` §02 says *"Most clients tell us the rule-design phase changed
how they think about their own intake."* That is a **client testimonial**, which
rule 1 forbids, and it contradicts the same page's closing section ("We do not
publish client logos, testimonials, or performance figures"). The source file
argues against itself.

`content/why-us.mdx` currently reads: *"The rule-design phase tends to change how
a business thinks about its own intake, independent of anything built
afterwards."* Same substance, no testimonial. **User has not confirmed.**

Also kept verbatim from their file despite brushing rule 2: *"We are early, and
we would rather show you a working system … than borrow credibility we have not
earned yet."* Flagged, not changed.

### 7d. Meta lengths over SERP limits (deliberate)

`/services` title (73), `/about` title (70), `/why-us` description (163) — all
content-file copy, verbatim by design. Leave unless the user says otherwise.

---

## 8. Before launch — user actions required

1. **Rotate the Resend API key.** One was pasted into a chat transcript on
   2026-08-28 and must be considered compromised. Delete it at
   <https://resend.com/api-keys>.
2. **Set the new key** — it must not pass through an assistant:
   ```bash
   read -rs KEY && printf 'RESEND_API_KEY=%s\n' "$KEY" >> .env.local && unset KEY
   ```
   `.env.local` is gitignored. `LEAD_DELIVERY_EMAIL=tanishk@figuredoutai.com` is
   already set; `RESEND_API_KEY` is intentionally empty.
3. **Verify the sending domain** for `LEAD_FROM_EMAIL` (now
   `hello@figuredoutai.com`) at <https://resend.com/domains> — an unverified
   sender is rejected even with a valid key. `LEAD_FROM_EMAIL` is required and
   no longer defaults: the old default pointed at a mailbox that does not
   exist, which lost leads silently.
4. **Send one real test submission** and confirm it arrives at
   `tanishk@figuredoutai.com` and that Reply goes to the submitter. This is the
   one QA item never verified end to end.
5. Set the same three vars in Vercel's environment.
6. Run **Google's Rich Results Test** against the deployed URL. Schema was
   validated locally (required props, `@id` resolution, schema-to-visible-copy
   match) but the hosted tool was never run.
7. Test on a **real Android device**. All mobile testing was 4× CPU emulation.

Diagnostic: `GET http://localhost:3100/api/lead` (dev only) reports which config
vars are missing, without printing any secret.

---

## 9. Known limitations

- **Rate limiting is in-memory**, therefore per-instance. The no-database
  constraint makes this the only consistent option; on Vercel it throttles per
  warm instance, not globally. Documented in `lib/server/rate-limit.ts`.
- **Footer copyright year is baked at build time** (`new Date().getFullYear()`).
  Shows a stale year if not rebuilt after New Year.
- The demo's WhatsApp-style thread uses literal WhatsApp palette hexes
  (`#ECE5DD`, `#D9FDD3`, `#0E5C52`) rather than brand tokens — deliberate, it
  depicts a third-party surface. The only hexes outside `lib/brand.ts`.
- Scrolling away mid-playback restarts the demo conversation on return rather
  than resuming. A completed run *is* remembered.
- ~12 KiB of legacy JS polyfills could be dropped by narrowing `browserslist`,
  but that changes real browser support for an India-first audience — a product
  decision, not a technical one.

---

## 10. Memory

Durable notes are in
`~/.claude/projects/-Users-tanishk-ai-projects-FiguredoutAI-main/memory/`,
indexed by `MEMORY.md` (auto-loaded each session):

```
node-runtime-location.md          Node isn't on PATH; lives in ~/.local/node
figuredoutai-rebuild.md           layered rebuild, legacy/ preserved
nav-drawer-containing-block.md    backdrop-filter breaks nested fixed overlays
chat-thread-scroll-container.md   justify-end makes overflow unreachable
scroll-reveal-nojs-fallback.md    the <noscript> un-hide block is load-bearing
lead-delivery-address-env-only.md never inline the address
og-images-do-not-cascade.md       each segment needs its own opengraph-image
why-us-testimonial-conflict.md    source file contradicts itself
```

---

## 11. Suggested first message for the new chat

> Continuing the FiguredoutAI website rebuild at
> `/Users/tanishk-ai/projects/FiguredoutAI-main`. Read `HANDOFF.md` first —
> especially §0 (environment traps) and §7 (open decisions).
>
> All 8 layers are complete and verified. The live task is §7a: content
> reduction. I choose option **[A restructure / B cut]**. Apply it to the ten
> remaining pages and re-run the Layer 8 gates.
