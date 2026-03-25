<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import {
  type PlainFont,
  type PixelFont,
  PLAIN_FONTS,
  PLAIN_FONT_KEYS,
  PIXEL_FONT_MAP,
  splitTextByWords,
} from '@/lib/pixel-fonts'

const props = withDefaults(
  defineProps<{
    text: string
    plainWords?: string[]
    as?: 'p' | 'span' | 'div'
    pixelFont?: PixelFont
    initialPlainFont?: PlainFont
    hoverPlainFont?: PlainFont
    cycleInterval?: number
    plainWordClass?: string
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
const segments = computed(() => splitTextByWords(props.text, props.plainWords ?? [], 'plain'))

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
  return cn('cursor-default transition-all duration-150', PLAIN_FONTS[state.fontIndex], props.plainWordClass)
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
