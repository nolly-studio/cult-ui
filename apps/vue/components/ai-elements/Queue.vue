<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Queue" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'flex flex-col gap-2 rounded-xl border border-border bg-background px-3 pt-2 pb-2 shadow-xs',
      props.class
    )"
  >
    <slot />
  </div>
</template>
