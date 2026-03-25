<script setup lang="ts">
import { computed, provide, ref, watch } from "vue"
import { cn } from "@/lib/utils"
import { stackTraceKey, parseStackTrace } from "./stack-trace-utils"

defineOptions({ name: "StackTrace" })

const props = withDefaults(
  defineProps<{
    class?: string
    trace: string
    open?: boolean
    defaultOpen?: boolean
    onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  }>(),
  {
    defaultOpen: false,
  },
)

const emit = defineEmits<{
  "update:open": [open: boolean]
}>()

const internalOpen = ref(props.defaultOpen)

const isOpen = computed({
  get: () => (props.open !== undefined ? props.open : internalOpen.value),
  set: (val: boolean) => {
    internalOpen.value = val
    emit("update:open", val)
  },
})

const parsedTrace = computed(() => parseStackTrace(props.trace))

provide(stackTraceKey, {
  trace: parsedTrace,
  raw: computed(() => props.trace),
  isOpen,
  setIsOpen: (val: boolean) => {
    isOpen.value = val
  },
  onFilePathClick: props.onFilePathClick,
})
</script>

<template>
  <div
    :class="cn(
      'not-prose w-full overflow-hidden rounded-lg border bg-background font-mono text-sm',
      props.class
    )"
  >
    <slot />
  </div>
</template>
