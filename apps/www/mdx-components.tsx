import * as React from "react"
import NextImage from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Callout, calloutClass } from "@/components/callout"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { CodeTabs } from "@/components/code-tabs"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { ComponentsList } from "@/components/components-list"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"
import { segmentedTabsClass } from "@/components/segmented-tabs"

const proseLinkClass =
  "text-foreground decoration-foreground/25 hover:decoration-foreground font-medium underline underline-offset-4 transition-[text-decoration-color] duration-150"

export const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
    return (
      <h2
        id={props.children
          ?.toString()
          .replace(/ /g, "-")
          .replace(/'/g, "")
          .replace(/\?/g, "")
          .toLowerCase()}
        className={cn(
          "font-heading text-foreground border-border/80 mt-14 scroll-m-28 border-t pt-8 text-2xl leading-tight font-[450] tracking-[-0.04em] first:mt-0 first:border-t-0 first:pt-0 [&+p]:!mt-3 *:[code]:text-xl",
          className
        )}
        {...props}
      />
    )
  },
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading text-foreground mt-10 scroll-m-28 text-lg font-medium tracking-tight [&+p]:!mt-2 *:[code]:text-base",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "font-heading text-foreground mt-8 scroll-m-28 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-8 scroll-m-28 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-28 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a className={cn(proseLinkClass, className)} {...props} />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn(
        "leading-relaxed text-pretty [&:not(:first-child)]:mt-5",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn(
        "marker:text-muted-foreground/60 my-5 ml-5 list-disc",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className={cn(
        "marker:text-muted-foreground my-5 ml-5 list-decimal marker:font-mono marker:text-xs",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-1.5 pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "border-border text-foreground/70 mt-6 border-l-2 pl-4",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("shadow-soft rounded-2xl", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.ComponentProps<"hr">) => (
    <hr className={cn("border-border/80 my-10", className)} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="bg-background shadow-soft my-6 w-full overflow-x-auto rounded-2xl">
      <table
        className={cn(
          "relative w-full border-none text-[0.8125rem]",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("border-border/80 m-0 border-b last:border-b-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "bg-muted/40 text-muted-foreground px-4 py-2.5 text-left font-mono text-[10px] font-normal tracking-wider whitespace-nowrap uppercase [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2.5 text-left align-top [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=code-block-command]]:overflow-visible has-[[data-slot=code-block-command]]:p-0 has-[[data-slot=tabs]]:p-0",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    )
  },
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
    return (
      <figure
        className={cn(
          "group relative has-[[data-slot=code-block-command]]:overflow-visible has-[[data-slot=code-block-command]]:bg-transparent has-[[data-slot=code-block-command]]:shadow-none",
          className
        )}
        {...props}
      />
    )
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null

    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    )
  },
  code: ({
    className,
    __raw__,
    __src__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string
    __src__?: string
    __npm__?: string
    __yarn__?: string
    __pnpm__?: string
    __bun__?: string
  }) => {
    // Inline Code.
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "bg-muted text-foreground relative rounded-md px-[0.3rem] py-[0.15rem] font-mono text-[0.8125em] break-words outline-none",
            className
          )}
          {...props}
        />
      )
    }

    // npm command.
    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__
    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __npm__={__npm__}
          __yarn__={__yarn__}
          __pnpm__={__pnpm__}
          __bun__={__bun__}
        />
      )
    }

    // Default codeblock.
    return (
      <>
        {__raw__ && (
          <div className="absolute top-2 right-2 z-10 opacity-70 transition-opacity duration-150 group-hover:opacity-100">
            <CopyButton
              value={__raw__}
              src={__src__}
              className="hover:opacity-100"
            />
          </div>
        )}
        <code {...props} />
      </>
    )
  },
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading text-foreground mt-8 scroll-m-32 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="steps border-border/80 mb-12 ml-3.5 border-l pl-8 [counter-reset:step] *:[h3]:first:!mt-0"
      {...props}
    />
  ),
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<typeof NextImage>) => (
    <NextImage
      className={cn("shadow-soft mt-6 rounded-2xl", className)}
      src={src}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => {
    return <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  },
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList className={cn(segmentedTabsClass.list, className)} {...props} />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(segmentedTabsClass.trigger, className)}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative mt-4 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6",
        className
      )}
      {...props}
    />
  ),
  Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn(className)} {...props} />
  ),
  Button,
  Callout,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert: ({ className, ...props }: React.ComponentProps<typeof Alert>) => (
    <Alert className={cn(calloutClass, className)} {...props} />
  ),
  AlertTitle,
  AlertDescription,
  AspectRatio,
  CodeTabs,
  ComponentPreview,
  ComponentSource,
  CodeCollapsibleWrapper,
  ComponentsList,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link className={cn(proseLinkClass, className)} {...props} />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "bg-card text-foreground shadow-soft hover:shadow-soft-md focus-visible:ring-ring flex w-full flex-col items-center rounded-2xl p-6 transition-shadow duration-150 outline-none focus-visible:ring-2 sm:p-10 dark:bg-muted",
        className
      )}
      {...props}
    />
  ),
  CitationList: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("list-none pl-0", className)} {...props} />
  ),
  CitationItem: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li
      className={cn("text-muted-foreground flex items-start", className)}
      {...props}
    />
  ),
  CitationLink: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a className={cn("ml-1 hover:underline", className)} {...props} />
  ),
  Citations: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "border-border my-6 rounded-md border-l-4 bg-transparent p-4",
        className
      )}
      {...props}
    />
  ),
}
