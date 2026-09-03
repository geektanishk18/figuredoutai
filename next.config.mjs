import createMDX from '@next/mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Hostinger shared hosting serves static files only — there is no Node
   * process behind it. `output: 'export'` produces a plain `out/` directory
   * of HTML/CSS/JS that Apache can serve directly. This is now the only
   * deploy target, so there is no server-build variant to keep in sync with.
   */
  output: 'export',
  /**
   * Apache (Hostinger's server) resolves `/foo/` to `/foo/index.html`
   * automatically but does not rewrite bare `/foo` to the same file, so a
   * static export without this produces working links but broken direct
   * hits and refreshes on any non-root route.
   */
  trailingSlash: true,
  /**
   * Pin the file-tracing root to this directory.
   *
   * Next walks up looking for a lockfile to decide which files to trace into
   * the server bundle. This project is developed in a git worktree nested
   * under the main checkout, so it finds two and picks the parent — which
   * means the traced root sits above the app and the bundle can omit files the
   * app actually imports. That surfaces as a runtime "module not found" on a
   * deployed function rather than a build failure, so it is worth pinning
   * even though the warning looks cosmetic.
   */
  outputFileTracingRoot: here,
  images: {
    // Static export has no server to run the default image optimiser
    // against — every next/image usage must ship the original file as-is.
    unoptimized: true,
    formats: ['image/webp'],
    // Icons are inline SVG (lucide-react), never next/image, so the tiny
    // 16–128px variants Next generates by default can never be selected.
    // Trimming them keeps the srcset — and the HTML — small.
    imageSizes: [256, 384, 512],
    deviceSizes: [640, 828, 1080, 1200, 1920],
  },
  eslint: {
    // Lint runs as its own step (`npm run lint`, ESLint CLI flat config).
    // Next's built-in pass is disabled so there is one linter, not two.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors must fail the build.
    ignoreBuildErrors: false,
  },
  // `redirects()` has no effect on `output: 'export'` — there is no Next
  // server left to run it. The /industries/medical-clinics redirect now
  // lives in public/.htaccess, which Apache applies directly.
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
