<script setup lang="ts">
import { computed } from 'vue'
import PixelHeadingWord from './PixelHeadingWord.vue'

const DEPENDENCY_ICONS: Record<string, { match: string[] }> = {
  openai: { match: ['openai', '@openai'] },
  gemini: { match: ['google', 'gemini'] },
  ai: { match: ['@ai-sdk/openai', '@ai-sdk/react', '@ai-sdk/anthropic', '@ai-sdk/google', 'ai-sdk-tools'] },
  upstash: { match: ['@upstash', 'upstash'] },
  firecrawl: { match: ['firecrawl', 'firecrawl-js'] },
  nextjs: { match: ['next', '@types/next'] },
}

const BLOCK_PREVIEW_DATA = [
  {
    name: 'ai-chat-agent-routing-pattern',
    title: 'Agent - Routing Pattern',
    description: 'Routes user requests to specialized AI agents. Uses AI SDK v5 streaming to classify requests and send them to the right agent for customer support.',
    tags: ['ai', 'routing', 'ai-agents', 'streaming', 'chat-pattern', 'ai-sdk-v5', 'customer-support'],
    dependencies: ['ai', 'zod', '@upstash/ratelimit', '@upstash/redis', 'sonner', 'lucide-react'],
    externalServices: ['openai'],
    isNew: true,
    dateReleased: '2025-09-08',
    meta: { problemSolved: ['Intelligent request routing to specialized AI agents'] },
  },
  {
    name: 'ai-sdk-gemini-flash-text',
    title: 'Gemini Flash Text',
    description: 'Generates text and analyzes market research using Google\'s Gemini 2.5 Flash.',
    tags: ['ai', 'text-generation', 'market-research'],
    dependencies: ['@ai-sdk/google', 'ai', 'zod', 'lucide-react', '@upstash/ratelimit', '@upstash/redis'],
    externalServices: ['google'],
    isNew: true,
    dateReleased: '2025-08-20',
    meta: { problemSolved: ['Text generation with market research analysis'] },
  },
  {
    name: 'ai-sdk-openai-response-model',
    title: 'OpenAI Response Model',
    description: 'Multi-model AI chat with OpenAI Responses API. Switch between models mid-conversation.',
    tags: ['ai', 'openai', 'multi-model'],
    dependencies: ['@ai-sdk/openai', 'ai', 'zod'],
    externalServices: ['openai'],
    isNew: true,
    dateReleased: '2025-08-15',
    meta: { problemSolved: ['Multi-model AI chat with model switching'] },
  },
  {
    name: 'ai-sdk-anthropic-thinking',
    title: 'Anthropic Thinking',
    description: 'Extended thinking with Claude for complex reasoning tasks with visible thought chains.',
    tags: ['ai', 'anthropic', 'reasoning'],
    dependencies: ['@ai-sdk/anthropic', 'ai', 'zod'],
    externalServices: ['anthropic'],
    isNew: false,
    dateReleased: '2025-07-10',
    meta: { problemSolved: ['Extended thinking with visible thought chains'] },
  },
  {
    name: 'ai-chat-structured-data',
    title: 'Structured Data Chat',
    description: 'AI chat pattern that generates structured data outputs like tables, charts, and JSON.',
    tags: ['ai', 'structured-data', 'chat'],
    dependencies: ['ai', 'zod', '@upstash/ratelimit'],
    externalServices: ['openai'],
    isNew: false,
    dateReleased: '2025-06-20',
    meta: { problemSolved: ['Structured data generation from chat'] },
  },
  {
    name: 'ai-sdk-tool-calling',
    title: 'Tool Calling Pattern',
    description: 'AI SDK tool calling patterns with function execution and result streaming.',
    tags: ['ai', 'tools', 'function-calling'],
    dependencies: ['ai', 'zod', '@ai-sdk/openai'],
    externalServices: ['openai'],
    isNew: false,
    dateReleased: '2025-05-15',
    meta: { problemSolved: ['Tool calling with function execution'] },
  },
]

const sortedBlocks = computed(() => {
  return [...BLOCK_PREVIEW_DATA]
    .slice(0, 6)
    .sort((a, b) => {
      const newDiff = (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      if (newDiff !== 0) return newDiff
      const dateA = new Date(a.dateReleased || '0').getTime()
      const dateB = new Date(b.dateReleased || '0').getTime()
      return dateB - dateA
    })
})

function getUniqueIcons(block: (typeof BLOCK_PREVIEW_DATA)[number]) {
  const allDeps = Array.from(new Set([...block.dependencies, ...(block.externalServices || [])]))
  const seenIcons = new Set<string>()
  return allDeps
    .reduce<Array<{ dep: string; key: string }>>((acc, dep) => {
      const depLower = dep.toLowerCase()
      const matchingIcon = Object.entries(DEPENDENCY_ICONS).find(([, icon]) =>
        icon.match.some((pattern) => depLower.includes(pattern.toLowerCase())),
      )
      if (matchingIcon && !seenIcons.has(matchingIcon[0])) {
        seenIcons.add(matchingIcon[0])
        acc.push({ dep, key: matchingIcon[0] })
      }
      return acc
    }, [])
    .slice(0, 4)
}
</script>

<template>
  <section class="mx-auto max-w-6xl md:px-4 py-16 md:py-12">
    <!-- Section Header -->
    <div class="mb-12 text-center">
      <div class="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-4">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <div class="flex items-center gap-2 border border-border bg-background px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5 md:size-4 fill-[#ADFA1B]/50"
          >
            <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1H8.3Z" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <circle cx="17.5" cy="17.5" r="3.5" />
          </svg>
          <span class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            CULT PRO
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
        Premium Cult Blocks
      </PixelHeadingWord>

      <p class="mx-auto max-w-md font-light text-base text-foreground/70 leading-relaxed md:text-lg">
        Rad full-stack blocks and marketing patterns. <br /> Copy and paste into your project.
      </p>
    </div>

    <!-- Blocks Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="block in sortedBlocks"
        :key="block.name"
        :href="`https://pro.cult-ui.com/blocks/${block.name}`"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/10 hover:shadow-lg hover:shadow-primary/5"
      >
        <!-- Corner accents -->
        <div class="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

        <!-- Content -->
        <div class="flex flex-1 flex-col p-4">
          <h3 class="mb-2 line-clamp-1 font-medium text-sm leading-tight tracking-tight">
            {{ block.title }}
          </h3>

          <p
            v-if="block.meta.problemSolved"
            class="mb-4 line-clamp-3 flex-1 font-light text-muted-foreground text-xs leading-relaxed"
          >
            {{ block.description }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between border-border border-t pt-3">
            <div class="flex items-center gap-0.5">
              <div
                v-for="icon in getUniqueIcons(block)"
                :key="icon.key"
                class="flex size-5 items-center justify-center border border-transparent text-muted-foreground transition-all hover:border-border hover:text-foreground"
                :title="icon.dep"
              >
                <span class="text-[8px]">{{ icon.key.charAt(0).toUpperCase() }}</span>
              </div>
            </div>

            <span class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
              Preview
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-3 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
