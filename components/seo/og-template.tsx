import { BRAND } from '@/lib/brand'
import { COMPANY } from '@/lib/constants'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * Shared Open Graph card.
 *
 * Rendered by Satori through `next/og`, which supports a narrow subset of CSS —
 * hence the inline styles and explicit flex on every container.
 */
export function OgCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BRAND.ink,
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -260,
          left: 420,
          width: 700,
          height: 700,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${BRAND.teal} 0%, rgba(27,101,121,0) 68%)`,
          opacity: 0.55,
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: BRAND.sky,
            display: 'flex',
          }}
        />
        <div style={{ color: BRAND.paper, fontSize: 26, fontWeight: 700, letterSpacing: -0.4 }}>
          {COMPANY.name}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            color: BRAND.sky,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3.2,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: BRAND.paper,
            fontSize: title.length > 58 ? 58 : 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.6,
            marginTop: 20,
            display: 'flex',
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ color: 'rgba(240,237,239,0.56)', fontSize: 22, display: 'flex' }}>
        {COMPANY.entityString}
      </div>
    </div>
  )
}
