"use client"

import type * as React from "react"
import type { SVGProps } from "react"
import { useId } from "react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { aisdkAgentsUrl } from "@/lib/aisdkagents"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import { pillCtaClass } from "@/components/pill-cta"

import {
  CatalogBadge,
  CatalogCard,
  CatalogMetaLabel,
  CatalogTray,
  ComplexityBadge,
  type Complexity,
} from "./catalog-card"
import { MarketingSection, SectionHeader } from "./marketing-section"

// ---------------------------------------------------------------------------
// Inline SVG Icon Components (only the icons used by the 6 featured blocks)
// ---------------------------------------------------------------------------

const OpenAIIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="dark:fill-white"
    height="1em"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 260"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>OpenAI</title>
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
  </svg>
)

function UpstashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      height="341"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 341"
      width="256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Upstash</title>
      <path
        d="M0 298.417c56.554 56.553 148.247 56.553 204.801 0 56.554-56.554 56.554-148.247 0-204.801l-25.6 25.6c42.415 42.416 42.415 111.185 0 153.6-42.416 42.416-111.185 42.416-153.601 0L0 298.416Z"
        fill="#00C98D"
      />
      <path
        d="M51.2 247.216c28.277 28.277 74.123 28.277 102.4 0 28.277-28.276 28.277-74.123 0-102.4l-25.6 25.6c14.14 14.138 14.14 37.061 0 51.2-14.138 14.139-37.061 14.139-51.2 0l-25.6 25.6ZM256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
        fill="#00C98D"
      />
      <path
        d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
        fill="#00C98D"
      />
      <path
        d="M256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
        fill="#FFF"
        fillOpacity=".4"
      />
      <path
        d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
        fill="#FFF"
        fillOpacity=".4"
      />
    </svg>
  )
}

function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  const id = useId()
  const maskId = `${id}-mask`
  const grad0Id = `${id}-grad0`
  const grad1Id = `${id}-grad1`

  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 180 180"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Next.js</title>
      <mask
        height={180}
        id={maskId}
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width={180}
        x={0}
        y={0}
      >
        <circle cx={90} cy={90} fill="black" r={90} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle
          cx={90}
          cy={90}
          fill="black"
          r={87}
          stroke="white"
          strokeWidth={6}
        />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill={`url(#${grad0Id})`}
        />
        <rect fill={`url(#${grad1Id})`} height={72} width={12} x={115} y={54} />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={grad0Id}
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={grad1Id}
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function GeminiIcon(props: SVGProps<SVGSVGElement>) {
  const id = useId()
  const primaryId = `${id}-primary`
  const secondaryId = `${id}-secondary`

  return (
    <svg
      height="1em"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 258"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Gemini</title>
      <defs>
        <radialGradient
          cx="78.302%"
          cy="55.52%"
          fx="78.302%"
          fy="55.52%"
          gradientTransform="scale(.99947 1) rotate(78.858 .783 .555)"
          id={primaryId}
          r="78.115%"
        >
          <stop offset="0%" stopColor="#1BA1E3" />
          <stop offset=".01%" stopColor="#1BA1E3" />
          <stop offset="30.022%" stopColor="#5489D6" />
          <stop offset="54.552%" stopColor="#9B72CB" />
          <stop offset="82.537%" stopColor="#D96570" />
          <stop offset="100%" stopColor="#F49C46" />
        </radialGradient>
        <radialGradient
          cx="-3.409%"
          cy="-54.219%"
          fx="-3.409%"
          fy="-54.219%"
          gradientTransform="scale(.99946 1) rotate(78.858 -.034 -.542)"
          id={secondaryId}
          r="169.363%"
        >
          <stop offset="0%" stopColor="#1BA1E3" />
          <stop offset=".01%" stopColor="#1BA1E3" />
          <stop offset="30.022%" stopColor="#5489D6" />
          <stop offset="54.552%" stopColor="#9B72CB" />
          <stop offset="82.537%" stopColor="#D96570" />
          <stop offset="100%" stopColor="#F49C46" />
        </radialGradient>
      </defs>
      <path
        d="m122.062 172.77-10.27 23.52c-3.947 9.042-16.459 9.042-20.406 0l-10.27-23.52c-9.14-20.933-25.59-37.595-46.108-46.703L6.74 113.52c-8.987-3.99-8.987-17.064 0-21.053l27.385-12.156C55.172 70.97 71.917 53.69 80.9 32.043L91.303 6.977c3.86-9.303 16.712-9.303 20.573 0l10.403 25.066c8.983 21.646 25.728 38.926 46.775 48.268l27.384 12.156c8.987 3.99 8.987 17.063 0 21.053l-28.267 12.547c-20.52 9.108-36.97 25.77-46.109 46.703Z"
        fill={`url(#${primaryId})`}
      />
      <path
        d="m217.5 246.937-2.888 6.62c-2.114 4.845-8.824 4.845-10.937 0l-2.889-6.62c-5.148-11.803-14.42-21.2-25.992-26.34l-8.898-3.954c-4.811-2.137-4.811-9.131 0-11.269l8.4-3.733c11.87-5.273 21.308-15.017 26.368-27.22l2.966-7.154c2.067-4.985 8.96-4.985 11.027 0l2.966 7.153c5.06 12.204 14.499 21.948 26.368 27.221l8.4 3.733c4.812 2.138 4.812 9.132 0 11.27l-8.898 3.953c-11.571 5.14-20.844 14.537-25.992 26.34Z"
        fill={`url(#${secondaryId})`}
      />
    </svg>
  )
}

function AISDKIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="dark:fill-white"
      color="currentcolor"
      height={16}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={16}
      {...props}
    >
      <title>AISDK</title>
      <path d="M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.478 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z" />
    </svg>
  )
}

const FirecrawlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Firecrawl</title>
    <path
      d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
      fill="#262626"
    />
  </svg>
)

// ---------------------------------------------------------------------------
// Dependency icon map (scoped to only the icons matched by featured blocks)
// ---------------------------------------------------------------------------

const DEPENDENCY_ICONS = {
  openai: {
    name: "OpenAI",
    icon: OpenAIIcon,
    match: ["openai", "@openai"],
  },
  gemini: {
    name: "Gemini",
    icon: GeminiIcon,
    match: ["google", "gemini"],
  },
  ai: {
    name: "AISDK",
    icon: AISDKIcon,
    match: [
      "@ai-sdk/openai",
      "@ai-sdk/react",
      "@ai-sdk/anthropic",
      "@ai-sdk/google",
      "ai-sdk-tools",
    ],
  },
  upstash: {
    name: "Upstash",
    icon: UpstashIcon,
    match: ["@upstash", "upstash"],
  },
  firecrawl: {
    name: "Firecrawl",
    icon: FirecrawlIcon,
    match: ["firecrawl", "firecrawl-js"],
  },
  nextjs: {
    name: "Next.js",
    icon: NextjsIcon,
    match: ["next", "@types/next"],
  },
} as const

// ---------------------------------------------------------------------------
// Hardcoded block image URL helper
// ---------------------------------------------------------------------------

function getBlockImageUrl(
  blockName: string,
  theme: "light" | "dark" = "light"
): string {
  return `/migrate/blocks/${blockName}-${theme}.png`
}

// ---------------------------------------------------------------------------
// Hardcoded featured block data
// ---------------------------------------------------------------------------

const TOTAL_PATTERN_COUNT = 100

type FeaturedBlock = {
  name: string
  title: string
  description: string
  href: string
  tags: string[]
  complexity: string
  dependencies: string[]
  externalServices: string[]
  aiSdkApis: string[]
}

