<script setup lang="ts">
import { TooltipTrigger } from "radix-vue"

defineOptions({ name: "TooltipTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <TooltipTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </TooltipTrigger>
</template>
