import { Suspense } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { FeaturesSection } from "@/components/animate/feature-card"
import { Announcement } from "@/components/announcement"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import BgNoiseWrapper from "@/components/texture-wrapper"
import { GradientHeading } from "@/registry/default/ui/gradient-heading"
import { TweetGrid } from "@/registry/default/ui/tweet-grid"

export default function IndexPage() {
  return (
    // <div className="container relative">
    <>
      <div className="bg-gradientTopRightLightSm isolate min-h-screen overflow-hidden bg-white pb-8 sm:pb-12 md:bg-gradientTopRightLight md:pb-0">
        {/* <BgNoiseWrapper url="/cult-canvas-noise.png"> */}
        <BgNoiseWrapper url="/egg-shell-noise.png">
          <div className="container relative pt-12">
            <PageHeader>
              <Announcement />
              <GradientHeading
                size="xxl"
                weight="bold"
                className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
              >
                Components crafted for Design Engineers
              </GradientHeading>

              <PageHeaderDescription className="md:text-2xl md:font-normal">
                Beautifully designed components that you can copy and paste into
                your apps. Accessible. Customizable. Open Source.
              </PageHeaderDescription>
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
            </PageHeader>

            <section className="  w-full block">
              <div className="flex flex-col  items-center justify-center overflow-hidden rounded-lg ">
                <Suspense>
                  <TweetGrid tweets={tweets} />
                </Suspense>
              </div>
            </section>
          </div>
          <section className="  w-full block bg-neutral-900 mt-12 rounded-tr-[364px]">
            <FeaturesSection />
          </section>
        </BgNoiseWrapper>
        {/* <div className="bg-noise" /> */}
      </div>
    </>
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
