import { Suspense } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { FeaturesSection } from "@/components/animate/feature-card"
import AdvanceReorderExample from "@/components/animate/list"
import { Announcement } from "@/components/announcement"
import { FadeIn } from "@/components/fade-in"
import {
  FramerIcon,
  Icons,
  ReactIcon,
  ShadCnIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
} from "@/components/icons"
import { PageActions, PageHeader } from "@/components/page-header"
import BgNoiseWrapper from "@/components/texture-wrapper"
import { GradientHeading } from "@/registry/default/ui/gradient-heading"
import { TweetGrid } from "@/registry/default/ui/tweet-grid"

export default function IndexPage() {
  return (
    <div className=" isolate min-h-screen overflow-hidden bg-white bg-gradientTopRightLight pb-8 sm:pb-12 md:pb-0">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="container relative pt-12">
          <PageHeader>
            <FadeIn>
              <Announcement />
            </FadeIn>
            <FadeIn>
              <GradientHeading
                size="xxl"
                weight="bold"
                className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
              >
                Components crafted for Design Engineers
              </GradientHeading>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-1 text-center text-lg font-light text-foreground  md:text-2xl md:font-normal">
                <span>Ready-to-use</span>
                <div className="-rotate-45 rounded-full border border-black/10 p-1 shadow-lg">
                  <ReactIcon className="h-6 w-6   " aria-hidden="true" />
                </div>
                <span> components for your React apps.</span>

                <div className="rounded-full border border-black/10 p-1 shadow-lg">
                  <Icons.logo className="h-5 w-5" />
                </div>

                <span>Shadcn compatible.</span>
                <span>Styled with tailwindcss.</span>
                <div className="-rotate-45 rounded-full border border-black/10 p-1 shadow-lg">
                  <TailwindCSSIcon className="h-6 w-6  " aria-hidden="true" />
                </div>
                <span>Copy and paste. Open Source. Typed. </span>
                <div className="rounded-xs border border-black/10 p-1 shadow-lg ">
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

          <div className="mx-auto w-full  max-w-lg">
            <FadeIn>
              <AdvanceReorderExample />
            </FadeIn>
          </div>
        </div>
        <section className=" mt-12 hidden w-full md:block">
          <FadeIn>
            <div className=" mx-auto max-w-7xl rounded-[44px] bg-neutral-900">
              <FeaturesSection />
            </div>
          </FadeIn>
        </section>
        <section className="hidden  w-full pt-14 md:block">
          <FadeIn>
            <div className="flex flex-col  items-center justify-center overflow-hidden  ">
              <Suspense>
                <TweetGrid tweets={tweets} />
              </Suspense>
            </div>
          </FadeIn>
        </section>
      </BgNoiseWrapper>
    </div>
  )
}
IndexPage.theme = "light"

const tweets = [
  "1742983975340327184",
  "1743049700583116812",
  "1754067409366073443",
  "1753968111059861648",
  "1754174981897118136",
  "1743632296802988387",
  "1754110885168021921",
  "1760248682828419497",
  "1760230134601122153",
  "1760184980356088267",
]
