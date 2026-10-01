"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { copyToClipboardWithMeta } from "@/components/copy-button"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return
    const timer = setTimeout(() => setHasCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(
    () => ({ pnpm: __pnpm__, npm: __npm__, yarn: __yarn__, bun: __bun__ }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  )
  const availableTabs = Object.entries(tabs).filter(([, value]) => value)
  const currentCommand = tabs[packageManager] || availableTabs[0]?.[1] || ""

  const copyCommand = React.useCallback(() => {
    if (!currentCommand) return
    copyToClipboardWithMeta(currentCommand, {
      name: "copy_npm_command",
      properties: { command: currentCommand, pm: packageManager },
    })
    setHasCopied(true)
  }, [packageManager, currentCommand])

  if (availableTabs.length === 0) return null

  return (
    <div
      data-slot="code-block-command"
      className="bg-code text-code-foreground shadow-soft-sm overflow-hidden rounded-2xl"
    >
      <div className="border-border/80 flex items-center justify-between border-b pr-1.5 pl-2">
        <div
          role="group"
          aria-label="Package manager"
          className="flex items-center"
        >
          {availableTabs.map(([key]) => {
            const isActive = packageManager === key
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setConfig({
                    ...config,
                    packageManager: key as PackageManager,
                  })
                }
                className={cn(
                  "focus-visible:ring-ring relative h-9 rounded-md px-2 font-mono text-xs transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset",
                  "after:absolute after:inset-x-2 after:-bottom-px after:h-px after:bg-transparent",
                  isActive
                    ? "text-foreground after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {key}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs transition-colors duration-150 outline-none focus-visible:ring-2"
        >
          {hasCopied ? (
            <Check aria-hidden="true" className="size-3.5" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          <span aria-live="polite">{hasCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="no-scrollbar m-0 overflow-x-auto px-4 py-3.5 text-[0.8125rem] leading-relaxed">
        <code className="block font-mono whitespace-pre">{currentCommand}</code>
      </pre>
    </div>
  )
}
