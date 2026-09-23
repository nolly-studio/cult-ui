"use client";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers, Megaphone, Sparkles } from "lucide-react";
import type { ComponentProps } from "react";

import { BackgroundImageTexture } from "@/components/landing/bg-image-texture";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

const SURFACE_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]";
const SURFACE_SHADOW_DARK =
  "dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)]";

export function GetCultProCta({ className }: ComponentProps<"div">) {
  return (
    <BackgroundImageTexture
      className={cn(
        "shadow-elevation-light dark:shadow-elevation-dark overflow-hidden rounded-lg",
        className
      )}
      opacity={0.31}
      variant="inflicted"
    >
      <article
        className={cn(
          "dark:bg-background/20 bg-background/10 relative flex h-full flex-col rounded-lg p-3 transition-all duration-200",
          SURFACE_SHADOW,
          SURFACE_SHADOW_DARK
        )}
      >
        <div
          className={cn(
            "bg-background/90 mb-5 flex w-fit items-center gap-2 rounded-md px-3 py-2",
            SURFACE_SHADOW,
            SURFACE_SHADOW_DARK
          )}
        >
          <Icons.cultLogoBasic
            className="size-4 fill-black/50 dark:fill-white/70"
            aria-hidden
          />
          <span className="font-pixel-square text-[11px] font-bold tracking-wider text-[#FF6BFF] uppercase dark:text-[#ffb5ff]">
            Cult Pro
          </span>
        </div>

        <h3 className="font-pixel-square mb-2 text-lg leading-tight font-medium tracking-tight text-[#FF6BFF]">
          Marketing UI
        </h3>

        {/* <p className="mb-6 max-w-[60ch] text-pretty text-sm text-foreground/75 leading-relaxed">
					Premium full-stack blocks, templates, and sections.
				</p> */}

        <div className="border-border mb-6 space-y-2 border-t pt-3">
          <div className="flex items-center gap-2">
            <Layers
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              129 Premium Blocks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Megaphone
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              36 Components
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              10 Starter Templates
            </span>
          </div>
        </div>

        <a
          className="font-pixel-square mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d94fd9] bg-[#FF6BFF] px-4 py-2.5 text-xs tracking-[0.14em] text-black uppercase transition-colors hover:bg-[#f056f0]"
          href="https://pro.cult-ui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Get Cult Pro
          <HugeiconsIcon className="size-3.5" icon={ArrowRight02Icon} />
        </a>
      </article>
    </BackgroundImageTexture>
  );
}

export function GetAISDKAgentsCta({ className }: ComponentProps<"div">) {
  return (
    <BackgroundImageTexture
      className={cn(
        "shadow-elevation-light dark:shadow-elevation-dark overflow-hidden rounded-xl",
        className
      )}
      opacity={0.99}
      variant="debut-light"
    >
      <article
        className={cn(
          "bg-background/10 relative flex h-full flex-col rounded-xl p-3 transition-all duration-200",
          SURFACE_SHADOW,
          SURFACE_SHADOW_DARK
        )}
      >
        <div
          className={cn(
            "bg-background/80 mb-5 flex w-fit items-center gap-2 rounded-md px-3 py-2",
            SURFACE_SHADOW,
            SURFACE_SHADOW_DARK
          )}
        >
          <Icons.aisdkAgentsLogo
            className="size-4 fill-[#919191]"
            aria-hidden
          />
          <span className="font-pixel-square text-[11px] font-bold text-[#006BFF] uppercase">
            AI SDK Agents
          </span>
        </div>

        <h3 className="font-pixel-square mb-2 text-lg leading-tight font-medium tracking-tight text-[#006BFF]">
          Full Stack AI Patterns
        </h3>

        {/* <p className="mb-6 text-pretty text-sm text-foreground/75 leading-relaxed">
					Real world AI SDK v6 patterns. Copy and paste.
				</p> */}

        <div className="border-border mb-6 space-y-2 border-t pt-3">
          <div className="flex items-center gap-2">
            <Layers
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              Complex AI Agents
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              Workflow Patterns
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Megaphone
              className="text-muted-foreground size-3 shrink-0"
              aria-hidden
            />
            <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
              Tools + Artifacts
            </span>
          </div>
        </div>

        <a
          className="font-pixel-square text-background mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#0058d4] bg-[#006BFF] px-4 py-2.5 text-xs tracking-[0.14em] uppercase transition-colors hover:bg-[#0058d4]"
          href="https://aisdkagents.com/patterns"
          rel="noopener noreferrer"
          target="_blank"
        >
          Browse agents
          <HugeiconsIcon className="size-3.5" icon={ArrowRight02Icon} />
        </a>
      </article>
    </BackgroundImageTexture>
  );
}
