import type * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { findNeighbour } from "fumadocs-core/server"

import { siteConfig } from "@/config/site"
import { getDocsCategory, getOgImageUrl } from "@/lib/docs"
import { getMarkdownUrl, getPageFaq, getPageLastModified } from "@/lib/llm"
import { source } from "@/lib/source"
import { absoluteUrl, cn } from "@/lib/utils"
import { DocsCopyPage } from "@/components/docs-copy-page"
import {
  AUTHOR_ID,
  JsonLd,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/components/json-ld"
import { DocsPromoCard } from "@/components/docs-promo-card"
import { DocsTableOfContents } from "@/components/docs-toc"
import { PixelKicker, SectionTitle } from "@/components/section-heading"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const doc = page.data

  if (!doc.title || !doc.description) {
    notFound()
  }

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: absoluteUrl(page.url),
      types: { "text/markdown": getMarkdownUrl(page.url) },
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: absoluteUrl(getOgImageUrl(page.url)),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [absoluteUrl(getOgImageUrl(page.url))],
      creator: "@nolansym",
    },
  }
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body
  const neighbours = await findNeighbour(source.pageTree, page.url)

  const category = getDocsCategory(page.url)
  const jsonLd = await getDocJsonLd(page, category)
  const lastModified = getPageLastModified(page)

  return (
    <div data-slot="docs" className="flex items-stretch xl:w-full">
      <JsonLd data={jsonLd} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <article className="text-foreground/80 mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col px-3 py-10 text-[0.9375rem] leading-relaxed md:px-0 lg:py-14 xl:max-w-5xl">
          <header className="mb-10 flex flex-col gap-4">
            <div className="flex min-h-8 items-center justify-between gap-4">
              {category ? <PixelKicker>{category}</PixelKicker> : <span />}
              <div className="bg-background/85 border-border/80 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-1.5 border-t px-4 py-3 backdrop-blur-md sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                <DocsCopyPage url={absoluteUrl(page.url)} />
                {neighbours.previous && (
                  <Link
                    href={neighbours.previous.url}
                    className={cn(iconPillClass, "ml-auto")}
                  >
                    <IconArrowLeft aria-hidden="true" className="size-4" />
                    <span className="sr-only">
                      Previous: {neighbours.previous.name}
                    </span>
                  </Link>
                )}
                {neighbours.next && (
                  <Link href={neighbours.next.url} className={iconPillClass}>
                    <IconArrowRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">
                      Next: {neighbours.next.name}
                    </span>
                  </Link>
                )}
              </div>
            </div>
            <SectionTitle
              as="h1"
              className="text-foreground scroll-m-28 text-3xl md:text-4xl lg:text-5xl"
            >
              {doc.title}
            </SectionTitle>
            {doc.description && (
              <p className="text-foreground/55 max-w-2xl text-lg leading-snug text-pretty">
                {doc.description}
              </p>
            )}
            {lastModified ? (
              <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                Updated{" "}
                <time dateTime={lastModified.toISOString()}>
                  {lastModifiedFormat.format(lastModified)}
                </time>
              </p>
            ) : null}
          </header>
          <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
            <MDX components={mdxComponents} />
          </div>
          <DocsPager previous={neighbours.previous} next={neighbours.next} />
        </article>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height))] w-72 flex-col gap-8 overflow-hidden overscroll-none px-6 pt-14 pb-8 xl:flex">
        {/* @ts-expect-error - revisit fumadocs types. */}
        {doc.toc?.length ? (
          <div className="no-scrollbar min-h-0 shrink overflow-y-auto">
            {/* @ts-expect-error - revisit fumadocs types. */}
            <DocsTableOfContents toc={doc.toc} />
          </div>
        ) : null}
        <DocsPromoCard className="shrink-0" />
      </div>
    </div>
  )
}

const lastModifiedFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

const iconPillClass =
  "bg-background text-muted-foreground shadow-soft-sm hover:text-foreground hover:shadow-soft focus-visible:ring-ring inline-flex size-8 items-center justify-center rounded-full transition-[box-shadow,color] duration-150 outline-none focus-visible:ring-2"

type Neighbour = { name: React.ReactNode; url: string } | undefined

function DocsPager({
  previous,
  next,
}: {
  previous: Neighbour
  next: Neighbour
}) {
  if (!previous && !next) return null
  return (
    <nav
      aria-label="Pagination"
      className="border-border/80 mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <PagerLink href={previous.url} label="Previous" name={previous.name} />
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next ? (
        <PagerLink href={next.url} label="Next" name={next.name} align="end" />
      ) : null}
    </nav>
  )
}

function PagerLink({
  href,
  label,
  name,
  align = "start",
}: {
  href: string
  label: string
  name: React.ReactNode
  align?: "start" | "end"
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group bg-card shadow-soft hover:shadow-soft-md focus-visible:ring-ring flex flex-col gap-1 rounded-2xl p-4 transition-shadow duration-150 outline-none focus-visible:ring-2 dark:bg-muted",
        align === "end" && "items-end text-right"
      )}
    >
      <span className="text-muted-foreground flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase">
        {align === "start" ? (
          <IconArrowLeft aria-hidden="true" className="size-3" />
        ) : null}
        {label}
        {align === "end" ? (
          <IconArrowRight aria-hidden="true" className="size-3" />
        ) : null}
      </span>
      <span className="text-foreground text-sm font-medium tracking-tight">
        {name}
      </span>
    </Link>
  )
}

async function getDocJsonLd(
  page: NonNullable<ReturnType<typeof source.getPage>>,
  category: string | null
) {
  const url = absoluteUrl(page.url)
  const lastModified = getPageLastModified(page)
  const isComponent = page.url.startsWith("/docs/components/")

  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: page.data.title,
    description: page.data.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(getOgImageUrl(page.url)),
    inLanguage: "en",
    ...(lastModified ? { dateModified: lastModified.toISOString() } : {}),
    ...(category ? { articleSection: category } : {}),
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(isComponent
      ? {
          about: {
            "@type": "SoftwareSourceCode",
            name: page.data.title,
            codeRepository: siteConfig.links.github,
            programmingLanguage: ["TypeScript", "React"],
            runtimePlatform: "Next.js",
            license: `${siteConfig.links.github}/blob/main/LICENSE.md`,
          },
        }
      : {}),
  }

  const breadcrumbs = [
    { name: "Cult UI", url: siteConfig.url },
    { name: "Docs", url: absoluteUrl("/docs") },
    ...(page.url === "/docs" ? [] : [{ name: page.data.title, url }]),
  ]

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }

  const faq = await getPageFaq(page)
  const faqPage = faq.length
    ? [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ]
    : []

  return [article, breadcrumbList, ...faqPage]
}
