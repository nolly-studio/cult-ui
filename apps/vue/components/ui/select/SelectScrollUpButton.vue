<script setup lang="ts">
import { SelectScrollUpButton } from "radix-vue"
import { ChevronUp } from "lucide-vue-next"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectScrollUpButton
    :class="
      cn(
        'flex cursor-default items-center justify-center py-1',
        props.class,
      )
    "
  >
    <ChevronUp class="h-4 w-4" />
  </SelectScrollUpButton>
</template>
