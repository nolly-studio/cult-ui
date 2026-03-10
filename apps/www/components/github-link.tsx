import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"

async function StarsCount() {
  try {
    const data = await fetch(
      "https://api.github.com/repos/nolly-studio/cult-ui",
      {
        next: { revalidate: 86400 },
      }
    )
    const json = await data.json()
    const count = json.stargazers_count ?? 0
    const formattedCount =
      count >= 1000
        ? `${(count / 1000).toFixed(1)}k`.replace(/\.0$/, "")
        : count.toLocaleString()
    return (
      <span className="text-xs text-muted-foreground tabular-nums">
        {formattedCount}
      </span>
    )
  } catch {
    return null
  }
}

export function GitHubLink({ className }: { className?: string }) {
  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-1 w-9 px-0 md:w-auto md:px-2",
          className
        )}
      >
        <Icons.gitHub className="size-4" />
        <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
          <StarsCount />
        </React.Suspense>
        <span className="sr-only">GitHub</span>
      </div>
    </Link>
  )
}

export function GitHubButton({ className }: { className?: string }) {
  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "md:flex hidden items-center gap-2 border border-border bg-background px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all hover:border-foreground/40 hover:bg-foreground hover:text-background",
        className
      )}
    >
      <Icons.gitHub className="size-4" />
      GitHub
      <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
        <StarsCount />
      </React.Suspense>
    </Link>
  )
}
