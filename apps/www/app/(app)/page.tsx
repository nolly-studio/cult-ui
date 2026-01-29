import { Hero } from "@/components/landing/hero"
import { MiniBlocksGrid } from "@/components/landing/blocks-grid"
import { LatestComponentVertical } from "@/components/landing/featured-component"
import { PlugCardGrid } from "@/components/landing/plug-grid"
import { TemplateGrid } from "@/components/landing/template-grid"

export default function IndexPage() {
  return (
    <div className="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
      {/* New Hero Section */}
      <Hero />

      {/* Content Sections */}
      <div className="container relative">
        <section className="w-full space-y-4 md:block">
          <div className="mx-auto w-full max-w-4xl rounded-3xl shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)] bg-white">
            <LatestComponentVertical />
          </div>

          <div className="mx-auto max-w-4xl">
            <MiniBlocksGrid />
          </div>

          <div className="mx-auto max-w-4xl">
            <TemplateGrid />
          </div>

          <div className="mx-auto max-w-4xl">
            <PlugCardGrid />
          </div>
        </section>
      </div>
    </div>
  )
}
IndexPage.theme = "light"
