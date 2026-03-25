<script setup lang="ts">
import { ref, computed } from 'vue'
import { PixelParagraph } from '../ui/pixel-paragraph-words'

const PIXEL_FONTS = ['square', 'grid', 'circle', 'triangle', 'line'] as const
type PixelFont = typeof PIXEL_FONTS[number]
const WRAPPER_TAGS = ['p', 'span', 'div'] as const

const text = ref('54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project.')
const pixelWordsInput = ref('animated,shadcn/ui')
const font = ref<PixelFont>('square')
const wrapperTag = ref<typeof WRAPPER_TAGS[number]>('p')

const pixelWords = computed(() => pixelWordsInput.value.split(',').map(w => w.trim()).filter(Boolean))
</script>

<template>
  <div class="w-full space-y-8 py-4">
    <div class="flex min-h-[120px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
      <PixelParagraph
        :text="text"
        :pixel-words="pixelWords"
        :as="wrapperTag"
        :font="font"
        class="max-w-xl text-lg leading-relaxed text-muted-foreground"
        pixel-word-class-name="text-foreground font-medium"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="space-y-2 sm:col-span-2 lg:col-span-3">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Paragraph Text</span>
        <textarea v-model="text" :rows="3" class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Enter paragraph text" />
      </div>

      <div class="space-y-2 sm:col-span-2 lg:col-span-3">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Pixel Words (comma-separated)</span>
        <input v-model="pixelWordsInput" type="text" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm" placeholder="e.g. animated,shadcn/ui,open source" />
        <p class="text-xs text-muted-foreground">These words render in a pixel font while the rest stays in the normal typeface</p>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Pixel Font</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="f in PIXEL_FONTS"
            :key="f"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="font === f ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="font = f"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Wrapper Element</span>
        <select v-model="wrapperTag" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm">
          <option v-for="t in WRAPPER_TAGS" :key="t" :value="t">&lt;{{ t }}&gt;</option>
        </select>
      </div>
    </div>
  </div>
</template>
