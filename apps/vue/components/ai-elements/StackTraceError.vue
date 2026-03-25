<script setup lang="ts">
import { cn } from "@/lib/utils"
import { AlertTriangleIcon } from "lucide-vue-next"

defineOptions({ name: "StackTraceError" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex flex-1 items-center gap-2 overflow-hidden', props.class)"
  >
    <AlertTriangleIcon class="size-4 shrink-0 text-destructive" />
    <slot />
  </div>
</template>
