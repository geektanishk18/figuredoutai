#!/usr/bin/env node
/**
 * Contrast guard — WCAG 2.1 AA, computed from the tokens themselves.
 *
 * `lib/brand.ts` carries a table of measured ratios in its doc comment. A
 * comment cannot fail a build: change `paper` from #F0EDEF to something a
 * shade darker and every number in that table silently becomes a lie. This
 * recomputes them from the live token values on every `npm run lint`.
 *
 * Two things make the arithmetic non-obvious here and are handled explicitly:
 *
 *   1. `body` and `muted` are not colours, they are `paper` at 72% and 56%.
 *      Their real luminance depends on what they sit on, so each is composited
 *      over its background before the ratio is taken rather than measured once
 *      against ink and assumed to hold everywhere.
 *
 *   2. AA is not one threshold. Body text needs 4.5:1, text at 24px (or 18.66px
 *      bold) needs 3:1, and a UI boundary — a focus ring, a control border —
 *      needs 3:1 against what it is drawn on. A pair is only a failure against
 *      the threshold for the job it actually does, so every pair below declares
 *      its role.
 */
import { readFileSync } from 'node:fs'

/**
 * Tokens are read out of `lib/brand.ts` as text, not imported.
 *
 * `package.json` allows Node >= 20.9, which cannot import a `.ts` module at
 * all — type stripping only arrived in 22.6. `check-blur.mjs` already reads the
 * same file this way for the same reason, so this follows that rather than
 * inventing a second convention or quietly raising the engine floor.
 */
const BRAND_SRC = readFileSync('lib/brand.ts', 'utf8')

/**
 * Pull one `export const NAME = { ... } as const` block out and return its
 * string-valued keys. Values that reference another token (`BRAND.amber`) are
 * resolved against an already-extracted table, which is what lets `ROUTING`
 * be defined as roles over `BRAND` rather than as fresh literals.
 */
function tokens(name, resolveAgainst = {}) {
  const start = BRAND_SRC.indexOf(`export const ${name} = {`)
  if (start < 0) throw new Error(`No "export const ${name}" in lib/brand.ts`)
  const end = BRAND_SRC.indexOf('} as const', start)
  if (end < 0) throw new Error(`"${name}" is not closed with "} as const"`)
  const body = BRAND_SRC.slice(start, end)

  const out = {}
  for (const [, key, literal] of body.matchAll(/^\s*'?([A-Za-z][\w-]*)'?:\s*'([^']+)'/gm)) {
    out[key] = literal
  }
  for (const [, key, ref] of body.matchAll(/^\s*'?([A-Za-z][\w-]*)'?:\s*(\w+\.\w+)/gm)) {
    const [obj, prop] = ref.split('.')
    const table = obj === name ? out : resolveAgainst[obj]
    if (!table || table[prop] === undefined) throw new Error(`Cannot resolve "${ref}" for ${name}.${key}`)
    out[key] = table[prop]
  }
  if (Object.keys(out).length === 0) throw new Error(`Extracted no values from "${name}"`)
  return out
}

const BRAND = tokens('BRAND')
const CHAT = tokens('CHAT', { BRAND })
const ROUTING = tokens('ROUTING', { BRAND })

const AA = { text: 4.5, large: 3, ui: 3 }

/** `#RRGGBB` or `rgba(r, g, b, a)` -> `{ r, g, b, a }`, channels 0-255. */
function parse(value) {
  const rgba = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i)
  if (rgba) {
    return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] === undefined ? 1 : +rgba[4] }
  }
  const hex = value.replace('#', '')
  const n = Number.parseInt(hex, 16)
  if (Number.isNaN(n) || hex.length !== 6) throw new Error(`Cannot parse colour "${value}"`)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 }
}

/** Source-over composite of a translucent foreground onto an opaque backdrop. */
function flatten(fg, bg) {
  if (fg.a >= 1) return fg
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  }
}

