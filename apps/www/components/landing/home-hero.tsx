import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { pillCtaClass } from "@/components/pill-cta"
import { PixelPhrase, SectionTitle } from "@/components/section-heading"
import { TwoToneSectionDescription } from "@/components/two-tone-section-description"

import { NEW_COMPONENT_COUNT } from "./free-components-section"
import { HomeHeroArtwork } from "./home-hero-artwork"

const featuredPreviews = [
  { slug: "globe", title: "Globe" },
  { slug: "kanban-board", title: "Kanban board" },
  { slug: "fluted-glass", title: "Fluted glass" },
  { slug: "mac-screen", title: "Mac screen" },
  { slug: "analytics-chart", title: "Analytics chart" },
  { slug: "folded-card", title: "Folded card" },
  { slug: "merging-bubbles", title: "Merging bubbles" },
  { slug: "circuit-board", title: "Circuit board" },
  { slug: "security-checkpoint", title: "Security checkpoint" },
  { slug: "apple-watch-ultra", title: "Apple Watch Ultra" },
  { slug: "collab-toolbar", title: "Collab toolbar" },
  { slug: "shadow-card", title: "Shadow card" },
] as const

type FeaturedPreview = (typeof featuredPreviews)[number]

function NewComponentsChip() {
  return (
    <Link
      href="/docs/components/globe"
      className="bg-muted/55 shadow-soft-sm hover:shadow-soft focus-visible:ring-ring inline-flex h-9 items-center gap-2 rounded-2xl pr-3 pl-1.5 text-sm backdrop-blur transition-shadow duration-150 outline-none focus-visible:ring-2"
    >
      <span className="bg-background shadow-soft-sm flex size-6 items-center justify-center rounded-xl">
        <Icons.cultLogoBasic
          aria-hidden="true"
          className="fill-foreground size-3.5"
        />
      </span>
      <span className="text-foreground font-medium">
        {NEW_COMPONENT_COUNT} new components
      </span>
      <span className="text-muted-foreground hidden sm:inline">
        Free and MIT licensed
      </span>
    </Link>
  )
}

function PreviewTile({
  preview,
  priority,
  className,
}: {
  preview: FeaturedPreview
  priority?: boolean
  className?: string
}) {
  return (
    <Link
      href={`/docs/components/${preview.slug}`}
      className={cn(
        "bg-card shadow-soft hover:shadow-soft-md focus-visible:ring-ring block w-72 shrink-0 overflow-hidden rounded-3xl transition-shadow duration-150 outline-none focus-visible:ring-2 sm:w-80 dark:bg-muted",
        className
      )}
    >
      <div className="relative aspect-[16/10]">
        {(["light", "dark"] as const).map((mode) => (
          <Image
            key={mode}
            alt={`${preview.title} component preview`}
            src={`/cult-pro-component-images/${preview.slug}-demo-${mode}.png`}
            fill
            sizes="320px"
            priority={priority}
            className={cn(
              "object-cover object-top",
              mode === "light" ? "dark:hidden" : "hidden dark:block"
            )}
          />
        ))}
      </div>
      <div className="flex h-11 items-center px-4 text-sm font-medium tracking-tight">
        {preview.title}
      </div>
    </Link>
  )
}

function PreviewMarquee() {
  return (
    <>
      <div
        className="group/marquee -my-5 flex gap-(--gap) overflow-hidden py-5 [--duration:60s] [--gap:1rem] motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            inert={copy === 1 ? true : undefined}
            className="animate-marquee flex shrink-0 gap-(--gap) group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]"
          >
            {featuredPreviews.map((preview, index) => (
              <PreviewTile
                key={preview.slug}
                preview={preview}
                priority={copy === 0 && index < 3}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="hidden gap-4 px-4 motion-reduce:grid sm:grid-cols-3 sm:px-6">
        {featuredPreviews.slice(0, 3).map((preview) => (
          <PreviewTile
            key={preview.slug}
            preview={preview}
            className="w-full sm:w-full"
          />
        ))}
      </div>
    </>
  )
}

/**
 * Home ledger hero: left-aligned copy stack above a squircle stage with
 * dithered artwork and a marquee of component previews.
 */
export function HomeHero({ count }: { count: number }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
      <div className="mb-8 flex max-w-2xl flex-col items-start text-start sm:mb-12">
        <NewComponentsChip />
        <SectionTitle as="h1" size="lg" className="mt-6">
          Shadcn,
          <br />
          <PixelPhrase>expanded</PixelPhrase>
        </SectionTitle>
        <TwoToneSectionDescription
          size="xl"
          lead={`${count} animated components, all free.`}
          className="mt-3 ms-1 md:ms-1.5"
        >
          Including {NEW_COMPONENT_COUNT} just added. Open source, built to drop
          into any shadcn/ui project.
        </TwoToneSectionDescription>
        <Link
          href={siteConfig.links.components}
          className={cn(pillCtaClass.ink, pillCtaClass.trailingIcon, "mt-8")}
        >
          Browse {count} components
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
        <p className="text-muted-foreground mt-4 ms-1 text-sm">
          See what's built with it:{" "}
          <a
            href={aisdkAgentsUrl("/", {
              medium: "landing",
              content: "hero-link",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground decoration-foreground/25 hover:decoration-foreground focus-visible:ring-ring inline-flex items-center gap-0.5 rounded-sm font-medium underline underline-offset-4 transition-[text-decoration-color] duration-150 outline-none focus-visible:ring-2"
          >
            AI SDK Agents
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </div>

      <div className="bg-card shadow-soft corner-squircle overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] dark:bg-muted">
        <div className="relative">
          <HomeHeroArtwork />
          <div className="relative pt-8 pb-5 sm:pt-10 sm:pb-6">
            <PreviewMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}
