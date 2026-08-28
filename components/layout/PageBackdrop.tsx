/**
 * Flat gradient behind inner-page headers.
 *
 * A plain radial gradient — no raster, no blur filter, nothing animated. The
 * orb belongs to the homepage hero only.
 */
export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem]"
      style={{
        background:
          'radial-gradient(60% 100% at 50% 0%, rgba(27,101,121,0.28) 0%, rgba(27,101,121,0.10) 42%, rgba(3,10,14,0) 78%)',
      }}
    />
  )
}
