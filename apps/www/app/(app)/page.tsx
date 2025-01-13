import Link from "next/link"
import { IceCream } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { FadeIn } from "@/components/fade-in"
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
import { GradientHeading } from "@/registry/default/ui/gradient-heading"

export default function IndexPage() {
  return (
    <div className=" isolate min-h-screen overflow-hidden  pb-8 sm:pb-12 md:pb-0">
      <div className="container relative pt-12 md:pt-8">
        <PageHeader>
          <FadeIn>
            <Announcement />
          </FadeIn>
          <FadeIn>
            <div className="pt-4 md:pt-0">
              <GradientHeading
                weight="bold"
                className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl "
              >
                Components crafted for
              </GradientHeading>
              <GradientHeading
                size="xll"
                weight="bold"
                className="text-center text-xl font-bold    tracking-tighter lg:leading-[0.5rem] "
              >
                <br className="hidden md:block" /> Design Engineers
              </GradientHeading>
            </div>
          </FadeIn>

          <FadeIn>
            <div className=" flex max-w-2xl flex-wrap items-center justify-center gap-1 text-left text-base  leading-3  text-foreground md:pt-8 md:text-xl md:font-normal md:leading-6">
              <span>Ready-to-use</span>
              <div className="hidden -rotate-45 rounded-full border border-black/10 p-1 shadow-lg md:block">
                <ReactIcon className=" h-6 w-6   " aria-hidden="true" />
              </div>
              <span> components for your react apps.</span>

              <span>Shadcn compatible.</span>
              <div className="rounded-full border border-black/10 p-1 shadow-lg">
                <Icons.logo className="h-5 w-5" />
              </div>
              <span>Styled with tailwindcss.</span>
              <div className="hidden -rotate-45 rounded-full border border-black/10 p-1 shadow-lg md:block ">
                <TailwindCSSIcon className="h-6 w-6  " aria-hidden="true" />
              </div>
              <span className="">Copy and paste, open source, typed. </span>
              <div className="rounded-xs hidden border border-black/10 p-1 shadow-lg md:block">
                <TypeScriptIcon className="h-6 w-6 " aria-hidden="true" />
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <PageActions>
              <Link href="/docs" className={cn(buttonVariants())}>
                Get Started
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </PageActions>
          </FadeIn>
        </PageHeader>

        <FadeIn>
          <section className="w-full space-y-4 md:block">
            {/* <div className=" mx-auto   max-w-7xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px] bg-black"> */}
            <div className=" mx-auto   w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
              <LatestComponentVertical />
              {/* <FeaturedComponent /> */}
            </div>

            {/* <div className=" mx-auto   max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]"> */}
            <div className=" mx-auto   max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm ">
              <TemplateGrid />
            </div>

            <div className=" mx-auto   max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-b-[44px] md:rounded-t-[20px]">
              <PlugCardGrid />
            </div>
          </section>
        </FadeIn>
      </div>
      <section className=" mt-12 hidden w-full md:block">
        <FadeIn>
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
        </FadeIn>
      </section>
      {/* </BgNoiseWrapper> */}
    </div>
  )
}
IndexPage.theme = "light"
