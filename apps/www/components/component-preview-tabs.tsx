"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border md:-mx-1"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex overflow-y-auto min-h-[650px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start "
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-auto data-[active=true]:block **:[figure]:!m-0"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
