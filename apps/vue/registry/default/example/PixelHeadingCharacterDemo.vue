<script setup lang="ts">
import { ref, computed } from 'vue'
import { PixelHeading } from '../ui/pixel-heading-character'
import type { PixelHeadingMode } from '../ui/pixel-heading-character'

const MODES: PixelHeadingMode[] = ['uniform', 'multi', 'wave', 'random']
const PREFIX_FONTS = ['none', 'square', 'grid', 'circle', 'triangle', 'line'] as const
const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

const text = ref('Pixel Fonts')
const mode = ref<PixelHeadingMode>('wave')
const autoPlay = ref(true)
const showLabel = ref(true)
const cycleInterval = ref(340)
const staggerDelay = ref(200)
const prefix = ref('')
const prefixFont = ref<typeof PREFIX_FONTS[number]>('none')
const headingLevel = ref<typeof HEADING_LEVELS[number]>('h1')
const defaultFontIndex = ref(3)
const isolateEnabled = ref(false)
const isolateChars = ref('x')
const isolateFont = ref('sans')
const resetKey = ref(0)

const isolateMap = computed(() =>
  isolateEnabled.value
    ? Object.fromEntries(isolateChars.value.split('').map((c) => [c, isolateFont.value]))
    : undefined
)
</script>

<template>
  <div class="w-full space-y-8 py-4">
    <div class="flex min-h-[160px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
      <PixelHeading
        :key="resetKey"
        :as="headingLevel"
        :mode="mode"
        :auto-play="autoPlay"
        :show-label="showLabel"
        :cycle-interval="cycleInterval"
        :stagger-delay="staggerDelay"
        :default-font-index="defaultFontIndex"
        :prefix="prefix || undefined"
        :prefix-font="prefixFont"
        :isolate="isolateMap"
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
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Mode</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="m in MODES"
            :key="m"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="mode === m ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="mode = m; resetKey++"
          >
            {{ m }}
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
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Cycle Interval: {{ cycleInterval }}ms</span>
        <input v-model.number="cycleInterval" type="range" :min="30" :max="500" :step="10" class="w-full accent-foreground" />
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Stagger Delay: {{ staggerDelay }}ms</span>
        <input v-model.number="staggerDelay" type="range" :min="0" :max="200" :step="5" class="w-full accent-foreground" />
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Default Font Index: {{ defaultFontIndex }}</span>
        <input v-model.number="defaultFontIndex" type="range" :min="0" :max="4" :step="1" class="w-full accent-foreground" />
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Auto Play</span>
        <button
          type="button"
          role="switch"
          :aria-checked="autoPlay"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
          :class="autoPlay ? 'bg-foreground' : 'bg-input'"
          @click="autoPlay = !autoPlay; resetKey++"
        >
          <span class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform" :class="autoPlay ? 'translate-x-5' : 'translate-x-0'" />
        </button>
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

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Prefix</span>
        <input v-model="prefix" type="text" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm" placeholder="e.g. Shadcn," />
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Prefix Font</span>
        <select v-model="prefixFont" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm">
          <option v-for="f in PREFIX_FONTS" :key="f" :value="f">{{ f }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Reset Animation</span>
        <button type="button" class="h-9 rounded-md border border-input bg-transparent px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted" @click="resetKey++">
          Restart
        </button>
      </div>
    </div>
  </div>
</template>
