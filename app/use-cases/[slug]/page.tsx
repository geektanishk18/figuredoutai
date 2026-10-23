import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Faq, FaqSchema } from '@/components/content/Faq'
import { PageShell } from '@/components/content/PageShell'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/constants'
import { getUseCasePage, USE_CASE_PAGES } from '@/lib/use-case-pages'

export function generateStaticParams() {
  return USE_CASE_PAGES.map(({slug}) => ({slug}))
}
export const dynamicParams = false

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params
  const page=getUseCasePage(slug)
  if(!page) return {}
  return {
    title:page.title, description:page.description,
    alternates:{canonical:`/use-cases/${slug}`},
    openGraph:{type:'website',url:`/use-cases/${slug}`,title:page.title,description:page.description},
    twitter:{card:'summary_large_image',title:page.title,description:page.description}
  }
}

export default async function UseCasePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params
  const page=getUseCasePage(slug)
  if(!page) notFound()
  return <>
    <BreadcrumbSchema trail={[{name:'Home',path:'/'},{name:'Use cases',path:'/use-cases'},{name:page.eyebrow,path:`/use-cases/${page.slug}`}]} />
    <ServiceSchema name={page.title} description={page.description} url={`${SITE_URL}/use-cases/${page.slug}/`} />
    <PageShell eyebrow={page.eyebrow} title={page.heading} lede={<p>{page.lede}</p>} ctas={[{label:'Get your intake audit',href:'/contact'},{label:'Explore all use cases',href:'/use-cases'}]}>
      <article className="prose-content">
        <section aria-labelledby="direct-answer"><h2 id="direct-answer">What is {page.eyebrow.toLowerCase()}?</h2><p>{page.directAnswer}</p></section>
        <section aria-labelledby="business-problem"><h2 id="business-problem">The business problem</h2><p>{page.problem}</p></section>
        <section aria-labelledby="workflow-steps"><h2 id="workflow-steps">How the workflow works</h2><ol>{page.steps.map(step=><li key={step}>{step}</li>)}</ol></section>
        <section aria-labelledby="intended-benefits"><h2 id="intended-benefits">What it is designed to improve</h2><ul>{page.benefits.map(item=><li key={item}>{item}</li>)}</ul><p>These are intended operational benefits, not guaranteed results. Outcomes depend on enquiry volume, process design, data quality, integration access and team adoption.</p></section>
        <section aria-labelledby="good-fit"><h2 id="good-fit">When it is a good fit</h2><p>{page.fit}</p></section>
        <section aria-labelledby="limitations"><h2 id="limitations">Important limitations</h2><p>{page.limitations}</p></section>
        <section aria-labelledby="related-workflows"><h2 id="related-workflows">Related workflows</h2><ul>{page.related.map(item=><li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></section>
        <Faq items={page.faqs} />
      </article>
      <FaqSchema items={page.faqs} />
    </PageShell>
  </>
}
