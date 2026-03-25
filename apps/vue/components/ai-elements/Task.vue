<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleRoot } from "radix-vue"

defineOptions({ name: "Task" })

const props = withDefaults(
  defineProps<{
    class?: string
    defaultOpen?: boolean
  }>(),
  {
    defaultOpen: true,
  },
)
</script>

<template>
  <CollapsibleRoot :class="cn(props.class)" :default-open="props.defaultOpen">
    <slot />
  </CollapsibleRoot>
</template>
