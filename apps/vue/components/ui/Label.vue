<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority"

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

export type LabelVariants = VariantProps<typeof labelVariants>
</script>

<script setup lang="ts">
import { Label as LabelPrimitive } from "radix-vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  for?: string
}>()
</script>

<template>
  <LabelPrimitive
    :for="props.for"
    :class="cn(labelVariants(), props.class)"
  >
    <slot />
  </LabelPrimitive>
</template>
