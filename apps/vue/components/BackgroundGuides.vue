<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { AnimatePresence, Motion } from 'motion-v'

type AnimationDirection = 'top-to-bottom' | 'bottom-to-top' | 'both' | 'random'
type AnimationEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring'

interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
  columnCount: 4,
  class: '',
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
})

const easingFunctions = {
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
}

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

const columns = computed(() => {
  const count = props.responsive
    ? Math.max(Math.floor(windowWidth.value / parseInt(props.minColumnWidth)), 1)
    : props.columnCount
  return [...Array(count)]
})

const activeColumns = ref<boolean[]>([])

function getRandomColumns() {
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

const animationVariants = computed(() => {
  const variants = {
    'top-to-bottom': {
      initial: { top: '-100%' },
      animate: { top: '100%' },
    },
    'bottom-to-top': {
      initial: { top: '100%' },
      animate: { top: '-100%' },
    },
    both: {
      initial: { top: '100%' },
      animate: { top: ['-100%', '100%'] },
    },
    random: {
      initial: () => ({ top: Math.random() < 0.5 ? '-100%' : '100%' }),
      animate: () => ({ top: Math.random() < 0.5 ? '-100%' : '100%' }),
    },
  }
  return variants[props.direction] || variants['top-to-bottom']
})

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

function getInitial() {
  const init = animationVariants.value.initial
  return typeof init === 'function' ? init() : init
}

function getAnimate() {
  const anim = animationVariants.value.animate
  return typeof anim === 'function' ? anim() : anim
}

let resizeHandler: (() => void) | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

watch(columns, () => {
  activeColumns.value = columns.value.map(() => true)
}, { immediate: true })

watch(
  () => [props.randomize, props.animated, props.randomInterval],
  () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
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
  resizeHandler = () => { windowWidth.value = window.innerWidth }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (intervalId) clearInterval(intervalId)
})

function getColumnPositionClass(index: number) {
  if (index === 0) return 'left-0'
  if (index === columns.value.length - 1) return 'right-0'
  return 'left-1/2'
}

function getLineStyle(index: number) {
  if (props.solidLines.includes(index + 1)) {
    return { background: lineColors.value.solid }
  }
  return {
    backgroundImage: `linear-gradient(to bottom, ${lineColors.value.dashed} 50%, transparent 50%)`,
    backgroundSize: '1px 8px',
  }
}

function getGlowStyle() {
  return {
    height: props.glowSize,
    background: `linear-gradient(to bottom, transparent, ${props.glowColor}, ${props.darkMode ? 'black' : 'white'})`,
    opacity: props.glowOpacity,
  }
}
</script>

<template>
  <div
    :class="['pointer-events-none fixed inset-0', props.class]"
    aria-hidden="true"
    :style="{ zIndex: -1 }"
  >
    <div class="z-0 size-full px-4 sm:px-6 lg:px-24">
      <div class="mx-auto size-full" :style="gridStyle">
        <div
          v-for="(_, index) in columns"
          :key="index"
          class="relative h-full"
        >
          <div
            :class="[
              'absolute inset-y-0 w-px overflow-hidden',
              getColumnPositionClass(index),
              solidLines.includes(index + 1) ? 'bg-gray-300' : 'bg-gradient-to-b',
            ]"
            :style="getLineStyle(index)"
          >
            <AnimatePresence>
              <Motion
                v-if="animated && activeColumns[index]"
                :key="`glow-${index}`"
                class="absolute w-full"
                :style="getGlowStyle()"
                :initial="getInitial()"
                :animate="getAnimate()"
                :exit="getInitial()"
                :transition="{
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: easingFunctions[easing],
                  delay: index * animationDelay,
                }"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
