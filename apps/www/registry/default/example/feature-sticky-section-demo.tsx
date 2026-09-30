"use client"

import { cn } from "@/lib/utils"
import { StickySection } from "@/registry/default/ui/feature-sticky-section"

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: "This is the first section. Scroll or click the list to switch sections.",
  },
  {
    id: "details",
    title: "Details",
    body: "This is the second section. The sticky list highlights the active section as you scroll.",
  },
  {
    id: "summary",
    title: "Summary",
    body: "This is the third section. Click any list item to scroll to its panel.",
  },
]

function FeatureStickySectionDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <StickySection.Root>
        <div className="flex gap-8">
          <aside className="w-44 shrink-0">
            <StickySection.List asChild>
              <ul className="sticky top-6 flex flex-col gap-1">
                {sections.map((section, i) => (
                  <StickySection.Item asChild index={i} key={section.id}>
                    <li>
                      <StickySection.Trigger
                        index={i}
                        className={cn(
                          "w-full rounded-md border-none bg-transparent px-3 py-2 text-left text-sm transition-colors",
                          "hover:bg-muted",
                          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        )}
                      >
                        {section.title}
                      </StickySection.Trigger>
                    </li>
                  </StickySection.Item>
                ))}
              </ul>
            </StickySection.List>
          </aside>
          <StickySection.Content asChild>
            <div className="min-w-0 flex-1 space-y-24">
              {sections.map((section, i) => (
                <StickySection.Panel
                  index={i}
                  key={section.id}
                  className="min-h-[50vh] rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="mb-2 font-semibold text-lg">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground">{section.body}</p>
                </StickySection.Panel>
              ))}
            </div>
          </StickySection.Content>
        </div>
      </StickySection.Root>
    </div>
  )
}

export default FeatureStickySectionDemo
