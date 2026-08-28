import { ImageResponse } from 'next/og'
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/seo/og-template'

export const alt = 'FiguredoutAI — growth infrastructure for businesses that scale output'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Growth infrastructure" title="Scale Revenue Without Scaling Chaos" />,
    size,
  )
}
