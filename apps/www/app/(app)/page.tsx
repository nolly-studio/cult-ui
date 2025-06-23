import Link from "next/link"
import { IceCream } from "lucide-react"

import { siteConfig } from "@/config/site"
import { ghStars } from "@/lib/fetchGhStars"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import {
  Icons,
  ReactIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
} from "@/components/icons"
import { FeaturesSection } from "@/components/landing/feature-section"
import { LatestComponentVertical } from "@/components/landing/featured-component"
import { PlugCardGrid } from "@/components/landing/plug-grid"
import { TemplateGrid } from "@/components/landing/template-grid"
import { PageActions, PageHeader } from "@/components/page-header"

export default function IndexPage() {
  const stars = ghStars()
  return (
    <div className=" isolate min-h-screen overflow-hidden  pb-8 sm:pb-12 md:pb-0">
      <div className="container relative pt-12 md:pt-8">
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
              href="/docs"
              className={cn(
                buttonVariants({ size: "sm" }),
                "  rounded-xl transition-all "
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
              <Icons.gitHub className="mr-2 h-5 w-5" />
              GitHub {stars || "2.3k"}+
            </Link>
          </PageActions>
        </PageHeader>

        <section className="w-full space-y-4 md:block">
          <div className=" mx-auto   w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
            <LatestComponentVertical />
          </div>

          <div className=" mx-auto   max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm ">
            <TemplateGrid />
          </div>

          <div className=" mx-auto   max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-b-[44px] md:rounded-t-[20px]">
            <PlugCardGrid />
          </div>
        </section>
      </div>
      <section className=" my-12 hidden w-full md:block">
        <div className=" relative mx-auto max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
          >
            <IceCream className=" fill-[#A3C0E0]  stroke-1 text-neutral-800" />{" "}
            Component Preview
          </Badge>
          <FeaturesSection />
        </div>
      </section>
      {/* Feature Pills */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        role="list"
        aria-label="Technologies used"
      >
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <ReactIcon className="h-5 w-5 text-[#61DAFB]" aria-hidden="true" />
          <span className="text-sm font-medium">React</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <Icons.logo className="h-4 w-4" />
          <span className="text-sm font-medium">Shadcn/ui</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm">
          <TailwindCSSIcon
            className="h-5 w-5 text-[#06B6D4]"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">Tailwind CSS</span>
        </div>
      </div>
    </div>
  )
}
IndexPage.theme = "light"
