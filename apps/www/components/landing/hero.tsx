"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { Icons, ReactIcon, TailwindCSSIcon } from "@/components/icons"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <Announcement />
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="block">Components for</span>
              <span className="mt-2 block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Design Engineers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Free and open source components. Shadcn compatible blocks, full
              stack Next.js templates and more. Built by design engineers,
              configured for vibe coding.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/docs/components/toolbar-expandable"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl transition-all hover:bg-muted/50"
                )}
              >
                <Icons.gitHub className="mr-2 size-5" />
                GitHub
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <div className="group flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-[#61DAFB]/50 hover:bg-[#61DAFB]/5">
                <ReactIcon className="size-5 text-[#61DAFB]" aria-hidden="true" />
                <span className="text-sm font-medium">React</span>
              </div>

              <div className="group flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                <Icons.logo className="size-4" />
                <span className="text-sm font-medium">Shadcn/ui</span>
              </div>

              <div className="group flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5">
                <TailwindCSSIcon
                  className="size-5 text-[#06B6D4]"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">Tailwind CSS</span>
              </div>

              <div className="group flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">Copy & Paste</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
