#!/usr/bin/env node
/**
 * Blur ceiling guard.
 *
 * The previous site stacked 72 elements blurring at 72-130px; that is the
 * mobile crash vector this rebuild exists to escape. Convincing glass sits at
 * 14-20px, so a hard 24px ceiling costs nothing visually and is worth enforcing
 * mechanically — one `backdrop-blur-[64px]` added in a hurry undoes it.
 *
 * Scans source AND the built CSS, because a Tailwind arbitrary value only
 * becomes a real blur once compiled.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

// Read the ceiling out of brand.ts rather than importing it: a .mjs guard
// importing TypeScript needs an experimental flag and breaks on Node upgrades.
// One source of truth, no build step.
const BRAND_SRC = readFileSync('lib/brand.ts', 'utf8')
const CEILING_MATCH = BRAND_SRC.match(/GLASS_BLUR_CEILING_PX\s*=\s*(\d+)/)
if (!CEILING_MATCH) {
  console.error('  Could not read GLASS_BLUR_CEILING_PX from lib/brand.ts')
  process.exit(1)
}
const CEILING = Number(CEILING_MATCH[1])
const SOURCE_ROOTS = ['app', 'components', 'lib']
const BUILT_CSS = '.next/static/css'

function walk(dir, test, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, test, out)
    else if (test(entry)) out.push(full)
  }
  return out
}

/** `blur(32px)`, `backdrop-blur-[32px]`, `blur-[32px]`, and rem/em variants. */
const PATTERNS = [
  /(?:backdrop-)?blur\((\d+(?:\.\d+)?)(px|rem|em)\)/gi,
  /(?:backdrop-)?blur-\[(\d+(?:\.\d+)?)(px|rem|em)\]/gi,
]

const toPx = (n, unit) => (unit === 'px' ? n : n * 16)

let violations = 0
const files = [
  ...SOURCE_ROOTS.flatMap((r) => walk(r, (f) => /\.(ts|tsx|css)$/.test(f))),
  ...walk(BUILT_CSS, (f) => f.endsWith('.css')),
]

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const pattern of PATTERNS) {
    for (const m of text.matchAll(pattern)) {
      const px = toPx(parseFloat(m[1]), m[2])
      if (px > CEILING) {
        violations += 1
        console.error(
          `\n  ${relative(process.cwd(), file)}\n    ${m[0]} = ${px}px, above the ${CEILING}px ceiling.`,
        )
      }
    }
  }
}

const scannedBuilt = files.some((f) => f.startsWith(BUILT_CSS))
if (violations > 0) {
  console.error(`\n${violations} blur-ceiling violation${violations === 1 ? '' : 's'}.\n`)
  process.exit(1)
}
console.log(
  `Blur ceiling: ${files.length} files scanned, none above ${CEILING}px` +
    (scannedBuilt ? ' (including built CSS).' : ' (source only — run after a build to include compiled CSS).'),
)
