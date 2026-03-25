<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

type PlainFont = 'sans' | 'mono'
type PixelFont = 'square' | 'grid' | 'circle' | 'triangle' | 'line'

const PLAIN_FONT_MAP: Record<PlainFont, string> = {
  sans: 'font-sans',
  mono: 'font-mono',
}

const PLAIN_FONTS = Object.values(PLAIN_FONT_MAP)
const PLAIN_FONT_KEYS = Object.keys(PLAIN_FONT_MAP) as PlainFont[]

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

type Segment = { type: 'pixel' | 'plain'; text: string }

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
    pixelFont?: PixelFont
    initialPlainFont?: PlainFont
    hoverPlainFont?: PlainFont
    cycleInterval?: number
    plainWordClassName?: string
    class?: string
  }>(),
  {
    plainWords: () => [],
    as: 'p',
    pixelFont: 'square',
    initialPlainFont: 'sans',
    cycleInterval: 300,
  },
)

const pixelFontClass = computed(() => PIXEL_FONT_MAP[props.pixelFont ?? 'square'])
const segments = computed(() => splitTextByPlainWords(props.text, props.plainWords ?? []))

// Per-word hover state
interface WordState {
  fontIndex: number
  isActive: boolean
  interval: ReturnType<typeof setInterval> | null
}

const wordStates = ref<Map<number, WordState>>(new Map())

function getWordState(index: number): WordState {
  if (!wordStates.value.has(index)) {
    const resolvedDefault = PLAIN_FONT_KEYS.indexOf(props.initialPlainFont ?? 'sans')
    wordStates.value.set(index, { fontIndex: resolvedDefault, isActive: false, interval: null })
  }
  return wordStates.value.get(index)!
}

function handleWordMouseEnter(index: number) {
  const state = getWordState(index)
  const hoverIdx = props.hoverPlainFont ? PLAIN_FONT_KEYS.indexOf(props.hoverPlainFont) : null

  if (hoverIdx !== null) {
    state.isActive = true
    state.fontIndex = hoverIdx
  } else {
    state.isActive = true
    state.interval = setInterval(() => {
      state.fontIndex = (state.fontIndex + 1) % PLAIN_FONTS.length
    }, props.cycleInterval)
  }
}

function handleWordMouseLeave(index: number) {
  const state = getWordState(index)
  const resolvedDefault = PLAIN_FONT_KEYS.indexOf(props.initialPlainFont ?? 'sans')
  state.isActive = false
  state.fontIndex = resolvedDefault
  if (state.interval) {
    clearInterval(state.interval)
    state.interval = null
  }
}

function getWordClass(index: number) {
  const state = getWordState(index)
  return cn('cursor-default transition-all duration-150', PLAIN_FONTS[state.fontIndex], props.plainWordClassName)
}

onUnmounted(() => {
  wordStates.value.forEach((state) => {
    if (state.interval) clearInterval(state.interval)
  })
})
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
        :data-state="getWordState(index).isActive ? 'active' : 'idle'"
        :data-font="PLAIN_FONT_KEYS[getWordState(index).fontIndex]"
        :class="getWordClass(index)"
        @mouseenter="handleWordMouseEnter(index)"
        @mouseleave="handleWordMouseLeave(index)"
      >{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </component>
</template>
