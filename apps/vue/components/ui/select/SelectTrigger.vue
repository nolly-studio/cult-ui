<script setup lang="ts">
import { SelectIcon, SelectTrigger } from "radix-vue"
import { ChevronDown } from "lucide-vue-next"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :class="
      cn(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
