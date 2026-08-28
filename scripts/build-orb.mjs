/**
 * Bakes the hero orb's glow into a single raster.
 *
 * The previous build stacked three `filter: blur()` layers at 72–120px behind a
 * rotating image. Large blur radii on a compositing layer are the mobile crash
 * vector this asset exists to remove: the glow is rendered once here, at build
 * time, and shipped as flat pixels with a transparent background.
 *
 * Run with: npm run build:orb
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'public/branding/orb-transparent.png')
const OUT_DIR = path.join(ROOT, 'assets')
const OUT = path.join(OUT_DIR, 'orb-glow.webp')

/** Final canvas. The glow needs far more room than the orb itself. */
const CANVAS = 1400
/** Orb diameter inside that canvas — the rest is glow falloff. */
const ORB = 620

// Brand tokens. Kept literal so the script stays runnable without the TS build.
// CYAN is the accent figuredoutai.com uses for the orb's halo.
const CYAN = '94, 235, 255' //  #5EEBFF
const SKY = '144, 194, 231' //  #90C2E7
const TEAL = '27, 101, 121' //  #1B6579

const glowSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}">
  <defs>
    <radialGradient id="outer" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="rgb(${CYAN})" stop-opacity="0.30" />
      <stop offset="26%"  stop-color="rgb(${SKY})"  stop-opacity="0.24" />
      <stop offset="46%"  stop-color="rgb(${TEAL})" stop-opacity="0.20" />
      <stop offset="74%"  stop-color="rgb(${TEAL})" stop-opacity="0.00" />
    </radialGradient>
    <radialGradient id="core" cx="50%" cy="50%" r="32%">
      <stop offset="0%"   stop-color="rgb(${CYAN})" stop-opacity="0.34" />
      <stop offset="55%"  stop-color="rgb(${CYAN})" stop-opacity="0.10" />
      <stop offset="100%" stop-color="rgb(${CYAN})" stop-opacity="0.00" />
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="24%">
      <stop offset="60%"  stop-color="rgb(${CYAN})" stop-opacity="0.00" />
      <stop offset="88%"  stop-color="rgb(${CYAN})" stop-opacity="0.22" />
      <stop offset="100%" stop-color="rgb(${CYAN})" stop-opacity="0.00" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#outer)" />
  <rect width="100%" height="100%" fill="url(#core)" />
  <rect width="100%" height="100%" fill="url(#halo)" />
</svg>`

await mkdir(OUT_DIR, { recursive: true })

// A light blur only smooths gradient banding — the softness itself comes from
// the gradient stops, so this stays small and is applied once, offline.
const glow = await sharp(Buffer.from(glowSvg)).blur(18).png().toBuffer()

const orb = await sharp(SOURCE)
  .resize(ORB, ORB, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const offset = Math.round((CANVAS - ORB) / 2)

await sharp({
  create: {
    width: CANVAS,
    height: CANVAS,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: glow, top: 0, left: 0 },
    { input: orb, top: offset, left: offset },
  ])
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(OUT)

const { size } = await sharp(OUT).metadata().then(async (m) => ({
  size: (await sharp(OUT).toBuffer()).length,
  ...m,
}))

console.log(`orb-glow.webp — ${CANVAS}x${CANVAS}, ${(size / 1024).toFixed(1)} KB`)
