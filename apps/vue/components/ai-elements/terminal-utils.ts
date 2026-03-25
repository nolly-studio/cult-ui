import type { ComputedRef, InjectionKey } from "vue"

export interface TerminalContext {
  output: ComputedRef<string>
  isStreaming: ComputedRef<boolean>
  autoScroll: ComputedRef<boolean>
  onClear?: () => void
}

export const terminalKey: InjectionKey<TerminalContext> = Symbol("terminal")

export function useTerminal(): TerminalContext {
  const context = inject(terminalKey)
  if (!context) {
    throw new Error("Terminal components must be used within Terminal")
  }
  return context
}

import { inject } from "vue"
