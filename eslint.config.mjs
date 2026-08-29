import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import {
  STAGE_PATTERNS,
  FABRICATED_PROOF_PATTERNS,
  RULE_A_MESSAGE,
  RULE_B_MESSAGE,
} from './scripts/guards/copy-rules.mjs'

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

/**
 * Prose reaches the page as JSX text, string literals and template chunks.
 * A selector that covers only one of the three is a rule that looks enforced
 * and is not.
 */
const copySelectors = (patterns, message) =>
  patterns.flatMap((pattern) =>
    ['Literal', 'JSXText', 'TemplateElement'].map((node) => ({
      selector: `${node}[${node === 'TemplateElement' ? 'value.raw' : 'value'}=/${pattern}/i]`,
      message,
    })),
  )

const config = [
  {
    ignores: ['legacy/**', 'design/**', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Application source only — the guard must not match its own pattern here.
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'],
    rules: {
      // The lead-delivery address is server-only. Keep it out of anything that
      // could end up in a client bundle.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/tanishk@figuredoutai/]',
          message:
            'The lead-delivery address is server-only — read it from the environment inside the Route Handler.',
        },
        {
          // audit@figuredoutai.com is not a real mailbox. As a sender it is
          // rejected and the lead is lost with no error surfaced anywhere.
          selector: 'Literal[value=/audit@figuredoutai/]',
          message:
            'audit@figuredoutai.com does not exist. The sender is LEAD_FROM_EMAIL, read from the environment and required.',
        },
        // Copy is prose, so it lives in JSX text as often as in string
        // literals. Matching only Literal is what let the original stage-
        // signalling line ship — every rule below covers both node types.
        ...copySelectors(STAGE_PATTERNS, RULE_B_MESSAGE),
        ...copySelectors(FABRICATED_PROOF_PATTERNS, RULE_A_MESSAGE),
      ],
    },
  },
]

export default config
