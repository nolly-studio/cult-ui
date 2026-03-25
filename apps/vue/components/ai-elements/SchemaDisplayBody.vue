<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SchemaDisplayBody" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('divide-y', props.class)">
    <slot />
  </div>
</template>
