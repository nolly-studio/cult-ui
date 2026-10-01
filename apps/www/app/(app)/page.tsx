import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { GitHubLink } from "@/components/github-link"
import { AiSdkAgentsSection } from "@/components/landing/ai-sdk-agents-patterns"
import { BackgroundImageTexture } from "@/components/landing/bg-image-texture"
import { Footer } from "@/components/landing/footer"
import { FreeComponentsSection } from "@/components/landing/free-components-section"
import { HomeHero } from "@/components/landing/home-hero"
import { LiveDemoSection } from "@/components/landing/live-demo-section"
import { SupportSection } from "@/components/landing/support-section"
import { MarketingHeader } from "@/components/marketing-header"
import { ModeToggle } from "@/components/mode-toggle"
import { ui } from "@/registry/ui"

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
}

export default function IndexPage() {
  return (
    <div className="isolate min-h-screen overflow-x-clip">
      <MarketingHeader
        githubLink={<GitHubLink />}
        actions={<ModeToggle />}
      />
      <BackgroundImageTexture
        variant="debut-light"
        opacity={0.25}
        className="bg-canvas -mt-16 pt-16"
      >
        <HomeHero count={ui.length} />
        <FreeComponentsSection />
        <AiSdkAgentsSection />
        <LiveDemoSection />
        <SupportSection />
        <Footer />
      </BackgroundImageTexture>
    </div>
  )
}
