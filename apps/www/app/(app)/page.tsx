import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { Icons, ReactIcon, TailwindCSSIcon } from "@/components/icons"
import { MiniBlocksGrid } from "@/components/landing/blocks-grid"
import { LatestComponentVertical } from "@/components/landing/featured-component"
import { PlugCardGrid } from "@/components/landing/plug-grid"
import { TemplateGrid } from "@/components/landing/template-grid"
import { PageActions, PageHeader } from "@/components/page-header"

export default function IndexPage() {
  return (
    <div className=" isolate min-h-screen overflow-hidden  pb-8 sm:pb-12 md:pb-0">
      <div className="container relative py-12 md:pt-0">
        <PageHeader>
          <Announcement />

          {/* Hero Title */}
          <div className="py-2">
            <h1 className="text-center text-3xl font-semibold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Components for Design Engineers
            </h1>
          </div>

          {/* Hero Description */}
          <div className="mx-auto max-w-3xl space-y-6 md:space-y-8">
            <p className="text-center text-lg leading-relaxed text-foreground md:text-xl ">
              Free and open source components. Shadcn compatible blocks, full
              stack nextjs templates and more. Built by design engineers,
              configured for vibe coding.
            </p>
          </div>

          {/* CTA Buttons */}
          <PageActions>
            <Link
              href="/docs/components/toolbar-expandable"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-xl transition-all"
              )}
            >
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "  rounded-xl transition-all hover:bg-muted/50"
              )}
            >
              <Icons.gitHub className="mr-2 size-5" />
              GitHub
            </Link>
          </PageActions>
        </PageHeader>

        <section className="w-full space-y-4 md:block">
          <div className=" mx-auto   w-full max-w-4xl rounded-3xl shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)] bg-white">
            <LatestComponentVertical />
          </div>

          <div className=" mx-auto   max-w-4xl ">
            <MiniBlocksGrid />
          </div>

          <div className=" mx-auto   max-w-4xl   ">
            <TemplateGrid />
          </div>

          <div className=" mx-auto   max-w-4xl ">
            <PlugCardGrid />
          </div>
        </section>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <ReactIcon className="size-5 text-[#61DAFB]" aria-hidden="true" />
          <span className="text-sm font-medium">React</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <Icons.logo className="size-4" />
          <span className="text-sm font-medium">Shadcn/ui</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <TailwindCSSIcon
            className="size-5 text-[#06B6D4]"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">Tailwind CSS</span>
        </div>
      </div>
    </div>
  )
}
IndexPage.theme = "light"
