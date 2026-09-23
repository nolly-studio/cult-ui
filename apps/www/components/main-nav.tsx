"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.cultLogoBasic className="size-6 fill-black dark:fill-white" />
        <span className="hidden text-lg font-bold sm:inline-block">cult ui</span>
        <span className="sr-only">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs/components/hero-color-panels"
          className={cn(
            "hover:text-foreground/80 text-sm font-semibold transition-colors",
            pathname?.startsWith("/docs/components") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Components
        </Link>

        <a
          href="https://aisdkagents.com/patterns"
          //  biome-ignore lint/security/noBlankTarget: we want to open the link in a new tab
          target="_blank"
          // rel="noopener noreferrer"
          className={cn(
            "hover:text-foreground/80 flex items-center gap-2 text-sm font-semibold transition-colors",
            pathname?.startsWith("/examples") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Blocks
          <span className="font-pixel-square border border-black/20 bg-[#ADFA1B] px-1 text-[10px] text-black shadow-inner">
            22 new
          </span>
          <ExternalLink className="size-3" />
        </a>

        {/* <a
          href="https://aisdkagents.com/ai-components"
          //  biome-ignore lint/security/noBlankTarget: we want to open the link in a new tab
          target="_blank"
          // rel="noopener noreferrer"
          className={cn(
            "hover:text-foreground/80 flex items-center gap-2 text-sm font-semibold transition-colors",
            pathname?.startsWith("/examples") ? "text-foreground" : "text-foreground/60",
          )}
        >
          AI Components
          <span className="font-pixel-square border border-black/20 bg-[#ADFA1B] px-1 text-[10px] text-black shadow-inner">
            3 new
          </span>
          <ExternalLink className="size-3" />
        </a> */}

        <a
          href="https://www.aisdkagents.com/skills"
          //  biome-ignore lint/security/noBlankTarget: we want to open the link in a new tab
          target="_blank"
          // rel="noopener noreferrer"
          className={cn(
            "hover:text-foreground/80 flex items-center gap-2 text-sm font-semibold transition-colors",
            pathname?.startsWith("/examples") ? "text-foreground" : "text-foreground/60",
          )}
        >
          AI Skills{" "}
          <span className="font-pixel-square border border-black/20 bg-[#ADFA1B] px-1 text-[10px] text-black shadow-inner">
            2 new
          </span>
          <ExternalLink className="size-3" />
        </a>
      </nav>
    </div>
  );
}
