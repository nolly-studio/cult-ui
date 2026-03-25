<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import PixelHeadingWord from './PixelHeadingWord.vue'

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
    name: 'example-agent-competitor',
    title: 'Competitor Research Agent',
    description: 'Enter a competitor URL to get comprehensive competitive intelligence. Uses Firecrawl Map + Parallel Scrape for fast extraction (~3-5s).',
    href: '/directory/examples/research-agents/example-agent-competitor',
    tags: ['ai', 'agents', 'competitor-analysis', 'competitive-intelligence', 'sales', 'battlecard'],
    complexity: 'intermediate',
    dependencies: ['@ai-sdk/openai', '@ai-sdk/react', '@mendable/firecrawl-js', '@upstash/ratelimit', '@upstash/redis', 'ai'],
    externalServices: ['openai', 'firecrawl', 'upstash'],
    aiSdkApis: ['useChat', 'gateway', 'ToolLoopAgent'],
  },
  {
    name: 'example-agent-data-analysis',
    title: 'Data Analysis Agent',
    description: 'Upload CSV or JSON data and get AI-powered analysis with interactive visualizations. Detect patterns, correlations, outliers.',
    href: '/directory/examples/analytics-agents/example-agent-data-analysis',
    tags: ['ai', 'agents', 'data-analysis', 'visualization', 'charts', 'csv'],
    complexity: 'intermediate',
    dependencies: ['@ai-sdk/react', '@upstash/ratelimit', '@upstash/redis', 'ai', 'recharts'],
    externalServices: ['openai', 'upstash'],
    aiSdkApis: ['useChat', 'gateway', 'ToolLoopAgent'],
  },
  {
    name: 'example-agent-a11y-audit',
    title: 'Accessibility Audit Agent',
    description: 'Audit any website for WCAG 2.1 accessibility compliance using Firecrawl, then use AI tools to analyze issues by severity.',
    href: '/directory/examples/audit-agents/example-agent-a11y-audit',
    tags: ['ai', 'agents', 'accessibility', 'wcag', 'a11y', 'audit'],
    complexity: 'intermediate',
    dependencies: ['@ai-sdk/react', '@mendable/firecrawl-js', '@upstash/ratelimit', '@upstash/redis', 'ai'],
    externalServices: ['google', 'firecrawl', 'upstash'],
    aiSdkApis: ['useChat', 'gateway', 'ToolLoopAgent', 'generateObject'],
  },
  {
    name: 'ai-artifact-table',
    title: 'Table Editor Artifact',
    description: 'Spreadsheet editor with AI chat for data analysis and manipulation. Edit tables through conversation.',
    href: '/directory/artifacts/interactive-artifacts/ai-artifact-table',
    tags: ['ai', 'table', 'data-analysis', 'spreadsheet', 'ai-sdk', 'artifacts'],
    complexity: 'intermediate',
    dependencies: ['@ai-sdk-tools/artifacts', '@ai-sdk-tools/store', 'ai', 'papaparse', 'react-data-grid'],
    externalServices: ['openai', 'upstash'],
    aiSdkApis: ['streamText', 'tools:', 'convertToModelMessages', 'generateText', 'tool('],
  },
  {
    name: 'example-agent-branding',
    title: 'Branding Agent',
    description: 'Extract brand design systems from any website using Firecrawl, then use AI tools to export tokens, generate color palettes.',
    href: '/directory/examples/design-agents/example-agent-branding',
    tags: ['ai', 'agents', 'branding', 'design-system', 'firecrawl'],
    complexity: 'intermediate',
    dependencies: ['@ai-sdk/react', '@mendable/firecrawl-js', '@upstash/ratelimit', '@upstash/redis', 'ai'],
    externalServices: ['openai', 'firecrawl', 'upstash'],
    aiSdkApis: ['useChat', 'gateway', 'ToolLoopAgent'],
  },
  {
    name: 'ai-artifact-chart',
    title: 'Chart Generation Artifact',
    description: 'Generate burn rate charts and financial analysis through AI chat. Creates interactive visualizations from conversation.',
    href: '/directory/artifacts/static-artifacts/ai-artifact-chart',
    tags: ['ai', 'artifacts', 'chat', 'financial-analysis', 'burn-rate', 'data-visualization'],
    complexity: 'advanced',
    dependencies: ['@ai-sdk-tools/artifacts', '@ai-sdk-tools/store', 'ai', 'recharts'],
    externalServices: ['openai', 'upstash'],
    aiSdkApis: ['streamText', 'convertToModelMessages', 'tool('],
  },
]

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
    name: 'Multi Tenant Better Auth Chat',
    slug: 'better-auth-postgres',
    releaseDate: 'Nov 10, 2025',
    description: 'A full-featured ChatGPT-style SaaS chat app. Includes multi-tenant organizations, team roles, artifact management, resumable streaming.',
    images: ['/migrate/templates/ai-sdk-better-auth-postgres/better-auth-6.png'],
    stack: ['nextjs', 'workflow dev kit', 'better-auth', 'drizzle', 'postgresql', 'stripe', 'openai', 'anthropic', 'shadcn'],
  },
  {
    name: 'AI SDK Agent Platform',
    slug: 'ai-agent-platform',
    releaseDate: 'Nov 18, 2025',
    description: 'Build and deploy RAG agents: create, configure, and deploy AI agents with custom knowledge bases.',
    images: ['/migrate/templates/ai-sdk-better-auth-postgres-agent-config/agent-config-template-10.png'],
    stack: ['nextjs', 'workflow dev kit', 'better-auth', 'drizzle', 'postgresql', 'stripe', 'openai', 'anthropic', 'exa', 'shadcn', 'resend'],
  },
  {
    name: 'Sub Agent Starter',
    slug: 'sub-agent-starter',
    releaseDate: 'Nov 26, 2025',
    description: 'A hyper minimal sub agent template featuring multi-agent orchestration, tool usage, and artifact streaming.',
    images: ['/migrate/templates/ai-sdk-tools-sub-agent-starter/subagent-5.png'],
    stack: ['nextjs', 'ai-sdk-tools', 'typescript', 'tailwind', 'shadcn'],
  },
  {
    name: 'Ecommerce Multi-Agent',
    slug: 'ecommerce-sub-agent-template',
    isNew: true,
    releaseDate: 'Jan 21, 2026',
    description: 'A full-featured ecommerce AI assistant with multi-agent orchestration, product browsing, shopping cart management.',
    images: ['/migrate/templates/ecommerce-sub-agent-template/ecommerce-1.png'],
    stack: ['nextjs', 'ai-sdk-tools', 'typescript', 'tailwind', 'zustand', 'framer-motion'],
  },
]

