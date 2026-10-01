"use client"

import {
  HaloTabs,
  HaloTabsContent,
  HaloTabsIndicator,
  HaloTabsList,
  HaloTabsTrigger,
} from "@/registry/default/ui/halo-tabs"

export default function HaloTabsDemo() {
  return (
    <div>
      <section className="space-y-3">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Tabs — underline
        </h2>
        <HaloTabs className="w-full min-w-96 max-w-96" defaultValue="overview">
          <HaloTabsList variant="underline">
            <HaloTabsTrigger value="overview">Overview</HaloTabsTrigger>
            <HaloTabsTrigger value="usage">Usage</HaloTabsTrigger>
            <HaloTabsTrigger value="billing">Billing</HaloTabsTrigger>
            <HaloTabsIndicator variant="underline" />
          </HaloTabsList>
          <HaloTabsContent value="overview">
            Project summary, health metrics, and rollouts for the current
            workspace.
          </HaloTabsContent>
          <HaloTabsContent value="usage">
            API volume, seat counts, and rate limits for the billing period in
            view.
          </HaloTabsContent>
          <HaloTabsContent value="billing">
            Invoices, payment methods, and tax details for this account and
            billing.
          </HaloTabsContent>
        </HaloTabs>

        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Tabs — pill
        </h2>
        <HaloTabs className="w-full min-w-96 max-w-96" defaultValue="design">
          <HaloTabsList variant="pill">
            <HaloTabsTrigger value="design">Design</HaloTabsTrigger>
            <HaloTabsTrigger value="code">Code</HaloTabsTrigger>
            <HaloTabsTrigger value="preview">Preview</HaloTabsTrigger>
            <HaloTabsIndicator variant="pill" />
          </HaloTabsList>
          <HaloTabsContent value="design">
            Tokens, spacing, and motion aligned with the polished surfaces.
          </HaloTabsContent>
          <HaloTabsContent value="code">
            Implementation notes and props for each primitive.
          </HaloTabsContent>
          <HaloTabsContent value="preview">
            Live preview of the active variant.
          </HaloTabsContent>
        </HaloTabs>
      </section>
    </div>
  )
}
