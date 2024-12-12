import { IceCream } from "lucide-react"

import { cn } from "@/lib/utils"
import cultDirectoryHomeDark from "@/components/landing/assets/cult-directory-dark-home.png"
import cultLogoGPTHome from "@/components/landing/assets/cult-logo-gpt.png"
import cultSeoOg from "@/components/landing/assets/cult-seo-og.png"
import manifestBottomLeft from "@/components/landing/assets/manifest-library.png"
import runeHero from "@/components/landing/assets/rune-hero.png"
import travelStash4 from "@/components/landing/assets/travel-stash.png"
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/registry/default/ui/minimal-card"

import { Badge } from "../ui/badge"

export function TemplateGrid() {
  return (
    // <div className="dark relative flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/10 p-2 shadow-sm md:flex-row md:items-center md:gap-24 md:rounded-[40px] md:p-2">
    <div className="dark relative flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:flex-row md:items-center md:gap-24 md:rounded-[18px] md:p-2">
      <Badge
        variant="outline"
        className="absolute left-4 top-4 rounded-[14px] border border-black/10 text-base text-neutral-800 md:left-6"
      >
        <IceCream className=" fill-[#D2F583]  stroke-1 text-neutral-800" />{" "}
        Templates
      </Badge>
      <div className="   flex flex-col justify-center  space-y-4 rounded-[34px]   p-3 pt-12">
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {TEMPLATES_GRID.map((card) => (
            <a
              key={card.slug}
              target="_blank"
              rel="noopener noreferrer"
              href={card.slug}
            >
              <MinimalCard className=" relative  p-2 no-underline shadow-sm transition-colors  dark:bg-neutral-800/90 dark:hover:bg-neutral-800/80">
                <div
                  className={cn(
                    "relative mb-6 h-[190px] w-full rounded-[20px]",
                    "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
                    "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]"
                  )}
                >
                  <MinimalCardImage src={card.gif} alt={card.name} />

                  <div className="absolute inset-0 rounded-[16px]">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-[16px]",
                        "shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]",
                        "dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 rounded-[16px]",
                        "dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]"
                      )}
                    />
                  </div>
                  {card.new ? (
                    <Badge
                      variant="outline"
                      className="absolute bottom-4 right-4 rounded-[9px] border border-black/10   bg-[#D2F583]  text-sm text-neutral-900"
                    >
                      New
                    </Badge>
                  ) : null}
                </div>
                <MinimalCardTitle className="w-full text-neutral-200">
                  {card.name}
                </MinimalCardTitle>
                <MinimalCardDescription className=" text-neutral-400">
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

export const TEMPLATES_GRID = [
  {
    name: "Logo GPT",
    slug: "https://www.newcult.co/templates/logo-gpt-template",
    new: true,
    downloadUrl: "cult-logo-gpt-template.zip",
    liveUrl: "https://cult-logo.vercel.app", // replace with the actual live URL
    meta: "fullstack",
    description:
      "AI-powered logo generation platform with Dalle integration, token-based currency system, and secure image storage using Supabase.",
    features: [
      {
        name: "Dalle 2 + 3 Image Generation",
        description:
          "Generate high-quality images using the latest Dalle 2 and Dalle 3 models. Customize images to suit your brand's needs effortlessly.",
        icon: "ai",
      },

      {
        name: "Image Storage",
        description:
          "Efficiently store and manage your generated images with Supabase's integrated storage solutions, ensuring your assets are always available and secure.",
        icon: "ai",
      },
      {
        name: "Token-Based Currency",
        description:
          "Implement a token-based currency system to manage credits for generating images, offering a flexible and scalable solution for your users.",
        icon: "supabase",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind", "openai", "supabase"],
    gradient: "bg-gradient-to-b to-[#DB4EDF] from-[#F8F7F8] via-white",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajljemljODZlencyYnUzZnlsc2FtZmprbmFvNnlueDhwenp1NXdxdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AdRaGoL5xT1SdI6J5v/giphy.gif",
    images: [cultLogoGPTHome],
  },
  {
    name: "Directory",
    slug: "https://www.newcult.co/templates/cult-directory-template",
    new: true,
    downloadUrl: "cult-directory.zip",
    liveUrl: "https://nextjs.design", // replace with the actual live URL
    meta: "fullstack",
    description:
      "Automated directory platform with AI enrichment, web scraping pipeline, and built-in authentication for rapid deployment of SEO-optimized listings.",
    features: [
      {
        name: "Scraping",
        description:
          "Provide an array of urls you want to add to your directory. Run pnpm run enrich-seed. Voila - your directory is filled with as many urls as you want 🤌.",
        icon: "scrape",
      },
      {
        name: "Authentication",
        description:
          "Dead simple auth via supabase. Password reset flows. PW encryption and all. No need to pay for clerk or auth0.",
        icon: "auth",
      },
      {
        name: "AI Enrichment",
        description:
          "Not only are there batch AI enrichment jobs but you can also run AI enrichment on user submitted content. Save time and let your directory run itself.",
        icon: "ai",
      },
      {
        name: "Supabase storage",
        description:
          "Supabase wraps s3 perfectly. No need to buy a third party storage integration or subscription 😤 service. Just use supabase to store images.",
        icon: "supabase",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind", "claudeAI", "supabase", "web-scrapers"],
    gradient: "bg-gradient-to-b to-yellow-300 from-[#F8F7F8] via-white",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam4xMmVqZGVuaG05cDhxaWM2bDlwaWJ2OXVrN3E2aG54bDdjam1hZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7bzrBMHEsgPb20T3C5/giphy.gif", // replace with the actual gif URL
    images: [cultDirectoryHomeDark],
  },
  {
    name: "Travel Stash",
    slug: "https://www.newcult.co/templates/cult-offline-travel-stash",
    new: false,
    downloadUrl: "cult-offline-travel-stash.zip",
    liveUrl: "https://dub.sh/travl", // replace with the actual live URL
    meta: "fullstack",
    description:
      "Progressive web app for travel planning with offline capabilities, Claude AI integration, and real-time data synchronization across devices.",
    features: [
      {
        name: "Offline Capabilities",
        description:
          "Access and interact with the app even without an internet connection, ensuring reliability anywhere.",
        icon: "layers",
      },
      {
        name: "Real-time Sync",
        description:
          "Automatic data synchronization when online, keeping your travel plans up-to-date across all devices.",
        icon: "server",
      },
      {
        name: "PWA Support",
        description:
          "Installable on any device, providing a native app-like experience with smooth interactions.",
        icon: "shieldCheck",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind", "claudeAI", "pwa"],
    gradient: "bg-gradient-to-b to-[#2CCFFF] from-[#F8F7F8] via-white",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3YzOTc1NDgxcHhib2o1ZWhpcWVsdDRqOW9hMng3ZnA0bmxzYjZwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XJjAk4IB8Tgudo0Tqz/giphy.gif", // replace with the actual gif URL

    images: [travelStash4],
  },

  {
    name: "Landing Page",
    new: false,
    meta: "marketing",
    downloadUrl: "cult-landing-page.zip",
    liveUrl: "https://dub.sh/rune",
    gradient: "bg-gradient-to-b from-white/10 to-[#FF9150] via-[#FFD0B7]/30",
    slug: "https://www.newcult.co/templates/cult-landing-page",
    description:
      "Modern landing page template featuring Framer Motion animations, custom navigation components, and responsive design optimized for conversions.",
    features: [
      {
        name: "Animation",
        description: "A landing page that stands out.",
        icon: "paint",
      },
      {
        name: "Unique navigation",
        description: "The newcult.co nav bar animation.",
        icon: "layers",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind"],
    images: [runeHero],
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGV2MWMzY2I4eW45NThuMWJ0enpsY2tyenZkNTJtNjk4am5hb2FmMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lmXonZXi4HBJldN0rt/giphy-downsized-large.gif",
  },

  {
    name: "Cult SEO",
    slug: "https://www.newcult.co/templates/cult-seo",
    new: false,
    downloadUrl: "cult-seo.zip",
    liveUrl: "https://cleanmyseo.com",
    meta: "fullstack",
    description:
      "Comprehensive SEO analysis tool with web crawling, performance testing, and AI-powered optimization recommendations for website improvement.",
    features: [
      {
        name: "RSC Web Scraping",
        description: "Lightning fast web scraping via rsc.",
        icon: "chat",
      },
      {
        name: "Web Vitals",
        description: "Google CRUX API adapters for web vitals.",
        icon: "barChart",
      },
      {
        name: "Structured AI output",
        description: "Vercel ai sdk with claude, zod, ai object.",
        icon: "ai",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind", "claudeAI", "web-scrapers"],

    gradient: "bg-gradient-to-b from-white to-[#2770EB] via-[#FF7102]/20",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmthd283MHdqYTAzNjFzZXptbGg2MGIzY3RudzBsdDdveGsxdG9haCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w1LYqDDIpDaLKj6N5t/giphy.gif",
    // images: [cultSeoScore, cultSeoVitals, cultSeoOg, cultSeoHome],
    images: [cultSeoOg],
  },

  {
    name: "Manifest",
    slug: "https://www.newcult.co/templates/manifest",
    meta: "fullstack",
    liveUrl: "https://dub.sh/vector",
    downloadUrl: "cult-manifest-v1.2.zip",
    // gradient: "bg-gradient-to-b from-green-50 to-green-400 via-black/10",
    gradient: "bg-gradient-to-b from-white/10 to-green-400 via-green-50",
    new: false,
    description:
      "Vector embedding solution for building Perplexity-style AI applications with RAG retrieval, real-time source citations, and pgvector search functionality.",
    features: [
      {
        name: "Vector embeddings",
        description:
          "Efficient storage and retrieval of vector embeddings using supabase vector",
        icon: "ai",
      },
      {
        name: "RAG retrieval",
        description:
          "Perplexity style AI RAG retrieval with sources streamed and cited.",
        icon: "chat",
      },
      {
        name: "Supabase",
        description: "Robust database management with Supabase.",
        icon: "supabase",
      },
    ],
    type: "template",
    stack: ["nextjs", "tailwind", "supabase", "openai"],
    // images: [manifestBottomLeft, manifestCenter, manifestRight],
    images: [manifestBottomLeft],
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWVwNXVkdXM3aWM4NXM2a2s2czFhd283NHdrbWFsdm43bGdsMXp4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SM08k77xWhQtQDDluI/giphy.gif",
  },
]
