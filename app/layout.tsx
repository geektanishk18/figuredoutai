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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FiguredoutAI — Scale Revenue Without Scaling Chaos',
    description: COMPANY.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
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
