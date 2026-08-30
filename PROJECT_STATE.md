# FiguredoutAI — Project State Handoff

**Generated:** 30 August 2026
**Branch:** `claude/design-system-verify-rebuild-641b6d`
**HEAD:** `f0866c4`
**Worktree:** `.claude/worktrees/design-system-verify-rebuild-641b6d`

---

## 1. Status at a glance

| Thing | State |
|---|---|
| Local production server | **Working** — `http://10.30.34.7:3000` |
| All QA gates | **Passing** |
| Production build | **Passing** — 38 routes |
| Netlify site created + linked | **Yes** — `figuredoutai` |
| Netlify deploy serving pages | **BROKEN** — every route 404s |
| Git remote | **None** |

The site builds and runs correctly. The Netlify deployment is **not usable** —
see §6 for the exact cause and the fix.

---

## 2. Access

### Local network (works now)

```
http://10.30.34.7:3000
```

Any device on the same Wi-Fi. Verified 200 on `/`, `/about`, `/why-us`,
`/contact`, `/industries/clinics` over the LAN IP.

To restart after a reboot:

```bash
npm run build && npx next start -H 0.0.0.0 -p 3000
```

`-H 0.0.0.0` is what makes it reachable off-machine. Without it, localhost only.

### Netlify (created, not working)

| | |
|---|---|
| Production URL | https://figuredoutai.netlify.app |
| Admin | https://app.netlify.com/projects/figuredoutai |
| Project ID | `b9769ea7-9a05-4ccd-a15b-b58431dd95df` |
| Team | Figuredout.ai (`tanishk1440`) |

Static assets serve (`/brand/*`, `/site.webmanifest` → 200). Every page → 404.

---

## 3. QA gates — all passing

```
typecheck  (tsc --noEmit)      PASS   no errors
eslint --max-warnings 0        PASS
check-copy                     PASS   no violations
check-scope                    PASS   12 clauses intact, /services 679 words
check-blur                     PASS   128 files, none above 24px
check-containing-block         PASS   no glass surface holds a fixed descendant
next build                     PASS   38 routes
```

Run them all with `npm run lint` (eslint + all four guards) and `npm run build`.

### Route sweep — local, 20/20

All 200: `/` `/why-us` `/about` `/contact` `/industries` and all six industry
pages, `/decision-layer` `/how-it-works` `/services` `/reference-build`
`/privacy` `/terms` `/sitemap.xml` `/robots.txt` `/site.webmanifest`

- `/industries/medical-clinics` → **308** → `/industries/clinics`
- unknown route → **404** (not a crash)
- `POST /api/lead {}` → **400** (validates input, does not 500)

---

## 4. What was built

### Design parity

Six routes rebuilt against the canvas boards and the reference PNGs:

| Route | Board | H1 |
|---|---|---|
| `/` | 1a | More revenue, handled by fewer people. |
| `/why-us` | 1b | Qualification logic is built, not downloaded. |
| `/industries/clinics` | 1c | The patient chose you. Then nobody picked up. |
| `/about` | 1d | We build the layer that decides. |
| `/contact` | 2a | Get your intake audit. |
| `/industries/recruitment` | 2b | They applied on Monday. Someone read it on Thursday. |

`/about` and `/why-us` were rebuilt from prose MDX into real components —
founder cards, belief grid, numbered rows, comparison table, governance cards,
verification grid. Their content already existed in `lib/content/*`, extracted
verbatim from the canvas; nothing had been rendering it.

### Cross-cutting fixes

- **Button** — was a solid teal slab with a 16px radius. Every board draws a
  transparent pill with a sky-42% border and a peak label. Teal is now only a
  22% hover wash. Verified identical by computed style on all six routes.
- **`.liquid` accent** — was a gradient clipped to the glyphs, which takes its
  colour from the middle of the run and rendered near-white. Board 1e reserves
  sky for exactly one word per headline. Now flat `#90C2E7`.
- **Brand assets** — `public/brand/` holds the delivered `favicon.ico`,
  `icon-512.png` and `og-image.png` byte-for-byte, plus the resized icon ladder
  and both wordmarks. The old `/favicon` tree was removed (two icon sets meant
  the browser could pick the stale one).
- **`/industries/medical-clinics` → `/industries/clinics`** with a 308, since
  the old URL was live.
- **`NEXT_PUBLIC_SITE_URL`** — `.env.example` documented it but nothing read it,
  so every preview would have emitted canonicals and a sitemap pointing at the
  production domain. Now env-driven, production value unchanged.

### Removed

