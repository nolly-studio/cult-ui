import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

async function StarsCount() {
  try {
    const data = await fetch(
      "https://api.github.com/repos/nolly-studio/cult-ui",
      {
        next: { revalidate: 86400 },
      }
    );
    const json = await data.json();
    const count = json.stargazers_count ?? 0;
    const formattedCount =
      count >= 1000
        ? `${(count / 1000).toFixed(1)}k`.replace(/\.0$/, "")
        : count.toLocaleString();
    return (
      <span className="text-muted-foreground text-xs tabular-nums">
        {formattedCount}
      </span>
    );
  } catch {
    return null;
  }
}

export function GitHubLink({ className }: { className?: string }) {
  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:ring-ring inline-flex h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-full outline-none md:px-3",
        "transition-[color,background-color] duration-150 ease-out focus-visible:ring-2",
        className
      )}
    >
      <Icons.gitHub aria-hidden="true" className="size-4" />
      <span className="hidden md:inline-flex">
        <React.Suspense fallback={<Skeleton className="h-4 w-7" />}>
          <StarsCount />
        </React.Suspense>
      </span>
      <span className="sr-only">GitHub (opens in a new tab)</span>
    </Link>
  );
}

export function GitHubButton({ className }: { className?: string }) {
  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "border-border bg-background hover:border-foreground/40 hover:bg-foreground hover:text-background hidden items-center gap-2 rounded-md border px-6 py-3 font-mono text-sm tracking-wider uppercase transition-all md:flex",
        className
      )}
    >
      <Icons.gitHub className="size-4" />
      GitHub
      <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
        <StarsCount />
      </React.Suspense>
    </Link>
  );
}
