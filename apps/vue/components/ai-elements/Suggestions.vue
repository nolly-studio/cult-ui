<script setup lang="ts">
import { cn } from "@/lib/utils"
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar } from "radix-vue"

defineOptions({ name: "Suggestions" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ScrollAreaRoot class="w-full overflow-x-auto whitespace-nowrap">
    <ScrollAreaViewport>
      <div :class="cn('flex w-max flex-nowrap items-center gap-2', props.class)">
        <slot />
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar class="hidden" orientation="horizontal" />
  </ScrollAreaRoot>
</template>
