<script setup lang="ts">
import { SelectScrollDownButton } from "radix-vue"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectScrollDownButton
    :class="
      cn(
        'flex cursor-default items-center justify-center py-1',
        props.class,
      )
    "
  >
    <ChevronDown class="h-4 w-4" />
  </SelectScrollDownButton>
</template>
