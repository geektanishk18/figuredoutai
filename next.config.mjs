import createMDX from '@next/mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
  /**
   * The clinics page shipped at /industries/medical-clinics before the canvas
   * settled on /industries/clinics. The old path was live and is linked from
   * outside the site, so it redirects permanently rather than 404ing.
   */
  async redirects() {
    return [
      {
        source: '/industries/medical-clinics',
        destination: '/industries/clinics',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
