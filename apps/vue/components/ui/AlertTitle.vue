<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "AlertTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <h5
    :class="
      cn('mb-1 font-medium leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </h5>
</template>
