import { ImageResponse } from 'next/og'
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/seo/og-template'

// Required for `output: 'export'` — a static export has no server to
// generate this on request.
export const dynamic = 'force-static'

export const alt = 'FiguredoutAI — get your intake audit'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="The Intake Audit" title="Three working days. No cost, no obligation." />,
    size,
  )
}
