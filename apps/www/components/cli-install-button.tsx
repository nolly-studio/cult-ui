"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckIcon, CopyIcon, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ShadcnLogo } from "./icons"

export type InstallationCliProps = {
  value: string
  className?: string
}

export function InstallationCli({ value, className }: InstallationCliProps) {
  const [isCopied, setIsCopied] = useState(false)
  const command = `npx shadcn@latest add "https://cult-ui.com/r/${value}.json"`
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isMediumScreen = useMediaQuery("(max-width: 768px)")

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Responsive layout - stack vertically on very small screens
  const isVerticalLayout = isSmallScreen && command.length > 30

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950",
        isVerticalLayout ? "flex flex-col" : "flex items-center",
        className
      )}
    >
      {/* Logo section */}
      <div
        className={cn(
          "flex items-center gap-2 bg-zinc-900 px-3 py-2.5",
          isVerticalLayout
            ? "w-full justify-between border-b border-zinc-800"
            : "h-full border-r border-zinc-800"
        )}
      >
        <div className="flex items-center gap-2">
          <ShadcnLogo className="size-4 text-zinc-100" />
          <span
            className={cn(
              "text-sm font-medium text-zinc-100",
              isSmallScreen && !isVerticalLayout ? "hidden" : "block"
            )}
          >
            shadcn
          </span>
        </div>

        {/* Copy button appears in header on vertical layout */}
        {isVerticalLayout && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCopy}
                  className={cn(
                    "relative h-8 w-8 rounded-md transition-all duration-200 hover:bg-zinc-800",
                    isCopied
                      ? "bg-green-900/30 text-green-400 hover:bg-green-900/30"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                  aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <CheckIcon className="size-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <CopyIcon className="size-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isCopied ? "Copied!" : "Copy to clipboard"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Command section */}
      <div
        className={cn(
          "scrollbar-hide flex flex-1 items-center gap-2 overflow-x-auto px-3 py-2.5",
          isVerticalLayout && "w-full"
        )}
      >
        <Terminal
          className={cn(
            "shrink-0 text-emerald-400",
            isSmallScreen ? "size-3.5" : "size-4"
          )}
        />
        <code
          className={cn(
            "flex-1 whitespace-pre font-mono text-zinc-100",
            isSmallScreen ? "text-xs" : "text-sm"
          )}
        >
          {command}
        </code>
      </div>

      {/* Copy button - only shown in horizontal layout */}
      {!isVerticalLayout && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                className={cn(
                  "relative m-1 rounded-md transition-all duration-200 hover:bg-zinc-800",
                  isMediumScreen ? "h-7 w-7" : "h-8 w-8",
                  isCopied
                    ? "bg-green-900/30 text-green-400 hover:bg-green-900/30"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
                aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCopied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <CheckIcon
                        className={isMediumScreen ? "size-3.5" : "size-4"}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <CopyIcon
                        className={isMediumScreen ? "size-3.5" : "size-4"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Copy confirmation overlay */}
      {isCopied && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400"
          >
            <CheckIcon className="size-4" />
            Copied!
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
