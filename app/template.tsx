/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation, so a plain CSS animation runs
 * once per route change with no JS and no animation library. It is a single
 * rise — no fade, so content is visible from the first paint — and `prefers-reduced-motion` collapses it via the global
 * backstop in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-rise">{children}</div>
}