const COMPLEXITY_MAP: Record<string, { label: string; color: string }> = {
  beginner: { label: 'BEG', color: 'text-emerald-600 dark:text-emerald-400' },
  intermediate: { label: 'INT', color: 'text-amber-600 dark:text-amber-400' },
  advanced: { label: 'ADV', color: 'text-rose-600 dark:text-rose-400' },
}

const sortedTemplates = computed(() =>
  [...TEMPLATES].sort((a, b) => {
    const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0
    const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0
    return bDate - aDate
  }),
)

function getBlockImageUrl(blockName: string, theme: 'light' | 'dark' = 'light'): string {
  return `/migrate/blocks/${blockName}-${theme}.png`
}

const imgErrors = ref<Set<string>>(new Set())
const templateImgErrors = ref<Set<string>>(new Set())

function onImgError(name: string) {
  imgErrors.value.add(name)
}

function onTemplateImgError(slug: string) {
  templateImgErrors.value.add(slug)
}
</script>

<template>
  <section class="mx-auto max-w-6xl md:px-4 py-16 md:py-24">
    <!-- Section Header -->
    <div class="mb-12 text-center">
      <div class="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-4">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <div class="flex items-center gap-2 border border-border bg-background px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 md:size-4 fill-[#ADFA1B]/60">
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
          </svg>
          <span class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            AI SDK AGENTS
          </span>
        </div>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <PixelHeadingWord
        as="h2"
        class="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl"
        initial-font="square"
        disable-cycling
        disable-hover
      >
        {{ TOTAL_PATTERN_COUNT }}+ AI Patterns
      </PixelHeadingWord>

      <p class="mx-auto max-w-md px-4 md:px-0 font-light text-base text-foreground/70 leading-relaxed md:text-lg">
        Live interactive previews. Copy and paste what you need. Install with shadcn, download as Nextjs app, or open in v0.
      </p>
    </div>

    <!-- Featured Patterns Grid -->
    <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="block in FEATURED_BLOCKS"
        :key="block.name"
        class="group relative flex flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/10 hover:shadow-lg hover:shadow-primary/5"
        target="_blank"
        rel="noopener noreferrer"
        :href="`https://aisdkagents.com${block.href}`"
      >
        <!-- Corner accents -->
        <div class="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

        <!-- Image Preview -->
        <div class="relative aspect-[16/10] w-full overflow-hidden border-border border-b bg-muted/20">
          <div
            v-if="imgErrors.has(block.name)"
            class="flex h-full items-center justify-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider"
          >
            <span>Preview</span>
          </div>
          <template v-else>
            <img
              :alt="`${block.title} preview`"
              class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.01] dark:hidden"
              :src="getBlockImageUrl(block.name, 'light')"
              @error="onImgError(block.name)"
            />
            <img
              :alt="`${block.title} preview`"
              class="absolute inset-0 hidden h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] dark:block"
              :src="getBlockImageUrl(block.name, 'dark')"
              @error="onImgError(block.name)"
            />
          </template>

          <!-- Complexity badge -->
          <div
            v-if="COMPLEXITY_MAP[block.complexity]"
            class="absolute top-0 right-0 border-border border-b border-l bg-background/95 px-2 py-1 backdrop-blur-sm"
          >
            <span
              :class="cn(
                'font-medium font-mono text-[10px] uppercase tracking-wider',
                COMPLEXITY_MAP[block.complexity].color,
              )"
            >
              {{ COMPLEXITY_MAP[block.complexity].label }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col p-3">
          <h3 class="mb-1.5 line-clamp-1 font-medium text-sm leading-tight tracking-tight">
            {{ block.title }}
          </h3>

          <p class="mb-3 line-clamp-2 flex-1 font-light text-muted-foreground text-xs leading-relaxed">
            {{ block.description }}
          </p>

          <!-- Tags -->
          <div v-if="block.tags.length > 0" class="mb-3 flex flex-wrap gap-1">
            <span
              v-for="tag in block.tags.slice(0, 2)"
              :key="tag"
              class="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lowercase transition-colors group-hover:border-foreground/20"
            >
              {{ tag }}
            </span>
            <span
              v-if="block.tags.length > 2"
              class="px-1 font-mono text-[10px] text-muted-foreground/60"
            >
              +{{ block.tags.length - 2 }}
            </span>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between border-border border-t pt-2.5">
            <span class="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
              —
            </span>

            <span class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
              View
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>

    <!-- View All Link -->
    <div class="flex justify-center">
      <a
        class="group flex items-center gap-2 border border-border bg-background px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all hover:border-foreground/40 hover:bg-foreground hover:text-background"
        href="https://aisdkagents.com/directory"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Browse All {{ TOTAL_PATTERN_COUNT }} Patterns</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform group-hover:translate-x-1">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </div>

    <!-- Premium Templates Section -->
    <div class="mt-20 border-border/50 border-t pt-16">
      <div class="mb-12 text-center">
        <div class="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-4">
          <div class="flex items-center gap-2 border border-primary/30 px-3 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 md:size-4 fill-[#ADFA1B]/40">
              <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
              <path d="m22.54 12.43-8.97 4.08a2 2 0 0 1-1.66 0l-8.37-3.81" />
              <path d="m22.54 17.43-8.97 4.08a2 2 0 0 1-1.66 0l-8.37-3.81" />
            </svg>
            <span class="font-mono text-[11px] text-primary uppercase tracking-wider">
              AI SDK AGENT TEMPLATES
            </span>
          </div>
        </div>

        <PixelHeadingWord
          as="h2"
          class="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl"
          initial-font="square"
          disable-cycling
          disable-hover
        >
          {{ TEMPLATES.length }} Full-Stack Templates
        </PixelHeadingWord>

        <p class="mx-auto px-4 md:px-0 max-w-2xl font-light text-base text-foreground/70 leading-relaxed md:text-lg">
          Production-ready starter templates with authentication, payments, databases, and AI integrations. Ship faster with complete codebases.
        </p>
      </div>

      <!-- Templates Grid -->
      <div class="mb-8 grid gap-4 md:grid-cols-2">
        <a
          v-for="template in sortedTemplates"
          :key="template.slug"
          class="group relative flex flex-col overflow-hidden border border-border bg-background transition-all duration-150 hover:border-foreground/40 hover:shadow-lg hover:shadow-primary/5"
          target="_blank"
          rel="noopener noreferrer"
          :href="`https://aisdkagents.com/templates/${template.slug}`"
        >
          <!-- Corner accents -->
          <div class="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
          <div class="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
          <div class="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
          <div class="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

          <!-- Image Preview -->
          <div class="relative aspect-[16/10] w-full overflow-hidden border-border border-b bg-muted/20">
            <div
              v-if="templateImgErrors.has(template.slug) || !template.images?.[0]"
              class="flex h-full items-center justify-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider"
            >
              <span>Template Preview</span>
            </div>
            <img
              v-else
              :alt="`${template.name} preview`"
              class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              :src="template.images[0]"
              @error="onTemplateImgError(template.slug)"
            />

            <!-- NEW badge -->
            <div
              v-if="template.isNew"
              class="absolute top-0 left-0 border-border border-r border-b bg-primary px-2 py-1"
            >
              <span class="font-medium font-mono text-[10px] text-primary-foreground uppercase tracking-wider">
                New
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-4">
            <h3 class="mb-2 line-clamp-1 font-medium text-base leading-tight tracking-tight">
              {{ template.name }}
            </h3>

            <p class="mb-4 line-clamp-2 flex-1 font-light text-muted-foreground text-sm leading-relaxed">
              {{ template.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mb-3 flex flex-wrap gap-1.5">
              <span
                v-for="tech in template.stack.slice(0, 4)"
                :key="tech"
                class="border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground lowercase transition-colors group-hover:border-foreground/20"
              >
                {{ tech }}
              </span>
              <span
                v-if="template.stack.length > 4"
                class="px-1 font-mono text-[10px] text-muted-foreground/60"
              >
                +{{ template.stack.length - 4 }}
              </span>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between border-border border-t pt-3">
              <span class="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                Full-Stack Template
              </span>

              <span class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
                View
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </div>

      <!-- View All Templates Link -->
      <div class="flex justify-center">
        <a
          class="group flex items-center gap-2 border border-primary/30 bg-primary/5 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
          target="_blank"
          rel="noopener noreferrer"
          href="https://aisdkagents.com/templates"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 text-primary group-hover:text-primary-foreground">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>
          <span>View All Templates</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
