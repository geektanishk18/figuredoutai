'use client'

import { useEffect, useId, useRef } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IndustryDemo, RenderedMessage } from './types'
import { useScriptPlayer } from './useScriptPlayer'

export type DemoTab = 'today' | 'layer'

const TABS: { id: DemoTab; label: string }[] = [
  { id: 'today', label: 'What happens today' },
  { id: 'layer', label: 'With the decision layer' },
]

function Message({ message }: { message: RenderedMessage }) {
  if (message.kind === 'system') {
    return (
      <div
        className={cn(
          'mx-auto max-w-[88%] shrink-0 rounded-lg px-3 py-1.5 text-center text-[11.5px]',
          message.tone === 'dead' && 'bg-[#FBE0DE] font-semibold text-[#9A3B33]',
          message.tone === 'live' && 'bg-[#D9FDD3] font-semibold text-[#1D6B49]',
          (!message.tone || message.tone === 'neutral') && 'bg-white/90 text-[#54656F]',
        )}
      >
        {message.text}
      </div>
    )
  }

  const incoming = message.kind === 'in'

  return (
    <div
      className={cn(
        'w-fit max-w-[82%] shrink-0 rounded-[9px] px-2.5 pb-1.5 pt-2 text-[13.5px] leading-snug text-[#111B21]',
        'shadow-[0_1px_1px_rgba(0,0,0,0.12)]',
        incoming ? 'self-start rounded-tl-sm bg-white' : 'self-end rounded-tr-sm bg-[#D9FDD3]',
      )}
    >
      <span>{message.text}</span>

      {message.options ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {message.options.map((option, index) => (
            <span
              key={option}
              className={cn(
                'rounded-full border border-[#0E5C52] px-2.5 py-1 text-[12px] font-semibold',
                message.pickedIndex === index
                  ? 'bg-[#0E5C52] text-white'
                  : 'bg-white text-[#0E5C52]',
              )}
            >
              {option}
            </span>
          ))}
        </div>
      ) : null}

      {message.at ? (
        <span className="float-right ml-2 mt-1 text-[10px] leading-none text-[#111B21]/45">
          {message.at}
        </span>
      ) : null}
    </div>
  )
}

interface ConversationDemoProps {
  industry: IndustryDemo
  tab: DemoTab
  onTabChange: (tab: DemoTab) => void
  reducedMotion: boolean
  headingId: string
}

export function ConversationDemo({
  industry,
  tab,
  onTabChange,
  reducedMotion,
  headingId,
}: ConversationDemoProps) {
  const threadRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  const { messages, typing, finished, replay } = useScriptPlayer({
    script: industry.scripts[tab],
    runKey: `${industry.slug}:${tab}`,
    containerRef: threadRef,
    reducedMotion,
  })

  const verdict = industry.verdicts[tab]

  // Keep the newest message in view *inside the thread*. Assigning scrollTop
  // rather than calling scrollIntoView is deliberate: scrollIntoView walks up
  // and scrolls the page too.
  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages, typing])

  function onTabKeyDown(event: React.KeyboardEvent, index: number) {
    const lastIndex = TABS.length - 1
    let next: number | null = null

    if (event.key === 'ArrowRight') next = index === lastIndex ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? lastIndex : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = lastIndex

    if (next === null) return
    event.preventDefault()
    const target = TABS[next]
    if (!target) return
    onTabChange(target.id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div>
      <h3 id={headingId} className="sr-only">
        The same enquiry, handled two ways
      </h3>

      <div role="tablist" aria-labelledby={headingId} className="mb-3 flex gap-2">
        {TABS.map((entry, index) => {
          const selected = entry.id === tab
          return (
            <button
              key={entry.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${entry.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onTabChange(entry.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                'focus-ring min-h-[44px] flex-1 rounded-xl border px-2 py-2.5 text-[13.5px] font-semibold',
                'transition-colors duration-180',
                selected
                  ? 'border-teal bg-teal text-paper'
                  : 'border-line bg-panel text-muted hover:text-paper',
              )}
            >
              {entry.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        tabIndex={0}
        className="focus-ring rounded-card"
      >
        <div className="overflow-hidden rounded-card border border-black/40 bg-[#ECE5DD] shadow-[0_14px_34px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2.5 bg-[#0E5C52] px-3.5 py-2.5 text-white">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/20 text-xs font-bold"
            >
              {industry.contact.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">
                {industry.contact.name}
              </p>
              <p className="truncate text-[11px] opacity-75">
                {finished ? verdict.status : industry.contact.status}
              </p>
            </div>
          </div>

          {/*
            `justify-end` on a scroll container pushes overflow past the start
            edge, where it cannot be scrolled to — the first messages become
            unreachable. The inner `mt-auto` wrapper gets the same
            sits-at-the-bottom-when-short behaviour while keeping the overflow
            scrollable.
          */}
          <div
            ref={threadRef}
            aria-live="polite"
            aria-relevant="additions"
            className="flex h-[19.5rem] flex-col overflow-y-auto overscroll-contain px-3 py-3.5"
          >
            <div className="mt-auto flex flex-col gap-2">
              {messages.map((message) => (
                <Message key={message.key} message={message} />
              ))}

              {typing ? (
                <div
                  aria-hidden="true"
                  className="flex w-fit shrink-0 gap-1 self-start rounded-[9px] rounded-tl-sm bg-white px-3 py-2.5"
                >
                  <i className="block h-1.5 w-1.5 animate-typing rounded-full bg-[#9AA6AB]" />
                  <i className="block h-1.5 w-1.5 animate-typing rounded-full bg-[#9AA6AB] [animation-delay:0.18s]" />
                  <i className="block h-1.5 w-1.5 animate-typing rounded-full bg-[#9AA6AB] [animation-delay:0.36s]" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-[13px] border border-line bg-panel px-4 py-3">
        <span
          className={cn(
            'num flex-none text-[19px] font-bold',
            finished ? (tab === 'today' ? 'text-loss' : 'text-ok') : 'text-muted',
          )}
        >
          {finished ? verdict.badge : '—'}
        </span>
        <p className="text-[12.5px] leading-snug text-body">
          {finished ? verdict.text : 'Playing…'}
        </p>
      </div>

      <button
        type="button"
        onClick={replay}
        className="focus-ring mt-2.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-line bg-transparent text-[13px] font-semibold text-sky transition-colors duration-180 hover:bg-sky/10"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Replay this conversation
      </button>
    </div>
  )
}
