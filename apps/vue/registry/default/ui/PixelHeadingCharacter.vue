<script setup lang="ts">
/**
 * Per-character pixel-font heading with four animation modes.
 *
 * Modes:
 * - uniform: Single font, cycles one font for all characters on hover
 * - multi: Golden-ratio distribution, staggered cascade on hover
 * - wave: Position-based gradient, fonts flow left-to-right
 * - random: Each character scrambles independently per tick
 */

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

/* ── Constants ── */

const PIXEL_FONTS = [
  'font-pixel-square',
  'font-pixel-grid',
  'font-pixel-circle',
  'font-pixel-triangle',
  'font-pixel-line',
] as const

const FONT_LABELS = ['Square', 'Grid', 'Circle', 'Triangle', 'Line'] as const
const FONT_COUNT = PIXEL_FONTS.length

const PREFIX_FONT_MAP: Record<string, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

const ISOLATE_FONT_MAP: Record<string, string> = {
  sans: 'font-sans',
  mono: 'font-mono',
}

function resolveIsolateFont(value: string): string {
  return ISOLATE_FONT_MAP[value] ?? value
}

const PHI = (1 + Math.sqrt(5)) / 2
const TICK_MS = 50

/* ── Distribution algorithms ── */

function goldenBase(index: number): number {
  return Math.floor((index * PHI * FONT_COUNT) % FONT_COUNT)
}

function pseudoRandom(tick: number, index: number): number {
  return ((tick * 2654435761 + index * 340573321) >>> 0) % FONT_COUNT
}

/* ── Types ── */

export type PixelHeadingMode = 'uniform' | 'multi' | 'wave' | 'random'

/* ── Props ── */

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    class?: string
    cycleInterval?: number
    defaultFontIndex?: number
    showLabel?: boolean
    mode?: PixelHeadingMode
    staggerDelay?: number
    autoPlay?: boolean
    prefix?: string
    prefixFont?: 'square' | 'grid' | 'circle' | 'triangle' | 'line' | 'none'
    isolate?: Record<string, string>
    text: string
  }>(),
  {
    as: 'h1',
    cycleInterval: 150,
    defaultFontIndex: 0,
    showLabel: false,
    mode: 'multi',
    staggerDelay: 50,
    autoPlay: false,
    prefixFont: 'none',
  },
)

const emit = defineEmits<{
  fontIndexChange: [index: number]
}>()

/* ── State ── */

const msElapsed = ref(0)
const isActive = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

/* ── Cleanup ── */

function clearTimer() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onBeforeUnmount(clearTimer)

/* ── Auto-play ── */

onMounted(() => {
  if (props.autoPlay) {
    isActive.value = true
    msElapsed.value = 0
    intervalId = setInterval(() => {
      msElapsed.value += TICK_MS
    }, TICK_MS)
  }
})

/* ── Per-character font indices ── */

const charFonts = computed(() => {
  const fonts: number[] = []
  let vi = 0

  for (let i = 0; i < props.text.length; i++) {
    if (props.text[i] === ' ') {
      fonts.push(-1)
      continue
    }

    switch (props.mode) {
      case 'uniform': {
        const cycles = Math.floor(msElapsed.value / props.cycleInterval)
        const idx = (props.defaultFontIndex + cycles) % FONT_COUNT
        fonts.push(idx)
        break
      }
      case 'multi': {
        const base = goldenBase(vi)
        const charMs = Math.max(0, msElapsed.value - vi * props.staggerDelay)
        const cycles = Math.floor(charMs / props.cycleInterval)
        fonts.push((base + cycles) % FONT_COUNT)
        break
      }
      case 'wave': {
        const charMs = Math.max(0, msElapsed.value - vi * props.staggerDelay)
        const cycles = Math.floor(charMs / props.cycleInterval)
        fonts.push((vi + cycles) % FONT_COUNT)
        break
      }
      case 'random': {
        const charMs = Math.max(0, msElapsed.value - vi * props.staggerDelay)
        const cycles = Math.floor(charMs / props.cycleInterval)
        fonts.push(cycles > 0 ? pseudoRandom(cycles, vi) : goldenBase(vi))
        break
      }
    }
    vi++
  }
  return fonts
})

/* ── Uniform mode callback ── */