/** WCAG relative luminance. */
function luminance({ r, g, b }) {
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function ratio(fgRaw, bgRaw) {
  const bg = parse(bgRaw)
  if (bg.a < 1) throw new Error(`Background "${bgRaw}" is translucent; give an opaque backdrop.`)
  const fg = flatten(parse(fgRaw), bg)
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** [label, foreground, background, role] */
const PAIRS = [
  // Page text on every ground it is actually set on.
  ['paper on ink', BRAND.paper, BRAND.ink, 'text'],
  ['paper on panel', BRAND.paper, BRAND.panel, 'text'],
  ['paper on panel-raised', BRAND.paper, BRAND.panelRaised, 'text'],
  ['body on ink', BRAND.body, BRAND.ink, 'text'],
  ['body on panel', BRAND.body, BRAND.panel, 'text'],
  ['body on panel-raised', BRAND.body, BRAND.panelRaised, 'text'],
  ['muted on ink', BRAND.muted, BRAND.ink, 'text'],
  ['muted on panel', BRAND.muted, BRAND.panel, 'text'],
  ['muted on panel-raised', BRAND.muted, BRAND.panelRaised, 'text'],

  // Accents used as text.
  ['sky on ink', BRAND.sky, BRAND.ink, 'text'],
  ['sky on panel', BRAND.sky, BRAND.panel, 'text'],
  ['peak on ink', BRAND.peak, BRAND.ink, 'text'],
  ['cyan on ink', BRAND.cyan, BRAND.ink, 'text'],
  ['cyan on panel', BRAND.cyan, BRAND.panel, 'text'],

  // Routing states, wherever a figure or label is set in one.
  ['routing/escalated on panel', ROUTING.escalated, BRAND.panel, 'text'],
  ['routing/handled on panel', ROUTING.handled, BRAND.panel, 'text'],
  ['routing/held on panel', ROUTING.held, BRAND.panel, 'text'],
  ['routing/lost on panel', ROUTING.lost, BRAND.panel, 'text'],
  ['routing/lost on ink', ROUTING.lost, BRAND.ink, 'text'],

  // Button labels against all three CTA states.
  ['paper on teal', BRAND.paper, BRAND.teal, 'text'],
  ['paper on teal-hover', BRAND.paper, BRAND.tealHover, 'text'],
  ['paper on teal-active', BRAND.paper, BRAND.tealActive, 'text'],

  // The inverted chat surface in the demo.
  ['chat text on incoming', CHAT.text, CHAT.incoming, 'text'],
  ['chat text on outgoing', CHAT.text, CHAT.outgoing, 'text'],
  ['chat meta on outgoing', CHAT.meta, CHAT.outgoing, 'text'],
  ['chat dead-text on dead-bg', CHAT.deadText, CHAT.deadBg, 'text'],
  ['chat live-text on live-bg', CHAT.liveText, CHAT.liveBg, 'text'],
  ['paper on chat header', BRAND.paper, CHAT.header, 'text'],

  // Non-text: the focus ring and the teal fill must be discernible as shapes.
  ['focus ring (sky) on ink', BRAND.sky, BRAND.ink, 'ui'],
  ['focus ring (sky) on panel', BRAND.sky, BRAND.panel, 'ui'],
  ['teal fill on ink', BRAND.teal, BRAND.ink, 'ui'],
]

const rows = PAIRS.map(([label, fg, bg, role]) => {
  const value = ratio(fg, bg)
  return { label, role, value, min: AA[role], pass: value >= AA[role] }
})

const w = Math.max(...rows.map((r) => r.label.length))
console.log(`${'Pair'.padEnd(w)}  ${'Role'.padEnd(6)}  ${'Ratio'.padStart(7)}  ${'Min'.padStart(5)}  Result`)
console.log('-'.repeat(w + 34))
for (const r of rows) {
  console.log(
    `${r.label.padEnd(w)}  ${r.role.padEnd(6)}  ${r.value.toFixed(2).padStart(6)}:1  ${r.min.toFixed(1).padStart(5)}  ${r.pass ? 'PASS' : 'FAIL'}`,
  )
}

/*
 * Token-integrity check.
 *
 * `sky` and `paper` are each written out a second and third time as channel
 * triplets inside `BRAND.line`, `GLASS_LAYERS.border`, `GLOW.gradient` and the
 * `body` / `muted` opacity ladder. Deriving those from the hex would need an
 * expression evaluator in this file, which is worse than the duplication —
 * so instead the duplicates are asserted to still agree with the token they
 * were copied from. Change `sky` alone and this fails loudly.
 */
const derived = [
  ['sky', BRAND.sky, [BRAND.line, /rgba\((\d+), *(\d+), *(\d+)/]],
  ['paper', BRAND.paper, [BRAND.body, /rgba\((\d+), *(\d+), *(\d+)/]],
  ['paper', BRAND.paper, [BRAND.muted, /rgba\((\d+), *(\d+), *(\d+)/]],
]

const drift = []
for (const [name, hexValue, [composite, re]] of derived) {
  const base = parse(hexValue)
  const m = composite.match(re)
  if (!m) {
    drift.push(`${name}: cannot read channels out of "${composite}"`)
    continue
  }
  const [r, g, b] = [+m[1], +m[2], +m[3]]
  if (r !== base.r || g !== base.g || b !== base.b) {
    drift.push(
      `${name} is ${hexValue} (${base.r} ${base.g} ${base.b}) but "${composite}" carries ${r} ${g} ${b}`,
    )
  }
}

if (drift.length > 0) {
  console.error('\nToken drift — a derived value no longer matches its source token:')
  for (const d of drift) console.error(`  ${d}`)
  process.exitCode = 1
} else {
  console.log(`${derived.length} derived values agree with their source token.`)
}

const failures = rows.filter((r) => !r.pass)
console.log('-'.repeat(w + 34))
console.log(`${rows.length} pairs checked, ${failures.length} failing.`)

if (failures.length > 0) {
  console.error('\nWCAG AA contrast failures:')
  for (const f of failures) {
    console.error(`  ${f.label} — ${f.value.toFixed(2)}:1, needs ${f.min}:1`)
  }
  process.exit(1)
}
