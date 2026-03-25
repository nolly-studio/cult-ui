<script setup lang="ts">
/**
 * Paragraph that renders specific words / phrases in a pixel font
 * while the rest stays in the normal typeface.
 */

import { computed } from 'vue'

import { cn } from '@/lib/utils'

type PixelFont = 'square' | 'grid' | 'circle' | 'triangle' | 'line'

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

type Segment = { type: 'plain'; text: string } | { type: 'pixel'; text: string }

function splitTextByPixelWords(text: string, pixelWords: string[]): Segment[] {
  if (pixelWords.length === 0) return [{ type: 'plain', text }]

  const sorted = [...pixelWords].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')

  const segments: Segment[] = []
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const matchStart = match.index ?? 0
    if (matchStart > lastIndex) {
      segments.push({ type: 'plain', text: text.slice(lastIndex, matchStart) })
    }
    segments.push({ type: 'pixel', text: match[0] })
    lastIndex = matchStart + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'plain', text: text.slice(lastIndex) })
  }

  return segments
}

const props = withDefaults(
  defineProps<{
    text: string
    pixelWords?: string[]
    as?: 'p' | 'span' | 'div'
    class?: string
    font?: PixelFont
    pixelWordClassName?: string
  }>(),
  {
    pixelWords: () => [],
    as: 'p',
    font: 'square',
  },
)

const segments = computed(() => splitTextByPixelWords(props.text, props.pixelWords))
const fontClass = computed(() => PIXEL_FONT_MAP[props.font])
</script>

<template>
  <component
    :is="props.as"
    data-slot="pixel-paragraph"
    :class="cn(props.class)"
  >
    <template v-for="(segment, index) in segments" :key="`${segment.type}-${segment.text}-${index}`">
      <span
        v-if="segment.type === 'pixel'"
        data-slot="pixel-word"
        :class="cn(fontClass, props.pixelWordClassName)"
      >{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </component>
</template>
