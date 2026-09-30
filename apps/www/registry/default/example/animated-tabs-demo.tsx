"use client"

import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsIndicator,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@/registry/default/ui/animated-tabs"

export default function AnimatedTabsDemo() {
  return (
    <div>
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Tabs — underline
        </h2>
        <AnimatedTabs
          className="w-full min-w-96 max-w-96"
          defaultValue="overview"
        >
          <AnimatedTabsList variant="underline">
            <AnimatedTabsTrigger value="overview">Overview</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="usage">Usage</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="billing">Billing</AnimatedTabsTrigger>
            <AnimatedTabsIndicator variant="underline" />
          </AnimatedTabsList>
          <AnimatedTabsContent value="overview">
            Project summary, health metrics, and rollouts for the current
            workspace.
          </AnimatedTabsContent>
          <AnimatedTabsContent value="usage">
            API volume, seat counts, and rate limits for the billing period in
            view.
          </AnimatedTabsContent>
          <AnimatedTabsContent value="billing">
            Invoices, payment methods, and tax details for this account and
            billing.
          </AnimatedTabsContent>
        </AnimatedTabs>

        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Tabs — pill
        </h2>
        <AnimatedTabs
          className="w-full min-w-96 max-w-96"
          defaultValue="design"
        >
          <AnimatedTabsList variant="pill">
            <AnimatedTabsTrigger value="design">Design</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="code">Code</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="preview">Preview</AnimatedTabsTrigger>
            <AnimatedTabsIndicator variant="pill" />
          </AnimatedTabsList>
          <AnimatedTabsContent value="design">
            Tokens, spacing, and motion aligned with the polished surfaces.
          </AnimatedTabsContent>
          <AnimatedTabsContent value="code">
            Implementation notes and props for each primitive.
          </AnimatedTabsContent>
          <AnimatedTabsContent value="preview">
            Live preview of the active variant.
          </AnimatedTabsContent>
        </AnimatedTabs>
      </section>
    </div>
  )
}
