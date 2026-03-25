<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Progress" })

const props = withDefaults(
  defineProps<{
    class?: string
    modelValue?: number | null
    max?: number
  }>(),
  { modelValue: 0, max: 100 }
)
</script>

<template>
  <ProgressRoot
    :model-value="modelValue"
    :max="max"
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }"
    />
  </ProgressRoot>
</template>