The whole orb pipeline was dead after the hero rebuild — component, source PNG,
generated webp, a stray `public/orb.webp`, and the `build:orb` script. 10 files,
316 KB. Nothing imported any of it.

---

## 5. Sizes

```
SOURCE (what a deploy builds from)    1.9 MB
node_modules                        491.6 MB   rebuilt on the host, never deployed
.next                               126.3 MB   build output
design/                               4.4 MB   gitignored, never deployed
```

---

## 6. The Netlify problem

### Symptom

Deploy reports success. Static assets serve. **Every page returns 404.**

### Cause

The Next.js runtime bundles a server function
(`___netlify-server-handler`) that handles all page routing, SSR, the API route
and image optimisation. The Netlify **CLI does not upload it** from this
machine. Confirmed by `available_functions: []` on the deploy record.

Five attempts, three distinct strategies:

| Attempt | Result |
|---|---|
| `netlify deploy --build --prod` | Function bundled, never uploaded |
| `netlify build` then `netlify deploy --prod --no-build` | Same — and Netlify's docs say split steps don't generate the config |
| `--dir .netlify/static --functions .netlify/functions` | Uploaded, but as a **classic lambda** — lost `invocationMode: stream` and `runtimeAPIVersion: 2`, so it returns **502 `error decoding lambda response`** |
| Removing pinned `publish` | Plugin sets `.next` itself; still no function |
| Clean rebuild + single invocation | Still no function |

This is a local-CLI limitation with Next Runtime v5 internal functions. The
config in `netlify.toml` is correct — it is the CLI upload step that drops it.

### The fix — connect git

Netlify's own build system handles internal functions natively. This is how the
other two sites on the account already deploy (`pingu-penguin` and
`ground-control-crm` are both GitHub-linked).

**This repo has no git remote**, and this machine has no GitHub credentials and
no `gh` CLI, so the push could not be done here.

Steps:

1. Create an empty repo at https://github.com/new (e.g. `figuredoutai-site`).
   Do not add a README or .gitignore.
2. Push:

```bash
cd /Users/tanishk-ai/projects/FiguredoutAI-main/.claude/worktrees/design-system-verify-rebuild-641b6d && git remote add origin https://github.com/geektanishk18/figuredoutai-site.git && git push -u origin claude/design-system-verify-rebuild-641b6d
```

3. In https://app.netlify.com/projects/figuredoutai → **Site configuration →
   Build & deploy → Link repository**, pick that repo and branch.
   Build command and publish directory come from `netlify.toml` — leave blank.

The first git-triggered build should serve pages correctly.

---

## 7. Environment variables

Set in Netlify → Site configuration → Environment variables. Without the first
three the contact form returns a clean 503/500 with a logged reason — it does
not crash the site.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | From resend.com/api-keys |
| `LEAD_DELIVERY_EMAIL` | Where audit requests are delivered |
| `LEAD_FROM_EMAIL` | Sender on a Resend-verified domain |
| `NEXT_PUBLIC_SITE_URL` | Production origin (defaults to `https://figuredoutai.com`) |

Secrets check: `git grep -i "RESEND_API_KEY\|re_"` finds only the **variable
name** in code and docs — no value is committed. No `.env` is tracked except
`.env.example`.

---

## 8. Commits on this branch

```
f0866c4  Ignore Netlify CLI local state
5de29c2  Drive the canonical origin from NEXT_PUBLIC_SITE_URL
1a726ea  Add Netlify config, pin tracing root, drop the dead orb pipeline
377970b  Rebuild /about and /why-us to board parity; fix button and accent word
abf011b  Align the site with the design canvas          <- not authored by me, see below
183746f  Redirect the old clinics URL to its canvas slug
5078e52  Rebuild from confirmed design source with final brand assets
```

`abf011b` appeared mid-session and was **not created by me**. It contains three
deletions I had staged. Another session or a hook is committing into this
worktree concurrently — worth knowing before you push.

---

## 9. Known gaps

- **Netlify deploy is broken.** §6.
- **Homepage carries four sections that appear on no board** — the chatbot
  comparison, "Three phases, in this order.", the industries grid, and the
  reference-build teaser. Board 1a is hero + demo + entity footer only. This is
  a content decision, not a parity bug, so it was left alone.
- **Mobile 375 verified on `/about` only.** No horizontal overflow, cards stack,
  hero legible. The other five routes at 375 are **not verified**.
- **`/`, `/contact` and both industry pages** were audited by computed style and
  heading outline but not re-screenshotted after the Button and `.liquid`
  changes.
- **No test suite.** Verification is the lint guards, the build, and the route
  sweep.
