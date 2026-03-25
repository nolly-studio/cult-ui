<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    initialFont?: PixelFont
    hoverFont?: PixelFont
    cycleInterval?: number
    defaultFontIndex?: number
    showLabel?: boolean
    disableHover?: boolean
    disableCycling?: boolean
    class?: string
  }>(),
  {
    as: 'h1',
    initialFont: 'square',
    cycleInterval: 300,
    defaultFontIndex: 0,
    showLabel: false,
    disableHover: false,
    disableCycling: false,
  },
)

const emit = defineEmits<{
  fontIndexChange: [index: number]
}>()

const resolvedDefaultIndex = computed(() =>
  props.initialFont ? PIXEL_FONT_KEYS.indexOf(props.initialFont) : props.defaultFontIndex,
)

const hoverIndex = computed(() =>
  props.hoverFont ? PIXEL_FONT_KEYS.indexOf(props.hoverFont) : null,
)

const isSwapMode = computed(() => hoverIndex.value !== null)

const fontIndex = ref(resolvedDefaultIndex.value)
const isActive = ref(false)
let intervalRef: ReturnType<typeof setInterval> | null = null

function advanceFont() {
  fontIndex.value = (fontIndex.value + 1) % PIXEL_FONTS.length
  emit('fontIndexChange', fontIndex.value)
}

function startCycling() {
  isActive.value = true
  intervalRef = setInterval(advanceFont, props.cycleInterval)
}

function stopCycling() {
  isActive.value = false
  if (intervalRef) {
    clearInterval(intervalRef)
    intervalRef = null
  }
}

function swapToHover() {
  if (hoverIndex.value === null) return
  isActive.value = true
  fontIndex.value = hoverIndex.value
  emit('fontIndexChange', hoverIndex.value)
}

function swapToInitial() {
  isActive.value = false
  fontIndex.value = resolvedDefaultIndex.value
  emit('fontIndexChange', resolvedDefaultIndex.value)
}

function handleMouseEnter() {
  if (props.disableHover) return
  if (isSwapMode.value) {
    swapToHover()
  } else if (!props.disableCycling) {
    startCycling()
  }
}

function handleMouseLeave() {
  if (props.disableHover) return
  isSwapMode.value ? swapToInitial() : stopCycling()
}

function handleFocus() {
  if (props.disableHover) return
  isSwapMode.value ? swapToHover() : (isActive.value = true)
}

function handleBlur() {
  if (props.disableHover) return
  isSwapMode.value ? swapToInitial() : (isActive.value = false)
}

function handleKeyDown(e: KeyboardEvent) {
  if (props.disableHover || props.disableCycling) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (!isSwapMode.value) advanceFont()
  }
}

const currentFontLabel = computed(() => PIXEL_FONT_KEYS[fontIndex.value])

const headingClass = computed(() =>
  cn(
    'cursor-default select-none transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    PIXEL_FONTS[fontIndex.value],
    props.class,
  ),
)

onUnmounted(() => {
  if (intervalRef) clearInterval(intervalRef)
})
</script>

<template>
  <div data-slot="pixel-heading" class="inline-flex flex-col items-start gap-2">
    <component
      :is="props.as"
      :data-state="isActive ? 'active' : 'idle'"
      :data-font="currentFontLabel"
      :tabindex="0"
      :class="headingClass"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
    >
      <slot />
    </component>
    <output
      v-if="showLabel"
      data-slot="pixel-heading-label"
      aria-live="polite"
      :class="cn(
        'text-xs uppercase tracking-widest text-muted-foreground transition-opacity duration-200',
        isActive ? 'opacity-100' : 'opacity-0',
      )"
    >
      {{ currentFontLabel }}
    </output>
  </div>
</template>
