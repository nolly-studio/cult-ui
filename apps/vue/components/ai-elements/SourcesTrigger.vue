<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleTrigger } from "radix-vue"
import { ChevronDownIcon } from "lucide-vue-next"

defineOptions({ name: "SourcesTrigger" })

const props = defineProps<{
  class?: string
  count: number
}>()
</script>

<template>
  <CollapsibleTrigger :class="cn('flex items-center gap-2', props.class)">
    <slot>
      <p class="font-medium">Used {{ props.count }} sources</p>
      <ChevronDownIcon class="h-4 w-4" />
    </slot>
  </CollapsibleTrigger>
</template>
