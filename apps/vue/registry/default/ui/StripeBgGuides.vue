<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

type AnimationDirection = 'top-to-bottom' | 'bottom-to-top' | 'both' | 'random'
type AnimationEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring'

const props = withDefaults(
  defineProps<{
    columnCount?: number
    class?: string
    solidLines?: number[]
    animated?: boolean
    animationDuration?: number
    animationDelay?: number
    glowColor?: string
    glowSize?: string
    glowOpacity?: number
    randomize?: boolean
    randomInterval?: number
    direction?: AnimationDirection
    easing?: AnimationEasing
    responsive?: boolean
    minColumnWidth?: string
    maxActiveColumns?: number
    darkMode?: boolean
    contained?: boolean
  }>(),
  {
    columnCount: 4,
    class: undefined,
    solidLines: () => [],
    animated: true,
    animationDuration: 62,
    animationDelay: 0.8,
    glowColor: 'hsl(var(--accent))',
    glowSize: '10vh',
    glowOpacity: 0.4,
    randomize: true,
    randomInterval: 9000,
    direction: 'both',
    easing: 'spring',
    responsive: false,
    minColumnWidth: '4rem',
    maxActiveColumns: 3,
    darkMode: false,
    contained: false,
  }
)

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

const columns = computed(() => {
  const count = props.responsive
    ? Math.max(Math.floor(windowWidth.value / parseInt(props.minColumnWidth)), 1)
    : props.columnCount
  return Array.from({ length: count })
})

const activeColumns = ref<boolean[]>(columns.value.map(() => true))

function getRandomColumns(): boolean[] {
  const newActiveColumns = columns.value.map(() => Math.random() < 0.5)
  const activeCount = newActiveColumns.filter(Boolean).length
  if (activeCount > props.maxActiveColumns) {
    const indicesToDeactivate = newActiveColumns
      .map((isActive, index) => (isActive ? index : -1))
      .filter((index) => index !== -1)
      .sort(() => Math.random() - 0.5)
      .slice(0, activeCount - props.maxActiveColumns)
    indicesToDeactivate.forEach((index) => {
      newActiveColumns[index] = false
    })
  }
  return newActiveColumns
}

const lineColors = computed(() => ({
  solid: props.darkMode ? 'hsl(233 14% 13%)' : 'hsl(233 14.1% 96.1%)',
  dashed: props.darkMode ? 'hsl(233 14% 20%)' : 'hsl(233 14% 93%)',
}))

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: props.responsive
    ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
    : `repeat(${props.columnCount}, minmax(0, 1fr))`,
  gap: '2rem',
}))

function getLinePosition(index: number): string {
  if (index === 0) return 'left-0'
  if (index === columns.value.length - 1) return 'right-0'
  return 'left-1/2'
}

function getLineStyle(index: number): Record<string, string> {
  if (props.solidLines.includes(index + 1)) {
    return { background: lineColors.value.solid }
  }
  return {
    backgroundImage: `linear-gradient(to bottom, ${lineColors.value.dashed} 50%, transparent 50%)`,
    backgroundSize: '1px 8px',
  }
}

function getGlowStyle(): Record<string, string | number> {
  return {
    height: props.glowSize,
    background: `linear-gradient(to bottom, transparent, ${props.glowColor}, ${
      props.darkMode ? 'black' : 'white'
    })`,
    opacity: props.glowOpacity,
  }
}

// Glow animation via CSS
const glowAnimationName = computed(() => {
  if (props.direction === 'top-to-bottom') return 'stripe-glow-ttb'
  if (props.direction === 'bottom-to-top') return 'stripe-glow-btt'
  return 'stripe-glow-both'
})

function getGlowAnimStyle(index: number): Record<string, string | number> {
  return {
    ...getGlowStyle(),
    position: 'absolute',
    width: '100%',
    animationName: glowAnimationName.value,
    animationDuration: `${props.animationDuration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDelay: `${index * props.animationDelay}s`,
  }
}

let resizeHandler: (() => void) | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

watch(columns, () => {
  activeColumns.value = columns.value.map(() => true)
})

watch(
  () => [props.randomize, props.animated, props.randomInterval],
  () => {
    if (intervalId) clearInterval(intervalId)
    if (props.randomize && props.animated) {
      intervalId = setInterval(() => {
        activeColumns.value = getRandomColumns()
      }, props.randomInterval)
    } else {
      activeColumns.value = columns.value.map(() => true)
    }
  },
  { immediate: true }
)

onMounted(() => {
  resizeHandler = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div
    :class="[
      'pointer-events-none',
      contained ? 'absolute inset-0' : 'fixed inset-0',
      props.class,
    ]"
    aria-hidden="true"
    :style="{ zIndex: contained ? 0 : -1 }"
  >
    <div class="z-0 h-full w-full px-4 sm:px-6 lg:px-24">
      <div class="mx-auto h-full w-full" :style="gridStyle">
        <div
          v-for="(_, index) in columns"
          :key="index"
          class="relative h-full"
        >
          <div
            :class="[
              'absolute inset-y-0 w-px overflow-hidden',
              getLinePosition(index),
              solidLines.includes(index + 1) ? 'bg-gray-300' : 'bg-gradient-to-b',
            ]"
            :style="getLineStyle(index)"
          >
            <Transition name="fade">
              <div
                v-if="animated && activeColumns[index]"
                :style="getGlowAnimStyle(index)"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes stripe-glow-ttb {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

@keyframes stripe-glow-btt {
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
}

@keyframes stripe-glow-both {
  0% {
    top: 100%;
  }
  50% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
