<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

defineOptions({ name: "Tool" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <Collapsible
    :class="cn('group not-prose mb-4 w-full rounded-md border', props.class)"
  >
    <slot />
  </Collapsible>
</template>
