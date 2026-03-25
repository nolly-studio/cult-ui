<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
  CollapsibleRoot,
} from "radix-vue"

defineOptions({ name: "Sources" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleRoot :class="cn('not-prose mb-4 text-primary text-xs', props.class)">
    <slot />
  </CollapsibleRoot>
</template>
