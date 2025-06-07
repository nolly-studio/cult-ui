"use client"

import * as React from "react"
import { Index } from "@/__registry__"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton, CopyWithClassNames } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { styles } from "@/registry/styles"

import { OpenInV0Button } from "./open-in-v0-button"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
}

export function ComponentPreview({
  name,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const [tab, setTab] = React.useState("preview")
  const index = styles.findIndex((style) => style.name === config.style)

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  const codeString = React.useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [Button] = React.Children.toArray(
        Code.props.children
      ) as React.ReactElement[]
      return Button?.props?.value || Button?.props?.__rawString__ || null
    }
  }, [Code])

  return (
    <div
      className={cn("group relative mb-12 mt-4 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <TabsList className="w-fit justify-start gap-1 rounded-lg bg-muted/50 p-1">
            <TabsTrigger
              value="preview"
              className="relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Code
            </TabsTrigger>
          </TabsList>
          <div className="flex  items-center gap-2">
            <OpenInV0Button name={name.replace("-demo", "")} />
            {/* <InstallationCli value={name.replace("-demo", "")} /> */}
            <CopyButton
              value={codeString}
              variant="outline"
              className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:size-3.5"
            />
          </div>
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border p-1 md:-mx-4"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <ThemeWrapper defaultTheme="zinc">
            <div
              data-align={align}
              // className="preview flex h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
              className={cn(
                "preview flex min-h-[350px] w-full justify-center bg-white p-3 md:p-10 dark:bg-neutral-950",
                {
                  "items-center": align === "center",
                  "items-start": align === "start",
                  "items-end": align === "end",
                }
              )}
            >
              <React.Suspense
                fallback={
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ThemeWrapper>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="**:[figure]:!m-0 **:[pre]:h-[450px] absolute inset-0 hidden overflow-hidden data-[active=true]:block"
        >
          {Code}
        </div>
      </div>
    </div>
  )
}
