<script setup lang="ts">
import { PopoverTrigger } from "radix-vue"

defineOptions({ name: "PopoverTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <PopoverTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </PopoverTrigger>
</template>
