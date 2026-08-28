import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/**
 * How Markdown maps onto the brand.
 *
 * Long-form page copy lives in `content/*.mdx` so it can be edited without
 * touching components. Everything here is the styling for that copy — headings
 * keep their document level, so the outline stays correct.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="mt-14 scroll-mt-24 text-[1.5rem] font-semibold text-paper sm:text-[1.75rem]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className="mt-10 text-lg font-semibold text-paper sm:text-xl">
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p {...props} className="mt-5 text-[16.5px] leading-relaxed text-body">
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="mt-5 space-y-2.5">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="mt-5 list-decimal space-y-2.5 pl-5 marker:text-sky">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        {...props}
        className="text-[16.5px] leading-relaxed text-body [ul>&]:relative [ul>&]:pl-5
          [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:top-[0.65em]
          [ul>&]:before:h-1.5 [ul>&]:before:w-1.5 [ul>&]:before:rounded-full
          [ul>&]:before:bg-sky/70"
      >
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-semibold text-paper">
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em {...props} className="not-italic text-sky">
        {children}
      </em>
    ),
    hr: (props) => <hr {...props} className="my-14 border-line" />,
    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="mt-10 rounded-card border border-line bg-panel p-6 text-[17px] leading-relaxed text-body sm:p-7"
      >
        {children}
      </blockquote>
    ),
    a: ({ href, children, ...props }) => {
      const target = href ?? '#'
      if (/^(https?:|mailto:|tel:|#)/.test(target)) {
        return (
          <a
            {...props}
            href={target}
            className="focus-ring rounded text-sky underline underline-offset-4 hover:text-paper"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={target}
          className="focus-ring rounded text-sky underline underline-offset-4 hover:text-paper"
        >
          {children}
        </Link>
      )
    },
    ...components,
  }
}
