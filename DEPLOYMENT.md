# Deploying to Hostinger

This is the only deploy target. The site builds as a static export — plain
HTML/CSS/JS, no Node process required on the server.

## Build

```bash
npm ci
npm run build
```

This runs `next build` with `output: 'export'` (set in `next.config.mjs`) and
produces a static site in `out/`. The build fails on any type error or lint
violation is caught separately by `npm run lint` — run that first if you want
both gates before uploading.

Before building, set the one required environment variable — copy
`.env.example` to `.env.local` and fill in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
(get a key at web3forms.com, no account needed). It ships inside the client
bundle by design; see the comment in `.env.example` for why that's expected
and not a leak.

## Upload

Upload the **contents of `out/`** (not the `out/` folder itself) to
`{{HOSTINGER_PUBLIC_HTML_PATH}}` — this is almost always `public_html/` on
Hostinger shared hosting, but confirm the exact path in hPanel → Hosting →
File Manager before the first deploy.

Everything needed to serve the site is inside `out/`, including `.htaccess`
(copied automatically from `public/.htaccess` — see below). No separate
server config is required.

Two ways to upload:
- **hPanel File Manager** — zip `out/`'s contents, upload, extract in place.
- **FTP/SFTP** — credentials are in hPanel → Hosting → FTP Accounts. Sync
  `out/` to `public_html/` with your client of choice.

## What `.htaccess` does

`public/.htaccess` ships as part of the static export (everything in
`public/` is copied verbatim into `out/`) and handles what `next.config.mjs`
can't once there's no Next server to run it:

- Redirects the old `/industries/medical-clinics` URL to `/industries/clinics/`.
- Resolves a request for `/about` (no trailing slash) to `/about/index.html`
  — `trailingSlash: true` in `next.config.mjs` builds every route as
  `<route>/index.html`, and Apache needs this rule to serve it without a
  visible redirect loop.
- Points 404s at the built `404.html`.

If you change routes or redirects, `public/.htaccess` is the file to edit —
`next.config.mjs`'s `redirects()` has no effect on a static export.

## Manual steps after upload

1. **Confirm the Web3Forms destination address** in the Web3Forms dashboard
   (dashboard.web3forms.com) — this is not set anywhere in the repo. It
   should be `tanishk@figuredoutai.com` per company policy (internal-only,
   never the public `hello@figuredoutai.com` address).
2. **Send one real test submission** through the live `/contact/` page and
   confirm it arrives. This has not been verified end-to-end against a real
   Web3Forms key from this repo's current code.
3. **Check DNS / SSL** in hPanel if this is the first deploy to this domain —
   outside repo scope, but worth confirming figuredoutai.com resolves to the
   Hostinger hosting and has a valid certificate.
4. **Verify `/industries/medical-clinics` redirects** to `/industries/clinics/`
   after upload — the `.htaccess` rule needs `mod_rewrite` enabled, which is
   standard on Hostinger shared hosting but worth a one-time check.
5. **Turn on Web3Forms' spam filtering** in the dashboard (Form settings →
   Spam Protection). The contact form also ships a client-side honeypot
   (`components/contact/LeadForm.tsx`) sent through as Web3Forms' own
   `botcheck` field, but that only stops a bot that runs this page's JS —
   the dashboard filter is the layer that covers a request sent straight to
   Web3Forms' API, since the access key is necessarily public in the client
   bundle.

## Local preview of the exact static build

```bash
npm run build
npx serve out
```

`npx serve` serves static files the same way Hostinger will (modulo the
`.htaccess` rewrite rules, which only Apache interprets) — closer to
production than `next dev` or `next start`, neither of which reflect a static
export.
