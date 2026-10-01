import Link from "next/link"

import { pillCtaClass } from "@/components/pill-cta"
import ShiftCardDemo from "@/registry/default/example/shift-card-demo"

import { MarketingSection, SectionHeader } from "./marketing-section"

export function LiveDemoSection() {
  return (
    <MarketingSection aria-labelledby="live-demo-title">
      <SectionHeader
        id="live-demo-title"
        kicker="Try one"
        title="Shift card"
        lead="A card that reveals more detail on hover."
        action={
          <Link
            href="/docs/components/shift-card"
            className={pillCtaClass.outline}
          >
            Open the shift card docs
          </Link>
        }
      >
        Hover or focus it. Every component on this page is live in its docs.
      </SectionHeader>
      <div className="bg-card shadow-soft corner-squircle overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] dark:bg-muted">
        <div className="flex justify-center px-4 py-10 sm:py-14">
          <div className="w-full max-w-xs sm:max-w-none sm:w-auto">
            <ShiftCardDemo />
          </div>
        </div>
      </div>
    </MarketingSection>
  )
}
