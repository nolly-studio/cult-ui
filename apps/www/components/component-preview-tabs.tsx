"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { segmentedTabsClass } from "@/components/segmented-tabs"

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
      data-slot="component-preview"
      className={cn("group relative mt-4 mb-12 flex flex-col gap-3", className)}
      {...props}
    >
      {!hideCode && (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className={segmentedTabsClass.list}>
            <TabsTrigger value="preview" className={segmentedTabsClass.trigger}>
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className={segmentedTabsClass.trigger}>
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div
        data-tab={tab}
        className="bg-background shadow-soft corner-squircle relative overflow-hidden rounded-[1.5rem] data-[tab=code]:bg-code"
      >
        {tab === "preview" ? (
          <div data-slot="preview">
            <div
              data-align={align}
              className="preview flex min-h-[650px] w-full justify-center overflow-y-auto data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start p-4 md:p-10"
            >
              {component}
            </div>
          </div>
        ) : (
          <div
            data-slot="code"
            className="overflow-auto **:[figure]:!m-0 **:[figure]:!rounded-none **:[figure]:!shadow-none"
          >
            {source}
          </div>
        )}
      </div>
    </div>
  )
}
