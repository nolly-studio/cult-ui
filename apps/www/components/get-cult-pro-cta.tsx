"use client"

import { ArrowRight, Layers, Megaphone, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "./icons"
import { PixelHeading } from "./landing/pixel-heading-word"
import { PixelParagraphInverse } from "./landing/pixel-paragraph-words-inverse"

export function GetCultProCta({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative rounded-xl bg-card border border-border transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5",
        className
      )}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[oklch(0.7_0.25_320)]/10 to-blue-500/10 dark:from-[oklch(0.7_0.25_320)]/20 dark:to-[#B357C5]">
            <Icons.cultLogoBasic className="size-6 fill-black dark:fill-white  h-4 w-4 text-[oklch(0.7_0.25_320)] dark:text-[oklch(0.8_0.25_320)]" />
          </div>
          <div className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Cult Pro
          </div>
        </div>

        {/* Description */}
        <p className="text-sm  leading-snug max-w-[60ch] tracking-tight">
          Premium full-stack blocks, templates, and sections.
        </p>

        {/* Features */}
        <div className="space-y-2 text-foreground/80 leading-snug tracking-wide text-sm ">
          <div className="flex items-center gap-3">
            <Layers className="h-4 w-4 text-[oklch(0.7_0.25_320)] dark:text-[oklch(0.8_0.25_320)] flex-shrink-0" />
            <span>Full-stack blocks with backend integrations</span>
          </div>
          <div className="flex items-center gap-3">
            <Megaphone className="h-4 w-4 text-[oklch(0.7_0.25_320)] dark:text-[oklch(0.8_0.25_320)] flex-shrink-0" />
            <span>Marketing sections animated with framer</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[oklch(0.7_0.25_320)] dark:text-[oklch(0.8_0.25_320)] flex-shrink-0" />
            <span>Premium full-stack SaaS templates + starter kits</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="sm"
          className={cn(
            "w-fit bg-gradient-to-r from-[oklch(0.7_0.25_320)]/85 to-[oklch(0.6_0.25_320)] text-white",
            "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
            "border border-zinc-950/35 dark:border-zinc-950/50",
            "transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
            "dark:from-[oklch(0.7_0.25_320)]/75 dark:to-[oklch(0.6_0.25_320)]/75"
          )}
        >
          Get Cult Pro
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <a
        href="https://pro.cult-ui.com"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.25_320)]/20 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
      >
        <span className="sr-only">Get Cult Pro</span>
      </a>
    </div>
  )
}

export function GetAISDKAgentsCta({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative flex flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/40 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {/* Corner accents */}
      <div className="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
      <div className="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
      <div className="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
      <div className="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

      <div className="flex flex-col gap-4 p-5">
        {/* Label */}
        <div className="flex items-center gap-2">
          <Icons.aisdkAgentsLogo className="size-3.5 dark:fill-white/60 fill-black/60" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            AI SDK Agents
          </span>
        </div>

        {/* Pixel Heading */}
        <PixelHeading
          as="h3"
          initialFont="square"
          hoverFont="line"
          className="text-lg font-medium leading-tight tracking-tight"
        >
          92+ AI Patterns
        </PixelHeading>

        {/* Description */}
        <PixelParagraphInverse
          text="Real world AI SDK v6 patterns. Copy and paste."
          plainWords={["and "]}
          initialPlainFont="mono"
          pixelFont="square"
          className="text-xs leading-relaxed text-muted-foreground"
        />

        {/* Feature list */}
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Layers className="size-3 flex-shrink-0 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Complex AI Agents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-3 flex-shrink-0 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Workflow Patterns
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Megaphone className="size-3 flex-shrink-0 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Tools + Artifacts
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
          <span>Browse Patterns</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <a
        href="https://www.aisdkagents.com/patterns"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
      >
        <span className="sr-only">Browse AI SDK Agent Patterns</span>
      </a>
    </div>
  )
}
