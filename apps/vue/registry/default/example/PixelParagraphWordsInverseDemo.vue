<script setup lang="ts">
import { ref, computed } from 'vue'
import { PixelParagraphInverse } from '../ui/pixel-paragraph-words-inverse'

const PIXEL_FONTS = ['square', 'grid', 'circle', 'triangle', 'line'] as const
type PixelFont = typeof PIXEL_FONTS[number]
const PLAIN_FONTS = ['sans', 'mono'] as const
type PlainFont = typeof PLAIN_FONTS[number]
const WRAPPER_TAGS = ['p', 'span', 'div'] as const

const text = ref('54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project.')
const plainWordsInput = ref('animated,shadcn/ui')
const pixelFont = ref<PixelFont>('square')
const plainFont = ref<PlainFont>('sans')
const wrapperTag = ref<typeof WRAPPER_TAGS[number]>('p')

const plainWords = computed(() => plainWordsInput.value.split(',').map(w => w.trim()).filter(Boolean))
</script>

<template>
  <div class="w-full space-y-8 py-4">
    <div class="flex min-h-[120px] items-center justify-center rounded-lg border border-border/40 bg-background p-8">
      <PixelParagraphInverse
        :text="text"
        :plain-words="plainWords"
        :as="wrapperTag"
        :pixel-font="pixelFont"
        :plain-font="plainFont"
        class="max-w-xl text-lg leading-relaxed text-muted-foreground"
        plain-word-class-name="text-foreground font-medium"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="space-y-2 sm:col-span-2 lg:col-span-3">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Paragraph Text</span>
        <textarea v-model="text" :rows="3" class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Enter paragraph text" />
      </div>

      <div class="space-y-2 sm:col-span-2 lg:col-span-3">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Plain Words (comma-separated)</span>
        <input v-model="plainWordsInput" type="text" class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm" placeholder="e.g. animated,shadcn/ui,open source" />
        <p class="text-xs text-muted-foreground">These words escape the pixel font and render in sans/mono</p>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Pixel Font (base text)</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="f in PIXEL_FONTS"
            :key="f"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="pixelFont === f ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="pixelFont = f"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <span class="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Plain Font (escaped words)</span>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="f in PLAIN_FONTS"
            :key="f"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            :class="plainFont === f ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'"
            @click="plainFont = f"
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
