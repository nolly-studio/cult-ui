<script setup lang="ts">
/**
 * Paragraph where the base text is in a pixel font and specific words
 * or phrases escape into a sans or mono font.
 *
 * This is the inverse of PixelParagraphWords: everything is pixel
 * *except* the specified words.
 */

import { computed } from 'vue'

import { cn } from '@/lib/utils'

type PlainFont = 'sans' | 'mono'
type PixelFont = 'square' | 'grid' | 'circle' | 'triangle' | 'line'

const PLAIN_FONT_MAP: Record<PlainFont, string> = {
  sans: 'font-sans',
  mono: 'font-mono',
}

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

type Segment = { type: 'pixel'; text: string } | { type: 'plain'; text: string }

function splitTextByPlainWords(text: string, plainWords: string[]): Segment[] {
  if (plainWords.length === 0) return [{ type: 'pixel', text }]

  const sorted = [...plainWords].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')

  const segments: Segment[] = []
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const matchStart = match.index ?? 0
    if (matchStart > lastIndex) {
      segments.push({ type: 'pixel', text: text.slice(lastIndex, matchStart) })
    }
    segments.push({ type: 'plain', text: match[0] })
    lastIndex = matchStart + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'pixel', text: text.slice(lastIndex) })
  }

  return segments
}

const props = withDefaults(
  defineProps<{
    text: string
    plainWords?: string[]
    as?: 'p' | 'span' | 'div'
    class?: string
    pixelFont?: PixelFont
    plainFont?: PlainFont
    plainWordClassName?: string
  }>(),
  {
    plainWords: () => [],
    as: 'p',
    pixelFont: 'square',
    plainFont: 'sans',
  },
)

const segments = computed(() => splitTextByPlainWords(props.text, props.plainWords))
const pixelFontClass = computed(() => PIXEL_FONT_MAP[props.pixelFont])
const plainFontClass = computed(() => PLAIN_FONT_MAP[props.plainFont])
</script>

<template>
  <component
    :is="props.as"
    data-slot="pixel-paragraph-inverse"
    :class="cn(pixelFontClass, props.class)"
  >
    <template v-for="(segment, index) in segments" :key="`${segment.type}-${segment.text}-${index}`">
      <span
        v-if="segment.type === 'plain'"
        data-slot="plain-word"
        :class="cn(plainFontClass, props.plainWordClassName)"
      >{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </component>
</template>
