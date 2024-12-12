import { StickerIcon } from "lucide-react"

import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardTitle,
} from "@/registry/default/ui/minimal-card"

import { Badge } from "../ui/badge"

export function PlugCardGrid() {
  const cards = [
    {
      title: "Free AI Marketing ",
      description:
        "An AI Cofounder that knows your brand. Start creating marketing copy that converts.",
      href: "https://www.newcopy.ai",
      img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXFpaG1vaG83YTgxdTdxc2ZreHNtaGphYjF4aXd6c3JvbXNodW9ubSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7bzrBMHEsgPb20T3C5/giphy.gif",
    },
    {
      title: "Free SEO Improvement Tool",
      description:
        "Quickly evaluate your website's SEO performance for free. AI improvements + Open graph preview.",
      href: "https://cleanmyseo.com",
      img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FoNGR5OXpvMnZ2a3NpNWpqYnlnOG82aWYzMnJhY256ajVuOWhpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w1LYqDDIpDaLKj6N5t/giphy.gif",
    },
    {
      title: "Full Stack Shadcn Templates",
      description:
        "Comprehensive Next.js + Supabase templates built with Tailwind CSS, Cult components, and shadcn.",
      href: "https://www.newcult.co",
      img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3p0Nm1xcnE2eDNkOTJ6NndxaTJlejFodGozZ3RpcXc4MW80OHkwYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AdRaGoL5xT1SdI6J5v/giphy.gif",
    },
  ]

  return (
    <div className="relative  w-full space-y-4 p-2">
      <Badge
        variant="outline"
        className="absolute left-4 top-4 rounded-[14px] border border-black/10 text-base md:left-6"
      >
        <StickerIcon className="mr-1  fill-[#A3C0E0] stroke-1 text-neutral-800" />{" "}
        Additional goods
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
                <MinimalCardTitle className="text-base text-neutral-800">
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
