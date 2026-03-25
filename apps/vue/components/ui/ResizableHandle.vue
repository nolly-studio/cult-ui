<script setup lang="ts">
import { GripVertical } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ResizableHandle" })

const props = withDefaults(
  defineProps<{
    class?: string
    withHandle?: boolean
  }>(),
  { withHandle: false }
)
</script>

<template>
  <div
    :class="
      cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        props.class
      )
    "
  >
    <div
      v-if="withHandle"
      class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
    >
      <GripVertical class="h-2.5 w-2.5" />
    </div>
  </div>
</template>