const FEATURED_BLOCKS: FeaturedBlock[] = [
  {
    name: "example-agent-competitor",
    title: "Competitor Research Agent",
    description:
      "Enter a competitor URL to get comprehensive competitive intelligence. Uses Firecrawl Map + Parallel Scrape for fast extraction (~3-5s). Analyzes positioning, pricing, features, tech stack, and generates sales battle cards.",
    href: "/patterns/example-agent-competitor",
    tags: [
      "ai",
      "agents",
      "competitor-analysis",
      "competitive-intelligence",
      "sales",
      "battlecard",
      "firecrawl",
      "ai-sdk",
      "tool-loop",
      "pricing",
      "features",
      "tech-stack",
    ],
    complexity: "intermediate",
    dependencies: [
      "@ai-sdk/openai",
      "@ai-sdk/react",
      "@mendable/firecrawl-js",
      "@upstash/ratelimit",
      "@upstash/redis",
      "ai",
      "lucide-react",
      "next",
      "react",
      "sonner",
      "zod",
    ],
    externalServices: ["openai", "firecrawl", "upstash"],
    aiSdkApis: [
      "useChat",
      "gateway",
      "ToolLoopAgent",
      "tool(",
      "hasToolCall",
      "stepCountIs",
      "createAgentUIStreamResponse",
      "InferAgentUIMessage",
      "DefaultChatTransport",
      "UIMessage",
    ],
  },
  {
    name: "example-agent-data-analysis",
    title: "Data Analysis Agent",
    description:
      "Upload CSV or JSON data and get AI-powered analysis with interactive visualizations. Detect patterns, correlations, outliers, and generate insights with confidence scores. Export comprehensive reports.",
    href: "/patterns/example-agent-data-analysis",
    tags: [
      "ai",
      "agents",
      "data-analysis",
      "visualization",
      "charts",
      "csv",
      "json",
      "statistics",
      "ai-sdk",
      "tool-loop",
      "recharts",
      "insights",
    ],
    complexity: "intermediate",
    dependencies: [
      "@ai-sdk/react",
      "@upstash/ratelimit",
      "@upstash/redis",
      "ai",
      "lucide-react",
      "next",
      "react",
      "recharts",
      "sonner",
      "zod",
    ],
    externalServices: ["openai", "upstash"],
    aiSdkApis: [
      "useChat",
      "gateway",
      "ToolLoopAgent",
      "tool(",
      "hasToolCall",
      "stepCountIs",
      "createAgentUIStreamResponse",
      "InferAgentUIMessage",
      "DefaultChatTransport",
      "UIMessage",
    ],
  },
  {
    name: "example-agent-a11y-audit",
    title: "Accessibility Audit Agent",
    description:
      "Audit any website for WCAG 2.1 accessibility compliance using Firecrawl, then use AI tools to analyze issues by severity, check color contrast, validate heading structure, generate alt text, and create prioritized remediation plans with visual tool outputs.",
    href: "/patterns/example-agent-a11y-audit",
    tags: [
      "ai",
      "agents",
      "accessibility",
      "wcag",
      "a11y",
      "audit",
      "firecrawl",
      "ai-sdk",
      "tool-loop",
      "color-contrast",
      "remediation",
      "alt-text",
      "heading-structure",
    ],
    complexity: "intermediate",
    dependencies: [
      "@ai-sdk/react",
      "@mendable/firecrawl-js",
      "@upstash/ratelimit",
      "@upstash/redis",
      "ai",
      "lucide-react",
      "next",
      "react",
      "sonner",
      "zod",
    ],
    externalServices: ["google", "firecrawl", "upstash"],
    aiSdkApis: [
      "useChat",
      "gateway",
      "ToolLoopAgent",
      "tool(",
      "hasToolCall",
      "stepCountIs",
      "createAgentUIStreamResponse",
      "InferAgentUIMessage",
      "DefaultChatTransport",
      "UIMessage",
      "generateObject",
    ],
  },
  {
    name: "ai-artifact-table",
    title: "Table Editor Artifact",
    description:
      "Spreadsheet editor with AI chat for data analysis and manipulation. Edit tables through conversation.",
    href: "/patterns/ai-artifact-table",
    tags: [
      "ai",
      "table",
      "data-analysis",
      "spreadsheet",
      "ai-sdk",
      "artifacts",
      "clean-architecture",
      "modular-components",
      "maintainable-code",
    ],
    complexity: "intermediate",
    dependencies: [
      "@ai-sdk-tools/artifacts",
      "@ai-sdk-tools/store",
      "ai",
      "lucide-react",
      "next",
      "next-themes",
      "node:async_hooks",
      "papaparse",
      "react",
      "react-data-grid",
      "sonner",
      "zod",
    ],
    externalServices: ["openai", "upstash"],
    aiSdkApis: [
      "streamText",
      "tools:",
      "convertToModelMessages",
      "generateText",
      "tool(",
    ],
  },
  {
    name: "example-agent-branding",
    title: "Branding Agent",
    description:
      "Extract brand design systems from any website using Firecrawl, then use AI tools to export tokens, generate color palettes, check accessibility, and analyze brand personality.",
    href: "/patterns/example-agent-branding",
    tags: [
      "ai",
      "agents",
      "branding",
      "design-system",
      "firecrawl",
      "ai-sdk",
      "tool-loop",
      "accessibility",
      "color-palette",
      "export",
    ],
    complexity: "intermediate",
    dependencies: [
      "@ai-sdk/react",
      "@mendable/firecrawl-js",
      "@upstash/ratelimit",
      "@upstash/redis",
      "ai",
      "lucide-react",
      "next",
      "react",
      "sonner",
      "zod",
    ],
    externalServices: ["openai", "firecrawl", "upstash"],
    aiSdkApis: [
      "useChat",
      "gateway",
      "ToolLoopAgent",
      "tool(",
      "hasToolCall",
      "stepCountIs",
      "createAgentUIStreamResponse",
      "InferAgentUIMessage",
      "DefaultChatTransport",
      "UIMessage",
    ],
  },
  {
    name: "ai-artifact-chart",
    title: "Chart Generation Artifact",
    description:
      "Generate burn rate charts and financial analysis through AI chat. Creates interactive visualizations from conversation.",
    href: "/patterns/ai-artifact-chart",
    tags: [
      "ai",
      "artifacts",
      "chat",
      "financial-analysis",
      "burn-rate",
      "data-visualization",
      "interactive-panels",
    ],
    complexity: "advanced",
    dependencies: [
      "@ai-sdk-tools/artifacts",
      "@ai-sdk-tools/store",
      "ai",
      "geist",
      "lucide-react",
      "motion",
      "react",
      "recharts",
      "sonner",
      "zod",
    ],
    externalServices: ["openai", "upstash"],
    aiSdkApis: ["streamText", "convertToModelMessages", "tool("],
  },
]

