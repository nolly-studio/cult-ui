<script setup lang="ts">
import { ComboboxGroup, ComboboxLabel } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommandGroup" })

const props = defineProps<{
  class?: string
  heading?: string
}>()
</script>

<template>
  <ComboboxGroup
    :class="
      cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        props.class
      )
    "
  >
    <ComboboxLabel
      v-if="heading"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
