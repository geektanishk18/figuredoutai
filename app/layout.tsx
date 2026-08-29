import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/JsonLd'
import { Nav } from '@/components/layout/Nav'
import { BRAND } from '@/lib/brand'
import { COMPANY, SITE_URL } from '@/lib/constants'
import './globals.css'

/**
 * Two families only.
 * `display: 'swap'` on both — text paints in the fallback immediately, so there
 * is no flash of invisible text while the webfont loads.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

// Poppins is the display face specified by board 1e — 700 for hero and page
// H1, 600 for section and card headings. Only those two weights are loaded;
// the token sheet asks for nothing else.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'FiguredoutAI — Scale Revenue Without Scaling Chaos',
    template: '%s | FiguredoutAI',
  },
  description: COMPANY.positioning,
  applicationName: COMPANY.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: COMPANY.name,
    locale: 'en_IN',
    url: SITE_URL,
    title: 'FiguredoutAI — Scale Revenue Without Scaling Chaos',
    description: COMPANY.positioning,
    /*
      The delivered card, served byte-for-byte from /public. It is deliberately
      not regenerated through next/og: the file is the approved artwork, and
      re-rendering it would put a lookalike in front of every share.
    */
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: COMPANY.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FiguredoutAI — Scale Revenue Without Scaling Chaos',
    description: COMPANY.positioning,
    images: ['/brand/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  /*
    Every icon resolves under /brand — the delivered favicon.ico verbatim, and
    the PNG ladder resized from the delivered icon-512.png. Nothing here points
    at the old /favicon tree, which this rebuild removes: two icon sets meant
    the browser could pick the stale one.
  */
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/brand/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/brand/icon-180.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/brand/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: BRAND.ink,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/*
          Scroll-reveal sections start hidden and are uncovered by an
          IntersectionObserver. Without JavaScript that observer never runs, so
          this un-hides them rather than leaving a visitor with a blank page.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <OrganizationSchema />
        <WebSiteSchema />
      </body>
    </html>
  )
}