let prevUniformIndex = props.defaultFontIndex

watch(charFonts, (fonts) => {
  if (props.mode !== 'uniform') return
  const idx = fonts.find((f) => f !== -1) ?? props.defaultFontIndex
  if (idx !== prevUniformIndex) {
    prevUniformIndex = idx
    emit('fontIndexChange', idx)
  }
})

/* ── Label ── */

const activeLabel = computed(() => {
  if (props.mode === 'uniform') {
    const idx = charFonts.value.find((f) => f !== -1) ?? 0
    return FONT_LABELS[idx]
  }
  const modeLabels: Record<PixelHeadingMode, string> = {
    uniform: '',
    multi: 'Multi',
    wave: 'Wave',
    random: 'Random',
  }
  return modeLabels[props.mode]
})

/* ── Start / stop cycling ── */

function startCycling() {
  clearTimer()
  isActive.value = true
  msElapsed.value = 0
  intervalId = setInterval(() => {
    msElapsed.value += TICK_MS
  }, TICK_MS)
}

function stopCycling() {
  if (props.autoPlay) {
    isActive.value = true
    return
  }
  isActive.value = false
  clearTimer()
}

/* ── Event handlers ── */

function handleMouseEnter() {
  startCycling()
}

function handleMouseLeave() {
  stopCycling()
}

function handleFocus() {
  startCycling()
}

function handleBlur() {
  stopCycling()
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    msElapsed.value += props.cycleInterval
  }
}

/* ── Uniform font index ── */

const uniformIdx = computed(() =>
  props.mode === 'uniform'
    ? (charFonts.value.find((f) => f !== -1) ?? props.defaultFontIndex)
    : 0,
)

/* ── Helpers for template ── */

function getCharFont(index: number): string {
  return PIXEL_FONTS[charFonts.value[index]] ?? ''
}

function getPrefixFontClass(): string | undefined {
  return props.prefixFont !== 'none' ? PREFIX_FONT_MAP[props.prefixFont] : undefined
}

function getIsolateFontClass(char: string): string | undefined {
  return props.isolate?.[char] ? resolveIsolateFont(props.isolate[char]) : undefined
}

function isIsolated(char: string): boolean {
  return !!props.isolate?.[char]
}
</script>

<template>
  <div data-slot="pixel-heading" class="inline-flex flex-col items-start gap-2">
    <component
      :is="props.as"
      :data-state="isActive ? 'active' : 'idle'"
      :data-mode="props.mode"
      :aria-label="props.prefix ? `${props.prefix} ${props.text}` : props.text"
      :tabindex="0"
      :class="
        cn(
          'cursor-default select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          props.mode === 'uniform' && PIXEL_FONTS[uniformIdx],
          props.class,
        )
      "
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
    >
      <!-- Static prefix -->
      <template v-if="props.prefix">
        <template v-if="props.isolate">
          <span
            v-for="(char, i) in props.prefix.split('')"
            :key="`p${i}`"
            :class="cn(getPrefixFontClass(), getIsolateFontClass(char))"
            aria-hidden="true"
          >{{ char }}</span>
        </template>
        <span
          v-else
          :class="getPrefixFontClass()"
          aria-hidden="true"
        >{{ props.prefix }}</span>
        <span> </span>
      </template>

      <!-- Animated characters -->
      <template v-if="props.mode === 'uniform'">
        <slot />
      </template>
      <template v-else>
        <template v-for="(char, i) in props.text.split('')" :key="i">
          <span v-if="char === ' '"> </span>
          <span
            v-else-if="isIsolated(char)"
            :class="resolveIsolateFont(props.isolate![char])"
            aria-hidden="true"
          >{{ char }}</span>
          <span
            v-else
            :class="getCharFont(i)"
            aria-hidden="true"
          >{{ char }}</span>
        </template>
      </template>
    </component>

    <output
      v-if="props.showLabel"
      data-slot="pixel-heading-label"
      aria-live="polite"
      :class="
        cn(
          'text-xs uppercase tracking-widest text-muted-foreground transition-opacity duration-200',
          isActive || props.autoPlay ? 'opacity-100' : 'opacity-0',
        )
      "
    >
      {{ activeLabel }}
    </output>
  </div>
</template>
