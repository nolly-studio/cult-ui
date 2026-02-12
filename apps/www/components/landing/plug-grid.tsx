import { ArrowRight, StickerIcon } from "lucide-react"

export function PlugCardGrid() {
  const cards = [
    {
      title: "Free AI Marketing",
      description:
        "An AI Cofounder that knows your brand. Start creating marketing copy that converts.",
      href: "https://www.newcopy.ai",
    },
    {
      title: "Free SEO Improvement Tool",
      description:
        "Quickly evaluate your website's SEO performance for free. Open graph preview included.",
      href: "https://cleanmyseo.com",
    },
    {
      title: "Full Stack Shadcn Templates",
      description:
        "Comprehensive Next.js + Supabase templates built with Tailwind CSS, Cult components, and shadcn.",
      href: "https://www.newcult.co",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5">
            <StickerIcon className="size-4 text-muted-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Additional Goods
            </span>
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.title}
            target="_blank"
            rel="noopener noreferrer"
            href={card.href}
            className="group relative flex flex-col border border-border bg-background p-4 transition-all duration-150 hover:border-foreground/10 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Corner accents */}
            <div className="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
            <div className="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
            <div className="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
            <div className="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

            {/* Title */}
            <h3 className="mb-2 font-medium text-sm leading-tight tracking-tight">
              {card.title}
            </h3>

            {/* Description */}
            <p className="mb-4 flex-1 font-light text-muted-foreground text-xs leading-relaxed">
              {card.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-end border-border border-t pt-3">
              <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
                Visit
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
