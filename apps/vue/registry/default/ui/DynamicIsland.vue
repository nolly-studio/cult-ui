<script setup lang="ts">
import { ref, provide, inject, computed, watch, onMounted, onUnmounted, type InjectionKey, type Ref } from 'vue'

const stiffness = 400
const damping = 30
const MIN_WIDTH = 691
const MAX_HEIGHT_MOBILE_ULTRA = 400
const MAX_HEIGHT_MOBILE_MASSIVE = 700

export type SizePresets =
  | 'reset' | 'empty' | 'default' | 'compact' | 'compactLong'
  | 'large' | 'long' | 'minimalLeading' | 'minimalTrailing'
  | 'compactMedium' | 'medium' | 'tall' | 'ultra' | 'massive'

const SIZE_PRESETS = {
  RESET: 'reset', EMPTY: 'empty', DEFAULT: 'default', COMPACT: 'compact',
  COMPACT_LONG: 'compactLong', LARGE: 'large', LONG: 'long',
  MINIMAL_LEADING: 'minimalLeading', MINIMAL_TRAILING: 'minimalTrailing',
  COMPACT_MEDIUM: 'compactMedium', MEDIUM: 'medium', TALL: 'tall',
  ULTRA: 'ultra', MASSIVE: 'massive',
} as const

interface Preset {
  width: number
  height?: number
  aspectRatio: number
  borderRadius: number
}

const DynamicIslandSizePresets: Record<SizePresets, Preset> = {
  reset: { width: 150, aspectRatio: 1, borderRadius: 20 },
  empty: { width: 0, aspectRatio: 0, borderRadius: 0 },
  default: { width: 150, aspectRatio: 44 / 150, borderRadius: 46 },
  minimalLeading: { width: 52.33, aspectRatio: 44 / 52.33, borderRadius: 22 },
  minimalTrailing: { width: 52.33, aspectRatio: 44 / 52.33, borderRadius: 22 },
  compact: { width: 235, aspectRatio: 44 / 235, borderRadius: 46 },
  compactLong: { width: 300, aspectRatio: 44 / 235, borderRadius: 46 },
  compactMedium: { width: 351, aspectRatio: 64 / 371, borderRadius: 44 },
  long: { width: 371, aspectRatio: 84 / 371, borderRadius: 42 },
  medium: { width: 371, aspectRatio: 210 / 371, borderRadius: 22 },
  large: { width: 371, aspectRatio: 84 / 371, borderRadius: 42 },
  tall: { width: 371, aspectRatio: 210 / 371, borderRadius: 42 },
  ultra: { width: 630, aspectRatio: 630 / 800, borderRadius: 42 },
  massive: { width: 891, height: 1900, aspectRatio: 891 / 891, borderRadius: 42 },
}

interface BlobContextType {
  size: Ref<SizePresets>
  previousSize: Ref<SizePresets | undefined>
  isAnimating: Ref<boolean>
  setSize: (size: SizePresets) => void
  scheduleAnimation: (steps: Array<{ size: SizePresets; delay: number }>) => void
  presets: Record<SizePresets, Preset>
}

const BLOB_KEY: InjectionKey<BlobContextType> = Symbol('dynamic-island')

function useDynamicIslandSize() {
  const ctx = inject(BLOB_KEY)
  if (!ctx) throw new Error('useDynamicIslandSize must be used within a DynamicIslandProvider')
  return ctx
}

// Props
interface Props {
  id: string
  initialSize?: SizePresets
  initialAnimation?: Array<{ size: SizePresets; delay: number }>
}

const props = withDefaults(defineProps<Props>(), {
  initialSize: 'default',
  initialAnimation: () => [],
})

// State
const size = ref<SizePresets>(props.initialSize)
const previousSize = ref<SizePresets | undefined>('empty')
const isAnimating = ref(props.initialAnimation.length > 0)
const animationQueue = ref<Array<{ size: SizePresets; delay: number }>>(props.initialAnimation)
const screenSize = ref('desktop')

function setSize(newSize: SizePresets) {
  if (previousSize.value !== newSize && newSize !== size.value) {
    previousSize.value = size.value
    size.value = newSize
  }
}

function scheduleAnimation(steps: Array<{ size: SizePresets; delay: number }>) {
  animationQueue.value = steps
  isAnimating.value = steps.length > 0
}

// Process animation queue
watch(animationQueue, async (queue) => {
  if (queue.length > 0) {
    for (const step of queue) {
      await new Promise((resolve) => setTimeout(resolve, step.delay))
      previousSize.value = size.value
      size.value = step.size
    }
    isAnimating.value = false
  }
})

// Screen size
function handleResize() {
  if (window.innerWidth <= 640) screenSize.value = 'mobile'
  else if (window.innerWidth <= 1024) screenSize.value = 'tablet'
  else screenSize.value = 'desktop'
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Dimensions
const dimensions = computed(() => {
  const currentSize = DynamicIslandSizePresets[size.value]
  const isMassiveOnMobile = size.value === 'massive' && screenSize.value === 'mobile'
  const isUltraOnMobile = size.value === 'ultra' && screenSize.value === 'mobile'

  if (isMassiveOnMobile) return { width: '350px', height: MAX_HEIGHT_MOBILE_MASSIVE }
  if (isUltraOnMobile) return { width: '350px', height: MAX_HEIGHT_MOBILE_ULTRA }

  const w = Math.min(currentSize.width, MIN_WIDTH)
  return { width: `${w}px`, height: currentSize.aspectRatio * w }
})

const currentPreset = computed(() => DynamicIslandSizePresets[size.value])

provide(BLOB_KEY, {
  size,
  previousSize,
  isAnimating,
  setSize,
  scheduleAnimation,
  presets: DynamicIslandSizePresets,
})
</script>

<template>
  <div class="z-10 flex h-full w-full items-end justify-center bg-transparent">
    <div
      :id="id"
      class="mx-auto h-0 w-0 items-center justify-center border border-black/10 bg-black text-center text-black transition duration-300 ease-in-out focus-within:bg-neutral-900 hover:shadow-md dark:border dark:border-white/5 dark:focus-within:bg-black overflow-hidden"
      :style="{
        width: dimensions.width,
        height: `${dimensions.height}px`,
        borderRadius: `${currentPreset.borderRadius}px`,
        transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }"
    >
      <slot />
    </div>
  </div>
</template>
