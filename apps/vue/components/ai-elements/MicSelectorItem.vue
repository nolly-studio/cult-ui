<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { MIC_SELECTOR_KEY } from "./MicSelector.vue"

defineOptions({ name: "MicSelectorItem" })

const props = defineProps<{
  class?: string
  value: string
}>()

const ctx = inject(MIC_SELECTOR_KEY)!

function handleSelect() {
  ctx.onValueChange(props.value)
  ctx.onOpenChange(false)
}
</script>

<template>
  <div
    :class="cn('cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent', props.class)"
    @click="handleSelect"
  >
    <slot />
  </div>
</template>
