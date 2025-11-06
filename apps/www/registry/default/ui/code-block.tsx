"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CodeTab {
  label: string
  code: string
  language?: string
}

interface CodeBlockProps {
  tabs?: CodeTab[]
  code?: string
  language?: string
  className?: string
}

export function CodeBlock({
  tabs,
  code,
  language = "bash",
  className,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [direction, setDirection] = useState(0)
  const preRef = useRef<HTMLPreElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)

  const codeContent = useMemo(() => {
    if (tabs && tabs.length > 0) {
      return tabs
    }
    if (code) {
      return [{ label: language, code, language }]
    }
    return []
  }, [tabs, code, language])

  const currentCode = codeContent[activeTab]?.code || ""

  // Check overflow when tab changes or content updates
  // biome-ignore lint/correctness/useExhaustiveDependencies: activeTab is needed to recheck overflow when content changes
  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (preRef.current) {
        const hasHorizontalOverflow =
          preRef.current.scrollWidth > preRef.current.clientWidth
        setHasOverflow(hasHorizontalOverflow)
      }
    }

    checkOverflow()
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (preRef.current) {
      resizeObserver.observe(preRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [activeTab])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTabChange = (index: number) => {
    setDirection(index > activeTab ? 1 : -1)
    setActiveTab(index)
  }

  if (codeContent.length === 0) return null

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-0.5",
        "border-zinc-950/10 dark:border-white/10",
        "bg-zinc-50 dark:bg-white/5",
        "text-zinc-950 dark:text-zinc-50",
        className
      )}
    >
      {/* Tab Bar */}
      {codeContent.length > 1 && (
        <div className="flex items-center relative pr-2.5">
          <div
            role="tablist"
            className={cn(
              "flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex",
              "overflow-x-auto overflow-y-hidden",
              "scrollbar-thin scrollbar-thumb-rounded",
              "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
              "dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25"
            )}
          >
            <div className="relative flex gap-1">
              {codeContent.map((tab, index) => (
                <button
                  key={`${tab.label}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  onClick={() => handleTabChange(index)}
                  className={cn(
                    "flex items-center relative gap-1.5 my-1 mb-1.5 outline-0",
                    "whitespace-nowrap font-medium transition-colors duration-150",
                    "px-1.5 rounded-lg",
                    "first:ml-2.5",
                    "hover:bg-zinc-200/50 dark:hover:bg-zinc-700/70",
                    activeTab === index
                      ? "text-zinc-950 dark:text-zinc-50"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {tab.label}
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-zinc-50 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-hidden">
        {/* Copy Button */}
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "absolute top-2 right-2 z-10",
            "flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg",
            "text-zinc-500 dark:text-zinc-400",
            "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "opacity-70 group-hover:opacity-100",
            "hover:bg-zinc-200/50 dark:hover:bg-zinc-700/70",
            "hover:text-zinc-950 dark:hover:text-zinc-50",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          )}
          aria-label="Copy code"
        >
          <span className="relative size-3.5">
            <motion.div
              initial={false}
              animate={{
                scale: copied ? 0 : 1,
                opacity: copied ? 0 : 1,
                rotate: copied ? 90 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Copy className="size-full" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                scale: copied ? 1 : 0,
                opacity: copied ? 1 : 0,
                rotate: copied ? 0 : -90,
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Check className="size-full" />
            </motion.div>
          </span>
          <span>{copied ? "Copied" : "Copy"}</span>
        </motion.button>
        <pre
          ref={preRef}
          className={cn(
            "p-4 text-sm leading-relaxed m-0",
            "bg-white dark:bg-zinc-950/50",
            codeContent.length > 1 ? "rounded-b-2xl" : "rounded-2xl",
            hasOverflow ? "overflow-x-auto" : "overflow-x-hidden",
            hasOverflow && "scrollbar-thin scrollbar-thumb-rounded",
            hasOverflow &&
              "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
            hasOverflow &&
              "dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25",
            hasOverflow && "[&::-webkit-scrollbar]:h-2",
            hasOverflow && "[&::-webkit-scrollbar-thumb]:rounded-full",
            hasOverflow && "[&::-webkit-scrollbar-thumb]:bg-black/15",
            hasOverflow && "[&::-webkit-scrollbar-thumb]:dark:bg-white/20",
            hasOverflow && "[&::-webkit-scrollbar-thumb:hover]:bg-black/20",
            hasOverflow &&
              "[&::-webkit-scrollbar-thumb:hover]:dark:bg-white/25",
            hasOverflow && "[&::-webkit-scrollbar-track]:bg-transparent"
          )}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.code
              key={activeTab}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 20 : -20,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -20 : 20,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="font-mono text-zinc-950 dark:text-zinc-50 block whitespace-pre"
            >
              {currentCode}
            </motion.code>
          </AnimatePresence>
        </pre>
      </div>
    </div>
  )
}
