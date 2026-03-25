<script setup lang="ts">
/**
 * Animated logo carousel with cycling columns.
 * Logos rotate through columns with staggered timing.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

export interface LogoItem {
  name: string
  id: number
  imgSrc?: string
}

const props = withDefaults(defineProps<{
  logos?: LogoItem[]
  columnCount?: number
  cycleInterval?: number
  class?: string
}>(), {
  logos: () => [],
  columnCount: 4,
  cycleInterval: 2000,
})

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr]
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

function distributeLogos(allLogos: LogoItem[], colCount: number): LogoItem[][] {
  const shuffled = shuffleArray(allLogos)
  const columns: LogoItem[][] = Array.from({ length: colCount }, () => [])

  shuffled.forEach((logo, i) => {
    columns[i % colCount].push(logo)
  })

  const maxLen = Math.max(...columns.map(c => c.length))
  columns.forEach(col => {
    while (col.length < maxLen) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const currentTime = ref(0)
let animFrame: number
let startTime: number

const columns = computed(() => distributeLogos(props.logos, props.columnCount))

function getCurrentIndex(colIndex: number, logosInCol: number) {
  const columnDelay = colIndex * 200
  const adjustedTime = (currentTime.value + columnDelay) % (props.cycleInterval * logosInCol)
  return Math.floor(adjustedTime / props.cycleInterval)
}

function tick(timestamp: number) {
  if (!startTime) startTime = timestamp
  currentTime.value = timestamp - startTime
  animFrame = requestAnimationFrame(tick)
}

onMounted(() => {
  startTime = 0
  animFrame = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})
</script>

<template>
  <div :class="cn('flex items-center justify-center gap-4 md:gap-8', props.class)">
    <div
      v-for="(col, colIndex) in columns"
      :key="colIndex"
      class="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
    >
      <TransitionGroup name="logo-swap">
        <div
          v-for="(logo, logoIndex) in col"
          v-show="getCurrentIndex(colIndex, col.length) === logoIndex"
          :key="logo.id"
          class="absolute inset-0 flex items-center justify-center"
        >
          <img
            v-if="logo.imgSrc"
            :src="logo.imgSrc"
            :alt="logo.name"
            class="max-h-full max-w-full object-contain opacity-70 transition-opacity hover:opacity-100"
          />
          <span v-else class="text-xs font-medium text-muted-foreground md:text-sm">
            {{ logo.name }}
          </span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.logo-swap-enter-active,
.logo-swap-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.logo-swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.logo-swap-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
