import { Suspense } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { FeaturesSection } from "@/components/animate/feature-card"
import { Announcement } from "@/components/announcement"
import { FadeIn } from "@/components/fade-in"
import {
  FramerIcon,
  Icons,
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
                <TailwindCSSIcon
                  className="h-8 w-8 rounded-full border border-black/10 bg-white p-1"
                  aria-hidden="true"
                />
                <span>Components that you can </span>

                <FramerIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                  title="Next.js"
                />
                <span>copy and paste into react apps.</span>
                <span>Customizable. Open Source. Typed. </span>
                <TypeScriptIcon className="h-6 w-6 " aria-hidden="true" />
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

          <section className="hidden  w-full md:block">
            <div className="flex flex-col  items-center justify-center overflow-hidden  ">
              <Suspense>
                <TweetGrid tweets={tweets} />
              </Suspense>
            </div>
          </section>
        </div>
        <section className=" mt-12 hidden w-full rounded-tr-[364px] bg-neutral-900 md:block">
          <FeaturesSection />
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
