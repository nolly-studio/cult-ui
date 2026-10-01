import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { pillCtaClass } from "@/components/pill-cta"

const highlights = ["Agents & workflows", "Tools + artifacts", "Next.js apps"]

/** Right-rail card for AI SDK Agents, the paid product that funds Cult UI. */
export function DocsPromoCard({ className }: { className?: string }) {
  return (
    <aside
      aria-labelledby="docs-promo-title"
      className={cn(
        "bg-card shadow-soft corner-squircle flex flex-col gap-3 rounded-2xl p-4 dark:bg-muted",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="bg-background shadow-soft-sm flex size-6 items-center justify-center rounded-lg">
          <Icons.aisdkAgentsLogo
            aria-hidden="true"
            className="fill-muted-foreground size-3.5"
          />
        </span>
        <span className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase">
          AI SDK Agents
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2
          id="docs-promo-title"
          className="text-sm leading-tight font-medium tracking-tight"
        >
          Full-stack AI blocks
        </h2>
        <p className="text-muted-foreground text-xs leading-relaxed">
          100+ agent patterns built on the Vercel AI SDK and this library.
        </p>
      </div>
      <ul className="border-border/80 flex flex-col gap-1.5 border-t pt-3">
        {highlights.map((highlight) => (
          <li
            key={highlight}
            className="font-pixel-square text-muted-foreground text-[10px] tracking-wider uppercase"
          >
            {highlight}
          </li>
        ))}
      </ul>
      <a
        href={aisdkAgentsUrl("/patterns", {
          medium: "docs",
          content: "rail-card",
        })}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          pillCtaClass.ink,
          pillCtaClass.compact,
          "group mt-1 w-full gap-1.5"
        )}
      >
        Browse patterns
        <HugeiconsIcon
          aria-hidden="true"
          icon={ArrowRight02Icon}
          className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </aside>
  )
}
