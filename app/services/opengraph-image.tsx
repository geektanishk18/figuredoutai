import { ImageResponse } from 'next/og'
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/seo/og-template'

export const alt = 'FiguredoutAI — Three things we build.'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(<OgCard eyebrow="Services" title="Three things we build." />, size)
}
