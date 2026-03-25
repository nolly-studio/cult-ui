<script setup lang="ts">
import { TooltipProvider } from "radix-vue"

defineOptions({ name: "TooltipProvider" })

defineProps<{
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}>()
</script>

<template>
  <TooltipProvider
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
  >
    <slot />
  </TooltipProvider>
</template>
