import cultProComponentDemos from "@/lib/cult-pro-component-demos-landing.json"

import { CatalogCard, CatalogMetaLabel } from "./catalog-card"
import { ExpandableCatalogTray } from "./expandable-catalog-tray"
import { MarketingSection, SectionHeader } from "./marketing-section"

export const NEW_COMPONENT_COUNT = 58

const renamedSlugs: Record<string, string> = { icons: "file-icons" }
const slugsWithoutDocs = new Set(["illustration-form", "illustration-icon-map"])

const demos = cultProComponentDemos
  .filter(
    (demo, index, all) =>
      !slugsWithoutDocs.has(demo.primarySlug) &&
      all.findIndex((other) => other.primarySlug === demo.primarySlug) === index
  )
  .map((demo) => ({
    ...demo,
    slug: renamedSlugs[demo.primarySlug] ?? demo.primarySlug,
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export function FreeComponentsSection() {
  return (
    <MarketingSection aria-labelledby="free-components-title">
      <SectionHeader
        id="free-components-title"
        kicker="Just added"
        title={`${NEW_COMPONENT_COUNT} new components`}
        lead="Illustrations, device mockups, cards and more."
      >
        Same docs, same one-line install as the rest of Cult UI. MIT licensed.
      </SectionHeader>
      <ExpandableCatalogTray
        noun="components"
        initialCount={6}
        items={demos.map((demo) => (
          <CatalogCard
            key={demo.demoName}
            href={`/docs/components/${demo.slug}`}
            title={demo.title}
            image={{
              light: `/cult-pro-component-images/${demo.demoName}-light.png`,
              dark: `/cult-pro-component-images/${demo.demoName}-dark.png`,
            }}
            meta={<CatalogMetaLabel>Component</CatalogMetaLabel>}
          />
        ))}
      />
    </MarketingSection>
  )
}
