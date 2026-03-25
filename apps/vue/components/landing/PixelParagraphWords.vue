<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

type PixelFont = 'square' | 'grid' | 'circle' | 'triangle' | 'line'

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

const PIXEL_FONTS = Object.values(PIXEL_FONT_MAP)
const PIXEL_FONT_KEYS = Object.keys(PIXEL_FONT_MAP) as PixelFont[]

type Segment = { type: 'plain' | 'pixel'; text: string }

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
    initialFont?: PixelFont
    hoverFont?: PixelFont
    cycleInterval?: number
    pixelWordClassName?: string
    class?: string
  }>(),
  {
    pixelWords: () => [],
    as: 'p',
    initialFont: 'square',
    cycleInterval: 300,
  },
)

const segments = computed(() => splitTextByPixelWords(props.text, props.pixelWords ?? []))

// Per-word hover state management
interface WordState {
  fontIndex: number
  isActive: boolean
  interval: ReturnType<typeof setInterval> | null
}

const wordStates = ref<Map<number, WordState>>(new Map())

function getWordState(index: number): WordState {
  if (!wordStates.value.has(index)) {
    const resolvedDefault = PIXEL_FONT_KEYS.indexOf(props.initialFont ?? 'square')
    wordStates.value.set(index, { fontIndex: resolvedDefault, isActive: false, interval: null })
  }
  return wordStates.value.get(index)!
}

function handleWordMouseEnter(index: number) {
  const state = getWordState(index)
  const hoverIdx = props.hoverFont ? PIXEL_FONT_KEYS.indexOf(props.hoverFont) : null

  if (hoverIdx !== null) {
    state.isActive = true
    state.fontIndex = hoverIdx
  } else {
    state.isActive = true
    state.interval = setInterval(() => {
      state.fontIndex = (state.fontIndex + 1) % PIXEL_FONTS.length
    }, props.cycleInterval)
  }
}

function handleWordMouseLeave(index: number) {
  const state = getWordState(index)
  const resolvedDefault = PIXEL_FONT_KEYS.indexOf(props.initialFont ?? 'square')
  state.isActive = false
  state.fontIndex = resolvedDefault
  if (state.interval) {
    clearInterval(state.interval)
    state.interval = null
  }
}

function getWordClass(index: number) {
  const state = getWordState(index)
  return cn('cursor-default transition-all duration-150', PIXEL_FONTS[state.fontIndex], props.pixelWordClassName)
}

onUnmounted(() => {
  wordStates.value.forEach((state) => {
    if (state.interval) clearInterval(state.interval)
  })
})
</script>

<template>
  <component :is="props.as" data-slot="pixel-paragraph" :class="cn(props.class)">
    <template v-for="(segment, index) in segments" :key="`${segment.type}-${segment.text}-${index}`">
      <span
        v-if="segment.type === 'pixel'"
        data-slot="pixel-word"
        :data-state="getWordState(index).isActive ? 'active' : 'idle'"
        :data-font="PIXEL_FONT_KEYS[getWordState(index).fontIndex]"
        :class="getWordClass(index)"
        @mouseenter="handleWordMouseEnter(index)"
        @mouseleave="handleWordMouseLeave(index)"
      >{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </component>
</template>
