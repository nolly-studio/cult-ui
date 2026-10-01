/** Pill-shaped segmented control for Radix `TabsList` / `TabsTrigger`. */
export const segmentedTabsClass = {
  list: "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center gap-0.5 rounded-full p-1",
  trigger:
    "hover:text-foreground focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-soft-sm inline-flex h-7 items-center justify-center rounded-full px-3 text-[0.8125rem] font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-150 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 dark:data-[state=active]:bg-foreground/15",
}
