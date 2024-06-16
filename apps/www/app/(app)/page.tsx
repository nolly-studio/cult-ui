import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, IceCream, SparklesIcon } from "lucide-react"

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
import { PlugCardGrid } from "@/components/landing/plug-grid"
import { PageActions, PageHeader } from "@/components/page-header"
import BgNoiseWrapper from "@/components/texture-wrapper"
import DockAnimation from "@/registry/default/example/dock-demo"
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
                size="xl"
                weight="bold"
                className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
              >
                Components crafted for <br className="hidden md:block" /> Design
                Engineers
              </GradientHeading>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-1 text-center text-base  leading-3  text-foreground md:text-2xl md:font-normal md:leading-6">
                <span>Ready-to-use</span>
                <div className="hidden -rotate-45 rounded-full border border-black/10 p-1 shadow-lg md:block">
                  <ReactIcon className=" h-6 w-6   " aria-hidden="true" />
                </div>
                <span> components for your React apps.</span>

                <span>Shadcn compatible.</span>
                <div className="rounded-full border border-black/10 p-1 shadow-lg">
                  <Icons.logo className="h-5 w-5" />
                </div>
                <span>Styled with tailwindcss.</span>
                <div className="hidden -rotate-45 rounded-full border border-black/10 p-1 shadow-lg md:block ">
                  <TailwindCSSIcon className="h-6 w-6  " aria-hidden="true" />
                </div>
                <span className="">Copy and paste. Open Source. Typed. </span>
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
            <section className="w-full md:block">
              <div className=" mx-auto   max-w-7xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]">
                <PlugCardGrid />
              </div>
              <div className=" mx-auto  mt-4 w-full max-w-7xl ">
                <div className="relative flex w-full flex-col rounded-[24px] border border-black/5 p-2 shadow-sm md:flex-row md:items-center md:gap-24 md:rounded-[44px] md:p-6">
                  <Badge
                    variant="outline"
                    className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
                  >
                    <SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
                    Latest component
                  </Badge>
                  <div className="flex flex-col justify-center pb-2 pl-2 pt-16 md:items-center">
                    <div className="flex  gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="256"
                        height="260"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 260"
                        className="h-12 w-12 fill-neutral-800/90"
                      >
                        <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
                      </svg>

                      <div>
                        <GradientHeading>Dock</GradientHeading>
                        <Link
                          href="/docs/components/sortable-list"
                          className="flex items-center gap-1 "
                        >
                          A Mac OS doc animation
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-24 grow md:mt-0">
                    <DockAnimation />
                  </div>
                </div>
              </div>

              {/* <div className=" mx-auto  mt-4 max-w-7xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]">
                <PlugCardGrid />
              </div> */}
            </section>
          </FadeIn>
        </div>
        <section className=" mt-12 hidden w-full md:block">
          <FadeIn>
            <div className=" relative mx-auto max-w-7xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]">
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
