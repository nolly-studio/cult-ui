<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaCorner,
} from "radix-vue"
import { cn } from "@/lib/utils"
import ScrollBar from "./ScrollBar.vue"

defineOptions({ name: "ScrollArea" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
