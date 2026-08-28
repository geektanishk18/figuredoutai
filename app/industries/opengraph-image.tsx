import { ImageResponse } from 'next/og'
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/seo/og-template'

export const alt = 'FiguredoutAI — Different intake paths. The same failure.'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(<OgCard eyebrow="Industries" title="Different intake paths. The same failure." />, size)
}