// ---------------------------------------------------------------------------
// Hardcoded template data (only the fields used by TemplateCard)
// ---------------------------------------------------------------------------

type TemplateData = {
  name: string
  slug: string
  description: string
  images?: string[]
  stack: string[]
  isNew?: boolean
  releaseDate?: string
}

const TEMPLATES: TemplateData[] = [
  {
    name: "Multi Tenant Better Auth Chat",
    slug: "better-auth-postgres",
    releaseDate: "Nov 10, 2025",
    description:
      "A full-featured ChatGPT-style SaaS chat app. Includes multi-tenant organizations, team roles, artifact management, resumable streaming, and persistent conversation history.",
    images: [
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-6.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-5.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/code-artifact.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-chat-images.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-2.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-4.png",
      "/migrate/templates/ai-sdk-better-auth-postgres/better-auth-3.png",
    ],
    stack: [
      "nextjs",
      "tailwind",
      "stripe",
      "drizzle",
      "resend",
      "better-auth",
      "shadcn",
      "openai",
      "anthropic",
    ],
  },
  {
    name: "AI SDK Agent Platform",
    slug: "ai-agent-platform",
    releaseDate: "Nov 18, 2025",
    description:
      "Build and deploy RAG agents: create, configure, and deploy AI agents with custom knowledge bases. Upload documents, scrape websites, and build vector embeddings with pgvector.",
    images: [
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-10.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-4.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-6.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-5.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-3.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-2.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-1.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-7.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-11.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-12.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-13.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-8.png",
      "/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-14.png",
    ],
    stack: [
      "nextjs",
      "workflow dev kit",
      "better-auth",
      "drizzle",
      "postgresql",
      "stripe",
      "openai",
      "anthropic",
      "exa",
      "shadcn",
      "resend",
    ],
  },
  {
    name: "Sub Agent Starter",
    slug: "sub-agent-starter",
    releaseDate: "Nov 26, 2025",
    description:
      "A hyper minimal sub agent template featuring multi-agent orchestration, tool usage, and artifact streaming with AI SDK Tools.",
    images: [
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/subagent-5.png",
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/sub-agent-1.png",
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/sub-agent-2.png",
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/sub-agent-3.png",
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/subagent-4.png",
      "/migrate/templates/ai-sdk-tools-sub-agent-starter/subagent-6.png",
    ],
    stack: ["nextjs", "ai-sdk-tools", "typescript", "tailwind", "shadcn"],
  },
  {
    name: "Ecommerce Multi-Agent",
    slug: "ecommerce-sub-agent-template",
    isNew: true,
    releaseDate: "Jan 21, 2026",
    description:
      "A full-featured ecommerce AI assistant with multi-agent orchestration, product browsing, shopping cart management, and real-time artifact streaming built with AI SDK Tools.",
    images: [
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-1.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-2.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-3.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-4.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-5.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-6.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-7.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-8.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-9.png",
      "/migrate/templates/ecommerce-sub-agent-template/ecommerce-10.png",
    ],
    stack: [
      "nextjs",
      "ai-sdk-tools",
      "typescript",
      "tailwind",
      "zustand",
      "framer-motion",
    ],
  },
]

