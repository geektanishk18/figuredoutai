'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { RenderedMessage, Step } from './types'

/** Applies a step to a message list. Shared by live playback and the final snapshot. */
function applyStep(
  messages: RenderedMessage[],
  step: Step,
  index: number,
): RenderedMessage[] {
  switch (step.kind) {
    case 'in':
      return [...messages, { key: `m${index}`, kind: 'in', text: step.text, at: step.at }]
    case 'out':
      return [
        ...messages,
        { key: `m${index}`, kind: 'out', text: step.text, at: step.at, options: step.options },
      ]
    case 'system':
      return [
        ...messages,
        { key: `m${index}`, kind: 'system', text: step.text, tone: step.tone ?? 'neutral' },
      ]
    case 'pick':
      return messages.map((message) =>
        message.options ? { ...message, pickedIndex: step.index } : message,
      )
    case 'typing':
    case 'verdict':
      return messages
  }
}

/** The thread as it looks once the script has finished — no typing indicator. */
function finalMessages(script: readonly Step[]): RenderedMessage[] {
  return script.reduce<RenderedMessage[]>(
    (messages, step, index) => applyStep(messages, step, index),
    [],
  )
}

interface UseScriptPlayerOptions {
  script: readonly Step[]
  /**
   * Identifies this run. Changing it (a new industry or tab) restarts playback
   * from scratch; it is also how a completed run is remembered across scrolling.
   */
  runKey: string
  /** Element observed for visibility. Playback does not start until it is in view. */
  containerRef: React.RefObject<HTMLElement | null>
  reducedMotion: boolean
}

export interface ScriptPlayerState {
  messages: RenderedMessage[]
  typing: boolean
  finished: boolean
  replay: () => void
}

/**
 * Plays a scripted conversation on a timer.
 *
 * The failure this guards against: `setTimeout` callbacks from a previous run
 * writing into the thread of the current one — clinic messages surfacing inside
 * the HVAC conversation after a fast industry switch. Three things prevent it:
 *
 *  1. every timeout id is held in a ref and cleared both on cleanup and at the
 *     start of the next run, so nothing pending survives a switch;
 *  2. each run takes a token, and every callback returns early if the token has
 *     moved on — covering callbacks already dequeued when the switch happened;
 *  3. state is only ever written through the functional form, so a stale closure
 *     cannot resurrect an old message list.
 */
export function useScriptPlayer({
  script,
  runKey,
  containerRef,
  reducedMotion,
}: UseScriptPlayerOptions): ScriptPlayerState {
  const [messages, setMessages] = useState<RenderedMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [finished, setFinished] = useState(false)
  const [inView, setInView] = useState(false)
  const [replayNonce, setReplayNonce] = useState(0)

  const timers = useRef<number[]>([])
  const runToken = useRef(0)
  /** The runKey of the last run that played all the way through. */
  const completedKey = useRef<string | null>(null)

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }, [])

  const snapshot = useMemo(() => finalMessages(script), [script])

  /* Visibility -------------------------------------------------------- */

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [containerRef])

  /* Playback ---------------------------------------------------------- */

  useEffect(() => {
    // Start of every run: nothing pending from the previous one survives.
    clearTimers()
    const token = ++runToken.current

    if (!inView) return clearTimers

    // A run that already played through stays finished when scrolled back to.
    if (completedKey.current === runKey) {
      setMessages(snapshot)
      setTyping(false)
      setFinished(true)
      return clearTimers
    }

    setMessages([])
    setTyping(false)
    setFinished(false)

    if (reducedMotion) {
      setMessages(snapshot)
      setFinished(true)
      completedKey.current = runKey
      return clearTimers
    }

    let elapsed = 0
    script.forEach((step, index) => {
      elapsed += step.wait
      const id = window.setTimeout(() => {
        // Stale callback from a superseded run — drop it.
        if (runToken.current !== token) return

        if (step.kind === 'typing') {
          setTyping(true)
          return
        }

        setTyping(false)

        if (step.kind === 'verdict') {
          setFinished(true)
          completedKey.current = runKey
          return
        }

        setMessages((previous) => applyStep(previous, step, index))
      }, elapsed)
      timers.current.push(id)
    })

    return clearTimers
  }, [script, runKey, inView, reducedMotion, replayNonce, snapshot, clearTimers])

  /* Unmount ----------------------------------------------------------- */

  useEffect(() => clearTimers, [clearTimers])

  const replay = useCallback(() => {
    completedKey.current = null
    setReplayNonce((value) => value + 1)
  }, [])

  return { messages, typing, finished, replay }
}
