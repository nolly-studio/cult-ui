import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { aisdkAgentsUrl } from "@/lib/aisdkagents";
import { Icons } from "@/components/icons";

/**
 * Full-width ink bar above the site header linking to the newest AI SDK Agents
 * patterns. Sits in normal flow so it scrolls away and the sticky docs header
 * keeps its `--header-height` offsets.
 */
export function AnnouncementBar() {
  return (
    <a
      href={aisdkAgentsUrl("/ai-components", {
        medium: "header",
        content: "announcement-bar",
      })}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="announcement-bar"
      className="group bg-foreground text-background focus-visible:ring-ring relative z-50 flex h-9 items-center justify-center gap-2 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-inset"
    >
      <Icons.aisdkAgentsLogo aria-hidden="true" className="fill-background size-3.5 shrink-0" />
      <span className="font-pixel-square truncate">140 new AI components just dropped</span>
      <HugeiconsIcon
        aria-hidden="true"
        icon={ArrowRight02Icon}
        className="size-3.5 shrink-0 opacity-70 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
      />
      <span className="sr-only">on AI SDK Agents (opens in a new tab)</span>
    </a>
  );
}
