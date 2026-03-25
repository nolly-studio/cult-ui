<script setup lang="ts">
import { ref, computed, watch, onUnmounted, type Component, type VNode, nextTick } from 'vue'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/composables/useClickOutside'

interface DynamicStep {
  id: string
  title: string
  description: string
  icon: Component
  content?: VNode | string
}

const props = withDefaults(defineProps<{
  steps: DynamicStep[]
  badgeText?: string
  class?: string
  expanded?: boolean
  activeStep?: string | null
}>(), {
  expanded: undefined,
  activeStep: undefined,
})

const emit = defineEmits<{
  'update:expanded': [value: boolean]
  'update:activeStep': [value: string | null]
}>()

// Internal state
const internalActive = ref<string | null>(null)
const internalIsOpen = ref(false)
const previousIndex = ref<number | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const menuContainerRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)
const maxWidth = ref(0)

// Controlled vs uncontrolled
const active = computed({
  get: () => props.activeStep !== undefined ? props.activeStep : internalActive.value,
  set: (val: string | null) => {
    if (props.activeStep !== undefined) {
      emit('update:activeStep', val)
    } else {
      internalActive.value = val
    }
  },
})

const isOpen = computed({
  get: () => props.expanded !== undefined ? props.expanded : internalIsOpen.value,
  set: (val: boolean) => {
    if (props.expanded !== undefined) {
      emit('update:expanded', val)
    } else {
      internalIsOpen.value = val
    }
  },
})

// Measure content height
let resizeObserver: ResizeObserver | null = null

function measureContent() {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.getBoundingClientRect().height
  }
}

watch(contentRef, (el) => {
  if (resizeObserver) resizeObserver.disconnect()
  if (el) {
    resizeObserver = new ResizeObserver(() => measureContent())
    resizeObserver.observe(el)
    measureContent()
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

// Click outside
function handleClickOutside(event: MouseEvent | TouchEvent) {
  const el = containerRef.value
  if (!el || el.contains(event.target as Node)) return
  isOpen.value = false
  active.value = null
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})

// Scroll button into view
function scrollButtonIntoView(currentIndex: number, prevIndex: number | null) {
  if (!menuContainerRef.value) return

  const isMovingForward = prevIndex !== null && currentIndex > prevIndex
  const isMovingBackward = prevIndex !== null && currentIndex < prevIndex

  let targetIndex = currentIndex

  if (isMovingForward) {
    const nextIndex = currentIndex + 1
    if (nextIndex < props.steps.length) targetIndex = nextIndex
  } else if (isMovingBackward) {
    const prevIdx = currentIndex - 1
    if (prevIdx >= 0) targetIndex = prevIdx
  }

  const targetButton = menuContainerRef.value.querySelector(
    `[data-step-index="${targetIndex}"]`
  ) as HTMLElement

  if (targetButton) {
    targetButton.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
}

function handleNavClick(itemId: string) {
  if (active.value === itemId && isOpen.value) {
    isOpen.value = false
    active.value = null
    return
  }

  const currentIndex = props.steps.findIndex((step) => step.id === itemId)
  active.value = itemId
  isOpen.value = true

  if (currentIndex >= 0) {
    nextTick(() => {
      setTimeout(() => {
        scrollButtonIntoView(currentIndex, previousIndex.value)
        measureContent()
      }, 100)
    })
    previousIndex.value = currentIndex
  }
}

const activeTitle = computed(() => {
  if (!active.value) return ''
  const step = props.steps.find((s) => s.id === active.value)
  return step?.title || ''
})

const activeStep = computed(() => {
  if (!active.value) return null
  return props.steps.find((s) => s.id === active.value) || null
})

const navigationButtons = computed(() =>
  props.steps.map((step, index) => ({
    id: step.id,
    label: step.title,
    step: (index + 1).toString(),
    isActive: active.value === step.id,
    isFirst: index === 0,
    isLast: index === props.steps.length - 1,
    index,
  }))
)

// Watch for active changes to remeasure content
watch(active, () => {
  nextTick(() => measureContent())
})
</script>

<template>
  <div
    :class="cn(
      'space-y-2 w-full max-w-sm sm:max-w-lg mx-auto px-2 sm:px-0',
      props.class
    )"
  >
    <span
      v-if="badgeText"
      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-muted border-border text-muted-foreground"
    >
      {{ badgeText }}
    </span>

    <div
      ref="containerRef"
      class="w-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,252,240,0.08),0px_2px_2px_rgba(0,0,0,0.2),0px_8px_16px_-4px_rgba(0,0,0,0.3)] bg-background overflow-hidden"
    >
      <div class="rounded-2xl">
        <!-- Expandable content -->
        <div class="overflow-hidden">
          <Transition name="expand">
            <div
              v-if="isOpen && activeStep"
              class="overflow-hidden"
              :style="{ height: contentHeight ? `${contentHeight}px` : 'auto' }"
            >
              <div ref="contentRef" class="pt-2 px-2 sm:px-2">
                <h4 class="text-sm font-medium text-foreground px-2">
                  {{ activeTitle }}
                </h4>

                <div class="pb-1">
                  <div class="shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.8)] bg-muted/50 rounded-[0.8rem] px-3 py-4 mt-3 mb-2">
                    <div class="space-y-4 pb-3">
                      <div class="space-y-2">
                        <h3 class="text-lg font-medium text-foreground">
                          {{ activeStep.title }}
                        </h3>
                        <p class="text-sm text-muted-foreground">{{ activeStep.description }}</p>
                      </div>
                      <slot :name="`step-${activeStep.id}`" :step="activeStep">
                        <component v-if="activeStep.content" :is="activeStep.content" />
                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation bar -->
        <div class="relative z-10">
          <div
            ref="menuContainerRef"
            class="w-full overflow-x-auto scrollbar-hide"
          >
            <div class="flex items-center p-[1px] w-max min-w-full">
              <button
                v-for="button in navigationButtons"
                :key="button.id"
                :data-step-index="button.index"
                :class="cn(
                  'text-sm text-muted-foreground transition-colors py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[44px] sm:min-h-0',
                  button.isActive
                    ? 'text-foreground font-medium bg-muted/50'
                    : 'hover:bg-muted/60 active:bg-muted/70'
                )"
                @click="handleNavClick(button.id)"
              >
                <div class="text-[10px] w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center shadow-[0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_0px_0px_1px_rgba(255,255,255,0.25)] dark:shadow-[0px_1px_1px_0px_hsla(0,0%,100%,0.02)_inset,0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.25)] font-bold rounded-md transition-all duration-300">
                  <span
                    :class="cn(
                      'w-full rounded-md',
                      button.isActive
                        ? 'bg-blue-300/20 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                        : 'bg-muted/50 text-muted-foreground'
                    )"
                  >
                    {{ button.step }}
                  </span>
                </div>
                <span class="text-xs sm:text-sm font-medium text-foreground">
                  {{ button.label }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.25s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0 !important;
  opacity: 0;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
