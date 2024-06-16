import { StickerIcon } from "lucide-react"

import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/registry/default/ui/minimal-card"

import { Badge } from "../ui/badge"

export function PlugCardGrid() {
  const cards = [
    {
      title: "Full Stack Shadcn Templates",
      description:
        "Comprehensive Next.js + Supabase templates built with Tailwind CSS, Cult components, and shadcn.",
      href: "https://www.newcult.co/templates/cult-offline-travel-stash",
      img: "/newcult-landing.png",
    },
    {
      title: "Free SEO Improvement Tool",
      description:
        "Quickly evaluate your website's SEO performance for free. AI improvements + Open graph preview.",
      href: "https://www.newcult.co/templates/cult-seo",
      img: "/seo.webp",
    },
    {
      title: "Design Engineering Directory",
      description:
        "Curated bookmarks for design engineers: design tools, JavaScript resources, React.js libraries, and more.",
      href: "https://www.newcult.co/templates/cult-directory-template",
      img: "/dir.png",
    },
  ]

  return (
    <div className="relative  w-full space-y-4 p-4">
      <Badge
        variant="outline"
        className="absolute left-4 top-4 rounded-[14px] border border-black/10 text-base md:left-6"
      >
        <StickerIcon className="mr-1  fill-[#D2F583] stroke-1 text-neutral-800" />{" "}
        Additional tools
      </Badge>
      <div className="   flex flex-col justify-center  space-y-4 rounded-[34px]   p-3 pt-12">
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {cards.map((card) => (
            <a
              key={card.title}
              target="_blank"
              rel="noopener noreferrer"
              href={card.href}
            >
              <MinimalCard className="bg-transparent">
                <MinimalCardImage src={card.img} alt={card.title} />
                <MinimalCardTitle className="text-neutral-800">
                  {card.title}
                </MinimalCardTitle>
                <MinimalCardDescription className="text-neutral-900">
                  {card.description}
                </MinimalCardDescription>
              </MinimalCard>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
