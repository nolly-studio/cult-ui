<script setup lang="ts">
import { Splitpanes } from "splitpanes"
import { cn } from "@/lib/utils"
import "splitpanes/dist/splitpanes.css"

defineOptions({ name: "ResizablePanelGroup" })

const props = withDefaults(
  defineProps<{
    class?: string
    direction?: "horizontal" | "vertical"
  }>(),
  { direction: "horizontal" }
)
</script>

<template>
  <Splitpanes
    :horizontal="direction === 'vertical'"
    :class="
      cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        props.class
      )
    "
    :data-panel-group-direction="direction"
  >
    <slot />
  </Splitpanes>
</template>
