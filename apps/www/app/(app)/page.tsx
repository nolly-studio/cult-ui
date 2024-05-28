import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
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
      <div className="isolate overflow-hidden bg-white min-h-screen md:pb-0 pb-8 sm:pb-12 bg-gradientTopRightLightSm md:bg-gradientTopRightLight">
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

            <section className="hidden md:block  w-full left-0 right-0">
              <div className="overflow-hidden rounded-lg  flex flex-col items-center justify-center ">
                <TweetGrid tweets={tweets} />
              </div>
            </section>
          </div>
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
