#!/usr/bin/env node
/**
 * Containing-block guard.
 *
 * `backdrop-filter` establishes a containing block for fixed-position
 * descendants. A `fixed inset-0` overlay rendered inside a glass surface sizes
 * itself against that surface instead of the viewport — the bug that rendered
 * the mobile drawer at 463x63 while looking, in the source, entirely correct.
 *
 * Static analysis cannot follow every render tree, so this flags the pattern
 * worth a human look: a component that both applies a glass tier and contains a
 * `fixed` class in the same file. The runtime measurement in the Phase 5 gate
 * is the real proof; this is the cheap early warning.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOTS = ['components', 'app']
const GLASS = /\bglass-(veil|panel|modal)\b/
const FIXED = /\bfixed\b(?![-\w])/

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.tsx$/.test(e)) out.push(full)
  }
  return out
}

let flagged = 0
for (const file of ROOTS.flatMap((r) => walk(r))) {
  const text = readFileSync(file, 'utf8')
  if (!GLASS.test(text) || !FIXED.test(text)) continue
  // An allowlist comment records that a human checked this pairing.
  if (text.includes('containing-block-checked')) continue
  flagged += 1
  console.error(
    `\n  ${relative(process.cwd(), file)}\n` +
      '    Applies a glass tier and contains a fixed-position class in the same file.\n' +
      '    Portal the overlay to document.body, or add a `containing-block-checked`\n' +
      '    comment explaining why the pairing is safe.',
  )
}

if (flagged > 0) {
  console.error(`\n${flagged} possible containing-block trap${flagged === 1 ? '' : 's'}.\n`)
  process.exit(1)
}
console.log('Containing block: no glass surface encloses a fixed-position descendant.')
