<script setup lang="ts">
import { ref, provide, computed, type InjectionKey } from "vue"
import { Brain, ChevronDown, Dot } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ChainOfThought" })

export const CHAIN_OF_THOUGHT_KEY = Symbol("chain-of-thought") as InjectionKey<{
  isOpen: Ref<boolean>
  toggle: () => void
}>

const props = withDefaults(
  defineProps<{
    class?: string
    defaultOpen?: boolean
  }>(),
  { defaultOpen: false }
)

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
  emit("update:open", isOpen.value)
}

provide(CHAIN_OF_THOUGHT_KEY, { isOpen, toggle })
</script>

<template>
  <div :class="cn('not-prose w-full space-y-4', props.class)">
    <slot />
  </div>
</template>
