"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-1.5 right-9 z-10 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-7 rounded-md px-2"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator orientation="vertical" className="mx-1.5 !h-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className="relative -mx-2 mt-4 overflow-hidden px-2 pt-2 data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0"
      >
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger className="to-code group/expand absolute inset-x-0 bottom-0 flex h-24 items-end justify-center rounded-b-2xl bg-gradient-to-b from-transparent pb-4 outline-none group-data-[state=open]/collapsible:hidden">
        <span className="bg-background text-foreground shadow-soft-sm group-hover/expand:shadow-soft group-focus-visible/expand:ring-ring inline-flex h-8 items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-shadow duration-150 group-focus-visible/expand:ring-2">
          Expand code
        </span>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
