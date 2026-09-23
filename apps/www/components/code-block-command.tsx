"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { copyToClipboardWithMeta } from "@/components/copy-button";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    };
  }, [__npm__, __pnpm__, __yarn__, __bun__]);

  const availableTabs = Object.entries(tabs).filter(([, value]) => value);
  const [direction, setDirection] = React.useState(0);

  const currentCommand = tabs[packageManager] || availableTabs[0]?.[1] || "";

  const copyCommand = React.useCallback(() => {
    if (!currentCommand) {
      return;
    }

    copyToClipboardWithMeta(currentCommand, {
      name: "copy_npm_command",
      properties: {
        command: currentCommand,
        pm: packageManager,
      },
    });
    setHasCopied(true);
  }, [packageManager, currentCommand]);

  const handleTabChange = (key: string) => {
    const currentIndex = availableTabs.findIndex(([k]) => k === packageManager);
    const newIndex = availableTabs.findIndex(([k]) => k === key);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setConfig({
      ...config,
      packageManager: key as "pnpm" | "npm" | "yarn" | "bun",
    });
  };

  if (availableTabs.length === 0) return null;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-0.5",
        "border-border/50",
        "bg-muted/50",
        "text-foreground"
      )}
    >
      {/* Tab Bar */}
      <div className="relative flex items-center pr-2.5">
        <div
          role="tablist"
          className={cn(
            "flex min-w-0 flex-1 gap-1 rounded-tl-xl text-xs leading-6",
            "overflow-x-auto overflow-y-hidden",
            "scrollbar-thin scrollbar-thumb-rounded",
            "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
            "dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25"
          )}
        >
          <div className="relative flex items-center gap-2">
            {/* Terminal Icon */}

            {availableTabs.map(([key]) => {
              const isActive = packageManager === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(key)}
                  className={cn(
                    "relative my-1 mb-1.5 flex items-center gap-1.5 outline-0",
                    "font-medium whitespace-nowrap transition-colors duration-150",
                    "rounded-sm px-1.5 first:ml-1 first:rounded-tl-lg",
                    "hover:bg-muted",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {key}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative overflow-hidden">
        {/* Copy Button */}
        <motion.button
          onClick={copyCommand}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "absolute top-2 right-2 z-10",
            "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium",
            "text-muted-foreground",
            "bg-background/80 backdrop-blur-sm",
            "border-border/50 border",
            "opacity-70 group-hover:opacity-100",
            "hover:bg-muted",
            "hover:text-foreground",
            "transition-all duration-150",
            "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none"
          )}
          aria-label="Copy code"
        >
          <span className="relative size-3.5">
            <motion.div
              initial={false}
              animate={{
                scale: hasCopied ? 0 : 1,
                opacity: hasCopied ? 0 : 1,
                rotate: hasCopied ? 90 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Copy className="size-full" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                scale: hasCopied ? 1 : 0,
                opacity: hasCopied ? 1 : 0,
                rotate: hasCopied ? 0 : -90,
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Check className="size-full" />
            </motion.div>
          </span>
          <span>{hasCopied ? "Copied" : "Copy"}</span>
        </motion.button>

        <pre
          className={cn(
            "m-0 p-4 text-sm leading-relaxed",
            "bg-card",
            "rounded-b-2xl",
            "overflow-x-auto",
            "scrollbar-thin scrollbar-thumb-rounded",
            "scrollbar-thumb-border hover:scrollbar-thumb-border",
            "[&::-webkit-scrollbar]:h-2",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-border/50",
            "[&::-webkit-scrollbar-thumb:hover]:bg-border",
            "[&::-webkit-scrollbar-track]:bg-transparent"
          )}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.code
              key={packageManager}
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
              className="text-foreground block font-mono whitespace-pre"
            >
              {currentCommand}
            </motion.code>
          </AnimatePresence>
        </pre>
      </div>
    </div>
  );
}
