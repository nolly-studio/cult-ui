<script setup lang="ts">
import { DropdownMenuTrigger } from "radix-vue"

defineOptions({ name: "DropdownMenuTrigger" })

defineProps<{ asChild?: boolean; disabled?: boolean }>()
</script>

<template>
  <DropdownMenuTrigger :as-child="asChild" :disabled="disabled" v-bind="$attrs">
    <slot />
  </DropdownMenuTrigger>
</template>
