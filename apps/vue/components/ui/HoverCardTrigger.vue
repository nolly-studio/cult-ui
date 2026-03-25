<script setup lang="ts">
import { HoverCardTrigger } from "radix-vue"

defineOptions({ name: "HoverCardTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <HoverCardTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </HoverCardTrigger>
</template>
