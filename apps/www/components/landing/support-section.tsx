import Image from "next/image"
import {
  ArrowRight02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { pillCtaClass } from "@/components/pill-cta"
import { PixelPhrase } from "@/components/section-heading"

import { MarketingSection, SectionHeader } from "./marketing-section"

const studioProducts = [
  {
    title: "Newcopy",
    description:
      "An AI cofounder that knows your brand. Marketing copy that converts.",
    href: "https://www.newcopy.ai",
  },
  {
    title: "AI SDK Agents",
    description:
      "120+ Vercel AI SDK agent patterns with live previews and full-stack templates.",
    href: aisdkAgentsUrl("/", {
      medium: "landing",
      content: "studio-card",
    }),
  },
  {
    title: "Best Models",
    description:
      "Independent ranking of the best models on Vercel AI Gateway, updated daily.",
    href: "https://www.bestmodels.dev/",
  },
  {
    title: "Eve Directory",
    description:
      "The open registry for Eve agents. Inspect every file before you install.",
    href: "https://www.evedirectory.com/",
  },
]

export function SupportSection() {
  return (
    <MarketingSection aria-labelledby="support-title">
      <SectionHeader
        id="support-title"
        title={
          <>
            Cult UI stays <PixelPhrase>free</PixelPhrase>
          </>
        }
        lead="MIT licensed and maintained full time."
        className="mb-8"
      >
        AI SDK Agents is what pays for it. If you ship AI features, it is the
        best way to keep this library going.
      </SectionHeader>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={aisdkAgentsUrl("/", {
            medium: "landing",
            content: "closing-cta",
          })}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(pillCtaClass.ink, pillCtaClass.trailingIcon)}
        >
          Get AI SDK Agents
          <HugeiconsIcon
            aria-hidden="true"
            icon={ArrowRight02Icon}
            className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex h-12 items-center rounded-md text-sm underline-offset-4 transition-colors duration-150 outline-none hover:underline focus-visible:ring-2"
        >
          Or star it on GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <a
        href="https://www.nolly.studio/"
        target="_blank"
        rel="noopener noreferrer"
        className="group focus-visible:ring-ring mt-10 flex items-end gap-4 rounded-2xl outline-none focus-visible:ring-2 md:mt-0 md:items-center"
      >
        <div className="flex w-12 shrink-0 flex-col items-center md:ml-16">
          <div
            aria-hidden="true"
            className="bg-border/80 hidden h-16 w-px md:block"
          />
          <Image
            src="/images/jordan-headshot.jpg"
            alt="Jordan Gilliam"
            width={48}
            height={48}
            className="ring-border/80 size-12 rounded-full object-cover ring-1"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5 pb-0.5 md:pt-16">
          <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
            Hire me
          </span>
          <span className="group-hover:text-foreground flex items-center gap-1 text-sm leading-tight font-medium tracking-tight transition-colors duration-150">
            Nolly Studio
            <HugeiconsIcon
              aria-hidden="true"
              icon={ArrowUpRight01Icon}
              className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors duration-150"
            />
          </span>
          <span className="text-muted-foreground max-w-sm text-xs leading-relaxed font-light">
            AI-native product studio. Agent systems and design-engineered UI,
            shipped in weeks.
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </div>
      </a>

      <div className="mt-10">
        <h3 className="text-muted-foreground mb-4 font-mono text-[10px] tracking-wider uppercase">
          More from the studio
        </h3>
        <ul className="bg-muted shadow-soft corner-squircle grid gap-4 rounded-[1.5rem] p-2 sm:grid-cols-2 lg:grid-cols-4 dark:bg-background">
          {studioProducts.map((product) => (
            <li key={product.title}>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card shadow-soft hover:shadow-soft-md focus-visible:ring-ring flex h-full flex-col rounded-2xl p-4 transition-shadow duration-150 outline-none focus-visible:ring-2 corner-squircle dark:bg-muted"
              >
                <span className="mb-1.5 text-sm leading-tight font-medium tracking-tight">
                  {product.title}
                </span>
                <span className="text-muted-foreground mb-3 flex-1 text-xs leading-relaxed font-light">
                  {product.description}
                </span>
                <span className="border-border/80 font-pixel-square text-muted-foreground group-hover:text-foreground flex items-center justify-end gap-1 border-t pt-2.5 text-[10px] tracking-wider uppercase transition-colors duration-150">
                  Visit
                  <HugeiconsIcon
                    aria-hidden="true"
                    icon={ArrowUpRight01Icon}
                    className="size-3"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </MarketingSection>
  )
}
