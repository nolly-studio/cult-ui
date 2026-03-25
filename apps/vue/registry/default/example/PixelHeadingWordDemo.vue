<script setup lang="ts">
import { ref } from 'vue'
import { PixelHeading } from '../ui/pixel-heading-word'

const PIXEL_FONTS = ['square', 'grid', 'circle', 'triangle', 'line'] as const
type PixelFont = typeof PIXEL_FONTS[number]
const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

const text = ref('Pixel Fonts')
const initialFont = ref<PixelFont>('square')
const hoverFont = ref<PixelFont | 'cycle'>('triangle')
const showLabel = ref(true)
const headingLevel = ref<typeof HEADING_LEVELS[number]>('h1')
</script>

<template>
  <div class="w-full space-y-8 py-4">
    <div class="flex min-h-[160px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
      <PixelHeading
        :as="headingLevel"
        :initial-font="initialFont"
        :hover-font="hoverFont !== 'cycle' ? hoverFont : undefined"
        :show-label="showLabel"
        class="text-5xl md:text-7xl tracking-tight"
      >
        {{ text }}
      </PixelHeading>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Text</span>
        <input v-model="text" type="text" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm" placeholder="Enter heading text" />
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Initial Font</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="f in PIXEL_FONTS"
            :key="f"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="initialFont === f ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="initialFont = f"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Hover Behavior</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="hoverFont === 'cycle' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="hoverFont = 'cycle'"
          >
            cycle all
          </button>
          <button
            v-for="f in PIXEL_FONTS"
            :key="f"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="hoverFont === f ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="hoverFont = f"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Heading Level</span>
        <select v-model="headingLevel" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm">
          <option v-for="h in HEADING_LEVELS" :key="h" :value="h">{{ h }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Show Label</span>
        <button
          type="button"
          role="switch"
          :aria-checked="showLabel"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
          :class="showLabel ? 'bg-foreground' : 'bg-input'"
          @click="showLabel = !showLabel"
        >
          <span class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform" :class="showLabel ? 'translate-x-5' : 'translate-x-0'" />
        </button>
      </div>
    </div>
  </div>
</template>
