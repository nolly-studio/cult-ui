<script setup lang="ts">
import { useRoute } from "vue-router"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"

const route = useRoute()
</script>

<template>
  <div class="mr-4 hidden md:flex">
    <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
      <span class="hidden text-lg font-bold sm:inline-block">cult ui</span>
      <span class="sr-only">{{ siteConfig.name }}</span>
    </NuxtLink>
    <nav class="flex items-center gap-4 text-sm lg:gap-6">
      <NuxtLink
        to="/docs/components/hero-color-panels"
        :class="
          cn(
            'text-sm font-semibold transition-colors hover:text-foreground/80',
            route.path.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60',
          )
        "
      >
        Components
      </NuxtLink>

      <a
        href="https://aisdkagents.com/patterns"
        target="_blank"
        class="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Blocks
        <span
          class="text-[10px] font-pixel-square shadow-inner text-black bg-[#ADFA1B] border px-1 border-black/20"
          >100 new</span
        >
      </a>

      <a
        href="https://aisdkagents.com/templates"
        target="_blank"
        class="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Templates
        <span
          class="text-[10px] font-pixel-square text-black shadow-inner bg-[#ADFA1B] border px-1 border-black/20"
          >4 new</span
        >
      </a>
    </nav>
  </div>
</template>
