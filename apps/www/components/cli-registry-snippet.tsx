"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CopyIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CliRegistrySnippetProps {
  className?: string;
}

export function CliRegistrySnippet({ className }: CliRegistrySnippetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const registrySnippet = `{
  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(registrySnippet);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground flex h-auto items-center gap-2 p-0 text-sm"
          >
            {isOpen ? (
              <ChevronDownIcon className="size-4" />
            ) : (
              <ChevronRightIcon className="size-4" />
            )}
            <span>Configure registry (shadcn v3)</span>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Add this to your{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                components.json
              </code>{" "}
              file:
            </p>

            <div className="relative">
              <pre className="bg-muted overflow-x-auto rounded-md p-3 text-sm">
                <code>{registrySnippet}</code>
              </pre>

              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                className={cn(
                  "absolute top-2 right-2 size-8 transition-all duration-200",
                  isCopied
                    ? "bg-green-100 text-green-600 hover:bg-green-100"
                    : "hover:bg-background"
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
                    >
                      <CopyIcon className="size-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">
              Then install with:{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                npx shadcn@beta add @cult-ui/component-name
              </code>
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
