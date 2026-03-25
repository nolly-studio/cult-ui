<script setup lang="ts">
import { ref, provide, inject, computed, onMounted, onUnmounted, type InjectionKey, type Ref } from 'vue'
import { cn } from '@/lib/utils'

const INITIAL_WIDTH = 48

interface DockContextType {
  width: Ref<number>
  hovered: Ref<boolean>
  mouseX: Ref<number>
  animatingIndexes: Ref<number[]>
  setAnimatingIndexes: (indexes: number[]) => void
}

const DOCK_KEY: InjectionKey<DockContextType> = Symbol('dock')

export function useDock() {
  const ctx = inject(DOCK_KEY)
  if (!ctx) throw new Error('useDock must be used within a Dock')
  return ctx
}

interface Props {
  class?: string
}

const props = defineProps<Props>()

const hovered = ref(false)
const width = ref(0)
const mouseX = ref(Infinity)
const animatingIndexes = ref<number[]>([])
const dockRef = ref<HTMLDivElement | null>(null)

function setAnimatingIndexes(indexes: number[]) {
  animatingIndexes.value = indexes
}

function handleMouseMove(e: MouseEvent) {
  mouseX.value = e.pageX
  hovered.value = true
}

function handleMouseLeave() {
  mouseX.value = Infinity
  hovered.value = false
}

function handleResize() {
  width.value = dockRef.value?.clientWidth || 0
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

provide(DOCK_KEY, {
  width,
  hovered,
  mouseX,
  animatingIndexes,
  setAnimatingIndexes,
})
</script>

<template>
  <div
    ref="dockRef"
    :class="cn(
      'absolute bottom-4 left-3/4 transform -translate-x-1/2 flex items-end h-14 p-2 gap-3 bg-opacity-90 rounded-xl',
      'dark:bg-neutral-900 bg-neutral-50 p-2 no-underline shadow-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/80',
      'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
      'shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]',
      'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
      props.class
    )"
    :style="{ transform: 'translateX(-50%)' }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>