// ---------------------------------------------------------------------------
// Dependency icons for the card footer
// ---------------------------------------------------------------------------

function matchDependencyIcons(dependencies: string[]) {
  const seen = new Set<string>()
  const icons: Array<{
    key: string
    name: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }> = []

  for (const dep of dependencies) {
    const depLower = dep.toLowerCase()
    const match = Object.entries(DEPENDENCY_ICONS).find(([, icon]) =>
      icon.match.some((pattern) => {
        const patternLower = pattern.toLowerCase()
        if (patternLower.startsWith("@ai-sdk/"))
          return depLower === patternLower
        if (patternLower.startsWith("@"))
          return depLower.startsWith(patternLower)
        return depLower.includes(patternLower)
      })
    )
    if (match && !seen.has(match[0])) {
      seen.add(match[0])
      icons.push({ key: match[0], name: match[1].name, icon: match[1].icon })
    }
  }

  return icons.slice(0, 5)
}

function DependencyIcons({ dependencies }: { dependencies: string[] }) {
  const icons = matchDependencyIcons(dependencies)
  if (icons.length === 0) return null
  return (
    <ul className="flex items-center gap-0.5" aria-label="Built with">
      {icons.map(({ key, name, icon: Icon }) => (
        <li key={key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground hover:border-border hover:text-foreground flex size-5 items-center justify-center rounded-md border border-transparent transition-colors duration-150">
                <Icon aria-hidden="true" className="size-3" />
                <span className="sr-only">{name}</span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-pixel-square text-[10px] tracking-wider uppercase">
                {name}
              </p>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const landing = (content: string) => ({ medium: "landing", content }) as const

/** Shown to former Cult Pro buyers; update the copy and link when the offer details are final. */
const PRO_CUSTOMER_DISCOUNT = {
  lead: "Bought Cult Pro?",
  detail: "You get a discount on AI SDK Agents.",
  href: aisdkAgentsUrl("/", landing("pro-discount")),
}

function ProDiscountNote() {
  return (
    <a
      href={PRO_CUSTOMER_DISCOUNT.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-muted/55 shadow-soft-sm hover:shadow-soft focus-visible:ring-ring mb-8 inline-flex min-h-9 flex-wrap items-center gap-x-2 rounded-2xl py-1.5 pr-3 pl-1.5 text-sm transition-shadow duration-150 outline-none focus-visible:ring-2"
    >
      <span className="bg-background shadow-soft-sm flex size-6 items-center justify-center rounded-xl">
        <Icons.cultLogoBasic
          aria-hidden="true"
          className="fill-foreground size-3.5"
        />
      </span>
      <span className="text-foreground font-medium">
        {PRO_CUSTOMER_DISCOUNT.lead}
      </span>
      <span className="text-muted-foreground">
        {PRO_CUSTOMER_DISCOUNT.detail}
      </span>
      <span className="text-foreground inline-flex items-center gap-1 font-medium">
        Claim it
        <HugeiconsIcon
          aria-hidden="true"
          icon={ArrowRight02Icon}
          className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
        />
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function AiSdkAgentsSection() {
  const sortedTemplates = [...TEMPLATES].sort((a, b) => {
    const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0
    const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0
    return bDate - aDate
  })

  return (
    <TooltipProvider>
      <MarketingSection aria-labelledby="aisdk-title">
        <SectionHeader
          id="aisdk-title"
          kicker="AI SDK Agents"
          title="Built with Cult UI"
          lead="The components are free. The full-stack AI apps built from them are AI SDK Agents."
          action={
            <a
              href={aisdkAgentsUrl("/directory", landing("section-cta"))}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(pillCtaClass.ink, pillCtaClass.trailingIcon)}
            >
              Browse {TOTAL_PATTERN_COUNT}+ patterns
              <HugeiconsIcon
                aria-hidden="true"
                icon={ArrowRight02Icon}
                className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          }
        >
          Agent patterns on the Vercel AI SDK with live previews. Install with
          shadcn, download a Next.js app, or open in v0.
        </SectionHeader>

        <ProDiscountNote />

        <CatalogTray>
          {FEATURED_BLOCKS.map((block) => (
            <CatalogCard
              key={block.name}
              href={aisdkAgentsUrl(block.href, landing("pattern-card"))}
              title={block.title}
              description={block.description}
              image={{
                light: getBlockImageUrl(block.name, "light"),
                dark: getBlockImageUrl(block.name, "dark"),
              }}
              badge={
                isComplexity(block.complexity) ? (
                  <ComplexityBadge complexity={block.complexity} />
                ) : null
              }
              tags={block.tags}
              meta={
                <DependencyIcons
                  dependencies={[
                    ...block.dependencies,
                    ...block.externalServices,
                    ...block.aiSdkApis,
                  ]}
                />
              }
            />
          ))}
        </CatalogTray>

        <div className="mt-16 sm:mt-24">
          <SectionHeader
            id="aisdk-templates-title"
            title={`${TEMPLATES.length} full-stack templates`}
            lead="Complete codebases with auth, payments, databases and AI."
            action={
              <a
                href={aisdkAgentsUrl("/templates", landing("templates-cta"))}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(pillCtaClass.outline, pillCtaClass.trailingIcon)}
              >
                View all templates
                <HugeiconsIcon
                  aria-hidden="true"
                  icon={ArrowRight02Icon}
                  className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            }
          >
            Start from a working product instead of a blank repo.
          </SectionHeader>
          <CatalogTray className="lg:grid-cols-2">
            {sortedTemplates.map((template) => (
              <CatalogCard
                key={template.slug}
                size="md"
                href={aisdkAgentsUrl(
                  `/templates/${template.slug}`,
                  landing("template-card")
                )}
                title={template.name}
                description={template.description}
                image={{ light: template.images?.[0] ?? "" }}
                sizes="(max-width: 640px) 100vw, 50vw"
                badge={
                  template.isNew ? (
                    <CatalogBadge corner="left" tone="inverse">
                      New
                    </CatalogBadge>
                  ) : null
                }
                tags={template.stack}
                maxTags={4}
                meta={<CatalogMetaLabel>Full-stack template</CatalogMetaLabel>}
              />
            ))}
          </CatalogTray>
        </div>
      </MarketingSection>
    </TooltipProvider>
  )
}

function isComplexity(value: string): value is Complexity {
  return (
    value === "beginner" || value === "intermediate" || value === "advanced"
  )
}
