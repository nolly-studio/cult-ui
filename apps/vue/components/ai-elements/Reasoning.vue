<script setup lang="ts">
import { ref, watch, onUnmounted, provide, computed, type InjectionKey, type Ref } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Reasoning" })

export interface ReasoningContext {
  isStreaming: Ref<boolean>
  isOpen: Ref<boolean>
  duration: Ref<number | undefined>
}

export const reasoningKey = Symbol("reasoning") as InjectionKey<ReasoningContext>

const props = withDefaults(
  defineProps<{
    class?: string
    isStreaming?: boolean
    defaultOpen?: boolean
    duration?: number
  }>(),
  {
    isStreaming: false,
  }
)

const modelOpen = defineModel<boolean>("open")

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

const resolvedDefaultOpen = props.defaultOpen ?? props.isStreaming
const isExplicitlyClosed = props.defaultOpen === false

const internalOpen = ref(modelOpen.value ?? resolvedDefaultOpen)
const isOpen = computed({
  get: () => modelOpen.value ?? internalOpen.value,
  set: (val: boolean) => {
    internalOpen.value = val
    modelOpen.value = val
  },
})

const internalDuration = ref<number | undefined>(props.duration)
const duration = computed(() => props.duration ?? internalDuration.value)

const hasEverStreamed = ref(props.isStreaming)
const hasAutoClosed = ref(false)
let startTime: number | null = null
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

// Track streaming start/end and compute duration
watch(
  () => props.isStreaming,
  (streaming) => {
    if (streaming) {
      hasEverStreamed.value = true
      if (startTime === null) {
        startTime = Date.now()
      }
    } else if (startTime !== null) {
      internalDuration.value = Math.ceil((Date.now() - startTime) / MS_IN_S)
      startTime = null
    }
  }
)

// Auto-open when streaming starts
watch(
  () => props.isStreaming,
  (streaming) => {
    if (streaming && !isOpen.value && !isExplicitlyClosed) {
      isOpen.value = true
    }
  }
)

// Auto-close when streaming ends (once only)
watch(
  [() => props.isStreaming, isOpen],
  ([streaming, open]) => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer)
      autoCloseTimer = null
    }
    if (hasEverStreamed.value && !streaming && open && !hasAutoClosed.value) {
      autoCloseTimer = setTimeout(() => {
        isOpen.value = false
        hasAutoClosed.value = true
      }, AUTO_CLOSE_DELAY)
    }
  }
)

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})

provide(reasoningKey, {
  isStreaming: computed(() => props.isStreaming) as unknown as Ref<boolean>,
  isOpen: isOpen as unknown as Ref<boolean>,
  duration: duration as unknown as Ref<number | undefined>,
})
</script>

<template>
  <div
    :class="cn('not-prose mb-4', props.class)"
    :data-state="isOpen ? 'open' : 'closed'"
  >
    <slot />
  </div>
</template>
