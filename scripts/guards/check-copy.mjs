#!/usr/bin/env node
/**
 * Scans MDX content and rendered component copy for the two compiled copy
 * rules. ESLint covers .ts/.tsx; nothing lints .mdx, so this closes that gap —
 * and content/ is exactly where the copy rules matter most.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import {
  STAGE_PATTERNS,
  FABRICATED_PROOF_PATTERNS,
  RULE_A_MESSAGE,
  RULE_B_MESSAGE,
} from './copy-rules.mjs'

const ROOTS = ['content', 'components', 'app']
const EXTS = /\.(mdx|md|tsx|ts)$/

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (EXTS.test(entry)) out.push(full)
  }
  return out
}

const checks = [
  { patterns: STAGE_PATTERNS, message: RULE_B_MESSAGE, rule: 'Rule B' },
  { patterns: FABRICATED_PROOF_PATTERNS, message: RULE_A_MESSAGE, rule: 'Rule A' },
]

let failures = 0

for (const root of ROOTS) {
  for (const file of walk(root)) {
    // The rule definitions themselves necessarily contain the vocabulary.
    if (file.includes('copy-rules') || file.includes('check-copy')) continue
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      for (const { patterns, message, rule } of checks) {
        for (const pattern of patterns) {
          const re = new RegExp(pattern, 'i')
          const match = re.exec(line)
          if (!match) continue
          failures += 1
          console.error(
            `\n${relative(process.cwd(), file)}:${i + 1}\n` +
              `  ${rule} violation: "${match[0]}"\n` +
              `  ${line.trim().slice(0, 120)}\n` +
              `  ${message}`,
          )
        }
      }
    })
  }
}

if (failures > 0) {
  console.error(`\n${failures} copy-rule violation${failures === 1 ? '' : 's'}.\n`)
  process.exit(1)
}
console.log('Copy rules: no violations.')
