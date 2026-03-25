<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { PIXEL_FONTS, PIXEL_FONT_MAP, PLAIN_FONT_MAP } from '@/lib/pixel-fonts'

const FONT_LABELS = ['Square', 'Grid', 'Circle', 'Triangle', 'Line'] as const
const FONT_COUNT = PIXEL_FONTS.length

const PREFIX_FONT_MAP = PIXEL_FONT_MAP

const ISOLATE_FONT_MAP: Record<string, string> = {
  sans: PLAIN_FONT_MAP.sans,
  mono: PLAIN_FONT_MAP.mono,
}

function resolveIsolateFont(value: string): string {
  return ISOLATE_FONT_MAP[value] ?? value
}

const PHI = (1 + Math.sqrt(5)) / 2
const TICK_MS = 50

function goldenBase(index: number): number {
  return Math.floor((index * PHI * FONT_COUNT) % FONT_COUNT)
}

function pseudoRandom(tick: number, index: number): number {
  return ((tick * 2654435761 + index * 340573321) >>> 0) % FONT_COUNT
}

type PixelHeadingMode = 'uniform' | 'multi' | 'wave' | 'random'

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    cycleInterval?: number
    defaultFontIndex?: number
    showLabel?: boolean
    mode?: PixelHeadingMode
    staggerDelay?: number
    autoPlay?: boolean
    prefix?: string
    prefixFont?: 'square' | 'grid' | 'circle' | 'triangle' | 'line' | 'none'
    isolate?: Record<string, string>
    text?: string
    class?: string
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

// The text to animate — passed as prop since Vue slots are opaque
const text = computed(() => props.text ?? '')

const msElapsed = ref(0)
const isActive = ref(false)
let intervalRef: ReturnType<typeof setInterval> | null = null

// Cleanup
onUnmounted(() => {
  if (intervalRef) clearInterval(intervalRef)
})

// Auto-play
onMounted(() => {
  if (!props.autoPlay) return
  isActive.value = true
  msElapsed.value = 0
  intervalRef = setInterval(() => {
    msElapsed.value += TICK_MS
  }, TICK_MS)
})

// Compute per-character font indices
const charFonts = computed(() => {
  const fonts: number[] = []
  let vi = 0

  for (let i = 0; i < text.value.length; i++) {
    if (text.value[i] === ' ') {
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

function startCycling() {
  if (intervalRef) {
    clearInterval(intervalRef)
    intervalRef = null
  }
  isActive.value = true
  msElapsed.value = 0
  intervalRef = setInterval(() => {
    msElapsed.value += TICK_MS
  }, TICK_MS)
}

function stopCycling() {
  if (props.autoPlay) {
    isActive.value = true
    return
  }
  isActive.value = false
  if (intervalRef) {
    clearInterval(intervalRef)
    intervalRef = null
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    msElapsed.value += props.cycleInterval
  }
}

const uniformIdx = computed(() =>
  props.mode === 'uniform'
    ? (charFonts.value.find((f) => f !== -1) ?? props.defaultFontIndex)
    : 0,
)

const headingClass = computed(() =>
  cn(
    'cursor-default select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.mode === 'uniform' ? PIXEL_FONTS[uniformIdx.value] : undefined,
    props.class,
  ),
)

const ariaLabel = computed(() =>
  props.prefix ? `${props.prefix} ${text.value}` : text.value,
)

const textChars = computed(() => text.value.split(''))

const prefixChars = computed(() => props.prefix?.split('') ?? [])
</script>

<template>
  <div data-slot="pixel-heading" class="inline-flex flex-col items-start gap-2">
    <component
      :is="props.as"
      :data-state="isActive ? 'active' : 'idle'"
      :data-mode="props.mode"
      :aria-label="ariaLabel"
      :tabindex="0"
      :class="headingClass"
      @mouseenter="startCycling"
      @mouseleave="stopCycling"
      @focus="startCycling"
      @blur="stopCycling"
      @keydown="handleKeyDown"
    >
      <!-- Static prefix -->
      <template v-if="props.prefix">
        <template v-if="props.isolate">
          <span
            v-for="(char, i) in prefixChars"
            :key="`p${i}`"
            :class="cn(
              prefixFont !== 'none' ? PREFIX_FONT_MAP[prefixFont] : undefined,
              isolate?.[char] ? resolveIsolateFont(isolate[char]) : undefined,
            )"
            aria-hidden="true"
          >{{ char }}</span>
        </template>
        <span
          v-else
          :class="prefixFont !== 'none' ? PREFIX_FONT_MAP[prefixFont] : undefined"
          aria-hidden="true"
        >{{ props.prefix }}</span>
        <span> </span>
      </template>

      <!-- Animated characters -->
      <template v-if="mode === 'uniform'">
        <slot />
      </template>
      <template v-else>
        <template v-for="(char, i) in textChars" :key="i">
          <span v-if="char === ' '"> </span>
          <span
            v-else-if="isolate?.[char]"
            :class="resolveIsolateFont(isolate[char])"
            aria-hidden="true"
          >{{ char }}</span>
          <span
            v-else
            :class="PIXEL_FONTS[charFonts[i]]"
            aria-hidden="true"
          >{{ char }}</span>
        </template>
      </template>
    </component>

    <output
      v-if="showLabel"
      data-slot="pixel-heading-label"
      aria-live="polite"
      :class="cn(
        'text-xs uppercase tracking-widest text-muted-foreground transition-opacity duration-200',
        isActive || autoPlay ? 'opacity-100' : 'opacity-0',
      )"
    >
      {{ activeLabel }}
    </output>
  </div>
</template>
