import { ImageResponse } from 'next/og'
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/seo/og-template'
import { INDUSTRIES, type IndustrySlug, getIndustry } from '@/lib/constants'
import { INDUSTRY_PAGES } from '@/lib/industry-pages'

export const alt = 'FiguredoutAI — the decision layer for this industry'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  const page = industry ? INDUSTRY_PAGES[industry.slug as IndustrySlug] : undefined

  return new ImageResponse(
    <OgCard
      eyebrow={industry?.label ?? 'Industries'}
      title={page?.heading ?? 'Different intake paths. The same failure.'}
    />,
    size,
  )
}
