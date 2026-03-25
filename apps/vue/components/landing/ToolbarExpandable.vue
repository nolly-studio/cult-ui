<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from '@/lib/utils'

interface DynamicStep {
  id: string
  title: string
  description: string
  icon: string
}

const props = withDefaults(
  defineProps<{
    steps: DynamicStep[]
    badgeText?: string
    class?: string
    expanded?: boolean
    activeStep?: string | null
  }>(),
  {
    expanded: undefined,
    activeStep: undefined,
  },
)

const emit = defineEmits<{
  'update:expanded': [value: boolean]
  'update:activeStep': [value: string | null]
}>()

const internalActive = ref<string | null>(null)
const internalIsOpen = ref(false)

const active = computed(() =>
  props.activeStep !== undefined ? props.activeStep : internalActive.value,
)
const isOpen = computed(() =>
  props.expanded !== undefined ? props.expanded : internalIsOpen.value,
)

function setActive(value: string | null) {
  if (props.activeStep !== undefined) {
    emit('update:activeStep', value)
  } else {
    internalActive.value = value
  }
}

function setIsOpen(value: boolean) {
  if (props.expanded !== undefined) {
    emit('update:expanded', value)
  } else {
    internalIsOpen.value = value
  }
}

const containerRef = ref<HTMLDivElement | null>(null)
const contentRef = ref<HTMLDivElement | null>(null)
const contentHeight = ref(0)

watch([active, isOpen], async () => {
  await nextTick()
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
})

function handleNavClick(item: string) {
  if (active.value === item && isOpen.value) {
    setIsOpen(false)
    setActive(null)
    return
  }
  setActive(item)
  setIsOpen(true)
}

function handleClickOutside(event: MouseEvent | TouchEvent) {
  const el = containerRef.value
  if (!el || el.contains(event.target as Node)) return
  setIsOpen(false)
  setActive(null)
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})

const activeStepData = computed(() => {
  if (!active.value) return null
  return props.steps.find((s) => s.id === active.value) ?? null
})
</script>

<template>
  <div
    :class="cn('mx-auto w-full max-w-sm space-y-2 px-2 sm:max-w-lg sm:px-0', props.class)"
  >
    <span
      v-if="badgeText"
      class="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
    >
      {{ badgeText }}
    </span>

    <div
      ref="containerRef"
      class="w-full overflow-hidden rounded-2xl bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,252,240,0.08),0px_2px_2px_rgba(0,0,0,0.2),0px_8px_16px_-4px_rgba(0,0,0,0.3)]"
    >
      <div class="rounded-2xl">
        <!-- Expanded content -->
        <div
          class="overflow-hidden transition-all duration-300"
          :style="{ height: isOpen ? `${contentHeight}px` : '0px' }"
        >
          <div ref="contentRef" class="px-2 pt-2 sm:px-2">
            <h4 class="px-2 text-sm font-medium text-foreground">
              {{ activeStepData?.title }}
            </h4>

            <div class="pb-1">
              <div
                class="mb-2 mt-3 rounded-[0.8rem] bg-muted/50 px-3 py-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.8)]"
              >
                <div class="space-y-4 pb-3">
                  <div class="space-y-2">
                    <h3 class="text-lg font-medium text-foreground">
                      {{ activeStepData?.title }}
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      {{ activeDescription }}
                    </p>
                  </div>
                  <!-- Step content slot -->
                  <slot :name="`step-${active}`" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation bar -->
        <div class="relative z-10">
          <div class="flex w-max min-w-full items-center overflow-x-auto p-px scrollbar-hide">
            <button
              v-for="(step, index) in steps"
              :key="step.id"
              :data-step-index="index"
              :class="cn(
                'flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap p-3 text-sm text-muted-foreground transition-colors sm:min-h-0 sm:p-4',
                active === step.id
                  ? 'bg-muted/50 font-medium text-foreground'
                  : 'hover:bg-muted/60 active:bg-muted/70',
              )"
              @click="handleNavClick(step.id)"
            >
              <div
                class="flex size-5 items-center justify-center rounded-md text-[10px] font-bold shadow-[0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_0px_0px_1px_rgba(255,255,255,0.25)] transition-all duration-300 dark:shadow-[0px_1px_1px_0px_hsla(0,0%,100%,0.02)_inset,0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.25)] sm:size-5"
              >
                <span
                  :class="cn(
                    'w-full rounded-md',
                    active === step.id
                      ? 'bg-blue-300/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                      : 'bg-muted/50 text-muted-foreground',
                  )"
                >
                  {{ index + 1 }}
                </span>
              </div>
              <span class="text-xs font-medium text-foreground sm:text-sm">
                {{ step.title }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
